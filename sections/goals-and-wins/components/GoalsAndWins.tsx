'use client'

import { useState } from 'react'
import {
  Plus,
  Trophy,
  Flame,
  Star,
  Heart,
  Search,
  Dumbbell,
  Brain,
  Baby,
  Target,
  Briefcase,
  PenTool,
  Users,
  Sparkles,
  ChevronRight,
  X,
  Check,
  Medal,
  Crown,
  Zap,
} from 'lucide-react'
import type {
  GoalsAndWinsProps,
  Win,
  GoalArea,
  StreakDay,
  Milestone,
  GoalAreaId,
} from '../../../../product/sections/goals-and-wins/types'

const goalIcons: Record<string, React.ReactNode> = {
  dumbbell: <Dumbbell className="w-4 h-4" />,
  brain: <Brain className="w-4 h-4" />,
  baby: <Baby className="w-4 h-4" />,
  heart: <Heart className="w-4 h-4" />,
  target: <Target className="w-4 h-4" />,
  briefcase: <Briefcase className="w-4 h-4" />,
  pen: <PenTool className="w-4 h-4" />,
  users: <Users className="w-4 h-4" />,
}

const milestoneIcons: Record<string, React.ReactNode> = {
  flame: <Flame className="w-5 h-5" />,
  trophy: <Trophy className="w-5 h-5" />,
  medal: <Medal className="w-5 h-5" />,
  zap: <Zap className="w-5 h-5" />,
  crown: <Crown className="w-5 h-5" />,
  star: <Star className="w-5 h-5" />,
}

const goalColors: Record<string, { bg: string; text: string; border: string }> = {
  emerald: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  purple: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30' },
  orange: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' },
  pink: { bg: 'bg-pink-500/20', text: 'text-pink-400', border: 'border-pink-500/30' },
  blue: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
  indigo: { bg: 'bg-indigo-500/20', text: 'text-indigo-400', border: 'border-indigo-500/30' },
  amber: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
  rose: { bg: 'bg-rose-500/20', text: 'text-rose-400', border: 'border-rose-500/30' },
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

function StreakPill({ day }: { day: StreakDay }) {
  const dayName = new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }).charAt(0)

  const statusStyles: Record<string, string> = {
    completed: 'bg-amber-500 text-neutral-950',
    missed: 'bg-neutral-800 text-neutral-500',
    grace: 'bg-amber-500/30 text-amber-400 ring-1 ring-amber-500/50',
    future: 'bg-neutral-900 text-neutral-600 border border-neutral-800',
    today: 'bg-amber-500/20 text-amber-400 ring-2 ring-amber-500',
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold ${statusStyles[day.status]}`}
      >
        {day.status === 'grace' ? <Star className="w-4 h-4" /> : day.winsCount || dayName}
      </div>
      <span className="text-[10px] text-neutral-500 uppercase">{dayName}</span>
    </div>
  )
}

function WinCard({
  win,
  goalArea,
  onToggleFavorite,
}: {
  win: Win
  goalArea?: GoalArea
  onToggleFavorite?: (id: string) => void
}) {
  const colors = goalArea ? goalColors[goalArea.color] : null

  return (
    <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl hover:border-neutral-700 transition-colors">
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggleFavorite?.(win.id)}
          className={`mt-0.5 transition-colors ${
            win.isFavorite ? 'text-amber-400' : 'text-neutral-600 hover:text-amber-400'
          }`}
        >
          {win.isFavorite ? (
            <Star className="w-4 h-4 fill-current" />
          ) : (
            <Star className="w-4 h-4" />
          )}
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-neutral-100 leading-relaxed">{win.text}</p>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {goalArea && colors && (
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${colors.bg} ${colors.text}`}
              >
                {goalIcons[goalArea.icon]}
                {goalArea.name}
              </span>
            )}
            <span className="text-xs text-neutral-500">{formatRelativeTime(win.timestamp)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function GoalAreaCard({
  goalArea,
  isActive,
  onView,
}: {
  goalArea: GoalArea
  isActive: boolean
  onView?: () => void
}) {
  const colors = goalColors[goalArea.color]
  const progress = Math.min((goalArea.currentWeekWins / goalArea.weeklyTarget) * 100, 100)

  return (
    <button
      onClick={onView}
      className={`w-full text-left p-4 rounded-xl border transition-all ${
        isActive
          ? `${colors.bg} ${colors.border}`
          : 'bg-neutral-900/50 border-neutral-800 hover:border-neutral-700'
      }`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg ${colors.bg} ${colors.text}`}>
          {goalIcons[goalArea.icon]}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-neutral-100 truncate">{goalArea.name}</h3>
          <p className="text-xs text-neutral-500">
            {goalArea.currentStreak > 0 && (
              <span className="inline-flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-500" />
                {goalArea.currentStreak}d streak
              </span>
            )}
          </p>
        </div>
        <ChevronRight className="w-4 h-4 text-neutral-600" />
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-neutral-400">This week</span>
          <span className={colors.text}>
            {goalArea.currentWeekWins}/{goalArea.weeklyTarget}
          </span>
        </div>
        <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${colors.bg.replace('/20', '')}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </button>
  )
}

function MilestoneBadge({ milestone }: { milestone: Milestone }) {
  const isUnlocked = milestone.unlockedAt !== null

  return (
    <div
      className={`flex flex-col items-center p-3 rounded-xl border ${
        isUnlocked
          ? 'bg-amber-500/10 border-amber-500/30'
          : 'bg-neutral-900/50 border-neutral-800 opacity-40'
      }`}
    >
      <div
        className={`mb-1 ${isUnlocked ? 'text-amber-400' : 'text-neutral-600'}`}
      >
        {milestoneIcons[milestone.icon]}
      </div>
      <span className={`text-xs font-medium ${isUnlocked ? 'text-amber-400' : 'text-neutral-500'}`}>
        {milestone.label}
      </span>
    </div>
  )
}

function LogWinModal({
  goalAreas,
  onClose,
  onSubmit,
}: {
  goalAreas: GoalArea[]
  onClose: () => void
  onSubmit: (text: string, goalAreaId?: GoalAreaId) => void
}) {
  const [text, setText] = useState('')
  const [selectedGoalArea, setSelectedGoalArea] = useState<GoalAreaId | null>(null)

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text.trim(), selectedGoalArea || undefined)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-neutral-100">Log a Win</h2>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              What did you accomplish?
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="I did something awesome..."
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500/50 resize-none"
              rows={3}
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Goal area (optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {goalAreas.map((ga) => {
                const colors = goalColors[ga.color]
                const isSelected = selectedGoalArea === ga.id
                return (
                  <button
                    key={ga.id}
                    onClick={() => setSelectedGoalArea(isSelected ? null : ga.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      isSelected
                        ? `${colors.bg} ${colors.text} ${colors.border} border`
                        : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                    }`}
                  >
                    {goalIcons[ga.icon]}
                    {ga.name}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!text.trim()}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-neutral-700 disabled:text-neutral-500 text-neutral-950 font-semibold transition-colors"
          >
            <Check className="w-4 h-4" />
            Log Win
          </button>
        </div>
      </div>
    </div>
  )
}

export function GoalsAndWins({
  weeklyStreak,
  wins,
  goalAreas,
  milestones,
  stats,
  weeklyFocus,
  onLogWin,
  onToggleFavorite,
  onViewGoalArea,
}: GoalsAndWinsProps) {
  const [showLogWin, setShowLogWin] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const focusedGoalAreas = goalAreas.filter((ga) => weeklyFocus.includes(ga.id))
  const otherGoalAreas = goalAreas.filter((ga) => !weeklyFocus.includes(ga.id))

  const filteredWins = searchQuery
    ? wins.filter((w) => w.text.toLowerCase().includes(searchQuery.toLowerCase()))
    : wins

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-neutral-100 mb-1">Goals & Wins</h1>
          <p className="text-neutral-400">Progress, not perfection.</p>
        </div>

        {/* Streak Section */}
        <div className="mb-8 p-6 bg-neutral-900/50 border border-neutral-800 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-amber-400">
                <Flame className="w-5 h-5" />
                <span className="text-xl font-bold">{stats.currentStreak}</span>
              </div>
              <span className="text-neutral-400 text-sm">day streak</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Star className="w-4 h-4 text-amber-400" />
              <span className="text-neutral-300">{stats.graceDaysRemaining}</span>
              <span className="text-neutral-500">grace days left</span>
            </div>
          </div>

          <div className="flex justify-between">
            {weeklyStreak.days.map((day) => (
              <StreakPill key={day.date} day={day} />
            ))}
          </div>
        </div>

        {/* Log Win Button */}
        <button
          onClick={() => setShowLogWin(true)}
          className="w-full mb-8 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-lg transition-colors shadow-lg shadow-amber-500/20"
        >
          <Plus className="w-5 h-5" />
          Log a Win
        </button>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl text-center">
            <p className="text-2xl font-bold text-neutral-100">{stats.totalWins}</p>
            <p className="text-xs text-neutral-500">Total Wins</p>
          </div>
          <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl text-center">
            <p className="text-2xl font-bold text-neutral-100">{stats.thisWeekWins}</p>
            <p className="text-xs text-neutral-500">This Week</p>
          </div>
          <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl text-center">
            <p className="text-2xl font-bold text-neutral-100">{stats.longestStreak}</p>
            <p className="text-xs text-neutral-500">Best Streak</p>
          </div>
        </div>

        {/* Weekly Focus */}
        {focusedGoalAreas.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-neutral-200 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Weekly Focus
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {focusedGoalAreas.map((ga) => (
                <GoalAreaCard
                  key={ga.id}
                  goalArea={ga}
                  isActive={true}
                  onView={() => onViewGoalArea?.(ga.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Goal Areas */}
        {otherGoalAreas.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-neutral-200 mb-4">All Goal Areas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {otherGoalAreas.map((ga) => (
                <GoalAreaCard
                  key={ga.id}
                  goalArea={ga}
                  isActive={false}
                  onView={() => onViewGoalArea?.(ga.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Milestones */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-neutral-200 mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            Milestones
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {milestones.map((m) => (
              <MilestoneBadge key={m.id} milestone={m} />
            ))}
          </div>
        </div>

        {/* Wins Vault */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-neutral-200">Wins Vault</h2>
            <span className="text-sm text-neutral-500">{wins.length} wins</span>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your wins..."
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-700"
            />
          </div>

          {/* Wins List */}
          <div className="space-y-3">
            {filteredWins.map((win) => (
              <WinCard
                key={win.id}
                win={win}
                goalArea={goalAreas.find((ga) => ga.id === win.goalAreaId)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Log Win Modal */}
      {showLogWin && (
        <LogWinModal
          goalAreas={goalAreas}
          onClose={() => setShowLogWin(false)}
          onSubmit={(text, goalAreaId) => onLogWin?.(text, goalAreaId)}
        />
      )}
    </div>
  )
}

export default GoalsAndWins
