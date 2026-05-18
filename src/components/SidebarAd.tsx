import { useEffect, useRef, useState } from 'react'

export function SidebarAd() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const scriptRef = useRef<HTMLScriptElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    // Insert script that will populate the container
    const script = document.createElement('script')
    scriptRef.current = script
    script.src = 'https://pl29481526.effectivecpmnetwork.com/80/6b/f4/806bf445469727f60c03a49d7bcc637b.js'
    script.async = true
    script.type = 'text/javascript'
    script.dataset.adSlot = 'sidebar'

    // Keep slot hidden until content appears
    const observer = new MutationObserver(() => {
      if (!containerRef.current) return
      // If children besides the script exist, show the slot
      const hasContent = Array.from(containerRef.current.children).some((n) => n !== script)
      if (hasContent) {
        setVisible(true)
        observer.disconnect()
      }
    })

    observer.observe(containerRef.current, { childList: true, subtree: true })
    containerRef.current.appendChild(script)

    // Fallback: if no content after timeout, remove script and keep slot hidden
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
    <div
      className="ad-slot rounded-xl"
      ref={containerRef}
      style={visible ? { minHeight: '250px' } : { minHeight: 0, display: 'none' }}
    />
  )
}
