import { createFileRoute } from "@tanstack/react-router";
import { BlogIndexPage } from "@/components/BlogPages";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/zh-hans/blog/")({
  head: () =>
    pageHead({
      title: "悉尼屋顶维修指南 | Ellis Services",
      description: "悉尼屋顶漏水、风暴观察、瓦屋顶、金属屋顶、照片、通道与咨询准备指南。",
      path: "/zh-hans/blog",
      locale: "zh",
      englishPath: "/blog",
      chinesePath: "/zh-hans/blog",
    }),
  component: () => <BlogIndexPage locale="zh" />,
});
