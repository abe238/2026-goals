# Momentum 2026 — Complete Implementation Instructions

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

## Test-Driven Development

Each section includes a `tests.md` file with detailed test-writing instructions. These are **framework-agnostic** — adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, RSpec, Minitest, PHPUnit, etc.).

**For each section:**
1. Read `product-plan/sections/[section-id]/tests.md`
2. Write failing tests for key user flows (success and failure paths)
3. Implement the feature to make tests pass
4. Refactor while keeping tests green

The test instructions include:
- Specific UI elements, button labels, and interactions to verify
- Expected success and failure behaviors
- Empty state handling (when no records exist yet)
- Data assertions and state validations

---

## Product Summary

Your life's mission control—a voice-first command center that captures everything you throw at it, lets AI organize the chaos, and surfaces what matters when it matters. Built around anti-guilt psychology and neurodivergent needs.

**Core Philosophy:**
- Anti-guilt design: No punishment for absence, weekly streaks with grace days
- Voice-first input: Speak freely, AI extracts and categorizes automatically
- Visual urgency: Color-coded countdown bars for time blindness
- Wins Vault: Proof of progress always visible
- One unified system: All of life in one place

**Design System:**
- Colors: amber (primary), yellow (secondary), neutral
- Typography: Manrope (heading/body), JetBrains Mono (mono)
- Aesthetic: True black OLED with amber accents

---

# Milestone 1: Foundation

## Goal

Set up the foundational elements: design tokens, data model types, routing structure, and application shell.

## What to Implement

### 1. Design Tokens

**Colors:**
- Primary: `amber` — Warm gold for key actions and accents
- Secondary: `yellow` — Bright highlights and celebrations
- Neutral: `neutral` — Backgrounds, text, borders

**Typography:**
- Heading & Body: Manrope
- Mono: JetBrains Mono

### 2. Data Model Types

Create TypeScript interfaces for:
- Capture, CheckIn, Win, GoalArea, Streak
- Event, Person, Idea, Chore, WorkItem, Nudge

### 3. Routing Structure

| Route | Section |
|-------|---------|
| `/` | Command Center |
| `/voice` | Voice & AI |
| `/goals` | Goals & Wins |
| `/work` | Work & Leadership |
| `/life` | Life Domains |
| `/nudges` | Nudges & Coaching |
| `/settings` | Settings |

### 4. Application Shell

- Sidebar-based navigation (256px desktop, drawer on mobile)
- Voice capture button at top with amber glow
- True black OLED background (neutral-950)
- User menu at bottom with avatar, name, logout

## Done When

- [ ] Design tokens configured
- [ ] Data model types defined
- [ ] Routes exist for all sections
- [ ] Shell renders with navigation
- [ ] Responsive on mobile

---

# Milestone 2: Command Center

## Goal

The smart contextual home screen that adapts to time of day.

## Key Functionality

- Time-of-day aware content (morning vs evening)
- Priority/urgent item at top
- Voice capture button for brain-dump
- Quick-add buttons (chore, event, idea)
- Check-in button for structured reflection
- Welcome-back flow after 2+ days absence

## User Flows

1. **Morning view** — Focus, events, chores ahead
2. **Evening view** — Reflection prompts, wins, tomorrow's focus
3. **Welcome back** — Gentle catch-up after absence
4. **Voice capture** — Brain-dump via voice

## Done When

- [ ] Dashboard shows time-appropriate content
- [ ] Voice capture works
- [ ] Quick-add buttons work
- [ ] Welcome-back flow triggers after 2+ days

---

# Milestone 3: Voice & AI

## Goal

Voice input pipeline and AI categorization that lets users brain-dump freely.

## Key Functionality

- Large voice capture button with glow animation
- Live waveform visualization during recording
- AI transcription and extraction with progress
- Editable cards for extracted items
- Category adjustment for misrouted items
- Capture history with date grouping

## User Flows

1. **Voice capture** — Record, process, review extracted items
2. **Edit misrouted** — Change category before saving
3. **Browse history** — View past captures

## Done When

- [ ] Voice capture works with animation
- [ ] Processing shows progress
- [ ] Extracted items display and edit
- [ ] History shows past captures

---

# Milestone 4: Goals & Wins

## Goal

Anti-guilt momentum system with weekly streaks and Wins Vault.

## Key Functionality

- Weekly streak visualization (7-day pill row)
- Grace days counter (3 per week)
- "Log a Win" button
- Wins Vault with search
- Goal area progress cards
- Milestone celebrations (7, 30, 90 days)

## User Flows

1. **Log a win** — Quick capture with goal area
2. **Browse Wins Vault** — Search and filter past wins
3. **View weekly progress** — Streak and grace days
4. **Celebrate milestone** — Achievement badges

## Done When

- [ ] Streak visualization works
- [ ] Grace days counter functions
- [ ] Win logging saves to vault
- [ ] Milestone celebrations trigger

---

# Milestone 5: Work & Leadership

## Goal

Strategic vs reactive tracking for career development.

## Key Functionality

- Strategic/Reactive balance gauge (aim 40%+ strategic)
- Weekly trend sparkline
- "Log Work" button with type toggle
- Team visibility cards
- Leadership wins feed
- Impact evidence collection

## User Flows

1. **Log strategic work** — Capture with type
2. **View balance** — Gauge and trend
3. **Track team** — Connection health
4. **Build evidence** — Accumulate for promotion

## Done When

- [ ] Balance gauge displays correctly
- [ ] Work logging with type works
- [ ] Team cards show status
- [ ] Impact evidence accumulates

---

# Milestone 6: Life Domains

## Goal

Events, People, Ideas, and Chores with visual urgency.

## Key Functionality

- Tab navigation (Events, People, Ideas, Chores)
- Events with time-of-day context
- People cards with connection health
- Ideas as collectible cards
- Chores with countdown bars (green → amber → red)
- Completion micro-animations

## User Flows

1. **View events** — Time-grouped upcoming events
2. **Check relationships** — Connection health indicators
3. **Browse ideas** — Celebrated, not backlogged
4. **Complete chore** — Countdown urgency, celebration

## Done When

- [ ] Tab navigation works
- [ ] Chore countdown bars work
- [ ] Completion celebrations work
- [ ] Empty states display

---

# Milestone 7: Nudges & Coaching

## Goal

Gentle coaching with timely nudges and wins celebrations.

## Key Functionality

- Nudges list with status (seen/acted on)
- Wins celebration overlay
- Celebration history
- Preference configuration (timing, frequency)
- Morning focus / evening reflection
- Streak milestone celebrations

## User Flows

1. **View nudges** — Recent coaching messages
2. **View celebration** — Relive positive moments
3. **Configure preferences** — Personalize timing
4. **Receive celebration** — Immediate achievement recognition

## Done When

- [ ] Nudges list displays
- [ ] Celebration modal works
- [ ] Preferences save correctly
- [ ] Warm, encouraging tone throughout
