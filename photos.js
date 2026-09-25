/*
  Escape Hairdressing: every photo on the website, one slot each.
  The website fills each <img data-photo="id"> from here, so a photo is
  changed in one place (the Photos tab in admin.html).

  alt    -> a short description, read out by screen readers and used by Google
  title / detail -> captions, only used by the before & after photos
*/
(function () {
  var U = "https://escapehairdressing.co.uk/wp-content/uploads/";
  var S = "https://images.unsplash.com/photo-";
  window.ESCAPE_PHOTOS = {
    sections: [
      { name: "Top of page", slots: [
        { id: "hero", label: "Main photo", wide: true, src: S + "1629397685944-7073f5589754?w=2000&q=75&auto=format&fit=crop", alt: "Stylist curling a client's balayage hair" }
      ]},
      { name: "Services", slots: [
        { id: "svc-cuts",    label: "Cuts & blowdries",   src: U + "2018/11/blowdry-waves-o.png", alt: "Glossy copper waves after a blowdry" },
        { id: "svc-colour",  label: "Colour & balayage",  src: U + "2020/02/eh_home.jpg",          alt: "Long blonde balayage" },
        { id: "svc-styling", label: "Hair ups & kids",    src: U + "2018/11/hairdo-bridal-o.png",  alt: "Braided bridal updo with a hair accessory" }
      ]},
      { name: "Before & after", slots: [
        { id: "ba-1", label: "Transformation 1", src: U + "2021/12/gallery_dark_light_hair.png", alt: "Dark hair lifted to a bright blonde, before and after", title: "Dark to bright blonde", detail: "Full head foils + toner" },
        { id: "ba-2", label: "Transformation 2", src: U + "2021/12/gallery_glowup_orange_hairdye.jpg", alt: "Hair coloured a vivid copper orange, before and after", title: "Copper glow-up", detail: "Full head colour" }
      ]},
      { name: "Gallery", slots: [
        { id: "gal-1", label: "Gallery 1", src: U + "2020/02/eh1.jpg",            alt: "Soft brunette balayage" },
        { id: "gal-2", label: "Gallery 2", src: U + "2020/02/eh2.jpg",            alt: "Icy platinum blonde" },
        { id: "gal-3", label: "Gallery 3", src: U + "2020/02/eh3.jpg",            alt: "Golden curled balayage" },
        { id: "gal-4", label: "Gallery 4", src: U + "2018/10/color-silver.png",   alt: "Silver blonde" },
        { id: "gal-5", label: "Gallery 5", src: U + "2020/02/eh6.jpg",            alt: "Honey balayage" },
        { id: "gal-6", label: "Gallery 6", src: U + "2018/10/colour-blonde.png",  alt: "Blonde bob" }
      ]},
      { name: "Team & salon", slots: [
        { id: "team",  label: "Team photo",     wide: true, src: U + "2018/11/business-award-groupphoto-op.png", alt: "The Escape Hairdressing team at the Scottish Business Awards" },
        { id: "visit", label: "Salon interior", wide: true, src: S + "1521590832167-7bcbfaa6381f?w=1400&q=75&auto=format&fit=crop", alt: "Salon chairs in front of a large mirror" }
      ]}
    ]
  };

  /* Demo only: photos changed in admin.html are kept in this browser and replace the ones above. */
  window.ESCAPE_PHOTOS_EDITED = false;
  var edits = {};
  try { edits = JSON.parse(localStorage.getItem("escape-photos") || "{}"); } catch (e) {}
  window.ESCAPE_PHOTOS.sections.forEach(function (sec) {
    sec.slots.forEach(function (s) {
      s.original = { src: s.src, alt: s.alt, title: s.title, detail: s.detail };
      if (edits[s.id]) { Object.assign(s, edits[s.id]); window.ESCAPE_PHOTOS_EDITED = true; }
    });
  });
})();
