import { createFileRoute } from "@tanstack/react-router";
import { AreasPage } from "@/components/Pages";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/areas")({
  head: () =>
    pageHead({
      title: "Sydney Roof Repair Enquiry Areas | Ellis Services",
      description:
        "Share your Sydney suburb or postcode so roof repair service fit, access and availability can be confirmed.",
      path: "/areas",
      locale: "en",
    }),
  component: () => <AreasPage locale="en" />,
});
