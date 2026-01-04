# Milestone 2: Command Center

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Command Center — the smart contextual home screen that adapts to time of day, shows what matters now, and delivers the warm welcome-back experience.

## Overview

The Command Center is the heart of Momentum 2026. It shows a full day preview in the morning (focus, events, chores, what's ahead) and reflection prompts in the evening (how was today, wins to celebrate, tomorrow's focus). For returning users after 2+ days away, it includes a gentle welcome-back flow.

**Key Functionality:**
- Time-of-day aware content surfacing (morning vs evening vs weekend)
- Priority/urgent item displayed prominently at top
- Grid of cards for events, chores, and quick actions
- Voice capture button for brain-dump input
- Quick-add buttons for common items (chore, event, idea)
- Check-in button for structured morning/evening reflection
- Welcome-back flow after extended absence

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/command-center/tests.md` for detailed test-writing instructions including:
- Key user flows to test (success and failure paths)
- Specific UI elements, button labels, and interactions to verify
- Expected behaviors and assertions

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/command-center/components/`:
- Main dashboard layout
- Priority item card
- Event/chore grid cards
- Quick-add buttons
- Check-in launcher

### Data Layer

The components expect these data shapes:
- Today's events (from Event entity)
- Urgent chores (from Chore entity with deadline proximity)
- Current streak status (from Streak entity)
- Last visit timestamp (for welcome-back detection)

You'll need to:
- Create API endpoints for dashboard data
- Implement time-of-day content selection logic
- Detect absence for welcome-back flow (2+ days)

### Callbacks

Wire up these user actions:

| Callback | Description |
|----------|-------------|
| `onVoiceCapture` | Opens voice recording modal |
| `onQuickAdd` | Opens quick-add form (type: chore/event/idea) |
| `onStartCheckIn` | Launches check-in flow (morning/evening) |
| `onItemComplete` | Marks item complete (chore/event) |
| `onItemEdit` | Opens item edit modal |

### Empty States

Implement empty state UI for when no records exist:
- **No events today:** Show encouraging message and quick-add button
- **No urgent chores:** Show "All clear!" celebration
- **First-time user:** Show onboarding welcome with voice capture prompt

## Files to Reference

- `product-plan/sections/command-center/README.md` — Feature overview
- `product-plan/sections/command-center/tests.md` — Test-writing instructions
- `product-plan/sections/command-center/components/` — React components
- `product-plan/sections/command-center/types.ts` — TypeScript interfaces
- `product-plan/sections/command-center/sample-data.json` — Test data
- `product-plan/sections/command-center/screenshot.png` — Visual reference

## Expected User Flows

### Flow 1: Morning Dashboard View

1. User opens app in the morning (6am-12pm)
2. User sees morning-focused content: today's focus, upcoming events, urgent chores
3. User sees streak indicator showing current progress
4. **Outcome:** User has clear view of what matters today

### Flow 2: Start Morning Check-In

1. User clicks "Check In" button
2. User is guided through morning prompts (focus, intentions)
3. User completes check-in
4. **Outcome:** Morning check-in logged, dashboard updates

### Flow 3: Quick Voice Capture

1. User clicks voice capture button
2. User speaks a brain dump
3. AI processes and routes content
4. **Outcome:** Items extracted and routed to appropriate sections

### Flow 4: Welcome Back After Absence

1. User returns after 2+ days away
2. System shows warm welcome-back message (no guilt)
3. User is asked "Anything notable happen while you were away?"
4. User sets today's one focus
5. **Outcome:** User eased back in without pressure

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Dashboard shows time-appropriate content
- [ ] Urgent items displayed prominently
- [ ] Voice capture button works
- [ ] Quick-add buttons work
- [ ] Check-in flow launches correctly
- [ ] Welcome-back flow triggers after 2+ days absence
- [ ] Empty states display properly
- [ ] Responsive on mobile
- [ ] Matches the visual design
