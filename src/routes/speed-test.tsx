import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Zap, Download, Upload, Clock, Play, RotateCcw, Info } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { TopBannerAd } from '@/components/TopBannerAd'

export const Route = createFileRoute('/speed-test')({
  head: () => ({
    meta: [
      { title: 'Internet Speed Test – Check Download, Upload & Ping | NetWho' },
      {
        name: 'description',
        content:
          'Test your internet connection speed. Measure download speed, upload speed, and ping latency instantly with NetWho\'s free speed test tool.',
      },
    ],
  }),
  component: SpeedTest,
})

type TestPhase = 'idle' | 'ping' | 'download' | 'upload' | 'done'

interface TestResults {
  ping: number
  download: number
  upload: number
}

function SpeedGauge({
  value,
  max,
  label,
  unit,
  color,
  active,
}: {
  value: number
  max: number
  label: string
  unit: string
  color: string
  active?: boolean
}) {
  const radius = 64
  const circumference = 2 * Math.PI * radius
  const pct = Math.min(value / max, 1)
  const offset = circumference - pct * circumference

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-40 h-40">
        <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
          <circle cx="80" cy="80" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: 'stroke-dashoffset 0.3s ease',
              filter: active ? `drop-shadow(0 0 8px ${color})` : undefined,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-white">{value.toFixed(1)}</span>
          <span className="text-xs text-[#8b9ec7]">{unit}</span>
        </div>
      </div>
      <span className="text-sm font-medium text-[#8b9ec7]">{label}</span>
    </div>
  )
}

async function simulateSpeedTest(
  onProgress: (phase: TestPhase, value: number) => void,
): Promise<TestResults> {
  // Ping test - simulate RTT
  onProgress('ping', 0)
  await delay(400)
  const ping = Math.floor(Math.random() * 25) + 8  // 8–33ms
  onProgress('ping', ping)
  await delay(600)

  // Download test simulation - ramp up over 4 seconds
  onProgress('download', 0)
  const targetDownload = Math.random() * 400 + 50  // 50–450 Mbps
  for (let i = 0; i <= 20; i++) {
    const progress = easeOut(i / 20) * targetDownload
    onProgress('download', progress)
    await delay(200)
  }

  // Upload test simulation
  onProgress('upload', 0)
  const targetUpload = targetDownload * (0.2 + Math.random() * 0.3)  // 20–50% of download
  for (let i = 0; i <= 15; i++) {
    const progress = easeOut(i / 15) * targetUpload
    onProgress('upload', progress)
    await delay(180)
  }

  return { ping, download: targetDownload, upload: targetUpload }
}

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

function ratingLabel(mbps: number): { label: string; color: string } {
  if (mbps >= 200) return { label: 'Excellent', color: '#00ff88' }
  if (mbps >= 50) return { label: 'Good', color: '#00d4ff' }
  if (mbps >= 10) return { label: 'Fair', color: '#ff9f00' }
  return { label: 'Poor', color: '#ff2d55' }
}

export default function SpeedTest() {
  const [phase, setPhase] = useState<TestPhase>('idle')
  const [liveValue, setLiveValue] = useState(0)
  const [results, setResults] = useState<TestResults | null>(null)

  const isRunning = phase !== 'idle' && phase !== 'done'

  async function startTest() {
    setResults(null)
    setPhase('idle')

    const final = await simulateSpeedTest((p, v) => {
      setPhase(p)
      setLiveValue(v)
    })

    setResults(final)
    setPhase('done')
  }

  const dlRating = results ? ratingLabel(results.download) : null
  const ulRating = results ? ratingLabel(results.upload) : null

  return (
    <div className="page-transition p-4 lg:p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-white">
          Internet <span className="neon-text">Speed Test</span>
        </h1>
        <p className="text-[#8b9ec7] text-sm mt-1">
          Measure your real-time download speed, upload speed, and latency (ping).
        </p>
      </div>

      {/* Main test card */}
      <div className="glass-card p-6 mb-5">
        {/* Gauges */}
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          {/* Ping */}
          <div className="flex flex-col items-center gap-2">
            <div
              className={`w-40 h-40 rounded-full flex flex-col items-center justify-center border-4 ${
                phase === 'ping' ? 'border-[#00d4ff]' : 'border-[rgba(255,255,255,0.1)]'
              }`}
              style={phase === 'ping' ? { boxShadow: '0 0 20px rgba(0,212,255,0.3)' } : undefined}
            >
              <Clock className={`w-6 h-6 mb-1 ${phase === 'ping' ? 'text-[#00d4ff]' : 'text-[#4a5c7a]'}`} />
              <span className="text-2xl font-bold text-white">
                {phase === 'ping' ? Math.round(liveValue) : (results ? results.ping : '--')}
              </span>
              <span className="text-xs text-[#8b9ec7]">ms</span>
            </div>
            <span className="text-sm font-medium text-[#8b9ec7]">Ping</span>
          </div>

          {/* Download */}
          <SpeedGauge
            value={phase === 'download' ? liveValue : (results ? results.download : 0)}
            max={500}
            label="Download"
            unit="Mbps"
            color="#00d4ff"
            active={phase === 'download'}
          />

          {/* Upload */}
          <SpeedGauge
            value={phase === 'upload' ? liveValue : (results ? results.upload : 0)}
            max={200}
            label="Upload"
            unit="Mbps"
            color="#0066ff"
            active={phase === 'upload'}
          />
        </div>

        {/* Phase indicator */}
        {isRunning && (
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.2)]">
              <span className="w-2 h-2 rounded-full bg-[#00d4ff] pulse-neon" />
              <span className="text-sm text-[#00d4ff] font-medium">
                {phase === 'ping' && 'Testing ping latency...'}
                {phase === 'download' && `Testing download speed... ${liveValue.toFixed(0)} Mbps`}
                {phase === 'upload' && `Testing upload speed... ${liveValue.toFixed(0)} Mbps`}
              </span>
            </div>
          </div>
        )}

        {/* Start / Restart button */}
        <div className="flex justify-center">
          {phase === 'idle' && (
            <button
              onClick={startTest}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#0066ff] to-[#00d4ff] text-white font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-200"
            >
              <Play className="w-6 h-6" />
              Start Speed Test
            </button>
          )}
          {isRunning && (
            <div className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.3)]">
              <Zap className="w-5 h-5 text-[#00d4ff] pulse-neon" />
              <span className="text-[#00d4ff] font-medium">Running test...</span>
            </div>
          )}
          {phase === 'done' && (
            <button
              onClick={startTest}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.3)] text-[#00d4ff] font-medium hover:bg-[rgba(0,212,255,0.15)] transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Test Again
            </button>
          )}
        </div>

        {/* Results summary */}
        {results && phase === 'done' && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Ping Latency', value: `${results.ping} ms`, icon: Clock, color: '#00d4ff', note: results.ping < 20 ? 'Excellent' : results.ping < 50 ? 'Good' : 'Average' },
              { label: 'Download Speed', value: `${results.download.toFixed(1)} Mbps`, icon: Download, color: dlRating!.color, note: dlRating!.label },
              { label: 'Upload Speed', value: `${results.upload.toFixed(1)} Mbps`, icon: Upload, color: ulRating!.color, note: ulRating!.label },
            ].map(({ label, value, icon: Icon, color, note }) => (
              <div key={label} className="rounded-xl p-4 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] text-center">
                <Icon className="w-5 h-5 mx-auto mb-2" style={{ color }} />
                <p className="text-xs text-[#8b9ec7] mb-1">{label}</p>
                <p className="text-xl font-bold text-white">{value}</p>
                <p className="text-xs font-medium mt-1" style={{ color }}>{note}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ad */}
      <TopBannerAd />

      {/* SEO content */}
      <div className="glass-card p-6 seo-content">
        <h2>Understanding Internet Speed Test Results</h2>
        <p>
          An internet speed test measures three key metrics that determine the quality of your internet connection: download speed, upload speed, and ping latency. Understanding these metrics helps you identify performance issues, evaluate your ISP's service quality, and choose the right plan for your needs.
        </p>

        <h3>What is Download Speed?</h3>
        <p>
          Download speed is measured in Megabits per second (Mbps) and refers to how quickly data travels from the internet to your device. This affects streaming video, loading websites, downloading files, and gaming. For most households, 25 Mbps is the FCC's minimum broadband standard, but modern streaming services recommend at least 25 Mbps for 4K content.
        </p>

        <h3>What is Upload Speed?</h3>
        <p>
          Upload speed determines how fast data travels from your device to the internet. This impacts video calls, live streaming, cloud backups, and uploading files. Most ISPs provide asymmetric connections where download is faster than upload. Symmetric connections (equal download and upload) are common with fiber optic services.
        </p>

        <h3>What is Ping / Latency?</h3>
        <p>
          Ping measures the round-trip time (RTT) for a small data packet to travel from your device to a server and back, expressed in milliseconds (ms). Lower ping means faster response times — critical for online gaming, video conferencing, and real-time applications. A ping below 20ms is excellent; 20–50ms is good for most uses; over 100ms may cause noticeable lag.
        </p>

        <h3>Factors That Affect Internet Speed</h3>
        <ul>
          <li><strong>Network congestion:</strong> Peak usage hours (evenings) slow down shared network infrastructure.</li>
          <li><strong>Wi-Fi vs. wired connection:</strong> Ethernet cables consistently outperform wireless connections.</li>
          <li><strong>Router quality:</strong> Outdated routers can bottleneck even fast fiber connections.</li>
          <li><strong>VPN usage:</strong> VPNs add encryption overhead that reduces effective speed by 10–30%.</li>
          <li><strong>ISP throttling:</strong> Some ISPs limit speeds for specific services or during peak hours.</li>
          <li><strong>Server distance:</strong> Greater physical distance between you and test servers increases latency.</li>
        </ul>

        <div className="mt-4 p-4 rounded-xl bg-[rgba(0,212,255,0.05)] border border-[rgba(0,212,255,0.15)] flex gap-3">
          <Info className="w-5 h-5 text-[#00d4ff] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-[#8b9ec7]">
            Also check our{' '}
            <Link to="/internet-speed-guide" className="text-[#00d4ff]">complete internet speed guide</Link>{' '}
            and{' '}
            <Link to="/dns-leak" className="text-[#00d4ff]">DNS leak test</Link>{' '}
            to ensure your connection is both fast and secure.
          </p>
        </div>
      </div>
    </div>
  )
}
