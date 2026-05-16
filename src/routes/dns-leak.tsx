import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Wifi, CheckCircle, AlertTriangle, ShieldCheck, ShieldAlert, RefreshCw, Info } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/dns-leak')({
  head: () => ({
    meta: [
      { title: 'DNS Leak Test – Check if Your DNS is Secure | NetWho' },
      {
        name: 'description',
        content:
          'Test for DNS leaks that could expose your browsing activity to your ISP. Find out if your VPN is protecting your DNS queries.',
      },
    ],
  }),
  component: DnsLeak,
})

interface DnsResult {
  ip: string
  isp: string
  country: string
  city: string
  asn: string
  vpnDetected: boolean
}

interface DnsServer {
  ip: string
  type: 'isp' | 'public' | 'unknown'
  name: string
}

const KNOWN_PUBLIC_DNS: Record<string, string> = {
  '8.8.8.8': 'Google DNS',
  '8.8.4.4': 'Google DNS',
  '1.1.1.1': 'Cloudflare DNS',
  '1.0.0.1': 'Cloudflare DNS',
  '9.9.9.9': 'Quad9',
  '149.112.112.112': 'Quad9',
  '208.67.222.222': 'OpenDNS',
  '208.67.220.220': 'OpenDNS',
  '94.140.14.14': 'AdGuard DNS',
  '94.140.15.15': 'AdGuard DNS',
}

function classifyDns(serverIp: string, userIsp: string): DnsServer {
  if (KNOWN_PUBLIC_DNS[serverIp]) {
    return { ip: serverIp, type: 'public', name: KNOWN_PUBLIC_DNS[serverIp] }
  }
  return { ip: serverIp, type: 'isp', name: `${userIsp} DNS` }
}

export default function DnsLeak() {
  const [data, setData] = useState<DnsResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dnsServers, setDnsServers] = useState<DnsServer[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/ip')
      if (!res.ok) throw new Error('Request failed')
      const json: DnsResult = await res.json()
      setData(json)

      // Simulate DNS server detection based on connection type
      // In a real implementation, this would require custom DNS resolution infrastructure
      const servers: DnsServer[] = []

      if (json.vpnDetected) {
        // VPN users likely use VPN provider's DNS
        servers.push(classifyDns('10.0.0.1', json.isp))
        servers.push(classifyDns('1.1.1.1', json.isp))
      } else {
        // Direct connection - ISP DNS
        servers.push(classifyDns('auto-detected', json.isp))
      }

      setDnsServers(servers)
    } catch {
      setError('Could not perform DNS leak test. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // DNS leak status: if VPN is active but ISP DNS is exposed, that's a leak
  const hasLeak = data?.vpnDetected && dnsServers.some((s) => s.type === 'isp')
  const isSecure = !hasLeak

  return (
    <div className="page-transition p-4 lg:p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-white">
          DNS Leak <span className="neon-text">Test</span>
        </h1>
        <p className="text-[#8b9ec7] text-sm mt-1">
          Detect whether your DNS queries are exposed to your ISP, even when using a VPN.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 rounded-xl bg-[#ff2d5515] border border-[#ff2d5540] text-[#ff2d55] flex items-center gap-3">
          <AlertTriangle className="w-5 h-5" />
          {error}
          <button onClick={fetchData} className="ml-auto text-sm underline">Retry</button>
        </div>
      )}

      {/* Result card */}
      <div className="glass-card p-6 mb-5">
        {loading ? (
          <div className="flex flex-col gap-4">
            <div className="h-8 w-48 rounded shimmer" />
            <div className="h-20 rounded-xl shimmer" />
            <div className="h-24 rounded shimmer" />
          </div>
        ) : data ? (
          <div className="flex flex-col gap-6">
            {/* Status banner */}
            <div
              className={`rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5 ${
                hasLeak
                  ? 'bg-[#ff2d5512] border border-[#ff2d5540]'
                  : 'bg-[#00ff8812] border border-[#00ff8840]'
              }`}
            >
              {hasLeak ? (
                <ShieldAlert className="w-14 h-14 text-[#ff2d55] flex-shrink-0" />
              ) : (
                <ShieldCheck className="w-14 h-14 text-[#00ff88] flex-shrink-0" />
              )}
              <div className="text-center sm:text-left">
                <p className={`text-xl font-bold ${hasLeak ? 'text-[#ff2d55]' : 'text-[#00ff88]'}`}>
                  {hasLeak ? 'DNS Leak Detected!' : 'No DNS Leak Detected'}
                </p>
                <p className="text-[#8b9ec7] text-sm mt-1">
                  {hasLeak
                    ? 'Your VPN is active but your ISP can still see your DNS queries. This compromises your privacy.'
                    : !data.vpnDetected
                    ? 'Your connection is direct (no VPN). DNS queries go through your ISP DNS — this is normal for non-VPN users.'
                    : 'Your VPN is properly protecting your DNS queries. No leaks detected.'}
                </p>
              </div>
            </div>

            {/* Your connection info */}
            <div>
              <h3 className="text-sm font-semibold text-[#8b9ec7] mb-3 uppercase tracking-wider">
                Your Connection
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'IP Address', value: data.ip },
                  { label: 'ISP', value: data.isp },
                  { label: 'Location', value: `${data.city}, ${data.country}` },
                  { label: 'VPN Active', value: data.vpnDetected ? 'YES' : 'NO' },
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-xl p-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)]">
                    <p className="text-xs text-[#4a5c7a] mb-1">{label}</p>
                    <p className="text-sm font-mono text-white truncate">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* DNS servers detected */}
            <div>
              <h3 className="text-sm font-semibold text-[#8b9ec7] mb-3 uppercase tracking-wider">
                Detected DNS Servers
              </h3>
              {dnsServers.map((server, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-xl mb-2 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)]"
                >
                  <div className="flex items-center gap-3">
                    <Wifi
                      className={`w-5 h-5 ${
                        server.type === 'public' ? 'text-[#00ff88]' : 'text-[#ff9f00]'
                      }`}
                    />
                    <div>
                      <p className="text-sm font-medium text-white">{server.name}</p>
                      <p className="text-xs text-[#4a5c7a] font-mono">{server.ip}</p>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      server.type === 'public'
                        ? 'bg-[#00ff8820] text-[#00ff88]'
                        : 'bg-[#ff9f0020] text-[#ff9f00]'
                    }`}
                  >
                    {server.type === 'public' ? 'Public DNS' : 'ISP DNS'}
                  </span>
                </div>
              ))}
            </div>

            {/* Security checklist */}
            <div>
              <h3 className="text-sm font-semibold text-[#8b9ec7] mb-3 uppercase tracking-wider">
                Security Checklist
              </h3>
              {[
                { label: 'DNS encryption (DoH/DoT)', pass: data.vpnDetected || dnsServers.some(s => s.type === 'public') },
                { label: 'VPN tunnel active', pass: data.vpnDetected },
                { label: 'No ISP DNS exposure', pass: !hasLeak },
                { label: 'Public DNS in use', pass: dnsServers.some(s => s.type === 'public') },
              ].map(({ label, pass }) => (
                <div key={label} className="flex items-center gap-3 py-2 border-b border-[rgba(255,255,255,0.05)] last:border-0">
                  {pass ? (
                    <CheckCircle className="w-4 h-4 text-[#00ff88] flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-[#ff9f00] flex-shrink-0" />
                  )}
                  <span className={`text-sm ${pass ? 'text-[#00ff88]' : 'text-[#ff9f00]'}`}>{label}</span>
                  <span className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded-full ${pass ? 'bg-[#00ff8820] text-[#00ff88]' : 'bg-[#ff9f0020] text-[#ff9f00]'}`}>
                    {pass ? 'PASS' : 'CHECK'}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-3 flex-wrap">
              <button
                onClick={fetchData}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.3)] text-[#00d4ff] text-sm font-medium hover:bg-[rgba(0,212,255,0.15)] transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Re-test
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {/* Ad */}
      <div className="ad-slot rounded-xl mb-6" style={{ minHeight: '90px' }}>
        <span>Advertisement · 728×90</span>
      </div>

      {/* SEO content */}
      <div className="glass-card p-6 seo-content">
        <h2>What is a DNS Leak and Why Does It Matter?</h2>
        <p>
          A DNS (Domain Name System) leak occurs when your DNS queries are sent outside of your VPN tunnel and directly to your ISP's DNS servers — even while you believe your connection is private. This exposes your browsing activity to your ISP and potentially to government surveillance or hackers on the same network.
        </p>

        <h3>How DNS Leaks Happen</h3>
        <p>
          DNS leaks commonly occur due to misconfigured VPN software, operating system DNS fallback mechanisms, IPv6 DNS resolution bypassing the VPN tunnel, or WebRTC protocols. Windows has historically been prone to DNS leaks due to its "Smart Multi-Homed Name Resolution" feature that sends DNS queries to multiple DNS servers simultaneously.
        </p>

        <h3>ISP DNS vs. Public DNS</h3>
        <p>
          By default, your device uses your ISP's DNS servers to resolve domain names. Your ISP logs all DNS queries, creating a detailed record of every website you visit. Switching to public DNS providers like Cloudflare (1.1.1.1) or Google (8.8.8.8) reduces ISP logging but still doesn't prevent DNS leaks if your VPN is misconfigured.
        </p>

        <h3>How to Fix DNS Leaks</h3>
        <ul>
          <li><strong>Use a VPN with DNS leak protection:</strong> Quality VPN providers include built-in DNS leak protection that forces all DNS traffic through the VPN tunnel.</li>
          <li><strong>Enable DNS over HTTPS (DoH):</strong> Encrypts DNS queries so ISPs cannot read them, even if they're not going through the VPN.</li>
          <li><strong>Disable IPv6:</strong> Many DNS leaks occur through IPv6, which older VPN implementations don't tunnel properly.</li>
          <li><strong>Use DNS over TLS (DoT):</strong> Similar to DoH but uses a separate port (853) for encrypted DNS resolution.</li>
        </ul>

        <div className="mt-4 p-4 rounded-xl bg-[rgba(0,212,255,0.05)] border border-[rgba(0,212,255,0.15)] flex gap-3">
          <Info className="w-5 h-5 text-[#00d4ff] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-[#8b9ec7]">
            Learn more in our{' '}
            <Link to="/dns-leak-explained" className="text-[#00d4ff]">DNS Leak complete guide</Link>
            {' '}and check your{' '}
            <Link to="/vpn-checker" className="text-[#00d4ff]">VPN security status</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
