/*
  Escape Hairdressing: the one and only price list.
  Every page (homepage cards, full menu, booking picker) reads from here,
  so a price is changed in one place and updates everywhere.

  prices: [Designer, Director, Senior Director]
    - a number      -> shown as £40
    - null          -> "not offered at this level"
  from: true        -> shown as "from £120"
  addon: true       -> an extra (e.g. toner); left out of the homepage "from" prices
  booking: "online" -> Book button goes to Setmore
           "phone"  -> shows "Call to book" (colour needs a patch test)
*/
window.ESCAPE_PRICES = {
  updated: "2026-09-25",
  levels: ["Designer", "Director", "Senior Director"],
  offer: "Students: 10% off, Tuesday to Thursday",
  categories: [
    {
      id: "cuts", name: "Cuts & blowdry", booking: "online",
      items: [
        { name: "Ladies shampoo, cut & finish", prices: [40, 42, 45] },
        { name: "Shampoo & blowdry",            prices: [30, 30, 35] },
        { name: "Wet or dry cut",               prices: [30, 35, 35] },
        { name: "Keratin blowdry",              prices: [120, 120, 150], from: true },
        { name: "Hair botox",                   prices: [null, null, 150] }
      ]
    },
    {
      id: "colour", name: "Colour", booking: "phone",
      note: "Colour needs a patch test 48 hours before, so please call to book. Toner, cut and blowdry are charged separately.",
      items: [
        { name: "Retouch colour",    prices: [42, 50, 50] },
        { name: "Full head colour",  prices: [52, 60, 60] },
        { name: "Partial foils",     prices: [52, 65, 65] },
        { name: "Half head foils",   prices: [62, 70, 70] },
        { name: "Full head foils",   prices: [72, 85, 85] },
        { name: "Balayage, 60 min",  prices: [95, 95, 95] },
        { name: "Balayage, 75 min",  prices: [105, 105, 105] },
        { name: "Toning & glossing", prices: [17, 17, 17], addon: true }
      ]
    },
    {
      id: "styling", name: "Hair ups & kids", booking: "online",
      items: [
        { name: "Hair up",                      prices: [40, 40, 40], from: true },
        { name: "Children under 5, cut",        prices: [10, 10, 10] },
        { name: "Children 5–10, cut",           prices: [16, 16, 16] },
        { name: "Children 5–10, cut & blowdry", prices: [30, 30, 30] }
      ]
    }
  ]
};

/* Demo only: prices edited on admin.html are kept in this browser and override the list above. */
window.ESCAPE_PRICES_ORIGINAL = JSON.parse(JSON.stringify(window.ESCAPE_PRICES));
try {
  var edited = localStorage.getItem("escape-prices");
  if (edited) { window.ESCAPE_PRICES = JSON.parse(edited); window.ESCAPE_PRICES_EDITED = true; }
} catch (e) {}
