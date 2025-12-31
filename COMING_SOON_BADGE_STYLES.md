# Coming Soon Badge Component Styles

Reusable styles for the "Coming Soon" badge used across the portfolio.

## ProjectSection Card Badge
**Location:** `src/components/ProjectSection.tsx` (lines 30-47)

```tsx
<span className="relative inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.15em] rounded-full overflow-hidden group/badge">
  {/* Animated gradient border */}
  <span className="absolute inset-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 opacity-80 animate-pulse" />
  <span className="absolute inset-[1px] bg-black rounded-full" />
  {/* Glowing dot */}
  <span className="relative flex h-1.5 w-1.5">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75" />
    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-fuchsia-500" />
  </span>
  {/* Text with gradient */}
  <span className="relative bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
    Coming Soon
  </span>
  {/* Shimmer effect */}
  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" style={{ animationDelay: '0.5s' }} />
</span>
```

**Features:**
- Animated gradient border (violet → fuchsia → cyan)
- Pulsing border opacity
- Glowing dot indicator with ping animation
- Gradient text (violet → fuchsia → cyan)
- Shimmer effect overlay
- 10px font, uppercase, monospace, tight letter-spacing (0.15em)

---

## ProjectModal Button Badge
**Location:** `src/components/ProjectModal.tsx` (lines 172-185)

```tsx
<span className="relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-mono text-sm overflow-hidden">
  {/* Animated gradient border */}
  <span className="absolute inset-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 opacity-80 animate-pulse" />
  <span className="absolute inset-[1.5px] bg-surface rounded-full" />
  {/* Glowing dot */}
  <span className="relative flex h-2 w-2">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75" />
    <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-500" />
  </span>
  {/* Text with gradient */}
  <span className="relative bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent font-semibold tracking-wide">
    Coming Soon
  </span>
</span>
```

**Features:**
- Same gradient border and pulsing effect
- Larger padding (px-6 py-3) for button context
- Larger glowing dot (h-2 w-2)
- No shimmer effect (modal version is cleaner)
- sm font size, monospace, wide letter-spacing

---

## CSS Animation Required
Add this shimmer animation to `src/index.css`:

```css
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
```

---

## Usage Notes
- Only show when `comingSoon: true` AND `!liveUrl`
- Once `liveUrl` is added, the badge should disappear
- Remove `comingSoon: true` from project data when project is live
- Border thickness uses `inset-[1px]` for cards, `inset-[1.5px]` for modals
- Glowing dot size: `h-1.5 w-1.5` for cards, `h-2 w-2` for modals
