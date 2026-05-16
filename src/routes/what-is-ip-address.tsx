import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/what-is-ip-address')({
  head: () => ({
    meta: [
      { title: 'What is an IP Address? Complete Guide 2025 | NetWho' },
      {
        name: 'description',
        content:
          'Everything you need to know about IP addresses — what they are, how they work, IPv4 vs IPv6, public vs private IPs, and how to check yours. Expert guide with FAQs.',
      },
      { name: 'keywords', content: 'what is an IP address, IP address explained, IPv4 vs IPv6, public IP address, private IP address, how IP works' },
    ],
  }),
  component: WhatIsIp,
})

const faqs = [
  {
    q: 'What does an IP address look like?',
    a: 'An IPv4 address looks like four numbers separated by dots, such as 192.168.1.1 or 203.0.113.42. Numbers range from 0 to 255. IPv6 addresses are longer, using eight groups of four hexadecimal characters separated by colons, such as 2001:0db8:85a3:0000:0000:8a2e:0370:7334.',
  },
  {
    q: 'Can two devices have the same IP address?',
    a: 'No — on the public internet, IP addresses must be globally unique. However, private IP addresses (like 192.168.x.x) can repeat across different private networks (homes, offices) because they are not directly routable on the public internet. NAT (Network Address Translation) allows many private devices to share one public IP.',
  },
  {
    q: 'How often does my IP address change?',
    a: 'Most home internet connections use dynamic IP addresses assigned by your ISP via DHCP. These can change when your router restarts, after your DHCP lease expires (typically every 24–48 hours), or when your ISP reassigns addresses. Businesses often pay extra for static (fixed) IP addresses.',
  },
  {
    q: 'Can someone find my exact home address from my IP?',
    a: 'No. An IP address only reveals your approximate geographic area — typically the city or region where your ISP operates. It cannot pinpoint your home address. Only your ISP has the mapping between your IP address and your physical address, and they share this only with law enforcement under proper legal authority.',
  },
  {
    q: 'What is my IP address right now?',
    a: 'You can check your current public IP address using NetWho\'s IP Dashboard. It shows your IP address, country, city, region, ZIP code, ISP, and more — all in real time.',
  },
  {
    q: 'How is IPv6 different from IPv4?',
    a: 'IPv4 uses 32-bit addresses providing about 4.3 billion unique addresses — a number now exhausted globally. IPv6 uses 128-bit addresses, providing approximately 340 undecillion addresses. IPv6 also includes built-in security features, better routing efficiency, and eliminates the need for NAT in most cases.',
  },
]

function FAQ({ items }: { items: typeof faqs }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div>
      {items.map((item, i) => (
        <div key={i} className="faq-item">
          <button
            className="w-full flex items-center justify-between px-5 py-4 text-left"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="font-medium text-white text-sm">{item.q}</span>
            {open === i ? (
              <ChevronUp className="w-4 h-4 text-[#00d4ff] flex-shrink-0" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#8b9ec7] flex-shrink-0" />
            )}
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

export default function WhatIsIp() {
  return (
    <div className="page-transition p-4 lg:p-8 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#4a5c7a] mb-6">
        <Link to="/dashboard" className="hover:text-[#00d4ff]">Home</Link>
        <span>/</span>
        <span className="text-[#8b9ec7]">What is an IP Address?</span>
      </div>

      <div className="seo-content">
        <h1>What is an IP Address? A Complete Guide for 2025</h1>

        <p>
          Every device connected to the internet — your smartphone, laptop, smart TV, gaming console, or even your smart refrigerator — has an IP address. But what exactly is an IP address, how does it work, and what can it reveal about you? This comprehensive guide explains everything you need to know about IP addresses in plain language.
        </p>

        {/* CTA box */}
        <div className="not-prose my-6 p-5 rounded-xl bg-gradient-to-r from-[#0066ff15] to-[#00d4ff10] border border-[rgba(0,212,255,0.2)]">
          <p className="text-sm text-white font-medium mb-2">Check Your IP Address Now</p>
          <p className="text-xs text-[#8b9ec7] mb-3">See exactly what your IP address reveals — country, city, ZIP code, ISP, VPN status, and security score.</p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00d4ff] text-black text-sm font-bold hover:bg-[#00bde0] transition-colors"
          >
            View My IP Dashboard →
          </Link>
        </div>

        <h2>The Simple Definition: What is an IP Address?</h2>
        <p>
          IP stands for <strong>Internet Protocol</strong> — the set of rules governing how data is sent and received over the internet. An IP address is a numerical label assigned to each device participating in a network that uses the Internet Protocol for communication.
        </p>
        <p>
          Think of an IP address like a postal address for your internet connection. Just as letters need your home address to find you, data packets on the internet need your IP address to reach your device. Without IP addresses, the internet simply could not function — there would be no way to route data to the correct destination.
        </p>

        <h2>How IP Addresses Work</h2>
        <p>
          When you type a website address (like google.com) into your browser, a series of steps occur behind the scenes:
        </p>
        <ol>
          <li>Your device sends a DNS query to translate "google.com" into an IP address (like 142.250.80.46)</li>
          <li>Your router forwards your request, attaching your public IP address as the return address</li>
          <li>Google's servers receive the request and send back the webpage data addressed to your IP</li>
          <li>Your router directs the incoming data to your specific device on your local network</li>
        </ol>
        <p>
          This entire process happens in milliseconds, thousands of times per browsing session.
        </p>

        <h2>IPv4 vs. IPv6: Two Generations of IP Addresses</h2>

        <h3>IPv4 — The Original Standard</h3>
        <p>
          IPv4 (Internet Protocol version 4) has been the foundation of internet addressing since the early 1980s. An IPv4 address consists of four numbers from 0 to 255, separated by periods. Example: <code>203.0.113.42</code>.
        </p>
        <p>
          IPv4 supports approximately 4.3 billion unique addresses — a number that seemed enormous in 1981 but has proven woefully insufficient as billions of internet-connected devices entered the world. IPv4 addresses became officially exhausted globally around 2011, leading to workarounds like NAT (Network Address Translation) and accelerating IPv6 adoption.
        </p>

        <h3>IPv6 — The Modern Standard</h3>
        <p>
          IPv6 (Internet Protocol version 6) was designed to solve the address exhaustion problem. An IPv6 address uses 128 bits instead of IPv4's 32 bits, allowing for approximately 340 undecillion (3.4 × 10^38) unique addresses — effectively unlimited for any foreseeable future.
        </p>
        <p>
          An IPv6 address looks like: <code>2001:0db8:85a3:0000:0000:8a2e:0370:7334</code> — eight groups of four hexadecimal characters separated by colons. IPv6 also includes built-in IPsec security, improved multicast routing, and eliminates the need for NAT.
        </p>

        <h2>Public vs. Private IP Addresses</h2>

        <h3>Public IP Addresses</h3>
        <p>
          A public IP address is assigned by your Internet Service Provider (ISP) and is visible to every website and service you access on the internet. Your home network typically shares one public IP address for all devices, managed through your router using NAT.
        </p>
        <p>
          Public IP addresses are globally unique — no two devices on the public internet can share the same public IP at the same time. They fall within publicly routable IP ranges assigned by regional internet registries like ARIN (North America), RIPE (Europe), and APNIC (Asia-Pacific).
        </p>

        <h3>Private IP Addresses</h3>
        <p>
          Private IP addresses are used within local networks (homes, offices, schools) and are not directly accessible from the internet. The Internet Assigned Numbers Authority (IANA) has reserved three ranges for private use:
        </p>
        <ul>
          <li><strong>10.0.0.0 – 10.255.255.255</strong> (Class A — 16 million addresses)</li>
          <li><strong>172.16.0.0 – 172.31.255.255</strong> (Class B — 1 million addresses)</li>
          <li><strong>192.168.0.0 – 192.168.255.255</strong> (Class C — 65,000 addresses)</li>
        </ul>
        <p>
          When your laptop connects to your home Wi-Fi, it gets a private IP like 192.168.1.105. Your router then uses NAT to translate this to your public IP when communicating with the internet.
        </p>

        <h2>Static vs. Dynamic IP Addresses</h2>

        <h3>Dynamic IP Addresses</h3>
        <p>
          Most home internet users have dynamic IP addresses — addresses that can change over time, assigned by your ISP through DHCP (Dynamic Host Configuration Protocol). Dynamic IPs allow ISPs to efficiently manage their address pools: when you're not connected, your address can be reassigned to another customer. Dynamic IPs typically change when your router restarts or after your DHCP lease period expires.
        </p>

        <h3>Static IP Addresses</h3>
        <p>
          A static IP address never changes. Businesses, servers, and remote workers often require static IPs to host websites, run VPNs, maintain remote desktop connections, or accept incoming connections reliably. ISPs charge more for static IP addresses due to the dedicated address allocation.
        </p>

        <h2>What Information Does an IP Address Reveal?</h2>
        <p>
          Contrary to common misconceptions, an IP address does not reveal your exact home address, your name, or your personal details. However, it does expose:
        </p>
        <ul>
          <li><strong>Approximate geographic location:</strong> Usually accurate to city or region level</li>
          <li><strong>ZIP / Postal code:</strong> Often determinable from IP geolocation databases</li>
          <li><strong>Internet Service Provider (ISP):</strong> The company providing your internet connection</li>
          <li><strong>Connection type:</strong> Residential, business, mobile, or datacenter</li>
          <li><strong>ASN (Autonomous System Number):</strong> Your ISP's network identifier</li>
          <li><strong>Timezone:</strong> Your approximate time zone based on location</li>
        </ul>

        <div className="not-prose my-6 p-5 rounded-xl bg-gradient-to-r from-[#0066ff15] to-[#00d4ff10] border border-[rgba(0,212,255,0.2)]">
          <p className="text-sm text-white font-medium mb-1">See What Your IP Reveals</p>
          <p className="text-xs text-[#8b9ec7] mb-3">Use NetWho's dashboard to see your complete IP profile including ZIP code, ISP, ASN, timezone, and security risk score.</p>
          <div className="flex gap-3 flex-wrap">
            <Link to="/dashboard" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00d4ff] text-black text-sm font-bold hover:bg-[#00bde0] transition-colors">
              Check My IP →
            </Link>
            <Link to="/vpn-checker" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[rgba(0,212,255,0.3)] text-[#00d4ff] text-sm font-medium hover:bg-[rgba(0,212,255,0.1)] transition-colors">
              VPN Checker
            </Link>
          </div>
        </div>

        <h2>How to Check Your IP Address</h2>
        <p>
          There are several ways to find your current IP address:
        </p>
        <ol>
          <li><strong>Use an IP lookup tool:</strong> The fastest method — tools like NetWho's dashboard show your public IP instantly along with full geolocation details.</li>
          <li><strong>Windows Command Prompt:</strong> Type <code>ipconfig</code> to see your local (private) IP address.</li>
          <li><strong>Mac Terminal:</strong> Type <code>ifconfig</code> or <code>ipconfig getifaddr en0</code>.</li>
          <li><strong>Linux Terminal:</strong> Use <code>ip addr show</code> or <code>hostname -I</code>.</li>
          <li><strong>Router admin page:</strong> Log into your router (usually at 192.168.1.1) to see your public WAN IP.</li>
        </ol>

        <h2>How to Hide or Change Your IP Address</h2>
        <p>
          Several methods can mask or change your public IP address for privacy, security, or bypassing geographic restrictions:
        </p>
        <ul>
          <li><strong>VPN (Virtual Private Network):</strong> Routes your traffic through a server in another location, replacing your IP with the VPN server's IP. The most popular and effective method.</li>
          <li><strong>Tor Network:</strong> Routes traffic through multiple volunteer-operated nodes, providing strong anonymity but significantly slower speeds.</li>
          <li><strong>Proxy Server:</strong> Acts as an intermediary between your device and websites. Less secure than VPNs as they typically don't encrypt traffic.</li>
          <li><strong>Mobile Data:</strong> Switching from home Wi-Fi to mobile data gives you a different carrier-assigned IP address.</li>
        </ul>

        <h2>IP Addresses and Online Privacy</h2>
        <p>
          Every website you visit logs your IP address. Advertisers use IP addresses for geographic targeting and building behavioral profiles. Governments can subpoena your ISP to match IP addresses to subscriber accounts. Understanding these privacy implications is the first step to protecting yourself online.
        </p>

        <h2>Conclusion</h2>
        <p>
          IP addresses are the foundation of internet communication — invisible to most users yet constantly at work routing trillions of data packets across global networks. Understanding what your IP address is, what it reveals, and how to protect it is fundamental to digital literacy in 2025. Use NetWho's suite of tools to monitor your IP, check for VPN detection, test for DNS leaks, and measure your connection speed.
        </p>

        <h2>Frequently Asked Questions</h2>
        <FAQ items={faqs} />

        {/* Internal links */}
        <div className="not-prose mt-8 p-5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.07)]">
          <p className="text-sm font-semibold text-white mb-3">Related Guides & Tools</p>
          <div className="flex flex-wrap gap-2">
            {[
              { to: '/vpn-explained', label: 'VPN Explained' },
              { to: '/dns-leak-explained', label: 'DNS Leak Guide' },
              { to: '/online-privacy-guide', label: 'Privacy Guide' },
              { to: '/internet-speed-guide', label: 'Speed Test Guide' },
              { to: '/dashboard', label: 'IP Dashboard' },
              { to: '/vpn-checker', label: 'VPN Checker' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="px-3 py-1.5 rounded-lg text-xs text-[#00d4ff] border border-[rgba(0,212,255,0.2)] hover:bg-[rgba(0,212,255,0.1)] transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
