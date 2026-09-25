# Escape Hairdressing: new website prototype (Classic Rose)

- Website: `index.html`
- Admin: `admin.html` (not linked from the website)

Design prototype for [escapehairdressing.co.uk](https://escapehairdressing.co.uk/). **This is not the live site.**

| File | What it is |
|---|---|
| `index.html` | The Classic Rose homepage |
| `admin.html` | Admin demo: **Prices** tab (edit prices, raise all at once) and **Photos** tab (replace any photo, edit captions) |
| `photos.js` | Every photo on the site, one named slot each |
| `prices.js` | The single price list the site reads from |
| `common.js`, `base.css` | Opening hours, open-now status, price list and shared layout |
| `design-1/2/3.html` | Redirects to `index.html` for older links |

## Updating prices

All prices live in `prices.js`. Each service has three prices, one per stylist level (Designer, Director, Senior Director):

```js
{ name: "Shampoo & blowdry", prices: [30, 30, 35] },
{ name: "Hair botox",        prices: [null, null, 150] },            // null = not offered at that level
{ name: "Keratin blowdry",   prices: [120, 120, 150], from: true },  // shows "from £120"
```

The homepage "from £X" figures are calculated from this list.

Salon photos are loaded from escapehairdressing.co.uk; interior and styling photos are from Unsplash.
