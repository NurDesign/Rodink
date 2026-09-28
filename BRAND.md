# RodinK Printing — Brand Reference

Extracted from the live site (rodinkprinting.com), 2026-09-27.
Stack: WordPress + WooCommerce + Elementor + Phlox Pro theme + Depicter slider.

---

## Core palette (keep)

| Role | Hex | Source | Notes |
|---|---|---|---|
| **Brand teal** | `#5CB2BF` | Elementor `--e-global-color-primary` | **The brand color.** Logo is flat `#5CB1BE` — same color, 1pt rounding. |
| Deep teal | `#41A8B8` | `--e-global-color-secondary` / `accent` | Hover / pressed states |
| Ink black | `#0A0A0A` | `--e-global-color-86f8931` | Headings |
| Soft black | `#202020` | `--e-global-color-b8dd6fc` | H1 |
| White | `#FFFFFF` | `--e-global-color-9273f68` | |
| Slate gray | `#70798B` | `--e-global-color-a297dda` | Muted text |
| Light gray | `#F3F4F6` | `--e-global-color-b1578f4` | Section backgrounds |

## Drop

| Hex | Source | Why |
|---|---|---|
| **`#F3FE39`** | `--e-global-color-ea511c8` | **The acid-yellow the client wants gone.** Defined as a global palette slot on every page; applied through slider/banner artwork rather than CSS rules. |
| `#1BB0CE` | Phlox Pro theme link color | A *third* teal, used 88× on the homepage. Clashes with `#5CB2BF`. Consolidate to the brand teal. |
| `#C5C0D5`, `#ABAFC7` | Elementor globals | Lavender-grays, off-brand, unused |
| `#444444` | body text | Replace with a neutral tied to the palette |

**Color audit:** the live site runs three different teals (`#5CB2BF`, `#41A8B8`, `#1BB0CE`) with no system. Collapse to one brand teal + one dark shade.

---

## Recommended accent (replaces the yellow)

**Coral `#FF6B4A`** — the true color-wheel complement of the brand teal (teal sits at hue 187°, coral at 12°).

| Pairing | Ratio | Verdict |
|---|---|---|
| `#FF6B4A` on `#0A0A0A` | **7.0 : 1** | AAA large / AA normal |
| `#5CB2BF` on `#0A0A0A` | **8.1 : 1** | AAA large / AA normal |
| `#FF6B4A` on `#FFFFFF` | 2.8 : 1 | Large display + graphics only — not body text |

Why it works:
- Genuine complement, so it energizes the teal instead of fighting it
- Reads loud at heavy weights — matches the "bold" direction
- Warm against the cool teal, which is what the acid yellow was doing badly
- Suits the streetwear/sticker energy of the reference sites

Use it on dark sections. Pair with near-black grounds, teal as the primary, coral reserved for CTAs and accents.

**Alternates** if the client rejects coral:
- Amber `#FF9F1C` — split-complement, softer, closer to the old yellow's warmth
- Hot pink `#FF4D8D` — louder, leans sticker-culture, further from the brand

---

## Proposed system

```css
--brand-teal:     #5CB2BF;   /* primary */
--brand-teal-dk:  #41A8B8;   /* hover */
--brand-teal-lt:  #8FCBD4;   /* tints */
--accent-coral:   #FF6B4A;   /* CTA — replaces #F3FE39 */
--accent-coral-dk:#E8542F;
--ink:            #0A0A0A;
--ink-soft:       #202020;
--slate:          #70798B;
--gray-100:       #F3F4F6;
--white:          #FFFFFF;
```

---

## Typography (current)

| Family | Use | Weights seen |
|---|---|---|
| **Alata** | Headings | 400, 500, 600, 700 |
| **Lato** | Body / UI | 400, 600, **900** |
| Raleway | Theme chrome | 400, 600 |

Three families is one too many. Alata only ships a single weight (400) upstream — the 500/600/700 on the live site are faux-bold, which is why headings look soft rather than bold.

**Recommendation for the "bold" direction:** a true heavy display face for headings, with Lato 900 retained or replaced. Candidates — *Archivo Black*, *Anton*, *Bebas Neue*, or *Inter* at 800/900 for a cleaner read. Drop Raleway entirely.

---

## Assets on disk

- `assets/brand/logo.png` — 1028×480, flat `#5CB1BE` script wordmark, transparent PNG
- `assets/brand/sticker-diecut.png`, `sticker-circle.png`, `sticker-square.png`
- `assets/brand/dtf-mockup.png`
- `assets/portfolio/1.png` … `20.png` — 1000×1250 each, 11.9 MB total

### Portfolio notes
All 20 are flat-lay tee mockups on white. Mostly black and heather shirts, streetwear/graphic-heavy.

- **`17.png` exists** but was never linked on the live `/portfolio/` page — 19 of 20 were shown.
- The live page's image links are malformed (`/rodinkprinting.com/wp-content/...`, missing protocol) so every lightbox link 404s.
- **`10.png` is a Rust-Oleum parody design** using a third-party registered trademark. Worth flagging before it goes in a homepage hero slider.
- White-background flat lays will need dark section treatment or background removal to read well in a bold, dark-led design.
