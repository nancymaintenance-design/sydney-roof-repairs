import { useEffect, useRef, useState } from "react";
import { business } from "@/config/business";
import settings from "../../ga4.config.json";
import { initRoofGA4, type GA4Controller } from "@/lib/ga4";

export function GA4Consent({ pathname }: { pathname: string }) {
  const controller = useRef<GA4Controller | null>(null);
  const [ready, setReady] = useState(false);
  const [choice, setChoice] = useState<"granted" | "denied" | null>(null);
  const [privacySignal, setPrivacySignal] = useState(false);
  useEffect(() => {
    controller.current = initRoofGA4(
      { ...settings, measurementId: business.ga4MeasurementId },
      (next, signal) => {
        setChoice(next);
        setPrivacySignal(signal);
      },
    );
    setReady(controller.current !== null);
    return () => controller.current?.destroy();
  }, []);
  useEffect(() => {
    controller.current?.navigate();
  }, [pathname]);
  if (!ready) return null;
  const zh = pathname.startsWith("/zh-hans");
  return (
    <section
      className="container-shell py-6 pb-24 md:pb-6"
      data-ga4-preferences
      aria-labelledby="ga4-preference-title"
    >
      <h2 id="ga4-preference-title" className="text-lg font-bold">
        {zh ? "Google Analytics 分析偏好" : "Google Analytics preferences"}
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-6">
        {zh
          ? "只有你允许后，Google Analytics 才会统计页面浏览和不含咨询内容的联系事件。这个选择与 Clarity 分开；拒绝不影响浏览或联系。"
          : "Only with your permission, Google Analytics measures page visits and contact events without enquiry contents. This choice is separate from Clarity. Refusing does not affect browsing or contacting us."}
      </p>
      <p className="mt-2 text-sm" role="status">
        {privacySignal
          ? zh
            ? "浏览器要求停止追踪，GA4 保持关闭。"
            : "Your browser requests no tracking. GA4 stays off."
          : choice === "granted"
            ? zh
              ? "GA4 分析已允许。"
              : "GA4 analytics is allowed."
            : zh
              ? "GA4 分析保持关闭。"
              : "GA4 analytics stays off."}
      </p>
      <div className="mt-3 flex flex-wrap gap-3">
        <button
          type="button"
          className="btn-secondary cursor-pointer"
          onClick={() => controller.current?.choose("denied")}
        >
          {zh ? "关闭 GA4 分析" : "Turn off GA4 analytics"}
        </button>
        <button
          type="button"
          className="btn-primary cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
          disabled={privacySignal}
          onClick={() => controller.current?.choose("granted")}
        >
          {zh ? "允许 GA4 分析" : "Allow GA4 analytics"}
        </button>
        <a className="self-center text-sm underline" href={zh ? "/zh-hans/privacy" : "/privacy"}>
          {zh ? "隐私说明" : "Privacy information"}
        </a>
      </div>
    </section>
  );
}
