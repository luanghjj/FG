---
name: Azubi Elite Hospitality
colors:
  surface: '#fbf9f5'
  surface-dim: '#dbdad6'
  surface-bright: '#fbf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ef'
  surface-container: '#efeeea'
  surface-container-high: '#eae8e4'
  surface-container-highest: '#e4e2de'
  on-surface: '#1b1c1a'
  on-surface-variant: '#564338'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f0ed'
  outline: '#897267'
  outline-variant: '#ddc1b3'
  surface-tint: '#9b4500'
  primary: '#903f00'
  on-primary: '#ffffff'
  primary-container: '#b45309'
  on-primary-container: '#fff1eb'
  inverse-primary: '#ffb68e'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#854600'
  on-tertiary: '#ffffff'
  tertiary-container: '#a95b00'
  on-tertiary-container: '#fff1e9'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbca'
  primary-fixed-dim: '#ffb68e'
  on-primary-fixed: '#331200'
  on-primary-fixed-variant: '#763300'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#fbf9f5'
  on-background: '#1b1c1a'
  surface-variant: '#e4e2de'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: '0'
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: '0'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.08em
  label-eyebrow:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.14em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
---

## Brand & Style

This design system reimagines vocational education (Fachkraft für Gastronomie) into an aspirational, collegiate academy experience. Inspired by traditional European grand hotels, culinary academies, and modern premier EdTech platforms, the aesthetic marries scholarly rigor with warm hospitality. 

The visual direction follows **Warm Editorial Luxury & Quiet Refinement**:
- **Tone:** Academic, dignified, warm, and structured. Apprentices (Azubis) feel valued as future hospitality professionals rather than mere exam candidates.
- **Visual Personality:** Warm alabaster and fine parchment canvases punctuated by deep slate navy and subtle warm amber/gold accents. Hairline strokes (0.5px to 1px) replace loud colored borders, and soft layered ambient shadows create natural tactile depth.
- **Typography Philosophy:** High-contrast editorial display serifs for milestones and subjects paired with ultra-legible modern grotesk sans-serifs for structured operational content, timers, and test questions.

## Colors

The palette is anchored in heritage hotelier tones, balancing the comfort of a reading room with functional app legibility:

- **Primary (`#B45309`) & Accent Gold (`#D97706`):** Hand-picked burnished amber and refined brass gold. Used for key achievements, primary active states, streak badges, and milestone indicators.
- **Secondary / Deep Slate Navy (`#0F172A` & `#1E293B`):** Deep, authoritative grounding color for high-emphasis headlines, active navigation tabs, and primary action buttons.
- **Surface & Canvas (`#FBF9F5` Alabaster Ivory):** A warm, eye-friendly off-white canvas that eliminates stark sterile glare. Elevated cards leverage pure white (`#FFFFFF`) or tinted ivory overlays (`#F5EFEB`).
- **Borders & Dividers:** Very low contrast, warm champagne borders (`rgba(180, 83, 9, 0.12)` and `#EAE4D9`) create clear structural boundaries without visual noise.
- **Semantic Badges:** Muted botanical green (`#15803D` / bg `#F0FDF4`) for ready statuses, refined crimson rose (`#BE123C` / bg `#FFF1F2`) for pending dates/urgent exams, and burnished ochre for in-progress modules.

## Typography

Typography balances collegiate heritage with mobile functional scanning:

- **Display & Section Titles:** Set in **Playfair Display**, evoking classic culinary guides, academy diplomas, and luxury hospitality publications. Used strictly for curriculum headings, major exam milestone cards, and achievement modal headers.
- **Body, Inputs & Micro-Data:** Set in **Plus Jakarta Sans**, offering wide apertures and modern geometric balance for reading exam questions, subject codes (`BfK-1`, `WiKO`), and dates on both handheld mobile devices and desktop views.
- **Eyebrow Tags & Tracking:** All categorical labels (e.g., `PRÜFUNGSTRAINING`, `HAUPTZIEL`, `BERUFSFACHLICHE KOMPETENZ`) use uppercase `label-eyebrow` with wide letter-spacing (`0.14em`) and high contrast to ensure structured orientation.

## Layout & Spacing

The layout adopts an adaptable fluid structure that gracefully spans responsive desktop dashboards and tactile mobile views:

- **Grid Architecture:** Desktop views maintain a structured 12-column grid capped at a maximum content width of 1280px, centered on the warm alabaster background. Mobile layouts compress to single-column card cascades with a standard `16px` outer margin.
- **Vertical Hierarchy:** Generous section spacing (`space-2xl` / 48px on desktop, `space-xl` / 32px on mobile) prevents cognitive fatigue during intense study sessions.
- **Card Padding Rhythms:** Standard subject cards maintain an internal breath of `space-md` (16px), while major exam feature cards expand to `space-lg` (24px) to highlight elevated prestige.

## Elevation & Depth

To express quiet luxury without digital harshness, depth relies on multi-stage warm ambient shadows and tactile hairline strokes:

- **Level 0 (Flat Canvas):** `#FBF9F5` base background with zero shadow.
- **Level 1 (Subtle Cards & Subject Tiles):** Pure white background (`#FFFFFF`) with a delicate composite drop: `0px 2px 8px -2px rgba(15, 23, 42, 0.04), 0px 1px 3px 0px rgba(180, 83, 9, 0.03)` wrapped in a 1px solid border of `#EFEAE1`.
- **Level 2 (Featured Exam Cards & Interactive Focus):** `0px 8px 24px -4px rgba(15, 23, 42, 0.06), 0px 2px 6px -1px rgba(180, 83, 9, 0.04)` with an accented border or subtle gold edge shimmer (`border-l-4 border-amber-600`).
- **Level 3 (Sticky Headers, Modals & Floating Action Pills):** `0px 16px 36px -8px rgba(15, 23, 42, 0.12)` paired with a frosted glass backdrop filter (`backdrop-blur-md bg-white/90`).

## Shapes

The geometric identity is defined by soft, welcoming curvatures that soften the density of German vocational curricula:

- **Cards & Modules:** Utilize generous `rounded-2xl` (16px / 1rem radius) corners, balancing modern touch targets with polished contours.
- **Pills & Status Badges:** Employ full capsule shapes (`rounded-full`) for status indicators (`OK`, `BALD`, `PRO`), search inputs, and filter chips.
- **Inner Micro-elements:** Nested progress bars and interior icon boxes use `rounded-xl` (12px) or `rounded-lg` (8px) to establish geometric nesting harmony with the outer card container.

## Components

### 1. Header & Navigation
- **Navigation Bar:** Elevated frosted ivory surface (`rgba(251, 249, 245, 0.85)`) with a hairline bottom border (`#EFEAE1`). Features a monogram academy crest, serif logo lockup, gold membership badge, and refined utility pills for search and accessibility.
- **Global Search:** Elegant capsule pill with embedded shortcut keys (`/`), slate-gray placeholder, and brass accent ring on focus.

### 2. Cards & Learning Modules
- **Featured Milestone Cards (Zwischenprüfung & Abschlussprüfung):** Framed in pure white with a vertical amber brass ribbon indicator along the left edge. Left side holds a subtle circular crest or laurel badge; right side features a refined call-to-action button (`Los →`).
- **Subject Grid Cards (`BfK`, `WiKO`, `GK`):** Compact, refined tiles with a vertical 3px color accent line corresponding to subject departments. Includes subject codes in bold sans-serif, instructor metadata, subtle pill tags for `OK` / `BALD`, and interactive gold hover arrows.

### 3. Progress Trackers & Streaks
- **Streak Ribbon:** Warm cream container framed with a subtle gold hairline outline, featuring a glowing flame glyph in burnished amber and clean tabular figures.
- **Luxury Progress Bar:** Two-tone progress line featuring a warm sand track (`#EFEAE1`) filled with a soft golden amber gradient (`linear-gradient(90deg, #D97706, #B45309)`), topped with subtle percentage text in deep slate navy.

### 4. Buttons & Badges
- **Primary Buttons:** Deep slate navy (`#0F172A`) filled button with warm alabaster text, transitioning on hover to rich charcoal with a subtle golden glow.
- **Secondary / Action Pills (`Los →`):** Soft ivory/champagne background (`#FDF8EE`) with deep gold typography (`#B45309`), bordered by hairline gold (`rgba(180, 83, 9, 0.2)`).
- **Status Badges (`PRO`, `OK`, `BALD`):** 
  - `PRO`: Metallic warm gold foil effect (subtle gradient with `#78350F` text).
  - `OK`: Soft sage tint (`#F0FDF4`) with hunter green text (`#166534`).
  - `BALD`: Subtle sandstone pill with neutral slate text.

### 5. Input Fields & Form Controls
- **Inputs:** Crisp white background framed by warm oyster boundaries (`#E2DCD5`), transitioning on active focus to a 1.5px warm amber stroke with 3px golden diffused halo (`rgba(217, 119, 6, 0.15)`).