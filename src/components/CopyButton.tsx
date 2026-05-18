import { useEffect, useState } from 'react'
import { Check, Clipboard } from 'lucide-react'

interface CopyButtonProps {
  value: string
  label?: string
}

export function CopyButton({ value, label = 'Copy' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 1500)
    return () => window.clearTimeout(timer)
  }, [copied])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-[rgba(0,212,255,0.18)] bg-[rgba(0,212,255,0.06)] text-xs text-[#c3e8ff] hover:bg-[rgba(0,212,255,0.12)] transition"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-[#00ff88]" /> : <Clipboard className="w-3.5 h-3.5" />}
      {copied ? 'Copied' : label}
    </button>
  )
}
