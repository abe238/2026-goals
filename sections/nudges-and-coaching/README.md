# Nudges & Coaching

## Overview

A gentle coaching system that sends timely nudges to keep users engaged and celebrates their wins to reinforce positive momentum. The focus is on encouragement, not guilt.

## User Flows

1. **View nudges** — See recent nudges and their status (seen/acted on)
2. **View celebration** — Experience wins celebration overlay
3. **Review history** — Browse past celebrations
4. **Configure preferences** — Set timing, frequency, and types

## Components Provided

- `NudgesAndCoaching.tsx` — Main component with tab navigation
- `NudgeCard.tsx` — Individual nudge display card
- `CelebrationCard.tsx` — Celebration summary card
- `CelebrationModal.tsx` — Full celebration overlay with confetti
- `NudgePreferencesPanel.tsx` — Settings configuration

## Data Used

**Entities from global model:** Nudge, Win, GoalArea

**Props interfaces:**
- `NudgesAndCoachingProps` — Main component props
- `Nudge` — Nudge data shape
- `Celebration` — Celebration data shape
- `NudgePreferences` — User preference settings

## Callback Props

| Callback | Description |
|----------|-------------|
| `onNudgeView` | Called when nudge is viewed |
| `onNudgeAction` | Called when user acts on nudge |
| `onNudgeDismiss` | Called when nudge is dismissed |
| `onCelebrationView` | Called when celebration is opened |
| `onPreferencesUpdate` | Called when preferences change |

## Visual Reference

See `nudges-and-coaching.png` for the target UI design.

## Design Notes

- Warm amber/yellow color scheme
- Tabbed interface (Nudges, Celebrations, Settings)
- Celebration modal with confetti and sparkle animations
- Settings grouped by nudge type (Morning Focus, Evening Reflection, etc.)
- Toggle switches for enabling/disabling each type
- Day picker for scheduling
