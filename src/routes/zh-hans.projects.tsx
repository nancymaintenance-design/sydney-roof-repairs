import { createFileRoute } from "@tanstack/react-router";
import { ProjectsPage } from "@/components/Pages";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/zh-hans/projects")({
  head: () =>
    pageHead({
      title: "悉尼屋顶维修现场照片 | Ellis Services",
      description: "查看瓦屋面、屋脊、天沟谷、泛水和金属屋顶的可见细节，以及仍需进一步确认的内容。",
      path: "/zh-hans/projects",
      locale: "zh",
      englishPath: "/projects",
      chinesePath: "/zh-hans/projects",
      image: "/media/commercial-roof-overview.webp",
    }),
  component: () => <ProjectsPage locale="zh" />,
});
