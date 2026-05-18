import { useEffect, useRef, useState } from 'react'

export function TopBannerAd() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const scriptRef = useRef<HTMLScriptElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    const existingScript = containerRef.current.querySelector('script[data-ad-slot="native-banner"]')
    if (existingScript) {
      // If provider already populated, show
      setVisible(true)
      return
    }

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.setAttribute('data-cfasync', 'false')
    script.dataset.adSlot = 'native-banner'
    script.src = 'https://pl29481525.effectivecpmnetwork.com/75213feb8290bad2d7be426287f712e0/invoke.js'
    scriptRef.current = script

    const observer = new MutationObserver(() => {
      if (!containerRef.current) return
      const hasContent = containerRef.current.childElementCount > 1 || Array.from(containerRef.current.children).some((n) => n !== script)
      if (hasContent) {
        setVisible(true)
        observer.disconnect()
      }
    })

    observer.observe(containerRef.current, { childList: true, subtree: true })
    containerRef.current.appendChild(script)

    const timeout = setTimeout(() => {
      if (!visible && containerRef.current && scriptRef.current && containerRef.current.contains(scriptRef.current)) {
        containerRef.current.removeChild(scriptRef.current)
      }
    }, 3000)

    return () => {
      observer.disconnect()
      clearTimeout(timeout)
      if (scriptRef.current && containerRef.current?.contains(scriptRef.current)) {
        containerRef.current.removeChild(scriptRef.current)
      }
    }
  }, [])

  return (
    <div className="ad-slot w-full" ref={containerRef} style={visible ? { minHeight: '90px' } : { minHeight: 0, display: 'none' }}>
      <div id="container-75213feb8290bad2d7be426287f712e0" />
    </div>
  )
}
