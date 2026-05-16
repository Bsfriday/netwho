import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/ip')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const headers = request.headers

        // Extract real client IP - Netlify provides this
        const clientIp =
          headers.get('x-nf-client-connection-ip') ||
          headers.get('x-real-ip') ||
          headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
          '8.8.8.8'

        // Build user-agent details
        const userAgent = headers.get('user-agent') || ''

        // Parse device/browser from UA
        const deviceInfo = parseUserAgent(userAgent)

        try {
          // Primary: ip-api.com - includes ZIP/postal code
          const fields =
            'status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,proxy,hosting,query'
          const apiRes = await fetch(
            `http://ip-api.com/json/${clientIp}?fields=${fields}`,
            { signal: AbortSignal.timeout(5000) },
          )

          if (!apiRes.ok) {
            throw new Error(`ip-api.com returned ${apiRes.status}`)
          }

          const data = await apiRes.json()

          if (data.status !== 'success') {
            throw new Error(data.message || 'ip-api.com lookup failed')
          }

          // ZIP fallback: if missing, try alternative
          let zip = data.zip || ''
          if (!zip) {
            zip = await fetchZipFallback(clientIp, data.lat, data.lon)
          }

          // Compute IP Score (0–100)
          const { score, riskLevel, riskFactors } = computeIpScore({
            proxy: data.proxy,
            hosting: data.hosting,
            countryCode: data.countryCode,
          })

          const vpnDetected = data.proxy || data.hosting

          const result = {
            ip: data.query || clientIp,
            country: data.country || 'Unknown',
            countryCode: data.countryCode || '',
            region: data.regionName || data.region || 'Unknown',
            city: data.city || 'Unknown',
            zip: zip || 'Not Available',
            lat: data.lat || 0,
            lon: data.lon || 0,
            timezone: data.timezone || 'Unknown',
            isp: data.isp || 'Unknown',
            org: data.org || 'Unknown',
            asn: data.as || 'Unknown',
            proxy: data.proxy || false,
            hosting: data.hosting || false,
            vpnDetected,
            score,
            riskLevel,
            riskFactors,
            device: deviceInfo,
          }

          return Response.json(result, {
            headers: {
              'Cache-Control': 'no-store, no-cache',
              'Content-Type': 'application/json',
            },
          })
        } catch (err) {
          console.error('IP lookup error:', err)
          return Response.json(
            {
              error: 'Failed to fetch IP information',
              ip: clientIp,
              zip: 'Not Available',
            },
            { status: 500 },
          )
        }
      },
    },
  },
})

async function fetchZipFallback(
  ip: string,
  lat: number,
  lon: number,
): Promise<string> {
  // Fallback 1: try ipinfo.io (no key needed for basic info)
  try {
    const res = await fetch(`https://ipinfo.io/${ip}/json`, {
      signal: AbortSignal.timeout(3000),
    })
    if (res.ok) {
      const d = await res.json()
      if (d.postal) return d.postal
    }
  } catch {
    // ignore
  }

  // Fallback 2: try reverse geocoding by lat/lon
  if (lat && lon) {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
        {
          headers: { 'User-Agent': 'NetWho/1.0' },
          signal: AbortSignal.timeout(3000),
        },
      )
      if (res.ok) {
        const d = await res.json()
        const postal =
          d.address?.postcode || d.address?.postal_code || ''
        if (postal) return postal
      }
    } catch {
      // ignore
    }
  }

  return ''
}

function computeIpScore(opts: {
  proxy: boolean
  hosting: boolean
  countryCode: string
}): { score: number; riskLevel: string; riskFactors: string[] } {
  let score = 100
  const riskFactors: string[] = []

  if (opts.proxy) {
    score -= 50
    riskFactors.push('HTTP proxy detected')
  }
  if (opts.hosting) {
    score -= 25
    riskFactors.push('Datacenter / VPN hosting IP')
  }

  // High-risk country codes (simplified list based on common threat intel)
  const highRiskCountries = ['RU', 'CN', 'KP', 'IR', 'BY', 'SY']
  if (highRiskCountries.includes(opts.countryCode)) {
    score -= 10
    riskFactors.push('High-risk country of origin')
  }

  score = Math.max(0, score)

  let riskLevel: string
  if (score >= 75) riskLevel = 'Low Risk'
  else if (score >= 45) riskLevel = 'Medium Risk'
  else if (score >= 15) riskLevel = 'High Risk'
  else riskLevel = 'Dangerous'

  return { score, riskLevel, riskFactors }
}

function parseUserAgent(ua: string): {
  browser: string
  os: string
  device: string
} {
  let browser = 'Unknown Browser'
  let os = 'Unknown OS'
  let device = 'Desktop'

  // Browser detection
  if (ua.includes('Edg/')) browser = 'Microsoft Edge'
  else if (ua.includes('Chrome/') && !ua.includes('Chromium'))
    browser = 'Google Chrome'
  else if (ua.includes('Firefox/')) browser = 'Mozilla Firefox'
  else if (ua.includes('Safari/') && !ua.includes('Chrome'))
    browser = 'Apple Safari'
  else if (ua.includes('OPR/') || ua.includes('Opera/')) browser = 'Opera'
  else if (ua.includes('Brave')) browser = 'Brave'

  // OS detection
  if (ua.includes('Windows NT 10')) os = 'Windows 10/11'
  else if (ua.includes('Windows NT 6.3')) os = 'Windows 8.1'
  else if (ua.includes('Windows')) os = 'Windows'
  else if (ua.includes('Mac OS X')) os = 'macOS'
  else if (ua.includes('iPhone')) os = 'iOS'
  else if (ua.includes('iPad')) os = 'iPadOS'
  else if (ua.includes('Android')) os = 'Android'
  else if (ua.includes('Linux')) os = 'Linux'
  else if (ua.includes('CrOS')) os = 'Chrome OS'

  // Device type
  if (ua.includes('Mobile') || ua.includes('iPhone') || ua.includes('Android'))
    device = 'Mobile'
  else if (ua.includes('iPad') || ua.includes('Tablet')) device = 'Tablet'

  return { browser, os, device }
}
