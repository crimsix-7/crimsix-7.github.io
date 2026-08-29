(() => {
  "use strict";

  /* ==========================================================
     DOM REFERENCES
     ========================================================== */

  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const navToggle = document.querySelector("[data-nav-toggle]");

  const navLinks = [
    ...document.querySelectorAll("[data-nav] a[href^='#']")
  ];

  const sections = [
    ...document.querySelectorAll("[data-section]")
  ];

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );


  /* ==========================================================
     HEADER STATE
     Adds a translucent background after the page starts moving.
     ========================================================== */

  const syncHeader = () => {
    header?.classList.toggle(
      "is-scrolled",
      window.scrollY > 24
    );
  };

  window.addEventListener(
    "scroll",
    syncHeader,
    { passive: true }
  );

  syncHeader();


  /* ==========================================================
     MOBILE NAVIGATION
     ========================================================== */

  const setMenuOpen = (open) => {
    if (!nav || !navToggle) return;

    nav.classList.toggle(
      "is-open",
      open
    );

    navToggle.setAttribute(
      "aria-expanded",
      String(open)
    );
  };


  navToggle?.addEventListener(
    "click",
    () => {
      const isOpen =
        navToggle.getAttribute("aria-expanded") === "true";

      setMenuOpen(!isOpen);
    }
  );


  navLinks.forEach((link) => {
    link.addEventListener(
      "click",
      () => setMenuOpen(false)
    );
  });


  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }
  );


  /* ==========================================================
     CONTENT REVEAL
     Uses IntersectionObserver rather than scroll-position loops.
     ========================================================== */

  if (
    !("IntersectionObserver" in window) ||
    reducedMotion.matches
  ) {
    document
      .querySelectorAll(".reveal")
      .forEach((node) => {
        node.classList.add("is-visible");
      });
  } else {
    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add(
              "is-visible"
            );

            observer.unobserve(
              entry.target
            );
          });
        },
        {
          threshold: 0.14
        }
      );

    document
      .querySelectorAll(".reveal")
      .forEach((node) => {
        revealObserver.observe(node);
      });
  }


  /* ==========================================================
     ACTIVE NAVIGATION LINK
     Highlights the section currently occupying the viewport.
     ========================================================== */

  if ("IntersectionObserver" in window) {
    const sectionObserver =
      new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort(
              (a, b) =>
                b.intersectionRatio -
                a.intersectionRatio
            )[0];

          if (!visible) return;

          const activeId =
            visible.target.id;

          navLinks.forEach((link) => {
            const targetId =
              link
                .getAttribute("href")
                ?.slice(1);

            link.classList.toggle(
              "is-active",
              targetId === activeId
            );
          });
        },
        {
          rootMargin:
            "-35% 0px -55%",

          threshold:
            [0, 0.2, 0.5]
        }
      );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }


/* ==========================================================
   VANTA / THREE.JS BIRD FIELDS

   Hero birds match the site accent color.
   Contact birds keep the deep-red palette.
   ========================================================== */

let heroBirds = null;
let contactBirds = null;


const vantaAvailable = () => {
  return Boolean(
    window.THREE &&
    window.VANTA &&
    window.VANTA.BIRDS
  );
};


/* ==========================================================
   HERO BIRDS
   ========================================================== */

const startHeroBirds = () => {

  const heroTarget =
    document.querySelector("#bird-field");


  if (
    reducedMotion.matches ||
    heroBirds ||
    !heroTarget ||
    !vantaAvailable()
  ) {
    return;
  }


  heroBirds = window.VANTA.BIRDS({

    el: heroTarget,

    mouseControls: true,
    touchControls: true,
    gyroControls: false,

    minHeight: 200,
    minWidth: 200,

    scale: 1,
    scaleMobile: 0.85,

    backgroundColor: 0x07111d,

    color1: 0x61d9c3,
    color2: 0x61d9c3,

    colorMode: "lerp",

    birdSize: 0.42,

    speedLimit: 3.2,

    separation: 42,
    alignment: 38,
    cohesion: 28

    /*
      Intentionally no "quantity" setting here.

      This allows Vanta to use the original/default bird
      density you had before.
    */
  });

};


/* ==========================================================
   CONTACT BIRDS
   Larger birds with a deep red / crimson palette.
   ========================================================== */

const startContactBirds = () => {

  const contactTarget =
    document.querySelector("#contact-birds");


  if (
    reducedMotion.matches ||
    contactBirds ||
    !contactTarget ||
    !vantaAvailable()
  ) {
    return;
  }


  contactBirds = window.VANTA.BIRDS({

    el: contactTarget,

    mouseControls: true,
    touchControls: true,
    gyroControls: false,

    minHeight: 180,
    minWidth: 200,

    scale: 1,
    scaleMobile: 1,

    /*
      Contact background intentionally darker than
      the main hero background.
    */
    backgroundColor: 0x091019,


    /*
      Deep red / crimson bird colors.
    */
    color1: 0x781b27,
    color2: 0xc83b47,

    colorMode: "lerp",


    /*
      Larger than the birds in the hero.
    */
    birdSize: 0.82,

    wingSpan: 24,

    speedLimit: 2.8,

    separation: 38,
    alignment: 32,
    cohesion: 26,

    quantity: 4
  });

};


/* ==========================================================
   START BOTH EFFECTS
   ========================================================== */

const startVantaEffects = () => {

  if (
    reducedMotion.matches ||
    !vantaAvailable()
  ) {
    return;
  }


  startHeroBirds();

  /*
    Initialize the Contact effect immediately as well.

    Previously I lazy-loaded it with IntersectionObserver.
    That added unnecessary complexity and may be why the
    second effect wasn't appearing reliably for you.
  */
  startContactBirds();

};


/* ==========================================================
   DESTROY EFFECTS
   ========================================================== */

const stopVantaEffects = () => {

  if (heroBirds) {

    heroBirds.destroy();

    heroBirds = null;

  }


  if (contactBirds) {

    contactBirds.destroy();

    contactBirds = null;

  }

};


/*
  Scripts are loaded using defer, so Three.js and Vanta
  should already be available by the time site.js executes.
*/
startVantaEffects();


/*
  If the visitor changes the operating-system Reduce Motion
  preference while the site is open, update the effects.
*/
reducedMotion.addEventListener?.(
  "change",
  (event) => {

    if (event.matches) {

      stopVantaEffects();

    } else {

      startVantaEffects();

    }

  }
);


/*
  Release WebGL resources when leaving the page.
*/
window.addEventListener(
  "pagehide",
  stopVantaEffects,
  { once: true }
);

window.addEventListener(
  "pageshow",
  () => {
    startVantaEffects();
  }
);
  /* ==========================================================
     FOOTER YEAR
     ========================================================== */

  const year =
    document.querySelector("[data-year]");

  if (year) {
    year.textContent =
      new Date().getFullYear();
  }
})();
