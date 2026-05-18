import { useEffect, useRef, useState } from 'react'

export function BottomStickyAd() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const adSlot = document.createElement('ins')
    adSlot.className = 'adsbygoogle'
    adSlot.style.display = 'block'
    adSlot.style.width = '100%'
    adSlot.setAttribute('data-ad-client', 'ca-pub-5740499104150490')
    adSlot.setAttribute('data-ad-slot', '1234567890')
    adSlot.setAttribute('data-ad-format', 'auto')
    adSlot.setAttribute('data-full-width-responsive', 'true')

    let hasShown = false

    const observer = new MutationObserver(() => {
      if (!containerRef.current) return
      const hasAdContent = Array.from(containerRef.current.querySelectorAll('.adsbygoogle')).some((ad) => {
        return ad.childElementCount > 0 || ad.innerHTML.trim().length > 0
      })

      if (hasAdContent) {
        hasShown = true
        setVisible(true)
        observer.disconnect()
      }
    })

    observer.observe(container, { childList: true, subtree: true })
    container.appendChild(adSlot)

    const pushAd = () => {
      const w = window as any
      w.adsbygoogle = w.adsbygoogle || []
      try {
        w.adsbygoogle.push({})
      } catch {
        // still safe if AdSense is blocked or not initialized yet
      }
    }

    pushAd()

    const timeout = window.setTimeout(() => {
      if (!hasShown && container.contains(adSlot)) {
        container.removeChild(adSlot)
      }
    }, 5000)

    return () => {
      observer.disconnect()
      clearTimeout(timeout)
      if (container.contains(adSlot)) {
        container.removeChild(adSlot)
      }
    }
  }, [])

  return (
    <div
      className="ad-slot w-full sticky bottom-0 z-30"
      ref={containerRef}
      style={visible ? { minHeight: '60px' } : { minHeight: 0, display: 'none' }}
    />
  )
}
