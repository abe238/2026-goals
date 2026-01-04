# Milestone 5: Work & Leadership

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Work & Leadership section — strategic vs reactive work tracking, leadership development, team visibility, and impact evidence accumulation.

## Overview

This is the strategic command center for career development and the Senior Director transition. Track the balance between reactive firefighting and strategic thinking, build visible leadership presence, manage team relationships, and accumulate evidence of impact for promotion conversations.

**Key Functionality:**
- Strategic/Reactive balance gauge (aim for 40%+ strategic)
- Weekly trend sparkline showing balance over time
- "Log Work" button with strategic vs reactive toggle
- Team visibility cards with interaction tracking
- Leadership wins feed (delegation, mentoring, visibility, impact)
- Impact evidence collection with export-ready summaries
- Weekly intention cards for strategic focus

## Recommended Approach: Test-Driven Development

See `product-plan/sections/work-and-leadership/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy the section components from `product-plan/sections/work-and-leadership/components/`:
- Strategic/Reactive balance gauge
- Weekly trend sparkline
- Work logging form
- Team visibility cards
- Leadership wins feed
- Impact evidence panel
- Weekly intentions

### Data Layer

The components expect:
- WorkItem (with strategic/reactive tag, description, date)
- Team member data (name, role, last interaction)
- Leadership wins (type, description, date)
- Impact evidence entries

You'll need to:
- Create work item CRUD endpoints
- Build balance calculation logic
- Track team interactions
- Accumulate impact evidence

### Callbacks

| Callback | Description |
|----------|-------------|
| `onLogWork` | Opens work logging form |
| `onToggleWorkType` | Switches strategic/reactive |
| `onLogTeamInteraction` | Records team connection |
| `onLogLeadershipWin` | Adds leadership achievement |
| `onSetWeeklyIntentions` | Sets strategic priorities |
| `onExportEvidence` | Generates promotion summary |

### Empty States

- **No work logged:** "Start tracking your work to see patterns"
- **No team interactions:** "Log your first team connection"
- **No leadership wins:** "Capture your leadership moments"

## Expected User Flows

### Flow 1: Log Strategic Work

1. User clicks "Log Work" button
2. User enters work description
3. User selects "Strategic" (vs Reactive)
4. User saves the entry
5. **Outcome:** Balance gauge updates, trend records

### Flow 2: View Work Balance

1. User sees balance gauge at top
2. Gauge shows strategic percentage (aim for 40%+)
3. User sees weekly trend sparkline
4. **Outcome:** Clear visibility into work patterns

### Flow 3: Track Team Visibility

1. User views team cards
2. Cards show "last connected" dates
3. User logs a team interaction
4. **Outcome:** Connection health stays visible

### Flow 4: Build Impact Evidence

1. User logs leadership win (delegation, mentoring, etc.)
2. Win adds to impact evidence collection
3. User can export summary for promotion prep
4. **Outcome:** Promotion narrative accumulates over time

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Balance gauge displays correctly
- [ ] Work logging saves with type
- [ ] Trend sparkline shows history
- [ ] Team cards show interaction status
- [ ] Leadership wins feed works
- [ ] Impact evidence accumulates
- [ ] Export generates summary
- [ ] No guilt for reactive weeks
- [ ] Empty states display properly
- [ ] Responsive on mobile
