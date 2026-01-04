import { User, Bell, Database, LogOut } from 'lucide-react'

export function Settings() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-100 mb-2">Settings</h1>
        <p className="text-neutral-400">Customize your Momentum experience.</p>
      </div>

      <div className="space-y-6">
        {/* Profile Section */}
        <section className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-5 h-5 text-yellow-400" />
            <h2 className="text-lg font-semibold text-neutral-200">Profile</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Name</label>
              <input
                type="text"
                defaultValue="Abe"
                className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-100 focus:border-yellow-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Email</label>
              <input
                type="email"
                defaultValue="abe@example.com"
                className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-100 focus:border-yellow-400 focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* Notifications Section */}
        <section className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-yellow-400" />
            <h2 className="text-lg font-semibold text-neutral-200">Notifications</h2>
          </div>
          <p className="text-neutral-500">Configure notification preferences in the Nudges section.</p>
        </section>

        {/* Data Section */}
        <section className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-5 h-5 text-yellow-400" />
            <h2 className="text-lg font-semibold text-neutral-200">Data</h2>
          </div>
          <div className="space-y-3">
            <button className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg transition-colors">
              Export Data
            </button>
            <button className="px-4 py-2 bg-red-900/50 hover:bg-red-900 text-red-400 rounded-lg transition-colors ml-3">
              Delete Account
            </button>
          </div>
        </section>

        {/* Logout */}
        <button className="w-full p-4 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center justify-center gap-2 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700 transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  )
}
