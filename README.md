# Escape Hairdressing: website refresh examples

Design prototypes for [escapehairdressing.co.uk](https://escapehairdressing.co.uk/). **This is not the live site.**

| Page | What it is |
|---|---|
| `index.html` | Start here: the three designs and the price editor |
| `design-1.html` | Classic Rose: warm, with a big photo header and before-and-afters |
| `design-2.html` | Modern Studio: dark and elegant, led by photos |
| `design-3.html` | Quick Book: pick a service, see the price and book at the top of the page |
| `admin.html` | Demo price editor: change a price, Save, and every design updates |
| `prices.js` | The single price list every page reads from |
| `common.js`, `base.css` | Shared hours, open-now status, price list and layout |

Salon photos are loaded from escapehairdressing.co.uk; interior and styling photos are from Unsplash.

## Updating prices

All prices live in `prices.js`. Each service has three prices, one per stylist level (Designer, Director, Senior Director):

```js
{ name: "Shampoo & blowdry", prices: [30, 30, 35] },
{ name: "Hair botox",        prices: [null, null, 150] },            // null = not offered at that level
{ name: "Keratin blowdry",   prices: [120, 120, 150], from: true },  // shows "from £120"
```

The homepage "from £X" figures are calculated from this list, so nothing else needs editing.

On the real WordPress site, the same idea would be a single **Prices** screen in the admin, like `admin.html`. The demo editor only saves to your own browser.

## Viewing locally

Open `index.html` in a browser.
