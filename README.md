# dimitarenchev.com

Personal website for Dimitar Enchev. Static site built with [Astro](https://astro.build/), deployed to [Cloudflare Pages](https://pages.cloudflare.com/).

## Project structure

```
.
├── astro.config.mjs            Astro config (site URL, static output)
├── package.json                npm dependencies + scripts
├── tsconfig.json               TypeScript / Astro type config
├── public/
│   └── portrait.jpg            Static assets served at site root
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro    HTML shell, meta tags, fonts
│   ├── pages/
│   │   └── index.astro         The homepage (all sections)
│   └── styles/
│       └── global.css          All styles
└── reference/
    └── dimitar-enchev.original.html   The first hand-written HTML draft (kept for reference, not built)
```

## Local development

Requires Node.js 20+ (we tested on 22.22).

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to ./dist
npm run preview  # serve ./dist locally
```

## Deploy to Cloudflare Pages

This is a one-time setup. After it's done, every push to `main` deploys automatically.

### 1. Push the project to a Git host

GitHub or GitLab work; GitHub is the path of least resistance with Cloudflare.

```bash
git init
git add .
git commit -m "Initial Astro port of dimitarenchev.com"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

### 2. Create the Cloudflare Pages project

1. Sign in at https://dash.cloudflare.com/
2. **Workers & Pages → Create → Pages → Connect to Git**
3. Authorize Cloudflare to access your repo and select it
4. **Set up builds and deployments** with these values:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** *(leave blank)*
   - **Environment variables:** none required for now
5. Click **Save and Deploy**. First build takes ~60–90 seconds.

You'll get a `*.pages.dev` preview URL immediately. Every subsequent push to `main` redeploys automatically. Pull request branches get their own preview URLs.

### 3. Connect your custom domain

1. Buy `dimitarenchev.com` (and `dimitarenchev.eu` if you want) from any registrar — Cloudflare's own registrar is fine and avoids the nameserver dance.
2. In the Cloudflare Pages project: **Custom domains → Set up a custom domain → dimitarenchev.com**
3. If the domain is already on Cloudflare, this is one click. If it's at a third-party registrar, follow the DNS instructions Cloudflare provides (one CNAME record).
4. SSL/TLS is automatic and free.
5. Optionally: add `www.dimitarenchev.com` and configure a redirect to the apex.

### 4. Privacy-respecting analytics

Cloudflare Web Analytics is free and requires no cookie banner under GDPR. In the Cloudflare dashboard: **Analytics & Logs → Web Analytics → Add a site**. Copy the JS snippet into `src/layouts/BaseLayout.astro` (one-line `<script>` before `</head>`), commit, push.

## Conventions

- **One page per route.** All sections live in `src/pages/index.astro`. When the writing archive lands, posts will live under `src/pages/writing/` as MDX.
- **Global styles only (for now).** All CSS is in `src/styles/global.css` and imported by `BaseLayout.astro`. Component-scoped styles can come later when we decompose sections into components.
- **No client framework.** Vanilla JS in an `is:inline` script block. Keep it that way until we have a real reason to introduce React/Vue.
- **Static everywhere.** No SSR, no edge functions. Cloudflare Pages serves pre-built HTML at the edge.

## What's intentionally not done yet

- Favicon and `og:image` (waiting on Pass 2 visual work)
- JSON-LD `Person` schema (Tier-1 SEO fix, scheduled for after motion passes)
- Mobile nav drawer (under 720px the nav links are hidden — Tier 1)
- `prefers-reduced-motion` honor (Tier 1)
- Stat consistency: hero says "5 Companies Founded" but Ventures lists 4
- Writing teasers have no links (intentional for now per direction)
