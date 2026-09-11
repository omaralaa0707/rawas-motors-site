# El Rawas Motors — site 37 of 46

A concept site built entirely from this dealership's own published material.
**Not affiliated with El Rawas Motors, and not an official site.**

- **Live:** https://rawas-motors-site.vercel.app
- **Repo:** [rawas-motors-site](https://github.com/omaralaa0707/rawas-motors-site)

## What this page is about

Every site in this series is built around something true and checkable about
the dealer's own account — a pattern in what they publish, a contradiction
between two of their channels, or a fact about their showroom — rather than
around a generic template. The palette, type, 3D piece and motion below were
all chosen to serve that finding.

## Design record

**Palette**
: Light cool studio-grey ground #F4F5F3, sampled from their own showroom photography — deliberately not dark, breaking the run right after 36's near-black — with panel white and their real logo red #ED1A3B as bright accent, darkened to #D4102E for AA-safe text on white

**Type pairing**
: Bebas Neue + Barlow Semi Condensed / Blaka + Fustat (AR)

**3D / signature technique**
: **The Booth**: their real rented exhibition stand (aluminium truss arch + backlit panel bearing their real "R" mark, drawn via CanvasTexture rather than an SVG trace, plus a floor decal reading "BOOTH A3/A4") rebuilt as the temporary structure it actually was — not a permanent showroom fixture, unlike every prior real-object 3D piece in the set (26's forecourt monogram, 27's chevron band, 30's portal). Camera sits at an elevated off-axis position with an explicit `camera.lookAt(0, 0.55, 0)` in `onCreated`, applying 36's lesson directly

**Motion language**
: **The unroll**: content clips to a thin horizontal band at its own vertical centre and expands both up and down at once, like a roll-up banner stand unrolling (`data-unroll`/`data-unroll-item`). Distinct from every other reveal in the set: the only one that opens from a *centre band* rather than an edge, a point or a plain fade

## Sources

Everything on the page was sourced from:

- Instagram: https://www.instagram.com/rawasmotors/
- Facebook: https://www.facebook.com/rawasmotors/
- Google Maps: https://www.google.com/maps/place/El+Rawas+Motors/data=!4m2!3m1!1s0x0:0x2f079a8cf9ed8370

Photography belongs to the dealership (or, where their frames are watermarked
by an outside studio, to that studio) and is used here only to document their
own published material. No figure on the page is invented: anything the dealer
did not publish is marked as unpublished rather than estimated.

## Running it

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build — must pass before shipping
pnpm lint     # eslint, zero warnings
```

Requires `node-linker=hoisted` in `.npmrc` (already present) or three.js peer
deps fail to resolve.

## Structure

```
src/content/media.ts      verified facts and figures — the data layer
src/content/en.ts|ar.ts   all copy, both locales, identical shapes
src/content/schema-ext.ts the page-specific content contract
src/components/webgl/     the 3D piece
src/components/site/      the page composition
src/app/globals.css       palette tokens, type, RTL overrides, motion
```

Arabic/English toggle with full RTL. All CSS direction overrides key off
`[dir="rtl"]` (never `[lang]`) and live outside `@layer`. Every Latin or
numeric fragment inside Arabic copy is wrapped in `.latin` for correct bidi.

---

Part of a 46-site series. See the [top-level README](../README.md) for the full
index and [`TRACKING.md`](../TRACKING.md) for the differentiation log.
