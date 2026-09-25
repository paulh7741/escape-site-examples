# Escape Hairdressing: website refresh examples

Design prototypes for [escapehairdressing.co.uk](https://escapehairdressing.co.uk/). **This is not the live site.**

| Page | What it is |
|---|---|
| `index.html` | Review of the current site, plus three homepage directions (A Neighbourhood, B Studio, C Book-first) with a desktop/phone toggle |
| `admin.html` | Demo of the price editor: change a price, click Save, and every page updates |
| `prices.js` | The single price list every page reads from |

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
