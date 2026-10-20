import { createFileRoute } from "@tanstack/react-router";
import { PrivacyPage } from "@/components/Pages";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead({
      title: "Privacy | Ellis Services Sydney Roof Repairs",
      description: "How the Sydney Roof Repairs website handles enquiry information.",
      path: "/privacy",
      locale: "en",
    }),
  component: () => <PrivacyPage locale="en" />,
});
