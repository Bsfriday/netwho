import { useEffect, useRef } from 'react'

export function SidebarAd() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scriptLoadedRef = useRef(false)

  useEffect(() => {
    if (scriptLoadedRef.current || !containerRef.current) return

    // Prevent duplicate script injection
    scriptLoadedRef.current = true

    const script = document.createElement('script')
    script.src = 'https://pl29481526.effectivecpmnetwork.com/80/6b/f4/806bf445469727f60c03a49d7bcc637b.js'
    script.async = true
    script.type = 'text/javascript'

    // Append to container
    containerRef.current.appendChild(script)

    // Cleanup: remove script on unmount
    return () => {
      if (containerRef.current && containerRef.current.contains(script)) {
        containerRef.current.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="ad-slot rounded-xl" ref={containerRef} style={{ minHeight: '250px' }} />
  )
}
