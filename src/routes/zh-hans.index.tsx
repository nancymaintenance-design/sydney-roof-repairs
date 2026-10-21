import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/Pages";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/zh-hans/")({
  head: () =>
    pageHead({
      title: "悉尼屋顶维修 | Ellis Services",
      description: "悉尼屋顶漏水、风暴损坏、瓦屋顶、金属屋顶、泛水、天沟谷和屋脊维修咨询。",
      path: "/zh-hans",
      locale: "zh",
      englishPath: "/",
      chinesePath: "/zh-hans",
      image: "/media/commercial-roof-overview.webp",
    }),
  component: () => <HomePage locale="zh" />,
});
