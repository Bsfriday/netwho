import { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

export function PwaInstallButton() {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null)
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState<string>('Install the app for faster access')
  const [isIos, setIsIos] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase()
    const ios = /iphone|ipad|ipod/.test(userAgent)
    const standalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true
    setIsIos(ios)
    setIsStandalone(standalone)

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault()
      setPromptEvent(event as BeforeInstallPromptEvent)
      setVisible(true)
    }

    const handleAppInstalled = () => {
      setVisible(false)
      setPromptEvent(null)
      setMessage('App installed successfully')
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  useEffect(() => {
    if (isIos && !isStandalone) {
      setVisible(true)
      setMessage('Tap share and choose Add to Home Screen')
    }
  }, [isIos, isStandalone])

  const handleInstall = async () => {
    if (promptEvent) {
      await promptEvent.prompt()
      const choice = await promptEvent.userChoice
      if (choice.outcome === 'accepted') {
        setVisible(false)
        setMessage('App installed successfully')
      } else {
        setMessage('Install dismissed. Try again later.')
      }
      setPromptEvent(null)
      return
    }

    if (isIos) {
      setMessage('Use the share button and select Add to Home Screen.')
    }
  }

  if (isStandalone || !visible) return null

  return (
    <div className="install-app-banner glass-card p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="flex-1">
        <p className="text-sm font-semibold text-white">Install NetWho</p>
        <p className="text-xs text-[#8b9ec7] mt-1">{message}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleInstall}
          className="rounded-full bg-[#00d4ff] px-4 py-2 text-sm font-semibold text-[#070b14] transition hover:bg-[#00c3ff]"
        >
          Install App
        </button>
      </div>
    </div>
  )
}

export default PwaInstallButton
