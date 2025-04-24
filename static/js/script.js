function getCardsPerSlide() {
  const width = window.innerWidth;
  if (width >= 992) return 3; // Large
  if (width >= 768) return 2; // Medium
  return 1; // Small
}

function buildCarousel() {
  const cards = document.querySelectorAll('#card-data .card');
  const carouselInner = document.getElementById('carousel-inner');
  const indicators = document.getElementById('carousel-indicators');
  carouselInner.innerHTML = '';
  indicators.innerHTML = '';

  const cardsPerSlide = getCardsPerSlide();
  const totalSlides = Math.ceil(cards.length / cardsPerSlide);

  for (let i = 0; i < totalSlides; i++) {
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (i === 0) carouselItem.classList.add('active');

    const row = document.createElement('div');
    row.classList.add('row', 'justify-content-center');

    for (let j = i * cardsPerSlide; j < (i + 1) * cardsPerSlide && j < cards.length; j++) {
      const col = document.createElement('div');
      col.classList.add('col-12');
      if (cardsPerSlide === 2) col.classList.add('col-md-6');
      if (cardsPerSlide === 3) col.classList.add('col-lg-4');

      col.appendChild(cards[j].cloneNode(true));
      row.appendChild(col);
    }

    carouselItem.appendChild(row);
    carouselInner.appendChild(carouselItem);

    const indicator = document.createElement('button');
    indicator.type = 'button';
    indicator.setAttribute('data-bs-target', '#carouselExampleIndicators');
    indicator.setAttribute('data-bs-slide-to', i);
    if (i === 0) {
      indicator.classList.add('active');
      indicator.setAttribute('aria-current', 'true');
    }
    indicator.setAttribute('aria-label', `Slide ${i + 1}`);
    indicators.appendChild(indicator);
  }
}

window.addEventListener('load', buildCarousel);
window.addEventListener('resize', () => {
  // Debounce for performance
  clearTimeout(window.carouselResizeTimeout);
  window.carouselResizeTimeout = setTimeout(buildCarousel, 300);
});
