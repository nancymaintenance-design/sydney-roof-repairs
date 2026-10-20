import { createFileRoute, notFound } from "@tanstack/react-router";
import { BlogDetailPage } from "@/components/BlogPages";
import { blogBySlug, blogText } from "@/data/blog";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = blogBySlug(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageHead({
          title: `${blogText(loaderData.title, "en")} | Ellis Services`,
          description: blogText(loaderData.summary, "en"),
          path: `/blog/${loaderData.slug}`,
          locale: "en",
          image: loaderData.image,
        })
      : {},
  component: BlogRoute,
});

function BlogRoute() {
  return <BlogDetailPage locale="en" post={Route.useLoaderData()} />;
}
