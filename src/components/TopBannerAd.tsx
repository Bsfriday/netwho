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

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.dataset.adSlot = 'top-banner'
    script.textContent = `(function(s){s.dataset.zone='11022566',s.src='https://n6wxm.com/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`

    containerRef.current.appendChild(script)
    scriptLoadedRef.current = true

    return () => {
      if (containerRef.current?.contains(script)) {
        containerRef.current.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="ad-slot w-full" ref={containerRef} style={{ minHeight: '90px' }}>
    </div>
  )
}
