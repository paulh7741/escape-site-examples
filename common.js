/* Shared behaviour for all three designs: prices (from prices.js), opening hours, open-now, switcher. */
(function () {
  var SETMORE = "https://escapehairdressing.setmore.com/";
  var TEL = "tel:+441316526050";
  var DATA = window.ESCAPE_PRICES || { levels: [], categories: [] };
  var HOURS = [["Monday", null], ["Tuesday", [9.5, 15]], ["Wednesday", [9.5, 17.5]], ["Thursday", [9.5, 19.5]], ["Friday", [9.5, 18]], ["Saturday", [9, 17]], ["Sunday", null]];

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }
  function money(v) { return "£" + (Number.isInteger(v) ? v : v.toFixed(2)); }
  function nums(it) { return it.prices.filter(function (v) { return typeof v === "number"; }); }
  function fmt(v) { var h = Math.floor(v), m = Math.round((v - h) * 60), ap = h >= 12 ? "pm" : "am"; return ((h + 11) % 12 + 1) + (m ? "." + String(m).padStart(2, "0") : "") + ap; }
  function range(r) { return r ? fmt(r[0]) + " – " + fmt(r[1]) : "Closed"; }

  // ---- design switcher strip ----
  var strip = document.querySelector("[data-proto]");
  if (strip) {
    var cur = strip.getAttribute("data-proto");
    var names = { "1": "Classic Rose", "2": "Modern Studio", "3": "Quick Book" };
    strip.innerHTML = '<span class="ps-l">Prototype · not the live site</span><nav>' +
      ["1", "2", "3"].map(function (n) { return '<a href="design-' + n + '.html"' + (n === cur ? ' aria-current="page"' : "") + ">" + n + " · " + names[n] + "</a>"; }).join("") +
      '<a href="admin.html">Price editor</a></nav><a class="ps-r" href="index.html">All designs</a>';
  }

  // ---- hours + open now (Edinburgh time) ----
  var dayIdx = 0, now = 0;
  try {
    var p = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", weekday: "long", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
    var get = function (t) { return p.find(function (x) { return x.type === t; }).value; };
    dayIdx = HOURS.findIndex(function (x) { return x[0] === get("weekday"); });
    now = +get("hour") + (+get("minute")) / 60;
  } catch (e) { var d = new Date(); dayIdx = (d.getDay() + 6) % 7; now = d.getHours() + d.getMinutes() / 60; }
  var today = HOURS[dayIdx][1], open = !!today && now >= today[0] && now < today[1];
  var label = open ? "Open now · until " + fmt(today[1]) : (today && now < today[0] ? "Opens today at " + fmt(today[0]) : "Closed now");
  document.querySelectorAll(".js-open").forEach(function (el) { el.textContent = label; el.classList.toggle("is-open", open); });
  document.querySelectorAll(".js-hours").forEach(function (t) {
    t.innerHTML = HOURS.map(function (d, i) { return '<tr' + (i === dayIdx ? ' class="today"' : "") + "><th>" + d[0] + "</th><td>" + range(d[1]) + "</td></tr>"; }).join("");
  });
  document.querySelectorAll(".js-year").forEach(function (e) { e.textContent = new Date().getFullYear(); });

  // ---- "from £X" (add-ons like toner excluded) ----
  document.querySelectorAll(".js-from").forEach(function (b) {
    var c = DATA.categories.find(function (x) { return x.id === b.dataset.cat; });
    if (!c) return;
    var items = c.items.filter(function (it) { return !it.addon && (!b.dataset.item || it.name.indexOf(b.dataset.item) === 0); });
    var all = items.reduce(function (a, it) { return a.concat(nums(it)); }, []);
    if (all.length) b.textContent = money(Math.min.apply(null, all));
  });

  // ---- full price list with stylist-level toggle ----
  document.querySelectorAll(".js-prices").forEach(function (root) {
    var lvl = 0;
    function draw() {
      root.innerHTML =
        '<div class="pl-levels" role="group" aria-label="Stylist level">' +
        DATA.levels.map(function (l, i) { return '<button type="button" data-l="' + i + '" aria-pressed="' + (i === lvl) + '">' + esc(l) + "</button>"; }).join("") +
        '</div><p class="pl-help">Prices depend on your stylist’s experience. Every level does great work.</p><div class="pl-cats">' +
        DATA.categories.map(function (c) {
          return '<section class="pl-cat"><h3>' + esc(c.name) + "</h3>" + (c.note ? '<p class="pl-note">' + esc(c.note) + "</p>" : "") + "<ul>" +
            c.items.map(function (it) {
              var v = it.prices[lvl];
              var price = typeof v === "number" ? (it.from ? "<small>from</small> " : "") + money(v) : "<small>Senior Director</small>";
              return '<li><span class="pl-name">' + esc(it.name) + '</span><span class="pl-dots"></span><span class="pl-price">' + price + "</span></li>";
            }).join("") +
            '</ul><a class="pl-book" href="' + (c.booking === "phone" ? TEL : SETMORE) + '"' + (c.booking === "phone" ? "" : ' target="_blank" rel="noopener"') + ">" +
            (c.booking === "phone" ? "Call 0131 652 6050 to book" : "Book online") + "</a></section>";
        }).join("") + "</div>" + (DATA.offer ? '<p class="pl-offer">' + esc(DATA.offer) + "</p>" : "");
      root.querySelectorAll(".pl-levels button").forEach(function (b) { b.addEventListener("click", function () { lvl = +b.dataset.l; draw(); root.querySelector('.pl-levels [data-l="' + lvl + '"]').focus(); }); });
    }
    draw();
  });

  // ---- quick-book widget (service + level -> price -> book) ----
  document.querySelectorAll(".js-quickbook").forEach(function (root) {
    var svc = root.querySelector("select[name=service]"), lv = root.querySelector("select[name=level]");
    var out = root.querySelector(".qb-price"), go = root.querySelector(".qb-go"), hint = root.querySelector(".qb-hint");
    svc.innerHTML = DATA.categories.map(function (c, ci) {
      return '<optgroup label="' + esc(c.name) + '">' + c.items.map(function (it, ii) { return '<option value="' + ci + ":" + ii + '">' + esc(it.name) + "</option>"; }).join("") + "</optgroup>";
    }).join("");
    lv.innerHTML = DATA.levels.map(function (l, i) { return '<option value="' + i + '">' + esc(l) + "</option>"; }).join("");
    function upd() {
      var k = svc.value.split(":"), c = DATA.categories[+k[0]], it = c.items[+k[1]], v = it.prices[+lv.value];
      out.innerHTML = typeof v === "number" ? (it.from ? "<small>from</small> " : "") + money(v) : "<small>Not offered at this level</small>";
      var phone = c.booking === "phone";
      go.textContent = phone ? "Call to book · 0131 652 6050" : "Choose a time";
      go.href = phone ? TEL : SETMORE;
      if (phone) go.removeAttribute("target"); else go.target = "_blank";
      hint.textContent = phone ? "Colour needs a quick patch test 48 hours before, so we book it by phone." : "Pick a date and time on our booking page. No account needed.";
    }
    svc.addEventListener("change", upd); lv.addEventListener("change", upd); upd();
  });

  // ---- mobile menu ----
  document.querySelectorAll(".js-menu").forEach(function (b) {
    var nav = document.getElementById(b.getAttribute("aria-controls"));
    b.addEventListener("click", function () { var o = b.getAttribute("aria-expanded") === "true"; b.setAttribute("aria-expanded", !o); nav.classList.toggle("open", !o); });
    nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { b.setAttribute("aria-expanded", "false"); nav.classList.remove("open"); }); });
  });
})();
