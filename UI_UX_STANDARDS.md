# BookBiz UI/UX Standards (Pro Max)

## 1. Core Philosophy: Luxury Tech
- **Identity**: Dark, sleek, premium, trusted.
- **Palette**: Deep Charcoal (`#050505`), Electric Blue (`#007AFF`), White Text (`#EDEDED`), Subtle Borders (`white/10`).
- **Feel**: Fluid, responsive, expensive. No "jank", no default browser styles.

## 2. The Glassmorphism Rule
All floating elements (Cards, Modals, Sticky Navs) MUST use the following recipe:
```css
background: rgba(255, 255, 255, 0.03); /* Extremely subtle */
backdrop-filter: blur(20px);          /* Heavy blur for depth */
border: 1px solid rgba(255, 255, 255, 0.08);
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
border-radius: 24px;                  /* Large, friendly corners */
```

## 3. Typography & Spacing
- **Font**: Sans-serif (Geist/Inter/Heebo).
- **Headings**: Tight tracking (`tracking-tight`), heavy weights (700/800).
- **Body**: Relaxed formatting (`leading-relaxed`), lighter grays (`text-neutral-400`).
- **Whitespace**: Use generous padding. "White space is luxury."
  - Sections: `py-24` or `py-32`.
  - Cards: `p-8` or `p-10`.

## 4. Animation Physics (Framer Motion)
- **Entrance**: Staggered fade-ins. Never just "appear".
- **Hover**: Scale up (`scale-105`), glow increase, border lighten.
- **Micro-interactions**: Click feedback (`scale-95`), focus rings.

## 5. Mobile Optimization
- **Touch Targets**: Min 44px height for all buttons.
- **Layout**: Single column on mobile, 2-3 on desktop.
- **Thumb Zone**: Critical actions at the bottom or easily reachable.

## 6. RTL (Right-to-Left) Mandate
- **Direction**: `dir="rtl"` on all layout roots.
- **Alignment**: Text right-aligned (`text-right`) by default.
- **Icons**: Chevrons and Arrows must be mirrored or context-aware.

## 7. The "Pro Max" Audit Checklist
Before committing any UI code, verify:
- [ ] Is the spacing consistent?
- [ ] Do buttons respond to hover/click?
- [ ] Is the contrast accessible?
- [ ] Does it look good on an iPhone SE and a 4K monitor?
- [ ] Is there a "Glow" effect somewhere?
