// =============================================================================
// Data Types
// =============================================================================

export type NudgeType =
  | 'morning-focus'
  | 'evening-reflection'
  | 'wins-celebration'
  | 'welcome-back'
  | 'streak-milestone'

export type NudgeStatus = 'pending' | 'seen' | 'acted-on'

export type DayOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

export interface Nudge {
  id: string
  type: NudgeType
  message: string
  sentAt: string
  status: NudgeStatus
  actionTaken: string | null
  winId?: string
}

export interface Celebration {
  id: string
  winId: string
  winTitle: string
  goalArea: string
  celebratedAt: string
  encouragement: string
}

export interface ScheduledNudgePreference {
  enabled: boolean
  time: string
  days: DayOfWeek[]
}

export interface WinsCelebrationPreference {
  enabled: boolean
  celebrateImmediately: boolean
}

export interface WelcomeBackPreference {
  enabled: boolean
  afterDaysInactive: number
}

export interface StreakMilestonesPreference {
  enabled: boolean
  milestones: number[]
}

export interface NudgePreferences {
  morningFocus: ScheduledNudgePreference
  eveningReflection: ScheduledNudgePreference
  winsCelebration: WinsCelebrationPreference
  welcomeBack: WelcomeBackPreference
  streakMilestones: StreakMilestonesPreference
}

// =============================================================================
// Component Props
// =============================================================================

export interface NudgesAndCoachingProps {
  /** List of nudges to display */
  nudges: Nudge[]
  /** List of past celebrations */
  celebrations: Celebration[]
  /** User's nudge preferences */
  preferences: NudgePreferences
  /** Called when user views a nudge */
  onNudgeView?: (id: string) => void
  /** Called when user acts on a nudge */
  onNudgeAction?: (id: string) => void
  /** Called when user dismisses a nudge */
  onNudgeDismiss?: (id: string) => void
  /** Called when user views a celebration */
  onCelebrationView?: (id: string) => void
  /** Called when user updates their preferences */
  onPreferencesUpdate?: (preferences: NudgePreferences) => void
}

export interface CelebrationModalProps {
  /** The celebration to display */
  celebration: Celebration
  /** Called when user closes the celebration modal */
  onClose?: () => void
  /** Called when user wants to view the win in Wins Vault */
  onViewWin?: (winId: string) => void
  /** Called when user wants to share the win */
  onShare?: (celebrationId: string) => void
}
