import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import {
  Home,
  Mic,
  Trophy,
  Briefcase,
  Heart,
  Bell,
  Settings as SettingsIcon,
} from 'lucide-react'
import { AppShell } from '@/components/shell'
import {
  CommandCenter,
  VoiceAI,
  GoalsWins,
  WorkLeadership,
  LifeDomains,
  NudgesCoaching,
  Settings,
} from '@/pages'
import type { NavigationItem } from '@/types'

function App() {
  const navigate = useNavigate()
  const location = useLocation()

  const navigationItems: NavigationItem[] = [
    {
      label: 'Command Center',
      href: '/',
      icon: <Home className="w-5 h-5" />,
      isActive: location.pathname === '/',
    },
    {
      label: 'Voice & AI',
      href: '/voice',
      icon: <Mic className="w-5 h-5" />,
      isActive: location.pathname === '/voice',
    },
    {
      label: 'Goals & Wins',
      href: '/goals',
      icon: <Trophy className="w-5 h-5" />,
      isActive: location.pathname === '/goals',
    },
    {
      label: 'Work & Leadership',
      href: '/work',
      icon: <Briefcase className="w-5 h-5" />,
      isActive: location.pathname === '/work',
    },
    {
      label: 'Life Domains',
      href: '/life',
      icon: <Heart className="w-5 h-5" />,
      isActive: location.pathname === '/life',
    },
    {
      label: 'Nudges & Coaching',
      href: '/nudges',
      icon: <Bell className="w-5 h-5" />,
      isActive: location.pathname === '/nudges',
    },
    {
      label: 'Settings',
      href: '/settings',
      icon: <SettingsIcon className="w-5 h-5" />,
      isActive: location.pathname === '/settings',
    },
  ]

  const handleVoiceCapture = () => {
    navigate('/voice')
  }

  const handleLogout = () => {
    console.log('Logout clicked')
  }

  return (
    <AppShell
      navigationItems={navigationItems}
      user={{ name: 'Abe' }}
      onNavigate={navigate}
      onLogout={handleLogout}
      onVoiceCapture={handleVoiceCapture}
    >
      <Routes>
        <Route path="/" element={<CommandCenter />} />
        <Route path="/voice" element={<VoiceAI />} />
        <Route path="/goals" element={<GoalsWins />} />
        <Route path="/work" element={<WorkLeadership />} />
        <Route path="/life" element={<LifeDomains />} />
        <Route path="/nudges" element={<NudgesCoaching />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </AppShell>
  )
}

export default App
