import { ClarityAssets } from "@/components/ClarityAssets";
import { GA4Consent } from "@/components/GA4Consent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import appCss from "../styles.css?url";
import { business, robotsMetaContent } from "@/config/business";
import { buildOrganizationSchema, buildWebSiteSchema } from "@/lib/seo";
import { reportLovableError } from "@/lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#f5f4ee] px-5">
      <div className="max-w-lg text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 text-5xl font-black tracking-tight">Page not found · 页面不存在</h1>
        <p className="mt-4 leading-7 text-[#596560]">
          The address may be incorrect or the page may have moved. URL 可能有误，或页面已经移动。
        </p>
        <a href="/" className="btn-primary mt-8">
          Return home · 返回首页
        </a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "root_error" });
  }, [error]);
  return (
    <div className="grid min-h-screen place-items-center bg-[#f5f4ee] px-5">
      <div className="max-w-lg text-center">
        <h1 className="text-3xl font-black">This page did not load · 页面加载失败</h1>
        <p className="mt-4 text-[#596560]">
          Try again or return to the home page. 请重试或返回首页。
        </p>
        <div className="mt-7 flex justify-center gap-3">
          <button
            className="btn-primary"
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Try again · 重试
          </button>
          <a href="/" className="btn-secondary">
            Home · 首页
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => {
    const scripts = [buildWebSiteSchema(), buildOrganizationSchema()]
      .filter((item): item is Record<string, unknown> => Boolean(item))
      .map((item) => ({ type: "application/ld+json", children: JSON.stringify(item) }));
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "robots", content: robotsMetaContent },
        { name: "author", content: business.businessName },
        { property: "og:site_name", content: business.siteName },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "icon", href: "/sydney-roof-repairs-mark.svg", type: "image/svg+xml" },
      ],
      scripts,
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return (
    <html lang={pathname.startsWith("/zh-hans") ? "zh-Hans" : "en-AU"}>
      <head>
        <HeadContent />
        <ClarityAssets locale={pathname.startsWith("/zh-hans") ? "zh" : "en"} />
      </head>
      <body>
        {children}
        <GA4Consent pathname={pathname} />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
