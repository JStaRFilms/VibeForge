# VibeForge — DESIGN.md

> Custom design system for VibeForge landing page.
> **Aesthetic:** "Terminal Noir meets Art Deco" — muted luxury with sharp geometry.
> Not cyberpunk cliché. A dev tool designed by a typography studio.

---

## Color Tokens (Dark Mode Only)

```css
@theme {
  /* Base surfaces */
  --color-base: #07080C;
  --color-surface: #0F1117;
  --color-elevated: #161820;
  --color-glass: rgba(255, 255, 255, 0.03);

  /* Accents */
  --color-accent: #C084FC;       /* Soft violet */
  --color-accent-alt: #38BDF8;   /* Sky blue */
  --color-accent-warm: #F0ABFC;  /* Fuchsia — CTAs only */

  /* Text */
  --color-text-primary: #E8E8ED;
  --color-text-muted: #6B7280;
  --color-text-dim: #3B3F4A;

  /* Borders & Effects */
  --color-border: rgba(255, 255, 255, 0.06);
  --color-glow: rgba(192, 132, 252, 0.15);
}
```

## Typography

| Role | Font | Source | Weight |
|------|------|--------|--------|
| Display/Hero | Instrument Serif | Google Fonts | 400 (italic available) |
| Headings | Satoshi | Fontshare CDN | 700 |
| Body | General Sans | Fontshare CDN | 400, 500 |
| Code | Geist Mono | `geist` pnpm / Vercel | 400 |

### Loading Strategy
- Instrument Serif → `next/font/google`
- Satoshi + General Sans → CDN (`https://api.fontshare.com/v2/css?f[]=satoshi@700&f[]=general-sans@400;500&display=swap`)
- Geist Mono → `geist` pnpm package or CDN

## Layout

| Token | Value |
|-------|-------|
| Max width | `max-w-6xl` (72rem) |
| Section padding | `py-24` to `py-32` |
| Card radius | `rounded-2xl` (16px) |
| Mobile padding | `px-6` |
| Desktop padding | `px-8` |
| Card gaps | `gap-6` |
| Navbar | Floating, glassmorphism |

## Effects

| Effect | Implementation |
|--------|---------------|
| Grain overlay | Fixed `background-image` with SVG noise, `mix-blend-mode: overlay`, `opacity: 0.03` |
| Liquid blobs | SVG `<circle>` with CSS `animation` + `filter: url(#goo)` using `feGaussianBlur` + `feColorMatrix` |
| Glass cards | `backdrop-blur-xl bg-glass border border-[--color-border]` |
| Hover glow | `box-shadow: 0 0 40px var(--color-glow)` on hover with `transition-all duration-300` |
| Scroll reveal | Framer Motion `motion.div` with `useInView`, stagger children offset 0.1s |
| Parallax | Framer Motion `useScroll` + `useTransform` for y-offset |

## Forbidden (Anti-Slop)

- ❌ Inter, Roboto, Arial, Space Grotesk
- ❌ Electric purple `#8b5cf6` on white
- ❌ Purple-to-blue gradient heroes
- ❌ Uniform card grids (vary sizes)
- ❌ Emojis as icons
- ❌ Light mode
- ❌ Stock photos
- ❌ "Get Started" without context
- ❌ Centered-everything with no asymmetry
