import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/online-privacy-guide')({
  head: () => ({
    meta: [
      { title: 'Online Privacy & Cybersecurity Guide 2025 – Stay Anonymous Online | NetWho' },
      {
        name: 'description',
        content:
          'Complete guide to online privacy and cybersecurity in 2025. Learn how ISPs track you, how to stay anonymous, and the best tools for protecting your digital identity.',
      },
    ],
  }),
  component: OnlinePrivacyGuide,
})

const faqs = [
  {
    q: 'Can my ISP see what websites I visit even with HTTPS?',
    a: 'Yes, partially. With HTTPS, your ISP cannot see the specific content of pages you visit, but they can see the domain names (e.g., "reddit.com") through DNS queries and SNI (Server Name Indication) in TLS connections. DNS over HTTPS and encrypted SNI are required to fully hide even domain-level browsing from your ISP.',
  },
  {
    q: 'Is incognito mode private?',
    a: 'No, not from your ISP, employer, or network administrator. Incognito mode only prevents your browser from storing local history, cookies, and cached files on your device. Your IP address, DNS queries, and network traffic are still fully visible to your ISP and any network monitors.',
  },
  {
    q: 'What data does Google collect about me?',
    a: 'Google collects your search history, location history, YouTube viewing history, app usage (on Android), email content (for ad targeting), calendar events, and all activity on services you use while logged into your Google account. This data can be managed (partially) through your Google Account privacy settings.',
  },
  {
    q: 'Is Tor completely anonymous?',
    a: 'Tor provides strong anonymity but is not infallible. Weaknesses include timing attacks (correlating when you enter and exit the Tor network), malicious exit nodes that can inspect unencrypted traffic, browser fingerprinting, and human error (like logging into identifying accounts over Tor). Tor is significantly slower than regular browsing due to multi-hop routing.',
  },
  {
    q: 'What is browser fingerprinting?',
    a: 'Browser fingerprinting creates a unique identifier from attributes of your browser and device: screen resolution, installed fonts, browser plugins, time zone, language settings, WebGL capabilities, and more. Together, these form a fingerprint that can track you across websites without cookies, even in incognito mode. Firefox with strict mode and Tor Browser are best at mitigating fingerprinting.',
  },
  {
    q: 'How do I know if my personal data has been breached?',
    a: 'Use Have I Been Pwned (haveibeenpwned.com) to check if your email addresses appear in known data breaches. Many password managers and modern browsers also alert you to breached credentials. Enable breach monitoring through your email provider if available.',
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

export default function OnlinePrivacyGuide() {
  return (
    <div className="page-transition p-4 lg:p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 text-xs text-[#4a5c7a] mb-6">
        <Link to="/dashboard" className="hover:text-[#00d4ff]">Home</Link>
        <span>/</span>
        <span className="text-[#8b9ec7]">Online Privacy Guide</span>
      </div>

      <div className="seo-content">
        <h1>Online Privacy & Cybersecurity Guide: How to Stay Safe in 2025</h1>
        <p>
          Online privacy is no longer a concern only for activists and journalists — it's a fundamental right and practical necessity for everyone in 2025. From ISP data collection to advertising surveillance networks and government monitoring, understanding who is watching your digital activity and how to protect yourself has never been more important.
        </p>

        <div className="not-prose my-6 p-5 rounded-xl bg-gradient-to-r from-[#0066ff15] to-[#00d4ff10] border border-[rgba(0,212,255,0.2)]">
          <p className="text-sm text-white font-medium mb-1">Check Your Privacy Exposure Now</p>
          <p className="text-xs text-[#8b9ec7] mb-3">See what your IP address, VPN status, and DNS configuration reveal about you.</p>
          <div className="flex gap-3 flex-wrap">
            <Link to="/dashboard" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00d4ff] text-black text-sm font-bold hover:bg-[#00bde0] transition-colors">IP Dashboard →</Link>
            <Link to="/vpn-checker" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[rgba(0,212,255,0.3)] text-[#00d4ff] text-sm font-medium hover:bg-[rgba(0,212,255,0.1)] transition-colors">VPN Check</Link>
          </div>
        </div>

        <h2>How Your ISP Tracks You</h2>
        <p>
          Your Internet Service Provider (ISP) sits between you and the entire internet. Every byte of data you send or receive passes through their infrastructure. ISPs can see your DNS queries (which reveal every domain you visit), unencrypted HTTP traffic, the IP addresses of servers you connect to, the timing and volume of your connections, and your location derived from which infrastructure you connect through.
        </p>
        <p>
          In the United States, the FCC's 2017 rollback of broadband privacy protections gave ISPs the legal right to sell your browsing data without explicit consent. Major ISPs have been caught using "supercookies" (hidden tracking headers) that persist even after you clear browser cookies, and participating in advertising data-sharing programs.
        </p>

        <h2>Who Else Is Watching?</h2>
        <h3>Advertising Networks</h3>
        <p>
          Companies like Google, Meta, and the broader ad tech ecosystem track your activity across virtually every website on the internet through tracking pixels, third-party cookies, and JavaScript. These networks build detailed behavioral profiles that are used for targeted advertising and sold to data brokers.
        </p>
        <h3>Data Brokers</h3>
        <p>
          Data brokers collect information from ISPs, app developers, social media platforms, public records, retail loyalty programs, and many other sources to build comprehensive profiles on individuals. They sell these profiles to advertisers, employers, insurance companies, and law enforcement. Companies like Acxiom and LexisNexis maintain profiles on billions of people.
        </p>
        <h3>Government Surveillance</h3>
        <p>
          The Snowden revelations confirmed that NSA programs like PRISM and XKeyscore collect internet communications from major technology companies and tap internet backbone infrastructure. Many countries have legal frameworks requiring ISPs to retain connection logs for 6–24 months for law enforcement access. The Five Eyes intelligence alliance (US, UK, Canada, Australia, New Zealand) shares surveillance data between member nations.
        </p>
        <h3>Cybercriminals</h3>
        <p>
          Public Wi-Fi networks, compromised DNS servers, and phishing attacks allow malicious actors to intercept unencrypted traffic, steal credentials, and conduct man-in-the-middle attacks. These threats are particularly acute on public networks in airports, hotels, and cafes.
        </p>

        <h2>The Privacy Threat Landscape in 2025</h2>
        <h3>Browser Fingerprinting</h3>
        <p>
          Browser fingerprinting has become more sophisticated than ever. Canvas fingerprinting, AudioContext fingerprinting, WebGL fingerprinting, and font enumeration can uniquely identify your browser across sessions without cookies. Many commercial fraud detection and analytics platforms use fingerprinting to track users who clear cookies or use private browsing.
        </p>
        <h3>Mobile App Tracking</h3>
        <p>
          Smartphone apps collect location data, contact lists, browsing history, app usage patterns, and more. Even free apps that appear unrelated to data collection often contain multiple third-party tracking SDKs. The AppCensus project found that many popular apps share data with dozens of tracking companies.
        </p>
        <h3>Smart Home Devices</h3>
        <p>
          Voice assistants, smart TVs, and IoT devices are persistent sensors in your home. Smart TVs use automatic content recognition (ACR) to scan and report everything displayed on screen. Voice assistants maintain voice clips that are reviewed by human reviewers. These devices create a rich data stream about your lifestyle and habits.
        </p>

        <h2>Your Privacy Toolkit: Essential Tools for 2025</h2>

        <h3>1. VPN (Virtual Private Network)</h3>
        <p>
          A quality VPN encrypts your traffic and hides your IP address from websites and your ISP. For maximum privacy, choose a provider with a verified no-logs policy, jurisdiction outside Five Eyes countries, and built-in DNS leak protection. Always verify your VPN is working with tools like NetWho's VPN Checker.
        </p>

        <h3>2. Encrypted DNS (DoH/DoT)</h3>
        <p>
          Switch from your ISP's DNS to an encrypted alternative. Cloudflare's 1.1.1.1 with DNS over HTTPS, NextDNS, or AdGuard DNS significantly reduces the browsing data your ISP can collect. Configure this at the browser level immediately, and at the operating system level for complete protection.
        </p>

        <h3>3. Privacy-Focused Browser</h3>
        <p>
          Firefox with uBlock Origin and Privacy Badger extensions offers strong anti-tracking protection. Brave browser includes built-in tracker blocking, fingerprinting protection, and optional Tor integration for private browsing windows. The Tor Browser provides the strongest anonymity but at a speed cost.
        </p>

        <h3>4. Password Manager</h3>
        <p>
          Reused passwords are one of the most common vectors for account compromise. Use a password manager (Bitwarden, 1Password, or KeePassXC) to generate and store unique, strong passwords for every account. Enable breach monitoring to get alerted when your credentials appear in leaked databases.
        </p>

        <h3>5. Two-Factor Authentication (2FA)</h3>
        <p>
          Enable 2FA on every important account. Hardware security keys (YubiKey) provide the strongest protection. Authenticator apps (Google Authenticator, Authy, Aegis) are strong alternatives. Avoid SMS 2FA when possible — SIM swap attacks can compromise SMS-based 2FA.
        </p>

        <h3>6. Encrypted Communication</h3>
        <p>
          Signal provides end-to-end encrypted messaging and voice calls with a minimal data collection policy. ProtonMail and Tutanota offer encrypted email. For sensitive communications, these tools ensure that even if your ISP or email provider is compromised, the content of your communications remains private.
        </p>

        <h2>How to Stay Anonymous Online: Practical Steps</h2>
        <ol>
          <li><strong>Use a VPN from a trusted provider</strong> with a verified no-logs policy and DNS leak protection.</li>
          <li><strong>Enable encrypted DNS</strong> (DoH) in your browser and operating system settings.</li>
          <li><strong>Install uBlock Origin</strong> in your browser to block trackers, ads, and malicious scripts.</li>
          <li><strong>Disable WebRTC</strong> in browsers to prevent IP leaks through video calling APIs.</li>
          <li><strong>Use HTTPS Everywhere</strong> or enable "HTTPS Only" mode in Firefox to force encrypted connections.</li>
          <li><strong>Minimize social media usage</strong> and review privacy settings — limit data sharing to what's strictly necessary.</li>
          <li><strong>Use separate browsers for different activities</strong> — compartmentalization prevents cross-context tracking.</li>
          <li><strong>Regularly audit app permissions</strong> on mobile devices — revoke location, microphone, and contact access from apps that don't need them.</li>
          <li><strong>Use a separate email address</strong> for signups and newsletters to reduce exposure of your primary address.</li>
          <li><strong>Consider a Pi-hole or similar DNS-level ad/tracker blocker</strong> for network-wide protection.</li>
        </ol>

        <h2>ISP Tracking: How to Minimize It</h2>
        <p>
          Completely preventing ISP tracking requires using a VPN that routes all your traffic through an encrypted tunnel, combined with encrypted DNS to prevent even the domain-level visibility your ISP gets from unencrypted DNS queries. Without a VPN, switching to encrypted public DNS (Cloudflare 1.1.1.1 with DoH) significantly reduces — but doesn't eliminate — ISP visibility into your browsing.
        </p>
        <p>
          Even with a VPN and encrypted DNS, your ISP can see the volume and timing of your data transfers and the IP addresses of VPN servers you connect to. For most users, this level of protection is more than sufficient; for those with more serious threat models (journalists, activists, investigators), the Tor network provides additional layers of anonymity.
        </p>

        <h2>Conclusion</h2>
        <p>
          Online privacy is not about having something to hide — it's about controlling your own digital identity and data. The tools and practices described in this guide represent the current best practices for protecting your privacy online in 2025. Start with the basics: use a reputable VPN, enable encrypted DNS, install an ad/tracker blocker, and use strong unique passwords with 2FA on all important accounts. Then use NetWho's tools to verify your protections are working correctly.
        </p>

        <h2>Frequently Asked Questions</h2>
        <FAQ items={faqs} />

        <div className="not-prose mt-8 p-5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.07)]">
          <p className="text-sm font-semibold text-white mb-3">Related Guides & Tools</p>
          <div className="flex flex-wrap gap-2">
            {[
              { to: '/vpn-explained', label: 'VPN Guide' },
              { to: '/dns-leak-explained', label: 'DNS Leak Guide' },
              { to: '/what-is-ip-address', label: 'IP Address Guide' },
              { to: '/vpn-checker', label: 'VPN Checker' },
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
