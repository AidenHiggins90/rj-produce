# Moving to a real domain

The site is on `rj-produce.vercel.app`. That address is fine for review and wrong for
business — a buyer who Googles RJ Produce should land on an RJ Produce domain.

**Your existing domain is a liability right now.** `rjproduceinc.com` resolves, but the
hosting account is suspended and the TLS certificate expired on 4 July 2025. A visitor
today gets a browser security warning, clicks through it, and reads "Account Suspended."
Pointing that domain here fixes a live reputational problem as well as moving the site.

## What I need from you

Only the registrar step — I can't log into your DNS.

1. **Decide the canonical hostname.** `www.rjproduceinc.com` or the bare
   `rjproduceinc.com`. Either works; pick one and the other redirects to it. If you'd
   rather register `rjproduce.com` and start clean, that works the same way.

2. **Add the domain in Vercel.** Project → Settings → Domains → Add. Vercel will show the
   exact records for your case.

3. **Set the DNS records at your registrar.** For an apex domain:

   | Type | Name | Value |
   | --- | --- | --- |
   | A | `@` | `76.76.21.21` |
   | CNAME | `www` | `cname.vercel-dns.com` |

   For a www-canonical setup, the CNAME does the work and the apex redirects. Vercel
   issues and renews the certificate automatically once the records resolve — no more
   expired-certificate problem.

4. **Cancel or repoint the old WordPress hosting** so the suspended site can't come back
   and claim the domain.

## What I do once DNS resolves

One command updates every absolute URL in the site — canonical tags, Open Graph images,
`sitemap.xml`, `robots.txt`, and the JSON-LD `@id` and `url` fields:

```bash
python3 - <<'EOF'
import pathlib, re
OLD = "https://rj-produce.vercel.app"
NEW = "https://www.rjproduceinc.com"      # set to the hostname you chose
for p in list(pathlib.Path('.').glob('*.html')) + [pathlib.Path('sitemap.xml'), pathlib.Path('robots.txt')]:
    p.write_text(p.read_text().replace(OLD, NEW))
print("done — commit and push")
EOF
```

Then: submit the sitemap in Google Search Console, and keep the Vercel address working as
a redirect so any link already shared still resolves.

## Email, while you're in the DNS

The quote form sends through Resend from `MAIL_FROM`. For that mail to reach a buyer's
inbox rather than their spam folder, the sending domain needs SPF and DKIM records —
Resend generates both when you verify the domain. Add a DMARC record at the same time:

| Type | Name | Value |
| --- | --- | --- |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:postmaster@yourdomain.com` |

Start at `p=none` to watch what's actually sending as you, then tighten to `quarantine`
once it looks clean.
