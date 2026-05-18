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
import { BottomStickyAd } from '@/components/BottomStickyAd'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'NetWho – IP & Network Intelligence Tool | Check Your IP, VPN, DNS' },
      {
        name: 'description',
        content:
          'NetWho is a free IP intelligence platform. Check your IP address, detect VPN/proxy usage, run speed tests, and test for DNS leaks. Protect your online privacy.',
      },
      { name: 'google-adsense-account', content: 'ca-pub-5740499104150490' },
      { name: 'theme-color', content: '#070b14' },
      { name: 'monetag', content: '3c61f7f1e03424366ce1b1aac1ef9443' },
    ],
    links: [{ rel: 'icon', href: '/favicon.ico' }],
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
    <div className="flex h-screen bg-[#070b14] cyber-grid overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 flex-col flex-shrink-0 bg-[#0a1020] border-r border-[rgba(0,212,255,0.12)]">
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative w-72 h-full bg-[#0a1020] border-r border-[rgba(0,212,255,0.2)] flex flex-col">
            <Sidebar onClose={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-[#0a1020] border-b border-[rgba(0,212,255,0.12)]">
          <button
            onClick={() => setMobileOpen(true)}
            className="text-gray-400 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#0066ff] flex items-center justify-center">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg">
              Net<span className="neon-text">Who</span>
            </span>
          </Link>
        </div>

        {/* Top banner ad */}
        <TopBannerAd />

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>

        {/* Bottom sticky ad */}
        <BottomStickyAd />
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
