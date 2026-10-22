# Apple Design Principles & Human Interface Guidelines

All UI/UX development and reviews in this repository must adhere to Apple's Human Interface Guidelines (HIG) and the 8 core Apple Design Principles reintroduced in 2026:

## 1. The 8 Core Design Principles
- **Purpose**: Make something meaningful. Every screen, card, and button must have a clear intention.
- **Agency**: Let people do things their own way. Interfaces are unobtrusive, forgiving, and support undo/easy recovery.
- **Responsibility**: Prioritize safety, privacy, and clear user trust.
- **Familiarity**: Build on established platform conventions and consistent visual/interaction patterns.
- **Flexibility**: Adapt gracefully across screen sizes, touch/mouse inputs, and accessibility settings.
- **Simplicity**: Remove the unnecessary. Every visual element must earn its place.
- **Craft**: Obsess over every detail: typography hierarchy, hairline borders, subpixel rendering, smooth easing curves (`cubic-bezier(0.16, 1, 0.3, 1)`), and spacing.
- **Delight**: Make it human through subtle micro-interactions and tactile feedback (`active:scale-[0.98]`). Never mistake delight for gratuitous decoration.

## 2. Visual Craft Guidelines
- **Typography**: Apple SF Pro system stack (`-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui`). Strict optical sizing: tight tracking for large display headers, relaxed for small captions.
- **Surfaces & Depth**:
  - **Functional Layer (Glass/Translucency)**: Navigation bars, toolbars, modal sheets, and floating controls use regular Liquid Glass (`backdrop-blur-xl bg-white/75 dark:bg-black/75 border-b border-black/[0.06] dark:border-white/[0.08]`).
  - **Content Layer**: Cards and content containers use solid/subtle tinted backgrounds with soft multi-stop shadows (`shadow-[0_2px_12px_-2px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.02)]`) and smooth continuous corners (`rounded-2xl` / `rounded-xl`).
- **Color & Accents**:
  - Restrained monochrome base with purposeful system accent color (Apple System Blue `#0071e3` / `rgb(0, 113, 227)`).
  - Status indicators (badges/tags) use translucent vibrant fills with deep contrast text (e.g. `bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 rounded-full`).
- **Controls**:
  - Prominence hierarchy: at most one or two primary filled buttons per view. Secondary actions use subtle translucent fills or ghost buttons.
  - Tactile feedback: `active:scale-[0.98] transition-all duration-150 ease-out`.
