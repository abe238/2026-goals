// =============================================================================
// Core Entity Types - Momentum 2026
// =============================================================================

// Time & Context
export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'weekend'
export type UrgencyLevel = 'low' | 'medium' | 'high'
export type UrgencyColor = 'green' | 'amber' | 'red'
export type StreakStatus = 'active' | 'complete' | 'paused'
export type CheckInType = 'morning' | 'evening' | 'quick'
export type WinSource = 'check-in' | 'voice-capture' | 'manual'
export type QuickAddType = 'chore' | 'event' | 'idea'
export type PriorityItemType = 'chore' | 'event' | 'win'
export type CFRType = 'PRAISE' | 'DESC' | 'MENTOR' | 'TRAIN' | 'CONFRONT' | 'NONE'
export type CaptureCategory = 'win' | 'chore' | 'event' | 'idea' | 'work' | 'person' | 'other'

// =============================================================================
// User & Auth
// =============================================================================

export interface User {
  id: string
  email: string
  name: string
  avatarUrl?: string
  createdAt: string
  lastLoginAt: string
  settings: UserSettings
}

export interface UserSettings {
  nudgePreferences: NudgePreferences
  notificationChannels: NotificationChannels
  timezone: string
  weekStartsOn: 'sunday' | 'monday'
}

export interface NudgePreferences {
  morningNudgeTime: string
  eveningNudgeTime: string
  weekendMode: boolean
  urgentOnly: boolean
}

export interface NotificationChannels {
  sms: boolean
  slack: boolean
  telegram: boolean
  push: boolean
}

// =============================================================================
// Capture (Voice Input)
// =============================================================================

export interface Capture {
  id: string
  userId: string
  rawTranscript: string
  processedItems: CaptureItem[]
  audioUrl?: string
  duration: number
  capturedAt: string
  status: 'processing' | 'completed' | 'failed'
}

export interface CaptureItem {
  id: string
  captureId: string
  category: CaptureCategory
  text: string
  confidence: number
  entityId?: string
  createdAt: string
}

// =============================================================================
// Check-Ins
// =============================================================================

export interface CheckIn {
  id: string
  userId: string
  type: CheckInType
  date: string
  timestamp: string
  responses: CheckInResponses
  winsExtracted: string[]
  goalAreasLogged: string[]
}

export interface CheckInResponses {
  howWasToday?: string
  didYouExercise?: string
  anyWins?: string
  qualityTime?: string
  tomorrowFocus?: string
  energyLevel?: number
  workFocus?: string
  gratitude?: string
}

// =============================================================================
// Goals & Wins
// =============================================================================

export interface GoalArea {
  id: string
  userId: string
  name: string
  icon: string
  color: string
  weeklyTarget: number
  isActive: boolean
  createdAt: string
}

export interface Streak {
  id: string
  goalAreaId: string
  weekNumber: number
  year: number
  currentWeekCount: number
  weeklyTarget: number
  totalWeeks: number
  status: StreakStatus
  graceDaysUsed: number
  maxGraceDays: number
  startedAt: string
  updatedAt: string
}

export interface Win {
  id: string
  userId: string
  text: string
  goalAreaId?: string
  capturedAt: string
  source: WinSource
  captureId?: string
  checkInId?: string
  isCelebrated: boolean
}

export interface TodaysFocus {
  id: string
  userId: string
  text: string
  goalAreaId?: string
  setAt: string
  setDuring: CheckInType
  date: string
}

// =============================================================================
// Life Domains
// =============================================================================

export interface Event {
  id: string
  userId: string
  title: string
  description?: string
  date: string
  time?: string
  endTime?: string
  isAllDay: boolean
  goalAreaId?: string
  personId?: string
  recurring: boolean
  recurringPattern?: string
  location?: string
  notes?: string
  isCompleted: boolean
  createdAt: string
}

export interface Person {
  id: string
  userId: string
  name: string
  relationship: string
  lastContactAt?: string
  targetFrequencyDays: number
  notes?: string
  avatarUrl?: string
  createdAt: string
}

export interface Idea {
  id: string
  userId: string
  title: string
  description?: string
  category?: string
  tags: string[]
  capturedAt: string
  captureId?: string
  isFavorite: boolean
}

export interface Chore {
  id: string
  userId: string
  title: string
  description?: string
  dueDate: string
  urgency: UrgencyLevel
  urgencyColor: UrgencyColor
  daysUntilDue: number
  goalAreaId?: string
  isComplete: boolean
  completedAt?: string
  recurring: boolean
  recurringPattern?: string
  notes?: string
  createdAt: string
}

// =============================================================================
// Work & Leadership
// =============================================================================

export type WorkItemType = 'strategic' | 'reactive'

export interface WorkItem {
  id: string
  userId: string
  title: string
  description?: string
  type: WorkItemType
  goalAreaId?: string
  impactScore?: number
  loggedAt: string
  tags: string[]
}

export interface LeadershipWin {
  id: string
  userId: string
  winId: string
  leadershipPrinciples: string[]
  visibilityScore: number
  evidence: string
  createdAt: string
}

export interface TeamMember {
  id: string
  userId: string
  name: string
  role: string
  lastOneOnOneAt?: string
  connectionHealth: 'good' | 'needs-attention' | 'overdue'
  notes?: string
}

// =============================================================================
// Nudges & Notifications
// =============================================================================

export type NudgeType = 'reminder' | 'celebration' | 'coaching' | 'check-in'
export type NudgeChannel = 'sms' | 'slack' | 'telegram' | 'push'
export type NudgeStatus = 'pending' | 'sent' | 'seen' | 'acted'

export interface Nudge {
  id: string
  userId: string
  type: NudgeType
  channel: NudgeChannel
  message: string
  scheduledFor: string
  sentAt?: string
  seenAt?: string
  actedAt?: string
  status: NudgeStatus
  entityType?: string
  entityId?: string
  createdAt: string
}

export interface Celebration {
  id: string
  userId: string
  winId: string
  title: string
  message: string
  milestoneType?: 'streak-7' | 'streak-30' | 'streak-90' | 'first-win' | 'goal-complete'
  celebratedAt: string
  confettiShown: boolean
}

// =============================================================================
// UI State Types
// =============================================================================

export interface TimeContext {
  current: TimeOfDay
  timestamp: string
  greeting: string
  dayOfWeek: string
}

export interface WelcomeBackState {
  isWelcomeBack: boolean
  daysAway: number
  lastCheckIn?: string
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
// Navigation
// =============================================================================

export interface NavigationItem {
  label: string
  href: string
  icon: React.ReactNode
  isActive?: boolean
}
