import { createFileRoute } from "@tanstack/react-router";
import { PrivacyPage } from "@/components/Pages";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/zh-hans/privacy")({
  head: () =>
    pageHead({
      title: "隐私政策 | Ellis Services 悉尼屋顶维修",
      description: "悉尼屋顶维修网站如何处理咨询资料。",
      path: "/zh-hans/privacy",
      locale: "zh",
      englishPath: "/privacy",
      chinesePath: "/zh-hans/privacy",
    }),
  component: () => <PrivacyPage locale="zh" />,
});
