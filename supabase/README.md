# Quote form backend

The quote form on `contact.html` inserts into the Supabase table `contact_submissions`
using the publishable (anon) key. Nothing else is required for the form to work — it
already does.

What's in here is the optional piece: an autoresponder that emails the requester a
confirmation and notifies the right internal desk. **It is not deployed yet.** Until it
is, quote requests land in the Supabase table and nothing is emailed anywhere.

## What the routing does

`contact.html` writes a routing line as the first line of the message body:

```
ROUTE: national-retail → National accounts
```

| Business type   | Tag               | Desk                     |
| --------------- | ----------------- | ------------------------ |
| National retail | `national-retail` | National accounts        |
| Regional grocer | `regional-grocer` | Retail sales             |
| Foodservice     | `foodservice`     | Foodservice sales        |
| Distributor     | `distributor`     | Wholesale / cross-border |
| Other           | `general`         | Sales                    |

Any request for 20+ truckloads is tagged `…+large` and goes to national accounts
regardless of segment.

Routing lives in the message body rather than its own column so it works against the
existing table. If you'd rather have it queryable, add a `route text` column and set it
alongside the other fields in the form's insert call.

## Deploying the autoresponder

1. **Get a sending domain.** Resend (or any transactional provider) needs a verified
   domain — `rjproduce.com` — before it will send as `quotes@rjproduce.com`. Free tier
   covers this volume.

2. **Set the secrets** on the Supabase project:

   ```bash
   supabase secrets set \
     RESEND_API_KEY=re_xxx \
     MAIL_FROM="RJ Produce <quotes@rjproduce.com>" \
     WEBHOOK_SECRET=$(openssl rand -hex 24) \
     INBOX_NATIONAL=national@rjproduce.com \
     INBOX_RETAIL=sales@rjproduce.com \
     INBOX_FOODSERVICE=foodservice@rjproduce.com \
     INBOX_WHOLESALE=wholesale@rjproduce.com \
     INBOX_SALES=sales@rjproduce.com
   ```

   Any inbox you leave unset falls back to `INBOX_SALES`.

3. **Deploy the function:**

   ```bash
   supabase functions deploy quote-autoresponder --no-verify-jwt
   ```

4. **Wire the database webhook.** In the Supabase dashboard: Database → Webhooks → new
   webhook on `contact_submissions`, event `INSERT`, type HTTP Request, method POST,
   URL `https://<project-ref>.supabase.co/functions/v1/quote-autoresponder`, with header
   `x-webhook-secret: <the WEBHOOK_SECRET value>`.

5. **Test** by submitting the live form. The function returns
   `{"confirmation":"sent","internal":"sent"}` — check Supabase → Edge Functions → Logs
   if either says `failed`.

6. **Update the form's success message.** Once real mail is flowing, `contact.html` can
   promise the confirmation email; today it deliberately doesn't, because nothing sends one.

## Security note

The publishable key in `contact.html` is safe to expose *only if* row-level security on
`contact_submissions` allows `INSERT` for the anon role and nothing else. Verify that no
`SELECT` policy exists for anon — otherwise every submitted lead is world-readable.
