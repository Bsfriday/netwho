import { useEffect, useMemo, useRef, useState } from 'react'

type AdRotationConfig = {
  id: string
  builder: (container: HTMLDivElement) => HTMLElement
  waitForContent?: (container: HTMLDivElement, injected: HTMLElement | null) => boolean
}

const AD_ROTATION_MS = 300000
const AD_LOAD_TIMEOUT_MS = 3500

const buildAdSenseAd = () => {
  const adSlot = document.createElement('ins')
  adSlot.className = 'adsbygoogle'
  adSlot.style.display = 'block'
  adSlot.style.width = '100%'
  adSlot.style.height = '100%'
  adSlot.setAttribute('data-ad-client', 'ca-pub-5740499104150490')
  adSlot.setAttribute('data-ad-slot', '1234567890')
  adSlot.setAttribute('data-ad-format', 'auto')
  adSlot.setAttribute('data-full-width-responsive', 'true')

  window.setTimeout(() => {
    const w = window as any
    w.adsbygoogle = w.adsbygoogle || []
    try {
      w.adsbygoogle.push({})
    } catch {
      // AdSense may not be available.
    }
  }, 0)

  return adSlot
}

const buildNetworkBannerAd = () => {
  const wrapper = document.createElement('div')
  wrapper.style.width = '100%'
  wrapper.style.height = '100%'
  wrapper.style.minHeight = '50px'
  wrapper.style.display = 'flex'
  wrapper.style.justifyContent = 'center'

  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.async = true
  script.setAttribute('data-cfasync', 'false')
  script.dataset.adSlot = 'native-banner'
  script.src = 'https://pl29481525.effectivecpmnetwork.com/75213feb8290bad2d7be426287f712e0/invoke.js'
  wrapper.appendChild(script)

  return wrapper
}

const buildNetworkSlotAd = () => {
  const wrapper = document.createElement('div')
  wrapper.style.width = '100%'
  wrapper.style.height = '100%'
  wrapper.style.minHeight = '50px'
  wrapper.style.display = 'flex'
  wrapper.style.justifyContent = 'center'

  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.async = true
  script.setAttribute('data-cfasync', 'false')
  script.dataset.adSlot = 'rotating-network'
  script.src = 'https://pl29481526.effectivecpmnetwork.com/80/6b/f4/806bf445469727f60c03a49d7bcc637b.js'
  wrapper.appendChild(script)

  return wrapper
}

const hasAdContent = (container: HTMLDivElement, injected: HTMLElement | null) =>
  Array.from(container.children).some((child) => child !== injected && child.textContent?.trim().length)

export function TopBannerAd() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(true)
  const [closed, setClosed] = useState(false)
  const [render, setRender] = useState(true)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const injectedRef = useRef<HTMLElement | null>(null)
  const observerRef = useRef<MutationObserver | null>(null)
  const rotationTimerRef = useRef<number | null>(null)
  const loadTimerRef = useRef<number | null>(null)

  const configs = useMemo<AdRotationConfig[]>(
    () => [
      { id: 'network-banner', builder: buildNetworkBannerAd, waitForContent: hasAdContent },
      {
        id: 'adsense',
        builder: buildAdSenseAd,
        waitForContent: (container, injected) =>
          Array.from(container.querySelectorAll('.adsbygoogle')).some(
            (ad) => ad !== injected && (ad.childElementCount > 0 || ad.innerHTML.trim().length > 0),
          ),
      },
      { id: 'network-slot', builder: buildNetworkSlotAd, waitForContent: hasAdContent },
    ],
    [],
  )

  const cleanupAd = () => {
    if (observerRef.current) {
      observerRef.current.disconnect()
      observerRef.current = null
    }
    if (loadTimerRef.current) {
      window.clearTimeout(loadTimerRef.current)
      loadTimerRef.current = null
    }
    if (injectedRef.current && containerRef.current?.contains(injectedRef.current)) {
      containerRef.current.removeChild(injectedRef.current)
    }
    injectedRef.current = null
  }

  useEffect(() => {
    if (closed) return
    const container = containerRef.current
    if (!container) return

    const loadCurrentAd = (index: number) => {
      cleanupAd()
      setVisible(false)
      setLoading(true)

      const config = configs[index]
      const injected = config.builder(container)
      injectedRef.current = injected
      container.appendChild(injected)

      const checkLoaded = () => {
        if (!container) return false
        if (config.waitForContent) return config.waitForContent(container, injected)
        return hasAdContent(container, injected)
      }

      const observer = new MutationObserver(() => {
        if (checkLoaded()) {
          setVisible(true)
          setLoading(false)
          observer.disconnect()
          observerRef.current = null
          if (loadTimerRef.current) {
            window.clearTimeout(loadTimerRef.current)
            loadTimerRef.current = null
          }
        }
      })

      observer.observe(container, { childList: true, subtree: true })
      observerRef.current = observer

      loadTimerRef.current = window.setTimeout(() => {
        if (!visible) {
          setVisible(false)
          setLoading(false)
        }
      }, AD_LOAD_TIMEOUT_MS)
    }

    loadCurrentAd(activeIndex)

    rotationTimerRef.current = window.setTimeout(() => {
      if (closed) return
      setActiveIndex((prev) => (prev + 1) % configs.length)
    }, AD_ROTATION_MS)

    return () => {
      if (rotationTimerRef.current) {
        window.clearTimeout(rotationTimerRef.current)
      }
      cleanupAd()
    }
  }, [activeIndex, closed, configs])

  useEffect(() => {
    if (visible || loading) return
    const timeout = window.setTimeout(() => setRender(false), 320)
    return () => window.clearTimeout(timeout)
  }, [visible, loading])

  const closeAd = () => {
    setClosed(true)
    setVisible(false)
    setLoading(false)
    cleanupAd()
    if (rotationTimerRef.current) {
      window.clearTimeout(rotationTimerRef.current)
    }
  }

  if (closed || !render) return null

  return (
    <div className={`ad-slot ad-banner ad-fade ${visible ? 'ad-visible' : 'ad-hidden'}`}>
      <button className="ad-close-button" type="button" aria-label="Close ad" onClick={closeAd}>
        ✕
      </button>
      <div className="ad-content-wrapper" ref={containerRef}>
        {loading && !visible ? (
          <div className="ad-skeleton">
            <div className="shimmer" />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default TopBannerAd
