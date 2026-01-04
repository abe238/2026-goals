'use client'

import { useState } from 'react'
import {
  Calendar,
  Users,
  Lightbulb,
  CheckSquare,
  Plus,
  Clock,
  MapPin,
  Repeat,
  Star,
  AlertCircle,
  Check,
  ExternalLink,
  Heart,
} from 'lucide-react'
import type {
  LifeDomainsProps,
  DomainTab,
  Event,
  Person,
  Idea,
  Chore,
  UrgencyLevel,
} from '../../../../product/sections/life-domains/types'

// =============================================================================
// Sub-Components
// =============================================================================

const tabConfig: Record<DomainTab, { icon: typeof Calendar; label: string }> = {
  events: { icon: Calendar, label: 'Events' },
  people: { icon: Users, label: 'People' },
  ideas: { icon: Lightbulb, label: 'Ideas' },
  chores: { icon: CheckSquare, label: 'Chores' },
}

function TabNav({
  activeTab,
  onTabChange,
  stats,
}: {
  activeTab: DomainTab
  onTabChange: (tab: DomainTab) => void
  stats: { eventsToday: number; peopleNeedingConnection: number; ideasCount: number; choresOverdue: number }
}) {
  const tabs: DomainTab[] = ['events', 'people', 'ideas', 'chores']

  const getBadge = (tab: DomainTab) => {
    switch (tab) {
      case 'events':
        return stats.eventsToday > 0 ? stats.eventsToday : null
      case 'people':
        return stats.peopleNeedingConnection > 0 ? stats.peopleNeedingConnection : null
      case 'chores':
        return stats.choresOverdue > 0 ? stats.choresOverdue : null
      default:
        return null
    }
  }

  return (
    <div className="flex bg-neutral-900 rounded-2xl p-1 border border-neutral-800">
      {tabs.map((tab) => {
        const config = tabConfig[tab]
        const Icon = config.icon
        const badge = getBadge(tab)
        const isActive = activeTab === tab

        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-sm font-medium transition-all relative ${
              isActive
                ? 'bg-amber-500/20 text-amber-400'
                : 'text-neutral-400 hover:text-neutral-300'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{config.label}</span>
            {badge && (
              <span
                className={`absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center ${
                  tab === 'chores' ? 'bg-red-500 text-white' : 'bg-amber-500 text-black'
                }`}
              >
                {badge}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

function EventCard({ event, onClick }: { event: Event; onClick?: () => void }) {
  const categoryColors: Record<string, string> = {
    work: 'bg-blue-500/20 text-blue-400',
    personal: 'bg-purple-500/20 text-purple-400',
    family: 'bg-orange-500/20 text-orange-400',
  }

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-neutral-900 rounded-xl p-4 border border-neutral-800 hover:border-neutral-700 transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-white font-medium mb-1">{event.title}</p>
          <div className="flex items-center gap-3 text-sm text-neutral-400">
            {event.time && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {event.time}
              </span>
            )}
            {event.isAllDay && <span>All day</span>}
            {event.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {event.location}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {event.isRecurring && <Repeat className="w-4 h-4 text-neutral-500" />}
          {event.category && (
            <span className={`text-xs px-2 py-1 rounded-full ${categoryColors[event.category] || 'bg-neutral-800 text-neutral-400'}`}>
              {event.category}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}

function PersonCard({
  person,
  onClick: _onClick,
  onLogConnection,
}: {
  person: Person
  onClick?: () => void
  onLogConnection?: () => void
}) {
  const healthColors = {
    strong: 'border-emerald-500 bg-emerald-500/10',
    good: 'border-blue-500 bg-blue-500/10',
    'needs-attention': 'border-amber-500 bg-amber-500/10',
    overdue: 'border-red-500 bg-red-500/10 animate-pulse',
  }

  const healthLabels = {
    strong: 'Connected recently',
    good: 'Good',
    'needs-attention': 'Needs attention',
    overdue: 'Overdue',
  }

  return (
    <div className="bg-neutral-900 rounded-xl p-4 border border-neutral-800">
      <div className="flex items-center gap-3">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium border-2 ${healthColors[person.connectionHealth]}`}
        >
          {person.avatarInitials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-medium">{person.name}</p>
          <p className="text-neutral-500 text-sm">{person.relationship}</p>
        </div>
        <button
          onClick={onLogConnection}
          className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-all"
        >
          <Heart className="w-4 h-4 text-neutral-400" />
        </button>
      </div>
      {(person.nextAction || person.notes) && (
        <div className="mt-3 pt-3 border-t border-neutral-800">
          {person.nextAction && (
            <p className="text-amber-400 text-sm mb-1">{person.nextAction}</p>
          )}
          {person.notes && <p className="text-neutral-400 text-xs">{person.notes}</p>}
        </div>
      )}
      <div className="flex items-center justify-between mt-3">
        <span
          className={`text-xs ${
            person.connectionHealth === 'overdue'
              ? 'text-red-400'
              : person.connectionHealth === 'needs-attention'
              ? 'text-amber-400'
              : 'text-neutral-500'
          }`}
        >
          {healthLabels[person.connectionHealth]}
        </span>
        {person.lastConnected && (
          <span className="text-xs text-neutral-500">
            Last: {new Date(person.lastConnected).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        )}
      </div>
    </div>
  )
}

function IdeaCard({
  idea,
  onToggleFavorite,
  onClick,
}: {
  idea: Idea
  onToggleFavorite?: () => void
  onClick?: () => void
}) {
  const categoryColors: Record<string, string> = {
    tech: 'bg-cyan-500/20 text-cyan-400',
    project: 'bg-purple-500/20 text-purple-400',
    explore: 'bg-emerald-500/20 text-emerald-400',
    someday: 'bg-neutral-700/50 text-neutral-400',
    learn: 'bg-amber-500/20 text-amber-400',
  }

  return (
    <div className="bg-neutral-900 rounded-xl p-4 border border-neutral-800 hover:border-neutral-700 transition-all">
      <div className="flex items-start justify-between mb-2">
        <button onClick={onClick} className="flex-1 text-left">
          <p className="text-white font-medium">{idea.title}</p>
        </button>
        <button
          onClick={onToggleFavorite}
          className="p-1 hover:bg-neutral-800 rounded transition-all"
        >
          <Star
            className={`w-4 h-4 ${
              idea.isFavorite ? 'text-amber-500 fill-amber-500' : 'text-neutral-600'
            }`}
          />
        </button>
      </div>
      {idea.description && (
        <p className="text-neutral-400 text-sm mb-3">{idea.description}</p>
      )}
      <div className="flex items-center justify-between">
        <span className={`text-xs px-2 py-1 rounded-full ${categoryColors[idea.category]}`}>
          {idea.category}
        </span>
        <div className="flex items-center gap-2">
          {idea.link && <ExternalLink className="w-3 h-3 text-neutral-500" />}
          <span className="text-xs text-neutral-500">
            {new Date(idea.capturedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>
    </div>
  )
}

function ChoreCard({
  chore,
  onComplete,
  onSnooze: _onSnooze,
}: {
  chore: Chore
  onComplete?: () => void
  onSnooze?: () => void
}) {
  const urgencyConfig: Record<UrgencyLevel, { barColor: string; textColor: string; glow: string }> = {
    relaxed: { barColor: 'bg-emerald-500', textColor: 'text-emerald-400', glow: '' },
    upcoming: { barColor: 'bg-emerald-400', textColor: 'text-emerald-400', glow: '' },
    soon: { barColor: 'bg-amber-500', textColor: 'text-amber-400', glow: '' },
    urgent: { barColor: 'bg-red-500 animate-pulse', textColor: 'text-red-400', glow: 'ring-1 ring-red-500/50' },
    overdue: { barColor: 'bg-red-600 animate-pulse', textColor: 'text-red-400', glow: 'ring-2 ring-red-500/50 shadow-lg shadow-red-500/20' },
  }

  const config = urgencyConfig[chore.urgency]
  const barWidth = 100 - chore.percentageRemaining

  const formatDueDate = () => {
    const due = new Date(chore.dueDate)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (due.toDateString() === today.toDateString()) {
      return chore.dueTime ? `Today ${chore.dueTime}` : 'Today'
    }
    if (due.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow'
    }
    if (chore.urgency === 'overdue') {
      return 'Overdue'
    }
    return due.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div
      className={`bg-neutral-900 rounded-xl p-4 border border-neutral-800 transition-all ${config.glow}`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={onComplete}
          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
            chore.isCompleted
              ? 'bg-emerald-500 border-emerald-500'
              : `border-neutral-600 hover:border-amber-500 ${chore.urgency === 'overdue' ? 'border-red-500' : ''}`
          }`}
        >
          {chore.isCompleted && <Check className="w-4 h-4 text-white" />}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <p className={`font-medium ${chore.isCompleted ? 'text-neutral-500 line-through' : 'text-white'}`}>
              {chore.title}
            </p>
            <div className="flex items-center gap-2">
              {chore.isRecurring && <Repeat className="w-3 h-3 text-neutral-500" />}
              <span className={`text-sm ${config.textColor}`}>{formatDueDate()}</span>
            </div>
          </div>

          {/* Countdown bar */}
          <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className={`h-full ${config.barColor} rounded-full transition-all duration-500`}
              style={{ width: `${barWidth}%` }}
            />
          </div>

          {chore.urgency === 'overdue' && (
            <div className="flex items-center gap-1 mt-2">
              <AlertCircle className="w-3 h-3 text-red-400" />
              <span className="text-xs text-red-400">This needs attention</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// Tab Content Components
// =============================================================================

function EventsTab({
  events,
  today,
  onViewEvent,
  onAddEvent,
}: {
  events: Event[]
  today: string
  onViewEvent?: (id: string) => void
  onAddEvent?: () => void
}) {
  const todayEvents = events.filter((e) => e.date === today)
  const upcomingEvents = events.filter((e) => e.date > today).slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-white">Today</h2>
        <button
          onClick={onAddEvent}
          className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-all"
        >
          <Plus className="w-4 h-4 text-neutral-400" />
        </button>
      </div>

      {todayEvents.length > 0 ? (
        <div className="space-y-2">
          {todayEvents.map((event) => (
            <EventCard key={event.id} event={event} onClick={() => onViewEvent?.(event.id)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-neutral-500">
          <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>Nothing scheduled for today</p>
        </div>
      )}

      {upcomingEvents.length > 0 && (
        <>
          <h2 className="text-lg font-medium text-white">Coming Up</h2>
          <div className="space-y-2">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} onClick={() => onViewEvent?.(event.id)} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function PeopleTab({
  people,
  onViewPerson,
  onLogConnection,
  onAddPerson,
}: {
  people: Person[]
  onViewPerson?: (id: string) => void
  onLogConnection?: (id: string) => void
  onAddPerson?: () => void
}) {
  const needsAttention = people.filter(
    (p) => p.connectionHealth === 'needs-attention' || p.connectionHealth === 'overdue'
  )
  const connected = people.filter(
    (p) => p.connectionHealth === 'strong' || p.connectionHealth === 'good'
  )

  return (
    <div className="space-y-6">
      {needsAttention.length > 0 && (
        <>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-medium text-white">Needs Connection</h2>
          </div>
          <div className="space-y-3">
            {needsAttention.map((person) => (
              <PersonCard
                key={person.id}
                person={person}
                onClick={() => onViewPerson?.(person.id)}
                onLogConnection={() => onLogConnection?.(person.id)}
              />
            ))}
          </div>
        </>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-white">All People</h2>
        <button
          onClick={onAddPerson}
          className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-all"
        >
          <Plus className="w-4 h-4 text-neutral-400" />
        </button>
      </div>

      <div className="space-y-3">
        {connected.map((person) => (
          <PersonCard
            key={person.id}
            person={person}
            onClick={() => onViewPerson?.(person.id)}
            onLogConnection={() => onLogConnection?.(person.id)}
          />
        ))}
      </div>
    </div>
  )
}

function IdeasTab({
  ideas,
  onViewIdea,
  onAddIdea,
  onToggleFavorite,
}: {
  ideas: Idea[]
  onViewIdea?: (id: string) => void
  onAddIdea?: () => void
  onToggleFavorite?: (id: string) => void
}) {
  const favorites = ideas.filter((i) => i.isFavorite)
  const others = ideas.filter((i) => !i.isFavorite)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-white">Ideas Vault</h2>
        <button
          onClick={onAddIdea}
          className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-all"
        >
          <Plus className="w-4 h-4 text-neutral-400" />
        </button>
      </div>

      {favorites.length > 0 && (
        <>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500" />
            <span className="text-sm text-neutral-400">Favorites</span>
          </div>
          <div className="grid gap-3">
            {favorites.map((idea) => (
              <IdeaCard
                key={idea.id}
                idea={idea}
                onClick={() => onViewIdea?.(idea.id)}
                onToggleFavorite={() => onToggleFavorite?.(idea.id)}
              />
            ))}
          </div>
        </>
      )}

      <div className="grid gap-3">
        {others.map((idea) => (
          <IdeaCard
            key={idea.id}
            idea={idea}
            onClick={() => onViewIdea?.(idea.id)}
            onToggleFavorite={() => onToggleFavorite?.(idea.id)}
          />
        ))}
      </div>
    </div>
  )
}

function ChoresTab({
  chores,
  onCompleteChore,
  onAddChore,
  onSnoozeChore,
}: {
  chores: Chore[]
  onCompleteChore?: (id: string) => void
  onAddChore?: () => void
  onSnoozeChore?: (id: string) => void
}) {
  const overdue = chores.filter((c) => c.urgency === 'overdue' && !c.isCompleted)
  const urgent = chores.filter((c) => c.urgency === 'urgent' && !c.isCompleted)
  const soon = chores.filter((c) => c.urgency === 'soon' && !c.isCompleted)
  const upcoming = chores.filter((c) => (c.urgency === 'upcoming' || c.urgency === 'relaxed') && !c.isCompleted)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-white">Chores & Non-Negotiables</h2>
        <button
          onClick={onAddChore}
          className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-all"
        >
          <Plus className="w-4 h-4 text-neutral-400" />
        </button>
      </div>

      {overdue.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <span className="text-sm text-red-400 font-medium">Overdue</span>
          </div>
          {overdue.map((chore) => (
            <ChoreCard
              key={chore.id}
              chore={chore}
              onComplete={() => onCompleteChore?.(chore.id)}
              onSnooze={() => onSnoozeChore?.(chore.id)}
            />
          ))}
        </div>
      )}

      {urgent.length > 0 && (
        <div className="space-y-2">
          <span className="text-sm text-red-400">Urgent</span>
          {urgent.map((chore) => (
            <ChoreCard
              key={chore.id}
              chore={chore}
              onComplete={() => onCompleteChore?.(chore.id)}
              onSnooze={() => onSnoozeChore?.(chore.id)}
            />
          ))}
        </div>
      )}

      {soon.length > 0 && (
        <div className="space-y-2">
          <span className="text-sm text-amber-400">Due Soon</span>
          {soon.map((chore) => (
            <ChoreCard
              key={chore.id}
              chore={chore}
              onComplete={() => onCompleteChore?.(chore.id)}
              onSnooze={() => onSnoozeChore?.(chore.id)}
            />
          ))}
        </div>
      )}

      {upcoming.length > 0 && (
        <div className="space-y-2">
          <span className="text-sm text-neutral-400">Coming Up</span>
          {upcoming.map((chore) => (
            <ChoreCard
              key={chore.id}
              chore={chore}
              onComplete={() => onCompleteChore?.(chore.id)}
              onSnooze={() => onSnoozeChore?.(chore.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// =============================================================================
// Main Component
// =============================================================================

export function LifeDomains({
  activeTab: initialActiveTab,
  today,
  currentTimeOfDay: _currentTimeOfDay,
  events,
  people,
  ideas,
  chores,
  stats,
  onTabChange,
  onViewEvent,
  onAddEvent,
  onViewPerson,
  onLogConnection,
  onAddPerson,
  onViewIdea,
  onAddIdea,
  onToggleIdeaFavorite,
  onCompleteChore,
  onAddChore,
  onSnoozeChore,
}: LifeDomainsProps) {
  const [activeTab, setActiveTab] = useState<DomainTab>(initialActiveTab)

  const handleTabChange = (tab: DomainTab) => {
    setActiveTab(tab)
    onTabChange?.(tab)
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 pb-24">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-white mb-2">Life Domains</h1>
          <p className="text-neutral-400">All the stuff of life, in one place.</p>
        </div>

        {/* Tab Navigation */}
        <TabNav
          activeTab={activeTab}
          onTabChange={handleTabChange}
          stats={{
            eventsToday: stats.eventsToday,
            peopleNeedingConnection: stats.peopleNeedingConnection,
            ideasCount: stats.ideasCount,
            choresOverdue: stats.choresOverdue,
          }}
        />

        {/* Tab Content */}
        {activeTab === 'events' && (
          <EventsTab
            events={events}
            today={today}
            onViewEvent={onViewEvent}
            onAddEvent={onAddEvent}
          />
        )}

        {activeTab === 'people' && (
          <PeopleTab
            people={people}
            onViewPerson={onViewPerson}
            onLogConnection={onLogConnection}
            onAddPerson={onAddPerson}
          />
        )}

        {activeTab === 'ideas' && (
          <IdeasTab
            ideas={ideas}
            onViewIdea={onViewIdea}
            onAddIdea={() => onAddIdea?.('', 'project')}
            onToggleFavorite={onToggleIdeaFavorite}
          />
        )}

        {activeTab === 'chores' && (
          <ChoresTab
            chores={chores}
            onCompleteChore={onCompleteChore}
            onAddChore={onAddChore}
            onSnoozeChore={onSnoozeChore}
          />
        )}
      </div>
    </div>
  )
}
