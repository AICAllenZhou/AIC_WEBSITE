# Alexander Innovation Centre (AIC) — Website

The official website for the **Alexander Innovation Centre (AIC)**, a BC-based applied-AI
platform connecting applied research, workforce & SME adoption, ALEBEX AI, venture incubation,
and trusted Canadian AI infrastructure under one roof.

A static, dependency-free site (plain HTML, CSS, and vanilla JS) — no build step required.

## Run locally

Serve the folder with any static server, for example:

```bash
python3 -m http.server 8731
# then open http://localhost:8731/
```

Opening `index.html` directly also works for most pages.

## Structure

```
index.html                       Home (scroll-scrubbed video hero, operating model, ALEBEX orb)
divisions.html                   Core Areas (capabilities)
programs.html                    Services (actions)
alebex-ai.html                   ALEBEX AI flagship
innovation-night.html            Innovation Nights blog feed
contact.html                     Routed contact / inquiry form
applied-research.html            Core area detail
ai-workforce-sme-adoption.html   Core area detail
incubation.html                  Core area detail
data-centre.html                 Core area detail (Canadian AI infrastructure)
faq.html / training.html         Redirect stubs

events/                          Blog / event posts
  2026-04-30-ai-innovation-night-launch.html
  ces-2026-the-future-is-here.html
  ces-2026-six-trends.html
  template.html                  Reusable post template
  April_30_2026/                 Event photos
  ces-2026/                      CES 2026 post images

assets/                          All shared assets
  *.css                          colors_and_type, site (home), page (detail pages)
  *.js                           scroll (video scrub), nav (mobile menu), lightbox, alebex-orb (Three.js)
  aic-background.mp4             Scroll-driven background video
  *.png / *.jpg / *.webp         Imagery
  events/                        Event poster assets
```

## Notes

- **Palette / type:** navy + white + cyan; Sora / Inter / JetBrains Mono.
- **Background video** is scrubbed by page scroll via `assets/scroll.js`.
- **ALEBEX orb** is a Three.js liquid sphere (`assets/alebex-orb.js`) with a CSS fallback,
  linking demos to <https://alebex.ai/>.
- External links: event registration on [Luma](https://luma.com/eu31fbfu),
  updates on [LinkedIn](https://www.linkedin.com/company/alexinnovationc/posts/).

Alexander Innovation Centre · #101 - 570 Dunsmuir Street, Vancouver, BC V6B 1Y1 · <https://alexic.ca>
