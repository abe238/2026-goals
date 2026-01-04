import type { Nudge } from '../types'

const typeLabels: Record<string, string> = {
  'morning-focus': 'Morning',
  'evening-reflection': 'Evening',
  'wins-celebration': 'Celebration',
  'welcome-back': 'Welcome Back',
  'streak-milestone': 'Milestone',
}

const typeIcons: Record<string, string> = {
  'morning-focus': '\u2600\ufe0f',
  'evening-reflection': '\ud83c\udf19',
  'wins-celebration': '\ud83c\udf89',
  'welcome-back': '\ud83d\udc4b',
  'streak-milestone': '\ud83d\udd25',
}

interface NudgeCardProps {
  nudge: Nudge
  onView?: () => void
  onAction?: () => void
  onDismiss?: () => void
}

export function NudgeCard({ nudge, onView, onAction, onDismiss }: NudgeCardProps) {
  const formattedDate = new Date(nudge.sentAt).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })

  return (
    <div
      onClick={onView}
      className={`
        group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 cursor-pointer
        ${nudge.status === 'pending'
          ? 'bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/40 dark:to-yellow-950/30 ring-2 ring-amber-200 dark:ring-amber-800'
          : 'bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800'
        }
      `}
    >
      {nudge.status === 'pending' && (
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-2 py-0.5 text-xs font-medium text-white">
            New
          </span>
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className={`
          flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl
          ${nudge.status === 'pending'
            ? 'bg-amber-200 dark:bg-amber-800'
            : 'bg-neutral-200 dark:bg-neutral-700'
          }
        `}>
          {typeIcons[nudge.type] || '\ud83d\udce8'}
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className={`
              text-xs font-medium uppercase tracking-wide
              ${nudge.status === 'pending'
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-neutral-500 dark:text-neutral-400'
              }
            `}>
              {typeLabels[nudge.type] || nudge.type}
            </span>
            <span className="text-neutral-300 dark:text-neutral-600">&middot;</span>
            <span className="text-xs text-neutral-400 dark:text-neutral-500">
              {formattedDate}
            </span>
          </div>

          <p className={`
            text-base leading-relaxed
            ${nudge.status === 'pending'
              ? 'text-neutral-800 dark:text-neutral-100'
              : 'text-neutral-600 dark:text-neutral-300'
            }
          `}>
            {nudge.message}
          </p>

          {nudge.actionTaken && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-green-500 dark:text-green-400">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                {nudge.actionTaken}
              </span>
            </div>
          )}

          {nudge.status === 'seen' && !nudge.actionTaken && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-neutral-400 dark:text-neutral-500">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="text-sm text-neutral-400 dark:text-neutral-500">Seen</span>
            </div>
          )}
        </div>
      </div>

      {nudge.status === 'pending' && (
        <div className="mt-4 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onAction?.()
            }}
            className="flex-1 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-amber-600"
          >
            Take Action
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDismiss?.()
            }}
            className="rounded-xl bg-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600"
          >
            Later
          </button>
        </div>
      )}
    </div>
  )
}
