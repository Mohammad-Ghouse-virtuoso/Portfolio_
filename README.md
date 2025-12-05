# Mohammad Ghouse — Portfolio

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)
![Tests](https://img.shields.io/badge/Tests-62%20passing-22C55E?logo=vitest&logoColor=white)

> *"One must imagine Sisyphus happy."* — Albert Camus

A dark, cinematic portfolio with an **Obsidian aesthetic** — blending neon accents, CRT glitch effects, and terminal-inspired UI. Built for developers who appreciate thoughtful design and clean code.

## ✨ Features

- **CRT Glitch Effect** — TV signal drop animation on name with multi-color hover states
- **Interactive Terminal** — macOS-style "About" section with command-line aesthetics  
- **Bento Grid Projects** — Cards with spotlight hover effects and detail modals
- **Inspiration Gallery** — Mentors & books with grayscale-to-color transitions
- **Contact Form** — Integrated with Web3Forms for email notifications
- **Infinite Quote Ticker** — Motivational quotes in continuous scroll
- **Framer Motion** — Smooth, deliberate animations throughout

## 🛠 Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | React 18 + TypeScript |
| **Build Tool** | Vite 6 |
| **Styling** | Tailwind CSS v4 (with `@theme` variables) |
| **Animation** | Framer Motion |
| **Routing** | Wouter |
| **Testing** | Vitest + React Testing Library (62 tests) |
| **Forms** | Web3Forms API |
| **Deployment** | Vercel |

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Mohammad-Ghouse-virtuoso/Portfolio_.git
cd Portfolio_

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your Web3Forms access key to .env

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── AsciiHero.tsx        # Hero with glitch effect
│   ├── AboutTerminal.tsx    # Terminal-style about section
│   ├── ProjectSection.tsx   # Bento grid projects
│   ├── ProjectModal.tsx     # Project detail overlay
│   ├── InspirationSection.tsx # Mentors & books gallery
│   ├── ContactForm.tsx      # Web3Forms integration
│   ├── QuoteTicker.tsx      # Infinite scroll banner
│   ├── SocialDock.tsx       # Floating social links
│   └── __tests__/           # Component tests
├── data/
│   └── portfolioData.ts     # Centralized content
├── hooks/
│   ├── useMagnetic.ts       # Magnetic cursor effect
│   └── useMousePosition.ts  # Mouse tracking
└── index.css                # Theme & animations
```

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--color-background` | `#050505` | Page background |
| `--color-surface` | `#0a0a0a` | Card backgrounds |
| `--color-accent-glow` | `#7C3AED` | Violet accent |
| `--color-accent-teal` | `#14B8A6` | Teal accent |
| `--color-text-muted` | `#A0A0A0` | Secondary text |

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests once (CI mode)
npm test -- --run

# Watch mode
npm test -- --watch
```

Coverage includes:
- Component rendering & interactions
- Modal open/close behavior  
- Form validation & submission
- Navigation & scroll behavior

## 📝 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_WEB3FORMS_ACCESS_KEY` | Web3Forms API key for contact form |

Get your free key at [web3forms.com](https://web3forms.com)

## 🌐 Deployment

Deployed on **Vercel** with automatic CI/CD on push to `main`.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Mohammad-Ghouse-virtuoso/Portfolio_)

## 🔗 Links

- **Live Site**: [mohammad-ghouse.site](https://mohammad-ghouse.site)
- **GitHub**: [@Mohammad-Ghouse-virtuoso](https://github.com/Mohammad-Ghouse-virtuoso)
- **LinkedIn**: [Mohammad Ghouse](https://linkedin.com/in/mohammad-ghouse)

---

<p align="center">
  <sub>Crafted with <code>&lt;code/&gt;</code> & ☕ at 3 am</sub><br>
  <sub>Hyderabad, India 🇮🇳</sub>
</p>

