// =============================================================================
// Data Types
// =============================================================================

export type DomainTab = 'events' | 'people' | 'ideas' | 'chores'

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night'

export type UrgencyLevel = 'relaxed' | 'upcoming' | 'soon' | 'urgent' | 'overdue'

export interface Event {
  id: string
  title: string
  date: string
  time?: string
  timeOfDay: TimeOfDay
  location?: string
  isAllDay: boolean
  isRecurring: boolean
  category?: string
}

export interface Person {
  id: string
  name: string
  relationship: string
  avatarInitials: string
  lastConnected: string | null
  connectionHealth: 'strong' | 'good' | 'needs-attention' | 'overdue'
  nextAction?: string
  notes?: string
}

export interface Idea {
  id: string
  title: string
  description?: string
  category: 'tech' | 'project' | 'explore' | 'someday' | 'learn'
  capturedAt: string
  source?: 'voice' | 'manual' | 'nudge'
  isFavorite: boolean
  link?: string
}

export interface Chore {
  id: string
  title: string
  dueDate: string
  dueTime?: string
  urgency: UrgencyLevel
  percentageRemaining: number
  isRecurring: boolean
  recurringPattern?: string
  category?: string
  isCompleted: boolean
}

export interface DomainStats {
  eventsToday: number
  eventsThisWeek: number
  peopleNeedingConnection: number
  ideasCount: number
  choresDueToday: number
  choresOverdue: number
}

// =============================================================================
// Component Props
// =============================================================================

export interface LifeDomainsProps {
  /** Currently active tab */
  activeTab: DomainTab
  /** Today's date for context */
  today: string
  /** Current time of day */
  currentTimeOfDay: TimeOfDay
  /** Upcoming events */
  events: Event[]
  /** People and relationships */
  people: Person[]
  /** Ideas vault */
  ideas: Idea[]
  /** Chores and non-negotiables */
  chores: Chore[]
  /** Overall statistics */
  stats: DomainStats

  // ---------------------------------------------------------------------------
  // Callbacks
  // ---------------------------------------------------------------------------

  /** Called when user switches tabs */
  onTabChange?: (tab: DomainTab) => void
  /** Called when user views an event */
  onViewEvent?: (eventId: string) => void
  /** Called when user adds an event */
  onAddEvent?: () => void
  /** Called when user views a person */
  onViewPerson?: (personId: string) => void
  /** Called when user logs a connection */
  onLogConnection?: (personId: string, note?: string) => void
  /** Called when user adds a person */
  onAddPerson?: () => void
  /** Called when user views an idea */
  onViewIdea?: (ideaId: string) => void
  /** Called when user adds an idea */
  onAddIdea?: (title: string, category: Idea['category']) => void
  /** Called when user favorites an idea */
  onToggleIdeaFavorite?: (ideaId: string) => void
  /** Called when user completes a chore */
  onCompleteChore?: (choreId: string) => void
  /** Called when user adds a chore */
  onAddChore?: () => void
  /** Called when user snoozes a chore */
  onSnoozeChore?: (choreId: string) => void
}
