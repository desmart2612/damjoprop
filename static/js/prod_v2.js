/**
 * Damjo Properties — Products / listings page v2
 */
(function () {
  const cfg = window.DAMJO_CONFIG;

  function whatsappUrl(message) {
    return `https://wa.me/${cfg.contact.whatsapp}?text=${encodeURIComponent(message)}`;
  }

  function applyContactPlaceholders() {
    document.querySelectorAll("[data-contact-phone]").forEach((el) => {
      el.textContent = cfg.contact.phoneDisplay;
      if (el.tagName === "A") el.href = `tel:${cfg.contact.phoneTel}`;
    });
    document.querySelectorAll("[data-whatsapp]").forEach((el) => {
      const msg =
        el.getAttribute("data-whatsapp-message") || cfg.whatsappPrefill.general;
      el.href = whatsappUrl(msg);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    });
  }

  function buildHouseCard(house) {
    const msg = cfg.whatsappPrefill.house(house.title);
    return `
      <article class="house-card-v2 reveal" data-type="house" data-id="${house.id}">
        <div class="house-card-v2__image" style="background-image:url('${house.image}')" role="img" aria-label="${house.title}"></div>
        <div class="house-card-v2__body">
          <h3>${house.type}</h3>
          <p>${house.details}</p>
          <p><strong>${house.price}</strong> ${house.priceNote ? `<em>${house.priceNote}</em>` : ""}</p>
        </div>
        <div class="house-card-v2__footer">
          <button type="button" class="btn btn-primary btn-sm btn-details" data-house-id="${house.id}">See more</button>
          <a class="btn btn-whatsapp btn-sm" href="${whatsappUrl(msg)}" target="_blank" rel="noopener noreferrer">Inquire</a>
        </div>
      </article>`;
  }

  function buildPlotCardPage(plot) {
    const msg = cfg.whatsappPrefill.plot(plot.title);
    return `
      <article class="plot-card-page-v2 reveal" data-type="plot" data-id="${plot.id}">
        <div class="listing-card">
          <div class="listing-card__image-wrap">
            <img src="${plot.image}" alt="${plot.title}" loading="lazy" width="400" height="300" />
          </div>
          <div class="listing-card__body">
            <p><strong>Price:</strong> ${plot.price}</p>
            <p><strong>Location:</strong> ${plot.location}</p>
            <p><strong>Size:</strong> ${plot.size}</p>
          </div>
          <div class="listing-card__actions">
            <a class="btn btn-sm btn-whatsapp" href="${whatsappUrl(msg)}" target="_blank" rel="noopener noreferrer">Inquire</a>
          </div>
        </div>
      </article>`;
  }

  function openHouseModal(house) {
    const modal = document.getElementById("houseModal");
    if (!modal || !house) return;

    document.getElementById("houseModalLabel").textContent = house.title;
    const inner = document.getElementById("house-carousel-inner");
    const indicators = document.getElementById("house-carousel-indicators");

    const images = house.gallery?.length ? house.gallery : [house.image];
    inner.innerHTML = images
      .map(
        (src, i) => `
      <div class="carousel-item${i === 0 ? " active" : ""}">
        <img src="${src}" class="d-block w-100" alt="${house.title} photo ${i + 1}" loading="lazy" />
      </div>`
      )
      .join("");

    indicators.innerHTML = images
      .map(
        (_, i) => `
      <button type="button" data-bs-target="#houseCarousel" data-bs-slide-to="${i}" class="${i === 0 ? "active" : ""}" aria-label="Slide ${i + 1}" ${i === 0 ? 'aria-current="true"' : ""}></button>`
      )
      .join("");

    document.getElementById("house-modal-text").innerHTML = `
      <p><strong>Price:</strong> ${house.price} ${house.priceNote ? `<em style="color:var(--color-primary)">${house.priceNote}</em>` : ""}</p>
      <p><strong>Location:</strong> ${house.location}</p>
      <p><strong>Size:</strong> ${house.size}</p>
      <p><strong>Contact:</strong> <a href="tel:${cfg.contact.phoneTel}" data-contact-phone></a></p>
      <a class="btn btn-whatsapp mt-2" id="house-modal-whatsapp">Chat on WhatsApp</a>
    `;

    const waBtn = document.getElementById("house-modal-whatsapp");
    if (waBtn) {
      waBtn.href = whatsappUrl(cfg.whatsappPrefill.house(house.title));
      waBtn.setAttribute("target", "_blank");
      waBtn.setAttribute("rel", "noopener noreferrer");
    }

    applyContactPlaceholders();

    new bootstrap.Modal(modal).show();
  }

  function initFilters(plots, houses) {
    const grid = document.getElementById("listings-grid");
    const tabs = document.querySelectorAll(".filter-tabs button");
    if (!grid || !tabs.length) return;

    const render = (filter) => {
      let html = "";
      if (filter === "all" || filter === "plots") {
        html += plots.map(buildPlotCardPage).join("");
      }
      if (filter === "all" || filter === "houses") {
        html += houses.map(buildHouseCard).join("");
      }
      grid.innerHTML = html;

      grid.querySelectorAll(".btn-details").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-house-id");
          const house = houses.find((h) => h.id === id);
          openHouseModal(house);
        });
      });

      if (typeof window.damjoRefreshAnimations === "function") {
        window.damjoRefreshAnimations(grid);
      }
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        render(tab.getAttribute("data-filter"));
      });
    });

    const hash = window.location.hash.replace("#", "");
    const initial =
      hash === "plots" || hash === "houses" ? hash : "all";
    const activeTab = [...tabs].find(
      (t) => t.getAttribute("data-filter") === initial
    );
    if (activeTab) {
      tabs.forEach((t) => t.classList.remove("active"));
      activeTab.classList.add("active");
      render(initial);
    } else {
      render("all");
    }
  }

  async function init() {
    applyContactPlaceholders();

    try {
      const res = await fetch("static/data/listings_v2.json");
      const data = await res.json();
      initFilters(data.plots, data.houses);
    } catch (e) {
      console.error(e);
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
