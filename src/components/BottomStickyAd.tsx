import { useMemo } from 'react'
import { TimedAdSlot, type AdSlotConfig } from './TimedAdSlot'

const createAdSenseSlot = (container: HTMLDivElement) => {
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
      // AdSense may not be available yet.
    }
  }, 0)

  return adSlot
}

const createNetworkSlot = (container: HTMLDivElement) => {
  const wrapper = document.createElement('div')
  wrapper.style.width = '100%'
  wrapper.style.height = '100%'
  wrapper.style.minHeight = '50px'

  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.async = true
  script.setAttribute('data-cfasync', 'false')
  script.dataset.adSlot = 'rotating-network'
  script.src = 'https://pl29481526.effectivecpmnetwork.com/80/6b/f4/806bf445469727f60c03a49d7bcc637b.js'
  wrapper.appendChild(script)

  return wrapper
}

const createNetworkBanner = (container: HTMLDivElement) => {
  const wrapper = document.createElement('div')
  wrapper.style.width = '100%'
  wrapper.style.height = '100%'
  wrapper.style.minHeight = '50px'

  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.async = true
  script.setAttribute('data-cfasync', 'false')
  script.dataset.adSlot = 'rotating-banner'
  script.src = 'https://pl29481525.effectivecpmnetwork.com/75213feb8290bad2d7be426287f712e0/invoke.js'
  wrapper.appendChild(script)

  return wrapper
}

const waitForVisibleAd = (container: HTMLDivElement, injected: HTMLElement | null) => {
  return Array.from(container.children).some((child) => child !== injected && child.textContent?.trim().length)
}

export function BottomStickyAd() {
  const configs = useMemo<AdSlotConfig[]>(() => [
    {
      id: 'adsense-rotating',
      builder: createAdSenseSlot,
      waitForContent: (container, injected) =>
        Array.from(container.querySelectorAll('.adsbygoogle')).some((ad) => ad !== injected && (ad.childElementCount > 0 || ad.innerHTML.trim().length > 0)),
    },
    {
      id: 'network-rotating',
      builder: createNetworkSlot,
      waitForContent: waitForVisibleAd,
    },
    {
      id: 'network-banner-rotating',
      builder: createNetworkBanner,
      waitForContent: waitForVisibleAd,
    },
  ], [])

  return (
    <TimedAdSlot
      configs={configs}
      displayMs={300000}
      pauseMs={0}
      className="ad-slot ad-rotate ad-fade"
      style={{ minHeight: 60, maxWidth: 728, width: '100%', margin: '0 auto' }}
    />
  )
}
