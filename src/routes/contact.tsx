import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/Pages";
import { pageHead } from "@/lib/seo";

type ContactSearch = { service?: string };

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): ContactSearch =>
    typeof search.service === "string" ? { service: search.service } : {},
  head: () =>
    pageHead({
      title: "Contact Sydney Roof Repairs | Ellis Services",
      description:
        "Call, email or securely send details about a Sydney roof repair enquiry. The form reports success only after delivery is accepted.",
      path: "/contact",
      locale: "en",
    }),
  component: ContactRoute,
});

function ContactRoute() {
  const { service } = Route.useSearch();
  return <ContactPage locale="en" initialServiceId={service} />;
}
