export type GA4Config = {
  measurementId: string;
  enhancedMeasurementDisabled: boolean;
  hostname: string;
  storageKey: string;
  pageTitles: Record<string, string>;
};
export type GA4Consent = {
  version: 1;
  purpose: "ga4";
  choice: "granted" | "denied";
  measurementId: string;
  updatedAt: number;
};
export type GA4Controller = {
  track: (name: string, values?: Record<string, unknown>) => void;
  navigate: () => void;
  choose: (choice: "granted" | "denied") => void;
  destroy: () => void;
};
export function ga4Ready(config: GA4Config): boolean {
  return /^G-[A-Z0-9]{6,20}$/.test(config.measurementId) && config.enhancedMeasurementDisabled;
}
export function parseGA4Consent(
  value: string | null,
  id: string,
  now = Date.now(),
): GA4Consent | null {
  try {
    const item = JSON.parse(value || "null");
    return item?.version === 1 &&
      item.purpose === "ga4" &&
      ["granted", "denied"].includes(item.choice) &&
      item.measurementId === id &&
      typeof item.updatedAt === "number" &&
      item.updatedAt <= now + 300000 &&
      now - item.updatedAt <= 180 * 86400000
      ? item
      : null;
  } catch {
    return null;
  }
}
export function safeGA4Page(config: GA4Config, href: string, canonical: string): string | null {
  try {
    const page = new URL(href),
      owner = new URL(canonical);
    return page.protocol === "https:" &&
      owner.protocol === "https:" &&
      page.hostname === config.hostname &&
      owner.hostname === config.hostname &&
      page.port === "" &&
      owner.port === "" &&
      page.pathname === owner.pathname &&
      Object.hasOwn(config.pageTitles, page.pathname)
      ? page.origin + page.pathname
      : null;
  } catch {
    return null;
  }
}
export function safeGA4Referrer(href: string): string {
  try {
    const url = new URL(href);
    return ["https:", "http:"].includes(url.protocol) ? url.origin : "";
  } catch {
    return "";
  }
}
const locations = new Set([
  "header",
  "contact_rail",
  "contact_rail_mobile",
  "footer",
  "mobile_bar",
  "page_hero",
  "contact",
  "home_enquiry_overlay",
]);
export function safeGA4Event(
  name: string,
  values: Record<string, unknown> = {},
): Record<string, string> | null {
  if (["quote_form_start", "quote_form_submit", "generate_lead"].includes(name)) return {};
  if (name === "quote_form_error")
    return values.error_type === "delivery" ? { error_type: "delivery" } : {};
  if (["phone_click", "email_click"].includes(name))
    return locations.has(String(values.location)) ? { location: String(values.location) } : {};
  return null;
}
type RuntimeWindow = Window & {
  roofGA4?: GA4Controller;
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};
export function initRoofGA4(
  config: GA4Config,
  onChoice: (choice: "granted" | "denied" | null, privacySignal: boolean) => void,
): GA4Controller | null {
  if (!ga4Ready(config) || location.hostname !== config.hostname || location.protocol !== "https:")
    return null;
  const runtime = window as RuntimeWindow;
  const privacySignal =
    (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true ||
    ["1", "yes"].includes(navigator.doNotTrack || "");
  let consent: GA4Consent | null = null;
  try {
    consent = parseGA4Consent(localStorage.getItem(config.storageKey), config.measurementId);
  } catch {
    /* Storage unavailable. */
  }
  let active = false,
    configured = false,
    lastPage = "",
    observedPath = location.pathname,
    disposed = false;
  const disableKey = `ga-disable-${config.measurementId}`;
  const setDisabled = (disabled: boolean) => Object.assign(runtime, { [disableKey]: disabled });
  const currentPage = () =>
    safeGA4Page(
      config,
      location.href,
      document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href || "",
    );
  const allowed = () =>
    !disposed && !privacySignal && consent?.choice === "granted" && currentPage() !== null;
  const common = () => ({
    page_location: currentPage(),
    page_referrer: safeGA4Referrer(document.referrer),
    page_title: config.pageTitles[location.pathname] || "",
    language: location.pathname.startsWith("/zh-hans") ? "zh-Hans" : "en-AU",
  });
  function clearCookies() {
    for (const cookie of document.cookie.split(";")) {
      const name = cookie.trim().split("=")[0];
      if (!/^(_ga(?:_|$)|_gid$|_gat(?:_|$))/.test(name)) continue;
      for (const domain of ["", `; Domain=${config.hostname}`, `; Domain=.${config.hostname}`])
        document.cookie = `${name}=; Max-Age=0; Path=/${domain}; SameSite=Lax`;
    }
  }
  function stop(clear = false) {
    active = false;
    lastPage = "";
    setDisabled(true);
    document.getElementById("sydney-roof-ga4-tag")?.remove();
    if (clear) clearCookies();
  }
  function navigate() {
    if (location.pathname !== observedPath) {
      observedPath = location.pathname;
      lastPage = "";
    }
    if (!allowed()) {
      active = false;
      setDisabled(true);
      return;
    }
    active = true;
    setDisabled(false);
    if (!configured) {
      configured = true;
      runtime.dataLayer ||= [];
      runtime.gtag = (...args: unknown[]) => runtime.dataLayer!.push(args);
      runtime.gtag("consent", "default", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
      runtime.gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
      runtime.gtag("js", new Date());
      runtime.gtag("config", config.measurementId, {
        ...common(),
        send_page_view: false,
        cookie_domain: "none",
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      });
    }
    runtime.gtag?.("set", common());
    const page = currentPage()!;
    if (page !== lastPage) {
      lastPage = page;
      runtime.gtag?.("event", "page_view", { ...common(), send_to: config.measurementId });
    }
    if (!document.getElementById("sydney-roof-ga4-tag")) {
      const script = document.createElement("script");
      script.id = "sydney-roof-ga4-tag";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${config.measurementId}`;
      script.referrerPolicy = "strict-origin";
      document.head.append(script);
    }
  }
  function choose(choice: "granted" | "denied") {
    consent = {
      version: 1,
      purpose: "ga4",
      choice: privacySignal ? "denied" : choice,
      measurementId: config.measurementId,
      updatedAt: Date.now(),
    };
    try {
      localStorage.setItem(config.storageKey, JSON.stringify(consent));
    } catch {
      /* Apply only in this page. */
    }
    onChoice(consent.choice, privacySignal);
    if (consent.choice === "denied") stop(true);
    else navigate();
  }
  const onStorage = (event: StorageEvent) => {
    if (event.key !== config.storageKey && event.key !== null) return;
    consent = event.key === null ? null : parseGA4Consent(event.newValue, config.measurementId);
    onChoice(consent?.choice || null, privacySignal);
    if (consent?.choice !== "granted") stop(true);
    else navigate();
  };
  const controller: GA4Controller = {
    track(name, values = {}) {
      const safe = safeGA4Event(name, values);
      if (active && allowed() && safe)
        runtime.gtag?.("event", name, { ...common(), ...safe, send_to: config.measurementId });
    },
    navigate,
    choose,
    destroy() {
      disposed = true;
      stop();
      headObserver.disconnect();
      window.removeEventListener("storage", onStorage);
      if (runtime.roofGA4 === controller) delete runtime.roofGA4;
    },
  };
  // TanStack can commit the canonical after the pathname effect has already run.
  // Retry the settled head while retaining the exact host and authored-page guard.
  let headCheckQueued = false;
  const headObserver = new MutationObserver(() => {
    if (headCheckQueued || disposed) return;
    headCheckQueued = true;
    queueMicrotask(() => {
      headCheckQueued = false;
      if (!disposed) navigate();
    });
  });
  headObserver.observe(document.head, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["href", "content"],
  });
  window.addEventListener("storage", onStorage);
  runtime.roofGA4 = controller;
  onChoice(consent?.choice || null, privacySignal);
  navigate();
  return controller;
}
