'use client'

import { useState, useEffect } from 'react'
import {
  Mic,
  Square,
  X,
  Check,
  Trash2,
  ChevronRight,
  Play,
  Trophy,
  ClipboardList,
  Calendar,
  Lightbulb,
  User,
  Briefcase,
  StickyNote,
  Sparkles,
  Edit3,
  ChevronDown,
} from 'lucide-react'
import type {
  VoiceAIProps,
  ExtractedItem,
  ExtractedItemType,
  VoiceCapture,
} from '../../../../product/sections/voice-and-ai/types'

const typeIcons: Record<ExtractedItemType, React.ReactNode> = {
  win: <Trophy className="w-4 h-4" />,
  chore: <ClipboardList className="w-4 h-4" />,
  event: <Calendar className="w-4 h-4" />,
  idea: <Lightbulb className="w-4 h-4" />,
  person: <User className="w-4 h-4" />,
  work: <Briefcase className="w-4 h-4" />,
  note: <StickyNote className="w-4 h-4" />,
}

const typeColors: Record<ExtractedItemType, string> = {
  win: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  chore: 'bg-red-500/20 text-red-400 border-red-500/30',
  event: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  idea: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  person: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  work: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  note: 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30',
}

const goalColors: Record<string, string> = {
  green: 'bg-emerald-500',
  purple: 'bg-purple-500',
  orange: 'bg-orange-500',
  pink: 'bg-pink-500',
  blue: 'bg-blue-500',
  indigo: 'bg-indigo-500',
  amber: 'bg-amber-500',
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function formatRelativeTime(timestamp: string): string {
  const now = new Date()
  const then = new Date(timestamp)
  const diffMs = now.getTime() - then.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffHours < 1) return 'Just now'
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays}d ago`
  return then.toLocaleDateString()
}

function WaveformVisualizer({ isRecording }: { isRecording: boolean }) {
  const bars = 40
  return (
    <div className="flex items-center justify-center gap-0.5 h-16">
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className={`w-1 rounded-full transition-all duration-150 ${
            isRecording ? 'bg-amber-500' : 'bg-neutral-700'
          }`}
          style={{
            height: isRecording
              ? `${Math.random() * 100}%`
              : '20%',
            animationDelay: `${i * 50}ms`,
          }}
        />
      ))}
    </div>
  )
}

function ExtractedItemCard({
  item,
  goalAreas,
  itemTypes,
  onEdit,
  onChangeType,
  onDelete,
}: {
  item: ExtractedItem
  goalAreas: VoiceAIProps['goalAreas']
  itemTypes: VoiceAIProps['itemTypes']
  onEdit?: (id: string, text: string) => void
  onChangeType?: (id: string, type: ExtractedItemType) => void
  onDelete?: (id: string) => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(item.text)
  const [showTypeMenu, setShowTypeMenu] = useState(false)

  const goalArea = goalAreas.find(g => g.id === item.goalAreaId)
  const typeInfo = itemTypes.find(t => t.type === item.type)

  return (
    <div className={`p-4 rounded-xl border ${typeColors[item.type]}`}>
      <div className="flex items-start gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-800/50">
          {typeIcons[item.type]}
        </div>
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-1 px-2 py-1 bg-neutral-800 border border-neutral-700 rounded text-sm text-neutral-100 focus:outline-none focus:border-amber-500/50"
                autoFocus
              />
              <button
                onClick={() => {
                  onEdit?.(item.id, editText)
                  setIsEditing(false)
                }}
                className="p-1 text-emerald-400 hover:text-emerald-300"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setEditText(item.text)
                  setIsEditing(false)
                }}
                className="p-1 text-neutral-400 hover:text-neutral-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <p className="text-sm text-neutral-100 leading-relaxed">
              {item.text}
            </p>
          )}

          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <div className="relative">
              <button
                onClick={() => setShowTypeMenu(!showTypeMenu)}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-neutral-800/50 text-neutral-300 hover:bg-neutral-700/50"
              >
                {typeInfo?.label || item.type}
                <ChevronDown className="w-3 h-3" />
              </button>
              {showTypeMenu && (
                <div className="absolute top-full left-0 mt-1 py-1 bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl z-10 min-w-[120px]">
                  {itemTypes.map((t) => (
                    <button
                      key={t.type}
                      onClick={() => {
                        onChangeType?.(item.id, t.type)
                        setShowTypeMenu(false)
                      }}
                      className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-700"
                    >
                      {typeIcons[t.type]}
                      {t.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {goalArea && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-neutral-800/50 text-neutral-400">
                <span className={`w-2 h-2 rounded-full ${goalColors[goalArea.color]}`} />
                {goalArea.name}
              </span>
            )}

            {item.confidence !== 'high' && (
              <span className="text-xs text-neutral-500 italic">
                {item.confidence} confidence
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1.5 text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete?.(item.id)}
            className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

function CaptureHistoryItem({
  capture,
  onView,
  onPlay,
}: {
  capture: VoiceCapture
  onView?: (id: string) => void
  onPlay?: (id: string) => void
}) {
  const itemCounts = capture.extractedItems.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + 1
    return acc
  }, {} as Record<ExtractedItemType, number>)

  return (
    <button
      onClick={() => onView?.(capture.id)}
      className="w-full text-left p-4 bg-neutral-900/50 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl transition-all group"
    >
      <div className="flex items-start gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onPlay?.(capture.id)
          }}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-800 group-hover:bg-amber-500/20 text-neutral-400 group-hover:text-amber-400 transition-colors"
        >
          <Play className="w-4 h-4 ml-0.5" />
        </button>

        <div className="flex-1 min-w-0">
          <p className="text-sm text-neutral-100 line-clamp-2 leading-relaxed mb-2">
            {capture.transcript}
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            {Object.entries(itemCounts).map(([type, count]) => (
              <span
                key={type}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${typeColors[type as ExtractedItemType]}`}
              >
                {typeIcons[type as ExtractedItemType]}
                {count}
              </span>
            ))}
          </div>
        </div>

        <div className="text-right flex-shrink-0">
          <p className="text-xs text-neutral-500 mb-1">
            {formatRelativeTime(capture.timestamp)}
          </p>
          <p className="text-xs text-neutral-600">
            {formatDuration(capture.duration)}
          </p>
        </div>

        <ChevronRight className="w-5 h-5 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
      </div>
    </button>
  )
}

export function VoiceAI({
  currentSession,
  recentCaptures,
  stats,
  goalAreas,
  itemTypes,
  onStartCapture,
  onStopCapture,
  onCancelCapture,
  onEditItem,
  onChangeItemType,
  onDeleteItem,
  onSaveItems,
  onDiscardCapture,
  onViewCapture,
  onPlayAudio,
}: VoiceAIProps) {
  const [recordingTime, setRecordingTime] = useState(0)

  const isRecording = currentSession?.status === 'recording'
  const isProcessing = currentSession?.status === 'processing'
  const isReviewing = currentSession?.status === 'reviewing'

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(t => t + 1)
      }, 1000)
    } else {
      setRecordingTime(0)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRecording])

  // Recording state
  if (isRecording) {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 text-red-400 text-sm font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Recording
            </div>
            <p className="text-4xl font-bold text-neutral-100 tabular-nums">
              {formatDuration(recordingTime)}
            </p>
          </div>

          <div className="mb-12 px-4">
            <WaveformVisualizer isRecording={true} />
          </div>

          <p className="text-neutral-400 mb-8 text-sm">
            Speak freely. I'll extract wins, chores, events, ideas, and more.
          </p>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={onCancelCapture}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <button
              onClick={onStopCapture}
              className="flex items-center justify-center w-20 h-20 rounded-full bg-red-500 hover:bg-red-400 text-white transition-colors shadow-lg shadow-red-500/30"
            >
              <Square className="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Processing state
  if (isProcessing) {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-500/20 mb-6">
            <Sparkles className="w-10 h-10 text-amber-400 animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-100 mb-2">
            Processing...
          </h2>
          <p className="text-neutral-400 text-sm">
            Transcribing and extracting items from your capture
          </p>

          <div className="mt-8 flex justify-center">
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-amber-500 animate-bounce"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Reviewing state
  if (isReviewing && currentSession) {
    const itemsByType = currentSession.extractedItems.reduce((acc, item) => {
      if (!acc[item.type]) acc[item.type] = []
      acc[item.type].push(item)
      return acc
    }, {} as Record<ExtractedItemType, ExtractedItem[]>)

    return (
      <div className="min-h-screen bg-neutral-950">
        <div className="p-6 lg:p-8 max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-neutral-100 mb-1">
                Review Extracted Items
              </h1>
              <p className="text-sm text-neutral-400">
                {currentSession.extractedItems.length} items extracted • Edit or recategorize before saving
              </p>
            </div>
          </div>

          {/* Transcript */}
          <div className="mb-8 p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl">
            <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-2">
              Transcript
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed">
              "{currentSession.transcript}"
            </p>
          </div>

          {/* Extracted Items */}
          <div className="space-y-6 mb-8">
            {Object.entries(itemsByType).map(([type, items]) => (
              <div key={type}>
                <h3 className="text-sm font-medium text-neutral-300 mb-3 flex items-center gap-2">
                  {typeIcons[type as ExtractedItemType]}
                  {itemTypes.find(t => t.type === type)?.label || type}
                  <span className="text-neutral-500">({items.length})</span>
                </h3>
                <div className="space-y-2">
                  {items.map((item) => (
                    <ExtractedItemCard
                      key={item.id}
                      item={item}
                      goalAreas={goalAreas}
                      itemTypes={itemTypes}
                      onEdit={onEditItem}
                      onChangeType={onChangeItemType}
                      onDelete={onDeleteItem}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 sticky bottom-6">
            <button
              onClick={onDiscardCapture}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-medium transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Discard
            </button>
            <button
              onClick={onSaveItems}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold transition-colors"
            >
              <Check className="w-4 h-4" />
              Save All Items
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Idle state - main view
  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-neutral-100 mb-1">
            Voice & AI
          </h1>
          <p className="text-neutral-400">
            Brain dump via voice. I'll organize everything.
          </p>
        </div>

        {/* Big Capture Button */}
        <div className="flex flex-col items-center py-12 mb-8">
          <button
            onClick={onStartCapture}
            className="relative flex items-center justify-center w-32 h-32 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 transition-all shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 group"
          >
            <div className="absolute inset-0 rounded-full bg-amber-500 animate-ping opacity-20" />
            <Mic className="w-12 h-12 relative z-10" />
          </button>
          <p className="mt-6 text-neutral-400 text-sm">
            Tap to start capturing
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl text-center">
            <p className="text-2xl font-bold text-neutral-100">
              {stats.totalCaptures}
            </p>
            <p className="text-xs text-neutral-500">Captures</p>
          </div>
          <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl text-center">
            <p className="text-2xl font-bold text-neutral-100">
              {Math.round(stats.totalDuration / 60)}m
            </p>
            <p className="text-xs text-neutral-500">Recorded</p>
          </div>
          <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl text-center">
            <p className="text-2xl font-bold text-neutral-100">
              {stats.itemsExtracted}
            </p>
            <p className="text-xs text-neutral-500">Items Extracted</p>
          </div>
        </div>

        {/* Recent Captures */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-neutral-200">
              Recent Captures
            </h2>
            <button className="text-sm text-amber-400 hover:text-amber-300">
              View all
            </button>
          </div>

          {recentCaptures.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-neutral-800 rounded-xl">
              <Mic className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
              <p className="text-neutral-400 mb-1">No captures yet</p>
              <p className="text-sm text-neutral-500">
                Tap the button above to start your first brain dump
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentCaptures.map((capture) => (
                <CaptureHistoryItem
                  key={capture.id}
                  capture={capture}
                  onView={onViewCapture}
                  onPlay={onPlayAudio}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VoiceAI
