import type { Celebration } from '../types'

interface CelebrationCardProps {
  celebration: Celebration
  onView?: () => void
}

export function CelebrationCard({ celebration, onView }: CelebrationCardProps) {
  const formattedDate = new Date(celebration.celebratedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })

  return (
    <button
      onClick={onView}
      className="group w-full text-left rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 p-4 transition-all duration-200 hover:from-amber-100 hover:to-yellow-100 hover:shadow-md dark:from-amber-950/30 dark:to-yellow-950/20 dark:hover:from-amber-950/50 dark:hover:to-yellow-950/40"
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-2xl">\ud83c\udf89</span>
        <span className="text-xs text-neutral-400 dark:text-neutral-500">{formattedDate}</span>
      </div>

      <h4 className="mb-1 font-medium text-neutral-800 dark:text-neutral-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
        {celebration.winTitle}
      </h4>

      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        {celebration.goalArea}
      </p>
    </button>
  )
}
