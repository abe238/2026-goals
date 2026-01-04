import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom'
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
  Login,
} from '@/pages'
import { useAuth } from '@/context'
import type { NavigationItem } from '@/types'

function ProtectedRoutes() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()

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
    logout()
    navigate('/login')
  }

  return (
    <AppShell
      navigationItems={navigationItems}
      user={{ name: user?.name || 'User' }}
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

function App() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-gold">Loading...</div>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/*" element={user ? <ProtectedRoutes /> : <Navigate to="/login" />} />
    </Routes>
  )
}

export default App
