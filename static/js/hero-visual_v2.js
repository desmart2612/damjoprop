/**
 * Hero visual — static image showcase (config: heroVisual.image)
 */
(function () {
  const cfg = window.DAMJO_CONFIG?.heroVisual;
  const container = document.getElementById("hero-visual");
  if (!container || !cfg?.image) return;

  const img = cfg.image;
  container.dataset.visualMode = "image";
  container.innerHTML = `
    <div class="hero-showcase" role="img" aria-label="${img.alt || "Featured property"}">
      <div class="hero-showcase__frame hero-showcase__frame--estate">
        <img src="${img.src}" alt="${img.alt || ""}" width="480" height="640" loading="eager" />
      </div>
      <div class="hero-showcase__shine" aria-hidden="true"></div>
      ${img.badge ? `<span class="hero-showcase__badge">${img.badge}</span>` : ""}
      <div class="hero-showcase__stats" aria-hidden="true">
        <span><strong>4+</strong> regions</span>
        <span><strong>Title</strong> deed help</span>
      </div>
    </div>`;
})();
