import { Mic, AudioWaveform } from 'lucide-react'
import { useState } from 'react'

export function VoiceAI() {
  const [isRecording, setIsRecording] = useState(false)

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-100 mb-2">Voice & AI</h1>
        <p className="text-neutral-400">Brain dump freely. AI organizes it for you.</p>
      </div>

      {/* Large Voice Capture Button */}
      <div className="flex flex-col items-center justify-center py-16">
        <button
          onClick={() => setIsRecording(!isRecording)}
          className={`
            w-32 h-32 rounded-full flex items-center justify-center
            transition-all duration-300 transform
            ${isRecording
              ? 'bg-red-500 shadow-[0_0_60px_rgba(239,68,68,0.5)] scale-110 animate-pulse'
              : 'bg-yellow-400 shadow-[0_0_40px_rgba(250,204,21,0.3)] hover:scale-105 hover:shadow-[0_0_60px_rgba(250,204,21,0.4)]'
            }
          `}
        >
          {isRecording ? (
            <AudioWaveform className="w-16 h-16 text-white" />
          ) : (
            <Mic className="w-16 h-16 text-neutral-950" />
          )}
        </button>
        <p className="mt-6 text-neutral-400 text-lg">
          {isRecording ? 'Listening...' : 'Tap to start recording'}
        </p>
      </div>

      {/* Recent Captures */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-neutral-200 mb-4">Recent Captures</h2>
        <div className="space-y-4">
          <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
            <p className="text-neutral-500 italic text-center py-8">
              No captures yet. Tap the microphone to start brain-dumping!
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
