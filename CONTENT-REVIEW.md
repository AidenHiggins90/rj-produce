# Content review — what's sourced and what needs confirming

Every factual claim on the site, and where it came from. Anything marked **CONFIRM**
was written to fit the design and has not been verified against RJ Produce records —
these are the ones that matter, because they're aimed at procurement teams who check.

## Carried over from the previous rj-produce.vercel.app site

Treat as previously published, but worth a re-check since they're now more prominent.

| Claim | Where |
| --- | --- |
| Founded 2004 in Pharr, Texas by Rick Gorena | homepage, about, team |
| 20+ years shipping | homepage proof band, network page |
| 100+ family-farm grower partners | homepage, network, about timeline |
| 365 days a year of continuous supply | homepage, network |
| 100M+ pounds shipped annually | homepage proof band |
| Ships to Costco and Restaurant Depot | homepage, network, about |
| Primus Labs certified facility | homepage badge, capabilities, food safety, purchasing |
| FSMA-compliant documentation for resale | capabilities, food safety, purchasing |
| Joined the GrubMarket family in 2021 | homepage, about, timeline |
| Orders run through WholesaleWare | capabilities, purchasing |
| 9005 Travis Drive, Pharr, TX 78577 · (956) 781-4000 | footer, contact, schema |

## CONFIRM — written for the redesign, not yet verified

| Claim | Where | Note |
| --- | --- | --- |
| Seasonal availability calendar (8 commodities × 12 months) | products page | Labeled illustrative on the page. Peak/available windows are plausible for the Valley and Mexico but are **not** RJ's actual calendar. Replace with real windows or delete the section. |
| Inspection detail — temperature recorded at the door, grade verified against written spec, out-of-spec rejected at the dock, pre-ship check filed to the lot | food safety | Describes a standard program. Confirm this matches what you actually do and document. |
| Lot codes tie to grower, block, and harvest date; printed on the case; recall query in both directions | food safety | Same — this is the claim a retailer will audit. |
| Recall procedure timing — hold and notify at hour 0, scope and document same day | food safety | Confirm against your written recall plan, or replace with it. |
| "Every account is assigned a named contact in each of four roles" | team | Confirm the roles and whether every account really gets all four. |
| Quote requests answered within one business day | contact, purchasing, homepage CTA | Repeated in four places. If the real number is two days, change it — this one gets tested immediately. |
| Documentation packet contents (certificates, insurance, W-9, food-safety records) | food safety CTA | Confirm what you actually send for vendor onboarding. |
| Harvest volume committed before the season opens | capabilities, purchasing, team | Confirm this is how the grower contracts work. |
| What the Veracruz and Tijuana facilities actually do | network page, facilities section | Their existence is confirmed; the site now describes both as sourcing and grower-relationship sites, and ties Veracruz to tropical fruit and Tijuana to the western crossing and Baja calendar. That characterisation is inference from geography — correct it if either does packing, cold storage, or consolidation you'd rather lead with, and add street addresses if you want them listed. |

## Resolved

**Headquarters — unresolved, and the site may have the wrong address.** An earlier
pass concluded Pharr was correct on the strength of trade directories. The company's own
website contradicts that. The archived rjproduceinc.com contact and facilities pages both
give:

> RJ Produce, 5300 George McVay Dr., McAllen, TX 78503 — Ph: (956) 781-4000 (Main Office)

That is the same phone number the site uses. Blue Book Services, Produce Market Guide,
Yahoo Local and Yellow Pages all give 9005 Travis Dr, Pharr, TX 78577 instead. The most
likely reading is that McAllen is the main office and Pharr is the warehouse or an older
listing — but that is a guess. **Decide which address the site should carry**, and whether
both belong on it. Everything currently says Pharr: the footer, the contact page, the map
embed, the LocalBusiness schema, and the Network page.

## Removed as unverifiable

These were in the first draft and have been taken out rather than left to be believed:
"PrimusGFS certified" (the prior site said Primus Labs), "1 mile to the Pharr–Reynosa
bridge", "24 hours field to cross-dock", "48 states reachable by truck", business hours
of Mon–Sat 7:00–6:00, and dated timeline milestones for 2012 and 2018.

## Still missing

- **Named people.** The team page describes four roles but names only the founder. The
  archived company site lists Rick Gorena (General Manager), Melissa Garcia (Office
  Manager / AP), Melissa Cruz (Sales & Procurement), Roy Salinas (Sales Manager) and
  Andy Szabo (Chicago office, sales), with direct numbers and @rjproduceinc.com emails.
  Confirm who is still with the company before putting any of it on the page.
- **Mexico street addresses.** The Veracruz and Tijuana facilities appear on the contact
  page by city only — no public source, including the company's own site, publishes their
  addresses. Supply them and both entries can be completed.
- **Downloadable certificates.** The food-safety page describes the program; buyers
  want the PDF. Drop them in `assets/docs/` and link from the "Request the packet" CTA.
- **Quote form email config.** `/api/quote` is deployed but inert until the Resend
  key and inbox addresses are set in Vercel — see README.md.
- **Legal pages.** privacy.html and terms.html are drafts written to match how the
  site actually behaves; both carry a review notice and need your attorney's pass.
- **Customer references.** No testimonials or logos anywhere. One quote from a
  long-standing buyer would outperform any copy on the site.
