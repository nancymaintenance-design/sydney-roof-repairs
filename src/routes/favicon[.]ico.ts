import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

export const Route = createFileRoute("/favicon.ico")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const target = new URL("/sydney-roof-repairs-mark.svg", request.url);
        return Response.redirect(target, 308);
      },
    },
  },
});
