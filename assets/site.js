(() => {
  const btn = document.querySelector(".menu-btn");
  const nav = document.getElementById("nav");
  const setMenu = (open) => {
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? btn.dataset.close : btn.dataset.open);
    document.body.classList.toggle("menu-open", open);
  };
  btn.addEventListener("click", () => setMenu(btn.getAttribute("aria-expanded") !== "true"));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && document.body.classList.contains("menu-open")) { setMenu(false); btn.focus(); } });
  matchMedia("(min-width: 1101px)").addEventListener("change", () => setMenu(false));

  // Publications: full list is in the HTML; collapse to preview when JS runs.
  const list = document.getElementById("pub-list");
  const tog = document.querySelector(".pub-toggle");
  const setPubs = (expanded) => {
    list.dataset.collapsed = String(!expanded);
    tog.setAttribute("aria-expanded", String(expanded));
    tog.textContent = expanded ? tog.dataset.less : tog.dataset.more;
  };
  tog.hidden = false;
  setPubs(false);
  tog.addEventListener("click", () => {
    const expanded = tog.getAttribute("aria-expanded") === "true";
    setPubs(!expanded);
    if (expanded) list.scrollIntoView({ block: "start" });
  });
})();
// Rail: mark the section currently in view
(() => {
  const links = [...document.querySelectorAll('.nav ol a[href^="#"]')];
  const map = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { links.forEach((l) => { l.classList.remove("is-active"); l.removeAttribute("aria-current"); }); const a = map.get(e.target.id); if (a) { a.classList.add("is-active"); a.setAttribute("aria-current", "location"); } }
  }), { rootMargin: "-45% 0px -50% 0px" });
  map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
})();
