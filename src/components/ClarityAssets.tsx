"use client";
import { useEffect } from "react";
import config from "../../clarity.config.json";

export function ClarityAssets({ locale }: { locale: "en" | "zh" }) {
  const { privacyPaths, ...publicConfig } = config;
  const settings = { ...publicConfig, privacyPath: privacyPaths[locale] };
  useEffect(() => {
    if (document.getElementById("sydney-roof-clarity-consent")) return;
    const script = document.createElement("script");
    script.id = "sydney-roof-clarity-consent";
    script.src = "/clarity-consent.js?v=20261016-1";
    script.async = true;
    document.head.append(script);
  }, []);
  return (
    <>
      <link rel="stylesheet" href="/clarity-consent.css?v=20261016-1" />
      <script
        id="clarity-config"
        type="application/json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(settings).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
