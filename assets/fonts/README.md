# Fonts

## Barlow + Barlow Condensed — already working

Loaded from Google Fonts in `index.html`. Nothing to do.

- **Barlow** 400, 500, 600, 700 — body copy, navigation, buttons, forms, descriptions
- **Barlow Condensed** 500, 600, 700 — labels, specs, pricing, quantities, turnaround, category tags

## TT Lakes Neue — licensed, files required

TT Lakes Neue is a commercial face from **TypeType** (typetype.org). It is not on Google Fonts
and cannot be loaded from a free CDN. The licence must be bought, then the web files placed here.

`assets/css/site.css` already declares the `@font-face` rules (paths are `../fonts/…`, relative to
the stylesheet). Drop these files into this folder and the display typography activates across all
ten pages with no code change:

```
assets/fonts/
├── TTLakesNeue-ExtraBold.woff2    ← weight 800
├── TTLakesNeue-ExtraBold.woff     ← weight 800 (fallback)
├── TTLakesNeue-Black.woff2        ← weight 900
└── TTLakesNeue-Black.woff         ← weight 900 (fallback)
```

If your licence ships different filenames, either rename them to match the list above, or edit the
`@font-face` blocks at the top of `assets/css/site.css`.

### Licence note
A **web font licence** is required — a desktop licence does not cover serving files from a website.
TypeType sells these separately and prices web licences by monthly pageviews.

### Until the files are added
The display stack falls back to Barlow Condensed, so the page stays readable and the hierarchy
holds, but the headlines will not be the intended face. Nothing else is affected.

## Where each font is used

| Face | Applied to |
|---|---|
| TT Lakes Neue 900 | Hero headline, section headings (`.d1`, `.d2`), step numbers |
| TT Lakes Neue 800 | Card headings, FAQ questions, chips, benefit bar, contact values (`.d3`) |
| Barlow 400–500 | Paragraphs, form inputs, footer links — 16–19px, 1.55–1.58 line-height, max 62ch |
| Barlow Condensed 600–700 | Buttons, nav, labels, spec tables, tags, job card, counters |
