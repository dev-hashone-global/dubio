# Dubio

Marketing website for [Dubio](https://www.dubio.ai) — an AI video dubbing platform that clones your voice and dubs content into 80+ languages while preserving tone, emotion, and identity.

Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, and shadcn/ui.

## Features

- **Landing page** (`/`) — hero with early-access signup, product overview, video demo, and platform highlights
- **Launch site** (`/launch`) — full marketing experience with pricing, use cases, blog, FAQ, about, contact, and legal pages
- **Early-access API** — waitlist signups via backend (`POST /early-access/signup`)
- **Contact form** — EmailJS-powered submissions on `/launch/contact`
- **Animated UI** — Framer Motion transitions, glassmorphism, and responsive layouts

## Tech stack

| Layer | Tools |
| --- | --- |
| Framework | Next.js 15, React 19, TypeScript |
| Styling | Tailwind CSS v4, shadcn/ui (New York) |
| Animation | Framer Motion |
| HTTP | Axios |
| Email | EmailJS (`@emailjs/browser`) |
| Icons | Lucide React |

## Project structure

```
src/
├── app/
│   ├── page.tsx              # Root landing page
│   ├── layout.tsx            # Root layout, fonts, metadata
│   └── launch/               # Launch marketing site
│       ├── page.tsx          # Launch homepage
│       ├── about/
│       ├── blog/
│       ├── contact/
│       ├── faq/
│       ├── pricing/
│       ├── use-cases/
│       └── legal/
├── components/
│   ├── landing/              # Original landing sections
│   ├── launch/               # Launch site sections & shared UI
│   └── ui/                   # shadcn/ui primitives
├── data/                     # Static content (FAQ, pricing, blog, legal)
└── lib/
    ├── apiClient.ts          # Axios instance
    └── utils.ts              # cn() and helpers
```

## Getting started

### Prerequisites

- Node.js 20+
- npm

### Install

```bash
npm install
```

### Environment variables

Copy the sample file and fill in your values:

```bash
cp .env.sample .env.local
```

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Client-side API base path (default: `/api/v1`) |
| `BACKEND_URL` | Backend origin used by Next.js rewrites |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service ID (contact form) |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS public key |

API requests to `/api/v1/*` are proxied to `${BACKEND_URL}/api/*` via `next.config.ts` rewrites.

See [EMAILJS_SETUP.md](./EMAILJS_SETUP.md) for EmailJS configuration details.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Turbopack is enabled by default.

### Production

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Routes

| Path | Description |
| --- | --- |
| `/` | Original landing page |
| `/launch` | Launch homepage |
| `/launch/about` | About Dubio |
| `/launch/pricing` | Pricing plans |
| `/launch/use-cases` | Use case overview |
| `/launch/use-cases/*` | Individual use case pages |
| `/launch/blog` | Blog index |
| `/launch/blog/[slug]` | Blog post |
| `/launch/faq` | FAQ |
| `/launch/contact` | Contact form |
| `/launch/legal/privacy` | Privacy policy |
| `/launch/legal/terms` | Terms of service |

## Design

- Dark theme with primary background `#0a0724`
- Fonts: Montserrat, Syne, Instrument Serif (Google Fonts)
- Remote images allowed from `img.youtube.com` for video thumbnails

## License

Private — all rights reserved.
