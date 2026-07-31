/**
 * Quote request handler — Vercel Serverless Function.
 *
 * POST /api/quote  { name, company, email, phone, type, volume, products, message, website }
 *
 * Sends two emails through Resend: the request to the desk it routes to, and a
 * confirmation to the buyer. No database — the sales inbox is the record.
 *
 * Required environment variables (Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY   Resend API key
 *   MAIL_FROM        e.g. "RJ Produce <quotes@rjproduce.com>" (domain must be verified in Resend)
 *   INBOX_SALES      fallback inbox — the only one that is strictly required
 * Optional, per-desk overrides:
 *   INBOX_NATIONAL, INBOX_RETAIL, INBOX_FOODSERVICE, INBOX_WHOLESALE
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const PHONE = "(956) 781-4000";

/** Business type → desk name and inbox env var. */
const ROUTES = {
  "National retail": { tag: "national-retail", desk: "National accounts", env: "INBOX_NATIONAL" },
  "Regional grocer": { tag: "regional-grocer", desk: "Retail sales", env: "INBOX_RETAIL" },
  "Foodservice": { tag: "foodservice", desk: "Foodservice sales", env: "INBOX_FOODSERVICE" },
  "Distributor": { tag: "distributor", desk: "Wholesale / cross-border", env: "INBOX_WHOLESALE" },
  "Other": { tag: "general", desk: "Sales", env: "INBOX_SALES" },
};

function routeFor(type, volume) {
  const base = ROUTES[type] || ROUTES.Other;
  // biggest accounts go to the national desk whatever the segment
  if (volume === "20+ truckloads") {
    return { ...ROUTES["National retail"], tag: base.tag + "+large" };
  }
  return base;
}

function inboxFor(route) {
  return process.env[route.env] || process.env.INBOX_SALES || "";
}

const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const clean = (v, max = 500) => String(v ?? "").trim().slice(0, max);

/** Header injection guard: subjects and addresses must stay single-line. */
const oneLine = (s) => clean(s, 200).replace(/[\r\n]+/g, " ");

function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) && v.length <= 254;
}

async function sendMail(payload, apiKey) {
  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
  return res.json();
}

function internalEmail(d, route) {
  const rows = [
    ["Company", d.company],
    ["Name", d.name],
    ["Email", d.email],
    ["Phone", d.phone || "—"],
    ["Business type", d.type || "—"],
    ["Monthly volume", d.volume || "—"],
    ["Products", d.products || "—"],
    ["Route", `${route.tag} → ${route.desk}`],
  ];
  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#18241D">
    <h2 style="font-size:19px;margin:0 0 4px">Quote request — ${esc(d.company)}</h2>
    <p style="margin:0 0 16px;color:#636C66;font-size:14px">Reply to this email to answer ${esc(d.name)} directly.</p>
    <table style="border-collapse:collapse;font-size:14px">
      ${rows.map(([k, v]) =>
        `<tr><td style="padding:5px 16px 5px 0;color:#636C66;vertical-align:top">${k}</td>
             <td style="padding:5px 0"><strong>${esc(v)}</strong></td></tr>`).join("")}
    </table>
    ${d.message ? `<p style="margin:18px 0 6px;color:#636C66;font-size:14px">Message</p>
    <pre style="background:#F7FAF8;border:1px solid #E4EAE6;border-radius:8px;padding:14px;font-size:14px;
                line-height:1.55;white-space:pre-wrap;margin:0;font-family:inherit">${esc(d.message)}</pre>` : ""}
  </div>`;
}

function confirmationEmail(d) {
  const first = esc(d.name.split(" ")[0] || "there");
  const lines = [
    ["Business type", d.type],
    ["Monthly volume", d.volume],
    ["Products of interest", d.products],
  ].filter(([, v]) => v);
  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#18241D;max-width:540px">
    <p style="font-size:16px;line-height:1.6">Hi ${first},</p>
    <p style="font-size:16px;line-height:1.6">
      Thanks for the quote request — it's with our sales team now, and someone will come back to you
      with pricing and availability within one business day.
    </p>
    ${lines.length ? `<table style="border-collapse:collapse;font-size:14px;margin:18px 0">
      ${lines.map(([k, v]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#636C66">${k}</td>
             <td style="padding:4px 0"><strong>${esc(v)}</strong></td></tr>`).join("")}
    </table>` : ""}
    <p style="font-size:16px;line-height:1.6">
      If it's urgent, call <a href="tel:+19567814000" style="color:#14864F">${PHONE}</a> and ask for sales.
    </p>
    <p style="font-size:15px;line-height:1.6;color:#636C66;margin-top:26px">
      RJ Produce, Inc.<br />9005 Travis Drive, Pharr, TX 78577<br />
      Grower &amp; shipper of fresh fruits and vegetables since 2004
    </p>
  </div>`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = typeof req.body === "string" ? safeParse(req.body) : req.body || {};

  // Honeypot: a real person never fills a hidden field. Accept and drop silently
  // so the bot sees success and doesn't retry.
  if (clean(body.website)) return res.status(200).json({ ok: true });

  const d = {
    name: clean(body.name, 120),
    company: clean(body.company, 160),
    email: oneLine(body.email),
    phone: clean(body.phone, 60),
    type: clean(body.type, 60),
    volume: clean(body.volume, 60),
    products: clean(body.products, 300),
    message: clean(body.message, 4000),
  };

  if (!d.name || !d.company || !isEmail(d.email)) {
    return res.status(400).json({ error: "Name, company, and a valid work email are required." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;
  const route = routeFor(d.type, d.volume);
  const inbox = inboxFor(route);

  if (!apiKey || !from || !inbox) {
    // Misconfiguration must not look like a delivered request.
    console.error("quote: missing config", {
      hasKey: !!apiKey, hasFrom: !!from, hasInbox: !!inbox, route: route.tag,
    });
    return res.status(500).json({ error: "Mail is not configured on this deployment." });
  }

  try {
    await sendMail({
      from,
      to: [inbox],
      reply_to: d.email,
      subject: oneLine(`Quote request — ${d.company} [${route.tag}]`),
      html: internalEmail(d, route),
    }, apiKey);
  } catch (err) {
    // If the desk never hears about it, the request is lost — report the failure.
    console.error("quote: internal send failed", err);
    return res.status(502).json({ error: "We couldn't deliver your request." });
  }

  let confirmation = "sent";
  try {
    await sendMail({
      from,
      to: [d.email],
      reply_to: inbox,
      subject: "We got your quote request — RJ Produce",
      html: confirmationEmail(d),
    }, apiKey);
  } catch (err) {
    // The team has the lead; a failed confirmation is not the buyer's problem.
    console.error("quote: confirmation send failed", err);
    confirmation = "failed";
  }

  return res.status(200).json({ ok: true, desk: route.desk, confirmation });
}

function safeParse(s) {
  try { return JSON.parse(s); } catch { return {}; }
}
