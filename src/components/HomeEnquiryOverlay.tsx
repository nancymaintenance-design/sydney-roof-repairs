import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, Mail, Phone, X } from "lucide-react";
import type { ReactElement } from "react";
import { business } from "@/config/business";
import type { Locale } from "@/data/content";
import { trackEvent } from "@/lib/analytics";
import { EnquiryForm } from "./EnquiryForm";
import { SocialIcons } from "./SiteChrome";

export function HomeEnquiryOverlay({ locale, trigger }: { locale: Locale; trigger: ReactElement }) {
  const zh = locale === "zh";

  return (
    <Dialog.Root
      onOpenChange={(open) => {
        if (open) trackEvent("enquiry_overlay_open", { location: "home_hero" });
      }}
    >
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[120] bg-[var(--ink)]/86 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out data-[state=open]:fade-in" />
        <Dialog.Content className="fixed inset-0 z-[130] overflow-y-auto bg-[var(--ink)] text-white data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top">
          <Dialog.Title className="sr-only">
            {zh ? "悉尼屋顶维修在线咨询" : "Sydney roof repair online enquiry"}
          </Dialog.Title>
          <Dialog.Description className="sr-only">
            {zh
              ? "查看 Ellis Services 联系方式，或填写屋顶维修咨询表单。"
              : "Review Ellis Services contact details or complete the roof repair enquiry form."}
          </Dialog.Description>
          <Dialog.Close
            type="button"
            aria-label={zh ? "关闭询盘窗口" : "Close enquiry window"}
            className="fixed right-4 top-4 z-[140] grid h-12 w-12 place-items-center rounded-full border border-white/35 bg-[var(--ink)]/92 text-white shadow-lg transition hover:border-[var(--accent-pale)] hover:text-[var(--accent-pale)] sm:right-7 sm:top-7"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </Dialog.Close>

          <div className="container-shell grid min-h-screen items-center gap-10 py-20 lg:grid-cols-[.72fr_1.28fr] lg:py-24">
            <aside className="lg:border-r lg:border-white/14 lg:pr-10">
              <p className="text-xs font-bold uppercase tracking-[.2em] text-[var(--accent-pale)]">
                {zh ? "直接联系" : "CONTACT US"}
              </p>
              <h2 className="mt-4 text-4xl font-bold tracking-[-.035em]">
                {zh ? "现在就把屋顶问题告诉我们。" : "Tell us about the roof issue."}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/70">
                {zh
                  ? "可直接致电或发送邮件，也可以使用右侧表单提交 suburb、屋顶类型和可见问题。"
                  : "Call or email us directly, or use the form to share the suburb, roof type and visible issue."}
              </p>

              <div className="mt-9 space-y-6">
                <a
                  href={business.phoneHref}
                  onClick={() => trackEvent("phone_click", { location: "home_enquiry_overlay" })}
                  className="flex items-center gap-4 text-white no-underline"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-[var(--accent-pale)]">
                    <Phone className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <small className="block text-xs font-bold uppercase tracking-[.12em] text-white/55">
                      {zh ? "电话" : "Phone"}
                    </small>
                    <strong className="mt-1 block text-lg">{business.displayPhone}</strong>
                  </span>
                </a>
                <a
                  href={business.emailHref}
                  onClick={() => trackEvent("email_click", { location: "home_enquiry_overlay" })}
                  className="flex min-w-0 items-center gap-4 text-white no-underline"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-[var(--accent-pale)]">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <small className="block text-xs font-bold uppercase tracking-[.12em] text-white/55">
                      {zh ? "电子邮箱" : "Email"}
                    </small>
                    <strong className="mt-1 block break-all text-base">{business.email}</strong>
                  </span>
                </a>
              </div>

              <div className="mt-8">
                <SocialIcons locale={locale} tone="dark" />
              </div>
              <a
                href={locale === "zh" ? "/zh-hans/contact" : "/contact"}
                className="mt-9 inline-flex items-center gap-2 text-sm font-bold text-[var(--accent-pale)] no-underline"
              >
                {zh ? "打开完整联系页面" : "Open the full contact page"}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </aside>

            <div className="rounded-[1.75rem] bg-white p-6 text-[var(--ink)] shadow-sm sm:p-9 lg:p-11">
              <EnquiryForm locale={locale} compact />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
