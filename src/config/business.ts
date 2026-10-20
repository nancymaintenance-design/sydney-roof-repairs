const PRODUCTION_ORIGIN = "https://sydneyroofrepairservices.com.au";
const configuredSiteUrl = import.meta.env.VITE_SITE_URL?.trim() || "";
const domainOwnershipVerified = import.meta.env.VITE_DOMAIN_OWNERSHIP_VERIFIED === "true";
const indexingRequested = import.meta.env.VITE_SITE_INDEXABLE === "true";
const hasApprovedProductionUrl = domainOwnershipVerified && configuredSiteUrl === PRODUCTION_ORIGIN;

export type VerificationStatus = "owner-supplied" | "candidate-not-verified" | "verified";

export const business = {
  internalProjectName: "Sydney Roof Repairs Flow-B",
  releaseId: "SYD-ROOF-FLOW-B-FOUNDATION-01A",
  businessName: "Ellis Services",
  legalName: "ELLIS SERVICES GROUP PTY LTD",
  abn: "96 645 821 745",
  abnRecord: {
    status: "Active",
    activeFrom: "2020-11-11",
    entityType: "Australian Private Company",
    url: "https://abr.business.gov.au/ABN/View?abn=96645821745",
  },
  siteName: "Sydney Roof Repairs | Ellis Services",
  positioning: "Roof repair enquiries across Sydney",
  description:
    "Ellis Services receives Sydney roof repair enquiries for roof leaks, storm damage, tile and metal roof repairs, flashing, valleys and ridge capping.",

  officialDomain: "sydneyroofrepairservices.com.au",
  domainStatus: "vercel-verified-noindex" as const,
  productionOrigin: PRODUCTION_ORIGIN,
  siteUrl: hasApprovedProductionUrl ? PRODUCTION_ORIGIN : "",
  publicIndexingEnabled: hasApprovedProductionUrl && indexingRequested,

  phone: "+61405878406",
  displayPhone: "0405 878 406",
  phoneHref: "tel:+61405878406",
  phoneStatus: "owner-supplied" as VerificationStatus,
  email: "ellisservicesgroup3@gmail.com",
  emailHref: "mailto:ellisservicesgroup3@gmail.com",
  emailStatus: "owner-supplied" as VerificationStatus,

  address: {
    formatted: "9 Castlereagh St, Sydney NSW 2000",
    status: "owner-supplied" as VerificationStatus,
    publicTreatment:
      "Contact address only. It is not presented as a walk-in office, storefront or Google Business Profile location.",
  },

  serviceAreaPolicy: {
    label: "Sydney roof repair enquiries",
    disclosure:
      "Include your suburb or postcode so service fit, access and current availability can be confirmed before any scope is agreed.",
  },

  socialProfiles: [
    {
      id: "google",
      label: "Google Business Profile",
      url: "",
      status: "candidate-not-verified" as VerificationStatus,
      enabled: false,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      url: "https://au.linkedin.com/in/ellis-services-group-091541266",
      status: "owner-supplied" as VerificationStatus,
      enabled: true,
    },
    {
      id: "facebook",
      label: "Facebook",
      url: "https://www.facebook.com/p/Ellis-Services-Group-100082926022259/",
      status: "owner-supplied" as VerificationStatus,
      enabled: true,
    },
    {
      id: "instagram",
      label: "Instagram",
      url: "https://www.instagram.com/elliservices_group/",
      status: "owner-supplied" as VerificationStatus,
      enabled: true,
    },
  ],

  paymentMethods: ["Visa", "Mastercard", "American Express", "EFTPOS", "Bank transfer", "Cash"].map(
    (label) => ({ label, enabled: true, status: "owner-supplied" as VerificationStatus }),
  ),

  ga4MeasurementId: "G-9LX6LT20D3",
} as const;

export const PRODUCTION_HOSTS: readonly string[] = hasApprovedProductionUrl
  ? [business.officialDomain]
  : [];

export function isProductionHost(host: string | null | undefined): boolean {
  if (!host) return false;
  return PRODUCTION_HOSTS.includes(host.toLowerCase());
}

export function absoluteUrl(path = "/"): string | null {
  if (!business.siteUrl) return null;
  return `${business.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function isPublicLaunchReady(): boolean {
  return Boolean(
    business.publicIndexingEnabled &&
    business.siteUrl &&
    domainOwnershipVerified &&
    PRODUCTION_HOSTS.length,
  );
}

export const robotsMetaContent = isPublicLaunchReady()
  ? "index,follow"
  : "noindex,nofollow,noarchive";
