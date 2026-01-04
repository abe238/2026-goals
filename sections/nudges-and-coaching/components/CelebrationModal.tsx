import type { CelebrationModalProps } from '../types'

export function CelebrationModal({ celebration, onClose, onViewWin, onShare }: CelebrationModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md animate-in zoom-in-95 fade-in duration-300">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 p-1 shadow-2xl">
          <div className="rounded-[22px] bg-white dark:bg-neutral-900 p-8 text-center">
            <div className="mb-6 text-7xl animate-bounce">
              \ud83c\udf89
            </div>

            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 dark:bg-amber-900/50">
              <span className="text-xs font-medium uppercase tracking-wide text-amber-700 dark:text-amber-300">
                {celebration.goalArea}
              </span>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-neutral-900 dark:text-white">
              {celebration.winTitle}
            </h2>

            <p className="mb-8 text-lg italic text-neutral-600 dark:text-neutral-300 leading-relaxed">
              &ldquo;{celebration.encouragement}&rdquo;
            </p>

            <div className="absolute -top-2 -left-2 h-8 w-8 animate-ping text-2xl opacity-75">\u2728</div>
            <div className="absolute -top-1 -right-3 h-6 w-6 animate-ping text-xl opacity-75 animation-delay-100">\u2b50</div>
            <div className="absolute -bottom-2 left-1/4 h-6 w-6 animate-ping text-xl opacity-75 animation-delay-200">\ud83c\udf1f</div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => onViewWin?.(celebration.winId)}
                className="w-full rounded-xl bg-amber-500 px-6 py-3 font-medium text-white transition-all hover:bg-amber-600 hover:shadow-lg active:scale-[0.98]"
              >
                View in Wins Vault
              </button>

              <div className="flex gap-3">
                <button
                  onClick={() => onShare?.(celebration.id)}
                  className="flex-1 rounded-xl bg-neutral-100 px-4 py-3 font-medium text-neutral-700 transition-colors hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
                >
                  Share
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 rounded-xl bg-neutral-100 px-4 py-3 font-medium text-neutral-700 transition-colors hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
