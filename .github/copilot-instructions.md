# Portfolio Project - AI Coding Instructions

## Architecture Overview

React + Vite portfolio with a "Soft Digital" aesthetic - blending code precision (ASCII, monospace) with humanism (serif, soft colors, grain textures).

### Tech Stack
- **Framework**: React + Vite
- **Styling**: Tailwind CSS v4 (using `@theme` variables)
- **Animation**: Framer Motion
- **Routing**: Wouter (lightweight React router)
- **Fonts**: Google Fonts (Inter, Space Mono, Lora)

## Design System

### Color Palette
- Background: Off-white `#fbfbfb`
- Text: Soft charcoal `#333`
- Accents: Muted forest green, soft slate

### Typography Hierarchy
| Use Case | Font | Purpose |
|----------|------|---------|
| Display/Code | `Space Mono` | Headers, metadata, UI elements |
| Body/Narrative | `Lora` (Serif) | Quotes, biographical text |
| UI | `Inter` | Functional readability |

## Component Patterns

### Key Components
- `AsciiHero.tsx` - Typographic hero with ASCII art decoration and "System Ready" status
- `AboutTerminal.tsx` - Stylized terminal window with Q&A format (`user@portfolio:~$ cat interests.txt`)
- `QuoteTicker.tsx` - Infinite scrolling motivational banner
- `ProjectSection.tsx` - Minimalist cards with ASCII icons
- `InspirationSection.tsx` - Mentor tribute with grayscale-to-color hover effects

### Animation Conventions
- Use `framer-motion` for entry animations
- Prefer gentle, "breathing" motion - no jarring transitions
- Hover states should be slow and deliberate
- Infinite tickers for decorative text elements

### Styling Conventions
- Apply SVG noise/grain texture overlay to prevent "flat" appearance
- Use glassmorphism for hover captions
- Maintain terminal aesthetic in buttons ("View Source" style)

## Development Notes

> **Note**: This codebase was originally created by Replit Agent (Gemini 3.0 Pro). When extending, maintain the established "Soft Digital" aesthetic balance.
