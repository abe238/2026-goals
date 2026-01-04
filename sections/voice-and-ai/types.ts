// =============================================================================
// Data Types
// =============================================================================

export type CaptureStatus = 'idle' | 'recording' | 'processing' | 'reviewing' | 'saved'

export type ExtractedItemType = 'win' | 'chore' | 'event' | 'idea' | 'person' | 'work' | 'note'

export type ConfidenceLevel = 'high' | 'medium' | 'low'

export interface ExtractedItem {
  id: string
  type: ExtractedItemType
  text: string
  confidence: ConfidenceLevel
  goalAreaId: string | null
  suggestedDate: string | null
  isEdited: boolean
  originalText: string
}

export interface VoiceCapture {
  id: string
  timestamp: string
  duration: number // seconds
  transcript: string
  extractedItems: ExtractedItem[]
  status: CaptureStatus
  audioUrl: string | null
}

export interface CaptureSession {
  id: string
  startedAt: string
  endedAt: string | null
  status: CaptureStatus
  waveformData: number[] // amplitude values for visualization
  transcript: string
  extractedItems: ExtractedItem[]
}

export interface CaptureStats {
  totalCaptures: number
  totalDuration: number // seconds
  itemsExtracted: number
  byType: Record<ExtractedItemType, number>
}

export interface GoalAreaOption {
  id: string
  name: string
  icon: string
  color: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface VoiceAIProps {
  /** Current capture session (null if not capturing) */
  currentSession: CaptureSession | null
  /** Recent voice captures for history */
  recentCaptures: VoiceCapture[]
  /** Statistics about captures */
  stats: CaptureStats
  /** Available goal areas for categorization */
  goalAreas: GoalAreaOption[]
  /** Item types available for categorization */
  itemTypes: { type: ExtractedItemType; label: string; icon: string }[]

  // ---------------------------------------------------------------------------
  // Callbacks
  // ---------------------------------------------------------------------------

  /** Called when user starts a new voice capture */
  onStartCapture?: () => void
  /** Called when user stops recording */
  onStopCapture?: () => void
  /** Called when user cancels the current capture */
  onCancelCapture?: () => void

  /** Called when user edits an extracted item's text */
  onEditItem?: (itemId: string, newText: string) => void
  /** Called when user changes an extracted item's type */
  onChangeItemType?: (itemId: string, newType: ExtractedItemType) => void
  /** Called when user changes an extracted item's goal area */
  onChangeItemGoalArea?: (itemId: string, goalAreaId: string | null) => void
  /** Called when user deletes an extracted item */
  onDeleteItem?: (itemId: string) => void
  /** Called when user adds a new manual item */
  onAddItem?: (type: ExtractedItemType, text: string) => void

  /** Called when user confirms and saves all extracted items */
  onSaveItems?: () => void
  /** Called when user discards the current capture */
  onDiscardCapture?: () => void

  /** Called when user views a past capture */
  onViewCapture?: (captureId: string) => void
  /** Called when user wants to add more to a past capture */
  onAddToCapture?: (captureId: string) => void
  /** Called when user deletes a past capture */
  onDeleteCapture?: (captureId: string) => void

  /** Called when user plays back audio */
  onPlayAudio?: (captureId: string) => void
}
