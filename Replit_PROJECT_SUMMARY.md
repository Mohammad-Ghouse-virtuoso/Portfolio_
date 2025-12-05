# Project Summary: Portfolio Aesthetic Implementation

## Design Direction: "Soft Digital"
We moved away from the harsh "hacker" aesthetic (bright green on black) to a more refined, "new age" digital craft style. The goal was to blend the precision of code (ASCII, monospaced fonts) with the warmth of humanism (serif fonts, soft colors, grain textures).

### 1. Visual Language & Design System
- **Palette**: Warm, paper-like off-white background (`#fbfbfb`) with soft charcoal text (`#333`). Accents in muted forest green and soft slate.
- **Typography Pairing**:
  - **Display/Code**: `Space Mono` - For headers, metadata, and UI elements.
  - **Body/Narrative**: `Lora` (Serif) - For quotes and biographical text to add warmth.
  - **UI**: `Inter` - For functional readability.
- **Texture**: A subtle SVG noise/film grain overlay was applied to the `<body>` to prevent the site from looking "flat" or plastic.
- **Motion**: Gentle entry animations (`framer-motion`), infinite tickers, and slow hover states to create a "breathing" interface.

### 2. Component Architecture

#### `AsciiHero.tsx`
- A typographic hero section using structural ASCII art as decoration.
- "System Ready" status indicators.
- Responsive layout that balances the large name display with a delicate ASCII box.

#### `AboutTerminal.tsx`
- A stylized, non-functional terminal window.
- Uses a "question & answer" format (`user@portfolio:~$ cat interests.txt`) to display bio information in a playful, tech-native way without being overwhelming.

#### `QuoteTicker.tsx`
- An infinite scrolling banner displaying the Swami Vivekananda quote: *"ARISE, AWAKE, AND STOP NOT TILL THE GOAL IS REACHED."*
- Acts as a visual separator between sections.

#### `ProjectSection.tsx`
- Minimalist cards for **Cookie Gallery**, **EventiFy**, and **CRNN**.
- Each card features a unique, small ASCII icon representing the project type.
- "View Source" buttons that maintain the terminal aesthetic.

#### `InspirationSection.tsx`
- A tribute section for mentors and books.
- **Interaction**: Images (Swami Vivekananda, Psycho-Cybernetics) start in grayscale and fade to color on hover.
- Captions appear on hover with a glassmorphism effect.

### 3. Technical Stack
- **Framework**: React + Vite
- **Styling**: Tailwind CSS v4 (using `@theme` variables)
- **Animation**: Framer Motion
- **Fonts**: Google Fonts (Inter, Space Mono, Lora)
- **Routing**: Wouter

---

## AI Model Information
**Architect & Developer**: Replit Agent
**Model**: Gemini 3.0 Pro Preview Production

> "I exist at the intersection of logic and aesthetics."
