---
name: Safety & Engineering Standard
colors:
  surface: '#fff8f7'
  surface-dim: '#f3d3ce'
  surface-bright: '#fff8f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff0ee'
  surface-container: '#ffe9e6'
  surface-container-high: '#ffe2dd'
  surface-container-highest: '#fcdbd6'
  on-surface: '#291715'
  on-surface-variant: '#5d3f3b'
  inverse-surface: '#402b29'
  inverse-on-surface: '#ffedea'
  outline: '#926f6a'
  outline-variant: '#e7bdb7'
  surface-tint: '#c00007'
  primary: '#b10006'
  on-primary: '#ffffff'
  primary-container: '#d91e18'
  on-primary-container: '#ffefed'
  inverse-primary: '#ffb4a9'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#49576c'
  on-tertiary: '#ffffff'
  tertiary-container: '#627085'
  on-tertiary-container: '#eef3ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad5'
  primary-fixed-dim: '#ffb4a9'
  on-primary-fixed: '#410001'
  on-primary-fixed-variant: '#930004'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#d5e3fc'
  tertiary-fixed-dim: '#b9c7df'
  on-tertiary-fixed: '#0d1c2e'
  on-tertiary-fixed-variant: '#3a485b'
  background: '#fff8f7'
  on-background: '#291715'
  surface-variant: '#fcdbd6'
  emergency-red: '#B91C1C'
  blueprint-blue: '#1E40AF'
  surface-gray: '#F8FAFC'
  border-subtle: '#E2E8F0'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
  emergency-callout:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '800'
    lineHeight: 24px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  section-gap: 120px
---

## Brand & Style
The design system is engineered to project the authority and technical precision of a fire protection leader established in 1977. The brand personality is dependable, compliant, and vigilant. 

The visual style follows a **Corporate / Modern** aesthetic, emphasizing high-fidelity industrial imagery against a backdrop of generous whitespace and structured grids. The UI should evoke the feeling of high-quality safety equipment—functional, durable, and precise. Every element is designed to facilitate quick information retrieval during critical decision-making processes, utilizing clean lines and a "technical documentation" feel that reinforces code compliance and professional expertise.

## Colors
The palette is centered on "Signal Red," a vibrant yet professional hue synonymous with fire safety and emergency response. This is balanced by a sophisticated range of Slate and Charcoal neutrals that provide high contrast for maximum readability.

- **Primary Red:** Reserved for calls to action, emergency indicators, and core brand elements. It must be used with intent to maintain its psychological impact as a safety signal.
- **Secondary Slate:** Used for typography and structural elements to provide a grounded, institutional feel.
- **Surface Neutrals:** Low-saturation grays create a clean, organized canvas that allows red accents and industrial photography to stand out.

## Typography
**Hanken Grotesk** is the sole typeface for the design system, chosen for its sharp geometry and contemporary, engineered appearance. It provides the "technical proficiency" required for a code-compliant service provider.

- **Headlines:** Set with tight tracking and heavy weights to command authority.
- **Body:** Open and legible with generous line-height to ensure safety instructions and technical specifications are easily digestible.
- **Utility Labels:** Uppercase labels with increased letter spacing are used for metadata, credentials, and categorization to mimic industrial labeling systems.

## Elevation & Depth
Depth is conveyed through **tonal layers** and **low-contrast outlines** rather than heavy shadows. This reflects the rigid, physical nature of fire protection hardware.

- **Surfaces:** Secondary content lives on subtle gray surfaces (`#F8FAFC`), while primary content sits on pure white.
- **Borders:** Use 1px solid borders in `border-subtle` for cards and input fields to define structure without adding visual noise.
- **Interactive States:** Subtle, crisp shadows (e.g., 2px blur, 10% opacity) are only used on hover states to provide a tactile "clicky" feel, mimicking mechanical switches.

## Shapes
The shape language is **Soft (0.25rem)**. This slight rounding suggests professional manufacturing and "safety-finished" edges, avoiding the aggression of perfectly sharp corners while remaining more serious than fully rounded/pill-shaped consumer designs.

- **Icons:** Should use a consistent 2px stroke weight with slight corner rounding to match the UI components.
- **Images:** Industrial photography should always be contained in these soft-radius containers to maintain a consistent silhouette across the site.

## Components
### Buttons
- **Primary:** Solid `primary-red` with white text. High-contrast, sharp corners (4px).
- **Secondary:** Outlined `secondary-slate` for technical or administrative actions.
- **Emergency:** Distinctive styling with a pulsing icon or high-visibility background to denote immediate action.

### Cards
Cards are used to categorize services (e.g., Testing, Installation). They feature a white background, a `border-subtle` outline, and top-aligned industrial iconography.

### Input Fields & Controls
Forms should look like official documentation—clean, labeled with `label-caps`, and utilizing high-contrast focus states in red. Checkboxes and radio buttons use the 4px rounding and primary red for "checked" states.

### Status Indicators
Use a system of "Compliance Badges." Circular indicators with icons to show "Certified," "24/7 Available," or "Code Compliant" status, utilizing safety-themed colors like green for pass and red for alert.

### Iconography
Icons must be technical and literal. Use "Line Art" style icons representing sprinkler heads, pipes, alarms, and documents. Avoid abstract or overly "friendly" illustrations.