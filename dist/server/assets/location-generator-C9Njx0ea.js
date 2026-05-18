import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Check, Clipboard, Sparkles, RefreshCw, MapPin, Globe2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
function CopyButton({ value, label = "Copy" }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1500);
    return () => window.clearTimeout(timer);
  }, [copied]);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      onClick: handleCopy,
      className: "inline-flex items-center gap-2 px-3 py-2 rounded-full border border-[rgba(0,212,255,0.18)] bg-[rgba(0,212,255,0.06)] text-xs text-[#c3e8ff] hover:bg-[rgba(0,212,255,0.12)] transition",
      children: [
        copied ? /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5 text-[#00ff88]" }) : /* @__PURE__ */ jsx(Clipboard, { className: "w-3.5 h-3.5" }),
        copied ? "Copied" : label
      ]
    }
  );
}
const streetNames = [
  "Maple",
  "Elm",
  "Cedar",
  "Oak",
  "Pine",
  "Willow",
  "Birch",
  "Sunset",
  "River",
  "Harvest",
  "Liberty",
  "Cherry",
  "King",
  "Mill",
  "Park"
];
const streetSuffixes = ["St", "Ave", "Blvd", "Ln", "Way", "Dr", "Court", "Terrace"];
const countries = [
  {
    name: "United States",
    code: "US",
    regions: ["California", "New York", "Texas", "Florida", "Washington", "Illinois", "Colorado"],
    cities: ["Los Angeles", "New York", "Miami", "Austin", "Seattle", "Chicago", "Denver"],
    postalFormatter: () => `${randInt(1e4, 99999)}`
  },
  {
    name: "Canada",
    code: "CA",
    regions: ["Ontario", "Quebec", "British Columbia", "Alberta", "Nova Scotia", "Manitoba"],
    cities: ["Toronto", "Montreal", "Vancouver", "Calgary", "Ottawa", "Halifax"],
    postalFormatter: () => {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const digit = "0123456789";
      return `${randChar(letters)}${randChar(digit)}${randChar(letters)} ${randChar(digit)}${randChar(letters)}${randChar(digit)}`;
    }
  },
  {
    name: "United Kingdom",
    code: "UK",
    regions: ["Greater London", "Greater Manchester", "West Midlands", "West Yorkshire", "Surrey", "Kent"],
    cities: ["London", "Manchester", "Birmingham", "Leeds", "Bristol", "Liverpool"],
    postalFormatter: () => {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const digit = "0123456789";
      return `${randChar(letters)}${randChar(letters)}${randInt(1, 9)}${Math.random() > 0.5 ? randChar(digit) : ""} ${randInt(1, 9)}${randChar(letters)}${randChar(letters)}`;
    }
  },
  {
    name: "Germany",
    code: "DE",
    regions: ["Bavaria", "Berlin", "North Rhine-Westphalia", "Hesse", "Saxony", "Hamburg"],
    cities: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne", "Stuttgart"],
    postalFormatter: () => `${randInt(1e4, 99999)}`
  },
  {
    name: "Australia",
    code: "AU",
    regions: ["New South Wales", "Victoria", "Queensland", "Western Australia", "South Australia"],
    cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
    postalFormatter: () => `${randInt(1e3, 9999)}`
  },
  {
    name: "Japan",
    code: "JP",
    regions: ["Tokyo", "Osaka", "Kyoto", "Hokkaido", "Fukuoka"],
    cities: ["Tokyo", "Osaka", "Kyoto", "Sapporo", "Fukuoka", "Yokohama"],
    postalFormatter: () => `${randInt(100, 999)}-${randInt(1e3, 9999)}`
  }
];
function getCountryOptions() {
  return countries.map((country) => country.name);
}
function generateLocation(countryName) {
  const country = countries.find((entry) => entry.name === countryName) ?? countries[0];
  const region = randomItem(country.regions);
  const city = randomItem(country.cities);
  const street = `${randInt(100, 9999)} ${randomItem(streetNames)} ${randomItem(streetSuffixes)}`;
  const postalCode = country.postalFormatter();
  const apartment = Math.random() < 0.4 ? ` Apt ${randInt(2, 999)}` : "";
  const fullAddress = `${street}${apartment}, ${city}, ${region} ${postalCode}, ${country.name}`;
  return {
    country: country.name,
    countryCode: country.code,
    region,
    city,
    postalCode,
    street: `${street}${apartment}`,
    fullAddress
  };
}
function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randChar(chars) {
  return chars[Math.floor(Math.random() * chars.length)];
}
const countryOptions = getCountryOptions();
function LocationGenerator() {
  const [country, setCountry] = useState(countryOptions[0]);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleGenerate = () => {
    setError(null);
    setLoading(true);
    setTimeout(() => {
      try {
        const next = generateLocation(country);
        setLocation(next);
      } catch (err) {
        setError("Unable to generate a location right now. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 180);
  };
  return /* @__PURE__ */ jsxs("div", { className: "page-transition p-4 lg:p-6 max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-[#00d4ff] font-semibold", children: [
        /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4" }),
        "New Tool"
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-3xl lg:text-4xl font-bold text-white", children: [
          "Location Generator ",
          /* @__PURE__ */ jsx("span", { className: "neon-text", children: "Tool" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "max-w-3xl text-[#8b9ec7] mt-3 text-sm lg:text-base leading-7", children: "Generate realistic random countries, cities, states, postal codes, and full addresses instantly. This modern random address generator helps you build location-focused tools, test forms, and improve SEO with location-based content." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-[1.1fr_0.9fr]", children: [
      /* @__PURE__ */ jsx("section", { className: "glass-card p-6 lg:pt-7 lg:pb-7 lg:px-7", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-white", children: "Generate a realistic address" }),
            /* @__PURE__ */ jsx("p", { className: "text-[#8b9ec7] text-sm mt-1", children: "Use the country selector and create new postal codes, cities, regions, and full addresses without reloading the page." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "rounded-full bg-[rgba(0,212,255,0.08)] px-3 py-2 text-xs uppercase tracking-[0.2em] text-[#00d4ff]", children: "Fast / Mobile" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-[#cbd5e1]", children: "Select country" }),
          /* @__PURE__ */ jsx("select", { value: country, onChange: (event) => setCountry(event.target.value), className: "w-full rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[#081126] px-4 py-3 text-sm text-white outline-none focus:border-[#00d4ff] focus:ring-2 focus:ring-[#00d4ff22]", children: countryOptions.map((name) => /* @__PURE__ */ jsx("option", { value: name, className: "bg-[#081126] text-white", children: name }, name)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3", children: [
          /* @__PURE__ */ jsxs("button", { onClick: handleGenerate, className: "inline-flex items-center justify-center gap-2 rounded-full bg-[#00d4ff] px-5 py-3 text-sm font-semibold text-[#020617] transition hover:bg-[#29b7ff]", children: [
            /* @__PURE__ */ jsx(RefreshCw, { className: "w-4 h-4" }),
            "Generate address"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-[#8b9ec7]", children: location ? "Different results every time." : "Choose a country and press generate." })
        ] }),
        error && /* @__PURE__ */ jsx("div", { className: "rounded-3xl border border-[#ff2d5530] bg-[#ff2d5515] p-4 text-sm text-[#ffb3c1]", children: error }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-2", children: [{
          label: "Random address generator",
          value: "Generate locations quickly for test data, SEO, and mockups."
        }, {
          label: "Postal code generator",
          value: "Create realistic ZIP and postal codes for multiple countries."
        }, {
          label: "Country location generator",
          value: "Switch between countries and generate region, city, and postal details."
        }, {
          label: "Fake address generator",
          value: "Produce plausible addresses for form testing, design, and demo content."
        }].map((item) => /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-4", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.25em] text-[#4a5c7a] mb-2", children: item.label }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-[#cbd5e1] leading-6", children: item.value })
        ] }, item.label)) }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border border-[rgba(0,212,255,0.15)] bg-[rgba(0,212,255,0.03)] p-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold uppercase tracking-[0.24em] text-[#00d4ff] mb-3", children: "Related tools" }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-3 text-sm text-[#cbd5e1]", children: [
            /* @__PURE__ */ jsxs(Link, { to: "/dashboard", className: "inline-flex items-center gap-2 rounded-2xl border border-[rgba(255,255,255,0.08)] px-4 py-3 text-[#cbd5e1] transition hover:border-[#00d4ff] hover:text-white", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4 text-[#00d4ff]" }),
              "IP Dashboard"
            ] }),
            /* @__PURE__ */ jsxs(Link, { to: "/vpn-checker", className: "inline-flex items-center gap-2 rounded-2xl border border-[rgba(255,255,255,0.08)] px-4 py-3 text-[#cbd5e1] transition hover:border-[#00d4ff] hover:text-white", children: [
              /* @__PURE__ */ jsx(Globe2, { className: "w-4 h-4 text-[#00d4ff]" }),
              "VPN Checker"
            ] }),
            /* @__PURE__ */ jsxs(Link, { to: "/speed-test", className: "inline-flex items-center gap-2 rounded-2xl border border-[rgba(255,255,255,0.08)] px-4 py-3 text-[#cbd5e1] transition hover:border-[#00d4ff] hover:text-white", children: [
              /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 text-[#00d4ff]" }),
              "Speed Test"
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "glass-card p-6 lg:p-7", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 mb-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm uppercase tracking-[0.24em] text-[#4a5c7a]", children: "Result" }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-white mt-2", children: "Random location details" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "rounded-full bg-[rgba(0,212,255,0.08)] px-3 py-2 text-xs uppercase tracking-[0.2em] text-[#00d4ff]", children: location ? "Ready" : "Waiting" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: loading ? /* @__PURE__ */ jsx("div", { className: "space-y-4", children: Array.from({
          length: 4
        }).map((_, index) => /* @__PURE__ */ jsx("div", { className: "h-16 rounded-3xl bg-[rgba(255,255,255,0.04)] shimmer" }, index)) }) : location ? /* @__PURE__ */ jsx(LocationResultCard, { location }) : /* @__PURE__ */ jsx("div", { className: "rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-6 text-sm text-[#8b9ec7]", children: "No address generated yet. Use the button above to create a country-based random address and postal code." }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("article", { className: "glass-card p-6 mt-6 prose prose-invert max-w-none", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-white", children: "Why use this random address generator?" }),
      /* @__PURE__ */ jsx("p", { children: "This location generator is designed for fast generation of realistic-looking addresses, postal codes, and regions across multiple countries. It helps designers, developers, and content creators with test data, SEO-rich geolocation tools, and mock location content." }),
      /* @__PURE__ */ jsx("p", { children: "The tool supports multiple countries with localized city names, state or region selection, and postal / ZIP formats. Every generation creates a new result without reloading the page, making it ideal for prototyping and user-focused utilities." }),
      /* @__PURE__ */ jsx("h3", { className: "mt-6 text-xl font-semibold text-white", children: "SEO-focused features" }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside space-y-2 text-[#cbd5e1]", children: [
        /* @__PURE__ */ jsx("li", { children: "Random address generator optimized for postal code and ZIP code lookup keywords." }),
        /* @__PURE__ */ jsx("li", { children: "Country location generator content that supports internal linking to related tools." }),
        /* @__PURE__ */ jsx("li", { children: "Modern responsive design with glassmorphism and neon accents for a polished user experience." })
      ] }),
      /* @__PURE__ */ jsx("p", { children: "Whether you need a fake address generator for form testing or a country location generator for landing pages, this page keeps everything production-ready and ready for Cloudflare Pages deployment." })
    ] })
  ] });
}
function LocationResultCard({
  location
}) {
  return /* @__PURE__ */ jsx("div", { className: "grid gap-4", children: [{
    label: "Street Address",
    value: location.street
  }, {
    label: "City",
    value: location.city
  }, {
    label: "State / Region",
    value: location.region
  }, {
    label: "Postal / ZIP Code",
    value: location.postalCode
  }, {
    label: "Country",
    value: location.country
  }, {
    label: "Full Address",
    value: location.fullAddress
  }].map((field) => /* @__PURE__ */ jsx("div", { className: "rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-[#4a5c7a] mb-2", children: field.label }),
      /* @__PURE__ */ jsx("p", { className: "break-words text-sm text-white leading-6", children: field.value })
    ] }),
    /* @__PURE__ */ jsx(CopyButton, { value: field.value, label: "Copy" })
  ] }) }, field.label)) });
}
export {
  LocationGenerator as component
};
