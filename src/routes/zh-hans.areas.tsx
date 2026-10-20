import { createFileRoute } from "@tanstack/react-router";
import { AreasPage } from "@/components/Pages";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/zh-hans/areas")({
  head: () =>
    pageHead({
      title: "悉尼屋顶维修咨询区域 | Ellis Services",
      description: "请提供悉尼 suburb 或邮编，以确认屋顶维修承接范围、通道和可用性。",
      path: "/zh-hans/areas",
      locale: "zh",
      englishPath: "/areas",
      chinesePath: "/zh-hans/areas",
    }),
  component: () => <AreasPage locale="zh" />,
});
