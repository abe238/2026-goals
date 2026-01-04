'use client'

import { useState } from 'react'
import {
  Target,
  Zap,
  Users,
  TrendingUp,
  Plus,
  Star,
  Check,
  ChevronRight,
  Award,
  Briefcase,
  UserCheck,
  Eye,
  Lightbulb,
  Heart,
  Clock,
  ArrowUpRight,
} from 'lucide-react'
import type {
  WorkAndLeadershipProps,
  WorkType,
  LeadershipCategory,
  LeadershipWin,
  TeamMember,
  WeeklyIntention,
  ImpactEvidence,
} from '../../../../product/sections/work-and-leadership/types'

// =============================================================================
// Sub-Components
// =============================================================================

function BalanceGauge({
  percentage,
  target,
  trend,
}: {
  percentage: number
  target: number
  trend: number[]
}) {
  const isOnTarget = percentage >= target
  const gaugeColor = isOnTarget ? 'bg-amber-500' : 'bg-neutral-600'

  return (
    <div className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-amber-500" />
          <span className="text-neutral-400 text-sm">Strategic Balance</span>
        </div>
        <span className="text-xs text-neutral-500">Target: {target}%</span>
      </div>

      <div className="flex items-end gap-4 mb-4">
        <span className="text-5xl font-light text-white">{percentage}%</span>
        <span className={`text-sm mb-2 ${isOnTarget ? 'text-emerald-400' : 'text-neutral-500'}`}>
          {isOnTarget ? 'On target' : `${target - percentage}% to go`}
        </span>
      </div>

      <div className="h-3 bg-neutral-800 rounded-full overflow-hidden mb-4">
        <div
          className={`h-full ${gaugeColor} rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-neutral-500">4-week trend:</span>
        <div className="flex items-end gap-1 h-6">
          {trend.map((value, i) => (
            <div
              key={i}
              className={`w-2 rounded-sm transition-all ${
                i === trend.length - 1 ? 'bg-amber-500' : 'bg-neutral-700'
              }`}
              style={{ height: `${(value / 50) * 100}%` }}
            />
          ))}
        </div>
        <TrendingUp className="w-3 h-3 text-emerald-400 ml-1" />
      </div>
    </div>
  )
}

function WorkTypeToggle({
  selected,
  onChange,
}: {
  selected: WorkType
  onChange: (type: WorkType) => void
}) {
  return (
    <div className="flex bg-neutral-800 rounded-xl p-1">
      <button
        onClick={() => onChange('strategic')}
        className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
          selected === 'strategic'
            ? 'bg-amber-500/20 text-amber-400'
            : 'text-neutral-400 hover:text-neutral-300'
        }`}
      >
        <Target className="w-4 h-4" />
        Strategic
      </button>
      <button
        onClick={() => onChange('reactive')}
        className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
          selected === 'reactive'
            ? 'bg-neutral-600 text-white'
            : 'text-neutral-400 hover:text-neutral-300'
        }`}
      >
        <Zap className="w-4 h-4" />
        Reactive
      </button>
    </div>
  )
}

const categoryConfig: Record<LeadershipCategory, { icon: typeof Award; label: string; color: string }> = {
  delegation: { icon: UserCheck, label: 'Delegation', color: 'text-blue-400' },
  mentoring: { icon: Heart, label: 'Mentoring', color: 'text-pink-400' },
  visibility: { icon: Eye, label: 'Visibility', color: 'text-purple-400' },
  impact: { icon: TrendingUp, label: 'Impact', color: 'text-emerald-400' },
  'team-support': { icon: Users, label: 'Team Support', color: 'text-cyan-400' },
  'strategic-thinking': { icon: Lightbulb, label: 'Strategic', color: 'text-amber-400' },
}

function LeadershipWinCard({
  win,
  onClick,
}: {
  win: LeadershipWin
  onClick?: () => void
}) {
  const config = categoryConfig[win.category]
  const Icon = config.icon

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-neutral-900 rounded-xl p-4 border border-neutral-800 hover:border-neutral-700 transition-all group"
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg bg-neutral-800 ${config.color}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm mb-1">{win.description}</p>
          {win.impact && (
            <p className="text-emerald-400 text-xs">{win.impact}</p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-xs ${config.color}`}>{config.label}</span>
            {win.isHighlight && (
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            )}
          </div>
        </div>
      </div>
    </button>
  )
}

function TeamMemberCard({
  member,
  onClick,
}: {
  member: TeamMember
  onClick?: () => void
}) {
  const healthColors = {
    strong: 'border-emerald-500 bg-emerald-500/10',
    good: 'border-blue-500 bg-blue-500/10',
    'needs-attention': 'border-amber-500 bg-amber-500/10',
    overdue: 'border-red-500 bg-red-500/10',
  }

  const healthLabels = {
    strong: 'Strong',
    good: 'Good',
    'needs-attention': 'Needs attention',
    overdue: 'Overdue',
  }

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-neutral-900 rounded-xl p-4 border border-neutral-800 hover:border-neutral-700 transition-all"
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 ${healthColors[member.connectionHealth]}`}
        >
          {member.avatarInitials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-medium">{member.name}</p>
          <p className="text-neutral-500 text-xs">{member.role}</p>
        </div>
        <div className="text-right">
          <span
            className={`text-xs ${
              member.connectionHealth === 'overdue'
                ? 'text-red-400'
                : member.connectionHealth === 'needs-attention'
                ? 'text-amber-400'
                : 'text-neutral-500'
            }`}
          >
            {healthLabels[member.connectionHealth]}
          </span>
        </div>
      </div>
      {member.recentContext && (
        <p className="text-neutral-400 text-xs mt-2 pl-13">{member.recentContext}</p>
      )}
    </button>
  )
}

function IntentionCard({
  intention,
  onComplete,
}: {
  intention: WeeklyIntention
  onComplete?: () => void
}) {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
        intention.isCompleted
          ? 'bg-neutral-900/50 border-neutral-800'
          : 'bg-neutral-900 border-neutral-800'
      }`}
    >
      <button
        onClick={onComplete}
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
          intention.isCompleted
            ? 'bg-emerald-500 border-emerald-500'
            : intention.type === 'strategic'
            ? 'border-amber-500 hover:bg-amber-500/20'
            : 'border-purple-500 hover:bg-purple-500/20'
        }`}
      >
        {intention.isCompleted && <Check className="w-3 h-3 text-white" />}
      </button>
      <span
        className={`flex-1 text-sm ${
          intention.isCompleted ? 'text-neutral-500 line-through' : 'text-white'
        }`}
      >
        {intention.text}
      </span>
      <span
        className={`text-xs px-2 py-0.5 rounded-full ${
          intention.type === 'strategic'
            ? 'bg-amber-500/20 text-amber-400'
            : 'bg-purple-500/20 text-purple-400'
        }`}
      >
        {intention.type}
      </span>
    </div>
  )
}

function EvidenceCard({
  evidence,
  onToggleStar,
}: {
  evidence: ImpactEvidence
  onToggleStar?: () => void
}) {
  const config = categoryConfig[evidence.category]

  return (
    <div className="bg-neutral-900 rounded-xl p-4 border border-neutral-800">
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-white text-sm font-medium">{evidence.title}</h4>
        <button
          onClick={onToggleStar}
          className="p-1 hover:bg-neutral-800 rounded transition-all"
        >
          <Star
            className={`w-4 h-4 ${
              evidence.isStarred ? 'text-amber-500 fill-amber-500' : 'text-neutral-600'
            }`}
          />
        </button>
      </div>
      <p className="text-neutral-400 text-xs mb-3">{evidence.description}</p>
      {evidence.metrics && (
        <p className="text-emerald-400 text-xs font-medium mb-2">{evidence.metrics}</p>
      )}
      <div className="flex items-center justify-between">
        <span className={`text-xs ${config.color}`}>{config.label}</span>
        <span className="text-xs text-neutral-500">{evidence.date}</span>
      </div>
    </div>
  )
}

function CareerProgressCard({
  progress,
}: {
  progress: {
    currentLevel: string
    targetLevel: string
    evidenceCount: number
    evidenceTarget: number
    keyMilestones: { id: string; label: string; isComplete: boolean }[]
  }
}) {
  const percentage = (progress.evidenceCount / progress.evidenceTarget) * 100
  const completedMilestones = progress.keyMilestones.filter((m) => m.isComplete).length

  return (
    <div className="bg-gradient-to-br from-amber-500/10 to-neutral-900 rounded-2xl p-6 border border-amber-500/20">
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-5 h-5 text-amber-500" />
        <span className="text-amber-400 text-sm font-medium">Career Progress</span>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-neutral-400 text-sm">{progress.currentLevel}</span>
        <ArrowUpRight className="w-4 h-4 text-amber-500" />
        <span className="text-white text-sm font-medium">{progress.targetLevel}</span>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-neutral-400">Evidence collected</span>
          <span className="text-xs text-amber-400">
            {progress.evidenceCount}/{progress.evidenceTarget}
          </span>
        </div>
        <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-500 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-xs text-neutral-400">
          Key milestones ({completedMilestones}/{progress.keyMilestones.length})
        </span>
        <div className="flex flex-wrap gap-2">
          {progress.keyMilestones.map((milestone) => (
            <span
              key={milestone.id}
              className={`text-xs px-2 py-1 rounded-full ${
                milestone.isComplete
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-neutral-800 text-neutral-500'
              }`}
            >
              {milestone.isComplete && <Check className="w-3 h-3 inline mr-1" />}
              {milestone.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function LogWorkModal({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean
  onClose: () => void
  onSubmit: (type: WorkType, description: string, duration: number) => void
}) {
  const [workType, setWorkType] = useState<WorkType>('strategic')
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState(30)

  if (!isOpen) return null

  const handleSubmit = () => {
    if (description.trim()) {
      onSubmit(workType, description.trim(), duration)
      setDescription('')
      setDuration(30)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-neutral-900 rounded-2xl p-6 w-full max-w-md border border-neutral-800">
        <h3 className="text-xl font-semibold text-white mb-4">Log Work</h3>

        <div className="space-y-4">
          <WorkTypeToggle selected={workType} onChange={setWorkType} />

          <div>
            <label className="block text-sm text-neutral-400 mb-2">
              What did you work on?
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={
                workType === 'strategic'
                  ? 'Planning, architecture, 1:1s, strategy...'
                  : 'Meetings, incidents, emails, requests...'
              }
              className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-3 text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-500 resize-none"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-2">Duration</label>
            <div className="flex gap-2">
              {[15, 30, 60, 90, 120].map((mins) => (
                <button
                  key={mins}
                  onClick={() => setDuration(mins)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    duration === mins
                      ? 'bg-amber-500 text-black'
                      : 'bg-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  {mins < 60 ? `${mins}m` : `${mins / 60}h`}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-neutral-800 text-neutral-400 font-medium hover:text-white transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!description.trim()}
            className="flex-1 py-3 rounded-xl bg-amber-500 text-black font-medium hover:bg-amber-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Log Work
          </button>
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// Main Component
// =============================================================================

export function WorkAndLeadership({
  workBalance,
  workEntries: _workEntries,
  leadershipWins,
  teamMembers,
  weeklyIntentions,
  impactEvidence,
  careerProgress,
  stats,
  onLogWork,
  onAddLeadershipWin,
  onViewTeamMember,
  onLogTeamInteraction: _onLogTeamInteraction,
  onAddIntention,
  onCompleteIntention,
  onAddEvidence: _onAddEvidence,
  onToggleEvidenceStar,
  onExportEvidence,
}: WorkAndLeadershipProps) {
  const [isLogWorkOpen, setIsLogWorkOpen] = useState(false)

  const highlightWins = leadershipWins.filter((w) => w.isHighlight).slice(0, 3)
  const needsAttentionMembers = teamMembers.filter(
    (m) => m.connectionHealth === 'needs-attention' || m.connectionHealth === 'overdue'
  )
  const starredEvidence = impactEvidence.filter((e) => e.isStarred)

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 pb-24">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-white mb-2">Work & Leadership</h1>
          <p className="text-neutral-400">
            Strategic thinking, not just reactive doing.
          </p>
        </div>

        {/* Balance Gauge */}
        <BalanceGauge
          percentage={workBalance.strategicPercentage}
          target={workBalance.targetPercentage}
          trend={workBalance.trend}
        />

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-neutral-900 rounded-xl p-4 text-center border border-neutral-800">
            <p className="text-2xl font-light text-amber-400">{stats.thisWeekStrategicHours}h</p>
            <p className="text-xs text-neutral-500">Strategic</p>
          </div>
          <div className="bg-neutral-900 rounded-xl p-4 text-center border border-neutral-800">
            <p className="text-2xl font-light text-neutral-400">{stats.thisWeekReactiveHours}h</p>
            <p className="text-xs text-neutral-500">Reactive</p>
          </div>
          <div className="bg-neutral-900 rounded-xl p-4 text-center border border-neutral-800">
            <p className="text-2xl font-light text-emerald-400">{stats.leadershipWinsThisMonth}</p>
            <p className="text-xs text-neutral-500">Leadership Wins</p>
          </div>
          <div className="bg-neutral-900 rounded-xl p-4 text-center border border-neutral-800">
            <p className="text-2xl font-light text-white">{stats.teamInteractionsThisWeek}</p>
            <p className="text-xs text-neutral-500">Team 1:1s</p>
          </div>
        </div>

        {/* Log Work Button */}
        <button
          onClick={() => setIsLogWorkOpen(true)}
          className="w-full py-4 rounded-2xl bg-amber-500 text-black font-medium text-lg flex items-center justify-center gap-2 hover:bg-amber-400 transition-all"
        >
          <Clock className="w-5 h-5" />
          Log Work
        </button>

        {/* Weekly Intentions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-white">Weekly Intentions</h2>
            <button
              onClick={() => onAddIntention?.('', 'strategic')}
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-all"
            >
              <Plus className="w-4 h-4 text-neutral-400" />
            </button>
          </div>
          <div className="space-y-2">
            {weeklyIntentions.map((intention) => (
              <IntentionCard
                key={intention.id}
                intention={intention}
                onComplete={() => onCompleteIntention?.(intention.id)}
              />
            ))}
          </div>
        </div>

        {/* Team Visibility */}
        {needsAttentionMembers.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-medium text-white">Needs Connection</h2>
              </div>
            </div>
            <div className="space-y-2">
              {needsAttentionMembers.map((member) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  onClick={() => onViewTeamMember?.(member.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Team Members */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-white">Team</h2>
            <span className="text-sm text-neutral-500">{teamMembers.length} members</span>
          </div>
          <div className="grid gap-2">
            {teamMembers
              .filter((m) => m.connectionHealth === 'strong' || m.connectionHealth === 'good')
              .slice(0, 4)
              .map((member) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  onClick={() => onViewTeamMember?.(member.id)}
                />
              ))}
          </div>
        </div>

        {/* Leadership Wins */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-medium text-white">Leadership Wins</h2>
            </div>
            <button
              onClick={() => onAddLeadershipWin?.('delegation', '')}
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-all"
            >
              <Plus className="w-4 h-4 text-neutral-400" />
            </button>
          </div>
          <div className="space-y-2">
            {highlightWins.map((win) => (
              <LeadershipWinCard key={win.id} win={win} />
            ))}
          </div>
        </div>

        {/* Career Progress */}
        <CareerProgressCard progress={careerProgress} />

        {/* Impact Evidence */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-medium text-white">Impact Evidence</h2>
            </div>
            <button
              onClick={onExportEvidence}
              className="text-sm text-amber-400 hover:text-amber-300 transition-all flex items-center gap-1"
            >
              Export
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid gap-3">
            {starredEvidence.map((evidence) => (
              <EvidenceCard
                key={evidence.id}
                evidence={evidence}
                onToggleStar={() => onToggleEvidenceStar?.(evidence.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Log Work Modal */}
      <LogWorkModal
        isOpen={isLogWorkOpen}
        onClose={() => setIsLogWorkOpen(false)}
        onSubmit={(type, description, duration) => {
          onLogWork?.(type, description, duration)
        }}
      />
    </div>
  )
}
