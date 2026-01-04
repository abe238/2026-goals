# Milestone 6: Life Domains

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Life Domains section — Events & Calendar, People & Relationships, Ideas Vault, and Chores with visual countdown urgency.

## Overview

All the "stuff" of life in one place. Events surface what's coming up with time-of-day awareness. People gently reminds you who needs connection (not a CRM, just care). Ideas Vault celebrates curiosity instead of backlogging it. Chores use visual countdown urgency designed for time blindness—deadlines become visually loud as they approach.

**Key Functionality:**
- Tab navigation between domains (Events, People, Ideas, Chores)
- Events with time-of-day context
- Relationship cards with connection health indicators
- Ideas as collectible cards with categories
- Chores with visual countdown bars (green → amber → red pulsing)
- Quick-add buttons for each domain type
- Celebration micro-animations on completion

## Recommended Approach: Test-Driven Development

See `product-plan/sections/life-domains/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy the section components from `product-plan/sections/life-domains/components/`:
- Domain tab navigation
- Event cards with time context
- Relationship/people cards
- Ideas vault grid
- Chore cards with countdown bars
- Quick-add forms for each type

### Data Layer

The components expect:
- Event (title, date/time, people, goal area)
- Person (name, last connected, connection health)
- Idea (title, category, notes)
- Chore (title, deadline, status)

You'll need to:
- Create CRUD endpoints for each entity
- Build countdown calculation logic
- Track connection frequency for people
- Implement time-of-day event grouping

### Callbacks

| Callback | Description |
|----------|-------------|
| `onSwitchDomain` | Changes active tab |
| `onAddEvent` | Opens event form |
| `onLogConnection` | Records person interaction |
| `onCaptureIdea` | Adds new idea |
| `onCompleteChore` | Marks chore done |
| `onQuickAdd` | Opens quick-add for current domain |

### Empty States

- **No events:** "No upcoming events. Add one!"
- **No people:** "Add the people who matter to you"
- **No ideas:** "Your ideas will be celebrated here"
- **No chores:** "All clear! No pending chores"

## Expected User Flows

### Flow 1: View Upcoming Events

1. User navigates to Events tab
2. User sees events grouped by time (morning, afternoon, evening)
3. User can tap to view details or edit
4. **Outcome:** Clear view of what's coming up

### Flow 2: Check Relationship Health

1. User navigates to People tab
2. User sees cards with "last connected" dates
3. Cards with stale connections show visual indicator
4. User can log a connection
5. **Outcome:** Gentle reminder to reach out

### Flow 3: Browse Ideas Vault

1. User navigates to Ideas tab
2. User sees collectible cards with categories
3. User can add new ideas
4. **Outcome:** Curiosity celebrated, not backlogged

### Flow 4: Complete Urgent Chore

1. User navigates to Chores tab
2. User sees chores with countdown bars
3. Urgent chores show red pulsing animation
4. User marks chore complete
5. Celebration micro-animation plays
6. **Outcome:** Satisfying completion experience

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Tab navigation works
- [ ] Events display with time context
- [ ] People cards show connection health
- [ ] Ideas vault displays properly
- [ ] Chore countdown bars work (green → amber → red)
- [ ] Overdue state shows red pulsing
- [ ] Completion celebrations work
- [ ] Quick-add works for all types
- [ ] Empty states display properly
- [ ] Responsive on mobile
