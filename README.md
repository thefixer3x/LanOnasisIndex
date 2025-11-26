# Lan Onasis

> Africa's leading AI-powered tech hub offering intelligent compliance, risk, and B2B payment solutions

This repository contains the official website and landing page for Lan Onasis, showcasing the VortexCore ecosystem—a modular platform providing enterprise-grade solutions across multiple sectors including Financial Services, SMEs, E-commerce, Education, Logistics, Real Estate, and Public Sector.

## 🚀 Quick Start

```bash
# Install dependencies (using Bun)
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## 📋 Prerequisites

- **Node.js** >= 18.0.0
- **Bun** >= 1.0.0 (recommended) or npm

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React 19 + TypeScript |
| **Build Tool** | Vite 7 |
| **Styling** | Tailwind CSS 3 |
| **Animations** | Framer Motion |
| **3D Graphics** | Three.js + Vanta.js |
| **Icons** | Lucide React |
| **Internationalization** | i18next + react-i18next |
| **SEO** | React Helmet Async |
| **Deployment** | Netlify |

## 🌍 Internationalization

The site supports multiple languages:
- English (en)
- Spanish (es)
- French (fr)
- German (de)
- Italian (it)
- Arabic (ar)

Translation management:
```bash
# Validate translations
bun run i18n:validate

# Check translation status
bun run i18n:check

# Generate missing translations
bun run i18n:generate
```

## 🏗️ Project Structure

```
src/
├── components/       # React components
│   ├── ui/          # Reusable UI components
│   ├── auth/        # Authentication components
│   └── blocks/      # Page sections
├── services/        # External service integrations
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
└── types/           # TypeScript type definitions
```

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server |
| `bun run build` | Build for production |
| `bun run preview` | Preview production build |
| `bun run lint` | Run ESLint |
| `bun run type-check` | Run TypeScript type checking |

## 🎨 Features

- **Progressive Web App (PWA)**: Offline support, installable on mobile and desktop
- **Responsive Design**: Mobile-first approach with full desktop support
- **Optimized Performance**: Code splitting, lazy loading, and asset optimization
- **SEO Ready**: Comprehensive meta tags, structured data, and sitemap
- **Accessible**: WCAG 2.1 compliant design
- **Modern UI**: Smooth animations and interactive 3D effects

## 🚢 Deployment

The application is automatically deployed to Netlify on push to the main branch. Build configuration is managed in `netlify.toml`.

**Live Site**: [www.lanonasis.com](https://www.lanonasis.com)

## 🤝 Contributing

This is a private repository for the Lan Onasis platform. For questions or support, contact the development team.

## 📄 License

MIT License

## 📧 Contact

- **Website**: [www.lanonasis.com](https://www.lanonasis.com)
- **Email**: info@lanonasis.com
- **Repository**: [github.com/thefixer3x/LanOnasisIndex](https://github.com/thefixer3x/LanOnasisIndex)