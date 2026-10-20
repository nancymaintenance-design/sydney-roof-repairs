import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/Pages";
import { pageHead } from "@/lib/seo";

type ContactSearch = { service?: string };

export const Route = createFileRoute("/zh-hans/contact")({
  validateSearch: (search: Record<string, unknown>): ContactSearch =>
    typeof search.service === "string" ? { service: search.service } : {},
  head: () =>
    pageHead({
      title: "联系悉尼屋顶维修 | Ellis Services",
      description: "致电、发送邮件或提交悉尼屋顶维修问题资料；在线投递未配置前保持明确失败。",
      path: "/zh-hans/contact",
      locale: "zh",
      englishPath: "/contact",
      chinesePath: "/zh-hans/contact",
    }),
  component: ContactRoute,
});

function ContactRoute() {
  const { service } = Route.useSearch();
  return <ContactPage locale="zh" initialServiceId={service} />;
}
