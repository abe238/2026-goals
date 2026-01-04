# Test Instructions: Nudges & Coaching

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, etc.).

## Overview

Test the gentle coaching system that displays nudges, celebrates wins, and allows preference configuration.

---

## User Flow Tests

### Flow 1: View Recent Nudges

**Scenario:** User views list of recent coaching nudges

#### Success Path

**Setup:**
- Nudges array with 3+ items (mix of pending and acted-on)

**Steps:**
1. User navigates to Nudges tab
2. User sees list of nudge cards
3. Pending nudges show with amber highlight
4. Acted-on nudges show with neutral styling

**Expected Results:**
- [ ] Nudge cards display with message and timestamp
- [ ] Pending nudges have "Needs Your Attention" section
- [ ] Past nudges show in "Recent" section
- [ ] Nudge type icons display correctly

#### Empty State

**Setup:**
- Nudges array is empty (`[]`)

**Expected Results:**
- [ ] Shows message "No nudges yet"
- [ ] Shows encouraging text about checking back soon
- [ ] Displays envelope icon

---

### Flow 2: View Celebration

**Scenario:** User views a wins celebration

#### Success Path

**Setup:**
- Celebrations array with items

**Steps:**
1. User navigates to Celebrations tab
2. User sees celebration cards
3. User clicks on a celebration
4. Modal opens with full celebration

**Expected Results:**
- [ ] Celebration cards display goal area and win title
- [ ] Clicking opens CelebrationModal
- [ ] Modal shows confetti emoji and encouragement
- [ ] "View in Wins Vault" button is visible
- [ ] Share and Close buttons work

#### Empty State

**Setup:**
- Celebrations array is empty (`[]`)

**Expected Results:**
- [ ] Shows "Your celebrations will appear here"
- [ ] Shows encouraging message about logging wins
- [ ] Displays star icon

---

### Flow 3: Configure Preferences

**Scenario:** User configures nudge preferences

#### Success Path

**Steps:**
1. User navigates to Settings tab
2. User sees preference panels for each nudge type
3. User toggles Morning Focus on/off
4. When enabled, time and day options appear
5. User modifies settings

**Expected Results:**
- [ ] All 5 preference panels display (Morning Focus, Evening Reflection, Wins Celebrations, Welcome Back, Streak Milestones)
- [ ] Toggle switches work
- [ ] Time input shows when enabled
- [ ] Day picker shows when enabled
- [ ] Changes call onPreferencesUpdate callback

---

## Component Interaction Tests

### NudgeCard

**Renders correctly:**
- [ ] Displays nudge message
- [ ] Shows relative timestamp
- [ ] Shows nudge type icon
- [ ] Pending nudges show action buttons

**User interactions:**
- [ ] Clicking "View" calls onView
- [ ] Clicking action button calls onAction
- [ ] Clicking "Dismiss" calls onDismiss

### CelebrationCard

**Renders correctly:**
- [ ] Displays goal area badge
- [ ] Shows win title
- [ ] Shows celebration emoji

**User interactions:**
- [ ] Clicking card calls onView

### CelebrationModal

**Renders correctly:**
- [ ] Shows confetti emoji with bounce animation
- [ ] Displays goal area
- [ ] Shows win title
- [ ] Shows encouragement message
- [ ] Shows action buttons

**User interactions:**
- [ ] Clicking backdrop closes modal
- [ ] "View in Wins Vault" calls onViewWin
- [ ] "Share" calls onShare
- [ ] "Close" calls onClose

### NudgePreferencesPanel

**Renders correctly:**
- [ ] All 5 preference sections display
- [ ] Toggle states match preferences prop
- [ ] Expanded sections show time/day options

**User interactions:**
- [ ] Toggle switches fire change events
- [ ] Day picker buttons toggle days
- [ ] Checkbox toggles work

---

## Edge Cases

- [ ] Handles very long nudge messages with text truncation
- [ ] Works with single nudge and many nudges (10+)
- [ ] Celebration modal closes on Escape key
- [ ] Tab navigation works via keyboard
- [ ] Preferences panel handles all days selected/none selected

---

## Accessibility Checks

- [ ] All interactive elements are keyboard accessible
- [ ] Modal traps focus appropriately
- [ ] Toggle switches have accessible labels
- [ ] Color contrast meets WCAG AA

---

## Sample Test Data

```typescript
// Populated state
const mockNudges = [
  {
    id: "1",
    type: "morning-focus",
    message: "Good morning! What's your one focus for today?",
    timestamp: new Date().toISOString(),
    status: "pending"
  },
  {
    id: "2",
    type: "wins-celebration",
    message: "You logged 3 wins this week!",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    status: "acted"
  }
];

const mockCelebrations = [
  {
    id: "1",
    winId: "win-1",
    winTitle: "Completed Q4 planning",
    goalArea: "Work Strategic",
    encouragement: "Strategic thinking is your superpower!"
  }
];

const mockPreferences = {
  morningFocus: { enabled: true, time: "08:00", days: ["monday", "tuesday", "wednesday", "thursday", "friday"] },
  eveningReflection: { enabled: true, time: "21:00", days: ["monday", "wednesday", "friday"] },
  winsCelebration: { enabled: true, celebrateImmediately: true },
  welcomeBack: { enabled: true, afterDaysInactive: 3 },
  streakMilestones: { enabled: true, milestones: [1, 4, 12, 26, 52] }
};

// Empty states
const mockEmptyNudges = [];
const mockEmptyCelebrations = [];
```
