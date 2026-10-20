import { business } from "@/config/business";
import type { GA4Controller } from "./ga4";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    roofGA4?: GA4Controller;
  }
}

const allowedEvents = new Set([
  "phone_click",
  "email_click",
  "quote_form_start",
  "quote_form_submit",
  "quote_form_error",
  "generate_lead",
]);

export function trackEvent(name: string, values: Record<string, string> = {}) {
  if (typeof window === "undefined" || !business.ga4MeasurementId || !allowedEvents.has(name))
    return;
  window.roofGA4?.track(name, values);
}
