# AGENTS.md — NetWho Project Architecture

This document provides an overview of the NetWho project for developers and AI agents working on this codebase.

## Project Overview

NetWho is an IP intelligence and network analysis platform with two purposes:
1. **Functional tools** – IP dashboard, VPN checker, speed test, DNS leak test
2. **SEO content platform** – Long-form guides optimized for search ranking and ad monetization

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | TanStack Start 1.x (SSR + client hydration) |
| Router | TanStack Router v1 (file-based routing) |
| Frontend | React 19, Vite 7 |
| Styling | Tailwind CSS 4 (utility-first) |
| Icons | Lucide React |
| Language | TypeScript 5.7 (strict mode) |
| Deployment | Netlify (serverless) |

## Directory Structure

```
src/
├── routes/
│   ├── __root.tsx               # Root layout: dark sidebar, ad slots, HTML shell
│   ├── index.tsx                # Redirects → /dashboard
│   ├── api.ip.ts                # GET /api/ip — IP intelligence server route
│   ├── dashboard.tsx            # IP Dashboard (main tool)
│   ├── vpn-checker.tsx          # VPN/Proxy Checker
│   ├── speed-test.tsx           # Speed Test
│   ├── dns-leak.tsx             # DNS Leak Test
│   ├── what-is-ip-address.tsx   # SEO guide
│   ├── vpn-explained.tsx        # SEO guide
│   ├── dns-leak-explained.tsx   # SEO guide
│   ├── internet-speed-guide.tsx # SEO guide
│   └── online-privacy-guide.tsx # SEO guide
├── styles.css                   # Tailwind + dark cyber CSS variables + custom classes
└── router.tsx                   # Router setup
```

## Key Architecture Decisions

### File-Based Routing (TanStack Router)
Routes are defined by file names in `src/routes/`. Dot notation creates nested paths: `api.ip.ts` → `/api/ip`. Double-underscore prefix (`__root.tsx`) denotes the root route.

### API Route Pattern (`api.ip.ts`)
The IP intelligence endpoint uses TanStack Start's `server.handlers.GET` property on `createFileRoute`. It:
1. Extracts real client IP from `x-nf-client-connection-ip` (Netlify) or standard forwarding headers
2. Calls ip-api.com free API — includes `zip` field (postal code) — CRITICAL requirement
3. Falls back to ipinfo.io → OpenStreetMap Nominatim reverse geocoding if ZIP missing
4. Computes an IP Score (0–100) from proxy/hosting/country signals
5. Parses browser/OS/device from User-Agent header server-side

### Root Layout (`__root.tsx`)
- `shellComponent` = HTML shell (html/head/body)
- `component` = full layout with sidebar + `<Outlet />` for child routes
- Ad slots in layout: top banner (728×90) and bottom sticky (728×60)
- `useLocation()` drives active link highlighting in sidebar

### IP Score Algorithm
- Base: 100; HTTP proxy: -50; Datacenter hosting: -25; High-risk country: -10
- Ranges: ≥75 = Low Risk | ≥45 = Medium | ≥15 = High | <15 = Dangerous

### Ad Slot System
`.ad-slot` CSS class marks ad placements. Replace inner content with AdSense `<ins>`, Monetag, or Adsterra scripts. Placements: top banner (root layout), content ad (tool pages), sidebar 300×250 (dashboard), bottom sticky (root layout).

### SEO Page Structure
All SEO pages use: `head()` meta → breadcrumb → `<div className="seo-content">` → H1/H2/H3/p/ul/ol → CTA boxes → FAQ accordion → internal links section.

## Conventions

### Naming
- Route files: kebab-case matching URL path
- Components: PascalCase
- CSS: lowercase kebab-case or Tailwind utilities

### Styling
- Dark cyber theme: `--bg-primary: #070b14`, `--neon-blue: #00d4ff`
- Glassmorphism: `.glass-card` (blur backdrop + semi-transparent border)
- Neon effects: `.neon-text`, `.neon-border` CSS classes
- Loading states: `.shimmer` animation class

### IP Data Sources (Priority Order)
1. ip-api.com — primary, returns `zip` field directly
2. ipinfo.io — fallback for postal code
3. OpenStreetMap Nominatim — last resort ZIP via lat/lon reverse geocoding
4. "Not Available" — only if all three fail

**NEVER remove the ZIP/postal code field from the API response or UI.**

## Common Modification Patterns

### Adding a New Tool Page
1. Create `src/routes/my-tool.tsx` with `createFileRoute('/my-tool')({...})`
2. Add to `toolLinks` in `__root.tsx` sidebar
3. Update README.md route table

### Extending the IP API
Edit `src/routes/api.ip.ts`. The `computeIpScore` and `parseUserAgent` functions are pure helpers at the bottom of the file. ip-api.com field list is controlled by the `fields` query parameter.
