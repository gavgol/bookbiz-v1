# Visual Constitution & Style Guide
> **Identity**: Luxury Tech (Deep Charcoal / Electric Blue / Glassmorphism)

## 1. Color Palette
| Token | Value | usage |
| :--- | :--- | :--- |
| `bg-primary` | `#0A0A0A` | Main Background (Deep Charcoal) |
| `bg-secondary` | `#111111` | Cards / Panels |
| `accent-primary` | `#007AFF` | Primary Action (Electric Blue) |
| `accent-gold` | `#D4AF37` | Premium Highlights (Optional) |
| `text-primary` | `#EDEDED` | Headings |
| `text-secondary` | `#A1A1A1` | Body Text |
| `border-glass` | `rgba(255, 255, 255, 0.1)` | Glass Borders |

## 2. Typography
*   **Font Family**: `Inter` (Google Fonts) or system-ui (San Francisco/Segoe UI) for clean tech feel.
*   **Headings**: Tight tracking (`-0.02em`), varied weights (Light/Bold contrast).
*   **Body**: Readable, standard tracking.

## 3. Atomic Rules (The Physics)
*   **Radius**: `rounded-xl` (12px) for cards, `rounded-full` for buttons.
*   **Shadows**: "Glows" instead of harsh shadows.
    *   `shadow-[0_0_20px_rgba(0,122,255,0.3)]` (Electric Blue Glow)
*   **Glassmorphism**:
    *   `bg-white/5 backdrop-blur-lg border border-white/10`
*   **Spacing**: Grid system divisible by 4px. Ample whitespace section-to-section.

## 4. Micro-Interactions (Framer Motion)
*   **Hover**: Scale 1.02 + Glow Intensity Increase.
*   **Click**: Scale 0.98.
*   **Page Load**: `initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}`.
*   **Skeleton**: Shimmer effect gradient `from-gray-900 via-gray-800 to-gray-900`.
