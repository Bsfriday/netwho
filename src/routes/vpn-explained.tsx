import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/vpn-explained')({
  head: () => ({
    meta: [
      { title: 'What is a VPN and How Does It Work? Complete Guide 2025 | NetWho' },
      {
        name: 'description',
        content:
          'Learn what a VPN is, how VPNs work, the difference between VPN protocols, and how websites detect VPN usage. Complete guide with FAQ.',
      },
    ],
  }),
  component: VpnExplained,
})

const faqs = [
  {
    q: 'Does a VPN make me completely anonymous online?',
    a: 'No. A VPN hides your IP address from websites and encrypts your traffic from your ISP, but the VPN provider itself can see your activity. Additionally, websites can still identify you through cookies, browser fingerprinting, and logged accounts. A VPN is one layer of privacy, not complete anonymity.',
  },
  {
    q: 'Will a VPN slow down my internet?',
    a: 'Yes, typically by 10–30%. The encryption overhead and longer routing path add latency. Premium VPN providers with large server networks minimize this impact. Protocols like WireGuard offer much better performance than older protocols like OpenVPN or PPTP.',
  },
  {
    q: 'Can my ISP see what I do with a VPN?',
    a: 'Your ISP can see that you are using a VPN (they can identify VPN server IPs), but they cannot see the content of your encrypted traffic. They know you are connected to a VPN server but not what websites you are visiting or what data you are transmitting.',
  },
  {
    q: 'Why is Netflix blocking my VPN?',
    a: 'Netflix and other streaming platforms use VPN detection to enforce geographic content licensing agreements. They maintain lists of known VPN server IP ranges and block connections from them. Some premium VPNs offer "obfuscated" servers specifically designed to bypass streaming platform blocks.',
  },
  {
    q: 'What is the difference between a VPN and a proxy?',
    a: 'A VPN encrypts all your internet traffic at the system level and routes it through a server. A proxy only redirects traffic from specific applications (like your browser) and typically does not encrypt data. VPNs provide stronger privacy protection, while proxies are faster and simpler for basic IP masking.',
  },
  {
    q: 'Is using a VPN legal?',
    a: 'In most countries, yes. VPN use is completely legal in the US, UK, EU, Canada, Australia, and most democratic nations. However, some countries restrict or ban VPN use, including China, Russia, Iran, North Korea, and Belarus. Always check local laws before using a VPN abroad.',
  },
]

function FAQ({ items }: { items: typeof faqs }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div>
      {items.map((item, i) => (
        <div key={i} className="faq-item">
          <button className="w-full flex items-center justify-between px-5 py-4 text-left" onClick={() => setOpen(open === i ? null : i)}>
            <span className="font-medium text-white text-sm">{item.q}</span>
            {open === i ? <ChevronUp className="w-4 h-4 text-[#00d4ff] flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-[#8b9ec7] flex-shrink-0" />}
          </button>
          {open === i && (
            <div className="px-5 pb-4 text-sm text-[#8b9ec7] leading-relaxed border-t border-[rgba(0,212,255,0.1)]">
              <p className="pt-3">{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function VpnExplained() {
  return (
    <div className="page-transition p-4 lg:p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 text-xs text-[#4a5c7a] mb-6">
        <Link to="/dashboard" className="hover:text-[#00d4ff]">Home</Link>
        <span>/</span>
        <span className="text-[#8b9ec7]">VPN Explained</span>
      </div>

      <div className="seo-content">
        <h1>What is a VPN and How Does It Work? Complete 2025 Guide</h1>
        <p>
          A Virtual Private Network (VPN) is one of the most powerful tools for online privacy and security. Yet many users rely on VPNs without fully understanding how they work, what protections they provide, and — critically — what they cannot do. This comprehensive guide covers everything from VPN fundamentals to advanced protocol comparisons.
        </p>

        <div className="not-prose my-6 p-5 rounded-xl bg-gradient-to-r from-[#0066ff15] to-[#00d4ff10] border border-[rgba(0,212,255,0.2)]">
          <p className="text-sm text-white font-medium mb-1">Is Your VPN Working?</p>
          <p className="text-xs text-[#8b9ec7] mb-3">Test whether your VPN is properly masking your IP address and protecting your connection right now.</p>
          <Link to="/vpn-checker" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00d4ff] text-black text-sm font-bold hover:bg-[#00bde0] transition-colors">
            Check VPN Status →
          </Link>
        </div>

        <h2>What is a VPN?</h2>
        <p>
          A VPN creates an encrypted tunnel between your device and a server operated by the VPN provider. All your internet traffic passes through this tunnel, hiding its contents from your ISP, network administrators, and anyone monitoring the network. Your real IP address is replaced by the VPN server's IP address, making it appear as if your traffic originates from the server's location.
        </p>
        <p>
          Originally developed for businesses to give remote employees secure access to corporate networks, VPNs are now widely used by millions of individuals for privacy, security, and bypassing geographic content restrictions.
        </p>

        <h2>How a VPN Works: Step by Step</h2>
        <ol>
          <li><strong>Connection initiation:</strong> Your VPN client authenticates with the VPN server using cryptographic keys or certificates.</li>
          <li><strong>Tunnel establishment:</strong> An encrypted tunnel is created between your device and the VPN server using protocols like WireGuard, OpenVPN, or IKEv2.</li>
          <li><strong>Traffic routing:</strong> All your internet traffic is redirected through this encrypted tunnel instead of going directly to websites.</li>
          <li><strong>IP substitution:</strong> The VPN server forwards your requests to websites using its own IP address, not yours.</li>
          <li><strong>Return routing:</strong> Responses come back to the VPN server, which decrypts and forwards them back to your device through the tunnel.</li>
        </ol>

        <h2>VPN Protocols: Which is Best?</h2>
        <h3>WireGuard</h3>
        <p>
          The newest and fastest VPN protocol, WireGuard uses state-of-the-art cryptography and requires only ~4,000 lines of code (compared to OpenVPN's 400,000+ lines). This simplicity makes it auditable, secure, and significantly faster than older protocols. Most leading VPN providers now support WireGuard as their primary protocol.
        </p>
        <h3>OpenVPN</h3>
        <p>
          The longtime industry standard, OpenVPN is highly configurable, battle-tested, and works on virtually every platform. It's slower than WireGuard due to its older codebase but remains one of the most trusted protocols. Available in TCP and UDP modes — UDP is faster, TCP is more reliable on unstable connections.
        </p>
        <h3>IKEv2/IPSec</h3>
        <p>
          Excellent for mobile devices because it handles network switching (Wi-Fi to mobile data) gracefully without dropping the VPN connection. Fast, stable, and natively supported on iOS and macOS.
        </p>
        <h3>PPTP and L2TP (Legacy)</h3>
        <p>
          PPTP is outdated and has known security vulnerabilities — avoid it. L2TP/IPSec is more secure but slower than modern alternatives. These older protocols should be avoided when better options are available.
        </p>

        <h2>What a VPN Protects and What It Doesn't</h2>
        <h3>VPN Protections</h3>
        <ul>
          <li>Hides your real IP address from websites and services</li>
          <li>Encrypts your traffic from your ISP's view</li>
          <li>Protects you on public Wi-Fi networks (airports, cafes, hotels)</li>
          <li>Prevents ISP throttling of specific services</li>
          <li>Bypasses geographic restrictions on content</li>
          <li>Prevents man-in-the-middle attacks on local networks</li>
        </ul>
        <h3>What VPNs Cannot Do</h3>
        <ul>
          <li>VPNs cannot prevent tracking via cookies or browser fingerprinting</li>
          <li>VPNs cannot hide activity from logged-in accounts (Google, Facebook, etc.)</li>
          <li>VPNs cannot protect against malware or phishing attacks</li>
          <li>The VPN provider can still see your traffic</li>
          <li>VPNs may leak DNS queries if not properly configured (see our <Link to="/dns-leak">DNS Leak Test</Link>)</li>
        </ul>

        <h2>How Websites Detect VPN Usage</h2>
        <p>
          Major platforms invest heavily in VPN detection. The primary detection methods include:
        </p>
        <ul>
          <li><strong>IP range databases:</strong> VPN providers use datacenters with well-known IP ranges. Streaming platforms and fraud detection systems maintain updated lists of these ranges.</li>
          <li><strong>ASN analysis:</strong> Autonomous System Numbers identify network operators. If your ASN belongs to a known VPN provider or datacenter, you will be flagged.</li>
          <li><strong>Reverse DNS lookup:</strong> VPN servers often have hostnames that reveal their datacenter nature (e.g., "vpn-server-us-east.provider.com").</li>
          <li><strong>Port fingerprinting:</strong> Certain VPN protocols use distinctive port patterns that deep packet inspection (DPI) can identify.</li>
          <li><strong>Behavioral analysis:</strong> Traffic patterns from VPN servers differ from residential connections in detectable ways.</li>
        </ul>

        <div className="not-prose my-6 p-5 rounded-xl bg-gradient-to-r from-[#0066ff15] to-[#00d4ff10] border border-[rgba(0,212,255,0.2)]">
          <p className="text-sm text-white font-medium mb-1">Check Your VPN Detection Status</p>
          <p className="text-xs text-[#8b9ec7] mb-3">See if your VPN is being detected by websites and get a detailed security report.</p>
          <div className="flex gap-3 flex-wrap">
            <Link to="/vpn-checker" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00d4ff] text-black text-sm font-bold hover:bg-[#00bde0] transition-colors">VPN Checker →</Link>
            <Link to="/dns-leak" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[rgba(0,212,255,0.3)] text-[#00d4ff] text-sm font-medium hover:bg-[rgba(0,212,255,0.1)] transition-colors">DNS Leak Test</Link>
          </div>
        </div>

        <h2>Choosing the Right VPN</h2>
        <p>
          Key factors to evaluate when selecting a VPN provider:
        </p>
        <ul>
          <li><strong>No-logs policy:</strong> Verified through independent audits, not just marketing claims</li>
          <li><strong>Jurisdiction:</strong> VPN providers in 14-Eyes countries may be legally compelled to share user data</li>
          <li><strong>Protocol support:</strong> WireGuard support indicates a modern, performance-focused provider</li>
          <li><strong>Kill switch:</strong> Automatically blocks internet access if the VPN drops, preventing IP exposure</li>
          <li><strong>DNS leak protection:</strong> Built-in protection against DNS queries bypassing the VPN tunnel</li>
          <li><strong>Server count and locations:</strong> More servers reduce congestion and offer more location options</li>
        </ul>

        <h2>Conclusion</h2>
        <p>
          A VPN is a powerful privacy tool when used correctly and with realistic expectations. It significantly improves your privacy posture by hiding your IP, encrypting your traffic, and protecting you on public networks. However, it's not a silver bullet — combine it with browser privacy settings, DNS leak protection, and good security hygiene for comprehensive online privacy. Always verify your VPN is working correctly using tools like NetWho's VPN Checker and DNS Leak Test.
        </p>

        <h2>Frequently Asked Questions</h2>
        <FAQ items={faqs} />

        <div className="not-prose mt-8 p-5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.07)]">
          <p className="text-sm font-semibold text-white mb-3">Related Guides & Tools</p>
          <div className="flex flex-wrap gap-2">
            {[
              { to: '/what-is-ip-address', label: 'What is an IP?' },
              { to: '/dns-leak-explained', label: 'DNS Leak Guide' },
              { to: '/online-privacy-guide', label: 'Privacy Guide' },
              { to: '/vpn-checker', label: 'VPN Checker Tool' },
              { to: '/dns-leak', label: 'DNS Leak Test' },
              { to: '/dashboard', label: 'IP Dashboard' },
            ].map(({ to, label }) => (
              <Link key={to} to={to} className="px-3 py-1.5 rounded-lg text-xs text-[#00d4ff] border border-[rgba(0,212,255,0.2)] hover:bg-[rgba(0,212,255,0.1)] transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
