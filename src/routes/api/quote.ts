import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

type QuotePayload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  location?: unknown;
  service?: unknown;
  details?: unknown;
  company?: unknown;
  consent?: unknown;
  sourcePath?: unknown;
};
const recent = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

const json = (body: unknown, status: number, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...extra,
    },
  });
const text = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";
const validEmail = (value: string) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const validPhone = (value: string) => !value || /^[+()\d\s-]{6,30}$/.test(value);
const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character] ||
      character,
  );

function clientKey(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local"
  );
}

function rateLimited(key: string) {
  const now = Date.now();
  const active = (recent.get(key) || []).filter((stamp) => now - stamp < WINDOW_MS);
  active.push(now);
  recent.set(key, active);
  return active.length > MAX_REQUESTS;
}

export const Route = createFileRoute("/api/quote")({
  server: {
    handlers: {
      OPTIONS: async () =>
        new Response(null, {
          status: 204,
          headers: { Allow: "POST, OPTIONS", "Cache-Control": "no-store" },
        }),
      GET: async () =>
        json({ ok: false, error: "Method not allowed." }, 405, { Allow: "POST, OPTIONS" }),
      POST: async ({ request }) => {
        const requestId = crypto.randomUUID();
        if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json"))
          return json(
            { ok: false, error: "Content-Type must be application/json.", requestId },
            415,
          );
        const announcedLength = Number(request.headers.get("content-length") || 0);
        if (announcedLength > 32_768)
          return json({ ok: false, error: "Request body is too large.", requestId }, 413);
        if (rateLimited(clientKey(request)))
          return json(
            { ok: false, error: "Too many attempts. Please call or try again later.", requestId },
            429,
            { "Retry-After": "600" },
          );

        let raw: QuotePayload;
        try {
          raw = (await request.json()) as QuotePayload;
        } catch {
          return json({ ok: false, error: "Invalid JSON body.", requestId }, 400);
        }
        const payload = {
          name: text(raw.name, 100),
          phone: text(raw.phone, 30),
          email: text(raw.email, 200).toLowerCase(),
          location: text(raw.location, 100),
          service: text(raw.service, 100),
          details: text(raw.details, 2000),
          company: text(raw.company, 100),
          consent: text(raw.consent, 10),
          sourcePath: text(raw.sourcePath, 300),
        };
        if (payload.company) return json({ ok: false, error: "Request rejected.", requestId }, 400);
        if (
          payload.name.length < 2 ||
          payload.location.length < 2 ||
          payload.details.length < 10 ||
          !payload.service ||
          payload.consent !== "yes"
        )
          return json(
            { ok: false, error: "Required fields are missing or incomplete.", requestId },
            400,
          );
        if (!payload.phone && !payload.email)
          return json(
            { ok: false, error: "Provide at least a phone number or email address.", requestId },
            400,
          );
        if (!validPhone(payload.phone) || !validEmail(payload.email))
          return json({ ok: false, error: "Phone or email format is invalid.", requestId }, 400);

        const resendApiKey = process.env.RESEND_API_KEY?.trim();
        const from = process.env.QUOTE_FROM_EMAIL?.trim();
        const to = process.env.QUOTE_TO_EMAIL?.trim();
        if (!resendApiKey || !from || !to)
          return json(
            {
              ok: false,
              error:
                "Online delivery is not configured yet. Please call 0405 878 406 or email ellisservicesgroup3@gmail.com.",
              requestId,
            },
            503,
          );

        try {
          const lines = [
            `Reference: ${requestId}`,
            `Name: ${payload.name}`,
            `Phone: ${payload.phone || "Not provided"}`,
            `Email: ${payload.email || "Not provided"}`,
            `Suburb or postcode: ${payload.location}`,
            `Service: ${payload.service}`,
            `Source page: ${payload.sourcePath || "Not provided"}`,
            "",
            "Enquiry:",
            payload.details,
          ];
          const provider = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${resendApiKey}`,
              "Idempotency-Key": `sydney-roof-repair-${requestId}`,
            },
            body: JSON.stringify({
              from,
              to: [to],
              subject: `[Sydney Roof Repairs] ${payload.service} enquiry — ${payload.location}`,
              text: lines.join("\n"),
              html: `<h2>New Sydney Roof Repairs enquiry</h2><dl>${[
                ["Reference", requestId],
                ["Name", payload.name],
                ["Phone", payload.phone || "Not provided"],
                ["Email", payload.email || "Not provided"],
                ["Suburb or postcode", payload.location],
                ["Service", payload.service],
                ["Source page", payload.sourcePath || "Not provided"],
              ]
                .map(
                  ([label, value]) =>
                    `<dt><strong>${escapeHtml(label)}</strong></dt><dd>${escapeHtml(value)}</dd>`,
                )
                .join(
                  "",
                )}</dl><h3>Enquiry</h3><p>${escapeHtml(payload.details).replaceAll("\n", "<br>")}</p>`,
              ...(payload.email ? { reply_to: payload.email } : {}),
            }),
            signal: AbortSignal.timeout(10_000),
          });
          const result = (await provider.json().catch(() => null)) as { id?: unknown } | null;
          if (!provider.ok || typeof result?.id !== "string" || !result.id)
            return json(
              {
                ok: false,
                error:
                  "The delivery service did not accept the enquiry. Please call or email instead.",
                requestId,
              },
              502,
            );
          return json({ ok: true, requestId }, 202);
        } catch {
          return json(
            {
              ok: false,
              error: "The delivery service is unavailable. Please call or email instead.",
              requestId,
            },
            503,
          );
        }
      },
    },
  },
});
