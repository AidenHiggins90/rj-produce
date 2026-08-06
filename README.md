# RJ Produce

Static marketing site for RJ Produce, a grower–shipper in Pharr, Texas. Plain HTML, one
shared stylesheet, one shared header/footer script, and a single serverless function for
the quote form. No build step — what's in the repo is what ships.

Deployed from `main` to https://rj-produce.vercel.app via Vercel's GitHub integration.

```
index.html … contact.html   pages (9)
css/style.css               GrubMarket design system, pruned to what this site uses
css/rj.css                  RJ-specific layer
js/layout.js                header + footer injection, scroll reveal, stat count-ups
api/quote.js                quote form handler (Vercel Serverless Function)
assets/                     fonts, icons, photography
js/catalog.js               the line card — edit products and pack sizes here
CONTENT-REVIEW.md           every factual claim and whether it's confirmed
PHOTO-BRIEF.md              photography: what's live and what's still worth shooting
DOMAIN.md                   moving off the vercel.app address, plus email DNS
TESTIMONIAL.md              how to get the customer quote, and where it goes
```

Local preview — any static server works, but `/api/quote` only runs under Vercel:

```bash
npx serve -l 5050 .
```

## Quote form

`contact.html` POSTs JSON to `/api/quote`. The function emails the request to the desk it
routes to and sends the buyer a confirmation. There is no database: the sales inbox is the
record.

**The form is inert until the environment variables below are set.** Without them the
function returns 500 and the page tells the buyer to call — which is also what happens
today, since the Supabase project this form previously used no longer exists.

### Routing

| Business type   | Desk                     | Inbox variable     |
| --------------- | ------------------------ | ------------------ |
| National retail | National accounts        | `INBOX_NATIONAL`   |
| Regional grocer | Retail sales             | `INBOX_RETAIL`     |
| Foodservice     | Foodservice sales        | `INBOX_FOODSERVICE`|
| Distributor     | Wholesale / cross-border | `INBOX_WHOLESALE`  |
| Other / blank   | Sales                    | `INBOX_SALES`      |

Any request for 20+ truckloads goes to national accounts regardless of segment. Any
inbox left unset falls back to `INBOX_SALES`.

### Setup

1. **Create a Resend account** and verify the sending domain (`rjproduce.com`). Resend's
   free tier covers this volume. The domain must be verified or mail will bounce.

2. **Add the environment variables** in Vercel → Project → Settings → Environment
   Variables, for Production and Preview:

   | Variable | Example | Required |
   | --- | --- | --- |
   | `RESEND_API_KEY` | `re_…` | yes |
   | `MAIL_FROM` | `RJ Produce <quotes@rjproduce.com>` | yes |
   | `INBOX_SALES` | `sales@rjproduce.com` | yes |
   | `INBOX_NATIONAL` | `national@rjproduce.com` | optional |
   | `INBOX_RETAIL` | `retail@rjproduce.com` | optional |
   | `INBOX_FOODSERVICE` | `foodservice@rjproduce.com` | optional |
   | `INBOX_WHOLESALE` | `wholesale@rjproduce.com` | optional |

3. **Redeploy** so the function picks the variables up (Deployments → ⋯ → Redeploy).

4. **Test** with a real submission on the live form. Expect the routed desk named in the
   success message, a confirmation in the buyer's inbox, and the request in the desk inbox
   with reply-to set to the buyer. If anything fails, the cause is logged in Vercel →
   Deployments → Functions → `api/quote`.

### Spam handling

A hidden `website` field is a honeypot: anything that fills it gets a 200 and is dropped,
so bots don't retry. If real spam gets through later, add a rate limit or Turnstile —
neither is worth the friction until it's actually a problem.

## Site gate

The whole site sits behind HTTP Basic auth, enforced by `middleware.js` at
Vercel's edge — before any file is served, so direct requests for `products.html`,
an image or `/api/quote` are covered too. That is the part a login screen drawn in
the page cannot do.

The repo holds a SHA-256 hash of the password, never the password itself.

To change the credentials, set `SITE_USER` and `SITE_PASSWORD` in Vercel →
Settings → Environment Variables and redeploy; they override the values compiled
in. To remove the gate, delete `middleware.js` and redeploy.

**While the gate is on, search engines cannot crawl the site** — every request
returns 401. Remove it before you want the site indexed.

## Analytics

Not enabled. The Vercel Web Analytics tag was removed after the audit: the project
doesn't have Web Analytics switched on, so `/_vercel/insights/script.js` 404s and every
page logged two console errors for a feature that wasn't recording anything.

To turn it on: Vercel → Project → Analytics → enable Web Analytics, then add this before
`</body>` on each page (it's cookieless, so it needs no consent banner):

```html
<script defer src="/_vercel/insights/script.js"></script>
```

Check the network tab afterwards — the script should return 200, not 404.
