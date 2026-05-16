import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/dns-leak-explained')({
  head: () => ({
    meta: [
      { title: 'What is a DNS Leak? Complete Guide to DNS Privacy 2025 | NetWho' },
      {
        name: 'description',
        content:
          'Learn what DNS leaks are, how they expose your browsing history to your ISP, and how to prevent them. Includes DNS over HTTPS guide and DNS leak test tool.',
      },
    ],
  }),
  component: DnsLeakExplained,
})

const faqs = [
  {
    q: 'What is DNS and why does it matter for privacy?',
    a: 'DNS (Domain Name System) translates domain names like "google.com" into IP addresses like "142.250.80.46" that computers use to communicate. Every website you visit requires a DNS lookup. Your ISP\'s DNS servers log all these queries, creating a detailed record of your browsing history — even if you use HTTPS.',
  },
  {
    q: 'Can HTTPS protect me from DNS leaks?',
    a: 'No. HTTPS encrypts the content of your communication with a website, but the DNS lookup that happens before the connection is made is separate. DNS queries are typically sent in plain text, meaning your ISP can see every domain you look up even if the actual page content is encrypted.',
  },
  {
    q: 'Does a VPN automatically prevent DNS leaks?',
    a: 'Not necessarily. VPNs are supposed to tunnel all traffic including DNS through their servers, but implementation flaws, operating system behavior, or misconfigurations can cause DNS queries to bypass the VPN tunnel. Always test your VPN for DNS leaks using our DNS Leak Test tool.',
  },
  {
    q: 'What is DNS over HTTPS (DoH)?',
    a: 'DNS over HTTPS (DoH) encrypts your DNS queries by wrapping them in standard HTTPS traffic. This prevents ISPs and network monitors from seeing which domains you look up. DoH is supported in Firefox, Chrome, Edge, and can be configured at the operating system level in Windows 11 and newer Linux distributions.',
  },
  {
    q: 'What is the difference between DoH and DoT?',
    a: 'DoH (DNS over HTTPS) sends encrypted DNS queries over port 443, the same port used for normal HTTPS traffic, making it harder to block. DoT (DNS over TLS) uses port 853, which is easily blocked but provides a separate encrypted channel specifically for DNS. Both effectively encrypt DNS traffic.',
  },
  {
    q: 'How do I know if I have a DNS leak?',
    a: 'Use NetWho\'s DNS Leak Test to check your current DNS configuration. If you\'re using a VPN but the test shows your ISP\'s DNS servers are being used, you have a DNS leak. The test analyzes which DNS servers are handling your queries and flags ISP DNS exposure.',
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

export default function DnsLeakExplained() {
  return (
    <div className="page-transition p-4 lg:p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 text-xs text-[#4a5c7a] mb-6">
        <Link to="/dashboard" className="hover:text-[#00d4ff]">Home</Link>
        <span>/</span>
        <span className="text-[#8b9ec7]">DNS Leak Explained</span>
      </div>

      <div className="seo-content">
        <h1>What is a DNS Leak? Complete Guide to DNS Privacy in 2025</h1>
        <p>
          DNS leaks are one of the most common and overlooked privacy vulnerabilities on the internet. Millions of VPN users believe they are browsing privately, unaware that their DNS queries are silently exposing every website they visit to their ISP. This guide explains what DNS leaks are, how they happen, and most importantly, how to stop them.
        </p>

        <div className="not-prose my-6 p-5 rounded-xl bg-gradient-to-r from-[#0066ff15] to-[#00d4ff10] border border-[rgba(0,212,255,0.2)]">
          <p className="text-sm text-white font-medium mb-1">Test for DNS Leaks Right Now</p>
          <p className="text-xs text-[#8b9ec7] mb-3">Find out instantly if your VPN or DNS configuration is leaking your browsing activity to your ISP.</p>
          <Link to="/dns-leak" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00d4ff] text-black text-sm font-bold hover:bg-[#00bde0] transition-colors">
            Run DNS Leak Test →
          </Link>
        </div>

        <h2>What is DNS?</h2>
        <p>
          The Domain Name System (DNS) is often called "the phone book of the internet." When you type a website address like "amazon.com" into your browser, DNS translates that human-readable name into the numerical IP address (like 176.32.103.205) that computers use to connect to each other.
        </p>
        <p>
          This translation process is called a DNS query or DNS lookup, and it happens automatically every time you visit a new website. By default, these queries go to your ISP's DNS servers — and ISPs log and can monetize this data.
        </p>

        <h2>What is a DNS Leak?</h2>
        <p>
          A DNS leak occurs when your DNS queries are sent outside of your intended private connection — typically bypassing your VPN tunnel and going directly to your ISP's DNS servers. This means that even if a VPN is encrypting your web traffic:
        </p>
        <ul>
          <li>Your ISP can still see every domain name you look up</li>
          <li>The websites you visit are exposed even if their content is encrypted</li>
          <li>Advertisers and data brokers who partner with ISPs can access this browsing data</li>
          <li>Government surveillance systems that tap ISP infrastructure can monitor your activity</li>
        </ul>

        <h2>How DNS Leaks Happen</h2>
        <h3>Operating System DNS Fallback</h3>
        <p>
          Windows, macOS, and Linux all have mechanisms to fall back to alternative DNS servers if the primary DNS is slow or unreachable. If your VPN's DNS server is slow, your OS may quietly route queries to your ISP's DNS instead. This is the most common source of DNS leaks.
        </p>
        <h3>Windows Smart Multi-Homed Name Resolution</h3>
        <p>
          Windows 8 and later include a feature called "Smart Multi-Homed Name Resolution" that sends DNS queries to multiple DNS servers simultaneously and uses the fastest response. This feature completely bypasses VPN DNS settings and is a notorious source of DNS leaks on Windows systems.
        </p>
        <h3>IPv6 DNS Bypass</h3>
        <p>
          Many VPNs only tunnel IPv4 traffic, leaving IPv6 traffic to flow freely. If your network supports IPv6 and your VPN doesn't handle it, your IPv6 DNS queries go directly to your ISP — a significant DNS leak that even VPN users often overlook.
        </p>
        <h3>VPN Software Misconfiguration</h3>
        <p>
          Poorly implemented VPN clients may fail to properly redirect DNS traffic through the VPN tunnel. Some VPN apps push DNS settings only at connection time but fail to clear system DNS settings when the VPN disconnects, leading to inconsistent behavior.
        </p>
        <h3>WebRTC DNS Leaks</h3>
        <p>
          WebRTC (Web Real-Time Communication) is a browser technology used for video calls and peer-to-peer applications. It can bypass VPN tunnels to discover your real IP address and may expose local DNS information through STUN server requests.
        </p>

        <h2>Public DNS vs. ISP DNS: A Privacy Comparison</h2>
        <h3>ISP DNS Servers</h3>
        <p>
          By default, your router uses DNS servers provided by your ISP during setup. ISPs log all DNS queries and may:
        </p>
        <ul>
          <li>Store DNS query logs for months or years</li>
          <li>Sell anonymized browsing data to advertising networks</li>
          <li>Hand over records to government agencies under legal compulsion</li>
          <li>Block or redirect certain DNS queries (DNS censorship)</li>
          <li>Insert advertising into browser error pages via DNS hijacking</li>
        </ul>
        <h3>Public DNS Servers with Privacy Policies</h3>
        <p>
          Major public DNS providers commit to stronger privacy protections:
        </p>
        <ul>
          <li><strong>Cloudflare 1.1.1.1:</strong> Promises not to log querying IP addresses and deletes logs within 24 hours. Audited by KPMG annually.</li>
          <li><strong>Google 8.8.8.8:</strong> Logs anonymized queries for analytics. Better than ISP but not fully private.</li>
          <li><strong>Quad9 9.9.9.9:</strong> Non-profit operated, no logging of IP addresses, includes malware blocking.</li>
          <li><strong>NextDNS:</strong> Configurable filtering with privacy-focused logging options.</li>
        </ul>

        <h2>DNS Encryption Technologies</h2>
        <h3>DNS over HTTPS (DoH)</h3>
        <p>
          DoH encrypts DNS queries by sending them over standard HTTPS connections (port 443). Since this traffic looks identical to normal web browsing, it's very difficult for ISPs or network administrators to block or inspect. DoH is now natively supported in Firefox, Chrome, Edge, and Windows 11.
        </p>
        <h3>DNS over TLS (DoT)</h3>
        <p>
          DoT encrypts DNS queries using TLS on dedicated port 853. It provides similar privacy to DoH but uses a separate port that can be blocked by network administrators or governments. DoT is popular in enterprise and technical environments.
        </p>
        <h3>DNSSEC</h3>
        <p>
          DNSSEC (DNS Security Extensions) is different from DoH/DoT — it authenticates DNS responses to prevent DNS spoofing attacks rather than providing privacy. DNSSEC ensures you're getting legitimate DNS answers, but it doesn't encrypt the queries themselves.
        </p>

        <h2>How to Fix and Prevent DNS Leaks</h2>
        <h3>1. Use a VPN with Built-in DNS Leak Protection</h3>
        <p>
          Quality VPN providers include DNS leak protection that forces all DNS traffic through their own DNS servers inside the VPN tunnel. Look for VPNs that explicitly advertise and have tested DNS leak protection.
        </p>
        <h3>2. Enable DNS over HTTPS in Your Browser</h3>
        <p>
          In Firefox: Settings → Privacy &amp; Security → DNS over HTTPS → Enable<br/>
          In Chrome: Settings → Security → Advanced → Use secure DNS
        </p>
        <h3>3. Configure DoH at the Operating System Level</h3>
        <p>
          Windows 11 and recent Linux distributions allow configuring encrypted DNS system-wide, covering all applications, not just browsers. This is the most comprehensive protection.
        </p>
        <h3>4. Disable IPv6 If Your VPN Doesn't Support It</h3>
        <p>
          If your VPN only tunnels IPv4, consider disabling IPv6 on your network adapter to prevent IPv6 DNS leaks. This is a temporary workaround until your VPN provider adds proper IPv6 support.
        </p>
        <h3>5. Use a VPN Kill Switch</h3>
        <p>
          A VPN kill switch blocks all internet traffic if the VPN connection drops unexpectedly, preventing your real IP and DNS configuration from being temporarily exposed.
        </p>

        <h2>Testing for DNS Leaks</h2>
        <p>
          The most reliable way to detect DNS leaks is to use a dedicated DNS leak test tool like NetWho's. When testing:
        </p>
        <ol>
          <li>Connect to your VPN (or the connection you want to test)</li>
          <li>Run the DNS leak test</li>
          <li>Check which DNS servers appear — they should match your VPN provider's DNS, not your ISP</li>
          <li>If your ISP's DNS servers appear, you have a DNS leak</li>
        </ol>

        <h2>Conclusion</h2>
        <p>
          DNS leaks are a silent threat to online privacy that affect millions of VPN users daily. The good news is they're preventable with the right tools and configuration. Start by running NetWho's DNS Leak Test to check your current status, then implement DNS encryption (DoH or DoT) and use a VPN with verified DNS leak protection for comprehensive privacy coverage.
        </p>

        <h2>Frequently Asked Questions</h2>
        <FAQ items={faqs} />

        <div className="not-prose mt-8 p-5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.07)]">
          <p className="text-sm font-semibold text-white mb-3">Related Guides & Tools</p>
          <div className="flex flex-wrap gap-2">
            {[
              { to: '/dns-leak', label: 'DNS Leak Test Tool' },
              { to: '/vpn-explained', label: 'VPN Guide' },
              { to: '/vpn-checker', label: 'VPN Checker' },
              { to: '/online-privacy-guide', label: 'Privacy Guide' },
              { to: '/what-is-ip-address', label: 'IP Address Guide' },
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
