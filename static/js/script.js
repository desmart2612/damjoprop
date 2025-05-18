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

// document.getElementById("whatsappForm").addEventListener("submit", function (e) {
//   e.preventDefault();
//   const name = document.getElementById("name").value.trim();
//   // const email = document.getElementById("email").value.trim();
//   const request = document.getElementById("request").value.trim();

//   const message = `Hello, my name is ${name}.\n\nRequest: ${request}`;
//   const encodedMessage = encodeURIComponent(message);

//   const phoneNumber = "+254710622406"; // Replace with your WhatsApp number in international format
//   const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

//   window.open(whatsappURL, "_blank");
// });

document.getElementById("whatsappForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const request = document.getElementById("request").value.trim();
  const btn = document.getElementById("sendbtn");

  btn.innerHTML = "Sending...<img src='static/images/paper-plane.gif' width='25' height='25'/>";
  btn.disabled = true;

  emailjs.send("service_ld4ti3s", "template_no2w8ry", {
    name: name,
    email: email,
    message: request,
  }).then(function(response) {    
    btn.innerHTML = "Send";
    btn.disabled = false;
  }, function(error) {
    alert("Failed to send email. Error: " + JSON.stringify(error));
    btn.innerHTML = "Send";
    btn.disabled = false;
  });
});

document.getElementById("more").addEventListener("click", function () {
  // Navigate to products.html
  window.location.href = "products.html";
});
