# Photo brief — RJ's own photography

**Update, August 2026:** the stock photography has been replaced. rjproduceinc.com is
offline (suspended hosting, certificate expired July 2025), but 34 of RJ's own images
survive in the Internet Archive and 20 of them are now on the site, along with the real
logo and favicon.

What's live: field and harvest shots from Puebla and the Mexican growing regions, RJ
PRODUCE / TIGER / MONKEY branded cartons on pallets, packed cauliflower, commodity shots
of limes, peppers, cilantro, broccoli, carrots, celery and tomatillos, and the trade-show
booth. One stock image remains — the warehouse tablet on the digital-ordering card and
the food-safety inspection section — because no RJ equivalent exists in the archive.

These are 2016–2021 photos at phone resolution (most 768–1200px). They are honest and
recognisably yours, which beats polished stock, but a fresh shoot would still upgrade the
hero and the facility slots. The brief below stands for that.

---

## How replacement works

Each slot below is a filename in `assets/img/`. Drop a new photo in at the same
filename and it appears everywhere that slot is used — no code changes. Two formats
per slot:

```bash
# from the repo root, for a photo named source.jpg
python3 - <<'EOF'
from PIL import Image
im = Image.open('source.jpg').convert('RGB'); w, h = im.size
def r(mw): return im if w <= mw else im.resize((mw, round(h*mw/w)), Image.LANCZOS)
r(1400).save('assets/img/SLOTNAME.webp', 'WEBP', quality=72, method=6)
r(1100).save('assets/img/SLOTNAME.jpg', 'JPEG', quality=78, optimize=True, progressive=True)
EOF
```

Shoot landscape (roughly 3:2) unless noted. Avoid heavy filters — the design supplies
its own color.

## Priority 1 — the six slots that carry the site

| Slot | Where it appears | What to shoot |
| --- | --- | --- |
| `rj-hero-field` | Homepage hero | **The single most important shot.** Packed RJ product, ideally branded cartons, well lit. Landscape, room on one side for nothing — it's cropped 4:3.2. |
| `rj-pallets` | Homepage cross-border card | Your Pharr dock with reefers backed in. Early morning light. Show the building if signage is visible. |
| `rj-cilantro-fields` / `rj-field-rows` | Homepage sourcing card, grower network | A partner farm mid-harvest — crew, rows, crates being filled. This is the "direct from the grower" proof shot. Portrait or landscape both work. |
| `rj-branded-cartons` | Homepage packing card, private-label section | Palletized product in your cooler, stacked and labeled. Lot tags visible is a bonus. |
| `gm-warehousetablet` | Homepage digital card, food-safety inspection — **still stock** | Someone from your team inspecting a load with a tablet or clipboard. A real person from RJ, not a model. |
| `rj-cilantro-hands` | Team page, homepage "who we are" | Your people. A handshake with a grower, or the sales desk mid-call. Currently a stock handshake, which is the weakest image on the site. |

## Priority 2 — supporting slots

| Slot | Where | What to shoot |
| --- | --- | --- |
| `gm-market` | Wholesale section, contact page | Product on a customer's shelf, or a full cooler at your facility. |
| `gm-storefront` | About page story, homepage retail tile | The Pharr facility from outside, with signage. |
| `gm-aisle` | Homepage "regional grocers" tile | Produce department of a customer store (get permission). |
| `gm-deliveryvan` | Capabilities cross-border card | A loaded truck departing, or a crossing at the bridge. |
| `gm-produceboxes` | Homepage cold-chain card, capabilities wholesale card | Tight product shot — a single tomato or pepper, shallow depth of field. |
| `boxes` | Homepage year-round card | Crates of mixed product, currently a white-background studio shot. |
| `field-old` | Seasonal-programs tiles | Wide field shot, ideally the Valley. |

## Priority 3 — the catalog

`assets/img/produce/p-*.jpg` — 19 commodity photos on the products page, 4:3, shown at
about 300px wide. These are the least urgent to replace: a good stock tomato reads as
a tomato. But if you shoot your own packs, they double as sell sheets. The filenames are
opaque hashes; `products.html` maps each to its label (tomatoes, peppers, citrus…).

## What to capture while a photographer is on site

Beyond the slots above, these have no home yet but will as the site grows: the
certification wall or framed audit, a lot label close-up, the QA bench, a crew meeting,
and one clean exterior at golden hour for future OG/social images.
