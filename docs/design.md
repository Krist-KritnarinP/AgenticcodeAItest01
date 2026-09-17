---
name: Precision Follow-up Architecture
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#464555'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#006591'
  on-secondary: '#ffffff'
  secondary-container: '#39b8fd'
  on-secondary-container: '#004666'
  tertiary: '#005338'
  on-tertiary: '#ffffff'
  tertiary-container: '#006e4b'
  on-tertiary-container: '#67f4b7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#c9e6ff'
  secondary-fixed-dim: '#89ceff'
  on-secondary-fixed: '#001e2f'
  on-secondary-fixed-variant: '#004c6e'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

This design system establishes a high-clarity, productivity-first digital workspace crafted specifically for sales pipeline operators, account managers, and business development teams. The interface conveys quiet operational authority, uncompromised legibility, and rapid decision-making velocity across both English and Thai bilingual environments.

### Brand Personality & Philosophy
- **Focused & Unobtrusive:** The chrome steps into the background. Content, lead velocities, and immediate next steps take total visual precedence.
- **Reliable & Systematic:** Structural grid alignments, deterministic card hierarchies, and disciplined semantic states instill confidence during critical deal execution.
- **Approachable Modernity:** Balanced geometric proportions soften industrial SaaS rigidity, avoiding visual fatigue during intensive multi-hour pipeline reviews.

### Design Movement
**Modern Functional Corporate with Subtle Tactile Refinement.**
The aesthetic pairs crisp structural containers with soft diffuse elevations, hairline borders (`#e2e8f0`), generous interior margins, and purposeful, high-contrast semantic indicators. The design avoids gratuitous ornament in favor of data-dense clarity, balanced typographic rhythm, and clear touch/click affordability.

## Colors

The palette centers on a disciplined neutral-slate foundation accented by an assertive indigo primary driver and strict semantic signal hues engineered for rapid visual triage.

### Core Canvas & Neutrals
- **Canvas Base (`#f8fafc`):** Neutral slate-50 background providing optimal separation against white surface cards.
- **Card & Surface Background (`#ffffff`):** Pure white container surfaces for optimal data contrast.
- **Surface Hover & Zebra Stripe (`#f1f5f9`):** Subdued slate-100 tint for table alternating rows and inactive toggle states.
- **Hairline Border (`#e2e8f0`):** Slate-200 boundary separator defining structural containers without visual weight.
- **Muted Text / Icons (`#64748b`):** Slate-500 for auxiliary metadata, timestamps, and column descriptors.
- **Headings & Body Copy (`#0f172a`):** Slate-900 offering high-contrast legibility for data points and contact titles.

### Action & Accents
- **Primary Indigo (`#4f46e5`):** Reserved strictly for primary call-to-actions, active tab underlines, selected pipeline nodes, and key creation triggers.
- **Primary Hover (`#4338ca`):** Deeper indigo-700 state providing positive interactive tactile feedback.
- **Secondary Sky (`#0ea5e9`):** Secondary accent reserved for informational callouts, link anchors, and fresh lead status badges.

### Semantic Triage Accents
Status badges use dedicated soft-fill and high-contrast text pairings to prevent color fatigue:
- **New Lead (Sky):** Background `#f0f9ff`, Border `#bae6fd`, Foreground `#0369a1`
- **Completed / Active (Emerald):** Background `#ecfdf5`, Border `#a7f3d0`, Foreground `#047857`
- **Pending / Follow-up Soon (Amber):** Background `#fffbeb`, Border `#fde68a`, Foreground `#b45309`
- **Overdue / Urgent (Rose):** Background `#fff1f2`, Border `#fecdd3`, Foreground `#be123c`

## Typography

Typographic scale balances structured data legibility with clean editorial headers. **Plus Jakarta Sans** provides a warm yet distinct geometric posture for pipeline values, board titles, and metric readouts. **Inter** ensures reliable rendering across complex tables, data inputs, and system notifications.

### Thai & English Compatibility
- Line heights are generously pegged (minimum 1.45×–1.6× ratio relative to font size) to prevent Thai diacritic vertical truncation and overlap (`วรรณยุกต์` and `สระ`).
- Font rendering utilizes `-webkit-font-smoothing: antialiased` with standard tabular figure variants enabled (`tnum`) across tabular columns, currency amounts, and phone numbers.
- Text transforms (such as uppercase) are restricted only to English shorthand codes or badge counters; they must not be applied universally across bilingual dynamic fields.

## Layout & Spacing

This design system uses an adaptive 12-column grid layout paired with an 8pt base spatial rhythm.

### Grid & Breakpoints
- **Desktop (≥ 1280px):** 12-column fluid grid, 2rem (`margin`) canvas inset, 1.5rem (`gutter`) column separation. Kanban columns lock to a min-width of 300px with horizontal auto-scroll when exceeding viewport boundaries.
- **Tablet (768px – 1279px):** 8-column layout, 1.5rem margin, 1rem gutter. Sidebar navigations collapse to icon-only rail configurations (64px width).
- **Mobile (≤ 767px):** 4-column layout, 1rem (`margin-mobile`) exterior padding, 0.75rem (`gutter-mobile`) gutter. Multi-stage kanban boards collapse into single-column views with sticky horizontal segment selectors.

### Interior Spacing Principles
- Compact components (chips, inline tag items, table rows) leverage `space-xs` (4px) and `space-sm` (8px).
- Action blocks, fieldsets, and standard card padding leverage `space-md` (12px) and `space-lg` (20px).
- Structural section separations and major dashboard cards use `space-xl` (32px).

## Elevation & Depth

Visual hierarchy combines physical border separation with neutral, diffused ambient drop shadows to produce an uncluttered, tactile plane.

### Elevation Levels
- **Level 0 (Flat Surfaces):** Table row alternates, embedded input backgrounds, and page canvases use pure flat layout (`box-shadow: none`) and rely solely on the 1px `#e2e8f0` border for separation.
- **Level 1 (Resting Cards & Kanban Columns):** Used for lead items, data metric cards, and dashboard panels:
  - `box-shadow: 0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05);`
  - Border: 1px solid `#e2e8f0`.
- **Level 2 (Hover & Active Grab):** Used when hovering over a lead card or actively dragging kanban items:
  - `box-shadow: 0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04);`
  - Border: 1px solid `#cbd5e1`.
- **Level 3 (Overlays, Modals & Dropdown Popovers):** Contextual popovers, quick-lead drawers, and command palettes:
  - `box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.06);`
  - Border: 1px solid `#e2e8f0`.

## Shapes

The geometric silhouette reflects a refined modern product identity (Level 2: Rounded). It employs rounded corners to soften dashboard interfaces without sacrificing professional desktop utility.

### Geometric Corner Rules
- **Base Components (Inputs, Buttons, Dropdowns):** `0.5rem` (8px). Matches ergonomic click targets while preserving tight form layouts.
- **Cards & Data Modules:** `0.75rem` to `1rem` (12px–16px) for major lead grouping blocks, pipeline stages, and KPI metrics.
- **Badges & Status Chips:** Pill-shaped `9999px` to create distinct contrast against rectangular input containers and grid cards.
- **Modals & Flyouts:** `1rem` (16px) outer radius to maintain clear containment.

## Components

### Buttons
- **Primary:** Background `#4f46e5`, text `#ffffff`, height 40px, padding `0 16px`, radius 8px, font `label-md`. Hover state: `#4338ca`. Focus ring: 2px `#ffffff`, 2px `#4f46e5` offset.
- **Secondary / Outline:** Background `#ffffff`, border 1px `#e2e8f0`, text `#0f172a`. Hover state: `#f8fafc`, border `#cbd5e1`.
- **Destructive:** Background `#ffffff`, border 1px `#fecdd3`, text `#be123c`. Hover: `#fff1f2`.

### Status Badges & Chips
- Status indicators feature an inline dot (6px circle) alongside the status text.
- Height 24px, padding `2px 10px`, radius 9999px, font `label-sm`.
- Tokens map explicitly to semantic variables:
  - **Completed / Active:** Emerald dot `#059669`, background `#ecfdf5`, text `#047857`.
  - **Pending / Soon:** Amber dot `#d97706`, background `#fffbeb`, text `#b45309`.
  - **Overdue / Urgent:** Rose dot `#e11d48`, background `#fff1f2`, text `#be123c`.
  - **New Lead:** Sky dot `#0284c7`, background `#f0f9ff`, text `#0369a1`.

### Form Controls & Inputs
- **Text & Select Fields:** Height 40px, 1px border `#e2e8f0`, background `#ffffff`, radius 8px, padding `0 12px`, font `body-md`. Placeholder `#94a3b8`.
- **Active / Focus:** 1px border `#4f46e5`, ring shadow `0 0 0 3px rgba(79, 70, 229, 0.12)`.
- **Checkboxes & Radios:** 18px box, radius 4px (checkbox) or 9999px (radio), border 1.5px `#cbd5e1`. Checked: fill `#4f46e5` with crisp white check glyph.

### Cards & Pipeline Items
- **Lead Card (Board View):** Surface `#ffffff`, border 1px `#e2e8f0`, radius 10px, padding 14px. Top row: lead title with contextual status chip. Middle row: deal value (`headline-sm`, tabular numerals) and contact organization. Bottom row: visual avatar of assignee alongside a high-contrast follow-up schedule indicator.
- **Urgent State Indicator:** Overdue lead cards display a subtle 3px solid vertical left accent border `#e11d48`.

### Data Tables
- **Header:** Height 40px, background `#f8fafc`, text `#64748b`, font `label-sm`, bottom border 1px `#e2e8f0`.
- **Rows:** Height 52px, text `#0f172a`, font `body-md`, bottom border 1px `#f1f5f9`. Hover: background `#f8fafc`. Tabular data cells right-align with monospace numeric alignment.

### Lead Quick Drawer
- Slide-over panel (width 440px on desktop, 100vw on mobile), background `#ffffff`, elevation Level 3. Contains multi-channel timeline items (call logs, email threads, line notes) with an integrated auto-resizing follow-up notes input area.