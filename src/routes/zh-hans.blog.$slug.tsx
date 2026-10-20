import { createFileRoute, notFound } from "@tanstack/react-router";
import { BlogDetailPage } from "@/components/BlogPages";
import { blogBySlug, blogText } from "@/data/blog";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/zh-hans/blog/$slug")({
  loader: ({ params }) => {
    const post = blogBySlug(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageHead({
          title: `${blogText(loaderData.title, "zh")} | Ellis Services`,
          description: blogText(loaderData.summary, "zh"),
          path: `/zh-hans/blog/${loaderData.slug}`,
          locale: "zh",
          image: loaderData.image,
        })
      : {},
  component: ChineseBlogRoute,
});

function ChineseBlogRoute() {
  return <BlogDetailPage locale="zh" post={Route.useLoaderData()} />;
}
