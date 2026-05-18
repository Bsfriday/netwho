import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import {
  Globe,
  MapPin,
  Wifi,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Clock,
  Monitor,
  Smartphone,
  Tablet,
  Server,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Copy,
  Check,
} from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { SidebarAd } from '~/components/SidebarAd'

export const Route = createFileRoute('/dashboard')({
  head: () => ({
    meta: [
      { title: 'My IP Address & Network Intelligence | NetWho Dashboard' },
      {
        name: 'description',
        content:
          'Instantly check your public IP address, location, ISP, ZIP code, VPN/proxy status, and security score. Real-time network intelligence dashboard.',
      },
    ],
  }),
  component: Dashboard,
})

interface IpData {
  ip: string
  country: string
  countryCode: string
  region: string
  city: string
  zip: string
  timezone: string
  isp: string
  org: string
  asn: string
  proxy: boolean
  hosting: boolean
  vpnDetected: boolean
  score: number
  riskLevel: string
  riskFactors: string[]
  device: {
    browser: string
    os: string
    device: string
  }
  error?: string
}

function ScoreGauge({ score, riskLevel }: { score: number; riskLevel: string }) {
  const radius = 70
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  const colorMap: Record<string, string> = {
    'Low Risk': '#00ff88',
    'Medium Risk': '#ff9f00',
    'High Risk': '#ff6b35',
    Dangerous: '#ff2d55',
  }
  const color = colorMap[riskLevel] || '#00d4ff'

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-44 h-44">
        <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
          <circle cx="80" cy="80" r={radius} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="12" />
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1.5s ease', filter: `drop-shadow(0 0 8px ${color})` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold" style={{ color }}>{score}</span>
          <span className="text-xs text-gray-400 uppercase tracking-wider mt-1">IP Score</span>
        </div>
      </div>
      <div
        className="px-4 py-2 rounded-full text-sm font-semibold"
        style={{
          background: `${color}22`,
          color,
          border: `1px solid ${color}44`,
          boxShadow: `0 0 12px ${color}33`,
        }}
      >
        {riskLevel}
      </div>
    </div>
  )
}

function InfoRow({
  label,
  value,
  icon: Icon,
  highlight,
  badge,
}: {
  label: string
  value: string
  icon?: React.ElementType
  highlight?: boolean
  badge?: React.ReactNode
}) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center justify-between py-3 border-b border-[rgba(255,255,255,0.05)] last:border-0 group">
      <div className="flex items-center gap-2 text-sm text-[#8b9ec7] min-w-[130px]">
        {Icon && <Icon className="w-3.5 h-3.5 opacity-70" />}
        <span>{label}</span>
      </div>
      <div className="flex items-center gap-2 flex-1 justify-end">
        {badge}
        <span
          className={`text-sm font-mono text-right ${highlight ? 'text-[#00d4ff] font-semibold text-base' : 'text-white'}`}
        >
          {value}
        </span>
        {value !== 'Not Available' && value !== 'Unknown' && (
          <button
            onClick={copy}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-[#00d4ff]"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>
    </div>
  )
}

function SkeletonRow() {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[rgba(255,255,255,0.05)]">
      <div className="w-24 h-4 rounded shimmer" />
      <div className="w-36 h-4 rounded shimmer" />
    </div>
  )
}

function DeviceIcon({ device }: { device: string }) {
  if (device === 'Mobile') return <Smartphone className="w-4 h-4" />
  if (device === 'Tablet') return <Tablet className="w-4 h-4" />
  return <Monitor className="w-4 h-4" />
}

export default function Dashboard() {
  const [data, setData] = useState<IpData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [screenRes, setScreenRes] = useState('')

  useEffect(() => {
    setScreenRes(`${window.screen.width}×${window.screen.height}`)
    fetchIpData()
  }, [])

  async function fetchIpData() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/ip')
      if (!res.ok) throw new Error('Failed to fetch IP data')
      const json = await res.json()
      setData(json)
    } catch (err) {
      setError('Could not load IP data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const vpnBadge = data ? (
    data.vpnDetected ? (
      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#ff2d5520] text-[#ff2d55] border border-[#ff2d5540]">
        <ShieldAlert className="w-3 h-3" /> VPN/Proxy
      </span>
    ) : (
      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#00ff8820] text-[#00ff88] border border-[#00ff8840]">
        <ShieldCheck className="w-3 h-3" /> Clean IP
      </span>
    )
  ) : null

  return (
    <div className="page-transition p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-white">
          IP Intelligence <span className="neon-text">Dashboard</span>
        </h1>
        <p className="text-[#8b9ec7] text-sm mt-1">
          Real-time analysis of your IP address, location, ISP, and security profile.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 rounded-xl bg-[#ff2d5515] border border-[#ff2d5540] text-[#ff2d55] flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
          <button onClick={fetchIpData} className="ml-auto text-sm underline hover:no-underline">
            Retry
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: Score + VPN status */}
        <div className="xl:col-span-1 flex flex-col gap-4">
          {/* Score Card */}
          <div className="glass-card p-6 flex flex-col items-center gap-4">
            <div className="text-center mb-2">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#8b9ec7]">
                Internet IP Score
              </h2>
            </div>
            {loading ? (
              <div className="w-44 h-44 rounded-full shimmer" />
            ) : data ? (
              <ScoreGauge score={data.score} riskLevel={data.riskLevel} />
            ) : null}
            {data && data.riskFactors.length > 0 && (
              <div className="w-full mt-2">
                <p className="text-xs text-[#8b9ec7] mb-2 font-medium">Risk Factors Detected:</p>
                {data.riskFactors.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-xs text-[#ff9f00] mb-1">
                    <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            )}
            {data && data.riskFactors.length === 0 && (
              <div className="flex items-center gap-2 text-xs text-[#00ff88]">
                <CheckCircle className="w-3.5 h-3.5" />
                No risk factors detected
              </div>
            )}
          </div>

          {/* VPN Detection */}
          <div className="glass-card p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#8b9ec7] mb-4">
              VPN / Proxy Detection
            </h2>
            {loading ? (
              <div className="h-16 rounded shimmer" />
            ) : data ? (
              <div
                className={`rounded-xl p-4 flex items-center gap-4 ${
                  data.vpnDetected
                    ? 'bg-[#ff2d5515] border border-[#ff2d5540]'
                    : 'bg-[#00ff8815] border border-[#00ff8840]'
                }`}
              >
                {data.vpnDetected ? (
                  <ShieldAlert className="w-8 h-8 text-[#ff2d55] flex-shrink-0" />
                ) : (
                  <ShieldCheck className="w-8 h-8 text-[#00ff88] flex-shrink-0" />
                )}
                <div>
                  <p className={`font-bold ${data.vpnDetected ? 'text-[#ff2d55]' : 'text-[#00ff88]'}`}>
                    {data.vpnDetected ? 'VPN / Proxy Detected' : 'No VPN / Proxy'}
                  </p>
                  <p className="text-xs text-[#8b9ec7] mt-0.5">
                    {data.proxy && 'HTTP Proxy active. '}
                    {data.hosting && 'Datacenter hosting IP detected. '}
                    {!data.vpnDetected && 'Your connection appears direct.'}
                  </p>
                </div>
              </div>
            ) : null}
            <Link
              to="/vpn-checker"
              className="mt-3 block text-center text-xs text-[#00d4ff] hover:underline"
            >
              Run full VPN security check →
            </Link>
          </div>

          {/* Sidebar ad */}
          <SidebarAd />
        </div>

        {/* Right: IP Details */}
        <div className="xl:col-span-2 flex flex-col gap-4">
          {/* Network Info Card */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#8b9ec7]">
                Network Information
              </h2>
              <button
                onClick={fetchIpData}
                disabled={loading}
                className="flex items-center gap-1.5 text-xs text-[#8b9ec7] hover:text-[#00d4ff] transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)
            ) : data ? (
              <>
                <InfoRow label="IP Address" value={data.ip} icon={Globe} highlight />
                <InfoRow label="Country" value={`${data.country} (${data.countryCode})`} icon={Globe} />
                <InfoRow label="City" value={data.city} icon={MapPin} />
                <InfoRow label="Region / State" value={data.region} icon={MapPin} />
                <InfoRow
                  label="ZIP / Postal Code"
                  value={data.zip}
                  icon={MapPin}
                  highlight={data.zip !== 'Not Available'}
                />
                <InfoRow label="Timezone" value={data.timezone} icon={Clock} />
                <InfoRow label="ISP" value={data.isp} icon={Wifi} />
                <InfoRow label="Organization" value={data.org} icon={Server} />
                <InfoRow label="ASN" value={data.asn} icon={Server} />
                <InfoRow label="VPN / Proxy" value={data.vpnDetected ? 'YES — Detected' : 'NO — Not Detected'} icon={Shield} badge={vpnBadge} />
              </>
            ) : null}
          </div>

          {/* Device & Browser Info */}
          <div className="glass-card p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#8b9ec7] mb-4">
              Device & Browser Information
            </h2>
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)
            ) : data ? (
              <>
                <InfoRow
                  label="Browser"
                  value={data.device.browser}
                  icon={Monitor}
                />
                <InfoRow
                  label="Operating System"
                  value={data.device.os}
                  icon={Monitor}
                />
                <InfoRow
                  label="Device Type"
                  value={data.device.device}
                  icon={() => <DeviceIcon device={data.device.device} />}
                />
                <InfoRow
                  label="Screen Resolution"
                  value={screenRes || 'Detecting...'}
                  icon={Monitor}
                />
              </>
            ) : null}
          </div>

          {/* Quick links to other tools */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { to: '/vpn-checker', label: 'VPN Security Check', icon: Shield, color: '#0066ff' },
              { to: '/speed-test', label: 'Speed Test', icon: () => <span className="text-base">⚡</span>, color: '#ff9f00' },
              { to: '/dns-leak', label: 'DNS Leak Test', icon: Wifi, color: '#00ff88' },
            ].map(({ to, label, icon: Icon, color }) => (
              <Link
                key={to}
                to={to}
                className="glass-card p-4 flex items-center gap-3 hover:border-[rgba(0,212,255,0.4)] transition-all"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: `${color}22`, color }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-white">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* SEO section */}
      <div className="mt-8 glass-card p-6">
        <h2 className="text-lg font-semibold text-white mb-2">
          What Does Your IP Address Reveal?
        </h2>
        <p className="text-[#8b9ec7] text-sm leading-relaxed">
          Your IP address is a unique identifier assigned by your Internet Service Provider (ISP) that reveals your approximate geographic location, including country, city, region, and in many cases your ZIP or postal code. Every website you visit can see this information. Websites also detect your browser, operating system, and device type through a combination of your IP and user-agent string. NetWho's dashboard shows you exactly what others see when you connect to the internet — empowering you to make informed decisions about your online privacy.
        </p>
        <div className="mt-3 flex gap-3 flex-wrap">
          <Link to="/what-is-ip-address" className="text-xs text-[#00d4ff] hover:underline">
            Learn more about IP addresses →
          </Link>
          <Link to="/online-privacy-guide" className="text-xs text-[#00d4ff] hover:underline">
            Online privacy guide →
          </Link>
        </div>
      </div>
    </div>
  )
}
