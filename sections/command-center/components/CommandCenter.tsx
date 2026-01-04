'use client'

import { useState } from 'react'
import {
  Mic,
  Sun,
  Moon,
  Sparkles,
  ChevronRight,
  Check,
  Calendar,
  ClipboardList,
  Lightbulb,
  Flame,
  Trophy,
  Clock,
  AlertCircle,
} from 'lucide-react'
import type { CommandCenterProps, GoalArea, Streak, UrgencyColor } from '../../../../product/sections/command-center/types'

const urgencyStyles: Record<UrgencyColor, string> = {
  red: 'bg-red-500/20 border-red-500/40 text-red-400',
  amber: 'bg-amber-500/20 border-amber-500/40 text-amber-400',
  green: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400',
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

function getGoalColor(color: string): string {
  return goalColors[color] || 'bg-neutral-500'
}

function StreakRing({ streak, goalArea }: { streak: Streak; goalArea: GoalArea | undefined }) {
  const progress = streak.weeklyTarget > 0 ? (streak.currentWeekCount / streak.weeklyTarget) * 100 : 0
  const circumference = 2 * Math.PI * 18
  const strokeDashoffset = circumference - (progress / 100) * circumference
  const color = goalArea?.color || 'neutral'

  return (
    <div className="relative w-12 h-12 flex-shrink-0">
      <svg className="w-12 h-12 -rotate-90" viewBox="0 0 44 44">
        <circle
          cx="22"
          cy="22"
          r="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="text-neutral-800"
        />
        <circle
          cx="22"
          cy="22"
          r="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={`${color === 'green' ? 'text-emerald-500' : color === 'purple' ? 'text-purple-500' : color === 'orange' ? 'text-orange-500' : color === 'pink' ? 'text-pink-500' : color === 'blue' ? 'text-blue-500' : color === 'indigo' ? 'text-indigo-500' : color === 'amber' ? 'text-amber-500' : 'text-neutral-500'} transition-all duration-500`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-neutral-200">
          {streak.currentWeekCount}/{streak.weeklyTarget}
        </span>
      </div>
    </div>
  )
}

export function CommandCenter({
  timeContext,
  welcomeBackState,
  todaysFocus,
  goalAreas,
  streaks,
  wins,
  events,
  chores,
  priorityItem,
  quickAddOptions,
  onVoiceCapture,
  onStartCheckIn,
  onQuickAdd,
  onCompleteChore,
  onCompleteEvent,
  onNavigateToGoal,
  onViewAllStreaks,
  onViewAllWins,
  onViewAllEvents,
  onViewAllChores,
  onWelcomeBackSubmit,
  onWelcomeBackDismiss,
}: CommandCenterProps) {
  const [welcomeBackNotes, setWelcomeBackNotes] = useState('')
  const [welcomeBackFocus, setWelcomeBackFocus] = useState('')
  const isMorning = timeContext.current === 'morning'
  const isEvening = timeContext.current === 'evening'

  const upcomingEvents = events.slice(0, 3)
  const urgentChores = chores.filter(c => !c.isComplete).slice(0, 3)
  const recentWins = wins.slice(0, 3)
  const activeStreaks = streaks.filter(s => s.status !== 'paused').slice(0, 4)

  if (welcomeBackState.isWelcomeBack) {
    return (
      <div className="min-h-screen bg-neutral-950 p-6 lg:p-8">
        <div className="max-w-lg mx-auto pt-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/20 mb-6">
              <Sparkles className="w-8 h-8 text-amber-400" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-neutral-100 mb-2">
              Welcome back
            </h1>
            <p className="text-neutral-400">
              {welcomeBackState.daysAway === 1
                ? "It's been a day. No worries at all."
                : `It's been ${welcomeBackState.daysAway} days. Life happens.`}
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Anything notable happen while you were away?
              </label>
              <textarea
                value={welcomeBackNotes}
                onChange={(e) => setWelcomeBackNotes(e.target.value)}
                placeholder="Optional — just checking in..."
                className="w-full h-24 px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                What's your focus for today?
              </label>
              <input
                type="text"
                value={welcomeBackFocus}
                onChange={(e) => setWelcomeBackFocus(e.target.value)}
                placeholder="One thing to be present for..."
                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={onWelcomeBackDismiss}
                className="flex-1 px-4 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-medium transition-colors"
              >
                Skip for now
              </button>
              <button
                onClick={() => onWelcomeBackSubmit?.(welcomeBackNotes, welcomeBackFocus)}
                className="flex-1 px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold transition-colors"
              >
                Let's go
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="p-6 lg:p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-neutral-500 text-sm mb-1">
            {isMorning ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span>{timeContext.dayOfWeek}</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-neutral-100">
            {timeContext.greeting}
          </h1>
        </div>

        {/* Priority Item - Large Card */}
        {priorityItem && (
          <div className={`mb-8 p-6 rounded-2xl border ${urgencyStyles[priorityItem.urgency === 'high' ? 'red' : priorityItem.urgency === 'medium' ? 'amber' : 'green']}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-xs font-medium uppercase tracking-wide">
                    {priorityItem.reason}
                  </span>
                </div>
                <h2 className="text-xl lg:text-2xl font-bold text-neutral-100 mb-1">
                  {priorityItem.title}
                </h2>
                <p className="text-sm text-neutral-400 capitalize">
                  {priorityItem.type}
                </p>
              </div>
              {priorityItem.type === 'chore' && (
                <button
                  onClick={() => onCompleteChore?.(priorityItem.id)}
                  className="flex items-center justify-center w-12 h-12 rounded-xl bg-neutral-800/50 hover:bg-neutral-700/50 border border-neutral-700 text-neutral-300 hover:text-white transition-all"
                >
                  <Check className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Today's Focus */}
        {todaysFocus && (
          <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-yellow-500/5 border border-amber-500/20">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-sm font-medium text-amber-400">Today's Focus</span>
            </div>
            <p className="text-lg lg:text-xl font-medium text-neutral-100">
              {todaysFocus.text}
            </p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={onVoiceCapture}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-sm transition-all shadow-lg shadow-amber-500/20"
          >
            <Mic className="w-4 h-4" />
            Voice Capture
          </button>
          <button
            onClick={() => onStartCheckIn?.(isMorning ? 'morning' : 'evening')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium text-sm transition-colors border border-neutral-700"
          >
            <Clock className="w-4 h-4" />
            {isMorning ? 'Morning' : 'Evening'} Check-in
          </button>
          {quickAddOptions.map((option) => (
            <button
              key={option.type}
              onClick={() => onQuickAdd?.(option.type)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-medium text-sm transition-colors border border-neutral-800"
            >
              {option.type === 'chore' && <ClipboardList className="w-4 h-4" />}
              {option.type === 'event' && <Calendar className="w-4 h-4" />}
              {option.type === 'idea' && <Lightbulb className="w-4 h-4" />}
              {option.label}
            </button>
          ))}
        </div>

        {/* Grid of Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Weekly Progress Card */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-medium text-neutral-400">Weekly Progress</h3>
              </div>
              <button
                onClick={onViewAllStreaks}
                className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                View all
              </button>
            </div>
            <div className="space-y-4">
              {activeStreaks.map((streak) => {
                const goalArea = goalAreas.find(g => g.id === streak.goalAreaId)
                return (
                  <button
                    key={streak.id}
                    onClick={() => goalArea && onNavigateToGoal?.(goalArea.id)}
                    className="w-full flex items-center gap-3 text-left group"
                  >
                    <StreakRing streak={streak} goalArea={goalArea} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-200 truncate group-hover:text-white transition-colors">
                        {goalArea?.name || 'Unknown'}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {streak.totalWeeks} week streak
                        {streak.graceDayUsed && ' • Grace day used'}
                      </p>
                    </div>
                    {streak.status === 'complete' && (
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Recent Wins Card */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <h3 className="text-sm font-medium text-neutral-400">Recent Wins</h3>
              </div>
              <button
                onClick={onViewAllWins}
                className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                View all
              </button>
            </div>
            <div className="space-y-3">
              {recentWins.map((win) => {
                const goalArea = goalAreas.find(g => g.id === win.goalAreaId)
                return (
                  <div key={win.id} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${getGoalColor(goalArea?.color || 'neutral')}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-neutral-200 leading-relaxed">
                        {win.text}
                      </p>
                      <p className="text-xs text-neutral-500 mt-1">
                        {goalArea?.name}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Upcoming Events Card */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                <h3 className="text-sm font-medium text-neutral-400">Coming Up</h3>
              </div>
              <button
                onClick={onViewAllEvents}
                className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                View all
              </button>
            </div>
            <div className="space-y-3">
              {upcomingEvents.map((event) => {
                const goalArea = event.goalAreaId ? goalAreas.find(g => g.id === event.goalAreaId) : null
                return (
                  <button
                    key={event.id}
                    onClick={() => onCompleteEvent?.(event.id)}
                    className="w-full flex items-center gap-3 text-left group"
                  >
                    <div className={`w-1 h-10 rounded-full flex-shrink-0 ${goalArea ? getGoalColor(goalArea.color) : 'bg-neutral-700'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-200 truncate group-hover:text-white transition-colors">
                        {event.title}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {event.isAllDay ? event.date : `${event.date} at ${event.time}`}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Chores Card */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-neutral-400" />
                <h3 className="text-sm font-medium text-neutral-400">Tasks</h3>
              </div>
              <button
                onClick={onViewAllChores}
                className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                View all
              </button>
            </div>
            <div className="space-y-2">
              {urgentChores.map((chore) => (
                <div
                  key={chore.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border ${urgencyStyles[chore.urgencyColor]}`}
                >
                  <button
                    onClick={() => onCompleteChore?.(chore.id)}
                    className="flex items-center justify-center w-5 h-5 rounded border border-current opacity-60 hover:opacity-100 transition-opacity"
                  >
                    {chore.isComplete && <Check className="w-3 h-3" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${chore.isComplete ? 'line-through opacity-50' : 'text-neutral-100'}`}>
                      {chore.title}
                    </p>
                  </div>
                  <span className="text-xs font-medium">
                    {chore.daysUntilDue === 0 ? 'Today' : chore.daysUntilDue === 1 ? 'Tomorrow' : `${chore.daysUntilDue}d`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Evening Reflection Prompt */}
        {isEvening && (
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-indigo-500/5 border border-purple-500/20">
            <div className="flex items-center gap-2 mb-3">
              <Moon className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-400">Evening Reflection</span>
            </div>
            <p className="text-neutral-300 mb-4">
              How was today? Ready to capture some wins and set tomorrow's focus?
            </p>
            <button
              onClick={() => onStartCheckIn?.('evening')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 font-medium text-sm transition-colors border border-purple-500/30"
            >
              Start Evening Check-in
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CommandCenter
