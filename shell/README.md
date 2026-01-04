# Application Shell

## Overview

Momentum 2026's shell is a sidebar-based navigation system optimized for mobile-first usage with a true black OLED aesthetic. The voice capture button is prominently placed at the top of the sidebar, making brain-dump input always one tap away.

## Components

- `AppShell.tsx` — Main layout wrapper with sidebar and content area
- `MainNav.tsx` — Navigation list component
- `UserMenu.tsx` — User avatar, name, and logout
- `VoiceCapture.tsx` — Prominent voice capture button with amber glow

## Navigation Structure

| Nav Item | Route | Description |
|----------|-------|-------------|
| Voice Capture | Modal | Opens voice recording |
| Command Center | `/` | Home dashboard |
| Goals & Wins | `/goals` | Streaks and wins vault |
| Work & Leadership | `/work` | Strategic tracking |
| Life Domains | `/life` | Events, People, Ideas, Chores |
| Nudges & Coaching | `/nudges` | SMS and coaching |
| Settings | `/settings` | App settings |

## Props

```typescript
interface AppShellProps {
  children: React.ReactNode
  navigationItems: NavigationItem[]
  user?: { name: string; avatarUrl?: string }
  onNavigate?: (href: string) => void
  onLogout?: () => void
  onVoiceCapture?: () => void
}
```

## Responsive Behavior

- **Desktop (1024px+):** Full sidebar always visible
- **Tablet (768px-1023px):** Sidebar collapsible
- **Mobile (<768px):** Hamburger menu with slide-out drawer

## Design Notes

- True black background (neutral-950) for OLED
- Amber accents for active states and voice button
- Large touch targets (min 44px)
- Smooth 200ms transitions
- Manrope font throughout
