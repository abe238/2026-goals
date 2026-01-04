import { Mic } from 'lucide-react'

interface VoiceCaptureProps {
  onClick?: () => void
  isRecording?: boolean
}

export function VoiceCapture({ onClick, isRecording }: VoiceCaptureProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center justify-center gap-2
        px-4 py-3 rounded-xl
        font-semibold text-sm
        transition-all duration-200
        ${isRecording
          ? 'bg-red-500 hover:bg-red-400 text-white shadow-lg shadow-red-500/30 animate-pulse'
          : 'bg-yellow-400 hover:bg-yellow-300 text-neutral-950 shadow-lg shadow-yellow-400/20 hover:shadow-yellow-400/30'
        }
        hover:scale-[1.02]
        active:scale-[0.98]
      `}
    >
      <Mic className="w-5 h-5" />
      <span>{isRecording ? 'Recording...' : 'Voice Capture'}</span>
    </button>
  )
}
