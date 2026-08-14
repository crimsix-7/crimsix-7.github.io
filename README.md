# Engineering Portfolio Website

A responsive personal portfolio for Osama Khadim, rebuilt as a distinct engineering-focused site rather than a continuation of the original 2023 tutorial layout.

## What changed

- Rewritten HTML structure and navigation
- Completely new visual system and responsive CSS
- Removed Typed.js and ScrollReveal dependencies
- Replaced tutorial-style scroll handlers with `IntersectionObserver`
- Replaced the non-functional contact form with a direct contact/links section
- Grouped skills by engineering domain instead of displaying a large wall of technology logos
- Added engineering experience and current projects
- Limited the animated bird field to the hero section for better readability and performance
- Added reduced-motion support, keyboard navigation, focus states, and a skip link
- Added explicit attribution for the third-party Vanta.js / Three.js bird effect

## Local preview

This is a static site, so no npm installation is required.

From the project directory:

```bash
python -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

You can also use the VS Code **Live Server** extension.

## Before deployment

Update the contact section with your final:

- Email address
- LinkedIn URL
- Resume PDF/link
- Any final GitHub repository URLs

## Structure

```text
Portfolio-Website-Refactor/
├── index.html
├── styles/
│   └── site.css
├── scripts/
│   ├── site.js
│   └── vendor/
│       └── vanta.birds.min.js
├── assets/
│   ├── profile.png
│   └── midnight-labyrinth.jpg
├── THIRD_PARTY_NOTICES.md
└── LICENSE
```

## Third-party visual effect

The animated bird simulation is the **Vanta.js Birds** effect, powered by **Three.js**. The site layout, CSS, and interaction code in this refactor are custom; the bird simulation itself is not presented as original Three.js code.
