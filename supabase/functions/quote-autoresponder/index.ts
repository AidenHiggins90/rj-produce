/**
 * Quote autoresponder — Supabase Edge Function.
 *
 * Fired by a database webhook on INSERT into `contact_submissions`. Sends two
 * emails through Resend: a confirmation to the person who filled in the form,
 * and an internal notification to the desk the request was routed to.
 *
 * Deploy and configuration steps are in ../../README.md.
 */

interface SubmissionRecord {
  id?: string | number;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  message?: string;
  created_at?: string;
}

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/** Desk inboxes keyed by the ROUTE tag the form writes into the message body. */
const DESKS: Record<string, string> = {
  "national-retail": Deno.env.get("INBOX_NATIONAL") ?? "",
  "regional-grocer": Deno.env.get("INBOX_RETAIL") ?? "",
  "foodservice": Deno.env.get("INBOX_FOODSERVICE") ?? "",
  "distributor": Deno.env.get("INBOX_WHOLESALE") ?? "",
  "general": Deno.env.get("INBOX_SALES") ?? "",
};

function routeTag(message = ""): string {
  const m = message.match(/^ROUTE:\s*([a-z-]+)/im);
  const tag = m ? m[1] : "general";
  return tag in DESKS ? tag : "general";
}

function deskInbox(tag: string): string {
  // "…+large" tags route to national accounts; everything else to its own desk
  const base = tag.replace(/\+large$/, "");
  return DESKS[base] || DESKS.general || Deno.env.get("INBOX_SALES") || "";
}

function escapeHtml(s = ""): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));
}

async function send(payload: Record<string, unknown>, apiKey: string) {
  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
  return res.json();
}

function confirmationHtml(r: SubmissionRecord): string {
  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#18241D;max-width:520px">
    <p style="font-size:16px;line-height:1.6">Hi ${escapeHtml((r.name || "").split(" ")[0] || "there")},</p>
    <p style="font-size:16px;line-height:1.6">
      Thanks for the quote request — it's in front of our sales team now. Someone will come back to you
      with pricing and availability within one business day.
    </p>
    <p style="font-size:16px;line-height:1.6">Here's what you sent us:</p>
    <pre style="background:#F2F9F3;border:1px solid #E4EAE6;border-radius:8px;padding:14px;
                font-size:13px;line-height:1.5;white-space:pre-wrap;color:#46514C">${escapeHtml(r.message || "")}</pre>
    <p style="font-size:16px;line-height:1.6">
      If it's urgent, call us at <a href="tel:+19567814000" style="color:#14864F">(956) 781-4000</a> and ask for sales.
    </p>
    <p style="font-size:15px;line-height:1.6;color:#636C66">
      — RJ Produce<br />9005 Travis Drive, Pharr, TX 78577
    </p>
  </div>`;
}

function internalHtml(r: SubmissionRecord, tag: string): string {
  const rows: [string, string][] = [
    ["Name", r.name || "—"],
    ["Company", r.company || "—"],
    ["Email", r.email || "—"],
    ["Phone", r.phone || "—"],
    ["Route", tag],
  ];
  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#18241D">
    <h2 style="font-size:18px;margin:0 0 12px">New quote request — ${escapeHtml(r.company || "unknown company")}</h2>
    <table style="border-collapse:collapse;font-size:14px">
      ${rows.map(([k, v]) =>
        `<tr><td style="padding:4px 14px 4px 0;color:#636C66">${k}</td>
             <td style="padding:4px 0"><strong>${escapeHtml(v)}</strong></td></tr>`).join("")}
    </table>
    <pre style="background:#F7FAF8;border:1px solid #E4EAE6;border-radius:8px;padding:14px;
                font-size:13px;line-height:1.5;white-space:pre-wrap;margin-top:14px">${escapeHtml(r.message || "")}</pre>
  </div>`;
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  // Shared-secret check so only the database webhook can invoke this.
  const expected = Deno.env.get("WEBHOOK_SECRET");
  if (expected && req.headers.get("x-webhook-secret") !== expected) {
    return new Response("Unauthorized", { status: 401 });
  }

  const apiKey = Deno.env.get("RESEND_API_KEY");
  const from = Deno.env.get("MAIL_FROM") ?? "RJ Produce <quotes@rjproduce.com>";
  if (!apiKey) return new Response("RESEND_API_KEY not set", { status: 500 });

  let record: SubmissionRecord;
  try {
    const body = await req.json();
    record = body.record ?? body;                 // Supabase webhooks wrap in { record }
  } catch {
    return new Response("Bad JSON", { status: 400 });
  }
  if (!record?.email) return new Response("No email on record", { status: 400 });

  const tag = routeTag(record.message);
  const inbox = deskInbox(tag);
  const results: Record<string, string> = {};

  try {
    await send({
      from,
      to: [record.email],
      reply_to: inbox || undefined,
      subject: "We got your quote request — RJ Produce",
      html: confirmationHtml(record),
    }, apiKey);
    results.confirmation = "sent";
  } catch (err) {
    // A failed confirmation must not block the internal notification.
    results.confirmation = `failed: ${err instanceof Error ? err.message : String(err)}`;
  }

  if (inbox) {
    try {
      await send({
        from,
        to: [inbox],
        reply_to: record.email,
        subject: `Quote request — ${record.company || record.name || "new lead"} [${tag}]`,
        html: internalHtml(record, tag),
      }, apiKey);
      results.internal = "sent";
    } catch (err) {
      results.internal = `failed: ${err instanceof Error ? err.message : String(err)}`;
    }
  } else {
    results.internal = "skipped: no inbox configured for this route";
  }

  return new Response(JSON.stringify(results), {
    headers: { "Content-Type": "application/json" },
  });
});
