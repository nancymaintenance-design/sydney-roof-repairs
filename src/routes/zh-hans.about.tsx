import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/Pages";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/zh-hans/about")({
  head: () =>
    pageHead({
      title: "关于 Ellis Services 悉尼屋顶维修",
      description: "了解 Ellis Services 如何根据屋顶问题、房屋信息和现场条件处理悉尼屋顶维修咨询。",
      path: "/zh-hans/about",
      locale: "zh",
      englishPath: "/about",
      chinesePath: "/zh-hans/about",
    }),
  component: () => <AboutPage locale="zh" />,
});
