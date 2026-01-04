# Milestone 1: Foundation

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** None

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components — use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Set up the foundational elements: design tokens, data model types, routing structure, and application shell.

## What to Implement

### 1. Design Tokens

Configure your styling system with these tokens:

- See `product-plan/design-system/tokens.css` for CSS custom properties
- See `product-plan/design-system/tailwind-colors.md` for Tailwind configuration
- See `product-plan/design-system/fonts.md` for Google Fonts setup

**Colors:**
- Primary: `amber` — Warm gold for key actions and accents
- Secondary: `yellow` — Bright highlights and celebrations
- Neutral: `neutral` — Backgrounds, text, borders

**Typography:**
- Heading & Body: Manrope
- Mono: JetBrains Mono

### 2. Data Model Types

Create TypeScript interfaces for your core entities:

- See `product-plan/data-model/types.ts` for interface definitions
- See `product-plan/data-model/README.md` for entity relationships

**Core Entities:**
- Capture, CheckIn, Win, GoalArea, Streak
- Event, Person, Idea, Chore, WorkItem, Nudge

### 3. Routing Structure

Create routes for each section:

| Route | Section |
|-------|---------|
| `/` | Command Center (home) |
| `/voice` | Voice & AI |
| `/goals` | Goals & Wins |
| `/work` | Work & Leadership |
| `/life` | Life Domains |
| `/nudges` | Nudges & Coaching |
| `/settings` | Settings |

### 4. Application Shell

Copy the shell components from `product-plan/shell/components/` to your project:

- `AppShell.tsx` — Main layout wrapper with sidebar
- `MainNav.tsx` — Navigation component with voice button
- `UserMenu.tsx` — User menu with avatar and logout

**Wire Up Navigation:**

| Nav Item | Route | Icon |
|----------|-------|------|
| Voice Capture | Opens voice modal | Mic |
| Command Center | `/` | Home |
| Goals & Wins | `/goals` | Target |
| Work & Leadership | `/work` | Briefcase |
| Life Domains | `/life` | Calendar |
| Nudges & Coaching | `/nudges` | Bell |
| Settings | `/settings` | Settings |

**Shell Features:**
- Sidebar-based navigation (256px desktop, drawer on mobile)
- Voice capture button at top with amber glow
- True black OLED background (neutral-950)
- Active states use amber-500
- Responsive: full sidebar on desktop, hamburger menu on mobile
- User menu at bottom with avatar, name, logout

## Files to Reference

- `product-plan/design-system/` — Design tokens
- `product-plan/data-model/` — Type definitions
- `product-plan/shell/README.md` — Shell design intent
- `product-plan/shell/components/` — Shell React components
- `product-plan/shell/screenshot.png` — Shell visual reference (if available)

## Done When

- [ ] Design tokens are configured (colors, typography)
- [ ] Data model types are defined for all entities
- [ ] Routes exist for all sections (can be placeholder pages)
- [ ] Shell renders with sidebar navigation
- [ ] Navigation links to correct routes
- [ ] Voice capture button is prominent at top
- [ ] User menu shows user info with logout
- [ ] Responsive on mobile (hamburger menu, drawer)
- [ ] True black OLED aesthetic with amber accents
