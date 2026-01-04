import { useState } from 'react'
import type { NudgesAndCoachingProps } from '../types'
import { NudgeCard } from './NudgeCard'
import { CelebrationCard } from './CelebrationCard'
import { CelebrationModal } from './CelebrationModal'
import { NudgePreferencesPanel } from './NudgePreferencesPanel'

type Tab = 'nudges' | 'celebrations' | 'settings'

export function NudgesAndCoaching({
  nudges,
  celebrations,
  preferences,
  onNudgeView,
  onNudgeAction,
  onNudgeDismiss,
  onCelebrationView,
  onPreferencesUpdate,
}: NudgesAndCoachingProps) {
  const [activeTab, setActiveTab] = useState<Tab>('nudges')
  const [showCelebration, setShowCelebration] = useState<string | null>(null)

  const activeCelebration = celebrations.find(c => c.id === showCelebration)
  const pendingNudges = nudges.filter(n => n.status === 'pending')
  const pastNudges = nudges.filter(n => n.status !== 'pending')

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: 'nudges', label: 'Nudges', count: pendingNudges.length || undefined },
    { id: 'celebrations', label: 'Celebrations' },
    { id: 'settings', label: 'Settings' },
  ]

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-neutral-900 dark:text-white">
            Nudges & Coaching
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400">
            Gentle encouragement to keep you moving forward
          </p>
        </div>

        <div className="mb-6 flex justify-center">
          <div className="inline-flex rounded-xl bg-neutral-200/50 p-1 dark:bg-neutral-800">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative rounded-lg px-4 py-2 text-sm font-medium transition-all
                  ${activeTab === tab.id
                    ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-700 dark:text-white'
                    : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                  }
                `}
              >
                {tab.label}
                {tab.count && (
                  <span className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1.5 text-xs font-semibold text-white">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'nudges' && (
          <div className="space-y-6">
            {pendingNudges.length > 0 && (
              <div>
                <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-amber-600 dark:text-amber-400">
                  Needs Your Attention
                </h2>
                <div className="space-y-3">
                  {pendingNudges.map(nudge => (
                    <NudgeCard
                      key={nudge.id}
                      nudge={nudge}
                      onView={() => onNudgeView?.(nudge.id)}
                      onAction={() => onNudgeAction?.(nudge.id)}
                      onDismiss={() => onNudgeDismiss?.(nudge.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {pastNudges.length > 0 && (
              <div>
                <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                  Recent
                </h2>
                <div className="space-y-3">
                  {pastNudges.map(nudge => (
                    <NudgeCard
                      key={nudge.id}
                      nudge={nudge}
                      onView={() => onNudgeView?.(nudge.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {nudges.length === 0 && (
              <div className="rounded-2xl bg-white p-12 text-center dark:bg-neutral-900">
                <div className="mb-4 text-5xl">\ud83d\udcec</div>
                <h3 className="mb-2 text-lg font-medium text-neutral-800 dark:text-neutral-100">
                  No nudges yet
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400">
                  Check back soon — we&apos;ll send gentle reminders when the time is right.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'celebrations' && (
          <div>
            {celebrations.length > 0 ? (
              <>
                <p className="mb-4 text-center text-sm text-neutral-500 dark:text-neutral-400">
                  Every win counts. Here&apos;s proof you&apos;re making progress.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {celebrations.map(celebration => (
                    <CelebrationCard
                      key={celebration.id}
                      celebration={celebration}
                      onView={() => {
                        setShowCelebration(celebration.id)
                        onCelebrationView?.(celebration.id)
                      }}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="rounded-2xl bg-white p-12 text-center dark:bg-neutral-900">
                <div className="mb-4 text-5xl">\ud83c\udf1f</div>
                <h3 className="mb-2 text-lg font-medium text-neutral-800 dark:text-neutral-100">
                  Your celebrations will appear here
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400">
                  Log some wins and we&apos;ll celebrate them together.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <p className="mb-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
              Control how and when we reach out to you.
            </p>
            <NudgePreferencesPanel
              preferences={preferences}
              onUpdate={onPreferencesUpdate}
            />
          </div>
        )}
      </div>

      {activeCelebration && (
        <CelebrationModal
          celebration={activeCelebration}
          onClose={() => setShowCelebration(null)}
          onViewWin={(winId) => {
            console.log('View win:', winId)
            setShowCelebration(null)
          }}
          onShare={(id) => console.log('Share celebration:', id)}
        />
      )}
    </div>
  )
}
