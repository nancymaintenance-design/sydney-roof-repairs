import { useState, type FormEvent } from "react";
import { business } from "@/config/business";
import { localizedPath, type Locale } from "@/data/content";
import { services, serviceText } from "@/data/services";
import { trackEvent } from "@/lib/analytics";

export function EnquiryForm({
  locale,
  compact = false,
  defaultService = "",
}: {
  locale: Locale;
  compact?: boolean;
  defaultService?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [started, setStarted] = useState(false);
  const zh = locale === "zh";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    if (
      !String(formData.get("phone") || "").trim() &&
      !String(formData.get("email") || "").trim()
    ) {
      setStatus("error");
      setMessage(
        zh
          ? "请至少提供电话号码或电子邮箱。"
          : "Please provide at least a phone number or email address.",
      );
      return;
    }
    setStatus("sending");
    setMessage("");
    trackEvent("quote_form_submit");
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(formData.entries()),
          sourcePath: `${window.location.pathname}${window.location.search}`,
        }),
      });
      const result = (await response.json().catch(() => null)) as {
        error?: string;
        ok?: boolean;
        requestId?: string;
      } | null;
      if (!response.ok || result?.ok !== true || !result.requestId) {
        if (zh && response.status === 429) {
          throw new Error("提交过于频繁，请稍后重试，或改用电话/邮件联系。");
        }
        if (zh && response.status >= 500) {
          throw new Error("在线投递尚未配置或暂时不可用，请改用电话或邮件联系。");
        }
        throw new Error(
          zh
            ? "在线咨询未被接收，请检查填写内容或改用电话/邮件联系。"
            : result?.error || "The online enquiry was not accepted.",
        );
      }
      setStatus("success");
      setMessage(
        zh
          ? `咨询已被接收。编号：${result.requestId}`
          : `Your enquiry was accepted. Reference: ${result.requestId}`,
      );
      trackEvent("generate_lead", { request_id: result.requestId });
      form.reset();
    } catch (error) {
      setStatus("error");
      trackEvent("quote_form_error", { error_type: "delivery" });
      setMessage(
        error instanceof Error
          ? error.message
          : zh
            ? `在线投递尚不可用，请致电 ${business.displayPhone}。`
            : `Online delivery is not available. Please call ${business.displayPhone}.`,
      );
    }
  }

  const fieldClass =
    "mt-2 w-full rounded-lg border border-[var(--brand)]/20 bg-white px-4 py-3 text-sm text-[var(--ink)] outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--accent-pale)]";
  return (
    <form
      data-clarity-mask
      onSubmit={submit}
      noValidate
      onFocusCapture={() => {
        if (!started) {
          setStarted(true);
          trackEvent("quote_form_start");
        }
      }}
      className="text-[var(--ink)]"
    >
      <div>
        <p className="eyebrow">{zh ? "屋顶维修咨询" : "ROOF REPAIR ENQUIRY"}</p>
        <h2 className={`${compact ? "text-2xl" : "text-3xl"} mt-2 font-bold tracking-tight`}>
          {zh ? "告诉我们看到了什么" : "Tell us what you can see"}
        </h2>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
          {zh
            ? "无需登上屋顶。请只提供能安全获得的信息；照片可在初次联系后通过确认的渠道发送。"
            : "Do not climb onto the roof. Share only information you can collect safely; photos can be sent through a confirmed channel after first contact."}
        </p>
      </div>
      <div className={`mt-6 grid gap-4 ${compact ? "md:grid-cols-2" : "md:grid-cols-2"}`}>
        <label className="text-sm font-bold">
          {zh ? "姓名 *" : "Name *"}
          <input
            name="name"
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            className={fieldClass}
          />
        </label>
        <label className="text-sm font-bold">
          {zh ? "所在 suburb 或邮编 *" : "Suburb or postcode *"}
          <input
            name="location"
            required
            minLength={2}
            maxLength={100}
            autoComplete="postal-code"
            className={fieldClass}
          />
        </label>
        <label className="text-sm font-bold">
          {zh ? "电话" : "Phone"}
          <input
            name="phone"
            minLength={6}
            maxLength={30}
            autoComplete="tel"
            inputMode="tel"
            className={fieldClass}
          />
        </label>
        <label className="text-sm font-bold">
          {zh ? "电子邮箱" : "Email"}
          <input
            name="email"
            type="email"
            maxLength={200}
            autoComplete="email"
            className={fieldClass}
          />
        </label>
        <label className="text-sm font-bold md:col-span-2">
          {zh ? "最接近的服务 *" : "Closest service *"}
          <select name="service" required defaultValue={defaultService} className={fieldClass}>
            <option value="" disabled>
              {zh ? "请选择" : "Select a service"}
            </option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {serviceText(service.shortTitle, locale)}
              </option>
            ))}
            <option value="other">{zh ? "其他屋顶维修咨询" : "Other roof repair enquiry"}</option>
          </select>
        </label>
        <label className="text-sm font-bold md:col-span-2">
          {zh ? "问题说明 *" : "What is happening? *"}
          <textarea
            name="details"
            required
            minLength={10}
            maxLength={2000}
            rows={compact ? 4 : 6}
            className={`${fieldClass} resize-none`}
            placeholder={
              zh
                ? "例如：何时出现、受影响位置、屋顶材料，以及天气条件。"
                : "For example: when it appears, affected area, roof material and weather conditions."
            }
          />
        </label>
      </div>
      <input
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <label className="mt-5 flex items-start gap-3 text-xs leading-5 text-[var(--muted)]">
        <input name="consent" value="yes" type="checkbox" required className="mt-1 h-4 w-4" />
        <span>
          {zh
            ? "我同意 Ellis Services 使用这些信息回复本次咨询，并已阅读"
            : "I agree that Ellis Services may use these details to respond to this enquiry, and I have read the "}
          <a className="font-bold underline" href={localizedPath(locale, "/privacy")}>
            {zh ? "隐私政策" : "privacy policy"}
          </a>
          {zh ? "。" : "."}
        </span>
      </label>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button disabled={status === "sending"} className="btn-primary disabled:opacity-60">
          {status === "sending"
            ? zh
              ? "正在发送…"
              : "Sending…"
            : zh
              ? "发送屋顶维修咨询"
              : "Send roof repair enquiry"}
        </button>
        <p className="text-xs leading-5 text-[var(--muted)]">
          {zh
            ? `如果在线投递暂时不可用，页面不会显示虚假成功；您仍可致电 ${business.displayPhone} 或发送邮件。`
            : `If online delivery is temporarily unavailable, the form will not show a false success. You can still call ${business.displayPhone} or email us.`}
        </p>
      </div>
      {message && (
        <p
          role="status"
          aria-live="polite"
          className={`mt-4 rounded-lg px-4 py-3 text-sm font-bold ${status === "success" ? "bg-emerald-50 text-emerald-900" : "bg-amber-50 text-amber-950"}`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
