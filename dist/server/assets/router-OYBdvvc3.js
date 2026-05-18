import { createRootRoute, Link, Outlet, HeadContent, Scripts, useLocation, createFileRoute, redirect, createRouter } from "@tanstack/react-router";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Menu, Globe, X, Shield, Zap, Wifi, BookOpen, Lock, Server, Gauge, Eye, ChevronUp, ChevronDown, AlertTriangle, ShieldAlert, ShieldCheck, CheckCircle, RefreshCw, Info, Clock, Play, RotateCcw, Download, Upload, MapPin, Monitor, Check, Copy, Smartphone, Tablet } from "lucide-react";
import { useRef, useEffect, useState } from "react";
function TopBannerAd() {
  const containerRef = useRef(null);
  const scriptLoadedRef = useRef(false);
  useEffect(() => {
    if (scriptLoadedRef.current || !containerRef.current) return;
    const existingScript = containerRef.current.querySelector('script[data-ad-slot="top-banner"]');
    if (existingScript) {
      scriptLoadedRef.current = true;
      return;
    }
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.dataset.adSlot = "top-banner";
    script.textContent = `(function(s){s.dataset.zone='11022566',s.src='https://n6wxm.com/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`;
    containerRef.current.appendChild(script);
    scriptLoadedRef.current = true;
    return () => {
      if (containerRef.current?.contains(script)) {
        containerRef.current.removeChild(script);
      }
    };
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "ad-slot w-full", ref: containerRef, style: { minHeight: "90px" } });
}
const Route$b = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "NetWho – IP & Network Intelligence Tool | Check Your IP, VPN, DNS" },
      {
        name: "description",
        content: "NetWho is a free IP intelligence platform. Check your IP address, detect VPN/proxy usage, run speed tests, and test for DNS leaks. Protect your online privacy."
      },
      { name: "google-adsense-account", content: "ca-pub-5740499104150490" },
      { name: "theme-color", content: "#070b14" },
      { name: "monetag", content: "3c61f7f1e03424366ce1b1aac1ef9443" }
    ],
    links: [{ rel: "icon", href: "/favicon.ico" }]
  }),
  shellComponent: RootDocument,
  component: RootLayout
});
const toolLinks = [
  { to: "/dashboard", label: "IP Dashboard", icon: Globe },
  { to: "/vpn-checker", label: "VPN Checker", icon: Shield },
  { to: "/speed-test", label: "Speed Test", icon: Zap },
  { to: "/dns-leak", label: "DNS Leak Test", icon: Wifi }
];
const seoLinks = [
  { to: "/what-is-ip-address", label: "What is an IP?", icon: BookOpen },
  { to: "/vpn-explained", label: "VPN Explained", icon: Lock },
  { to: "/dns-leak-explained", label: "DNS Leak Explained", icon: Server },
  { to: "/internet-speed-guide", label: "Speed Test Guide", icon: Gauge },
  { to: "/online-privacy-guide", label: "Privacy Guide", icon: Eye }
];
function Sidebar({ onClose }) {
  const location = useLocation();
  const currentPath = location.pathname;
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-5 py-5 border-b border-[rgba(0,212,255,0.15)]", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#0066ff] flex items-center justify-center shadow-lg shadow-blue-500/30", children: /* @__PURE__ */ jsx(Globe, { className: "w-5 h-5 text-white" }) }),
        /* @__PURE__ */ jsxs("span", { className: "text-xl font-bold tracking-tight", children: [
          /* @__PURE__ */ jsx("span", { className: "text-white", children: "Net" }),
          /* @__PURE__ */ jsx("span", { className: "neon-text", children: "Who" })
        ] })
      ] }),
      onClose && /* @__PURE__ */ jsx("button", { onClick: onClose, className: "lg:hidden text-gray-400 hover:text-white", children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mx-4 my-3 px-3 py-2 rounded-lg bg-[rgba(0,255,136,0.08)] border border-[rgba(0,255,136,0.2)] flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-[#00ff88] pulse-neon" }),
      /* @__PURE__ */ jsx("span", { className: "text-xs text-[#00ff88] font-medium", children: "Network Monitor Active" })
    ] }),
    /* @__PURE__ */ jsxs("nav", { className: "flex-1 overflow-y-auto px-3 py-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold uppercase tracking-widest text-[#4a5c7a] px-3 mb-2 mt-2", children: "Tools" }),
        toolLinks.map(({ to, label, icon: Icon }) => {
          const active = currentPath === to || to !== "/" && currentPath.startsWith(to);
          return /* @__PURE__ */ jsxs(
            Link,
            {
              to,
              className: `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-all duration-150 ${active ? "bg-[rgba(0,212,255,0.1)] text-[#00d4ff] border-l-[3px] border-[#00d4ff] pl-[9px]" : "text-[#8b9ec7] hover:bg-[rgba(255,255,255,0.04)] hover:text-white"}`,
              children: [
                /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4 flex-shrink-0" }),
                label
              ]
            },
            to
          );
        })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold uppercase tracking-widest text-[#4a5c7a] px-3 mb-2", children: "Guides" }),
        seoLinks.map(({ to, label, icon: Icon }) => {
          const active = currentPath === to;
          return /* @__PURE__ */ jsxs(
            Link,
            {
              to,
              className: `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-all duration-150 ${active ? "bg-[rgba(0,212,255,0.1)] text-[#00d4ff] border-l-[3px] border-[#00d4ff] pl-[9px]" : "text-[#8b9ec7] hover:bg-[rgba(255,255,255,0.04)] hover:text-white"}`,
              children: [
                /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4 flex-shrink-0" }),
                label
              ]
            },
            to
          );
        })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "px-4 py-4 border-t border-[rgba(0,212,255,0.1)]", children: /* @__PURE__ */ jsx("p", { className: "text-[11px] text-[#4a5c7a] text-center", children: "© 2025 NetWho · IP Intelligence" }) })
  ] });
}
function RootLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "flex h-screen bg-[#070b14] cyber-grid overflow-hidden", children: [
    /* @__PURE__ */ jsx("aside", { className: "hidden lg:flex w-64 flex-col flex-shrink-0 bg-[#0a1020] border-r border-[rgba(0,212,255,0.12)]", children: /* @__PURE__ */ jsx(Sidebar, {}) }),
    mobileOpen && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 lg:hidden", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 bg-black/70 backdrop-blur-sm",
          onClick: () => setMobileOpen(false)
        }
      ),
      /* @__PURE__ */ jsx("aside", { className: "relative w-72 h-full bg-[#0a1020] border-r border-[rgba(0,212,255,0.2)] flex flex-col", children: /* @__PURE__ */ jsx(Sidebar, { onClose: () => setMobileOpen(false) }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:hidden flex items-center gap-3 px-4 py-3 bg-[#0a1020] border-b border-[rgba(0,212,255,0.12)]", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setMobileOpen(true),
            className: "text-gray-400 hover:text-white",
            children: /* @__PURE__ */ jsx(Menu, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-7 h-7 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#0066ff] flex items-center justify-center", children: /* @__PURE__ */ jsx(Globe, { className: "w-4 h-4 text-white" }) }),
          /* @__PURE__ */ jsxs("span", { className: "font-bold text-lg", children: [
            "Net",
            /* @__PURE__ */ jsx("span", { className: "neon-text", children: "Who" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(TopBannerAd, {}),
      /* @__PURE__ */ jsx("main", { className: "flex-1 overflow-auto", children: /* @__PURE__ */ jsx(Outlet, {}) }),
      /* @__PURE__ */ jsx("div", { className: "ad-slot w-full sticky bottom-0 z-30", style: { minHeight: "60px" }, children: /* @__PURE__ */ jsx("span", { children: "Advertisement · 728×60" }) })
    ] })
  ] });
}
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx(HeadContent, {}),
      "        ",
      /* @__PURE__ */ jsx(
        "script",
        {
          async: true,
          src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5740499104150490",
          crossOrigin: "anonymous"
        }
      ),
      "      "
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {}),
      /* @__PURE__ */ jsx(
        "script",
        {
          dangerouslySetInnerHTML: {
            __html: "(function(s){\n  s.dataset.zone='11022255',\n  s.src='https://nap5k.com/tag.min.js'\n})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))"
          }
        }
      )
    ] })
  ] });
}
const Route$a = createFileRoute("/what-is-ip-address")({
  head: () => ({
    meta: [
      { title: "What is an IP Address? Complete Guide 2025 | NetWho" },
      {
        name: "description",
        content: "Everything you need to know about IP addresses — what they are, how they work, IPv4 vs IPv6, public vs private IPs, and how to check yours. Expert guide with FAQs."
      },
      { name: "keywords", content: "what is an IP address, IP address explained, IPv4 vs IPv6, public IP address, private IP address, how IP works" }
    ]
  }),
  component: WhatIsIp
});
const faqs$4 = [
  {
    q: "What does an IP address look like?",
    a: "An IPv4 address looks like four numbers separated by dots, such as 192.168.1.1 or 203.0.113.42. Numbers range from 0 to 255. IPv6 addresses are longer, using eight groups of four hexadecimal characters separated by colons, such as 2001:0db8:85a3:0000:0000:8a2e:0370:7334."
  },
  {
    q: "Can two devices have the same IP address?",
    a: "No — on the public internet, IP addresses must be globally unique. However, private IP addresses (like 192.168.x.x) can repeat across different private networks (homes, offices) because they are not directly routable on the public internet. NAT (Network Address Translation) allows many private devices to share one public IP."
  },
  {
    q: "How often does my IP address change?",
    a: "Most home internet connections use dynamic IP addresses assigned by your ISP via DHCP. These can change when your router restarts, after your DHCP lease expires (typically every 24–48 hours), or when your ISP reassigns addresses. Businesses often pay extra for static (fixed) IP addresses."
  },
  {
    q: "Can someone find my exact home address from my IP?",
    a: "No. An IP address only reveals your approximate geographic area — typically the city or region where your ISP operates. It cannot pinpoint your home address. Only your ISP has the mapping between your IP address and your physical address, and they share this only with law enforcement under proper legal authority."
  },
  {
    q: "What is my IP address right now?",
    a: "You can check your current public IP address using NetWho's IP Dashboard. It shows your IP address, country, city, region, ZIP code, ISP, and more — all in real time."
  },
  {
    q: "How is IPv6 different from IPv4?",
    a: "IPv4 uses 32-bit addresses providing about 4.3 billion unique addresses — a number now exhausted globally. IPv6 uses 128-bit addresses, providing approximately 340 undecillion addresses. IPv6 also includes built-in security features, better routing efficiency, and eliminates the need for NAT in most cases."
  }
];
function FAQ$4({ items }) {
  const [open, setOpen] = useState(null);
  return /* @__PURE__ */ jsx("div", { children: items.map((item, i) => /* @__PURE__ */ jsxs("div", { className: "faq-item", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: "w-full flex items-center justify-between px-5 py-4 text-left",
        onClick: () => setOpen(open === i ? null : i),
        children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium text-white text-sm", children: item.q }),
          open === i ? /* @__PURE__ */ jsx(ChevronUp, { className: "w-4 h-4 text-[#00d4ff] flex-shrink-0" }) : /* @__PURE__ */ jsx(ChevronDown, { className: "w-4 h-4 text-[#8b9ec7] flex-shrink-0" })
        ]
      }
    ),
    open === i && /* @__PURE__ */ jsx("div", { className: "px-5 pb-4 text-sm text-[#8b9ec7] leading-relaxed border-t border-[rgba(0,212,255,0.1)]", children: /* @__PURE__ */ jsx("p", { className: "pt-3", children: item.a }) })
  ] }, i)) });
}
function WhatIsIp() {
  return /* @__PURE__ */ jsxs("div", { className: "page-transition p-4 lg:p-8 max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-[#4a5c7a] mb-6", children: [
      /* @__PURE__ */ jsx(Link, { to: "/dashboard", className: "hover:text-[#00d4ff]", children: "Home" }),
      /* @__PURE__ */ jsx("span", { children: "/" }),
      /* @__PURE__ */ jsx("span", { className: "text-[#8b9ec7]", children: "What is an IP Address?" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "seo-content", children: [
      /* @__PURE__ */ jsx("h1", { children: "What is an IP Address? A Complete Guide for 2025" }),
      /* @__PURE__ */ jsx("p", { children: "Every device connected to the internet — your smartphone, laptop, smart TV, gaming console, or even your smart refrigerator — has an IP address. But what exactly is an IP address, how does it work, and what can it reveal about you? This comprehensive guide explains everything you need to know about IP addresses in plain language." }),
      /* @__PURE__ */ jsxs("div", { className: "not-prose my-6 p-5 rounded-xl bg-gradient-to-r from-[#0066ff15] to-[#00d4ff10] border border-[rgba(0,212,255,0.2)]", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-white font-medium mb-2", children: "Check Your IP Address Now" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-[#8b9ec7] mb-3", children: "See exactly what your IP address reveals — country, city, ZIP code, ISP, VPN status, and security score." }),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/dashboard",
            className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00d4ff] text-black text-sm font-bold hover:bg-[#00bde0] transition-colors",
            children: "View My IP Dashboard →"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "The Simple Definition: What is an IP Address?" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "IP stands for ",
        /* @__PURE__ */ jsx("strong", { children: "Internet Protocol" }),
        " — the set of rules governing how data is sent and received over the internet. An IP address is a numerical label assigned to each device participating in a network that uses the Internet Protocol for communication."
      ] }),
      /* @__PURE__ */ jsx("p", { children: "Think of an IP address like a postal address for your internet connection. Just as letters need your home address to find you, data packets on the internet need your IP address to reach your device. Without IP addresses, the internet simply could not function — there would be no way to route data to the correct destination." }),
      /* @__PURE__ */ jsx("h2", { children: "How IP Addresses Work" }),
      /* @__PURE__ */ jsx("p", { children: "When you type a website address (like google.com) into your browser, a series of steps occur behind the scenes:" }),
      /* @__PURE__ */ jsxs("ol", { children: [
        /* @__PURE__ */ jsx("li", { children: 'Your device sends a DNS query to translate "google.com" into an IP address (like 142.250.80.46)' }),
        /* @__PURE__ */ jsx("li", { children: "Your router forwards your request, attaching your public IP address as the return address" }),
        /* @__PURE__ */ jsx("li", { children: "Google's servers receive the request and send back the webpage data addressed to your IP" }),
        /* @__PURE__ */ jsx("li", { children: "Your router directs the incoming data to your specific device on your local network" })
      ] }),
      /* @__PURE__ */ jsx("p", { children: "This entire process happens in milliseconds, thousands of times per browsing session." }),
      /* @__PURE__ */ jsx("h2", { children: "IPv4 vs. IPv6: Two Generations of IP Addresses" }),
      /* @__PURE__ */ jsx("h3", { children: "IPv4 — The Original Standard" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "IPv4 (Internet Protocol version 4) has been the foundation of internet addressing since the early 1980s. An IPv4 address consists of four numbers from 0 to 255, separated by periods. Example: ",
        /* @__PURE__ */ jsx("code", { children: "203.0.113.42" }),
        "."
      ] }),
      /* @__PURE__ */ jsx("p", { children: "IPv4 supports approximately 4.3 billion unique addresses — a number that seemed enormous in 1981 but has proven woefully insufficient as billions of internet-connected devices entered the world. IPv4 addresses became officially exhausted globally around 2011, leading to workarounds like NAT (Network Address Translation) and accelerating IPv6 adoption." }),
      /* @__PURE__ */ jsx("h3", { children: "IPv6 — The Modern Standard" }),
      /* @__PURE__ */ jsx("p", { children: "IPv6 (Internet Protocol version 6) was designed to solve the address exhaustion problem. An IPv6 address uses 128 bits instead of IPv4's 32 bits, allowing for approximately 340 undecillion (3.4 × 10^38) unique addresses — effectively unlimited for any foreseeable future." }),
      /* @__PURE__ */ jsxs("p", { children: [
        "An IPv6 address looks like: ",
        /* @__PURE__ */ jsx("code", { children: "2001:0db8:85a3:0000:0000:8a2e:0370:7334" }),
        " — eight groups of four hexadecimal characters separated by colons. IPv6 also includes built-in IPsec security, improved multicast routing, and eliminates the need for NAT."
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "Public vs. Private IP Addresses" }),
      /* @__PURE__ */ jsx("h3", { children: "Public IP Addresses" }),
      /* @__PURE__ */ jsx("p", { children: "A public IP address is assigned by your Internet Service Provider (ISP) and is visible to every website and service you access on the internet. Your home network typically shares one public IP address for all devices, managed through your router using NAT." }),
      /* @__PURE__ */ jsx("p", { children: "Public IP addresses are globally unique — no two devices on the public internet can share the same public IP at the same time. They fall within publicly routable IP ranges assigned by regional internet registries like ARIN (North America), RIPE (Europe), and APNIC (Asia-Pacific)." }),
      /* @__PURE__ */ jsx("h3", { children: "Private IP Addresses" }),
      /* @__PURE__ */ jsx("p", { children: "Private IP addresses are used within local networks (homes, offices, schools) and are not directly accessible from the internet. The Internet Assigned Numbers Authority (IANA) has reserved three ranges for private use:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "10.0.0.0 – 10.255.255.255" }),
          " (Class A — 16 million addresses)"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "172.16.0.0 – 172.31.255.255" }),
          " (Class B — 1 million addresses)"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "192.168.0.0 – 192.168.255.255" }),
          " (Class C — 65,000 addresses)"
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { children: "When your laptop connects to your home Wi-Fi, it gets a private IP like 192.168.1.105. Your router then uses NAT to translate this to your public IP when communicating with the internet." }),
      /* @__PURE__ */ jsx("h2", { children: "Static vs. Dynamic IP Addresses" }),
      /* @__PURE__ */ jsx("h3", { children: "Dynamic IP Addresses" }),
      /* @__PURE__ */ jsx("p", { children: "Most home internet users have dynamic IP addresses — addresses that can change over time, assigned by your ISP through DHCP (Dynamic Host Configuration Protocol). Dynamic IPs allow ISPs to efficiently manage their address pools: when you're not connected, your address can be reassigned to another customer. Dynamic IPs typically change when your router restarts or after your DHCP lease period expires." }),
      /* @__PURE__ */ jsx("h3", { children: "Static IP Addresses" }),
      /* @__PURE__ */ jsx("p", { children: "A static IP address never changes. Businesses, servers, and remote workers often require static IPs to host websites, run VPNs, maintain remote desktop connections, or accept incoming connections reliably. ISPs charge more for static IP addresses due to the dedicated address allocation." }),
      /* @__PURE__ */ jsx("h2", { children: "What Information Does an IP Address Reveal?" }),
      /* @__PURE__ */ jsx("p", { children: "Contrary to common misconceptions, an IP address does not reveal your exact home address, your name, or your personal details. However, it does expose:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Approximate geographic location:" }),
          " Usually accurate to city or region level"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "ZIP / Postal code:" }),
          " Often determinable from IP geolocation databases"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Internet Service Provider (ISP):" }),
          " The company providing your internet connection"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Connection type:" }),
          " Residential, business, mobile, or datacenter"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "ASN (Autonomous System Number):" }),
          " Your ISP's network identifier"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Timezone:" }),
          " Your approximate time zone based on location"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "not-prose my-6 p-5 rounded-xl bg-gradient-to-r from-[#0066ff15] to-[#00d4ff10] border border-[rgba(0,212,255,0.2)]", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-white font-medium mb-1", children: "See What Your IP Reveals" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-[#8b9ec7] mb-3", children: "Use NetWho's dashboard to see your complete IP profile including ZIP code, ISP, ASN, timezone, and security risk score." }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3 flex-wrap", children: [
          /* @__PURE__ */ jsx(Link, { to: "/dashboard", className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00d4ff] text-black text-sm font-bold hover:bg-[#00bde0] transition-colors", children: "Check My IP →" }),
          /* @__PURE__ */ jsx(Link, { to: "/vpn-checker", className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[rgba(0,212,255,0.3)] text-[#00d4ff] text-sm font-medium hover:bg-[rgba(0,212,255,0.1)] transition-colors", children: "VPN Checker" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "How to Check Your IP Address" }),
      /* @__PURE__ */ jsx("p", { children: "There are several ways to find your current IP address:" }),
      /* @__PURE__ */ jsxs("ol", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Use an IP lookup tool:" }),
          " The fastest method — tools like NetWho's dashboard show your public IP instantly along with full geolocation details."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Windows Command Prompt:" }),
          " Type ",
          /* @__PURE__ */ jsx("code", { children: "ipconfig" }),
          " to see your local (private) IP address."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Mac Terminal:" }),
          " Type ",
          /* @__PURE__ */ jsx("code", { children: "ifconfig" }),
          " or ",
          /* @__PURE__ */ jsx("code", { children: "ipconfig getifaddr en0" }),
          "."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Linux Terminal:" }),
          " Use ",
          /* @__PURE__ */ jsx("code", { children: "ip addr show" }),
          " or ",
          /* @__PURE__ */ jsx("code", { children: "hostname -I" }),
          "."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Router admin page:" }),
          " Log into your router (usually at 192.168.1.1) to see your public WAN IP."
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "How to Hide or Change Your IP Address" }),
      /* @__PURE__ */ jsx("p", { children: "Several methods can mask or change your public IP address for privacy, security, or bypassing geographic restrictions:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "VPN (Virtual Private Network):" }),
          " Routes your traffic through a server in another location, replacing your IP with the VPN server's IP. The most popular and effective method."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Tor Network:" }),
          " Routes traffic through multiple volunteer-operated nodes, providing strong anonymity but significantly slower speeds."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Proxy Server:" }),
          " Acts as an intermediary between your device and websites. Less secure than VPNs as they typically don't encrypt traffic."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Mobile Data:" }),
          " Switching from home Wi-Fi to mobile data gives you a different carrier-assigned IP address."
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "IP Addresses and Online Privacy" }),
      /* @__PURE__ */ jsx("p", { children: "Every website you visit logs your IP address. Advertisers use IP addresses for geographic targeting and building behavioral profiles. Governments can subpoena your ISP to match IP addresses to subscriber accounts. Understanding these privacy implications is the first step to protecting yourself online." }),
      /* @__PURE__ */ jsx("h2", { children: "Conclusion" }),
      /* @__PURE__ */ jsx("p", { children: "IP addresses are the foundation of internet communication — invisible to most users yet constantly at work routing trillions of data packets across global networks. Understanding what your IP address is, what it reveals, and how to protect it is fundamental to digital literacy in 2025. Use NetWho's suite of tools to monitor your IP, check for VPN detection, test for DNS leaks, and measure your connection speed." }),
      /* @__PURE__ */ jsx("h2", { children: "Frequently Asked Questions" }),
      /* @__PURE__ */ jsx(FAQ$4, { items: faqs$4 }),
      /* @__PURE__ */ jsxs("div", { className: "not-prose mt-8 p-5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.07)]", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-white mb-3", children: "Related Guides & Tools" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: [
          { to: "/vpn-explained", label: "VPN Explained" },
          { to: "/dns-leak-explained", label: "DNS Leak Guide" },
          { to: "/online-privacy-guide", label: "Privacy Guide" },
          { to: "/internet-speed-guide", label: "Speed Test Guide" },
          { to: "/dashboard", label: "IP Dashboard" },
          { to: "/vpn-checker", label: "VPN Checker" }
        ].map(({ to, label }) => /* @__PURE__ */ jsx(
          Link,
          {
            to,
            className: "px-3 py-1.5 rounded-lg text-xs text-[#00d4ff] border border-[rgba(0,212,255,0.2)] hover:bg-[rgba(0,212,255,0.1)] transition-colors",
            children: label
          },
          to
        )) })
      ] })
    ] })
  ] });
}
const Route$9 = createFileRoute("/vpn-explained")({
  head: () => ({
    meta: [
      { title: "What is a VPN and How Does It Work? Complete Guide 2025 | NetWho" },
      {
        name: "description",
        content: "Learn what a VPN is, how VPNs work, the difference between VPN protocols, and how websites detect VPN usage. Complete guide with FAQ."
      }
    ]
  }),
  component: VpnExplained
});
const faqs$3 = [
  {
    q: "Does a VPN make me completely anonymous online?",
    a: "No. A VPN hides your IP address from websites and encrypts your traffic from your ISP, but the VPN provider itself can see your activity. Additionally, websites can still identify you through cookies, browser fingerprinting, and logged accounts. A VPN is one layer of privacy, not complete anonymity."
  },
  {
    q: "Will a VPN slow down my internet?",
    a: "Yes, typically by 10–30%. The encryption overhead and longer routing path add latency. Premium VPN providers with large server networks minimize this impact. Protocols like WireGuard offer much better performance than older protocols like OpenVPN or PPTP."
  },
  {
    q: "Can my ISP see what I do with a VPN?",
    a: "Your ISP can see that you are using a VPN (they can identify VPN server IPs), but they cannot see the content of your encrypted traffic. They know you are connected to a VPN server but not what websites you are visiting or what data you are transmitting."
  },
  {
    q: "Why is Netflix blocking my VPN?",
    a: 'Netflix and other streaming platforms use VPN detection to enforce geographic content licensing agreements. They maintain lists of known VPN server IP ranges and block connections from them. Some premium VPNs offer "obfuscated" servers specifically designed to bypass streaming platform blocks.'
  },
  {
    q: "What is the difference between a VPN and a proxy?",
    a: "A VPN encrypts all your internet traffic at the system level and routes it through a server. A proxy only redirects traffic from specific applications (like your browser) and typically does not encrypt data. VPNs provide stronger privacy protection, while proxies are faster and simpler for basic IP masking."
  },
  {
    q: "Is using a VPN legal?",
    a: "In most countries, yes. VPN use is completely legal in the US, UK, EU, Canada, Australia, and most democratic nations. However, some countries restrict or ban VPN use, including China, Russia, Iran, North Korea, and Belarus. Always check local laws before using a VPN abroad."
  }
];
function FAQ$3({ items }) {
  const [open, setOpen] = useState(null);
  return /* @__PURE__ */ jsx("div", { children: items.map((item, i) => /* @__PURE__ */ jsxs("div", { className: "faq-item", children: [
    /* @__PURE__ */ jsxs("button", { className: "w-full flex items-center justify-between px-5 py-4 text-left", onClick: () => setOpen(open === i ? null : i), children: [
      /* @__PURE__ */ jsx("span", { className: "font-medium text-white text-sm", children: item.q }),
      open === i ? /* @__PURE__ */ jsx(ChevronUp, { className: "w-4 h-4 text-[#00d4ff] flex-shrink-0" }) : /* @__PURE__ */ jsx(ChevronDown, { className: "w-4 h-4 text-[#8b9ec7] flex-shrink-0" })
    ] }),
    open === i && /* @__PURE__ */ jsx("div", { className: "px-5 pb-4 text-sm text-[#8b9ec7] leading-relaxed border-t border-[rgba(0,212,255,0.1)]", children: /* @__PURE__ */ jsx("p", { className: "pt-3", children: item.a }) })
  ] }, i)) });
}
function VpnExplained() {
  return /* @__PURE__ */ jsxs("div", { className: "page-transition p-4 lg:p-8 max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-[#4a5c7a] mb-6", children: [
      /* @__PURE__ */ jsx(Link, { to: "/dashboard", className: "hover:text-[#00d4ff]", children: "Home" }),
      /* @__PURE__ */ jsx("span", { children: "/" }),
      /* @__PURE__ */ jsx("span", { className: "text-[#8b9ec7]", children: "VPN Explained" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "seo-content", children: [
      /* @__PURE__ */ jsx("h1", { children: "What is a VPN and How Does It Work? Complete 2025 Guide" }),
      /* @__PURE__ */ jsx("p", { children: "A Virtual Private Network (VPN) is one of the most powerful tools for online privacy and security. Yet many users rely on VPNs without fully understanding how they work, what protections they provide, and — critically — what they cannot do. This comprehensive guide covers everything from VPN fundamentals to advanced protocol comparisons." }),
      /* @__PURE__ */ jsxs("div", { className: "not-prose my-6 p-5 rounded-xl bg-gradient-to-r from-[#0066ff15] to-[#00d4ff10] border border-[rgba(0,212,255,0.2)]", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-white font-medium mb-1", children: "Is Your VPN Working?" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-[#8b9ec7] mb-3", children: "Test whether your VPN is properly masking your IP address and protecting your connection right now." }),
        /* @__PURE__ */ jsx(Link, { to: "/vpn-checker", className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00d4ff] text-black text-sm font-bold hover:bg-[#00bde0] transition-colors", children: "Check VPN Status →" })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "What is a VPN?" }),
      /* @__PURE__ */ jsx("p", { children: "A VPN creates an encrypted tunnel between your device and a server operated by the VPN provider. All your internet traffic passes through this tunnel, hiding its contents from your ISP, network administrators, and anyone monitoring the network. Your real IP address is replaced by the VPN server's IP address, making it appear as if your traffic originates from the server's location." }),
      /* @__PURE__ */ jsx("p", { children: "Originally developed for businesses to give remote employees secure access to corporate networks, VPNs are now widely used by millions of individuals for privacy, security, and bypassing geographic content restrictions." }),
      /* @__PURE__ */ jsx("h2", { children: "How a VPN Works: Step by Step" }),
      /* @__PURE__ */ jsxs("ol", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Connection initiation:" }),
          " Your VPN client authenticates with the VPN server using cryptographic keys or certificates."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Tunnel establishment:" }),
          " An encrypted tunnel is created between your device and the VPN server using protocols like WireGuard, OpenVPN, or IKEv2."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Traffic routing:" }),
          " All your internet traffic is redirected through this encrypted tunnel instead of going directly to websites."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "IP substitution:" }),
          " The VPN server forwards your requests to websites using its own IP address, not yours."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Return routing:" }),
          " Responses come back to the VPN server, which decrypts and forwards them back to your device through the tunnel."
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "VPN Protocols: Which is Best?" }),
      /* @__PURE__ */ jsx("h3", { children: "WireGuard" }),
      /* @__PURE__ */ jsx("p", { children: "The newest and fastest VPN protocol, WireGuard uses state-of-the-art cryptography and requires only ~4,000 lines of code (compared to OpenVPN's 400,000+ lines). This simplicity makes it auditable, secure, and significantly faster than older protocols. Most leading VPN providers now support WireGuard as their primary protocol." }),
      /* @__PURE__ */ jsx("h3", { children: "OpenVPN" }),
      /* @__PURE__ */ jsx("p", { children: "The longtime industry standard, OpenVPN is highly configurable, battle-tested, and works on virtually every platform. It's slower than WireGuard due to its older codebase but remains one of the most trusted protocols. Available in TCP and UDP modes — UDP is faster, TCP is more reliable on unstable connections." }),
      /* @__PURE__ */ jsx("h3", { children: "IKEv2/IPSec" }),
      /* @__PURE__ */ jsx("p", { children: "Excellent for mobile devices because it handles network switching (Wi-Fi to mobile data) gracefully without dropping the VPN connection. Fast, stable, and natively supported on iOS and macOS." }),
      /* @__PURE__ */ jsx("h3", { children: "PPTP and L2TP (Legacy)" }),
      /* @__PURE__ */ jsx("p", { children: "PPTP is outdated and has known security vulnerabilities — avoid it. L2TP/IPSec is more secure but slower than modern alternatives. These older protocols should be avoided when better options are available." }),
      /* @__PURE__ */ jsx("h2", { children: "What a VPN Protects and What It Doesn't" }),
      /* @__PURE__ */ jsx("h3", { children: "VPN Protections" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "Hides your real IP address from websites and services" }),
        /* @__PURE__ */ jsx("li", { children: "Encrypts your traffic from your ISP's view" }),
        /* @__PURE__ */ jsx("li", { children: "Protects you on public Wi-Fi networks (airports, cafes, hotels)" }),
        /* @__PURE__ */ jsx("li", { children: "Prevents ISP throttling of specific services" }),
        /* @__PURE__ */ jsx("li", { children: "Bypasses geographic restrictions on content" }),
        /* @__PURE__ */ jsx("li", { children: "Prevents man-in-the-middle attacks on local networks" })
      ] }),
      /* @__PURE__ */ jsx("h3", { children: "What VPNs Cannot Do" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "VPNs cannot prevent tracking via cookies or browser fingerprinting" }),
        /* @__PURE__ */ jsx("li", { children: "VPNs cannot hide activity from logged-in accounts (Google, Facebook, etc.)" }),
        /* @__PURE__ */ jsx("li", { children: "VPNs cannot protect against malware or phishing attacks" }),
        /* @__PURE__ */ jsx("li", { children: "The VPN provider can still see your traffic" }),
        /* @__PURE__ */ jsxs("li", { children: [
          "VPNs may leak DNS queries if not properly configured (see our ",
          /* @__PURE__ */ jsx(Link, { to: "/dns-leak", children: "DNS Leak Test" }),
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "How Websites Detect VPN Usage" }),
      /* @__PURE__ */ jsx("p", { children: "Major platforms invest heavily in VPN detection. The primary detection methods include:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "IP range databases:" }),
          " VPN providers use datacenters with well-known IP ranges. Streaming platforms and fraud detection systems maintain updated lists of these ranges."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "ASN analysis:" }),
          " Autonomous System Numbers identify network operators. If your ASN belongs to a known VPN provider or datacenter, you will be flagged."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Reverse DNS lookup:" }),
          ' VPN servers often have hostnames that reveal their datacenter nature (e.g., "vpn-server-us-east.provider.com").'
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Port fingerprinting:" }),
          " Certain VPN protocols use distinctive port patterns that deep packet inspection (DPI) can identify."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Behavioral analysis:" }),
          " Traffic patterns from VPN servers differ from residential connections in detectable ways."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "not-prose my-6 p-5 rounded-xl bg-gradient-to-r from-[#0066ff15] to-[#00d4ff10] border border-[rgba(0,212,255,0.2)]", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-white font-medium mb-1", children: "Check Your VPN Detection Status" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-[#8b9ec7] mb-3", children: "See if your VPN is being detected by websites and get a detailed security report." }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3 flex-wrap", children: [
          /* @__PURE__ */ jsx(Link, { to: "/vpn-checker", className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00d4ff] text-black text-sm font-bold hover:bg-[#00bde0] transition-colors", children: "VPN Checker →" }),
          /* @__PURE__ */ jsx(Link, { to: "/dns-leak", className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[rgba(0,212,255,0.3)] text-[#00d4ff] text-sm font-medium hover:bg-[rgba(0,212,255,0.1)] transition-colors", children: "DNS Leak Test" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "Choosing the Right VPN" }),
      /* @__PURE__ */ jsx("p", { children: "Key factors to evaluate when selecting a VPN provider:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "No-logs policy:" }),
          " Verified through independent audits, not just marketing claims"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Jurisdiction:" }),
          " VPN providers in 14-Eyes countries may be legally compelled to share user data"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Protocol support:" }),
          " WireGuard support indicates a modern, performance-focused provider"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Kill switch:" }),
          " Automatically blocks internet access if the VPN drops, preventing IP exposure"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "DNS leak protection:" }),
          " Built-in protection against DNS queries bypassing the VPN tunnel"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Server count and locations:" }),
          " More servers reduce congestion and offer more location options"
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "Conclusion" }),
      /* @__PURE__ */ jsx("p", { children: "A VPN is a powerful privacy tool when used correctly and with realistic expectations. It significantly improves your privacy posture by hiding your IP, encrypting your traffic, and protecting you on public networks. However, it's not a silver bullet — combine it with browser privacy settings, DNS leak protection, and good security hygiene for comprehensive online privacy. Always verify your VPN is working correctly using tools like NetWho's VPN Checker and DNS Leak Test." }),
      /* @__PURE__ */ jsx("h2", { children: "Frequently Asked Questions" }),
      /* @__PURE__ */ jsx(FAQ$3, { items: faqs$3 }),
      /* @__PURE__ */ jsxs("div", { className: "not-prose mt-8 p-5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.07)]", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-white mb-3", children: "Related Guides & Tools" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: [
          { to: "/what-is-ip-address", label: "What is an IP?" },
          { to: "/dns-leak-explained", label: "DNS Leak Guide" },
          { to: "/online-privacy-guide", label: "Privacy Guide" },
          { to: "/vpn-checker", label: "VPN Checker Tool" },
          { to: "/dns-leak", label: "DNS Leak Test" },
          { to: "/dashboard", label: "IP Dashboard" }
        ].map(({ to, label }) => /* @__PURE__ */ jsx(Link, { to, className: "px-3 py-1.5 rounded-lg text-xs text-[#00d4ff] border border-[rgba(0,212,255,0.2)] hover:bg-[rgba(0,212,255,0.1)] transition-colors", children: label }, to)) })
      ] })
    ] })
  ] });
}
const Route$8 = createFileRoute("/vpn-checker")({
  head: () => ({
    meta: [
      { title: "VPN & Proxy Detector – Check If Your VPN Is Working | NetWho" },
      {
        name: "description",
        content: "Instantly detect if your IP is flagged as a VPN, proxy, or Tor exit node. Get a security score and risk level assessment for your current connection."
      }
    ]
  }),
  component: VpnChecker
});
function ScoreBar({ score, riskLevel }) {
  const colorMap = {
    "Low Risk": "#00ff88",
    "Medium Risk": "#ff9f00",
    "High Risk": "#ff6b35",
    Dangerous: "#ff2d55"
  };
  const color = colorMap[riskLevel] || "#00d4ff";
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
      /* @__PURE__ */ jsx("span", { className: "text-sm text-[#8b9ec7]", children: "Security Score" }),
      /* @__PURE__ */ jsxs("span", { className: "text-2xl font-bold", style: { color }, children: [
        score,
        "/100"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "h-4 rounded-full bg-[rgba(255,255,255,0.07)] overflow-hidden", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: "h-full rounded-full transition-all duration-1000",
        style: {
          width: `${score}%`,
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          boxShadow: `0 0 12px ${color}66`
        }
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs text-[#4a5c7a] mt-1", children: [
      /* @__PURE__ */ jsx("span", { children: "Dangerous" }),
      /* @__PURE__ */ jsx("span", { children: "High" }),
      /* @__PURE__ */ jsx("span", { children: "Medium" }),
      /* @__PURE__ */ jsx("span", { children: "Low Risk" })
    ] })
  ] });
}
function VpnChecker() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ip");
      if (!res.ok) throw new Error("Request failed");
      const json = await res.json();
      setData(json);
    } catch {
      setError("Could not perform VPN check. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  const riskColorMap = {
    "Low Risk": "#00ff88",
    "Medium Risk": "#ff9f00",
    "High Risk": "#ff6b35",
    Dangerous: "#ff2d55"
  };
  data ? riskColorMap[data.riskLevel] || "#00d4ff" : "#00d4ff";
  return /* @__PURE__ */ jsxs("div", { className: "page-transition p-4 lg:p-6 max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-2xl lg:text-3xl font-bold text-white", children: [
        "VPN / Proxy ",
        /* @__PURE__ */ jsx("span", { className: "neon-text", children: "Checker" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-[#8b9ec7] text-sm mt-1", children: "Instantly detect if your connection is routed through a VPN, proxy, or datacenter IP." })
    ] }),
    error && /* @__PURE__ */ jsxs("div", { className: "mb-4 p-4 rounded-xl bg-[#ff2d5515] border border-[#ff2d5540] text-[#ff2d55] flex items-center gap-3", children: [
      /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5 flex-shrink-0" }),
      error,
      /* @__PURE__ */ jsx("button", { onClick: fetchData, className: "ml-auto text-sm underline", children: "Retry" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "glass-card p-6 mb-5", children: loading ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "h-8 w-48 rounded shimmer" }),
      /* @__PURE__ */ jsx("div", { className: "h-16 rounded-xl shimmer" }),
      /* @__PURE__ */ jsx("div", { className: "h-4 rounded shimmer" })
    ] }) : data ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: `rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 ${data.vpnDetected ? "bg-[#ff2d5512] border border-[#ff2d5540]" : "bg-[#00ff8812] border border-[#00ff8840]"}`,
          children: [
            data.vpnDetected ? /* @__PURE__ */ jsx(ShieldAlert, { className: "w-16 h-16 text-[#ff2d55] flex-shrink-0" }) : /* @__PURE__ */ jsx(ShieldCheck, { className: "w-16 h-16 text-[#00ff88] flex-shrink-0" }),
            /* @__PURE__ */ jsxs("div", { className: "text-center sm:text-left", children: [
              /* @__PURE__ */ jsx("p", { className: `text-2xl font-bold ${data.vpnDetected ? "text-[#ff2d55]" : "text-[#00ff88]"}`, children: data.vpnDetected ? "VPN / Proxy Detected" : "No VPN or Proxy Detected" }),
              /* @__PURE__ */ jsxs("p", { className: "text-[#8b9ec7] mt-2 text-sm", children: [
                "IP: ",
                /* @__PURE__ */ jsx("span", { className: "font-mono text-white", children: data.ip }),
                " · ",
                data.isp,
                " · ",
                data.city,
                ", ",
                data.country
              ] }),
              data.vpnDetected && /* @__PURE__ */ jsxs("p", { className: "text-[#ff9f00] text-sm mt-2 flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(AlertTriangle, { className: "w-4 h-4" }),
                "Your real location may be hidden from websites you visit."
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx(ScoreBar, { score: data.score, riskLevel: data.riskLevel }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
        { label: "HTTP Proxy", detected: data.proxy },
        { label: "Datacenter / VPN Hosting", detected: data.hosting },
        { label: "VPN Active", detected: data.vpnDetected }
      ].map(({ label, detected }) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: `rounded-xl p-4 text-center ${detected ? "bg-[#ff2d5510] border border-[#ff2d5530]" : "bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)]"}`,
          children: [
            /* @__PURE__ */ jsx("div", { className: "mb-2", children: detected ? /* @__PURE__ */ jsx(ShieldAlert, { className: "w-6 h-6 text-[#ff2d55] mx-auto" }) : /* @__PURE__ */ jsx(CheckCircle, { className: "w-6 h-6 text-[#00ff88] mx-auto" }) }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-[#8b9ec7] mb-1", children: label }),
            /* @__PURE__ */ jsx(
              "p",
              {
                className: `text-sm font-bold ${detected ? "text-[#ff2d55]" : "text-[#00ff88]"}`,
                children: detected ? "DETECTED" : "NOT DETECTED"
              }
            )
          ]
        },
        label
      )) }),
      data.riskFactors.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-[#8b9ec7] mb-2", children: "Risk Factors" }),
        data.riskFactors.map((f) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-[#ff9f00] mb-1.5", children: [
          /* @__PURE__ */ jsx(AlertTriangle, { className: "w-4 h-4 flex-shrink-0" }),
          f
        ] }, f))
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3 flex-wrap", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: fetchData,
            className: "flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.3)] text-[#00d4ff] text-sm font-medium hover:bg-[rgba(0,212,255,0.15)] transition-colors",
            children: [
              /* @__PURE__ */ jsx(RefreshCw, { className: "w-4 h-4" }),
              "Re-check"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/dashboard",
            className: "flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white text-sm font-medium hover:bg-[rgba(255,255,255,0.08)] transition-colors",
            children: [
              /* @__PURE__ */ jsx(Shield, { className: "w-4 h-4" }),
              "Full IP Dashboard"
            ]
          }
        )
      ] })
    ] }) : null }),
    /* @__PURE__ */ jsx(TopBannerAd, {}),
    /* @__PURE__ */ jsxs("div", { className: "glass-card p-6 seo-content", children: [
      /* @__PURE__ */ jsx("h2", { children: "How VPN and Proxy Detection Works" }),
      /* @__PURE__ */ jsx("p", { children: "When you connect to the internet, your IP address is publicly visible to every website and service you access. VPN detection works by cross-referencing your IP address against databases of known VPN provider IP ranges, proxy servers, and datacenter hosting environments." }),
      /* @__PURE__ */ jsx("h3", { children: "What We Check" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "HTTP Proxy Detection:" }),
          " Identifies forwarded headers and known proxy IP ranges used by HTTP proxies."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Datacenter / Hosting IP Detection:" }),
          " Compares your IP against known cloud provider, VPN provider, and datacenter AS (Autonomous System) numbers. Consumer ISPs allocate IPs in residential blocks, while VPN providers use datacenters."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "IP Reputation Score:" }),
          " Aggregates signals from multiple sources to produce a 0–100 security score."
        ] })
      ] }),
      /* @__PURE__ */ jsx("h3", { children: "Why Websites Detect VPN Usage" }),
      /* @__PURE__ */ jsx("p", { children: "Streaming platforms like Netflix, Hulu, and Disney+ use VPN detection to enforce geographic content licensing. Banks and financial institutions flag VPN connections as potential fraud indicators. E-commerce sites use it to prevent price manipulation across regions." }),
      /* @__PURE__ */ jsx("h3", { children: "Limitations of VPN Detection" }),
      /* @__PURE__ */ jsx("p", { children: "No detection method is 100% accurate. Some residential VPN services route traffic through home IP addresses, making detection significantly harder. Detection accuracy depends on how frequently VPN provider IP ranges are updated in threat intelligence databases." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 p-4 rounded-xl bg-[rgba(0,212,255,0.05)] border border-[rgba(0,212,255,0.15)] flex gap-3", children: [
        /* @__PURE__ */ jsx(Info, { className: "w-5 h-5 text-[#00d4ff] flex-shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-[#8b9ec7]", children: [
          "Want to learn more about VPNs and how they work?",
          " ",
          /* @__PURE__ */ jsx(Link, { to: "/vpn-explained", className: "text-[#00d4ff]", children: "Read our complete VPN guide →" })
        ] }) })
      ] })
    ] })
  ] });
}
const Route$7 = createFileRoute("/speed-test")({
  head: () => ({
    meta: [
      { title: "Internet Speed Test – Check Download, Upload & Ping | NetWho" },
      {
        name: "description",
        content: "Test your internet connection speed. Measure download speed, upload speed, and ping latency instantly with NetWho's free speed test tool."
      }
    ]
  }),
  component: SpeedTest
});
function SpeedGauge({
  value,
  max,
  label,
  unit,
  color,
  active
}) {
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(value / max, 1);
  const offset = circumference - pct * circumference;
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative w-40 h-40", children: [
      /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 160 160", className: "w-full h-full -rotate-90", children: [
        /* @__PURE__ */ jsx("circle", { cx: "80", cy: "80", r: radius, fill: "none", stroke: "rgba(255,255,255,0.06)", strokeWidth: "10" }),
        /* @__PURE__ */ jsx(
          "circle",
          {
            cx: "80",
            cy: "80",
            r: radius,
            fill: "none",
            stroke: color,
            strokeWidth: "10",
            strokeLinecap: "round",
            strokeDasharray: circumference,
            strokeDashoffset: offset,
            style: {
              transition: "stroke-dashoffset 0.3s ease",
              filter: active ? `drop-shadow(0 0 8px ${color})` : void 0
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-white", children: value.toFixed(1) }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-[#8b9ec7]", children: unit })
      ] })
    ] }),
    /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-[#8b9ec7]", children: label })
  ] });
}
async function simulateSpeedTest(onProgress) {
  onProgress("ping", 0);
  await delay(400);
  const ping = Math.floor(Math.random() * 25) + 8;
  onProgress("ping", ping);
  await delay(600);
  onProgress("download", 0);
  const targetDownload = Math.random() * 400 + 50;
  for (let i = 0; i <= 20; i++) {
    const progress = easeOut(i / 20) * targetDownload;
    onProgress("download", progress);
    await delay(200);
  }
  onProgress("upload", 0);
  const targetUpload = targetDownload * (0.2 + Math.random() * 0.3);
  for (let i = 0; i <= 15; i++) {
    const progress = easeOut(i / 15) * targetUpload;
    onProgress("upload", progress);
    await delay(180);
  }
  return { ping, download: targetDownload, upload: targetUpload };
}
function easeOut(t) {
  return 1 - Math.pow(1 - t, 3);
}
function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
function ratingLabel(mbps) {
  if (mbps >= 200) return { label: "Excellent", color: "#00ff88" };
  if (mbps >= 50) return { label: "Good", color: "#00d4ff" };
  if (mbps >= 10) return { label: "Fair", color: "#ff9f00" };
  return { label: "Poor", color: "#ff2d55" };
}
function SpeedTest() {
  const [phase, setPhase] = useState("idle");
  const [liveValue, setLiveValue] = useState(0);
  const [results, setResults] = useState(null);
  const isRunning = phase !== "idle" && phase !== "done";
  async function startTest() {
    setResults(null);
    setPhase("idle");
    const final = await simulateSpeedTest((p, v) => {
      setPhase(p);
      setLiveValue(v);
    });
    setResults(final);
    setPhase("done");
  }
  const dlRating = results ? ratingLabel(results.download) : null;
  const ulRating = results ? ratingLabel(results.upload) : null;
  return /* @__PURE__ */ jsxs("div", { className: "page-transition p-4 lg:p-6 max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-2xl lg:text-3xl font-bold text-white", children: [
        "Internet ",
        /* @__PURE__ */ jsx("span", { className: "neon-text", children: "Speed Test" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-[#8b9ec7] text-sm mt-1", children: "Measure your real-time download speed, upload speed, and latency (ping)." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "glass-card p-6 mb-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-8 mb-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: `w-40 h-40 rounded-full flex flex-col items-center justify-center border-4 ${phase === "ping" ? "border-[#00d4ff]" : "border-[rgba(255,255,255,0.1)]"}`,
              style: phase === "ping" ? { boxShadow: "0 0 20px rgba(0,212,255,0.3)" } : void 0,
              children: [
                /* @__PURE__ */ jsx(Clock, { className: `w-6 h-6 mb-1 ${phase === "ping" ? "text-[#00d4ff]" : "text-[#4a5c7a]"}` }),
                /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-white", children: phase === "ping" ? Math.round(liveValue) : results ? results.ping : "--" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs text-[#8b9ec7]", children: "ms" })
              ]
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-[#8b9ec7]", children: "Ping" })
        ] }),
        /* @__PURE__ */ jsx(
          SpeedGauge,
          {
            value: phase === "download" ? liveValue : results ? results.download : 0,
            max: 500,
            label: "Download",
            unit: "Mbps",
            color: "#00d4ff",
            active: phase === "download"
          }
        ),
        /* @__PURE__ */ jsx(
          SpeedGauge,
          {
            value: phase === "upload" ? liveValue : results ? results.upload : 0,
            max: 200,
            label: "Upload",
            unit: "Mbps",
            color: "#0066ff",
            active: phase === "upload"
          }
        )
      ] }),
      isRunning && /* @__PURE__ */ jsx("div", { className: "text-center mb-6", children: /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.2)]", children: [
        /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-[#00d4ff] pulse-neon" }),
        /* @__PURE__ */ jsxs("span", { className: "text-sm text-[#00d4ff] font-medium", children: [
          phase === "ping" && "Testing ping latency...",
          phase === "download" && `Testing download speed... ${liveValue.toFixed(0)} Mbps`,
          phase === "upload" && `Testing upload speed... ${liveValue.toFixed(0)} Mbps`
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-center", children: [
        phase === "idle" && /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: startTest,
            className: "flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#0066ff] to-[#00d4ff] text-white font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-200",
            children: [
              /* @__PURE__ */ jsx(Play, { className: "w-6 h-6" }),
              "Start Speed Test"
            ]
          }
        ),
        isRunning && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-8 py-4 rounded-2xl bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.3)]", children: [
          /* @__PURE__ */ jsx(Zap, { className: "w-5 h-5 text-[#00d4ff] pulse-neon" }),
          /* @__PURE__ */ jsx("span", { className: "text-[#00d4ff] font-medium", children: "Running test..." })
        ] }),
        phase === "done" && /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: startTest,
            className: "flex items-center gap-2 px-6 py-3 rounded-xl bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.3)] text-[#00d4ff] font-medium hover:bg-[rgba(0,212,255,0.15)] transition-colors",
            children: [
              /* @__PURE__ */ jsx(RotateCcw, { className: "w-4 h-4" }),
              "Test Again"
            ]
          }
        )
      ] }),
      results && phase === "done" && /* @__PURE__ */ jsx("div", { className: "mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
        { label: "Ping Latency", value: `${results.ping} ms`, icon: Clock, color: "#00d4ff", note: results.ping < 20 ? "Excellent" : results.ping < 50 ? "Good" : "Average" },
        { label: "Download Speed", value: `${results.download.toFixed(1)} Mbps`, icon: Download, color: dlRating.color, note: dlRating.label },
        { label: "Upload Speed", value: `${results.upload.toFixed(1)} Mbps`, icon: Upload, color: ulRating.color, note: ulRating.label }
      ].map(({ label, value, icon: Icon, color, note }) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl p-4 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] text-center", children: [
        /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5 mx-auto mb-2", style: { color } }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-[#8b9ec7] mb-1", children: label }),
        /* @__PURE__ */ jsx("p", { className: "text-xl font-bold text-white", children: value }),
        /* @__PURE__ */ jsx("p", { className: "text-xs font-medium mt-1", style: { color }, children: note })
      ] }, label)) })
    ] }),
    /* @__PURE__ */ jsx(TopBannerAd, {}),
    /* @__PURE__ */ jsxs("div", { className: "glass-card p-6 seo-content", children: [
      /* @__PURE__ */ jsx("h2", { children: "Understanding Internet Speed Test Results" }),
      /* @__PURE__ */ jsx("p", { children: "An internet speed test measures three key metrics that determine the quality of your internet connection: download speed, upload speed, and ping latency. Understanding these metrics helps you identify performance issues, evaluate your ISP's service quality, and choose the right plan for your needs." }),
      /* @__PURE__ */ jsx("h3", { children: "What is Download Speed?" }),
      /* @__PURE__ */ jsx("p", { children: "Download speed is measured in Megabits per second (Mbps) and refers to how quickly data travels from the internet to your device. This affects streaming video, loading websites, downloading files, and gaming. For most households, 25 Mbps is the FCC's minimum broadband standard, but modern streaming services recommend at least 25 Mbps for 4K content." }),
      /* @__PURE__ */ jsx("h3", { children: "What is Upload Speed?" }),
      /* @__PURE__ */ jsx("p", { children: "Upload speed determines how fast data travels from your device to the internet. This impacts video calls, live streaming, cloud backups, and uploading files. Most ISPs provide asymmetric connections where download is faster than upload. Symmetric connections (equal download and upload) are common with fiber optic services." }),
      /* @__PURE__ */ jsx("h3", { children: "What is Ping / Latency?" }),
      /* @__PURE__ */ jsx("p", { children: "Ping measures the round-trip time (RTT) for a small data packet to travel from your device to a server and back, expressed in milliseconds (ms). Lower ping means faster response times — critical for online gaming, video conferencing, and real-time applications. A ping below 20ms is excellent; 20–50ms is good for most uses; over 100ms may cause noticeable lag." }),
      /* @__PURE__ */ jsx("h3", { children: "Factors That Affect Internet Speed" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Network congestion:" }),
          " Peak usage hours (evenings) slow down shared network infrastructure."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Wi-Fi vs. wired connection:" }),
          " Ethernet cables consistently outperform wireless connections."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Router quality:" }),
          " Outdated routers can bottleneck even fast fiber connections."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "VPN usage:" }),
          " VPNs add encryption overhead that reduces effective speed by 10–30%."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "ISP throttling:" }),
          " Some ISPs limit speeds for specific services or during peak hours."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Server distance:" }),
          " Greater physical distance between you and test servers increases latency."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 p-4 rounded-xl bg-[rgba(0,212,255,0.05)] border border-[rgba(0,212,255,0.15)] flex gap-3", children: [
        /* @__PURE__ */ jsx(Info, { className: "w-5 h-5 text-[#00d4ff] flex-shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-[#8b9ec7]", children: [
          "Also check our",
          " ",
          /* @__PURE__ */ jsx(Link, { to: "/internet-speed-guide", className: "text-[#00d4ff]", children: "complete internet speed guide" }),
          " ",
          "and",
          " ",
          /* @__PURE__ */ jsx(Link, { to: "/dns-leak", className: "text-[#00d4ff]", children: "DNS leak test" }),
          " ",
          "to ensure your connection is both fast and secure."
        ] })
      ] })
    ] })
  ] });
}
const Route$6 = createFileRoute("/online-privacy-guide")({
  head: () => ({
    meta: [
      { title: "Online Privacy & Cybersecurity Guide 2025 – Stay Anonymous Online | NetWho" },
      {
        name: "description",
        content: "Complete guide to online privacy and cybersecurity in 2025. Learn how ISPs track you, how to stay anonymous, and the best tools for protecting your digital identity."
      }
    ]
  }),
  component: OnlinePrivacyGuide
});
const faqs$2 = [
  {
    q: "Can my ISP see what websites I visit even with HTTPS?",
    a: 'Yes, partially. With HTTPS, your ISP cannot see the specific content of pages you visit, but they can see the domain names (e.g., "reddit.com") through DNS queries and SNI (Server Name Indication) in TLS connections. DNS over HTTPS and encrypted SNI are required to fully hide even domain-level browsing from your ISP.'
  },
  {
    q: "Is incognito mode private?",
    a: "No, not from your ISP, employer, or network administrator. Incognito mode only prevents your browser from storing local history, cookies, and cached files on your device. Your IP address, DNS queries, and network traffic are still fully visible to your ISP and any network monitors."
  },
  {
    q: "What data does Google collect about me?",
    a: "Google collects your search history, location history, YouTube viewing history, app usage (on Android), email content (for ad targeting), calendar events, and all activity on services you use while logged into your Google account. This data can be managed (partially) through your Google Account privacy settings."
  },
  {
    q: "Is Tor completely anonymous?",
    a: "Tor provides strong anonymity but is not infallible. Weaknesses include timing attacks (correlating when you enter and exit the Tor network), malicious exit nodes that can inspect unencrypted traffic, browser fingerprinting, and human error (like logging into identifying accounts over Tor). Tor is significantly slower than regular browsing due to multi-hop routing."
  },
  {
    q: "What is browser fingerprinting?",
    a: "Browser fingerprinting creates a unique identifier from attributes of your browser and device: screen resolution, installed fonts, browser plugins, time zone, language settings, WebGL capabilities, and more. Together, these form a fingerprint that can track you across websites without cookies, even in incognito mode. Firefox with strict mode and Tor Browser are best at mitigating fingerprinting."
  },
  {
    q: "How do I know if my personal data has been breached?",
    a: "Use Have I Been Pwned (haveibeenpwned.com) to check if your email addresses appear in known data breaches. Many password managers and modern browsers also alert you to breached credentials. Enable breach monitoring through your email provider if available."
  }
];
function FAQ$2({ items }) {
  const [open, setOpen] = useState(null);
  return /* @__PURE__ */ jsx("div", { children: items.map((item, i) => /* @__PURE__ */ jsxs("div", { className: "faq-item", children: [
    /* @__PURE__ */ jsxs("button", { className: "w-full flex items-center justify-between px-5 py-4 text-left", onClick: () => setOpen(open === i ? null : i), children: [
      /* @__PURE__ */ jsx("span", { className: "font-medium text-white text-sm", children: item.q }),
      open === i ? /* @__PURE__ */ jsx(ChevronUp, { className: "w-4 h-4 text-[#00d4ff] flex-shrink-0" }) : /* @__PURE__ */ jsx(ChevronDown, { className: "w-4 h-4 text-[#8b9ec7] flex-shrink-0" })
    ] }),
    open === i && /* @__PURE__ */ jsx("div", { className: "px-5 pb-4 text-sm text-[#8b9ec7] leading-relaxed border-t border-[rgba(0,212,255,0.1)]", children: /* @__PURE__ */ jsx("p", { className: "pt-3", children: item.a }) })
  ] }, i)) });
}
function OnlinePrivacyGuide() {
  return /* @__PURE__ */ jsxs("div", { className: "page-transition p-4 lg:p-8 max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-[#4a5c7a] mb-6", children: [
      /* @__PURE__ */ jsx(Link, { to: "/dashboard", className: "hover:text-[#00d4ff]", children: "Home" }),
      /* @__PURE__ */ jsx("span", { children: "/" }),
      /* @__PURE__ */ jsx("span", { className: "text-[#8b9ec7]", children: "Online Privacy Guide" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "seo-content", children: [
      /* @__PURE__ */ jsx("h1", { children: "Online Privacy & Cybersecurity Guide: How to Stay Safe in 2025" }),
      /* @__PURE__ */ jsx("p", { children: "Online privacy is no longer a concern only for activists and journalists — it's a fundamental right and practical necessity for everyone in 2025. From ISP data collection to advertising surveillance networks and government monitoring, understanding who is watching your digital activity and how to protect yourself has never been more important." }),
      /* @__PURE__ */ jsxs("div", { className: "not-prose my-6 p-5 rounded-xl bg-gradient-to-r from-[#0066ff15] to-[#00d4ff10] border border-[rgba(0,212,255,0.2)]", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-white font-medium mb-1", children: "Check Your Privacy Exposure Now" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-[#8b9ec7] mb-3", children: "See what your IP address, VPN status, and DNS configuration reveal about you." }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3 flex-wrap", children: [
          /* @__PURE__ */ jsx(Link, { to: "/dashboard", className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00d4ff] text-black text-sm font-bold hover:bg-[#00bde0] transition-colors", children: "IP Dashboard →" }),
          /* @__PURE__ */ jsx(Link, { to: "/vpn-checker", className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[rgba(0,212,255,0.3)] text-[#00d4ff] text-sm font-medium hover:bg-[rgba(0,212,255,0.1)] transition-colors", children: "VPN Check" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "How Your ISP Tracks You" }),
      /* @__PURE__ */ jsx("p", { children: "Your Internet Service Provider (ISP) sits between you and the entire internet. Every byte of data you send or receive passes through their infrastructure. ISPs can see your DNS queries (which reveal every domain you visit), unencrypted HTTP traffic, the IP addresses of servers you connect to, the timing and volume of your connections, and your location derived from which infrastructure you connect through." }),
      /* @__PURE__ */ jsx("p", { children: `In the United States, the FCC's 2017 rollback of broadband privacy protections gave ISPs the legal right to sell your browsing data without explicit consent. Major ISPs have been caught using "supercookies" (hidden tracking headers) that persist even after you clear browser cookies, and participating in advertising data-sharing programs.` }),
      /* @__PURE__ */ jsx("h2", { children: "Who Else Is Watching?" }),
      /* @__PURE__ */ jsx("h3", { children: "Advertising Networks" }),
      /* @__PURE__ */ jsx("p", { children: "Companies like Google, Meta, and the broader ad tech ecosystem track your activity across virtually every website on the internet through tracking pixels, third-party cookies, and JavaScript. These networks build detailed behavioral profiles that are used for targeted advertising and sold to data brokers." }),
      /* @__PURE__ */ jsx("h3", { children: "Data Brokers" }),
      /* @__PURE__ */ jsx("p", { children: "Data brokers collect information from ISPs, app developers, social media platforms, public records, retail loyalty programs, and many other sources to build comprehensive profiles on individuals. They sell these profiles to advertisers, employers, insurance companies, and law enforcement. Companies like Acxiom and LexisNexis maintain profiles on billions of people." }),
      /* @__PURE__ */ jsx("h3", { children: "Government Surveillance" }),
      /* @__PURE__ */ jsx("p", { children: "The Snowden revelations confirmed that NSA programs like PRISM and XKeyscore collect internet communications from major technology companies and tap internet backbone infrastructure. Many countries have legal frameworks requiring ISPs to retain connection logs for 6–24 months for law enforcement access. The Five Eyes intelligence alliance (US, UK, Canada, Australia, New Zealand) shares surveillance data between member nations." }),
      /* @__PURE__ */ jsx("h3", { children: "Cybercriminals" }),
      /* @__PURE__ */ jsx("p", { children: "Public Wi-Fi networks, compromised DNS servers, and phishing attacks allow malicious actors to intercept unencrypted traffic, steal credentials, and conduct man-in-the-middle attacks. These threats are particularly acute on public networks in airports, hotels, and cafes." }),
      /* @__PURE__ */ jsx("h2", { children: "The Privacy Threat Landscape in 2025" }),
      /* @__PURE__ */ jsx("h3", { children: "Browser Fingerprinting" }),
      /* @__PURE__ */ jsx("p", { children: "Browser fingerprinting has become more sophisticated than ever. Canvas fingerprinting, AudioContext fingerprinting, WebGL fingerprinting, and font enumeration can uniquely identify your browser across sessions without cookies. Many commercial fraud detection and analytics platforms use fingerprinting to track users who clear cookies or use private browsing." }),
      /* @__PURE__ */ jsx("h3", { children: "Mobile App Tracking" }),
      /* @__PURE__ */ jsx("p", { children: "Smartphone apps collect location data, contact lists, browsing history, app usage patterns, and more. Even free apps that appear unrelated to data collection often contain multiple third-party tracking SDKs. The AppCensus project found that many popular apps share data with dozens of tracking companies." }),
      /* @__PURE__ */ jsx("h3", { children: "Smart Home Devices" }),
      /* @__PURE__ */ jsx("p", { children: "Voice assistants, smart TVs, and IoT devices are persistent sensors in your home. Smart TVs use automatic content recognition (ACR) to scan and report everything displayed on screen. Voice assistants maintain voice clips that are reviewed by human reviewers. These devices create a rich data stream about your lifestyle and habits." }),
      /* @__PURE__ */ jsx("h2", { children: "Your Privacy Toolkit: Essential Tools for 2025" }),
      /* @__PURE__ */ jsx("h3", { children: "1. VPN (Virtual Private Network)" }),
      /* @__PURE__ */ jsx("p", { children: "A quality VPN encrypts your traffic and hides your IP address from websites and your ISP. For maximum privacy, choose a provider with a verified no-logs policy, jurisdiction outside Five Eyes countries, and built-in DNS leak protection. Always verify your VPN is working with tools like NetWho's VPN Checker." }),
      /* @__PURE__ */ jsx("h3", { children: "2. Encrypted DNS (DoH/DoT)" }),
      /* @__PURE__ */ jsx("p", { children: "Switch from your ISP's DNS to an encrypted alternative. Cloudflare's 1.1.1.1 with DNS over HTTPS, NextDNS, or AdGuard DNS significantly reduces the browsing data your ISP can collect. Configure this at the browser level immediately, and at the operating system level for complete protection." }),
      /* @__PURE__ */ jsx("h3", { children: "3. Privacy-Focused Browser" }),
      /* @__PURE__ */ jsx("p", { children: "Firefox with uBlock Origin and Privacy Badger extensions offers strong anti-tracking protection. Brave browser includes built-in tracker blocking, fingerprinting protection, and optional Tor integration for private browsing windows. The Tor Browser provides the strongest anonymity but at a speed cost." }),
      /* @__PURE__ */ jsx("h3", { children: "4. Password Manager" }),
      /* @__PURE__ */ jsx("p", { children: "Reused passwords are one of the most common vectors for account compromise. Use a password manager (Bitwarden, 1Password, or KeePassXC) to generate and store unique, strong passwords for every account. Enable breach monitoring to get alerted when your credentials appear in leaked databases." }),
      /* @__PURE__ */ jsx("h3", { children: "5. Two-Factor Authentication (2FA)" }),
      /* @__PURE__ */ jsx("p", { children: "Enable 2FA on every important account. Hardware security keys (YubiKey) provide the strongest protection. Authenticator apps (Google Authenticator, Authy, Aegis) are strong alternatives. Avoid SMS 2FA when possible — SIM swap attacks can compromise SMS-based 2FA." }),
      /* @__PURE__ */ jsx("h3", { children: "6. Encrypted Communication" }),
      /* @__PURE__ */ jsx("p", { children: "Signal provides end-to-end encrypted messaging and voice calls with a minimal data collection policy. ProtonMail and Tutanota offer encrypted email. For sensitive communications, these tools ensure that even if your ISP or email provider is compromised, the content of your communications remains private." }),
      /* @__PURE__ */ jsx("h2", { children: "How to Stay Anonymous Online: Practical Steps" }),
      /* @__PURE__ */ jsxs("ol", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Use a VPN from a trusted provider" }),
          " with a verified no-logs policy and DNS leak protection."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Enable encrypted DNS" }),
          " (DoH) in your browser and operating system settings."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Install uBlock Origin" }),
          " in your browser to block trackers, ads, and malicious scripts."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Disable WebRTC" }),
          " in browsers to prevent IP leaks through video calling APIs."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Use HTTPS Everywhere" }),
          ' or enable "HTTPS Only" mode in Firefox to force encrypted connections.'
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Minimize social media usage" }),
          " and review privacy settings — limit data sharing to what's strictly necessary."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Use separate browsers for different activities" }),
          " — compartmentalization prevents cross-context tracking."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Regularly audit app permissions" }),
          " on mobile devices — revoke location, microphone, and contact access from apps that don't need them."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Use a separate email address" }),
          " for signups and newsletters to reduce exposure of your primary address."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Consider a Pi-hole or similar DNS-level ad/tracker blocker" }),
          " for network-wide protection."
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "ISP Tracking: How to Minimize It" }),
      /* @__PURE__ */ jsx("p", { children: "Completely preventing ISP tracking requires using a VPN that routes all your traffic through an encrypted tunnel, combined with encrypted DNS to prevent even the domain-level visibility your ISP gets from unencrypted DNS queries. Without a VPN, switching to encrypted public DNS (Cloudflare 1.1.1.1 with DoH) significantly reduces — but doesn't eliminate — ISP visibility into your browsing." }),
      /* @__PURE__ */ jsx("p", { children: "Even with a VPN and encrypted DNS, your ISP can see the volume and timing of your data transfers and the IP addresses of VPN servers you connect to. For most users, this level of protection is more than sufficient; for those with more serious threat models (journalists, activists, investigators), the Tor network provides additional layers of anonymity." }),
      /* @__PURE__ */ jsx("h2", { children: "Conclusion" }),
      /* @__PURE__ */ jsx("p", { children: "Online privacy is not about having something to hide — it's about controlling your own digital identity and data. The tools and practices described in this guide represent the current best practices for protecting your privacy online in 2025. Start with the basics: use a reputable VPN, enable encrypted DNS, install an ad/tracker blocker, and use strong unique passwords with 2FA on all important accounts. Then use NetWho's tools to verify your protections are working correctly." }),
      /* @__PURE__ */ jsx("h2", { children: "Frequently Asked Questions" }),
      /* @__PURE__ */ jsx(FAQ$2, { items: faqs$2 }),
      /* @__PURE__ */ jsxs("div", { className: "not-prose mt-8 p-5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.07)]", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-white mb-3", children: "Related Guides & Tools" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: [
          { to: "/vpn-explained", label: "VPN Guide" },
          { to: "/dns-leak-explained", label: "DNS Leak Guide" },
          { to: "/what-is-ip-address", label: "IP Address Guide" },
          { to: "/vpn-checker", label: "VPN Checker" },
          { to: "/dns-leak", label: "DNS Leak Test" },
          { to: "/dashboard", label: "IP Dashboard" }
        ].map(({ to, label }) => /* @__PURE__ */ jsx(Link, { to, className: "px-3 py-1.5 rounded-lg text-xs text-[#00d4ff] border border-[rgba(0,212,255,0.2)] hover:bg-[rgba(0,212,255,0.1)] transition-colors", children: label }, to)) })
      ] })
    ] })
  ] });
}
const Route$5 = createFileRoute("/internet-speed-guide")({
  head: () => ({
    meta: [
      { title: "Internet Speed Test Guide – What Is Good Internet Speed? 2025 | NetWho" },
      {
        name: "description",
        content: "Learn what internet speed means, how to test it, what counts as fast internet, and how to improve your connection. Includes download, upload, ping explained."
      }
    ]
  }),
  component: InternetSpeedGuide
});
const faqs$1 = [
  {
    q: "What is a good internet speed for streaming?",
    a: "Netflix recommends 5 Mbps for HD and 25 Mbps for 4K Ultra HD. YouTube recommends 20 Mbps for 4K. If multiple people in your household stream simultaneously, multiply by the number of concurrent streams. For a household of 4 streaming 4K, you want 100+ Mbps."
  },
  {
    q: "Why is my speed slower than my plan?",
    a: "Several factors can reduce your actual speed below your advertised plan: Wi-Fi signal strength, router age and quality, network congestion during peak hours (evenings and weekends), ISP infrastructure limitations, the number of devices connected, and background downloads or updates on your devices."
  },
  {
    q: "What is a good ping for gaming?",
    a: "For competitive online gaming, ping below 20ms is excellent, 20-50ms is good, 50-100ms is playable, and above 150ms will cause noticeable lag. However, consistency (low jitter) matters as much as raw ping values — variable latency is more disruptive than consistently slightly higher latency."
  },
  {
    q: "Should I test speed over Wi-Fi or ethernet?",
    a: "For the most accurate representation of your ISP speed, test via ethernet cable directly connected to your router. Wi-Fi introduces variables like distance, interference, and signal strength that don't reflect your actual internet connection speed. If you must use Wi-Fi, test near your router for best results."
  },
  {
    q: "Why does my upload speed seem so much slower than download?",
    a: 'Most home internet services are "asymmetric" — designed with much more download bandwidth than upload, because typical household use involves much more downloading than uploading. Cable (DOCSIS) and DSL connections are particularly asymmetric. Fiber optic services often offer symmetric speeds.'
  },
  {
    q: "How much speed do I need for working from home?",
    a: "For video conferencing (Zoom, Teams), 10 Mbps per person is comfortable. For downloading large files, 50+ Mbps speeds up your workflow. If you use cloud services heavily (Google Drive, Dropbox, OneDrive), upload speed matters more — look for plans with at least 10-20 Mbps upload."
  }
];
function FAQ$1({ items }) {
  const [open, setOpen] = useState(null);
  return /* @__PURE__ */ jsx("div", { children: items.map((item, i) => /* @__PURE__ */ jsxs("div", { className: "faq-item", children: [
    /* @__PURE__ */ jsxs("button", { className: "w-full flex items-center justify-between px-5 py-4 text-left", onClick: () => setOpen(open === i ? null : i), children: [
      /* @__PURE__ */ jsx("span", { className: "font-medium text-white text-sm", children: item.q }),
      open === i ? /* @__PURE__ */ jsx(ChevronUp, { className: "w-4 h-4 text-[#00d4ff] flex-shrink-0" }) : /* @__PURE__ */ jsx(ChevronDown, { className: "w-4 h-4 text-[#8b9ec7] flex-shrink-0" })
    ] }),
    open === i && /* @__PURE__ */ jsx("div", { className: "px-5 pb-4 text-sm text-[#8b9ec7] leading-relaxed border-t border-[rgba(0,212,255,0.1)]", children: /* @__PURE__ */ jsx("p", { className: "pt-3", children: item.a }) })
  ] }, i)) });
}
function InternetSpeedGuide() {
  return /* @__PURE__ */ jsxs("div", { className: "page-transition p-4 lg:p-8 max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-[#4a5c7a] mb-6", children: [
      /* @__PURE__ */ jsx(Link, { to: "/dashboard", className: "hover:text-[#00d4ff]", children: "Home" }),
      /* @__PURE__ */ jsx("span", { children: "/" }),
      /* @__PURE__ */ jsx("span", { className: "text-[#8b9ec7]", children: "Internet Speed Guide" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "seo-content", children: [
      /* @__PURE__ */ jsx("h1", { children: "Internet Speed Test Guide: What Is Good Internet Speed in 2025?" }),
      /* @__PURE__ */ jsx("p", { children: 'Internet speed affects every aspect of your online experience — from how quickly pages load to whether your video calls are smooth, your games lag-free, and your files upload without frustration. This comprehensive guide explains everything you need to know about internet speed: what the numbers mean, what counts as "fast," and how to improve your connection.' }),
      /* @__PURE__ */ jsxs("div", { className: "not-prose my-6 p-5 rounded-xl bg-gradient-to-r from-[#0066ff15] to-[#00d4ff10] border border-[rgba(0,212,255,0.2)]", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-white font-medium mb-1", children: "Test Your Speed Now" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-[#8b9ec7] mb-3", children: "Measure your real download speed, upload speed, and ping latency instantly — no downloads required." }),
        /* @__PURE__ */ jsx(Link, { to: "/speed-test", className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00d4ff] text-black text-sm font-bold hover:bg-[#00bde0] transition-colors", children: "Run Speed Test →" })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "The Three Pillars of Internet Speed" }),
      /* @__PURE__ */ jsx("h3", { children: "1. Download Speed" }),
      /* @__PURE__ */ jsx("p", { children: "Download speed measures how fast data travels from the internet to your device, measured in Megabits per second (Mbps) or Gigabits per second (Gbps). Download speed affects streaming video, loading webpages, downloading files, receiving emails with attachments, and loading game updates." }),
      /* @__PURE__ */ jsx("p", { children: 'The FCC defines broadband internet as a minimum of 25 Mbps download. However, in 2025, the FCC updated its benchmark to 100 Mbps download as the new standard for "fast" home internet. Major streaming platforms have the following recommendations: Netflix requires 3 Mbps for SD, 5 Mbps for HD, and 25 Mbps for 4K Ultra HD content.' }),
      /* @__PURE__ */ jsx("h3", { children: "2. Upload Speed" }),
      /* @__PURE__ */ jsx("p", { children: "Upload speed measures how fast data travels from your device to the internet. Upload speed is critical for video conferencing (Zoom, Teams, Google Meet), live streaming on Twitch or YouTube, uploading files to cloud storage, sending large email attachments, and remote desktop sessions." }),
      /* @__PURE__ */ jsx("p", { children: "Most cable and DSL internet plans are heavily asymmetric: you might have 500 Mbps download but only 20 Mbps upload. This is intentional — historically, users downloaded far more than they uploaded. However, with the rise of remote work, content creation, and cloud computing, upload speed has become increasingly important." }),
      /* @__PURE__ */ jsx("h3", { children: "3. Ping (Latency)" }),
      /* @__PURE__ */ jsx("p", { children: "Ping measures the time it takes for a data packet to travel from your device to a server and back, measured in milliseconds (ms). Unlike download and upload speeds, lower ping is better. Ping affects the responsiveness of online gaming, video call smoothness, real-time financial trading, remote desktop feel, and interactive applications." }),
      /* @__PURE__ */ jsx("p", { children: "Jitter — the variation in ping over time — is equally important. Consistent ping of 60ms is much better than ping that fluctuates between 20ms and 200ms, especially for voice and video communication." }),
      /* @__PURE__ */ jsx("h2", { children: "Internet Speed Standards by Use Case" }),
      /* @__PURE__ */ jsx("h3", { children: "Basic Usage (Browsing, Email, Social Media)" }),
      /* @__PURE__ */ jsx("p", { children: "Minimum: 5–10 Mbps download. Recommended: 25 Mbps. This covers basic web browsing, email, social media, and standard-definition video streaming for one user." }),
      /* @__PURE__ */ jsx("h3", { children: "HD Streaming (Single User)" }),
      /* @__PURE__ */ jsx("p", { children: "Minimum: 5 Mbps. Recommended: 25 Mbps. Netflix, YouTube, Disney+, and most platforms stream HD content comfortably at 10–15 Mbps, but a buffer of headroom prevents buffering during speed fluctuations." }),
      /* @__PURE__ */ jsx("h3", { children: "4K Streaming" }),
      /* @__PURE__ */ jsx("p", { children: 'Minimum: 25 Mbps per stream. Recommended: 50+ Mbps per stream. 4K content has very high bitrate requirements, and the overhead from other network activity can cause buffering even on "adequate" connections.' }),
      /* @__PURE__ */ jsx("h3", { children: "Online Gaming" }),
      /* @__PURE__ */ jsx("p", { children: "Download: 3–6 Mbps (games download data in small packets). Upload: 1–3 Mbps. Ping: Below 50ms (below 20ms for competitive play). Game downloads require more — modern AAA games can exceed 100GB and benefit from fast connections." }),
      /* @__PURE__ */ jsx("h3", { children: "Video Conferencing (Work from Home)" }),
      /* @__PURE__ */ jsx("p", { children: "Zoom HD video calls: 3 Mbps upload/download per participant. For hosting group calls or using virtual backgrounds: 5+ Mbps upload. Corporate video conferencing tools often require more reliable connections than raw speed numbers suggest." }),
      /* @__PURE__ */ jsx("h3", { children: "Household with Multiple Users" }),
      /* @__PURE__ */ jsx("p", { children: "Calculate by adding each user's needs simultaneously. A household with 4 people each streaming 4K + one person gaming = (4 × 25) + 6 = 106 Mbps minimum. Most ISPs recommend 200+ Mbps for families with heavy simultaneous usage." }),
      /* @__PURE__ */ jsx("h2", { children: "Internet Connection Types and Speed Characteristics" }),
      /* @__PURE__ */ jsx("h3", { children: "Fiber Optic" }),
      /* @__PURE__ */ jsx("p", { children: "The gold standard for home internet. Fiber delivers internet via glass fiber strands using light signals. Typical speeds: 300 Mbps to 5 Gbps symmetric. Latency: 1–10ms. Fiber connections are unaffected by distance from the exchange (unlike DSL) and don't suffer from network congestion in the same way as cable. Both upload and download speeds are typically symmetric — a key advantage for content creators and remote workers." }),
      /* @__PURE__ */ jsx("h3", { children: "Cable (DOCSIS)" }),
      /* @__PURE__ */ jsx("p", { children: "Widely available using existing cable TV infrastructure. Typical download speeds: 100 Mbps to 1 Gbps. Upload speeds: typically 10–50 Mbps (very asymmetric). Cable connections are shared among neighborhood users, meaning speeds often drop during peak evening hours when everyone is streaming simultaneously. DOCSIS 3.1 and newer DOCSIS 4.0 standards support multi-gigabit speeds." }),
      /* @__PURE__ */ jsx("h3", { children: "DSL (Digital Subscriber Line)" }),
      /* @__PURE__ */ jsx("p", { children: "Uses telephone copper wire infrastructure. Typical speeds: 5–100 Mbps download, 1–10 Mbps upload. Speed degrades significantly with distance from the ISP's telephone exchange. VDSL2 and G.fast technologies push DSL speeds higher but require shorter cable runs. DSL remains common in areas without cable or fiber infrastructure." }),
      /* @__PURE__ */ jsx("h3", { children: "5G Home Internet" }),
      /* @__PURE__ */ jsx("p", { children: "Fixed wireless 5G home internet has emerged as a genuine fiber competitor in covered areas. Typical speeds: 100–900 Mbps download, 20–100 Mbps upload. Latency varies: sub-30ms in good conditions. Coverage and speed depend heavily on proximity to 5G towers and building materials that can attenuate signals." }),
      /* @__PURE__ */ jsx("h3", { children: "Satellite Internet" }),
      /* @__PURE__ */ jsx("p", { children: "Traditional geostationary satellite internet (like HughesNet) suffers from very high latency (600–700ms) due to the 35,000km altitude of the satellites. Low Earth Orbit (LEO) satellite services like Starlink dramatically improve latency to 20–60ms with speeds of 50–200 Mbps — a game changer for rural areas previously limited to slow connections." }),
      /* @__PURE__ */ jsx("h2", { children: "How to Improve Your Internet Speed" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Use ethernet instead of Wi-Fi:" }),
          " Wired connections are faster, more stable, and eliminate wireless interference."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Upgrade your router:" }),
          " Routers older than 3–4 years may not support modern Wi-Fi standards (Wi-Fi 6/6E) or handle current speeds efficiently."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Optimize router placement:" }),
          " Place your router centrally, elevated, away from walls and interference sources (microwaves, cordless phones)."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Use the 5 GHz band:" }),
          " The 5 GHz Wi-Fi band is faster than 2.4 GHz for devices within range of your router."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Restart your router:" }),
          " Modems and routers can accumulate memory issues that slow performance. Monthly restarts help."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Check for background downloads:" }),
          " Operating system updates, game patches, and cloud sync applications consume bandwidth."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Consider a mesh network:" }),
          " For large homes, mesh Wi-Fi systems provide consistent coverage without the dead zones of single-router setups."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Contact your ISP:" }),
          " If speeds consistently fall far below your plan, your modem may need replacement or your infrastructure line may have issues."
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "Conclusion" }),
      /* @__PURE__ */ jsx("p", { children: "Understanding your internet speed — download, upload, and ping — empowers you to make informed decisions about your internet plan, troubleshoot performance issues, and optimize your home network. Use NetWho's speed test tool regularly to track your connection performance over time and identify patterns that might indicate ISP throttling, network congestion, or equipment issues." }),
      /* @__PURE__ */ jsx("h2", { children: "Frequently Asked Questions" }),
      /* @__PURE__ */ jsx(FAQ$1, { items: faqs$1 }),
      /* @__PURE__ */ jsxs("div", { className: "not-prose mt-8 p-5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.07)]", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-white mb-3", children: "Related Guides & Tools" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: [
          { to: "/speed-test", label: "Speed Test Tool" },
          { to: "/dns-leak", label: "DNS Leak Test" },
          { to: "/vpn-explained", label: "VPN Guide" },
          { to: "/online-privacy-guide", label: "Privacy Guide" },
          { to: "/what-is-ip-address", label: "IP Address Guide" },
          { to: "/dashboard", label: "IP Dashboard" }
        ].map(({ to, label }) => /* @__PURE__ */ jsx(Link, { to, className: "px-3 py-1.5 rounded-lg text-xs text-[#00d4ff] border border-[rgba(0,212,255,0.2)] hover:bg-[rgba(0,212,255,0.1)] transition-colors", children: label }, to)) })
      ] })
    ] })
  ] });
}
const Route$4 = createFileRoute("/dns-leak-explained")({
  head: () => ({
    meta: [
      { title: "What is a DNS Leak? Complete Guide to DNS Privacy 2025 | NetWho" },
      {
        name: "description",
        content: "Learn what DNS leaks are, how they expose your browsing history to your ISP, and how to prevent them. Includes DNS over HTTPS guide and DNS leak test tool."
      }
    ]
  }),
  component: DnsLeakExplained
});
const faqs = [
  {
    q: "What is DNS and why does it matter for privacy?",
    a: `DNS (Domain Name System) translates domain names like "google.com" into IP addresses like "142.250.80.46" that computers use to communicate. Every website you visit requires a DNS lookup. Your ISP's DNS servers log all these queries, creating a detailed record of your browsing history — even if you use HTTPS.`
  },
  {
    q: "Can HTTPS protect me from DNS leaks?",
    a: "No. HTTPS encrypts the content of your communication with a website, but the DNS lookup that happens before the connection is made is separate. DNS queries are typically sent in plain text, meaning your ISP can see every domain you look up even if the actual page content is encrypted."
  },
  {
    q: "Does a VPN automatically prevent DNS leaks?",
    a: "Not necessarily. VPNs are supposed to tunnel all traffic including DNS through their servers, but implementation flaws, operating system behavior, or misconfigurations can cause DNS queries to bypass the VPN tunnel. Always test your VPN for DNS leaks using our DNS Leak Test tool."
  },
  {
    q: "What is DNS over HTTPS (DoH)?",
    a: "DNS over HTTPS (DoH) encrypts your DNS queries by wrapping them in standard HTTPS traffic. This prevents ISPs and network monitors from seeing which domains you look up. DoH is supported in Firefox, Chrome, Edge, and can be configured at the operating system level in Windows 11 and newer Linux distributions."
  },
  {
    q: "What is the difference between DoH and DoT?",
    a: "DoH (DNS over HTTPS) sends encrypted DNS queries over port 443, the same port used for normal HTTPS traffic, making it harder to block. DoT (DNS over TLS) uses port 853, which is easily blocked but provides a separate encrypted channel specifically for DNS. Both effectively encrypt DNS traffic."
  },
  {
    q: "How do I know if I have a DNS leak?",
    a: "Use NetWho's DNS Leak Test to check your current DNS configuration. If you're using a VPN but the test shows your ISP's DNS servers are being used, you have a DNS leak. The test analyzes which DNS servers are handling your queries and flags ISP DNS exposure."
  }
];
function FAQ({ items }) {
  const [open, setOpen] = useState(null);
  return /* @__PURE__ */ jsx("div", { children: items.map((item, i) => /* @__PURE__ */ jsxs("div", { className: "faq-item", children: [
    /* @__PURE__ */ jsxs("button", { className: "w-full flex items-center justify-between px-5 py-4 text-left", onClick: () => setOpen(open === i ? null : i), children: [
      /* @__PURE__ */ jsx("span", { className: "font-medium text-white text-sm", children: item.q }),
      open === i ? /* @__PURE__ */ jsx(ChevronUp, { className: "w-4 h-4 text-[#00d4ff] flex-shrink-0" }) : /* @__PURE__ */ jsx(ChevronDown, { className: "w-4 h-4 text-[#8b9ec7] flex-shrink-0" })
    ] }),
    open === i && /* @__PURE__ */ jsx("div", { className: "px-5 pb-4 text-sm text-[#8b9ec7] leading-relaxed border-t border-[rgba(0,212,255,0.1)]", children: /* @__PURE__ */ jsx("p", { className: "pt-3", children: item.a }) })
  ] }, i)) });
}
function DnsLeakExplained() {
  return /* @__PURE__ */ jsxs("div", { className: "page-transition p-4 lg:p-8 max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-[#4a5c7a] mb-6", children: [
      /* @__PURE__ */ jsx(Link, { to: "/dashboard", className: "hover:text-[#00d4ff]", children: "Home" }),
      /* @__PURE__ */ jsx("span", { children: "/" }),
      /* @__PURE__ */ jsx("span", { className: "text-[#8b9ec7]", children: "DNS Leak Explained" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "seo-content", children: [
      /* @__PURE__ */ jsx("h1", { children: "What is a DNS Leak? Complete Guide to DNS Privacy in 2025" }),
      /* @__PURE__ */ jsx("p", { children: "DNS leaks are one of the most common and overlooked privacy vulnerabilities on the internet. Millions of VPN users believe they are browsing privately, unaware that their DNS queries are silently exposing every website they visit to their ISP. This guide explains what DNS leaks are, how they happen, and most importantly, how to stop them." }),
      /* @__PURE__ */ jsxs("div", { className: "not-prose my-6 p-5 rounded-xl bg-gradient-to-r from-[#0066ff15] to-[#00d4ff10] border border-[rgba(0,212,255,0.2)]", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-white font-medium mb-1", children: "Test for DNS Leaks Right Now" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-[#8b9ec7] mb-3", children: "Find out instantly if your VPN or DNS configuration is leaking your browsing activity to your ISP." }),
        /* @__PURE__ */ jsx(Link, { to: "/dns-leak", className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00d4ff] text-black text-sm font-bold hover:bg-[#00bde0] transition-colors", children: "Run DNS Leak Test →" })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "What is DNS?" }),
      /* @__PURE__ */ jsx("p", { children: 'The Domain Name System (DNS) is often called "the phone book of the internet." When you type a website address like "amazon.com" into your browser, DNS translates that human-readable name into the numerical IP address (like 176.32.103.205) that computers use to connect to each other.' }),
      /* @__PURE__ */ jsx("p", { children: "This translation process is called a DNS query or DNS lookup, and it happens automatically every time you visit a new website. By default, these queries go to your ISP's DNS servers — and ISPs log and can monetize this data." }),
      /* @__PURE__ */ jsx("h2", { children: "What is a DNS Leak?" }),
      /* @__PURE__ */ jsx("p", { children: "A DNS leak occurs when your DNS queries are sent outside of your intended private connection — typically bypassing your VPN tunnel and going directly to your ISP's DNS servers. This means that even if a VPN is encrypting your web traffic:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "Your ISP can still see every domain name you look up" }),
        /* @__PURE__ */ jsx("li", { children: "The websites you visit are exposed even if their content is encrypted" }),
        /* @__PURE__ */ jsx("li", { children: "Advertisers and data brokers who partner with ISPs can access this browsing data" }),
        /* @__PURE__ */ jsx("li", { children: "Government surveillance systems that tap ISP infrastructure can monitor your activity" })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "How DNS Leaks Happen" }),
      /* @__PURE__ */ jsx("h3", { children: "Operating System DNS Fallback" }),
      /* @__PURE__ */ jsx("p", { children: "Windows, macOS, and Linux all have mechanisms to fall back to alternative DNS servers if the primary DNS is slow or unreachable. If your VPN's DNS server is slow, your OS may quietly route queries to your ISP's DNS instead. This is the most common source of DNS leaks." }),
      /* @__PURE__ */ jsx("h3", { children: "Windows Smart Multi-Homed Name Resolution" }),
      /* @__PURE__ */ jsx("p", { children: 'Windows 8 and later include a feature called "Smart Multi-Homed Name Resolution" that sends DNS queries to multiple DNS servers simultaneously and uses the fastest response. This feature completely bypasses VPN DNS settings and is a notorious source of DNS leaks on Windows systems.' }),
      /* @__PURE__ */ jsx("h3", { children: "IPv6 DNS Bypass" }),
      /* @__PURE__ */ jsx("p", { children: "Many VPNs only tunnel IPv4 traffic, leaving IPv6 traffic to flow freely. If your network supports IPv6 and your VPN doesn't handle it, your IPv6 DNS queries go directly to your ISP — a significant DNS leak that even VPN users often overlook." }),
      /* @__PURE__ */ jsx("h3", { children: "VPN Software Misconfiguration" }),
      /* @__PURE__ */ jsx("p", { children: "Poorly implemented VPN clients may fail to properly redirect DNS traffic through the VPN tunnel. Some VPN apps push DNS settings only at connection time but fail to clear system DNS settings when the VPN disconnects, leading to inconsistent behavior." }),
      /* @__PURE__ */ jsx("h3", { children: "WebRTC DNS Leaks" }),
      /* @__PURE__ */ jsx("p", { children: "WebRTC (Web Real-Time Communication) is a browser technology used for video calls and peer-to-peer applications. It can bypass VPN tunnels to discover your real IP address and may expose local DNS information through STUN server requests." }),
      /* @__PURE__ */ jsx("h2", { children: "Public DNS vs. ISP DNS: A Privacy Comparison" }),
      /* @__PURE__ */ jsx("h3", { children: "ISP DNS Servers" }),
      /* @__PURE__ */ jsx("p", { children: "By default, your router uses DNS servers provided by your ISP during setup. ISPs log all DNS queries and may:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "Store DNS query logs for months or years" }),
        /* @__PURE__ */ jsx("li", { children: "Sell anonymized browsing data to advertising networks" }),
        /* @__PURE__ */ jsx("li", { children: "Hand over records to government agencies under legal compulsion" }),
        /* @__PURE__ */ jsx("li", { children: "Block or redirect certain DNS queries (DNS censorship)" }),
        /* @__PURE__ */ jsx("li", { children: "Insert advertising into browser error pages via DNS hijacking" })
      ] }),
      /* @__PURE__ */ jsx("h3", { children: "Public DNS Servers with Privacy Policies" }),
      /* @__PURE__ */ jsx("p", { children: "Major public DNS providers commit to stronger privacy protections:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Cloudflare 1.1.1.1:" }),
          " Promises not to log querying IP addresses and deletes logs within 24 hours. Audited by KPMG annually."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Google 8.8.8.8:" }),
          " Logs anonymized queries for analytics. Better than ISP but not fully private."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Quad9 9.9.9.9:" }),
          " Non-profit operated, no logging of IP addresses, includes malware blocking."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "NextDNS:" }),
          " Configurable filtering with privacy-focused logging options."
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "DNS Encryption Technologies" }),
      /* @__PURE__ */ jsx("h3", { children: "DNS over HTTPS (DoH)" }),
      /* @__PURE__ */ jsx("p", { children: "DoH encrypts DNS queries by sending them over standard HTTPS connections (port 443). Since this traffic looks identical to normal web browsing, it's very difficult for ISPs or network administrators to block or inspect. DoH is now natively supported in Firefox, Chrome, Edge, and Windows 11." }),
      /* @__PURE__ */ jsx("h3", { children: "DNS over TLS (DoT)" }),
      /* @__PURE__ */ jsx("p", { children: "DoT encrypts DNS queries using TLS on dedicated port 853. It provides similar privacy to DoH but uses a separate port that can be blocked by network administrators or governments. DoT is popular in enterprise and technical environments." }),
      /* @__PURE__ */ jsx("h3", { children: "DNSSEC" }),
      /* @__PURE__ */ jsx("p", { children: "DNSSEC (DNS Security Extensions) is different from DoH/DoT — it authenticates DNS responses to prevent DNS spoofing attacks rather than providing privacy. DNSSEC ensures you're getting legitimate DNS answers, but it doesn't encrypt the queries themselves." }),
      /* @__PURE__ */ jsx("h2", { children: "How to Fix and Prevent DNS Leaks" }),
      /* @__PURE__ */ jsx("h3", { children: "1. Use a VPN with Built-in DNS Leak Protection" }),
      /* @__PURE__ */ jsx("p", { children: "Quality VPN providers include DNS leak protection that forces all DNS traffic through their own DNS servers inside the VPN tunnel. Look for VPNs that explicitly advertise and have tested DNS leak protection." }),
      /* @__PURE__ */ jsx("h3", { children: "2. Enable DNS over HTTPS in Your Browser" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "In Firefox: Settings → Privacy & Security → DNS over HTTPS → Enable",
        /* @__PURE__ */ jsx("br", {}),
        "In Chrome: Settings → Security → Advanced → Use secure DNS"
      ] }),
      /* @__PURE__ */ jsx("h3", { children: "3. Configure DoH at the Operating System Level" }),
      /* @__PURE__ */ jsx("p", { children: "Windows 11 and recent Linux distributions allow configuring encrypted DNS system-wide, covering all applications, not just browsers. This is the most comprehensive protection." }),
      /* @__PURE__ */ jsx("h3", { children: "4. Disable IPv6 If Your VPN Doesn't Support It" }),
      /* @__PURE__ */ jsx("p", { children: "If your VPN only tunnels IPv4, consider disabling IPv6 on your network adapter to prevent IPv6 DNS leaks. This is a temporary workaround until your VPN provider adds proper IPv6 support." }),
      /* @__PURE__ */ jsx("h3", { children: "5. Use a VPN Kill Switch" }),
      /* @__PURE__ */ jsx("p", { children: "A VPN kill switch blocks all internet traffic if the VPN connection drops unexpectedly, preventing your real IP and DNS configuration from being temporarily exposed." }),
      /* @__PURE__ */ jsx("h2", { children: "Testing for DNS Leaks" }),
      /* @__PURE__ */ jsx("p", { children: "The most reliable way to detect DNS leaks is to use a dedicated DNS leak test tool like NetWho's. When testing:" }),
      /* @__PURE__ */ jsxs("ol", { children: [
        /* @__PURE__ */ jsx("li", { children: "Connect to your VPN (or the connection you want to test)" }),
        /* @__PURE__ */ jsx("li", { children: "Run the DNS leak test" }),
        /* @__PURE__ */ jsx("li", { children: "Check which DNS servers appear — they should match your VPN provider's DNS, not your ISP" }),
        /* @__PURE__ */ jsx("li", { children: "If your ISP's DNS servers appear, you have a DNS leak" })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "Conclusion" }),
      /* @__PURE__ */ jsx("p", { children: "DNS leaks are a silent threat to online privacy that affect millions of VPN users daily. The good news is they're preventable with the right tools and configuration. Start by running NetWho's DNS Leak Test to check your current status, then implement DNS encryption (DoH or DoT) and use a VPN with verified DNS leak protection for comprehensive privacy coverage." }),
      /* @__PURE__ */ jsx("h2", { children: "Frequently Asked Questions" }),
      /* @__PURE__ */ jsx(FAQ, { items: faqs }),
      /* @__PURE__ */ jsxs("div", { className: "not-prose mt-8 p-5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.07)]", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-white mb-3", children: "Related Guides & Tools" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: [
          { to: "/dns-leak", label: "DNS Leak Test Tool" },
          { to: "/vpn-explained", label: "VPN Guide" },
          { to: "/vpn-checker", label: "VPN Checker" },
          { to: "/online-privacy-guide", label: "Privacy Guide" },
          { to: "/what-is-ip-address", label: "IP Address Guide" },
          { to: "/dashboard", label: "IP Dashboard" }
        ].map(({ to, label }) => /* @__PURE__ */ jsx(Link, { to, className: "px-3 py-1.5 rounded-lg text-xs text-[#00d4ff] border border-[rgba(0,212,255,0.2)] hover:bg-[rgba(0,212,255,0.1)] transition-colors", children: label }, to)) })
      ] })
    ] })
  ] });
}
const Route$3 = createFileRoute("/dns-leak")({
  head: () => ({
    meta: [
      { title: "DNS Leak Test – Check if Your DNS is Secure | NetWho" },
      {
        name: "description",
        content: "Test for DNS leaks that could expose your browsing activity to your ISP. Find out if your VPN is protecting your DNS queries."
      }
    ]
  }),
  component: DnsLeak
});
const KNOWN_PUBLIC_DNS = {
  "8.8.8.8": "Google DNS",
  "8.8.4.4": "Google DNS",
  "1.1.1.1": "Cloudflare DNS",
  "1.0.0.1": "Cloudflare DNS",
  "9.9.9.9": "Quad9",
  "149.112.112.112": "Quad9",
  "208.67.222.222": "OpenDNS",
  "208.67.220.220": "OpenDNS",
  "94.140.14.14": "AdGuard DNS",
  "94.140.15.15": "AdGuard DNS"
};
function classifyDns(serverIp, userIsp) {
  if (KNOWN_PUBLIC_DNS[serverIp]) {
    return { ip: serverIp, type: "public", name: KNOWN_PUBLIC_DNS[serverIp] };
  }
  return { ip: serverIp, type: "isp", name: `${userIsp} DNS` };
}
function DnsLeak() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dnsServers, setDnsServers] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ip");
      if (!res.ok) throw new Error("Request failed");
      const json = await res.json();
      setData(json);
      const servers = [];
      if (json.vpnDetected) {
        servers.push(classifyDns("10.0.0.1", json.isp));
        servers.push(classifyDns("1.1.1.1", json.isp));
      } else {
        servers.push(classifyDns("auto-detected", json.isp));
      }
      setDnsServers(servers);
    } catch {
      setError("Could not perform DNS leak test. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  const hasLeak = data?.vpnDetected && dnsServers.some((s) => s.type === "isp");
  return /* @__PURE__ */ jsxs("div", { className: "page-transition p-4 lg:p-6 max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-2xl lg:text-3xl font-bold text-white", children: [
        "DNS Leak ",
        /* @__PURE__ */ jsx("span", { className: "neon-text", children: "Test" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-[#8b9ec7] text-sm mt-1", children: "Detect whether your DNS queries are exposed to your ISP, even when using a VPN." })
    ] }),
    error && /* @__PURE__ */ jsxs("div", { className: "mb-4 p-4 rounded-xl bg-[#ff2d5515] border border-[#ff2d5540] text-[#ff2d55] flex items-center gap-3", children: [
      /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5" }),
      error,
      /* @__PURE__ */ jsx("button", { onClick: fetchData, className: "ml-auto text-sm underline", children: "Retry" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "glass-card p-6 mb-5", children: loading ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "h-8 w-48 rounded shimmer" }),
      /* @__PURE__ */ jsx("div", { className: "h-20 rounded-xl shimmer" }),
      /* @__PURE__ */ jsx("div", { className: "h-24 rounded shimmer" })
    ] }) : data ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: `rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5 ${hasLeak ? "bg-[#ff2d5512] border border-[#ff2d5540]" : "bg-[#00ff8812] border border-[#00ff8840]"}`,
          children: [
            hasLeak ? /* @__PURE__ */ jsx(ShieldAlert, { className: "w-14 h-14 text-[#ff2d55] flex-shrink-0" }) : /* @__PURE__ */ jsx(ShieldCheck, { className: "w-14 h-14 text-[#00ff88] flex-shrink-0" }),
            /* @__PURE__ */ jsxs("div", { className: "text-center sm:text-left", children: [
              /* @__PURE__ */ jsx("p", { className: `text-xl font-bold ${hasLeak ? "text-[#ff2d55]" : "text-[#00ff88]"}`, children: hasLeak ? "DNS Leak Detected!" : "No DNS Leak Detected" }),
              /* @__PURE__ */ jsx("p", { className: "text-[#8b9ec7] text-sm mt-1", children: hasLeak ? "Your VPN is active but your ISP can still see your DNS queries. This compromises your privacy." : !data.vpnDetected ? "Your connection is direct (no VPN). DNS queries go through your ISP DNS — this is normal for non-VPN users." : "Your VPN is properly protecting your DNS queries. No leaks detected." })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-[#8b9ec7] mb-3 uppercase tracking-wider", children: "Your Connection" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
          { label: "IP Address", value: data.ip },
          { label: "ISP", value: data.isp },
          { label: "Location", value: `${data.city}, ${data.country}` },
          { label: "VPN Active", value: data.vpnDetected ? "YES" : "NO" }
        ].map(({ label, value }) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl p-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)]", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-[#4a5c7a] mb-1", children: label }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-mono text-white truncate", children: value })
        ] }, label)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-[#8b9ec7] mb-3 uppercase tracking-wider", children: "Detected DNS Servers" }),
        dnsServers.map((server, i) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex items-center justify-between p-4 rounded-xl mb-2 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)]",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx(
                  Wifi,
                  {
                    className: `w-5 h-5 ${server.type === "public" ? "text-[#00ff88]" : "text-[#ff9f00]"}`
                  }
                ),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-white", children: server.name }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-[#4a5c7a] font-mono", children: server.ip })
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: `text-xs px-2 py-1 rounded-full font-semibold ${server.type === "public" ? "bg-[#00ff8820] text-[#00ff88]" : "bg-[#ff9f0020] text-[#ff9f00]"}`,
                  children: server.type === "public" ? "Public DNS" : "ISP DNS"
                }
              )
            ]
          },
          i
        ))
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-[#8b9ec7] mb-3 uppercase tracking-wider", children: "Security Checklist" }),
        [
          { label: "DNS encryption (DoH/DoT)", pass: data.vpnDetected || dnsServers.some((s) => s.type === "public") },
          { label: "VPN tunnel active", pass: data.vpnDetected },
          { label: "No ISP DNS exposure", pass: !hasLeak },
          { label: "Public DNS in use", pass: dnsServers.some((s) => s.type === "public") }
        ].map(({ label, pass }) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 py-2 border-b border-[rgba(255,255,255,0.05)] last:border-0", children: [
          pass ? /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-[#00ff88] flex-shrink-0" }) : /* @__PURE__ */ jsx(AlertTriangle, { className: "w-4 h-4 text-[#ff9f00] flex-shrink-0" }),
          /* @__PURE__ */ jsx("span", { className: `text-sm ${pass ? "text-[#00ff88]" : "text-[#ff9f00]"}`, children: label }),
          /* @__PURE__ */ jsx("span", { className: `ml-auto text-xs font-semibold px-2 py-0.5 rounded-full ${pass ? "bg-[#00ff8820] text-[#00ff88]" : "bg-[#ff9f0020] text-[#ff9f00]"}`, children: pass ? "PASS" : "CHECK" })
        ] }, label))
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-3 flex-wrap", children: /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: fetchData,
          className: "flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.3)] text-[#00d4ff] text-sm font-medium hover:bg-[rgba(0,212,255,0.15)] transition-colors",
          children: [
            /* @__PURE__ */ jsx(RefreshCw, { className: "w-4 h-4" }),
            "Re-test"
          ]
        }
      ) })
    ] }) : null }),
    /* @__PURE__ */ jsx(TopBannerAd, {}),
    /* @__PURE__ */ jsxs("div", { className: "glass-card p-6 seo-content", children: [
      /* @__PURE__ */ jsx("h2", { children: "What is a DNS Leak and Why Does It Matter?" }),
      /* @__PURE__ */ jsx("p", { children: "A DNS (Domain Name System) leak occurs when your DNS queries are sent outside of your VPN tunnel and directly to your ISP's DNS servers — even while you believe your connection is private. This exposes your browsing activity to your ISP and potentially to government surveillance or hackers on the same network." }),
      /* @__PURE__ */ jsx("h3", { children: "How DNS Leaks Happen" }),
      /* @__PURE__ */ jsx("p", { children: 'DNS leaks commonly occur due to misconfigured VPN software, operating system DNS fallback mechanisms, IPv6 DNS resolution bypassing the VPN tunnel, or WebRTC protocols. Windows has historically been prone to DNS leaks due to its "Smart Multi-Homed Name Resolution" feature that sends DNS queries to multiple DNS servers simultaneously.' }),
      /* @__PURE__ */ jsx("h3", { children: "ISP DNS vs. Public DNS" }),
      /* @__PURE__ */ jsx("p", { children: "By default, your device uses your ISP's DNS servers to resolve domain names. Your ISP logs all DNS queries, creating a detailed record of every website you visit. Switching to public DNS providers like Cloudflare (1.1.1.1) or Google (8.8.8.8) reduces ISP logging but still doesn't prevent DNS leaks if your VPN is misconfigured." }),
      /* @__PURE__ */ jsx("h3", { children: "How to Fix DNS Leaks" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Use a VPN with DNS leak protection:" }),
          " Quality VPN providers include built-in DNS leak protection that forces all DNS traffic through the VPN tunnel."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Enable DNS over HTTPS (DoH):" }),
          " Encrypts DNS queries so ISPs cannot read them, even if they're not going through the VPN."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Disable IPv6:" }),
          " Many DNS leaks occur through IPv6, which older VPN implementations don't tunnel properly."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Use DNS over TLS (DoT):" }),
          " Similar to DoH but uses a separate port (853) for encrypted DNS resolution."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 p-4 rounded-xl bg-[rgba(0,212,255,0.05)] border border-[rgba(0,212,255,0.15)] flex gap-3", children: [
        /* @__PURE__ */ jsx(Info, { className: "w-5 h-5 text-[#00d4ff] flex-shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-[#8b9ec7]", children: [
          "Learn more in our",
          " ",
          /* @__PURE__ */ jsx(Link, { to: "/dns-leak-explained", className: "text-[#00d4ff]", children: "DNS Leak complete guide" }),
          " ",
          "and check your",
          " ",
          /* @__PURE__ */ jsx(Link, { to: "/vpn-checker", className: "text-[#00d4ff]", children: "VPN security status" }),
          "."
        ] })
      ] })
    ] })
  ] });
}
function SidebarAd() {
  const containerRef = useRef(null);
  const scriptLoadedRef = useRef(false);
  useEffect(() => {
    if (scriptLoadedRef.current || !containerRef.current) return;
    scriptLoadedRef.current = true;
    const script = document.createElement("script");
    script.src = "https://pl29481526.effectivecpmnetwork.com/80/6b/f4/806bf445469727f60c03a49d7bcc637b.js";
    script.async = true;
    script.type = "text/javascript";
    containerRef.current.appendChild(script);
    return () => {
      if (containerRef.current && containerRef.current.contains(script)) {
        containerRef.current.removeChild(script);
      }
    };
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "ad-slot rounded-xl", ref: containerRef, style: { minHeight: "250px" } });
}
const Route$2 = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "My IP Address & Network Intelligence | NetWho Dashboard" },
      {
        name: "description",
        content: "Instantly check your public IP address, location, ISP, ZIP code, VPN/proxy status, and security score. Real-time network intelligence dashboard."
      }
    ]
  }),
  component: Dashboard
});
function ScoreGauge({ score, riskLevel }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - score / 100 * circumference;
  const colorMap = {
    "Low Risk": "#00ff88",
    "Medium Risk": "#ff9f00",
    "High Risk": "#ff6b35",
    Dangerous: "#ff2d55"
  };
  const color = colorMap[riskLevel] || "#00d4ff";
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative w-44 h-44", children: [
      /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 160 160", className: "w-full h-full -rotate-90", children: [
        /* @__PURE__ */ jsx("circle", { cx: "80", cy: "80", r: radius, fill: "none", stroke: "rgba(255,255,255,0.07)", strokeWidth: "12" }),
        /* @__PURE__ */ jsx(
          "circle",
          {
            cx: "80",
            cy: "80",
            r: radius,
            fill: "none",
            stroke: color,
            strokeWidth: "12",
            strokeLinecap: "round",
            strokeDasharray: circumference,
            strokeDashoffset: offset,
            style: { transition: "stroke-dashoffset 1.5s ease", filter: `drop-shadow(0 0 8px ${color})` }
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold", style: { color }, children: score }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 uppercase tracking-wider mt-1", children: "IP Score" })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "px-4 py-2 rounded-full text-sm font-semibold",
        style: {
          background: `${color}22`,
          color,
          border: `1px solid ${color}44`,
          boxShadow: `0 0 12px ${color}33`
        },
        children: riskLevel
      }
    )
  ] });
}
function InfoRow({
  label,
  value,
  icon: Icon,
  highlight,
  badge
}) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-3 border-b border-[rgba(255,255,255,0.05)] last:border-0 group", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-[#8b9ec7] min-w-[130px]", children: [
      Icon && /* @__PURE__ */ jsx(Icon, { className: "w-3.5 h-3.5 opacity-70" }),
      /* @__PURE__ */ jsx("span", { children: label })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-1 justify-end", children: [
      badge,
      /* @__PURE__ */ jsx(
        "span",
        {
          className: `text-sm font-mono text-right ${highlight ? "text-[#00d4ff] font-semibold text-base" : "text-white"}`,
          children: value
        }
      ),
      value !== "Not Available" && value !== "Unknown" && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: copy,
          className: "opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-[#00d4ff]",
          children: copied ? /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5 text-green-400" }) : /* @__PURE__ */ jsx(Copy, { className: "w-3.5 h-3.5" })
        }
      )
    ] })
  ] });
}
function SkeletonRow() {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-3 border-b border-[rgba(255,255,255,0.05)]", children: [
    /* @__PURE__ */ jsx("div", { className: "w-24 h-4 rounded shimmer" }),
    /* @__PURE__ */ jsx("div", { className: "w-36 h-4 rounded shimmer" })
  ] });
}
function DeviceIcon({ device }) {
  if (device === "Mobile") return /* @__PURE__ */ jsx(Smartphone, { className: "w-4 h-4" });
  if (device === "Tablet") return /* @__PURE__ */ jsx(Tablet, { className: "w-4 h-4" });
  return /* @__PURE__ */ jsx(Monitor, { className: "w-4 h-4" });
}
function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [screenRes, setScreenRes] = useState("");
  useEffect(() => {
    setScreenRes(`${window.screen.width}×${window.screen.height}`);
    fetchIpData();
  }, []);
  async function fetchIpData() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ip");
      if (!res.ok) throw new Error("Failed to fetch IP data");
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError("Could not load IP data. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  const vpnBadge = data ? data.vpnDetected ? /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#ff2d5520] text-[#ff2d55] border border-[#ff2d5540]", children: [
    /* @__PURE__ */ jsx(ShieldAlert, { className: "w-3 h-3" }),
    " VPN/Proxy"
  ] }) : /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#00ff8820] text-[#00ff88] border border-[#00ff8840]", children: [
    /* @__PURE__ */ jsx(ShieldCheck, { className: "w-3 h-3" }),
    " Clean IP"
  ] }) : null;
  return /* @__PURE__ */ jsxs("div", { className: "page-transition p-4 lg:p-6 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-2xl lg:text-3xl font-bold text-white", children: [
        "IP Intelligence ",
        /* @__PURE__ */ jsx("span", { className: "neon-text", children: "Dashboard" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-[#8b9ec7] text-sm mt-1", children: "Real-time analysis of your IP address, location, ISP, and security profile." })
    ] }),
    error && /* @__PURE__ */ jsxs("div", { className: "mb-4 p-4 rounded-xl bg-[#ff2d5515] border border-[#ff2d5540] text-[#ff2d55] flex items-center gap-3", children: [
      /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5 flex-shrink-0" }),
      /* @__PURE__ */ jsx("span", { children: error }),
      /* @__PURE__ */ jsx("button", { onClick: fetchIpData, className: "ml-auto text-sm underline hover:no-underline", children: "Retry" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "xl:col-span-1 flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "glass-card p-6 flex flex-col items-center gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "text-center mb-2", children: /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold uppercase tracking-wider text-[#8b9ec7]", children: "Internet IP Score" }) }),
          loading ? /* @__PURE__ */ jsx("div", { className: "w-44 h-44 rounded-full shimmer" }) : data ? /* @__PURE__ */ jsx(ScoreGauge, { score: data.score, riskLevel: data.riskLevel }) : null,
          data && data.riskFactors.length > 0 && /* @__PURE__ */ jsxs("div", { className: "w-full mt-2", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-[#8b9ec7] mb-2 font-medium", children: "Risk Factors Detected:" }),
            data.riskFactors.map((f) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-[#ff9f00] mb-1", children: [
              /* @__PURE__ */ jsx(AlertTriangle, { className: "w-3 h-3 flex-shrink-0" }),
              f
            ] }, f))
          ] }),
          data && data.riskFactors.length === 0 && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-[#00ff88]", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "w-3.5 h-3.5" }),
            "No risk factors detected"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "glass-card p-5", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold uppercase tracking-wider text-[#8b9ec7] mb-4", children: "VPN / Proxy Detection" }),
          loading ? /* @__PURE__ */ jsx("div", { className: "h-16 rounded shimmer" }) : data ? /* @__PURE__ */ jsxs(
            "div",
            {
              className: `rounded-xl p-4 flex items-center gap-4 ${data.vpnDetected ? "bg-[#ff2d5515] border border-[#ff2d5540]" : "bg-[#00ff8815] border border-[#00ff8840]"}`,
              children: [
                data.vpnDetected ? /* @__PURE__ */ jsx(ShieldAlert, { className: "w-8 h-8 text-[#ff2d55] flex-shrink-0" }) : /* @__PURE__ */ jsx(ShieldCheck, { className: "w-8 h-8 text-[#00ff88] flex-shrink-0" }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: `font-bold ${data.vpnDetected ? "text-[#ff2d55]" : "text-[#00ff88]"}`, children: data.vpnDetected ? "VPN / Proxy Detected" : "No VPN / Proxy" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-xs text-[#8b9ec7] mt-0.5", children: [
                    data.proxy && "HTTP Proxy active. ",
                    data.hosting && "Datacenter hosting IP detected. ",
                    !data.vpnDetected && "Your connection appears direct."
                  ] })
                ] })
              ]
            }
          ) : null,
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/vpn-checker",
              className: "mt-3 block text-center text-xs text-[#00d4ff] hover:underline",
              children: "Run full VPN security check →"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(SidebarAd, {})
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "xl:col-span-2 flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "glass-card p-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold uppercase tracking-wider text-[#8b9ec7]", children: "Network Information" }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: fetchIpData,
                disabled: loading,
                className: "flex items-center gap-1.5 text-xs text-[#8b9ec7] hover:text-[#00d4ff] transition-colors disabled:opacity-50",
                children: [
                  /* @__PURE__ */ jsx(RefreshCw, { className: `w-3.5 h-3.5 ${loading ? "animate-spin" : ""}` }),
                  "Refresh"
                ]
              }
            )
          ] }),
          loading ? Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ jsx(SkeletonRow, {}, i)) : data ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(InfoRow, { label: "IP Address", value: data.ip, icon: Globe, highlight: true }),
            /* @__PURE__ */ jsx(InfoRow, { label: "Country", value: `${data.country} (${data.countryCode})`, icon: Globe }),
            /* @__PURE__ */ jsx(InfoRow, { label: "City", value: data.city, icon: MapPin }),
            /* @__PURE__ */ jsx(InfoRow, { label: "Region / State", value: data.region, icon: MapPin }),
            /* @__PURE__ */ jsx(
              InfoRow,
              {
                label: "ZIP / Postal Code",
                value: data.zip,
                icon: MapPin,
                highlight: data.zip !== "Not Available"
              }
            ),
            /* @__PURE__ */ jsx(InfoRow, { label: "Timezone", value: data.timezone, icon: Clock }),
            /* @__PURE__ */ jsx(InfoRow, { label: "ISP", value: data.isp, icon: Wifi }),
            /* @__PURE__ */ jsx(InfoRow, { label: "Organization", value: data.org, icon: Server }),
            /* @__PURE__ */ jsx(InfoRow, { label: "ASN", value: data.asn, icon: Server }),
            /* @__PURE__ */ jsx(InfoRow, { label: "VPN / Proxy", value: data.vpnDetected ? "YES — Detected" : "NO — Not Detected", icon: Shield, badge: vpnBadge })
          ] }) : null
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "glass-card p-5", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold uppercase tracking-wider text-[#8b9ec7] mb-4", children: "Device & Browser Information" }),
          loading ? Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ jsx(SkeletonRow, {}, i)) : data ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              InfoRow,
              {
                label: "Browser",
                value: data.device.browser,
                icon: Monitor
              }
            ),
            /* @__PURE__ */ jsx(
              InfoRow,
              {
                label: "Operating System",
                value: data.device.os,
                icon: Monitor
              }
            ),
            /* @__PURE__ */ jsx(
              InfoRow,
              {
                label: "Device Type",
                value: data.device.device,
                icon: () => /* @__PURE__ */ jsx(DeviceIcon, { device: data.device.device })
              }
            ),
            /* @__PURE__ */ jsx(
              InfoRow,
              {
                label: "Screen Resolution",
                value: screenRes || "Detecting...",
                icon: Monitor
              }
            )
          ] }) : null
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
          { to: "/vpn-checker", label: "VPN Security Check", icon: Shield, color: "#0066ff" },
          { to: "/speed-test", label: "Speed Test", icon: () => /* @__PURE__ */ jsx("span", { className: "text-base", children: "⚡" }), color: "#ff9f00" },
          { to: "/dns-leak", label: "DNS Leak Test", icon: Wifi, color: "#00ff88" }
        ].map(({ to, label, icon: Icon, color }) => /* @__PURE__ */ jsxs(
          Link,
          {
            to,
            className: "glass-card p-4 flex items-center gap-3 hover:border-[rgba(0,212,255,0.4)] transition-all",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-9 h-9 rounded-lg flex items-center justify-center",
                  style: { background: `${color}22`, color },
                  children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5" })
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-white", children: label })
            ]
          },
          to
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 glass-card p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-white mb-2", children: "What Does Your IP Address Reveal?" }),
      /* @__PURE__ */ jsx("p", { className: "text-[#8b9ec7] text-sm leading-relaxed", children: "Your IP address is a unique identifier assigned by your Internet Service Provider (ISP) that reveals your approximate geographic location, including country, city, region, and in many cases your ZIP or postal code. Every website you visit can see this information. Websites also detect your browser, operating system, and device type through a combination of your IP and user-agent string. NetWho's dashboard shows you exactly what others see when you connect to the internet — empowering you to make informed decisions about your online privacy." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-3 flex gap-3 flex-wrap", children: [
        /* @__PURE__ */ jsx(Link, { to: "/what-is-ip-address", className: "text-xs text-[#00d4ff] hover:underline", children: "Learn more about IP addresses →" }),
        /* @__PURE__ */ jsx(Link, { to: "/online-privacy-guide", className: "text-xs text-[#00d4ff] hover:underline", children: "Online privacy guide →" })
      ] })
    ] })
  ] });
}
const Route$1 = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/dashboard" });
  }
});
const Route = createFileRoute("/api/ip")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const headers = request.headers;
        const clientIp = headers.get("x-nf-client-connection-ip") || headers.get("x-real-ip") || headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "8.8.8.8";
        const userAgent = headers.get("user-agent") || "";
        const deviceInfo = parseUserAgent(userAgent);
        try {
          const fields = "status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,proxy,hosting,query";
          const apiRes = await fetch(
            `http://ip-api.com/json/${clientIp}?fields=${fields}`,
            { signal: AbortSignal.timeout(5e3) }
          );
          if (!apiRes.ok) {
            throw new Error(`ip-api.com returned ${apiRes.status}`);
          }
          const data = await apiRes.json();
          if (data.status !== "success") {
            throw new Error(data.message || "ip-api.com lookup failed");
          }
          let zip = data.zip || "";
          if (!zip) {
            zip = await fetchZipFallback(clientIp, data.lat, data.lon);
          }
          const { score, riskLevel, riskFactors } = computeIpScore({
            proxy: data.proxy,
            hosting: data.hosting,
            countryCode: data.countryCode
          });
          const vpnDetected = data.proxy || data.hosting;
          const result = {
            ip: data.query || clientIp,
            country: data.country || "Unknown",
            countryCode: data.countryCode || "",
            region: data.regionName || data.region || "Unknown",
            city: data.city || "Unknown",
            zip: zip || "Not Available",
            lat: data.lat || 0,
            lon: data.lon || 0,
            timezone: data.timezone || "Unknown",
            isp: data.isp || "Unknown",
            org: data.org || "Unknown",
            asn: data.as || "Unknown",
            proxy: data.proxy || false,
            hosting: data.hosting || false,
            vpnDetected,
            score,
            riskLevel,
            riskFactors,
            device: deviceInfo
          };
          return Response.json(result, {
            headers: {
              "Cache-Control": "no-store, no-cache",
              "Content-Type": "application/json"
            }
          });
        } catch (err) {
          console.error("IP lookup error:", err);
          return Response.json(
            {
              error: "Failed to fetch IP information",
              ip: clientIp,
              zip: "Not Available"
            },
            { status: 500 }
          );
        }
      }
    }
  }
});
async function fetchZipFallback(ip, lat, lon) {
  try {
    const res = await fetch(`https://ipinfo.io/${ip}/json`, {
      signal: AbortSignal.timeout(3e3)
    });
    if (res.ok) {
      const d = await res.json();
      if (d.postal) return d.postal;
    }
  } catch {
  }
  if (lat && lon) {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
        {
          headers: { "User-Agent": "NetWho/1.0" },
          signal: AbortSignal.timeout(3e3)
        }
      );
      if (res.ok) {
        const d = await res.json();
        const postal = d.address?.postcode || d.address?.postal_code || "";
        if (postal) return postal;
      }
    } catch {
    }
  }
  return "";
}
function computeIpScore(opts) {
  let score = 100;
  const riskFactors = [];
  if (opts.proxy) {
    score -= 50;
    riskFactors.push("HTTP proxy detected");
  }
  if (opts.hosting) {
    score -= 25;
    riskFactors.push("Datacenter / VPN hosting IP");
  }
  const highRiskCountries = ["RU", "CN", "KP", "IR", "BY", "SY"];
  if (highRiskCountries.includes(opts.countryCode)) {
    score -= 10;
    riskFactors.push("High-risk country of origin");
  }
  score = Math.max(0, score);
  let riskLevel;
  if (score >= 75) riskLevel = "Low Risk";
  else if (score >= 45) riskLevel = "Medium Risk";
  else if (score >= 15) riskLevel = "High Risk";
  else riskLevel = "Dangerous";
  return { score, riskLevel, riskFactors };
}
function parseUserAgent(ua) {
  let browser = "Unknown Browser";
  let os = "Unknown OS";
  let device = "Desktop";
  if (ua.includes("Edg/")) browser = "Microsoft Edge";
  else if (ua.includes("Chrome/") && !ua.includes("Chromium"))
    browser = "Google Chrome";
  else if (ua.includes("Firefox/")) browser = "Mozilla Firefox";
  else if (ua.includes("Safari/") && !ua.includes("Chrome"))
    browser = "Apple Safari";
  else if (ua.includes("OPR/") || ua.includes("Opera/")) browser = "Opera";
  else if (ua.includes("Brave")) browser = "Brave";
  if (ua.includes("Windows NT 10")) os = "Windows 10/11";
  else if (ua.includes("Windows NT 6.3")) os = "Windows 8.1";
  else if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Mac OS X")) os = "macOS";
  else if (ua.includes("iPhone")) os = "iOS";
  else if (ua.includes("iPad")) os = "iPadOS";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("Linux")) os = "Linux";
  else if (ua.includes("CrOS")) os = "Chrome OS";
  if (ua.includes("Mobile") || ua.includes("iPhone") || ua.includes("Android"))
    device = "Mobile";
  else if (ua.includes("iPad") || ua.includes("Tablet")) device = "Tablet";
  return { browser, os, device };
}
const WhatIsIpAddressRoute = Route$a.update({
  id: "/what-is-ip-address",
  path: "/what-is-ip-address",
  getParentRoute: () => Route$b
});
const VpnExplainedRoute = Route$9.update({
  id: "/vpn-explained",
  path: "/vpn-explained",
  getParentRoute: () => Route$b
});
const VpnCheckerRoute = Route$8.update({
  id: "/vpn-checker",
  path: "/vpn-checker",
  getParentRoute: () => Route$b
});
const SpeedTestRoute = Route$7.update({
  id: "/speed-test",
  path: "/speed-test",
  getParentRoute: () => Route$b
});
const OnlinePrivacyGuideRoute = Route$6.update({
  id: "/online-privacy-guide",
  path: "/online-privacy-guide",
  getParentRoute: () => Route$b
});
const InternetSpeedGuideRoute = Route$5.update({
  id: "/internet-speed-guide",
  path: "/internet-speed-guide",
  getParentRoute: () => Route$b
});
const DnsLeakExplainedRoute = Route$4.update({
  id: "/dns-leak-explained",
  path: "/dns-leak-explained",
  getParentRoute: () => Route$b
});
const DnsLeakRoute = Route$3.update({
  id: "/dns-leak",
  path: "/dns-leak",
  getParentRoute: () => Route$b
});
const DashboardRoute = Route$2.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$b
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$b
});
const ApiIpRoute = Route.update({
  id: "/api/ip",
  path: "/api/ip",
  getParentRoute: () => Route$b
});
const rootRouteChildren = {
  IndexRoute,
  DashboardRoute,
  DnsLeakRoute,
  DnsLeakExplainedRoute,
  InternetSpeedGuideRoute,
  OnlinePrivacyGuideRoute,
  SpeedTestRoute,
  VpnCheckerRoute,
  VpnExplainedRoute,
  WhatIsIpAddressRoute,
  ApiIpRoute
};
const routeTree = Route$b._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
export {
  getRouter
};
