/**
 * Damjo v2 — scroll reveals, count-up, anchor scroll, hero parallax
 */
(function () {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let revealObserver;
  let countObserver;

  function initReveal(root) {
    const scope = root || document;
    const els = scope.querySelectorAll(".reveal:not(.is-visible)");
    if (!els.length) return;

    if (prefersReduced) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
    }

    els.forEach((el) => revealObserver.observe(el));
  }

  function initCountUp(root) {
    const scope = root || document;
    const counters = scope.querySelectorAll("[data-count]:not([data-counted])");
    if (!counters.length || prefersReduced) return;

    const runCount = (el) => {
      el.setAttribute("data-counted", "true");
      const target = parseInt(el.getAttribute("data-count"), 10);
      const suffix = el.getAttribute("data-suffix") || "";
      const duration = 1600;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(eased * target);
        el.textContent =
          value >= 1000
            ? (value / 1000).toFixed(1).replace(/\.0$/, "") + "K" + suffix
            : value + suffix;
        if (progress < 1) requestAnimationFrame(tick);
        else {
          el.textContent =
            target >= 1000
              ? (target / 1000).toFixed(1).replace(/\.0$/, "") + "K" + suffix
              : target + suffix;
        }
      };

      requestAnimationFrame(tick);
    };

    if (!countObserver) {
      countObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              runCount(entry.target);
              countObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
    }

    counters.forEach((el) => countObserver.observe(el));
  }

  window.damjoRefreshAnimations = function (root) {
    initReveal(root);
    initCountUp(root);
  };

  function initHeroParallax() {
    const bg = document.querySelector(".hero-v2__bg");
    if (!bg || prefersReduced) return;

    let ticking = false;
    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const y = window.scrollY * 0.35;
          bg.style.transform = `translate3d(0, ${y}px, 0) scale(1.05)`;
          ticking = false;
        });
      },
      { passive: true }
    );
  }

  function initNavbarScroll() {
    const nav = document.querySelector(".navbar-v2");
    if (!nav) return;

    const onScroll = () => {
      nav.classList.toggle("is-scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /** Native scroll — Lenis was blocking Windows touchpad wheel events */
  function initAnchorScroll() {
    const navOffset = 80;

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const id = anchor.getAttribute("href");
        if (!id || id === "#") return;
        const target = document.querySelector(id);
        if (!target) return;

        e.preventDefault();
        const top =
          target.getBoundingClientRect().top + window.scrollY - navOffset;
        window.scrollTo({
          top,
          behavior: prefersReduced ? "auto" : "smooth",
        });
      });
    });
  }

  function initGSAP() {
    if (prefersReduced || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined")
      return;

    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll(".hero-v2__panel h1").forEach((el, i) => {
      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        delay: i * 0.15,
        ease: "power3.out",
      });
    });

    gsap.from(".hero-v2__panel p, .hero-v2__actions", {
      opacity: 0,
      y: 24,
      duration: 0.8,
      delay: 0.35,
      stagger: 0.1,
      ease: "power2.out",
    });

    const showcase = document.querySelector(".hero-showcase");
    if (showcase) {
      gsap.from(showcase, {
        opacity: 0,
        x: 60,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("page-transition");
    initReveal();
    initCountUp();
    initHeroParallax();
    initNavbarScroll();
    initAnchorScroll();
    initGSAP();
  });
})();
