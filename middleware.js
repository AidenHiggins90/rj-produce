/**
 * Site gate — HTTP Basic auth at the edge.
 *
 * This runs on Vercel's edge network before any file is served, so it covers
 * direct requests for products.html, assets and /api/quote, not just the pages
 * a visitor clicks through. That is the difference between a gate and a login
 * screen drawn in the page, which anyone bypasses by requesting the file.
 *
 * The password is never stored here in plain text. The repo holds a SHA-256
 * hash of it; the middleware hashes what the browser sends and compares. A
 * random 27-character password makes the committed hash useless to anyone who
 * finds it.
 *
 * To change the credentials without touching code, set SITE_USER and
 * SITE_PASSWORD in Vercel → Settings → Environment Variables. Those win over
 * the values below. To remove the gate entirely, delete this file.
 */

const FALLBACK_USER = "rjproduce";
const FALLBACK_PASSWORD_SHA256 =
  "3a8cd2a53e0806df84a82555dec383176053aeb8c219965541af70675a540c73";

export const config = {
  // everything except the Vercel internals
  matcher: "/((?!_vercel/).*)",
};

async function sha256Hex(text) {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Compare in constant time so timing can't be used to guess the value. */
function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

const challenge = () =>
  new Response("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="RJ Produce", charset="UTF-8"',
      "Cache-Control": "no-store",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });

export default async function middleware(request) {
  const header = request.headers.get("authorization") || "";
  if (!header.toLowerCase().startsWith("basic ")) return challenge();

  let decoded = "";
  try {
    decoded = atob(header.slice(6).trim());
  } catch {
    return challenge();
  }

  // only split on the first colon — passwords may contain them
  const sep = decoded.indexOf(":");
  if (sep < 0) return challenge();
  const user = decoded.slice(0, sep);
  const password = decoded.slice(sep + 1);

  const expectedUser = (globalThis.process?.env?.SITE_USER || FALLBACK_USER).trim();
  const envPassword = globalThis.process?.env?.SITE_PASSWORD;
  const expectedHash = envPassword
    ? await sha256Hex(envPassword)
    : FALLBACK_PASSWORD_SHA256;

  const userOk = safeEqual(user, expectedUser);
  const passOk = safeEqual(await sha256Hex(password), expectedHash);

  // check both regardless, so a wrong username doesn't return faster
  if (!userOk || !passOk) return challenge();

  return undefined; // authorised — carry on to the static file or function
}
