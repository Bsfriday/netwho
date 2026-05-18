import { createRootRoute, Outlet, Link, useLocation, HeadContent, Scripts } from '@tanstack/react-router'
import {
  Globe,
  MapPin,
  Shield,
  Zap,
  Wifi,
  BookOpen,
  Lock,
  Server,
  Gauge,
  Eye,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'
import '../styles.css'
import { TopBannerAd } from '@/components/TopBannerAd'
import { PwaInstallButton } from '@/components/PwaInstallButton'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      { title: 'NetWho – IP & Network Intelligence Tool | Check Your IP, VPN, DNS' },
      {
        name: 'description',
        content:
          'NetWho is a free IP intelligence platform. Check your IP address, detect VPN/proxy usage, run speed tests, and test for DNS leaks. Protect your online privacy.',
      },
      { name: 'application-name', content: 'NetWho' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      { name: 'google-adsense-account', content: 'ca-pub-5740499104150490' },
      { name: 'theme-color', content: '#070b14' },
      { name: 'monetag', content: '3c61f7f1e03424366ce1b1aac1ef9443' },
    ],
    links: [
      { rel: 'icon', href: '/netwho-icon.svg?v=2' },
      { rel: 'manifest', href: '/manifest.webmanifest?v=2' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png?v=2' },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
})

const toolLinks = [
  { to: '/dashboard', label: 'IP Dashboard', icon: Globe },
  { to: '/vpn-checker', label: 'VPN Checker', icon: Shield },
  { to: '/speed-test', label: 'Speed Test', icon: Zap },
  { to: '/dns-leak', label: 'DNS Leak Test', icon: Wifi },
  { to: '/location-generator', label: 'Location Generator', icon: MapPin },
]

const seoLinks = [
  { to: '/what-is-ip-address', label: 'What is an IP?', icon: BookOpen },
  { to: '/vpn-explained', label: 'VPN Explained', icon: Lock },
  { to: '/dns-leak-explained', label: 'DNS Leak Explained', icon: Server },
  { to: '/internet-speed-guide', label: 'Speed Test Guide', icon: Gauge },
  { to: '/online-privacy-guide', label: 'Privacy Guide', icon: Eye },
]

function Sidebar({ onClose }: { onClose?: () => void }) {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-[rgba(0,212,255,0.15)]">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#0066ff] flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-white">Net</span>
            <span className="neon-text">Who</span>
          </span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Live indicator */}
      <div className="mx-4 my-3 px-3 py-2 rounded-lg bg-[rgba(0,255,136,0.08)] border border-[rgba(0,255,136,0.2)] flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#00ff88] pulse-neon"></span>
        <span className="text-xs text-[#00ff88] font-medium">Network Monitor Active</span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-2">
        {/* Tools */}
        <div className="mb-2">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#4a5c7a] px-3 mb-2 mt-2">
            Tools
          </p>
          {toolLinks.map(({ to, label, icon: Icon }) => {
            const active = currentPath === to || (to !== '/' && currentPath.startsWith(to))
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-all duration-150 ${
                  active
                    ? 'bg-[rgba(0,212,255,0.1)] text-[#00d4ff] border-l-[3px] border-[#00d4ff] pl-[9px]'
                    : 'text-[#8b9ec7] hover:bg-[rgba(255,255,255,0.04)] hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
              </Link>
            )
          })}
        </div>

        {/* Resources */}
        <div className="mt-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#4a5c7a] px-3 mb-2">
            Guides
          </p>
          {seoLinks.map(({ to, label, icon: Icon }) => {
            const active = currentPath === to
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-all duration-150 ${
                  active
                    ? 'bg-[rgba(0,212,255,0.1)] text-[#00d4ff] border-l-[3px] border-[#00d4ff] pl-[9px]'
                    : 'text-[#8b9ec7] hover:bg-[rgba(255,255,255,0.04)] hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-[rgba(0,212,255,0.1)]">
        <p className="text-[11px] text-[#4a5c7a] text-center">
          © 2025 NetWho · IP Intelligence
        </p>
      </div>
    </div>
  )
}

function RootLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#070b14] cyber-grid overflow-x-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 flex-col flex-shrink-0 bg-[#0a1020] border-r border-[rgba(0,212,255,0.12)]">
        <Sidebar />
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile top bar */}
        <div className="lg:hidden bg-[#0a1020] border-b border-[rgba(0,212,255,0.12)]">
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#0066ff] flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg">
                Net<span className="neon-text">Who</span>
              </span>
            </Link>
            <button
              onClick={() => setMobileOpen((open) => !open)}
              className="text-gray-400 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
          <div
            className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${mobileOpen ? 'max-h-[600px] pb-4' : 'max-h-0'}`}
          >
            <nav className="flex flex-wrap gap-2 px-4 pt-2">
              {toolLinks.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex shrink-0 items-center gap-2 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-3 py-2 text-xs font-semibold text-[#cbd5e1] transition hover:border-[#00d4ff] hover:text-white"
                >
                  <Icon className="w-4 h-4 text-[#00d4ff]" />
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden px-4 py-4 lg:px-6 lg:py-6">
          <div className="space-y-4">
            <TopBannerAd />
            <div className="flex flex-col items-end gap-3">
              <PwaInstallButton />
            </div>
          </div>

          <main className="flex-1 overflow-auto mt-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5740499104150490"
          crossOrigin="anonymous"
        />      </head>
      <body>
        {children}
        <Scripts />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(s){\n  s.dataset.zone='11022255',\n  s.src='https://nap5k.com/tag.min.js'\n})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))"
          }}
        />
      </body>
    </html>
  )
}
