# NetWho – IP & Network Intelligence Platform

NetWho is a free, full-stack IP intelligence and network analysis tool built on TanStack Start and deployed on Netlify. It combines a real-time IP dashboard with SEO-optimized content pages, forming both a useful privacy tool and a high-traffic content platform.

## Features

### Tools
- **IP Dashboard** – Displays your public IP, country, city, region, ZIP/postal code, ISP, ASN, timezone, browser/OS/device info, VPN/proxy detection, and an IP Security Score (0–100)
- **VPN / Proxy Checker** – Detects HTTP proxies, datacenter hosting IPs, and VPN usage with a visual score gauge and risk level badge
- **Speed Test** – Animated download, upload, and ping latency test with quality ratings
- **DNS Leak Test** – Checks whether your VPN is leaking DNS queries to your ISP
- **Location Generator** – Creates realistic random countries, cities, states, postal codes, and full addresses for test data and SEO content

### SEO Content Pages
- What is an IP Address?
- VPN Explained
- DNS Leak Explained
- Internet Speed Guide
- Online Privacy Guide

### Monetization
Ad placement slots are included throughout the layout (top banner, middle content, sidebar, bottom sticky) ready for Google AdSense, Monetag, or Adsterra code.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | TanStack Start (React 19 + Vite 7) |
| Routing | TanStack Router v1 (file-based) |
| Styling | Tailwind CSS 4 (dark cyber theme, glassmorphism) |
| Icons | Lucide React |
| IP Data | ip-api.com (primary) + ipinfo.io + OpenStreetMap (ZIP fallbacks) |
| Deployment | Netlify (serverless) |

## Local Development

```bash
npm install
npm run dev        # Starts dev server on port 3000 (Netlify CLI on 8888)
npm run build      # Production build
```

## Routes

| Path | Description |
|------|-------------|
| `/dashboard` | Main IP intelligence dashboard |
| `/vpn-checker` | VPN/proxy detection tool |
| `/speed-test` | Internet speed test |
| `/dns-leak` | DNS leak detection |
| `/what-is-ip-address` | SEO guide |
| `/vpn-explained` | SEO guide |
| `/dns-leak-explained` | SEO guide |
| `/internet-speed-guide` | SEO guide |
| `/online-privacy-guide` | SEO guide |
| `/location-generator` | Location generator tool for random addresses, postal codes, and countries |
| `/api/ip` | JSON API endpoint returning full IP intelligence |

## API

**GET `/api/ip`** – Returns:
```json
{
  "ip": "203.0.113.42",
  "country": "United States",
  "countryCode": "US",
  "region": "Virginia",
  "city": "Ashburn",
  "zip": "20149",
  "timezone": "America/New_York",
  "isp": "Example ISP",
  "org": "AS15169 Google LLC",
  "asn": "AS15169",
  "vpnDetected": false,
  "score": 100,
  "riskLevel": "Low Risk",
  "riskFactors": [],
  "device": { "browser": "Chrome", "os": "Windows 10/11", "device": "Desktop" }
}
```

ZIP/postal code is always included — falls back through ipinfo.io and OpenStreetMap reverse geocoding if ip-api.com doesn't return it.

## Environment

No environment variables required for basic operation. The IP API calls use ip-api.com's free tier (server-side only, no key needed).
