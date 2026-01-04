import type { NudgePreferences, DayOfWeek } from '../types'

interface NudgePreferencesPanelProps {
  preferences: NudgePreferences
  onUpdate?: (preferences: NudgePreferences) => void
}

const dayLabels: Record<DayOfWeek, string> = {
  monday: 'M',
  tuesday: 'T',
  wednesday: 'W',
  thursday: 'T',
  friday: 'F',
  saturday: 'S',
  sunday: 'S',
}

const allDays: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

function DayPicker({ days, onChange }: { days: DayOfWeek[]; onChange?: (days: DayOfWeek[]) => void }) {
  return (
    <div className="flex gap-1">
      {allDays.map((day, idx) => {
        const isActive = days.includes(day)
        return (
          <button
            key={day}
            onClick={() => {
              if (onChange) {
                onChange(isActive ? days.filter(d => d !== day) : [...days, day])
              }
            }}
            className={`
              h-8 w-8 rounded-full text-xs font-medium transition-all
              ${isActive
                ? 'bg-amber-500 text-white'
                : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700'
              }
            `}
            title={day.charAt(0).toUpperCase() + day.slice(1)}
          >
            {dayLabels[day]}
          </button>
        )
      })}
    </div>
  )
}

function ToggleSwitch({ enabled, onChange }: { enabled: boolean; onChange?: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`
        relative h-6 w-11 rounded-full transition-colors
        ${enabled ? 'bg-amber-500' : 'bg-neutral-300 dark:bg-neutral-600'}
      `}
    >
      <span
        className={`
          absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all
          ${enabled ? 'left-[22px]' : 'left-0.5'}
        `}
      />
    </button>
  )
}

export function NudgePreferencesPanel({ preferences, onUpdate }: NudgePreferencesPanelProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-neutral-800">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-neutral-800 dark:text-neutral-100">
              \u2600\ufe0f Morning Focus
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Start your day with intention
            </p>
          </div>
          <ToggleSwitch enabled={preferences.morningFocus.enabled} />
        </div>
        {preferences.morningFocus.enabled && (
          <div className="space-y-3 border-t border-neutral-100 pt-4 dark:border-neutral-700">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600 dark:text-neutral-300">Time</span>
              <input
                type="time"
                value={preferences.morningFocus.time}
                className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-sm dark:border-neutral-600 dark:bg-neutral-700"
                readOnly
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600 dark:text-neutral-300">Days</span>
              <DayPicker days={preferences.morningFocus.days} />
            </div>
          </div>
        )}
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-neutral-800">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-neutral-800 dark:text-neutral-100">
              \ud83c\udf19 Evening Reflection
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Capture wins before the day ends
            </p>
          </div>
          <ToggleSwitch enabled={preferences.eveningReflection.enabled} />
        </div>
        {preferences.eveningReflection.enabled && (
          <div className="space-y-3 border-t border-neutral-100 pt-4 dark:border-neutral-700">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600 dark:text-neutral-300">Time</span>
              <input
                type="time"
                value={preferences.eveningReflection.time}
                className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-sm dark:border-neutral-600 dark:bg-neutral-700"
                readOnly
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600 dark:text-neutral-300">Days</span>
              <DayPicker days={preferences.eveningReflection.days} />
            </div>
          </div>
        )}
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-neutral-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-neutral-800 dark:text-neutral-100">
              \ud83c\udf89 Wins Celebrations
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Celebrate when you log a win
            </p>
          </div>
          <ToggleSwitch enabled={preferences.winsCelebration.enabled} />
        </div>
        {preferences.winsCelebration.enabled && (
          <div className="mt-4 border-t border-neutral-100 pt-4 dark:border-neutral-700">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={preferences.winsCelebration.celebrateImmediately}
                className="h-4 w-4 rounded border-neutral-300 text-amber-500 focus:ring-amber-500"
                readOnly
              />
              <span className="text-sm text-neutral-600 dark:text-neutral-300">
                Celebrate immediately when logged
              </span>
            </label>
          </div>
        )}
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-neutral-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-neutral-800 dark:text-neutral-100">
              \ud83d\udc4b Welcome Back
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Gentle check-in after time away
            </p>
          </div>
          <ToggleSwitch enabled={preferences.welcomeBack.enabled} />
        </div>
        {preferences.welcomeBack.enabled && (
          <div className="mt-4 border-t border-neutral-100 pt-4 dark:border-neutral-700">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600 dark:text-neutral-300">After inactive for</span>
              <span className="rounded-lg bg-neutral-100 px-3 py-1.5 text-sm font-medium dark:bg-neutral-700">
                {preferences.welcomeBack.afterDaysInactive} days
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-neutral-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-neutral-800 dark:text-neutral-100">
              \ud83d\udd25 Streak Milestones
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Celebrate streak achievements
            </p>
          </div>
          <ToggleSwitch enabled={preferences.streakMilestones.enabled} />
        </div>
        {preferences.streakMilestones.enabled && (
          <div className="mt-4 border-t border-neutral-100 pt-4 dark:border-neutral-700">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600 dark:text-neutral-300">Celebrate at weeks</span>
              <div className="flex gap-1">
                {preferences.streakMilestones.milestones.map(week => (
                  <span
                    key={week}
                    className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/50 dark:text-amber-300"
                  >
                    {week}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
