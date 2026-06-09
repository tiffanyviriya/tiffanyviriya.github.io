(function () {
  "use strict";

  const { siteConfig, bio, experiences, awards, works, services, footerQuote } =
    siteData;
  const asset = (path) => `${basePath}${path}`;

  function esc(str) {
    const el = document.createElement("span");
    el.textContent = str;
    return el.innerHTML;
  }

  function renderNav() {
    return `
      <header id="site-header" class="site-header">
        <nav class="site-nav container-main">
          <a href="#about" class="nav-link">about</a>
          <a href="#" class="nav-brand" aria-label="Back to top">
            · ${esc(siteConfig.name)} ·
          </a>
          <a href="#works" class="nav-link">works</a>
        </nav>
      </header>
    `;
  }

  function renderHero() {
    return `
      <section class="hero-section container-main">
        <div class="hero-grid hero-enter">
          <p class="hero-greeting">Hi, I'm ${esc(siteConfig.shortName)}</p>

          <h1 class="hero-title">Strategy and<br>leadership you<br>can count on.</h1>

          <div class="hero-portrait-wrap hero-portrait-enter">
            <div class="hero-portrait-inner">
              <div class="hero-portrait-glow" aria-hidden="true"></div>
              <div class="hero-portrait-frame">
                <div class="hero-portrait-img-wrap">
                  <img src="${asset("assets/me.jpeg")}" alt="${esc(siteConfig.name)}" width="340" height="453" fetchpriority="high">
                </div>
              </div>
              <p class="hero-portrait-caption">${esc(siteConfig.location)}</p>
            </div>
          </div>

          <p class="hero-body">
            ${esc(siteConfig.degree)} at ${esc(siteConfig.university)} with
            experience in business development, partnership management, and project
            leadership. Aspiring to a career in management consulting and strategy,
            building partnerships, leading teams, and turning ideas into impact.
          </p>

          <a href="${esc(siteConfig.linkedin)}" target="_blank" rel="noopener noreferrer" class="hero-cta btn-accent">
            Chat with me <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    `;
  }

  function renderServicesTicker() {
    const chips = services
      .map((s) => `<span class="service-chip">${esc(s)}</span>`)
      .join("");

    return `
      <section class="ticker-section">
        <div class="marquee-wrap">
          <div class="marquee-track">
            <div class="marquee-group">${chips}</div>
            <div class="marquee-group" aria-hidden="true">${chips}</div>
          </div>
        </div>
      </section>
    `;
  }

  function renderExperiences() {
    return experiences
      .map(
        (exp) => `
        <li class="experience-item">
          <div class="experience-item__head">
            <h4 class="experience-role">${esc(exp.role)}</h4>
            <span class="experience-period">${esc(exp.period)}</span>
          </div>
          <p class="experience-org">${esc(exp.org)}</p>
          <p class="experience-desc">${esc(exp.description)}</p>
        </li>
      `
      )
      .join("");
  }

  function renderAwards() {
    return awards
      .map(
        (award) => `
        <li class="award-item">
          <span>
            <span class="award-title">${esc(award.title)}</span>
            <span class="award-org">, ${esc(award.org)}</span>
          </span>
          ${award.year ? `<span class="award-year">${esc(award.year)}</span>` : ""}
        </li>
      `
      )
      .join("");
  }

  const collagePositionSlots = [
    { col: 0, row: 0, rotate: -2 },
    { col: 1, row: 0, rotate: 3 },
    { col: 0, row: 1, rotate: 1 },
    { col: 1, row: 1, rotate: -2 },
  ];

  function collagePlacementForIndex(i) {
    return collagePositionSlots[i % collagePositionSlots.length];
  }

  function collageRowCount(total) {
    let maxRow = 0;
    for (let i = 0; i < total; i++) {
      maxRow = Math.max(maxRow, collagePlacementForIndex(i).row);
    }
    return maxRow + 1;
  }

  function collageZIndex(i, placement) {
    const triplet = Math.floor(i / 3);
    const posInTriplet = i % 3;
    const rowBoost = placement.row === 0 ? 3 : 0;
    return 10 + triplet * 10 + rowBoost + posInTriplet;
  }

  function collageTop(placement) {
    if (placement.row === 0) {
      return placement.col === 1 ? "var(--collage-col-lift)" : "0";
    }
    return placement.col === 1
      ? "calc(var(--collage-photo-h) - var(--collage-overlap) + var(--collage-col-lift))"
      : "calc(var(--collage-photo-h) - var(--collage-overlap))";
  }

  function collagePhotoStyle(i, total) {
    const placement = collagePlacementForIndex(i);
    const left =
      placement.col === 0
        ? "0"
        : "calc(var(--collage-photo-w) - var(--collage-overlap))";

    return `left:${left};top:${collageTop(placement)};transform:rotate(${placement.rotate}deg);z-index:${collageZIndex(i, placement)}`;
  }

  function renderAboutPhotos() {
    return bio.photos
      .map((photo, i) => {
        const caption = esc(
          photo.caption ??
            photo.alt ??
            `${siteConfig.shortName} photo ${i + 1}`
        );

        return `
        <div
          class="about-photo"
          style="${collagePhotoStyle(i, bio.photos.length)}"
          tabindex="0"
          role="button"
        >
          <img
            src="${asset(photo.src)}"
            alt="${caption}"
            loading="lazy"
          >
          <p class="about-photo__caption">${caption}</p>
        </div>
      `;
      })
      .join("");
  }

  function initAboutPhotos() {
    document.querySelectorAll(".about-photo").forEach((photo) => {
      photo.addEventListener("click", () => {
        photo.classList.toggle("is-active");
      });
    });
  }

  function renderAbout() {
    const paragraphs = bio.paragraphs
      .map((p, i) => `<p class="about-paragraph${i > 0 ? " about-paragraph--muted" : ""}">${esc(p)}</p>`)
      .join("");

    return `
      <section id="about" class="section about-section scroll-mt-nav">
        <div class="container-main">
          <div class="about-grid reveal">
            <div class="about-content">
              ${paragraphs}

              <div class="about-block">
                <h3 class="about-block__title">Experience</h3>
                <ul class="experience-list">${renderExperiences()}</ul>
              </div>

              <div class="about-block">
                <h3 class="about-block__title">Awards</h3>
                <ul class="awards-list">${renderAwards()}</ul>
              </div>
            </div>

            <div class="about-collage-wrap">
              <div class="about-collage" style="--collage-rows:${collageRowCount(bio.photos.length)}">${renderAboutPhotos()}</div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderWorkCard(work) {
    return `
      <article class="work-card">
        <div class="work-card__visual" tabindex="0">
          <div class="work-card__face">
            <img
              class="work-card__cover"
              src="${asset(work.cover)}"
              alt="${esc(work.title)}"
              loading="lazy"
            >
          </div>
          <div class="work-card__overlay">
            <p class="work-card__description">${esc(work.description)}</p>
            ${
              work.liveUrl
                ? `<a href="${esc(work.liveUrl)}" target="_blank" rel="noopener noreferrer" class="work-card__link">View project ↗</a>`
                : ""
            }
          </div>
        </div>
        <div class="work-card__meta">
          <h3 class="work-card__title">
            <span class="work-card__title-bold">${esc(work.title)}</span>
            <span class="work-card__title-cat"> ${esc(work.category[0])}</span>
          </h3>
          <p class="work-card__year">${esc(work.year)}</p>
        </div>
      </article>
    `;
  }

  function renderWorks() {
    const cards = works.map((w) => renderWorkCard(w)).join("");

    return `
      <section id="works" class="section works-section scroll-mt-nav">
        <div class="container-main">
          <div class="reveal">
            <header class="works-header">
              <h2>Selected works</h2>
              <p class="works-header__desc">
                Projects where I've worked on strategy, business development,
                and cross-functional teams.
              </p>
            </header>
            <div class="works-grid">${cards}</div>
          </div>
        </div>
      </section>
    `;
  }

  function renderCta() {
    return `
      <section class="section cta-section">
        <div class="container-main reveal cta-inner">
          <p class="cta-eyebrow">Think we vibe?</p>
          <a href="${esc(siteConfig.linkedin)}" target="_blank" rel="noopener noreferrer" class="cta-link">
            <h2>Get in touch</h2>
          </a>
        </div>
      </section>
    `;
  }

  function renderFooter() {
    const year = new Date().getFullYear();
    return `
      <footer class="site-footer">
        <div class="container-main">
          <div class="footer-row">
            <div class="footer-links">
              <a href="#about" class="nav-link">about</a>
              <a href="#works" class="nav-link">works</a>
            </div>
            <div class="footer-links">
              <a href="${esc(siteConfig.instagram)}" target="_blank" rel="noopener noreferrer" class="nav-link">instagram</a>
              <a href="${esc(siteConfig.linkedin)}" target="_blank" rel="noopener noreferrer" class="nav-link">linkedin</a>
            </div>
          </div>
          <p class="footer-quote">${esc(footerQuote)}</p>
          <p class="footer-copy">© ${year} ${esc(siteConfig.name)}</p>
        </div>
      </footer>
    `;
  }

  function renderPage() {
    document.getElementById("root").innerHTML = `
      ${renderNav()}
      <main class="site-main">
        ${renderHero()}
        ${renderServicesTicker()}
        ${renderAbout()}
        ${renderWorks()}
        ${renderCta()}
      </main>
      ${renderFooter()}
    `;
  }

  function initNavScroll() {
    const header = document.getElementById("site-header");
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initScrollReveals() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = document.querySelectorAll(".reveal");

    if (reduced) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    els.forEach((el) => observer.observe(el));
  }

  function init() {
    renderPage();
    initNavScroll();
    initScrollReveals();
    initAboutPhotos();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
