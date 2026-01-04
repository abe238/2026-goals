import { useState } from 'react'
import { Calendar, Users, Lightbulb, ListTodo } from 'lucide-react'

type Tab = 'events' | 'people' | 'ideas' | 'chores'

export function LifeDomains() {
  const [activeTab, setActiveTab] = useState<Tab>('events')

  const tabs = [
    { id: 'events' as Tab, label: 'Events', icon: Calendar },
    { id: 'people' as Tab, label: 'People', icon: Users },
    { id: 'ideas' as Tab, label: 'Ideas', icon: Lightbulb },
    { id: 'chores' as Tab, label: 'Chores', icon: ListTodo },
  ]

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-100 mb-2">Life Domains</h1>
        <p className="text-neutral-400">All the stuff of life, organized in one place.</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm
              transition-all whitespace-nowrap
              ${activeTab === tab.id
                ? 'bg-yellow-400 text-neutral-950'
                : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
              }
            `}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'events' && (
          <div className="space-y-4">
            <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-xl text-center">
              <Calendar className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
              <p className="text-neutral-500">No upcoming events. Add one to stay on track!</p>
              <button className="mt-4 px-4 py-2 bg-yellow-400 text-neutral-950 rounded-lg font-medium hover:bg-yellow-300 transition-colors">
                Add Event
              </button>
            </div>
          </div>
        )}

        {activeTab === 'people' && (
          <div className="space-y-4">
            <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-xl text-center">
              <Users className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
              <p className="text-neutral-500">Track the people who matter. Stay connected.</p>
              <button className="mt-4 px-4 py-2 bg-yellow-400 text-neutral-950 rounded-lg font-medium hover:bg-yellow-300 transition-colors">
                Add Person
              </button>
            </div>
          </div>
        )}

        {activeTab === 'ideas' && (
          <div className="space-y-4">
            <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-xl text-center">
              <Lightbulb className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
              <p className="text-neutral-500">Your ideas vault. Celebrate crazy ideas!</p>
              <button className="mt-4 px-4 py-2 bg-yellow-400 text-neutral-950 rounded-lg font-medium hover:bg-yellow-300 transition-colors">
                Add Idea
              </button>
            </div>
          </div>
        )}

        {activeTab === 'chores' && (
          <div className="space-y-4">
            <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-xl text-center">
              <ListTodo className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
              <p className="text-neutral-500">Non-negotiables with visual urgency. Stay on top of it.</p>
              <button className="mt-4 px-4 py-2 bg-yellow-400 text-neutral-950 rounded-lg font-medium hover:bg-yellow-300 transition-colors">
                Add Chore
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
