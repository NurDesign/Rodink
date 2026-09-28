# RodinK Printing — static site

Ten static HTML pages. No backend, no build step required to view them — open any `.html` file, or
serve the folder.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home — hero, work gallery, services, sticker library, process, FAQ, quote |
| `screen-print.html` | Screen printing service, minimums, artwork, recent runs |
| `stickers.html` | Custom stickers, material, pricing model, proofs |
| `dtf.html` | DTF transfers — **new page**, the live site's nav link 404s |
| `sticker-library.html` | 13 stock shapes and finishes, explained individually |
| `gallery.html` | All 20 portfolio images, filterable by process, with lightbox |
| `faq.html` | 28 questions in 6 groups |
| `about.html` | Company, who we work with, design services |
| `quote.html` | Quote form, what to include, direct contact |
| `privacy.html` | Privacy policy — **draft, needs legal review** |

Deliberately not built: WooCommerce shop, cart, checkout and account pages.

## Structure

```
index.html + 9 pages      the deliverable
assets/css/site.css       all styling, shared by every page
assets/js/site.js         all behaviour, shared by every page
assets/portfolio/1-20.png 20 product photographs
assets/brand/             logo, product shots, arrow icons
assets/fonts/             TT Lakes Neue goes here (see its README)
assets/icons-sprite.html  inline SVG symbol sprite
.claude/                  page build tooling (not part of the deliverable)
```

## Editing

**Content of one page** — edit `.claude/content/<slug>.html`, then rebuild:

```bash
powershell -ExecutionPolicy Bypass -File .claude/build-pages.ps1
```

**Header, footer or nav** — edit the template in `.claude/build-pages.ps1` and rebuild. This is the
only place that markup exists, so the ten pages cannot drift apart.

**Home page** — `index.html` is edited directly; it is not generated.

**Styling or behaviour** — `assets/css/site.css` and `assets/js/site.js`. No rebuild needed.

## Spacing

One 8px scale, defined as tokens in `site.css` and used site-wide:

`--sp-1` 4 · `--sp-2` 8 · `--sp-3` 12 · `--sp-4` 16 · `--sp-5` 24 · `--sp-6` 32 · `--sp-7` 48 ·
`--sp-8` 64 · `--sp-9` 96 · `--sp-10` 128

Section rhythm comes from `--section-y` (96px desktop / 48px mobile), `--block-gap` and `--el-gap`.
Do not introduce one-off pixel values — the previous stylesheet had 19 competing ones.

## Known issues to resolve before launch

1. **TT Lakes Neue is not installed.** A commercial TypeType licence is required. Until the
   `.woff2` files are in `assets/fonts/`, headlines fall back to Barlow. See
   `assets/fonts/README.md`. This is the only 404 the site produces.
2. **Founding year conflicts.** The live About page says established **2014**; the live home and
   screen print pages say **2016**. This site uses 2016 throughout. Confirm which is correct.
3. **The form is not wired.** `quote.html` and the home form validate and show a message, but post
   nowhere. Needs an endpoint or a form service.
4. **Images are heavy.** ~12 MB of PNGs. Convert to WebP before launch.
5. **`assets/portfolio/10.png`** is a Rust-Oleum parody using a third-party trademark. It is in the
   gallery but kept out of the home hero slider. Confirm it can stay.
6. **Privacy policy is a draft** and must be reviewed against actual data handling.
7. **dtfsheet.com** — unclear whether this is RodinK's own brand or a supplier. It decides where
   DTF ordering CTAs should point.
