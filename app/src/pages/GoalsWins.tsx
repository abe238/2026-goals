import { Trophy, Flame, Star } from 'lucide-react'

const GOAL_AREAS = [
  { id: '1', name: 'Physical Health', icon: '💪', color: 'green', progress: 3, target: 5 },
  { id: '2', name: 'Mental Health', icon: '🧠', color: 'purple', progress: 4, target: 4 },
  { id: '3', name: 'Family (Ian)', icon: '👦', color: 'blue', progress: 2, target: 3 },
  { id: '4', name: 'Family (Wife)', icon: '❤️', color: 'pink', progress: 5, target: 5 },
  { id: '5', name: 'Work (Strategic)', icon: '🎯', color: 'amber', progress: 1, target: 3 },
  { id: '6', name: 'Work (Leadership)', icon: '👑', color: 'yellow', progress: 2, target: 2 },
  { id: '7', name: 'Content/Newsletter', icon: '✍️', color: 'cyan', progress: 0, target: 1 },
]

export function GoalsWins() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-100 mb-2">Goals & Wins</h1>
        <p className="text-neutral-400">Track progress without guilt. Celebrate every step.</p>
      </div>

      {/* Weekly Streak Overview */}
      <section className="mb-8 p-6 bg-neutral-900/50 border border-neutral-800 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-yellow-400" />
            <h2 className="text-lg font-semibold text-neutral-200">This Week</h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-400">
            <span>3 grace days left</span>
            <div className="flex gap-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-yellow-400/30" />
              ))}
            </div>
          </div>
        </div>

        {/* Week Days */}
        <div className="flex gap-2 justify-between">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
            <div key={day} className="flex flex-col items-center gap-2">
              <span className="text-xs text-neutral-500">{day}</span>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  i < 3 ? 'bg-yellow-400 text-neutral-950' : 'bg-neutral-800 text-neutral-500'
                }`}
              >
                {i < 3 && <Star className="w-4 h-4" />}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Goal Areas Grid */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-neutral-200 mb-4">Goal Areas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GOAL_AREAS.map((area) => (
            <div
              key={area.id}
              className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-neutral-700 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{area.icon}</span>
                <div>
                  <h3 className="font-semibold text-neutral-200">{area.name}</h3>
                  <p className="text-sm text-neutral-500">
                    {area.progress}/{area.target} this week
                  </p>
                </div>
              </div>
              <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 transition-all duration-500"
                  style={{ width: `${(area.progress / area.target) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Wins Vault */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <h2 className="text-lg font-semibold text-neutral-200">Wins Vault</h2>
          </div>
          <button className="text-sm text-yellow-400 hover:underline">View All</button>
        </div>
        <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-xl text-center">
          <p className="text-neutral-500 italic">
            Your wins will appear here. Start logging them!
          </p>
        </div>
      </section>
    </div>
  )
}
