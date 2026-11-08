---
name: Kinetic Elegance
colors:
  surface: '#fcf8fe'
  surface-dim: '#dcd9df'
  surface-bright: '#fcf8fe'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f2f8'
  surface-container: '#f0edf2'
  surface-container-high: '#eae7ed'
  surface-container-highest: '#e4e1e7'
  on-surface: '#1b1b1f'
  on-surface-variant: '#464650'
  inverse-surface: '#303034'
  inverse-on-surface: '#f3eff5'
  outline: '#777681'
  outline-variant: '#c7c5d1'
  surface-tint: '#555995'
  primary: '#161954'
  on-primary: '#ffffff'
  primary-container: '#2c306a'
  on-primary-container: '#969adb'
  inverse-primary: '#bfc2ff'
  secondary: '#006a60'
  on-secondary: '#ffffff'
  secondary-container: '#53f8e2'
  on-secondary-container: '#006f64'
  tertiary: '#222300'
  on-tertiary: '#ffffff'
  tertiary-container: '#373900'
  on-tertiary-container: '#a1a600'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e0e0ff'
  primary-fixed-dim: '#bfc2ff'
  on-primary-fixed: '#10134e'
  on-primary-fixed-variant: '#3d417c'
  secondary-fixed: '#57fae5'
  secondary-fixed-dim: '#29dec9'
  on-secondary-fixed: '#00201c'
  on-secondary-fixed-variant: '#005048'
  tertiary-fixed: '#e5eb3a'
  tertiary-fixed-dim: '#c8ce16'
  on-tertiary-fixed: '#1c1d00'
  on-tertiary-fixed-variant: '#474a00'
  background: '#fcf8fe'
  on-background: '#1b1b1f'
  surface-variant: '#e4e1e7'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 80px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-bold:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.1em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1440px
  section-gap-desktop: 160px
  section-gap-mobile: 80px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style

This design system is built for a premium, award-winning agency aesthetic that balances editorial precision with digital fluidity. The personality is confident, innovative, and highly curated, targeting high-growth startups and visionary brands.

The visual style is a sophisticated blend of **Modern Minimalism** and **Glassmorphism**. It utilizes expansive whitespace (breathing room) to signify luxury, while incorporating translucent layers and subtle background blurs to create depth. The interface feels tactile yet ethereal, using floating geometric elements and organic transitions to guide the user's eye. Every interaction should feel intentional, smooth, and high-end, mirroring the quality of a world-class design studio.

## Colors

The palette is anchored by a warm, off-white background that feels more premium and less clinical than pure white. 

- **Primary Deep Blue:** Used for high-level headings and foundational structural elements to provide a sense of authority and depth.
- **Teal Accent:** Reserved for primary calls to action, iconography, and progress indicators. It represents the "creative spark."
- **Lime Accent:** Used sparingly for badges, status labels, and high-visibility callouts to provide a vibrant, modern contrast.
- **Surface Neutrals:** A range of soft greys and semi-transparent whites are used for glassmorphic cards and secondary containers.

## Typography

The system uses **Plus Jakarta Sans** across all levels to maintain a clean, contemporary feel. The hierarchy is intentionally dramatic.

- **Display & Headlines:** Use tight letter spacing and heavy weights to create a "poster-like" impact. On mobile, display sizes scale down aggressively to ensure readability.
- **Body Text:** Generous line-height (1.6) is applied to ensure maximum legibility against the off-white background.
- **Labels:** Small labels use uppercase styling with increased letter spacing to distinguish them from body content, often used for "breadcrumbs" or "kicker" text above headlines.

## Layout & Spacing

The layout follows a **Fluid Grid** model with high-density internal spacing but low-density external spacing (large margins).

- **Grid:** A 12-column grid is used for desktop, 8-column for tablet, and 4-column for mobile.
- **Vertical Rhythm:** Sections are separated by massive vertical gaps to emphasize a "one thought at a time" browsing experience.
- **Safe Areas:** Large horizontal margins (64px+) on desktop prevent content from feeling "trapped" against the screen edges, reinforcing the premium feel.

## Elevation & Depth

This design system avoids heavy, traditional shadows in favor of **Tonal Layers** and **Glassmorphism**.

1.  **Level 0 (Base):** The main `#FCF9ED` background.
2.  **Level 1 (Subtle):** Elements slightly lighter than the background with a 1px soft border (low-contrast outline) and a 40px blur radius shadow at 5% opacity.
3.  **Level 2 (Glass):** Semi-transparent white `#FFFFFF` at 60-80% opacity with a `backdrop-filter: blur(20px)`. Used for navigation bars and floating cards.
4.  **Level 3 (Overlay):** High-contrast modals or tooltips using the Primary Deep Blue with sharp, clean edges.

## Shapes

The shape language is consistently **Rounded**, reflecting the soft and approachable nature of modern agency design.

- **Standard Elements:** Buttons, input fields, and small cards use a 0.5rem (8px) radius.
- **Containers:** Large feature cards and image containers use a `rounded-xl` (1.5rem / 24px) radius to create a distinct, friendly frame.
- **Interactive Elements:** Active states may increase roundedness or use pill-shapes (especially for chips and tags) to differentiate them from static containers.

## Components

### Buttons
- **Primary:** Solid Teal background with White text. High-contrast, rounded-full (pill). Subtle hover state involves a slight scale-up (1.05) and a shadow increase.
- **Secondary:** Deep Blue outline with Deep Blue text. 1px stroke. Transparent background.
- **Ghost:** Text-only with an arrow icon that slides on hover.

### Cards
- **Glass Card:** Used for "Our Services." White background at 70% opacity, 20px backdrop blur, 24px corner radius. 1px white border.
- **Case Study Card:** Large image-first layout with typography overlaying the image or positioned immediately below with zero margin.

### Input Fields
- Underlined style or soft-filled backgrounds with a focus state that transitions the bottom border to Teal. Typography remains `body-md`.

### Chips & Badges
- **Status Chips:** Pill-shaped with the Lime accent background and Deep Blue text. Used for "New" or "Live" indicators.
- **Service Chips:** Small, Deep Blue outlines used to categorize projects.

### Lists
- Minimalist spacing with custom iconography (Teal circles or arrows) rather than standard bullets.