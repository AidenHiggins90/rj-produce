/* ============================================================
   RJ Produce line card.

   One place to edit the catalogue — products.html renders from this.
   Everything here is drawn from RJ's own materials: the trade-show
   banner ("Ataulfo Mangoes, Red Mangoes, Persian Limes, Broccoli
   Crowns, Chile Peppers"), the Produce Market Guide listing, and the
   company's own photography.

   PACK SIZES AND COUNTS ARE DELIBERATELY ABSENT. Nothing published
   states them, so every item says "on request" rather than carrying a
   number a buyer could hold us to. Fill `pack` in as they're confirmed
   and the cards will show them automatically.
   ============================================================ */
window.RJ_CATALOG = {
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
      pack: ""
    },
    {
      name: "Ataulfo mangoes",
      cat: "citrus-tropical",
      img: "rj-mangoes",
      note: "The yellow, thin-skinned variety buyers ask for by name.",
      origin: "Mexico",
      pack: ""
    },
    {
      name: "Red mangoes",
      cat: "citrus-tropical",
      img: "rj-limes-wide",
      note: "Tommy Atkins and related red varieties, alongside the Ataulfo program.",
      origin: "Mexico",
      pack: ""
    },
    {
      name: "Broccoli crowns",
      cat: "vegetables",
      img: "rj-broccoli-hand",
      note: "Packed under three labels — RJ Produce, TIGER and MONKEY — for different buyers.",
      origin: "Mexico",
      brands: ["RJ Produce", "TIGER", "MONKEY"],
      pack: ""
    },
    {
      name: "Cauliflower",
      cat: "vegetables",
      img: "rj-pack-cauliflower",
      note: "Field-packed and wrapped, shipped in our own coliflor cartons.",
      origin: "Mexico",
      pack: ""
    },
    {
      name: "Celery",
      cat: "vegetables",
      img: "rj-celery",
      note: "Cut and packed to buyer specification.",
      origin: "Mexico",
      pack: ""
    },
    {
      name: "Carrots",
      cat: "vegetables",
      img: "rj-broccoli-carrots",
      note: "Shipped alongside the broccoli program for mixed loads.",
      origin: "Mexico",
      pack: ""
    },
    {
      name: "Chile peppers",
      cat: "chiles-herbs",
      img: "rj-chile-peppers",
      note: "Serrano, jalapeño and specialty chiles across the season.",
      origin: "Mexico",
      pack: ""
    },
    {
      name: "Bell peppers",
      cat: "chiles-herbs",
      img: "rj-peppers",
      note: "Red, green and mixed-colour loads.",
      origin: "Mexico &amp; U.S.",
      pack: ""
    },
    {
      name: "Cilantro",
      cat: "chiles-herbs",
      img: "rj-cilantro-bunch",
      note: "Cut and bunched in the field, straight into the cooler.",
      origin: "Mexico",
      pack: ""
    },
    {
      name: "Tomatillos",
      cat: "chiles-herbs",
      img: "rj-tomatillos",
      note: "Husked tomatillos for the Hispanic and foodservice trade.",
      origin: "Mexico",
      pack: ""
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
