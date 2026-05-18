import { useEffect, useRef } from 'react'

export function TopBannerAd() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const scriptLoadedRef = useRef(false)

  useEffect(() => {
    if (scriptLoadedRef.current || !containerRef.current) return
    const existingScript = containerRef.current.querySelector('script[data-ad-slot="top-banner"]')
    if (existingScript) {
      scriptLoadedRef.current = true
      return
    }

    scriptLoadedRef.current = true

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.dataset.adSlot = 'top-banner'
    script.textContent = `(function(s){\n  s.dataset.zone='11022359',\n  s.src='https://n6wxm.com/vignette.min.js'\n})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`

    containerRef.current.appendChild(script)

    return () => {
      if (containerRef.current?.contains(script)) {
        containerRef.current.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="ad-slot w-full" ref={containerRef} style={{ minHeight: '90px' }}>
      <span>Advertisement · 728×90</span>
    </div>
  )
}
