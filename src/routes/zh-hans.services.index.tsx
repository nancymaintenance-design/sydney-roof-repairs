import { createFileRoute } from "@tanstack/react-router";
import { ServicesIndexPage } from "@/components/Pages";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/zh-hans/services/")({
  head: () =>
    pageHead({
      title: "悉尼屋顶维修服务 | Ellis Services",
      description:
        "六类悉尼屋顶维修服务：漏水、风暴损坏、瓦屋顶、金属屋顶、泛水与天沟谷、屋脊瓦和重新勾缝。",
      path: "/zh-hans/services",
      locale: "zh",
      englishPath: "/services",
      chinesePath: "/zh-hans/services",
    }),
  component: () => <ServicesIndexPage locale="zh" />,
});
