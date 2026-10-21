import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/Pages";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "Sydney Roof Repairs | Ellis Services",
      description:
        "Sydney roof repair enquiries for leaks, storm damage, tile and metal roofs, flashing, valleys and ridge capping.",
      path: "/",
      locale: "en",
      image: "/media/commercial-roof-overview.webp",
    }),
  component: () => <HomePage locale="en" />,
});
