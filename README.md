# Garage Rescue — Client Website

> A production marketing website built for **Garage Rescue**, an Ottawa-based garage cleaning and organization service. Designed and developed end-to-end from brand identity to live deployment.

**Live:** [thegaragerescue.ca](https://thegaragerescue.ca) · [thegaragerescue.com](https://thegaragerescue.com)

---

## Overview

Garage Rescue needed a modern, mobile-first website to attract new customers, showcase their service packages, and convert visitors into leads through an integrated contact form. This project covers everything from initial design system setup to serverless API deployment on Vercel.

---

## Features

- **Responsive, mobile-first design** — built with Tailwind CSS v4 using a custom brand design system
- **Scroll animations** — lightweight Intersection Observer–based reveal animations, no heavy libraries
- **Pricing tiers** — Bronze, Silver, and Gold packages with full service breakdowns and per-size pricing
- **Smart contact form** — selecting a package from the pricing section auto-fills the contact form
- **Email integration** — transactional emails via [Resend](https://resend.com); sends both an internal team notification and a customer confirmation
- **Rate limiting** — server-side rate limiting (3 requests / 10 min per IP) to prevent form abuse
- **WCAG accessibility** — ARIA labels, roles, semantic HTML, and contrast ratios audited throughout
- **Custom domain** — deployed to Vercel with custom `.ca` and `.com` domains

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui + Headless UI |
| Icons | React Icons + Heroicons |
| Email | Resend |
| API | Vercel Serverless Functions |
| Hosting | Vercel |
| Font | Geist Variable |

---

## Project Structure

```
├── api/
│   └── contact.ts          # Vercel serverless function — email handler
├── server/
│   └── contact.ts          # Express version for local dev
│   └── index.ts            # Express server entry point
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Pricing.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── hooks/
│   │   └── useScrollReveal.ts
│   └── index.css           # Design tokens + animations
├── public/
│   ├── gr-logo.png
│   └── hero.svg
└── vercel.json
```

---

## Local Development

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Terminal 1 — Vite frontend (http://localhost:5173)
npm run dev

# Terminal 2 — Express API server (http://localhost:3001)
npm run dev:server
```

Create a `.env` file at the root:

```env
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your@email.com
PORT=3001
```

---

## Deployment

Deployed via **Vercel** with automatic GitHub integration. Every push to `main` triggers a production deploy.

Environment variables are configured in the Vercel dashboard under **Settings → Environment Variables**.

---

## Design System

Brand colors defined as CSS custom properties and registered as Tailwind utilities:

| Token | Hex | Usage |
|---|---|---|
| `brand-black` | `#231f20` | Primary text, backgrounds |
| `brand-white` | `#f1f1f1` | Off-white backgrounds |
| `brand-fff` | `#ffffff` | Pure white surfaces |
| `brand-green` | `#8dc63f` | Primary accent, CTAs |
| `brand-grey` | `#59595b` | Secondary text |

---

## Author

**Brodie Lewis** — [brodielewis.com](https://brodielewis.com) · [LinkedIn](https://linkedin.com/in/placeholder)
