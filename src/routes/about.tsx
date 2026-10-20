import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/Pages";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: "About Ellis Services Sydney Roof Repairs",
      description:
        "Learn how Ellis Services handles Sydney roof repair enquiries by clarifying the roof issue, site details and practical next step.",
      path: "/about",
      locale: "en",
    }),
  component: () => <AboutPage locale="en" />,
});
