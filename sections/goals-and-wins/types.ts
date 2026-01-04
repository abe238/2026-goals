// =============================================================================
// Data Types
// =============================================================================

export type GoalAreaId = string

export type StreakDayStatus = 'completed' | 'missed' | 'grace' | 'future' | 'today'

export interface StreakDay {
  date: string
  status: StreakDayStatus
  winsCount: number
}

export interface WeeklyStreak {
  weekStart: string
  days: StreakDay[]
  currentStreak: number
  longestStreak: number
  graceDaysUsed: number
  graceDaysTotal: number
}

export interface Win {
  id: string
  text: string
  timestamp: string
  goalAreaId: GoalAreaId | null
  isFavorite: boolean
  source: 'manual' | 'voice' | 'nudge'
}

export interface GoalArea {
  id: GoalAreaId
  name: string
  icon: string
  color: string
  weeklyTarget: number
  currentWeekWins: number
  totalWins: number
  currentStreak: number
  isActive: boolean
}

export interface Milestone {
  id: string
  type: 'streak' | 'wins' | 'consistency'
  value: number
  label: string
  unlockedAt: string | null
  icon: string
}

export interface GoalsStats {
  totalWins: number
  currentStreak: number
  longestStreak: number
  thisWeekWins: number
  graceDaysRemaining: number
  milestonesUnlocked: number
}

// =============================================================================
// Component Props
// =============================================================================

export interface GoalsAndWinsProps {
  /** Current week's streak data */
  weeklyStreak: WeeklyStreak
  /** List of wins (recent first) */
  wins: Win[]
  /** Goal areas with progress */
  goalAreas: GoalArea[]
  /** Milestone badges */
  milestones: Milestone[]
  /** Overall statistics */
  stats: GoalsStats
  /** Currently selected goal areas for the week */
  weeklyFocus: GoalAreaId[]

  // ---------------------------------------------------------------------------
  // Callbacks
  // ---------------------------------------------------------------------------

  /** Called when user logs a new win */
  onLogWin?: (text: string, goalAreaId?: GoalAreaId) => void
  /** Called when user favorites/unfavorites a win */
  onToggleFavorite?: (winId: string) => void
  /** Called when user deletes a win */
  onDeleteWin?: (winId: string) => void
  /** Called when user edits a win */
  onEditWin?: (winId: string, newText: string) => void
  /** Called when user changes weekly focus areas */
  onSetWeeklyFocus?: (goalAreaIds: GoalAreaId[]) => void
  /** Called when user views a specific goal area */
  onViewGoalArea?: (goalAreaId: GoalAreaId) => void
  /** Called when user searches wins */
  onSearchWins?: (query: string) => void
  /** Called when user filters wins by goal area */
  onFilterByGoalArea?: (goalAreaId: GoalAreaId | null) => void
}
