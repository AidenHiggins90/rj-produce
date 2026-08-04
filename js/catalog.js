/* ============================================================
   RJ Produce line card.

   One place to edit the catalogue — products.html renders from this.
   Everything here is drawn from RJ's own materials: the trade-show
   banner ("Ataulfo Mangoes, Red Mangoes, Persian Limes, Broccoli
   Crowns, Chile Peppers"), the Produce Market Guide listing, and the
   company's own photography.

   PACK SIZES ARE INDUSTRY-STANDARD, NOT CONFIRMED BY RJ. They are the
   usual packs for Mexican product crossing at Pharr, published as
   "typical" so a buyer can orient — the written quote governs the sale.
   Replace each `pack` string with the real one and delete `packTypical`
   below to drop the hedge everywhere at once.
   ============================================================ */
window.RJ_CATALOG = {
  /* set to false once the packs above are confirmed by sales */
  packTypical: true,

  categories: [
    { id: "citrus-tropical", label: "Citrus &amp; tropical" },
    { id: "vegetables",      label: "Vegetables" },
    { id: "chiles-herbs",    label: "Chiles &amp; herbs" }
  ],

  items: [
    {
      name: "Persian limes",
      cat: "citrus-tropical",
      img: "rj-limes",
      note: "A core commodity since the early years, shipped from Mexican groves through Pharr.",
      origin: "Mexico",
      pack: "40 lb carton · sizes 110 / 150 / 175 / 200 / 230 / 250"
    },
    {
      name: "Mangoes",
      cat: "citrus-tropical",
      img: "rj-mangoes",
      note: "Ataulfo — the yellow, thin-skinned variety buyers ask for by name — alongside the red varieties.",
      origin: "Mexico",
      pack: "4 kg carton · counts 6–22 by variety"
    },
    {
      name: "Broccoli crowns",
      cat: "vegetables",
      img: "rj-broccoli-hand",
      note: "Packed under three labels — RJ Produce, TIGER and MONKEY — for different buyers.",
      origin: "Mexico",
      brands: ["RJ Produce", "TIGER", "MONKEY"],
      pack: "20 lb carton"
    },
    {
      name: "Cauliflower",
      cat: "vegetables",
      img: "rj-pack-cauliflower",
      note: "Field-packed and wrapped, shipped in our own coliflor cartons.",
      origin: "Mexico",
      pack: "12 ct film-wrapped carton"
    },
    {
      name: "Celery",
      cat: "vegetables",
      img: "rj-celery",
      note: "Cut and packed to buyer specification.",
      origin: "Mexico",
      pack: "24 ct or 30 ct carton"
    },
    {
      name: "Carrots",
      cat: "vegetables",
      img: "rj-broccoli-carrots",
      note: "Shipped alongside the broccoli program for mixed loads.",
      origin: "Mexico",
      pack: "50 lb sack · 48/1 lb cello"
    },
    {
      name: "Chile peppers",
      cat: "chiles-herbs",
      img: "rj-chile-peppers",
      note: "Serrano, jalapeño and specialty chiles across the season.",
      origin: "Mexico",
      pack: "25 lb or 35 lb carton"
    },
    {
      name: "Bell peppers",
      cat: "chiles-herbs",
      img: "rj-peppers",
      note: "Red, green and mixed-colour loads.",
      origin: "Mexico &amp; U.S.",
      pack: "25 lb carton · L / XL / JBO"
    },
    {
      name: "Cilantro",
      cat: "chiles-herbs",
      img: "rj-cilantro-bunch",
      note: "Cut and bunched in the field, straight into the cooler.",
      origin: "Mexico",
      pack: "30 ct or 60 ct carton"
    },
    {
      name: "Tomatillos",
      cat: "chiles-herbs",
      img: "rj-tomatillos",
      note: "Husked tomatillos for the Hispanic and foodservice trade.",
      origin: "Mexico",
      pack: "40 lb carton"
    }
  ],

  brands: [
    { name: "RJ Produce", img: "rj-label-rj",
      note: "Our own label, used across the broccoli program and mixed loads." },
    { name: "TIGER", img: "rj-label-tiger",
      note: "A fresh-broccoli label built for Asian-market buyers, marked in Chinese." },
    { name: "MONKEY", img: "rj-label-monkey",
      note: "The second broccoli label, run alongside TIGER for separate accounts." }
  ]
};
