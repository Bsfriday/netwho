import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef, useEffect } from 'react'
import { Globe2, MapPin, RefreshCw, Sparkles } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { CopyButton } from '@/components/CopyButton'
import { generateLocation, getCountryOptions, LocationData } from '@/utils/locationGenerator'

export const Route = createFileRoute('/location-generator')({
  head: () => ({
    meta: [
      { title: 'Location Generator – Random Address Generator | NetWho' },
      {
        name: 'description',
        content:
          'Generate realistic random addresses, postal codes, cities, and regions with a fast location generator. Perfect for testing forms, design mockups, and SEO-focused location tools.',
      },
    ],
  }),
  component: LocationGenerator,
})

const countryOptions = getCountryOptions()

function LocationGenerator() {
  const [country, setCountry] = useState(countryOptions[0])
  const [location, setLocation] = useState<LocationData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const resultRef = useRef<HTMLDivElement | null>(null)

  const handleGenerate = () => {
    setError(null)
    // Instant generation with immediate data population
    try {
      setLoading(false)
      const next = generateLocation(country)
      setLocation(next)
      // reveal the result with animation
      setShowResult(false)
      requestAnimationFrame(() => requestAnimationFrame(() => setShowResult(true)))
      // scroll result into view after a short tick
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 80)
    } catch (err) {
      setError('Unable to generate a location right now. Please try again.')
    }
  }

  return (
    <div className="page-transition p-4 lg:p-6 max-w-6xl mx-auto">
      <div className="mb-6 flex flex-col gap-3">
        <div className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-[#00d4ff] font-semibold">
          <Sparkles className="w-4 h-4" />
          New Tool
        </div>
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white">
            Location Generator <span className="neon-text">Tool</span>
          </h1>
          <p className="max-w-3xl text-[#8b9ec7] mt-3 text-sm lg:text-base leading-7">
            Generate realistic random countries, cities, states, postal codes, and full addresses instantly. This modern random address generator helps you build location-focused tools, test forms, and improve SEO with location-based content.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="glass-card p-6 lg:pt-7 lg:pb-7 lg:px-7">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white">Generate a realistic address</h2>
                <p className="text-[#8b9ec7] text-sm mt-1">
                  Use the country selector and create new postal codes, cities, regions, and full addresses without reloading the page.
                </p>
              </div>
              <div className="rounded-full bg-[rgba(0,212,255,0.08)] px-3 py-2 text-xs uppercase tracking-[0.2em] text-[#00d4ff]">
                Fast / Mobile
              </div>
            </div>

            <div className="grid gap-4">
              <label className="block text-sm font-semibold text-[#cbd5e1]">Select country</label>
              <select
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                className="w-full rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[#081126] px-4 py-3 text-sm text-white outline-none focus:border-[#00d4ff] focus:ring-2 focus:ring-[#00d4ff22]"
              >
                {countryOptions.map((name) => (
                  <option key={name} value={name} className="bg-[#081126] text-white">
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <button
                onClick={handleGenerate}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#00d4ff] px-5 py-3 text-sm font-semibold text-[#020617] transition hover:bg-[#29b7ff]"
              >
                <RefreshCw className="w-4 h-4" />
                Generate address
              </button>
              <div className="text-sm text-[#8b9ec7]">
                {location ? 'Different results every time.' : 'Choose a country and press generate.'}
              </div>
            </div>

            {error && (
              <div className="rounded-3xl border border-[#ff2d5530] bg-[#ff2d5515] p-4 text-sm text-[#ffb3c1]">
                {error}
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: 'Random address generator', value: 'Generate locations quickly for test data, SEO, and mockups.' },
                { label: 'Postal code generator', value: 'Create realistic ZIP and postal codes for multiple countries.' },
                { label: 'Country location generator', value: 'Switch between countries and generate region, city, and postal details.' },
                { label: 'Fake address generator', value: 'Produce plausible addresses for form testing, design, and demo content.' },
              ].map((item) => (
                <div key={item.label} className="rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-[#4a5c7a] mb-2">{item.label}</p>
                  <p className="text-sm text-[#cbd5e1] leading-6">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-[rgba(0,212,255,0.15)] bg-[rgba(0,212,255,0.03)] p-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#00d4ff] mb-3">Related tools</h3>
              <div className="grid gap-3 text-sm text-[#cbd5e1]">
                <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-2xl border border-[rgba(255,255,255,0.08)] px-4 py-3 text-[#cbd5e1] transition hover:border-[#00d4ff] hover:text-white">
                  <MapPin className="w-4 h-4 text-[#00d4ff]" />
                  IP Dashboard
                </Link>
                <Link to="/vpn-checker" className="inline-flex items-center gap-2 rounded-2xl border border-[rgba(255,255,255,0.08)] px-4 py-3 text-[#cbd5e1] transition hover:border-[#00d4ff] hover:text-white">
                  <Globe2 className="w-4 h-4 text-[#00d4ff]" />
                  VPN Checker
                </Link>
                <Link to="/speed-test" className="inline-flex items-center gap-2 rounded-2xl border border-[rgba(255,255,255,0.08)] px-4 py-3 text-[#cbd5e1] transition hover:border-[#00d4ff] hover:text-white">
                  <Sparkles className="w-4 h-4 text-[#00d4ff]" />
                  Speed Test
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Result section: hidden until generation; when present it spans full width below generator */}
        {location ? (
          <section
            ref={resultRef}
            className={`glass-card p-6 lg:p-7 lg:col-span-2 transform transition-all duration-400 ease-out ${
              showResult ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="flex items-center justify-between gap-3 mb-6">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-[#4a5c7a]">Result</p>
                <h2 className="text-2xl font-semibold text-white mt-2">Random location details</h2>
              </div>
              <div className="rounded-full px-3 py-2 text-xs uppercase tracking-[0.2em] text-[#00d9ff] bg-[rgba(0,217,255,0.06)] ring-2 ring-[#00d9ff22] shadow-[0_0_18px_rgba(0,217,255,0.08)]">
                READY
              </div>
            </div>

            <div className="space-y-4">
              <LocationResultCard location={location} onGenerate={handleGenerate} />
            </div>
          </section>
        ) : (
          <section className="glass-card p-6 lg:p-7">
            <div className="flex items-center justify-between gap-3 mb-6">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-[#4a5c7a]">Result</p>
                <h2 className="text-2xl font-semibold text-white mt-2">Random location details</h2>
              </div>
              <div className="rounded-full bg-[rgba(0,212,255,0.08)] px-3 py-2 text-xs uppercase tracking-[0.2em] text-[#00d4ff]">
                Waiting
              </div>
            </div>

            <div className="rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-6 text-sm text-[#8b9ec7]">
              No address generated yet. Use the button above to create a country-based random address and postal code.
            </div>
          </section>
        )}
      </div>

      <article className="glass-card p-6 mt-6 prose prose-invert max-w-none">
        <h2 className="text-2xl font-semibold text-white">Why use this random address generator?</h2>
        <p>
          This location generator is designed for fast generation of realistic-looking addresses, postal codes, and regions across multiple countries. It helps designers, developers, and content creators with test data, SEO-rich geolocation tools, and mock location content.
        </p>
        <p>
          The tool supports multiple countries with localized city names, state or region selection, and postal / ZIP formats. Every generation creates a new result without reloading the page, making it ideal for prototyping and user-focused utilities.
        </p>
        <h3 className="mt-6 text-xl font-semibold text-white">SEO-focused features</h3>
        <ul className="list-disc list-inside space-y-2 text-[#cbd5e1]">
          <li>Random address generator optimized for postal code and ZIP code lookup keywords.</li>
          <li>Country location generator content that supports internal linking to related tools.</li>
          <li>Modern responsive design with glassmorphism and neon accents for a polished user experience.</li>
        </ul>
        <p>
          Whether you need a fake address generator for form testing or a country location generator for landing pages, this page keeps everything production-ready and ready for Cloudflare Pages deployment.
        </p>
      </article>
    </div>
  )
}

function TypingText({ text }: { text?: string }) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    if (!text) {
      setDisplayed('')
      return
    }
    let i = 0
    setDisplayed('')
    const id = setInterval(() => {
      i += 1
      setDisplayed(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, Math.max(8, Math.floor(180 / Math.max(1, text.length))))
    return () => clearInterval(id)
  }, [text])
  return <p className="break-words text-sm text-white leading-6">{displayed}</p>
}

function LocationResultCard({
  location,
  onGenerate,
}: {
  location: LocationData
  onGenerate?: () => void
}) {
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-[rgba(0,217,255,0.06)] p-2 shadow-[0_0_12px_rgba(0,217,255,0.06)]">
            <MapPin className="w-5 h-5 text-[#00d9ff]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Generated location</p>
            <p className="text-xs text-[#8b9ec7]">Instant results · Light typing animation</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CopyButton value={location.fullAddress} label="Copy Address" />
          <button
            onClick={() => onGenerate && onGenerate()}
            className="rounded-full bg-[#00d9ff] px-4 py-2 text-sm font-semibold text-[#020617] shadow-[0_6px_18px_rgba(0,217,255,0.12)] transition transform hover:-translate-y-1"
          >
            Generate New
          </button>
          <button className="rounded-full bg-[rgba(255,255,255,0.03)] px-4 py-2 text-sm text-[#cbd5e1] transition hover:-translate-y-1">Save</button>
          <button className="rounded-full bg-[rgba(255,255,255,0.03)] px-4 py-2 text-sm text-[#cbd5e1] transition hover:-translate-y-1">Share</button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { label: 'Street Address', value: location.street },
          { label: 'City', value: location.city },
          { label: 'State / Region', value: location.region },
          { label: 'Postal / ZIP Code', value: location.postalCode },
          { label: 'Country', value: location.country },
          { label: 'Full Address', value: location.fullAddress },
          { label: 'Coordinates', value: location.latitude && location.longitude ? `${location.latitude}, ${location.longitude}` : 'N/A' },
          { label: 'Time Zone', value: location.timezone ?? 'UTC' },
        ].map((field) => (
          <div key={field.label} className="rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[#4a5c7a] mb-2">{field.label}</p>
                <TypingText text={String(field.value)} />
              </div>
              <CopyButton value={String(field.value)} label="Copy" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
