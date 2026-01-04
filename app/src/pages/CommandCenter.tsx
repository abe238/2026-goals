import { Sun, Moon, Sparkles } from 'lucide-react'

export function CommandCenter() {
  const hour = new Date().getHours()
  const isEvening = hour >= 17 || hour < 5
  const greeting = isEvening ? 'Good evening' : hour < 12 ? 'Good morning' : 'Good afternoon'

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Greeting */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          {isEvening ? (
            <Moon className="w-8 h-8 text-yellow-400" />
          ) : (
            <Sun className="w-8 h-8 text-yellow-400" />
          )}
          <h1 className="text-3xl font-bold text-neutral-100">{greeting}</h1>
        </div>
        <p className="text-neutral-400">What's on your mind today?</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-yellow-400/50 hover:bg-neutral-800/50 transition-all text-left group">
          <Sparkles className="w-6 h-6 text-yellow-400 mb-2 group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold text-neutral-100">Log a Win</h3>
          <p className="text-sm text-neutral-500">Celebrate your progress</p>
        </button>
        <button className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-yellow-400/50 hover:bg-neutral-800/50 transition-all text-left group">
          <div className="w-6 h-6 bg-green-500 rounded-full mb-2 group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold text-neutral-100">Add Chore</h3>
          <p className="text-sm text-neutral-500">Track what needs doing</p>
        </button>
        <button className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-yellow-400/50 hover:bg-neutral-800/50 transition-all text-left group">
          <div className="w-6 h-6 bg-amber-500 rounded-full mb-2 group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold text-neutral-100">Add Event</h3>
          <p className="text-sm text-neutral-500">Something coming up?</p>
        </button>
      </div>

      {/* Placeholder sections */}
      <div className="space-y-6">
        <section className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-xl">
          <h2 className="text-lg font-semibold text-neutral-200 mb-4">Today's Focus</h2>
          <p className="text-neutral-500 italic">No focus set yet. Use voice capture or check-in to set one.</p>
        </section>

        <section className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-xl">
          <h2 className="text-lg font-semibold text-neutral-200 mb-4">Recent Wins</h2>
          <p className="text-neutral-500 italic">No wins logged yet. You're doing great—start capturing!</p>
        </section>

        <section className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-xl">
          <h2 className="text-lg font-semibold text-neutral-200 mb-4">Upcoming</h2>
          <p className="text-neutral-500 italic">No events or chores coming up. Enjoy the moment!</p>
        </section>
      </div>
    </div>
  )
}
