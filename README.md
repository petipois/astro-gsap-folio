# Astro GSAP Portfolio Template

A production-ready portfolio template built with **Astro** and **GSAP**. This template offers a dark, editorial aesthetic, complete with content collections, smooth scroll animations, tag filtering for projects, and a functional contact form. It's designed as a single-author site that you can easily fork and customize to make your own.

---

## Features

* **Modern Stack:** Built with Astro for performance and GSAP for powerful animations.
* **Editorial Design:** A sleek, dark aesthetic with a focus on typography and clean layouts.
* **Content Collections:** Easily manage your projects and other content using Astro's built-in content collections.
* **Scroll Animations:** Engaging scroll-triggered animations powered by GSAP and ScrollTrigger.
* **Project Filtering:** Filter projects by tags for improved navigation.
* **Contact Form:** A ready-to-use contact form integrated with Formspree (easily swappable).
* **Responsive:** Optimized for various screen sizes and devices.

---

## Tech Stack

| Layer       | Technology                         |
|-------------|------------------------------------|
| Framework   | Astro 6                            |
| Animation   | GSAP 3 + ScrollTrigger             |
| Styling     | Tailwind & Vanilla CSS with custom properties |
| Content     | Astro Content Collections          |
| Forms       | Fetch + Formspree (swappable)      |
| Fonts       | Georgia (serif) + Courier New (mono) — no external requests by default |

---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have Node.js (v22 or higher) and npm installed on your machine.

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/petipois/astro-gsap-portfolio.git
    cd astro-gsap-portfolio
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

### Running the Development Server

To start the development server and see the template in action:

```bash
npm run dev
```

This will typically open the site at `http://localhost:4321`.

### Building for Production

To build the project for deployment:

```bash
npm run build
```

The optimized static assets will be generated in the `dist/` directory.

---

## Project Structure

```
/
├── public/
│   └── images/
│       └── about-portrait.jpg     ← replace with your own
│
├── src/
│   ├── content/
│   │   └── projects/
│   │       ├── project-1.md
│   │       └── project-2.md
│   │       ├── project-3.md
│   │       └── project-4.md
│   │       ├── project-5.md
│   │── content.config.ts              ← content collection schema
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro       ← html shell, imports Nav
│   │
│   ├── components/
│   │   └── Navbar.astro
│   │
│   └── pages/
│       ├── index.astro           ← portfolio home 
│       ├── projects/
        │   └── index.astro       ← projects index
│       │   └── [slug].astro      ← individual project page
│       ├── about.astro
│       └── contact.astro
│
├── astro.config.mjs
└── package.json
```

---

## Customization

This template is designed for easy customization. Here are the key areas you'll want to modify:

### 1. Content

* **Projects:** Add, edit, or remove project entries in `src/content/projects/`. Each project is a Markdown file following the schema defined in `src/content.config.ts`.
* **Home(index.astro)/About/Contact Page:** Update your personal information and social links in `src/lib/consts`.

### 2. Images

* Add with your own portrait image in `public/images/`.
* Update project images in `public/images/projects/` and reference them in your project Markdown files.

### 3. Navigation

* Adjust the navigation links in `src/components/Navbar.astro`.
* Update the `<title>` suffix and `aria-label` on the logo link in `src/components/Navbar.astro`.

### 4. Contact Form

* By default, the contact form in `src/pages/contact.astro` uses Formspree. Update the `fetch` URL with your Formspree endpoint:

    ```js
    // src/pages/contact.astro <script>
    const res = await fetch('https://formspree.io/f/YOUR_ID', { ... });
    ```

* **Alternatives:**

    | Provider      | Change required                                          |
    |---------------|----------------------------------------------------------|
    | Formspree     | Replace `YOUR_ID` with your form ID                     |
    | Netlify Forms | Add `netlify` attribute to `<form>`, remove the `fetch` |
    | API route     | Point fetch at `/api/contact` and add `src/pages/api/contact.ts` |

### 5. Design Tokens (CSS Custom Properties)

All visual values are defined as CSS custom properties in the `:root` selector within `src/layouts/BaseLayout.astro`. You can override any of these globally to retheme the entire site.

| Token          | Default              | Purpose                        |
|----------------|----------------------|--------------------------------|
| `--bg`         | `#0a0a0a`            | Page background                |
| `--surface`    | `#111`               | Card / input background        |
| `--border`     | `rgba(255,255,255,.08)` | Dividers, card gaps         |
| `--text`       | `#f0ede6`            | Primary text                   |
| `--muted`      | `rgba(240,237,230,.45)` | Secondary / label text      |
| `--accent`     | `#e8d5a3`            | Active states, highlights      |
| `--font-serif` | `Georgia, serif`     | Display headings               |
| `--font-mono`  | `'Courier New', monospace` | Body, labels, UI text    |
| `--header-h`   | `64px`               | Nav height — used for offsets  |
| `--pad`        | `4rem`               | Horizontal page padding        |

### 6. Adding a Custom Font

1. Add your font files (e.g., `.woff2`) to `public/fonts/`.
2. Declare them in the global styles within `src/layouts/BaseLayout.astro`:

    ```css
    @font-face {
      font-family: 'Playfair Display';
      src: url('/fonts/PlayfairDisplay-Regular.woff2') format('woff2');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }
    ```

3. Update the relevant font token in `:root`:

    ```css
    :root {
      --font-serif: 'Playfair Display', Georgia, serif;
    }
    ```

    All headings (or other elements using `--font-serif`) will automatically update.

---

## GSAP Animation Patterns Used

All animation logic resides within `<script>` blocks inside each `.astro` file. This approach keeps each page self-contained and avoids loading ScrollTrigger on pages where it's not needed.

### Line Clip Reveal (Hero Titles)

This effect wraps each heading line in an `overflow: hidden` span, then animates an inner span from `translateY(110%)` to `0`.

```html
<h1>
  <span class="line"><span>Your heading</span></span>
</h1>
```

```css
.line        { display: block; overflow: hidden; }
.line > span { display: block; }        /* GSAP target */
```

```js
gsap.set('.line > span', { y: '110%' });

gsap.to('.line > span', {
  y: 0,
  duration: 0.85,
  stagger: 0.12,
  ease: 'power3.out',
});
```

### ScrollTrigger.batch() — Card Grids

Batches cards into groups as they enter the viewport, firing one `gsap.to` animation per group instead of one per card.

```js
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.batch('.card', {
  onEnter: batch => gsap.to(batch, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.08,
    ease: 'power2.out',
  }),
  start: 'top 90%',
  once: true,         // ← fire once, don't reverse on scroll-up
});
```

**Important:** Always call `ScrollTrigger.refresh()` after any DOM mutation (e.g., filter toggle, view switch) that changes the layout.

### Reversible Timeline (Mobile Menu)

Build the timeline once with `paused: true`, then use `.play()` and `.reverse()` to control the animation. This avoids duplicating easing values for open and close states.

```js
const tl = gsap.timeline({ paused: true })
  .to(menu,  { clipPath: 'inset(0 0 0% 0)', duration: 0.45, ease: 'power3.inOut' })
  .to(links, { opacity: 1, x: 0, duration: 0.35, stagger: 0.06 }, '-=0.2');

openBtn.addEventListener('click',  () => tl.play());
closeBtn.addEventListener('click', () => tl.reverse());
```

### Scrubbed Parallax

Ties an animation directly to the scroll position via `scrub`. This creates a continuous mapping rather than discrete start/end events.

```js
gsap.to('.about-portrait', {
  scrollTrigger: {
    trigger: '.about-hero-media',
    start: 'top top',
    end: 'bottom top',
    scrub: 1.5,          // ← seconds of lag behind scroll position
  },
  scale: 1.08,
  ease: 'none',          // always 'none' for scrubbed animations
});
```

---

## Deployment

This template works with any static host. Astro outputs the production-ready files to the `dist/` directory by default.

```bash
npm run build     # outputs to dist/
npm run preview   # local preview of the build
```

| Host             | Notes                                                              |
|------------------|--------------------------------------------------------------------|
| Vercel           | Zero-config, push to deploy                                        |
| Netlify          | Add `netlify` attribute to the contact form to use Netlify Forms   |
| Cloudflare Pages | Set build command `npm run build`, output directory `dist`         |
| GitHub Pages     | Set `site` + `base` in `astro.config.mjs` if deploying to a subpath |
