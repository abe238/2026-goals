// =============================================================================
// Data Types
// =============================================================================

export type WorkType = 'strategic' | 'reactive'

export type LeadershipCategory =
  | 'delegation'
  | 'mentoring'
  | 'visibility'
  | 'impact'
  | 'team-support'
  | 'strategic-thinking'

export interface WorkEntry {
  id: string
  type: WorkType
  description: string
  timestamp: string
  durationMinutes: number
  tags?: string[]
}

export interface LeadershipWin {
  id: string
  category: LeadershipCategory
  description: string
  timestamp: string
  impact?: string
  isHighlight: boolean
}

export interface TeamMember {
  id: string
  name: string
  role: string
  avatarInitials: string
  lastInteraction: string | null
  connectionHealth: 'strong' | 'good' | 'needs-attention' | 'overdue'
  recentContext?: string
}

export interface WeeklyIntention {
  id: string
  text: string
  type: 'strategic' | 'leadership'
  isCompleted: boolean
}

export interface WorkBalance {
  weekStart: string
  strategicMinutes: number
  reactiveMinutes: number
  strategicPercentage: number
  trend: number[] // Last 4 weeks percentages
  targetPercentage: number
}

export interface ImpactEvidence {
  id: string
  title: string
  description: string
  date: string
  category: LeadershipCategory
  metrics?: string
  isStarred: boolean
}

export interface CareerProgress {
  currentLevel: string
  targetLevel: string
  evidenceCount: number
  evidenceTarget: number
  keyMilestones: {
    id: string
    label: string
    isComplete: boolean
  }[]
}

export interface WorkStats {
  thisWeekStrategicHours: number
  thisWeekReactiveHours: number
  leadershipWinsThisMonth: number
  teamInteractionsThisWeek: number
  impactEvidenceTotal: number
}

// =============================================================================
// Component Props
// =============================================================================

export interface WorkAndLeadershipProps {
  /** Current week's work balance */
  workBalance: WorkBalance
  /** Recent work entries */
  workEntries: WorkEntry[]
  /** Leadership wins */
  leadershipWins: LeadershipWin[]
  /** Team members */
  teamMembers: TeamMember[]
  /** Weekly intentions */
  weeklyIntentions: WeeklyIntention[]
  /** Impact evidence for career progress */
  impactEvidence: ImpactEvidence[]
  /** Career progress tracking */
  careerProgress: CareerProgress
  /** Overall statistics */
  stats: WorkStats

  // ---------------------------------------------------------------------------
  // Callbacks
  // ---------------------------------------------------------------------------

  /** Called when user logs work */
  onLogWork?: (type: WorkType, description: string, durationMinutes: number) => void
  /** Called when user adds a leadership win */
  onAddLeadershipWin?: (category: LeadershipCategory, description: string) => void
  /** Called when user views a team member */
  onViewTeamMember?: (memberId: string) => void
  /** Called when user logs team interaction */
  onLogTeamInteraction?: (memberId: string, context: string) => void
  /** Called when user adds weekly intention */
  onAddIntention?: (text: string, type: 'strategic' | 'leadership') => void
  /** Called when user completes an intention */
  onCompleteIntention?: (intentionId: string) => void
  /** Called when user adds impact evidence */
  onAddEvidence?: (title: string, description: string, category: LeadershipCategory) => void
  /** Called when user stars/unstars evidence */
  onToggleEvidenceStar?: (evidenceId: string) => void
  /** Called when user exports impact evidence */
  onExportEvidence?: () => void
}
