# Isometric Process Maps — Design Spec

**Date:** 2026-06-11 · **Status:** Approved by Allen (visual companion session)

## Goal

Replace the text-heavy workflow sections across alexic.ca with animated isometric
process maps, so visitors *see* what AIC does instead of reading it.

## Visual style (locked after 4 rounds of comparison)

- **Composition:** dark navy (#06142E) glass platforms with cyan neon rims,
  zigzag layout, dashed marching connectors with traveling glow dots,
  uppercase mono labels with leader lines, vertical start/end chips.
- **Objects:** [3dicons.co](https://3dicons.co) (CC0-1.0) glossy 3D rendered
  icons, **original colors** (option B — red/orange pops on navy and echoes the
  site's warm CTA color). White backgrounds removed via edge flood-fill,
  shipped as ≤300px transparent WebP.
- Rejected along the way: hand-drawn flat SVG (crude), Storyset illustrations
  (too cartoonish), Isoflow outline icons (dated), wireframe/gradient-glass/
  Three.js directions (style round 2).

## Deliverables

| Map id | Page | Flow | Icons |
|---|---|---|---|
| `workforce-pathway` | ai-workforce-sme-adoption.html | Assess → Train → Implement → Measure → Optimize | target, notebook, setting, chart, rocket |
| `aic-engine` | index.html (How AIC Works) | Assess → Train → Build → Deploy → Measure | target, notebook, tools, rocket, chart |
| `research-pathway` | applied-research.html | Define → Prototype → Validate → Pathway | bulb, tools, shield, map-pin |
| `venture-pathway` | incubation.html | Validate → Shape → Pilot → Prepare | target, setting, rocket, trophy |
| `infra-pathway` | data-centre.html | Host → Test → Scale | computer, shield, chart |

Each map ships in two layouts: horizontal (default) and vertical (`-v` suffix)
for screens < 640px, swapped via CSS in a `.isopanel` dark rounded panel.

## Architecture

- **Generator:** `tools/build_isomaps.py` — pure-Python SVG composer.
  Config-driven (`MAPS` list at the bottom). Re-run after editing text:
  `python3 tools/build_isomaps.py`
- **Icon pipeline:** `tools/iso-icons/3d/*.webp` (transparent, 300px).
  New icons: download `dynamic/500/color.webp` from the 3dicons CDN,
  strip white bg (flood-fill, keeps interior whites), save 300px WebP.
- **Output:** `assets/iso/*.svg` — self-contained animated SVGs (~90 KB each):
  CSS animations embedded (dash march, platform bob, dot ride along
  `offset-path`), system mono font stack, `prefers-reduced-motion` safe,
  no JS, loaded via `<img>`.
- **Integration:** `.isopanel` (navy rounded panel, in both `site.css` and
  `page.css`) wraps the `<img>`; alt text carries the full flow for a11y/SEO.

## Content rules

- Step titles ≤ 10 chars, subs ≤ 5 words — the map replaces prose, it must not
  recreate it.
- The old coreflow start/end copy moves into the rotated chips + station subs;
  redundant tick-lists below replaced sections are deleted.

## Licensing

3dicons is CC0-1.0 (no attribution required). Isoflow icons (MIT) remain in
`tools/iso-icons/` as unused fallbacks.
