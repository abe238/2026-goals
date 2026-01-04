'use client'

import { Mic } from 'lucide-react'

interface VoiceCaptureProps {
  onClick?: () => void
}

export function VoiceCapture({ onClick }: VoiceCaptureProps) {
  return (
    <button
      onClick={onClick}
      className="
        w-full flex items-center justify-center gap-2
        px-4 py-3 rounded-xl
        bg-amber-500 hover:bg-amber-400
        text-neutral-950 font-semibold text-sm
        transition-all duration-200
        shadow-lg shadow-amber-500/20
        hover:shadow-amber-500/30
        hover:scale-[1.02]
        active:scale-[0.98]
      "
    >
      <Mic className="w-5 h-5" />
      <span>Voice Capture</span>
    </button>
  )
}
