# Milestone 4: Goals & Wins

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Goals & Wins section — the anti-guilt momentum system with weekly streaks, grace days, progress visualization, and the Wins Vault.

## Overview

This section is designed for neurodivergent minds with anti-guilt principles at its core. Features weekly streaks with built-in grace days (because life happens), progress visualization that celebrates consistency over perfection, and the Wins Vault—a searchable collection of achievements that proves you're making progress even when it doesn't feel like it.

**Key Functionality:**
- Weekly streak visualization with 7-day pill row
- Grace days counter (3 per week, refreshes Monday)
- Large "Log a Win" button prominently placed
- Wins Vault with infinite scroll and search
- Goal area cards showing individual progress
- Milestone badges for streak achievements (7, 30, 90 days)
- Anti-guilt messaging throughout

## Recommended Approach: Test-Driven Development

See `product-plan/sections/goals-and-wins/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy the section components from `product-plan/sections/goals-and-wins/components/`:
- Weekly streak visualization
- Grace days indicator
- Win logging form
- Wins Vault with search
- Goal area progress cards
- Milestone celebration modal

### Data Layer

The components expect:
- GoalArea (7 life areas with streaks)
- Streak (weekly progress, grace days)
- Win (achievement with goal area, date, description)

You'll need to:
- Create streak calculation logic (weekly, with grace days)
- Build wins CRUD endpoints
- Implement search and filtering for Wins Vault
- Track milestone achievements

### Callbacks

| Callback | Description |
|----------|-------------|
| `onLogWin` | Opens win logging form |
| `onSaveWin` | Saves new win to vault |
| `onSearchWins` | Filters Wins Vault |
| `onSetWeeklyFocus` | Sets 1-3 priority goal areas |
| `onViewGoalArea` | Shows goal area detail |
| `onCelebrateMilestone` | Shows milestone celebration |

### Empty States

- **No wins yet:** "Your wins will appear here. Log your first win!"
- **No wins in goal area:** Encouraging message to log first win
- **Empty search results:** "No wins match your search"

## Expected User Flows

### Flow 1: Log a Win

1. User clicks "Log a Win" button
2. User enters win description
3. User optionally selects goal area
4. User saves the win
5. **Outcome:** Win added to vault, streak updates if applicable

### Flow 2: Browse Wins Vault

1. User navigates to Wins Vault
2. User sees wins with infinite scroll
3. User can search by keyword
4. User can filter by goal area or date
5. **Outcome:** User finds proof of progress

### Flow 3: View Weekly Progress

1. User sees 7-day pill row visualization
2. Filled pills = check-in days
3. Star pills = grace days used
4. User sees grace days remaining counter
5. **Outcome:** Clear view of weekly momentum

### Flow 4: Celebrate Milestone

1. User hits streak milestone (7, 30, 90 days)
2. Celebration modal appears with badge
3. User can share or dismiss
4. **Outcome:** Achievement recognized and recorded

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Weekly streak visualization works
- [ ] Grace days counter functions correctly
- [ ] Win logging saves to vault
- [ ] Wins Vault displays with search
- [ ] Goal area cards show progress
- [ ] Milestone celebrations trigger
- [ ] Anti-guilt messaging visible (no red/failure colors)
- [ ] Empty states display properly
- [ ] Responsive on mobile
