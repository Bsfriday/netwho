import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Info,
} from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { TopBannerAd } from '@/components/TopBannerAd'

export const Route = createFileRoute('/vpn-checker')({
  head: () => ({
    meta: [
      { title: 'VPN & Proxy Detector – Check If Your VPN Is Working | NetWho' },
      {
        name: 'description',
        content:
          'Instantly detect if your IP is flagged as a VPN, proxy, or Tor exit node. Get a security score and risk level assessment for your current connection.',
      },
    ],
  }),
  component: VpnChecker,
})

interface VpnData {
  ip: string
  proxy: boolean
  hosting: boolean
  vpnDetected: boolean
  score: number
  riskLevel: string
  riskFactors: string[]
  isp: string
  country: string
  city: string
}

function ScoreBar({ score, riskLevel }: { score: number; riskLevel: string }) {
  const colorMap: Record<string, string> = {
    'Low Risk': '#00ff88',
    'Medium Risk': '#ff9f00',
    'High Risk': '#ff6b35',
    Dangerous: '#ff2d55',
  }
  const color = colorMap[riskLevel] || '#00d4ff'

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-[#8b9ec7]">Security Score</span>
        <span className="text-2xl font-bold" style={{ color }}>
          {score}/100
        </span>
      </div>
      <div className="h-4 rounded-full bg-[rgba(255,255,255,0.07)] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: `${score}%`,
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            boxShadow: `0 0 12px ${color}66`,
          }}
        />
      </div>
      <div className="flex justify-between text-xs text-[#4a5c7a] mt-1">
        <span>Dangerous</span>
        <span>High</span>
        <span>Medium</span>
        <span>Low Risk</span>
      </div>
    </div>
  )
}

export default function VpnChecker() {
  const [data, setData] = useState<VpnData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/ip')
      if (!res.ok) throw new Error('Request failed')
      const json = await res.json()
      setData(json)
    } catch {
      setError('Could not perform VPN check. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const riskColorMap: Record<string, string> = {
    'Low Risk': '#00ff88',
    'Medium Risk': '#ff9f00',
    'High Risk': '#ff6b35',
    Dangerous: '#ff2d55',
  }
  const riskColor = data ? (riskColorMap[data.riskLevel] || '#00d4ff') : '#00d4ff'

  return (
    <div className="page-transition p-4 lg:p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-white">
          VPN / Proxy <span className="neon-text">Checker</span>
        </h1>
        <p className="text-[#8b9ec7] text-sm mt-1">
          Instantly detect if your connection is routed through a VPN, proxy, or datacenter IP.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 rounded-xl bg-[#ff2d5515] border border-[#ff2d5540] text-[#ff2d55] flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          {error}
          <button onClick={fetchData} className="ml-auto text-sm underline">Retry</button>
        </div>
      )}

      {/* Result card */}
      <div className="glass-card p-6 mb-5">
        {loading ? (
          <div className="flex flex-col gap-4">
            <div className="h-8 w-48 rounded shimmer" />
            <div className="h-16 rounded-xl shimmer" />
            <div className="h-4 rounded shimmer" />
          </div>
        ) : data ? (
          <div className="flex flex-col gap-6">
            {/* Main verdict */}
            <div
              className={`rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 ${
                data.vpnDetected
                  ? 'bg-[#ff2d5512] border border-[#ff2d5540]'
                  : 'bg-[#00ff8812] border border-[#00ff8840]'
              }`}
            >
              {data.vpnDetected ? (
                <ShieldAlert className="w-16 h-16 text-[#ff2d55] flex-shrink-0" />
              ) : (
                <ShieldCheck className="w-16 h-16 text-[#00ff88] flex-shrink-0" />
              )}
              <div className="text-center sm:text-left">
                <p className={`text-2xl font-bold ${data.vpnDetected ? 'text-[#ff2d55]' : 'text-[#00ff88]'}`}>
                  {data.vpnDetected ? 'VPN / Proxy Detected' : 'No VPN or Proxy Detected'}
                </p>
                <p className="text-[#8b9ec7] mt-2 text-sm">
                  IP: <span className="font-mono text-white">{data.ip}</span>
                  {' · '}{data.isp}
                  {' · '}{data.city}, {data.country}
                </p>
                {data.vpnDetected && (
                  <p className="text-[#ff9f00] text-sm mt-2 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    Your real location may be hidden from websites you visit.
                  </p>
                )}
              </div>
            </div>

            {/* Score bar */}
            <ScoreBar score={data.score} riskLevel={data.riskLevel} />

            {/* Detection results */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'HTTP Proxy', detected: data.proxy },
                { label: 'Datacenter / VPN Hosting', detected: data.hosting },
                { label: 'VPN Active', detected: data.vpnDetected },
              ].map(({ label, detected }) => (
                <div
                  key={label}
                  className={`rounded-xl p-4 text-center ${
                    detected
                      ? 'bg-[#ff2d5510] border border-[#ff2d5530]'
                      : 'bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)]'
                  }`}
                >
                  <div className="mb-2">
                    {detected ? (
                      <ShieldAlert className="w-6 h-6 text-[#ff2d55] mx-auto" />
                    ) : (
                      <CheckCircle className="w-6 h-6 text-[#00ff88] mx-auto" />
                    )}
                  </div>
                  <p className="text-xs text-[#8b9ec7] mb-1">{label}</p>
                  <p
                    className={`text-sm font-bold ${
                      detected ? 'text-[#ff2d55]' : 'text-[#00ff88]'
                    }`}
                  >
                    {detected ? 'DETECTED' : 'NOT DETECTED'}
                  </p>
                </div>
              ))}
            </div>

            {/* Risk factors */}
            {data.riskFactors.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-[#8b9ec7] mb-2">Risk Factors</h3>
                {data.riskFactors.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-[#ff9f00] mb-1.5">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={fetchData}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.3)] text-[#00d4ff] text-sm font-medium hover:bg-[rgba(0,212,255,0.15)] transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Re-check
              </button>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white text-sm font-medium hover:bg-[rgba(255,255,255,0.08)] transition-colors"
              >
                <Shield className="w-4 h-4" />
                Full IP Dashboard
              </Link>
            </div>
          </div>
        ) : null}
      </div>

      {/* Ad */}
      <TopBannerAd />

      {/* SEO explanation */}
      <div className="glass-card p-6 seo-content">
        <h2>How VPN and Proxy Detection Works</h2>
        <p>
          When you connect to the internet, your IP address is publicly visible to every website and service you access. VPN detection works by cross-referencing your IP address against databases of known VPN provider IP ranges, proxy servers, and datacenter hosting environments.
        </p>
        <h3>What We Check</h3>
        <ul>
          <li><strong>HTTP Proxy Detection:</strong> Identifies forwarded headers and known proxy IP ranges used by HTTP proxies.</li>
          <li><strong>Datacenter / Hosting IP Detection:</strong> Compares your IP against known cloud provider, VPN provider, and datacenter AS (Autonomous System) numbers. Consumer ISPs allocate IPs in residential blocks, while VPN providers use datacenters.</li>
          <li><strong>IP Reputation Score:</strong> Aggregates signals from multiple sources to produce a 0–100 security score.</li>
        </ul>
        <h3>Why Websites Detect VPN Usage</h3>
        <p>
          Streaming platforms like Netflix, Hulu, and Disney+ use VPN detection to enforce geographic content licensing. Banks and financial institutions flag VPN connections as potential fraud indicators. E-commerce sites use it to prevent price manipulation across regions.
        </p>
        <h3>Limitations of VPN Detection</h3>
        <p>
          No detection method is 100% accurate. Some residential VPN services route traffic through home IP addresses, making detection significantly harder. Detection accuracy depends on how frequently VPN provider IP ranges are updated in threat intelligence databases.
        </p>
        <div className="mt-4 p-4 rounded-xl bg-[rgba(0,212,255,0.05)] border border-[rgba(0,212,255,0.15)] flex gap-3">
          <Info className="w-5 h-5 text-[#00d4ff] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-[#8b9ec7]">
              Want to learn more about VPNs and how they work?{' '}
              <Link to="/vpn-explained" className="text-[#00d4ff]">
                Read our complete VPN guide →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
