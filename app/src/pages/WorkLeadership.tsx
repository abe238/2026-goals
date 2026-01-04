import { Target, TrendingUp, Users } from 'lucide-react'

export function WorkLeadership() {
  const strategicPercent = 35

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-100 mb-2">Work & Leadership</h1>
        <p className="text-neutral-400">Balance strategic work with reactive. Build your leadership profile.</p>
      </div>

      {/* Strategic vs Reactive Gauge */}
      <section className="mb-8 p-6 bg-neutral-900/50 border border-neutral-800 rounded-xl">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-6 h-6 text-yellow-400" />
          <h2 className="text-lg font-semibold text-neutral-200">Strategic Balance</h2>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-neutral-400">Reactive</span>
            <span className={strategicPercent >= 40 ? 'text-green-400' : 'text-amber-400'}>
              {strategicPercent}% Strategic
            </span>
            <span className="text-neutral-400">Strategic</span>
          </div>
          <div className="h-4 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                strategicPercent >= 40 ? 'bg-green-500' : 'bg-amber-500'
              }`}
              style={{ width: `${strategicPercent}%` }}
            />
          </div>
        </div>

        <p className="text-sm text-neutral-500">
          {strategicPercent >= 40
            ? '✨ Great job! You\'re in the strategic zone.'
            : '💡 Try to shift more time to strategic work. Aim for 40%+'}
        </p>
      </section>

      {/* Quick Log Work */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-neutral-200 mb-4">Log Work</h2>
        <div className="grid grid-cols-2 gap-4">
          <button className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-yellow-400/50 transition-all text-left group">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-yellow-400" />
              <span className="font-semibold text-neutral-200">Strategic</span>
            </div>
            <p className="text-sm text-neutral-500">Planning, architecture, vision</p>
          </button>
          <button className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-neutral-600 transition-all text-left group">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-neutral-400" />
              <span className="font-semibold text-neutral-200">Reactive</span>
            </div>
            <p className="text-sm text-neutral-500">Bug fixes, meetings, emails</p>
          </button>
        </div>
      </section>

      {/* Team Health */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-6 h-6 text-yellow-400" />
          <h2 className="text-lg font-semibold text-neutral-200">Team Connection</h2>
        </div>
        <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-xl text-center">
          <p className="text-neutral-500 italic">
            Add team members to track 1:1 frequency and connection health.
          </p>
        </div>
      </section>

      {/* Leadership Evidence */}
      <section>
        <h2 className="text-lg font-semibold text-neutral-200 mb-4">Leadership Evidence</h2>
        <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-xl text-center">
          <p className="text-neutral-500 italic">
            Build your promotion case. Strategic wins and leadership moments will appear here.
          </p>
        </div>
      </section>
    </div>
  )
}
