import { createFileRoute, notFound } from "@tanstack/react-router";
import { ServiceDetailPage } from "@/components/Pages";
import { serviceBySlug, serviceText } from "@/data/services";
import { buildServiceSchema, pageHead } from "@/lib/seo";
export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = serviceBySlug(params.slug);
    if (!service) throw notFound();
    return service;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const path = `/services/${loaderData.id}`;
    const schema = buildServiceSchema(
      serviceText(loaderData.title, "en"),
      serviceText(loaderData.summary, "en"),
      path,
    );
    const base = pageHead({
      title: `${serviceText(loaderData.title, "en")} | Ellis Services`,
      description: serviceText(loaderData.summary, "en"),
      path,
      locale: "en",
      image: loaderData.image,
    });
    return {
      ...base,
      scripts: schema ? [{ type: "application/ld+json", children: JSON.stringify(schema) }] : [],
    };
  },
  component: ServiceRoute,
});
function ServiceRoute() {
  const service = Route.useLoaderData();
  return <ServiceDetailPage locale="en" service={service} />;
}
