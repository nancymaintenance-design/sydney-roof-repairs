import { createFileRoute } from "@tanstack/react-router";
import { ProjectsPage } from "@/components/Pages";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/projects")({
  head: () =>
    pageHead({
      title: "Sydney Roof Repair Photos | Ellis Services",
      description:
        "Review visible tile, ridge, valley, flashing and metal-roof details, including what each view can help describe and what still needs assessment.",
      path: "/projects",
      locale: "en",
      image: "/media/valley-flashing-repair-01.jpg",
    }),
  component: () => <ProjectsPage locale="en" />,
});
