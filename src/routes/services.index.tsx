import { createFileRoute } from "@tanstack/react-router";
import { ServicesIndexPage } from "@/components/Pages";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/services/")({
  head: () =>
    pageHead({
      title: "Roof Repair Services Sydney | Ellis Services",
      description:
        "Explore six Sydney roof repair service paths covering leaks, storm damage, tile and metal roofs, flashing, valleys and ridge capping.",
      path: "/services",
      locale: "en",
    }),
  component: () => <ServicesIndexPage locale="en" />,
});
