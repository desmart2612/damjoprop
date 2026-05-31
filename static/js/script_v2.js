/**
 * Damjo Properties — Home v2
 */
(function () {
  const cfg = window.DAMJO_CONFIG;

  function whatsappUrl(message) {
    const text = encodeURIComponent(message);
    return `https://wa.me/${cfg.contact.whatsapp}?text=${text}`;
  }

  function openWhatsApp(message) {
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  }

  function applyContactPlaceholders() {
    document.querySelectorAll("[data-contact-phone]").forEach((el) => {
      el.textContent = cfg.contact.phoneDisplay;
      if (el.tagName === "A") el.href = `tel:${cfg.contact.phoneTel}`;
    });
    document.querySelectorAll("[data-contact-email]").forEach((el) => {
      el.textContent = cfg.contact.email;
      if (el.tagName === "A") el.href = `mailto:${cfg.contact.email}`;
    });
    document.querySelectorAll("[data-whatsapp]").forEach((el) => {
      const msg =
        el.getAttribute("data-whatsapp-message") || cfg.whatsappPrefill.general;
      el.href = whatsappUrl(msg);
      if (el.tagName !== "A") return;
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    });
  }

  function statIcon(name) {
    const icons = {
      clients: `<svg class="stat-card__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3m-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3m0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5m8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5"/></svg>`,
      plots: `<svg class="stat-card__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3z"/></svg>`,
      documents: `<svg class="stat-card__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8zm-1 7h-2V9h2v1zm0-2h-2V7h2v1zm-4 6h8v2H8v-2z"/></svg>`,
    };
    return icons[name] || icons.clients;
  }

  function renderStats(stats) {
    const grid = document.getElementById("stats-grid");
    if (!grid || !stats) return;

    grid.innerHTML = stats
      .map(
        (s) => `
      <div class="stat-card reveal">
        ${statIcon(s.icon)}
        <div class="stat-card__value" data-count="${s.value}" data-suffix="${s.suffix}">0</div>
        <p class="stat-card__label">${s.label}</p>
      </div>`
      )
      .join("");
  }

  function buildPlotCard(plot) {
    const badges = (plot.badges || [])
      .map((b) => `<span class="badge">${b}</span>`)
      .join("");
    const msg = cfg.whatsappPrefill.plot(plot.title);
    return `
      <div class="listing-card">
        <div class="listing-card__image-wrap">
          <img src="${plot.image}" alt="${plot.title} — land for sale in ${plot.location}" loading="lazy" width="400" height="300" />
          <div class="listing-card__badges">${badges}</div>
        </div>
        <div class="listing-card__body">
          <p><strong>Price:</strong> ${plot.price}</p>
          <p><strong>Location:</strong> ${plot.location}</p>
          <p><strong>Size:</strong> ${plot.size}</p>
        </div>
        <div class="listing-card__actions">
          <a class="btn btn-sm btn-whatsapp" href="${whatsappUrl(msg)}" target="_blank" rel="noopener noreferrer">Inquire</a>
          <a class="btn-card-secondary" href="products.html#plots">Details</a>
        </div>
      </div>`;
  }

  function getCardsPerSlide() {
    const w = window.innerWidth;
    if (w >= 992) return 3;
    if (w >= 768) return 2;
    return 1;
  }

  function buildCarousel(plots) {
    const carouselInner = document.getElementById("carousel-inner");
    const indicators = document.getElementById("carousel-indicators");
    if (!carouselInner || !plots?.length) return;

    carouselInner.innerHTML = "";
    indicators.innerHTML = "";

    const cardsPerSlide = getCardsPerSlide();
    const totalSlides = Math.ceil(plots.length / cardsPerSlide);

    for (let i = 0; i < totalSlides; i++) {
      const item = document.createElement("div");
      item.className = "carousel-item" + (i === 0 ? " active" : "");

      const row = document.createElement("div");
      row.className = "row justify-content-center g-3";

      for (
        let j = i * cardsPerSlide;
        j < (i + 1) * cardsPerSlide && j < plots.length;
        j++
      ) {
        const col = document.createElement("div");
        col.className = "col-12";
        if (cardsPerSlide >= 2) col.classList.add("col-md-6");
        if (cardsPerSlide >= 3) col.classList.add("col-lg-4");
        col.innerHTML = buildPlotCard(plots[j]);
        row.appendChild(col);
      }

      item.appendChild(row);
      carouselInner.appendChild(item);

      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("data-bs-target", "#carousel-plots");
      btn.setAttribute("data-bs-slide-to", String(i));
      btn.setAttribute("aria-label", `Slide ${i + 1}`);
      if (i === 0) {
        btn.classList.add("active");
        btn.setAttribute("aria-current", "true");
      }
      indicators.appendChild(btn);
    }
  }

  function initNavSpy() {
    const links = document.querySelectorAll(".navbar-v2 .nav-link[href^='#']");
    const sections = [...links]
      .map((l) => document.querySelector(l.getAttribute("href")))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          links.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${id}`
            );
          });
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
  }

  const CONTACT_INTENTS = {
    general: {
      title: "Reach out",
      placeholder: "Tell us about the plot or service you need",
      prefill: "",
      showVisitFields: false,
      submitLabel: "Send via WhatsApp",
    },
    bookVisit: {
      title: "Book a site visit",
      placeholder:
        "Which plot or area do you want to see? Preferred time and any questions…",
      prefill: () => cfg.whatsappPrefill.bookVisit,
      showVisitFields: true,
      submitLabel: "Request visit via WhatsApp",
    },
  };

  function populateVisitRegions() {
    const select = document.getElementById("visit-region");
    if (!select) return;

    const areas = (cfg.serviceAreas || []).filter(
      (a) => !/document/i.test(a.name)
    );

    select.innerHTML =
      '<option value="">Select a region (optional)</option>' +
      areas
        .map((a) => `<option value="${a.name}">${a.name}</option>`)
        .join("");
  }

  function openContactModal(intentKey) {
    const modalEl = document.getElementById("contactModal");
    const intent = CONTACT_INTENTS[intentKey] || CONTACT_INTENTS.general;
    const titleEl = document.getElementById("contactModalLabel");
    const requestEl = document.getElementById("request");
    const visitFields = document.getElementById("visit-fields");
    const quickWa = document.getElementById("book-visit-quick-whatsapp");
    const submitBtn = document.getElementById("whatsapp-submit-btn");
    const nameEl = document.getElementById("name");

    if (titleEl) titleEl.textContent = intent.title;
    if (requestEl) {
      requestEl.placeholder = intent.placeholder;
      const prefill =
        typeof intent.prefill === "function" ? intent.prefill() : intent.prefill;
      requestEl.value = prefill || "";
    }
    if (visitFields) {
      visitFields.classList.toggle("is-hidden", !intent.showVisitFields);
    }
    if (quickWa) {
      quickWa.classList.toggle("is-hidden", intentKey !== "bookVisit");
    }
    if (submitBtn) submitBtn.textContent = intent.submitLabel;

    const dateInput = document.getElementById("visit-date");
    if (dateInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateInput.min = tomorrow.toISOString().slice(0, 10);
      dateInput.value = "";
    }

    const regionSelect = document.getElementById("visit-region");
    if (regionSelect) regionSelect.value = "";

    if (modalEl && typeof bootstrap !== "undefined") {
      const instance = bootstrap.Modal.getOrCreateInstance(modalEl);
      modalEl.dataset.contactIntent = intentKey;
      instance.show();
      setTimeout(() => nameEl?.focus(), 400);
    }
  }

  function buildWhatsAppMessage() {
    const name = document.getElementById("name")?.value.trim() || "";
    const request = document.getElementById("request")?.value.trim() || "";
    const region = document.getElementById("visit-region")?.value.trim() || "";
    const visitDate = document.getElementById("visit-date")?.value || "";
    const intent =
      document.getElementById("contactModal")?.dataset.contactIntent ||
      "general";

    let message = `Hello, my name is ${name}.`;

    if (intent === "bookVisit") {
      message += "\n\nI would like to book a site visit.";
      if (region) message += `\nRegion: ${region}`;
      if (visitDate) message += `\nPreferred date: ${visitDate}`;
    }

    if (request) message += `\n\nDetails: ${request}`;

    return message;
  }

  function initForms() {
    const form = document.getElementById("whatsappForm");
    if (!form) return;

    populateVisitRegions();

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const message = buildWhatsAppMessage();
      openWhatsApp(message);

      const modalEl = document.getElementById("contactModal");
      if (modalEl && typeof bootstrap !== "undefined") {
        bootstrap.Modal.getInstance(modalEl)?.hide();
        form.reset();
        modalEl.dataset.contactIntent = "general";
      }
    });

    document
      .getElementById("book-visit-quick-whatsapp")
      ?.addEventListener("click", () => {
        openWhatsApp(cfg.whatsappPrefill.bookVisit);
        bootstrap.Modal.getInstance(
          document.getElementById("contactModal")
        )?.hide();
      });

    document
      .querySelector('[data-bs-target="#contactModal"]')
      ?.addEventListener("click", () => {
        openContactModal("general");
      });
  }

  function initBookVisit() {
    document.getElementById("book-visit-btn")?.addEventListener("click", () => {
      openContactModal("bookVisit");
    });

    document.querySelectorAll("#service-regions li").forEach((li) => {
      li.style.cursor = "pointer";
      li.setAttribute("role", "button");
      li.setAttribute("tabindex", "0");
      li.addEventListener("click", () => {
        const regionName = li.querySelector("strong")?.textContent?.trim();
        openContactModal("bookVisit");
        const select = document.getElementById("visit-region");
        if (select && regionName && !/document/i.test(regionName)) {
          select.value = regionName;
        }
      });
      li.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          li.click();
        }
      });
    });
  }

  function initSeeMore() {
    document.getElementById("see-more-btn")?.addEventListener("click", () => {
      window.location.href = "products.html";
    });
  }

  async function loadListings() {
    try {
      const res = await fetch("static/data/listings_v2.json");
      const data = await res.json();
      renderStats(data.stats);
      buildCarousel(data.plots);
      window.__DAMJO_LISTINGS = data;

      let resizeTimer;
      window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => buildCarousel(data.plots), 300);
      });

      if (typeof window.damjoRefreshAnimations === "function") {
        window.damjoRefreshAnimations(document.getElementById("stats-grid"));
        window.damjoRefreshAnimations(document.getElementById("carousel-inner"));
      }
    } catch (err) {
      console.error("Failed to load listings", err);
    }
  }

  function initServiceArea() {
    const regionsEl = document.getElementById("service-regions");
    const mapFrame = document.getElementById("service-map");
    const directions = document.getElementById("map-directions");
    const areas = cfg.serviceAreas || [];
    const maps = cfg.maps || {};

    if (regionsEl && areas.length) {
      regionsEl.innerHTML = areas
        .map(
          (a) =>
            `<li><strong>${a.name}</strong><span>${a.detail}</span></li>`
        )
        .join("");
    }

    if (mapFrame && maps.embedUrl) {
      mapFrame.src = maps.embedUrl;
    }

    if (directions && maps.directionsUrl) {
      directions.href = maps.directionsUrl;
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyContactPlaceholders();
    initServiceArea();
    initNavSpy();
    initForms();
    initBookVisit();
    initSeeMore();
    loadListings();
  });
})();
