# NSquare Innovators — Landing Page

A code version of the Framer site (innovators.framer.website), rebuilt in **React + Vite + Framer Motion**,
with the same layout, sections, images, videos, fonts and animations.

## Project structure

```
index.html                 page title, meta tags, favicon
src/App.jsx                routes: "/" (home), "/predictaX" and "/manthan360"
public/manthan360.html     Manthan 360 landing page (static HTML, served at /manthan360)
src/predictax/             PredictaX product page (PredictaXPage.jsx, data.js for copy/links, styles.css)
src/components/Top.jsx     Header, Hero, About, Partners ticker, Products
src/components/Bottom.jsx  Why Choose Us, CTA, Testimonials, Contact form, Footer
src/components/motion.jsx  shared animations (word blur-in, reveal, roll button)
src/styles.css             all styling + tablet (≤1023px) and mobile (≤809px) breakpoints
public/media/              images + videos (downloaded by scripts/fetch-assets.mjs)
public/partners/           partner logos used in the ticker (already included)
```

## 1. Run it locally

```bash
npm install
npm run fetch-assets   # downloads the images/videos from Framer into public/media (home + PredictaX page)
npm run dev            # open http://localhost:5173
```

> `fetch-assets` only downloads files that are missing. **Run it once and commit `public/media`**
> so the site no longer depends on Framer's servers. The two videos are about 15 MB each, which is fine for GitHub.

## 2. Push to GitHub

```bash
git init
git add .
git commit -m "NSquare Innovators landing page"
git branch -M main
git remote add origin https://github.com/<your-username>/nsquare-innovators-website.git
git push -u origin main
```

## 3. Deploy on Vercel

1. Go to https://vercel.com/new and import the GitHub repo.
2. Vercel detects **Vite** automatically (settings are also in `vercel.json`):
   build command `npm run build`, output directory `dist`.
3. Click **Deploy**. Every push to `main` redeploys automatically.

## 4. Connect your domain

1. Vercel → your project → **Settings → Domains** → add `yourdomain.com` (and `www.yourdomain.com`).
2. At your domain registrar (GoDaddy, Hostinger, etc.) add the DNS records Vercel shows. Usually:
   - `A` record, host `@` → `76.76.21.1`
   - `CNAME` record, host `www` → `cname.vercel-dns.com`
3. Wait for DNS to update (minutes to a few hours). Vercel issues the SSL certificate automatically.

## Contact form

Framer's built-in form backend doesn't exist outside Framer, so the form works in one of two ways:

- **Default:** opens the visitor's email app with their details, addressed to contact@nsquareinnovators.com.
- **Recommended:** create a free form at https://formspree.io and copy its endpoint. Then in Vercel →
  Settings → Environment Variables, add `VITE_FORM_ENDPOINT=https://formspree.io/f/xxxxxx` and redeploy.
  Submissions then reach your inbox without the visitor leaving the page. (See `.env.example` for local use.)

## Pages

- `/` — Innovators landing page. The PredictaX card opens `/predictaX`.
- `/predictaX` — PredictaX product page (e.g. nsquareinnovators.com/predictaX). `vercel.json` rewrites routes to `index.html`,
  so refreshing or sharing this URL works on Vercel.

## Editing content

- Text: edit the JSX in `src/components/`.
- Images/videos: replace the file in `public/media/` with a new one of the same name.
- Partner logos: add/remove PNGs in `public/partners/` and update the `PARTNERS` list in `src/components/Top.jsx`.
  They show in full colour on a white plate.
- Colours/fonts/sizes: variables at the top of `src/styles.css`.
