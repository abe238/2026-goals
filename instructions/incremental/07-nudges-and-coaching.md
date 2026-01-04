# Milestone 7: Nudges & Coaching

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Nudges & Coaching section — a gentle coaching system that sends timely nudges and celebrates wins to reinforce positive momentum.

## Overview

This section provides gentle, encouraging outreach that keeps users engaged without guilt. Nudges are timed to the user's schedule (morning focus, evening reflection) and wins celebrations are sent proactively when achievements occur. The tone is always warm and supportive.

**Key Functionality:**
- View list of recent nudges with status (seen/acted on)
- Wins celebration overlay for logged achievements
- Celebration history (past wins that were celebrated)
- Nudge preferences configuration (timing, frequency, types)
- Morning focus and evening reflection nudges
- Streak milestone celebrations
- Welcome-back nudges after absence

## Recommended Approach: Test-Driven Development

See `product-plan/sections/nudges-and-coaching/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy the section components from `product-plan/sections/nudges-and-coaching/components/`:
- `NudgesAndCoaching.tsx` — Main component with tabs
- `NudgeCard.tsx` — Individual nudge display
- `CelebrationCard.tsx` — Celebration display card
- `CelebrationModal.tsx` — Full celebration overlay
- `NudgePreferencesPanel.tsx` — Settings panel

### Data Layer

The components expect:
- Nudge (type, message, timestamp, status, action)
- Celebration (winId, winTitle, goalArea, encouragement)
- NudgePreferences (morningFocus, eveningReflection, etc.)

You'll need to:
- Create nudge delivery system (SMS via Twilio or push)
- Build celebration trigger logic
- Store user preferences
- Track nudge interaction status

### Callbacks

| Callback | Description |
|----------|-------------|
| `onNudgeView` | Marks nudge as seen |
| `onNudgeAction` | User acts on nudge |
| `onNudgeDismiss` | User dismisses nudge |
| `onCelebrationView` | Opens celebration modal |
| `onPreferencesUpdate` | Saves preference changes |
| `onShare` | Shares celebration |

### Empty States

- **No nudges yet:** "Check back soon — we'll send gentle reminders when the time is right"
- **No celebrations:** "Your celebrations will appear here. Log some wins and we'll celebrate together"

## Expected User Flows

### Flow 1: View Recent Nudges

1. User navigates to Nudges tab
2. User sees list of recent nudges
3. Pending nudges shown with amber highlight
4. User can view, act on, or dismiss nudges
5. **Outcome:** Clear view of coaching messages

### Flow 2: View Celebration

1. User navigates to Celebrations tab
2. User sees past celebrations as cards
3. User taps a celebration
4. Modal shows full celebration with encouragement
5. User can view the original win or share
6. **Outcome:** Relive positive moments

### Flow 3: Configure Preferences

1. User navigates to Settings tab
2. User sees preference panels for each nudge type
3. User can enable/disable types
4. User can set timing and frequency
5. User saves preferences
6. **Outcome:** Personalized nudge schedule

### Flow 4: Receive Wins Celebration

1. User logs a win (in Goals & Wins section)
2. If celebrations enabled, celebration triggers
3. Modal appears with confetti and encouragement
4. User can view in Wins Vault or share
5. **Outcome:** Achievement celebrated immediately

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Nudges list displays correctly
- [ ] Nudge status tracking works
- [ ] Celebrations display as cards
- [ ] Celebration modal works with animation
- [ ] Preferences panel saves correctly
- [ ] All preference types configurable
- [ ] Warm, encouraging tone throughout
- [ ] Empty states display properly
- [ ] Responsive on mobile
- [ ] Matches the visual design
