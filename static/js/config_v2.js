/** Single source of truth for Damjo Properties v2 */
window.DAMJO_CONFIG = {
  brand: "Damjo Properties",
  tagline: "Own the land. Build the dream.",
  contact: {
    phoneDisplay: "+254 715 140 279",
    phoneTel: "+254715140279",
    whatsapp: "254715140279",
    email: "damjoproperties@gmail.com",
  },
  social: {
    siteUrl: "https://damjoproperties.netlify.app",
  },
  whatsappPrefill: {
    general: "Hello Damjo Properties, I would like more information.",
    plot: (title) =>
      `Hello Damjo Properties, I am interested in the plot: ${title}.`,
    house: (title) =>
      `Hello Damjo Properties, I am interested in the property: ${title}.`,
    documents:
      "Hello Damjo Properties, I need help recovering lost land documents.",
    bookVisit:
      "Hello Damjo Properties, I would like to book a site visit. Please let me know available dates.",
  },
  heroVisual: {
    image: {
      src: "static/images/estate_image.jpeg",
      alt: "Modern residential neighborhood — Damjo Properties",
      badge: "Prime plots available",
    },
  },
  serviceAreas: [
    { name: "Nairobi & environs", detail: "Kasarani, Ruai, Juja corridors" },
    { name: "Kiambu", detail: "Matangi, Kimbo and growing suburbs" },
    { name: "Nyandarua", detail: "Kinangop — agricultural acreage" },
    { name: "Document services", detail: "Kenya-wide title recovery support" },
  ],
  maps: {
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255541.04970768447!2d36.68532065!3d-1.3026148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d9e44efb%3A0x7a0b925e6ebd6ee!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2s!4v1",
    directionsUrl: "https://maps.google.com/?q=Nairobi,Kenya",
  },
};
