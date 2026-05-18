import { useEffect, useRef, useState } from 'react'

export type AdSlotConfig = {
  id: string
  builder: (container: HTMLDivElement) => HTMLElement
  waitForContent?: (container: HTMLDivElement, injected: HTMLElement) => boolean
}

interface TimedAdSlotProps {
  configs: AdSlotConfig[]
  displayMs?: number
  pauseMs?: number
  className?: string
  style?: React.CSSProperties
}

export function TimedAdSlot({
  configs,
  displayMs = 15000,
  pauseMs = 5000,
  className,
  style,
}: TimedAdSlotProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)
  const activeRef = useRef(true)
  const currentIndexRef = useRef(0)
  const timeoutRef = useRef<number | null>(null)
  const observerRef = useRef<MutationObserver | null>(null)
  const injectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!containerRef.current || configs.length === 0) return
    activeRef.current = true

    const container = containerRef.current

    const clearInjection = () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
      if (injectionRef.current && container.contains(injectionRef.current)) {
        container.removeChild(injectionRef.current)
      }
      injectionRef.current = null
      setVisible(false)
    }

    const scheduleNextAd = () => {
      if (!activeRef.current) return
      currentIndexRef.current = (currentIndexRef.current + 1) % configs.length
      startAdCycle(currentIndexRef.current)
    }

    const startAdCycle = (index: number) => {
      clearInjection()
      const config = configs[index]
      const injected = config.builder(container)
      injectionRef.current = injected
      container.appendChild(injected)

      const waitForContent = config.waitForContent ?? ((parent) => parent.childElementCount > 0)

      const observer = new MutationObserver(() => {
        if (!containerRef.current || !injectionRef.current) return
        if (waitForContent(containerRef.current, injectionRef.current)) {
          setVisible(true)
          observer.disconnect()
          observerRef.current = null
        }
      })
      observerRef.current = observer
      observer.observe(container, { childList: true, subtree: true })

      timeoutRef.current = window.setTimeout(() => {
        clearInjection()
        if (activeRef.current) {
          timeoutRef.current = window.setTimeout(scheduleNextAd, pauseMs)
        }
      }, displayMs)
    }

    startAdCycle(currentIndexRef.current)

    return () => {
      activeRef.current = false
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
      if (observerRef.current) observerRef.current.disconnect()
      clearInjection()
    }
  }, [configs, displayMs, pauseMs])

  return (
    <div
      className={className}
      ref={containerRef}
      style={visible ? style ?? {} : { display: 'none', ...style }}
    />
  )
}
