import { createFileRoute } from "@tanstack/react-router";
import { BlogIndexPage } from "@/components/BlogPages";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/blog/")({
  head: () =>
    pageHead({
      title: "Sydney Roof Repair Guides | Ellis Services",
      description:
        "Practical Sydney roof repair guides covering leaks, storm observations, tile and metal roofs, photos, access and enquiry planning.",
      path: "/blog",
      locale: "en",
    }),
  component: () => <BlogIndexPage locale="en" />,
});
