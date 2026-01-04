// =============================================================================
// Data Types
// =============================================================================

export type TimeOfDay = 'morning' | 'evening' | 'weekend'

export type UrgencyLevel = 'low' | 'medium' | 'high'

export type UrgencyColor = 'green' | 'amber' | 'red'

export type StreakStatus = 'active' | 'complete' | 'paused'

export type CheckInType = 'morning' | 'evening' | 'quick'

export type WinSource = 'check-in' | 'voice-capture'

export type QuickAddType = 'chore' | 'event' | 'idea'

export type PriorityItemType = 'chore' | 'event' | 'win'

export interface TimeContext {
  current: TimeOfDay
  timestamp: string
  greeting: string
  dayOfWeek: string
}

export interface WelcomeBackState {
  isWelcomeBack: boolean
  daysAway: number
  lastCheckIn: string
}

export interface TodaysFocus {
  id: string
  text: string
  goalAreaId: string
  setAt: string
  setDuring: CheckInType
}

export interface GoalArea {
  id: string
  name: string
  icon: string
  weeklyTarget: number
  color: string
}

export interface Streak {
  id: string
  goalAreaId: string
  currentWeekCount: number
  weeklyTarget: number
  totalWeeks: number
  status: StreakStatus
  graceDayUsed: boolean
}

export interface Win {
  id: string
  text: string
  goalAreaId: string
  capturedAt: string
  source: WinSource
}

export interface Event {
  id: string
  title: string
  date: string
  time: string
  isAllDay: boolean
  goalAreaId: string | null
  personId: string | null
  recurring: boolean
  notes: string | null
}

export interface Chore {
  id: string
  title: string
  dueDate: string
  urgency: UrgencyLevel
  urgencyColor: UrgencyColor
  daysUntilDue: number
  goalAreaId: string | null
  isComplete: boolean
  notes: string | null
}

export interface CheckInResponses {
  howWasToday?: string
  didYouExercise?: string
  anyWins?: string
  qualityTime?: string
  tomorrowFocus?: string
  energyLevel?: number
  workFocus?: string
}

export interface CheckIn {
  id: string
  type: CheckInType
  date: string
  timestamp: string
  responses: CheckInResponses
  winsExtracted: string[]
  goalAreasLogged: string[]
}

export interface PriorityItem {
  type: PriorityItemType
  id: string
  title: string
  reason: string
  urgency: UrgencyLevel
}

export interface QuickAddOption {
  type: QuickAddType
  label: string
  icon: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface CommandCenterProps {
  /** Current time context for adaptive display */
  timeContext: TimeContext
  /** Welcome back state if user has been away */
  welcomeBackState: WelcomeBackState
  /** Today's single focus/intention */
  todaysFocus: TodaysFocus | null
  /** All goal areas being tracked */
  goalAreas: GoalArea[]
  /** Current streak progress for each goal area */
  streaks: Streak[]
  /** Recent wins to display */
  wins: Win[]
  /** Upcoming events */
  events: Event[]
  /** Chores with deadlines */
  chores: Chore[]
  /** Most recent check-in */
  lastCheckIn: CheckIn | null
  /** The priority item to display large at top */
  priorityItem: PriorityItem | null
  /** Quick add button options */
  quickAddOptions: QuickAddOption[]

  // ---------------------------------------------------------------------------
  // Callbacks
  // ---------------------------------------------------------------------------

  /** Called when user triggers voice capture */
  onVoiceCapture?: () => void
  /** Called when user starts a check-in flow */
  onStartCheckIn?: (type: CheckInType) => void
  /** Called when user quick-adds an item */
  onQuickAdd?: (type: QuickAddType) => void
  /** Called when user sets today's focus */
  onSetFocus?: (text: string) => void

  /** Called when user marks a chore complete */
  onCompleteChore?: (id: string) => void
  /** Called when user edits a chore */
  onEditChore?: (id: string) => void

  /** Called when user marks an event complete/done */
  onCompleteEvent?: (id: string) => void
  /** Called when user edits an event */
  onEditEvent?: (id: string) => void

  /** Called when user views a win's details */
  onViewWin?: (id: string) => void

  /** Called when user navigates to a goal area */
  onNavigateToGoal?: (goalAreaId: string) => void
  /** Called when user navigates to view all streaks */
  onViewAllStreaks?: () => void
  /** Called when user navigates to view all wins */
  onViewAllWins?: () => void
  /** Called when user navigates to view all events */
  onViewAllEvents?: () => void
  /** Called when user navigates to view all chores */
  onViewAllChores?: () => void

  /** Called during welcome back flow when user submits notable events */
  onWelcomeBackSubmit?: (notableEvents: string, todaysFocus: string) => void
  /** Called when user dismisses welcome back flow */
  onWelcomeBackDismiss?: () => void
}
