import { Bell, MessageSquare, Settings } from 'lucide-react'

export function NudgesCoaching() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-100 mb-2">Nudges & Coaching</h1>
        <p className="text-neutral-400">Gentle reminders and celebrations. Never guilt-tripping.</p>
      </div>

      {/* Notification Preferences */}
      <section className="mb-8 p-6 bg-neutral-900/50 border border-neutral-800 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-yellow-400" />
            <h2 className="text-lg font-semibold text-neutral-200">Preferences</h2>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-neutral-200">Morning Focus</p>
              <p className="text-sm text-neutral-500">Daily nudge to set your focus</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-400">8:00 AM</span>
              <div className="w-10 h-6 bg-yellow-400 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-neutral-950 rounded-full" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-neutral-200">Evening Reflection</p>
              <p className="text-sm text-neutral-500">Prompt to celebrate wins</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-400">8:00 PM</span>
              <div className="w-10 h-6 bg-yellow-400 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-neutral-950 rounded-full" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-neutral-200">Urgent Only Mode</p>
              <p className="text-sm text-neutral-500">Only get nudged for critical items</p>
            </div>
            <div className="w-10 h-6 bg-neutral-700 rounded-full relative cursor-pointer">
              <div className="absolute left-1 top-1 w-4 h-4 bg-neutral-400 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Channels */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-neutral-200 mb-4">Notification Channels</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-5 h-5 text-green-400" />
              <span className="font-medium text-neutral-200">SMS (Urgent)</span>
            </div>
            <p className="text-sm text-neutral-500">For time-sensitive nudges</p>
          </div>
          <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="w-5 h-5 text-blue-400" />
              <span className="font-medium text-neutral-200">Slack/Telegram</span>
            </div>
            <p className="text-sm text-neutral-500">For daily nudges</p>
          </div>
        </div>
      </section>

      {/* Recent Nudges */}
      <section>
        <h2 className="text-lg font-semibold text-neutral-200 mb-4">Recent Nudges</h2>
        <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-xl text-center">
          <Bell className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
          <p className="text-neutral-500">No nudges yet. They'll appear here once you start getting them.</p>
        </div>
      </section>
    </div>
  )
}
