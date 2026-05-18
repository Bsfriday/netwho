import { useEffect, useRef, useState } from 'react'

type UseAdSlotOptions = {
  timeout?: number
  retryOnce?: boolean
}

export function useAdSlot(options: UseAdSlotOptions = {}) {
  const { timeout = 3000, retryOnce = true } = options
  const containerRef = useRef<HTMLDivElement | null>(null)
  const observerRef = useRef<MutationObserver | null>(null)
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [render, setRender] = useState(false)
  const retryRef = useRef(0)

  useEffect(() => {
    return () => {
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [])

  const monitor = (injectedElement?: Element | null, waitForContent?: (container: HTMLDivElement, injected?: Element | null) => boolean) => {
    const container = containerRef.current
    if (!container) return
    setLoading(true)
    setRender(true)
    setVisible(false)

    const check = () => {
      try {
        if (!container) return false
        if (waitForContent) return waitForContent(container, injectedElement ?? null)
        // default: any child besides the injected script/ins
        return Array.from(container.children).some((c) => c !== injectedElement)
      } catch (e) {
        return false
      }
    }

    if (check()) {
      setVisible(true)
      setLoading(false)
      return
    }

    if (observerRef.current) observerRef.current.disconnect()
    const observer = new MutationObserver(() => {
      if (check()) {
        setVisible(true)
        setLoading(false)
        observer.disconnect()
        observerRef.current = null
      }
    })
    observerRef.current = observer
    observer.observe(container, { childList: true, subtree: true })

    const to = window.setTimeout(() => {
      if (visible) return
      // retry once if configured
      if (retryOnce && retryRef.current === 0) {
        retryRef.current += 1
        // small delay then re-monitor; caller should attempt to reinvoke provider if needed
        setLoading(true)
        setVisible(false)
        window.setTimeout(() => {
          if (observerRef.current) observerRef.current.disconnect()
          monitor(injectedElement, waitForContent)
        }, 1200)
        return
      }

      // final fallback: stop loading and hide container; remove script/ins if still present
      setLoading(false)
      setVisible(false)
      try {
        if (injectedElement && container.contains(injectedElement)) container.removeChild(injectedElement)
      } catch (e) {
        // ignore
      }
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
    }, timeout)

    // cleanup for this monitoring cycle
    // keep the timeout id in closure; caller's effect should handle component unmount cleanup
    return () => {
      window.clearTimeout(to)
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
    }
  }

  const hide = () => {
    setVisible(false)
    setLoading(false)
    setRender(false)
  }

  return { containerRef, visible, loading, render, monitor, hide }
}

export default useAdSlot
