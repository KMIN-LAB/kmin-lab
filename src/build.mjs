// Static site generator: node src/build.mjs → dist/
import { mkdirSync, cpSync, writeFileSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import * as C from "./content.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const lines = (arr) => arr.map((l) => `<span class="ln">${esc(l)}</span>`).join(" ");
const scientific = (s) => esc(s).replaceAll("Candida albicans", '<i lang="la">Candida albicans</i>');
const markAuthors = (c) => scientific(c).replace(/\bK Min([*†]?)/g, '<b class="me">K Min$1</b>');
const mapUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("부산광역시 남구 용소로 45 부경대학교");

function page(locale) {
  const t = C.copy[locale];
  const a = locale === "ko" ? "assets/" : "../assets/";
  const other = locale === "ko" ? { href: "en/", label: "EN", lang: "en", name: "English" } : { href: "../", label: "KO", lang: "ko", name: "한국어" };
  const img = (o, alt, cls = "", extra = "") => `<img src="${a}${o.image}" width="${o.width}" height="${o.height}" alt="${esc(alt)}" ${cls ? `class="${cls}"` : ""} ${extra}>`;
  const langSwitch = `<div class="lang" role="group" aria-label="Language">
      <a href="${locale === "ko" ? "./" : "../"}" lang="ko" ${locale === "ko" ? 'aria-current="true"' : ""}>KO</a><a href="${locale === "ko" ? "en/" : "./"}" lang="en" ${locale === "en" ? 'aria-current="true"' : ""}>EN</a>
    </div>`;
  const years = [...new Set(C.publications.map((p) => p.year))];
  let idx = 0;
  const pubGroups = years.map((y) => {
    const items = C.publications.filter((p) => p.year === y).map((p) => {
      const hidden = idx++ >= C.PUB_PREVIEW;
      return `<li class="pub${hidden ? " is-extra" : ""}">${markAuthors(p.citation)}</li>`;
    }).join("");
    const allHidden = C.publications.findIndex((p) => p.year === y) >= C.PUB_PREVIEW;
    return `<div class="pub-year${allHidden ? " is-extra" : ""}"><h3 class="year mono">${y}</h3><ol>${items}</ol></div>`;
  }).join("");
  const rest = C.publications.length - C.PUB_PREVIEW;

  const ko = locale === "ko";
  const appts = C.career.slice(0, 6), edu = C.career.slice(6);
  const cvRows = (rows) => rows.map(([y, r, p, rk, pk]) => `<li><span class="mono">${y}</span><strong>${esc(ko ? rk : r)}</strong><span class="cv-p">${esc(ko ? pk : p)}</span></li>`).join("");
  return `<!doctype html>
<html lang="${locale}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t.htmlTitle)}</title>
<meta name="description" content="${esc(t.description)}">
<link rel="alternate" hreflang="${other.lang}" href="${other.href}">
<link rel="icon" href="${a}favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css">
<link rel="stylesheet" href="${a}site.css">
</head>
<body class="l-${locale}">
<a class="skip" href="#main">${t.skip}</a>
<header class="bar" id="top">
  <a class="wordmark" href="./" aria-label="Min Lab">MIN LAB</a>
  <nav class="nav" id="nav" aria-label="${esc(t.navLabel)}">
    <ol>${t.nav.map(([l, h]) => `<li><a href="#${h}">${esc(l)}</a></li>`).join("")}</ol>
    ${langSwitch}
  </nav>
  <button class="menu-btn" type="button" aria-controls="nav" aria-expanded="false" data-open="${esc(t.menuOpen)}" data-close="${esc(t.menuClose)}" aria-label="${esc(t.menuOpen)}"><span></span><span></span></button>
</header>

<main id="main">
<section class="hero" aria-labelledby="hero-h">
  <div class="hero-text">
    <h1 id="hero-h">${lines(t.hero2)}</h1>
    <p class="hero-line">${esc(t.heroLine)}</p>
    <p class="hero-sub">${scientific(t.hero2Sub)}</p>
    <p class="actions"><a class="btn" href="#research">${esc(t.cta1)}</a><a class="btn btn-ghost" href="#join">${esc(t.cta2)}</a></p>
  </div>
  <figure class="hero-fig">${img({ image: "figures/hero-evidence.png", width: 720, height: 660 }, t.heroImgAlt, "", 'fetchpriority="high"')}</figure>
</section>

<section class="about" id="about" aria-labelledby="about-h">
  <div class="in">
    <p class="eyebrow">${esc(t.aboutLabel)}</p>
    <h2 class="display" id="about-h">${lines(t.aboutHead)}</h2>
    <div class="about-body">${t.aboutParagraphs.map((p) => `<p>${esc(p)}</p>`).join("")}</div>
    <ul class="stats">${C.harmStats.map((h) => `<li><span class="stat-n">${esc(h.n[locale])}</span><span class="stat-l">${esc(h[locale])}</span><a class="stat-src" href="${h.url}" target="_blank" rel="noopener">${esc(h.src)} ↗</a></li>`).join("")}</ul>
    <ul class="method-tags" aria-label="${esc(t.methodsLabel)}">${t.methods.map((m) => `<li>${esc(m)}</li>`).join("")}</ul>
  </div>
</section>

<section class="research" id="research" aria-labelledby="research-h">
  <div class="in research-intro">
    <p class="eyebrow">${esc(t.researchKicker)}</p>
    <h2 class="display" id="research-h">${esc(t.researchHead)}</h2>
    <p class="intro">${esc(t.researchSubtitle)}</p>
  </div>
  ${t.research.map((r, i) => `
  <article class="topic topic-${i + 1}" aria-labelledby="topic-h-${i + 1}">
    <div class="in">
      <p class="topic-k"><span class="topic-n">0${i + 1}</span></p>
      <h3 class="lead" id="topic-h-${i + 1}">${esc(r.title.join(" "))}</h3>
      <div class="topic-grid">
        <p class="topic-body">${esc(r.body)}</p>
        <figure class="topic-fig">${img(C.figures[i], r.alt, "", 'loading="lazy"')}</figure>
      </div>
    </div>
  </article>`).join("")}
</section>


<section class="people" id="people" aria-labelledby="people-h">
  <div class="in">
    <p class="eyebrow">${esc(t.peopleKicker)}</p>
    <h2 class="display" id="people-h">${esc(t.peopleHead)}</h2>
    <div class="pi">
      <figure class="pi-photo">${img({ image: "people/kyunghun-min.png", width: 1280, height: 1871 }, t.piAlt, "", 'loading="lazy"')}</figure>
      <div class="pi-text">
        <p class="mono pi-k">${esc(t.piKicker)}</p>
        <h3 class="pi-name">${esc(t.piName)} <span lang="${ko ? "en" : "ko"}">${esc(t.piNameAlt)}</span></h3>
        <p class="pi-role">${esc(t.piRole)}</p>
        <p class="pi-links"><a href="mailto:${C.links.email}">${C.links.email}</a><a href="${C.links.scholar}" target="_blank" rel="noopener">${esc(t.scholar)} ↗</a></p>
        <div class="cv">
          <h4 class="mono">${esc(t.careerHeading)}</h4>
          <ul>${cvRows(appts)}</ul>
          <ul class="cv-edu">${cvRows(edu)}</ul>
        </div>
      </div>
    </div>
    <div class="students">
      <h3><span class="mono">${esc(t.studentsKicker)}</span>${esc(t.studentsTitle)}</h3>
      <ul>${C.members.map((m, i) => `
        <li>${img(m, `${ko ? m.ko : m.en} ${t.memberAltSuffix}`, "", 'loading="lazy"')}
          <div><p class="st-name">${esc(ko ? m.ko : m.en)} <span lang="${ko ? "en" : "ko"}">${esc(ko ? m.en : m.ko)}</span></p><p class="st-edu">${esc(t.memberEducation[i])}</p></div></li>`).join("")}
      </ul>
    </div>
  </div>
</section>

<section class="duo" id="lab" aria-labelledby="lab-h">
  <p class="eyebrow duo-label" id="lab-h">Inside the Lab</p>
  <figure class="g-main">${img(C.photos.group, t.photoAlts.group, "", 'loading="lazy"')}</figure>
  <figure>${img(C.photos.culture, t.photoAlts.culture, "", 'loading="lazy"')}</figure>
  <figure>${img(C.photos.microscope, t.photoAlts.microscope, "", 'loading="lazy"')}</figure>
  <p class="mono duo-cap">${C.photoCaption}</p>
</section>

<section class="pubs" id="publications" aria-labelledby="pubs-h">
  <div class="in">
    <p class="eyebrow">${esc(t.pubKicker)} · ${esc(t.pubTitle)}</p>
    <div class="pubs-head">
      <h2 class="display" id="pubs-h">${esc(t.pubHead)}</h2>
      <p class="pub-big"><span class="stat-n">${C.publications.length}</span><span class="mono">${esc(t.pubNote)}</span></p>
    </div>
    <div class="pub-list" id="pub-list" data-collapsed="false">${pubGroups}</div>
    <button class="btn btn-line pub-toggle" type="button" aria-controls="pub-list" aria-expanded="true" data-more="${esc(t.more(rest))}" data-less="${esc(t.less)}" hidden>${esc(t.less)}</button>
    <div class="patents">
      <h3 class="mono">${esc(t.patentTitle)}</h3>
      <ol>${C.patents.map((p) => `<li>${markAuthors(typeof p === "string" ? p : p[locale]).replace("민경훈", "<b class=\"me\">민경훈</b>")}</li>`).join("")}</ol>
    </div>
  </div>
</section>

<section class="join" id="join" aria-labelledby="join-h">
  <div class="in">
    <p class="eyebrow">${esc(t.joinKicker)}</p>
    <h2 class="display" id="join-h">${lines(t.joinHead)}</h2>
    <p class="intro">${esc(t.joinSub)}</p>
    <p class="actions"><a class="btn btn-white" href="${C.links.video}" target="_blank" rel="noopener">▶&nbsp; ${esc(t.videoCta)}</a><a class="btn btn-ghost-w" href="mailto:${C.links.email}">${esc(t.mailCta)}</a></p>
  </div>
</section>

<section class="contact" id="contact" aria-labelledby="contact-h">
  <div class="in">
    <p class="eyebrow">${esc(t.contactKicker)}</p>
    <h2 class="display" id="contact-h">${esc(t.contactHead)}</h2>
    <p class="intro">${esc(t.contactBody)}</p>
    <div class="contact-grid">
      <dl class="direct">
        <div><dt class="mono">${esc(t.emailLabel)}</dt><dd><a href="mailto:${C.links.email}">${C.links.email}</a></dd></div>
        <div><dt class="mono">${esc(t.phoneLabel)}</dt><dd><a href="tel:${C.links.phone.replace(/-/g, "")}">${C.links.phone}</a></dd></div>
      </dl>
      <div class="where">
        <h3 class="mono">${esc(t.directions)}</h3>
        <address><strong>${esc(t.campus)}</strong><br>${esc(t.postal)}${ko ? `<br><span class="alt" lang="en">45, Yongso-ro, Nam-gu, Busan 48513, South Korea</span>` : ""}</address>
        <ul class="rooms">${t.rooms.map(([k, n, r]) => `<li><span class="mono">${esc(k)}</span><strong>${esc(r)}</strong><span>${esc(n)}</span></li>`).join("")}</ul>
        <a class="link" href="${mapUrl}" target="_blank" rel="noopener">${esc(t.mapLink)} ↗</a>
      </div>
    </div>
  </div>
</section>
</main>
<footer class="footer">
  <p><strong>MIN LAB</strong> · ${esc(t.footer)} · © 2026</p>
  <p><a href="${other.href}" lang="${other.lang}">${other.name}</a> · <a href="#top">${esc(t.toTop)}</a></p>
</footer>
<script src="${a}site.js" defer></script>
</body>
</html>
`;
}

rmSync(dist, { recursive: true, force: true });
mkdirSync(path.join(dist, "en"), { recursive: true });
cpSync(path.join(root, "assets"), path.join(dist, "assets"), { recursive: true });
writeFileSync(path.join(dist, "index.html"), page("ko"));
writeFileSync(path.join(dist, "en/index.html"), page("en"));
writeFileSync(path.join(dist, ".nojekyll"), "");
console.log("built dist/ (index.html, en/index.html)");
