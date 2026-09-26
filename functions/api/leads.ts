interface Env {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
}

interface LeadInput {
  name?: unknown;
  email?: unknown;
  organization?: unknown;
  interest?: unknown;
  website?: unknown;
  consent?: unknown;
}

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });

export const onRequestPost = async ({
  request,
  env,
}: {
  request: Request;
  env: Env;
}) => {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    return json({ error: "Lead capture is not configured." }, 503);
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return json({ error: "Expected a JSON request." }, 415);
  }

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > 8_192) return json({ error: "Request is too large." }, 413);

  let input: LeadInput;
  try {
    input = (await request.json()) as LeadInput;
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  // Honeypot: silently accept automated submissions without storing them.
  if (typeof input.website === "string" && input.website.trim()) {
    return json({ ok: true }, 201);
  }

  const name = typeof input.name === "string" ? input.name.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim() : "";
  const organization =
    typeof input.organization === "string" ? input.organization.trim() : "";
  const interest =
    typeof input.interest === "string" ? input.interest.trim() : "";

  if (
    !name ||
    name.length > 120 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    email.length > 254 ||
    organization.length > 160 ||
    !interest ||
    interest.length > 3_000 ||
    (input.consent !== "on" && input.consent !== true)
  ) {
    return json(
      { error: "Please check the required fields and try again." },
      400,
    );
  }

  const url = `${env.SUPABASE_URL.replace(/\/$/, "")}/rest/v1/leads`;
  const result = await fetch(url, {
    method: "POST",
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      name,
      email,
      organization: organization || null,
      interest,
    }),
  });

  if (!result.ok) {
    console.error("Supabase lead insert failed", result.status);
    return json({ error: "We could not save your inquiry." }, 502);
  }

  return json({ ok: true }, 201);
};
