# Milestone 3: Voice & AI

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Voice & AI section — the voice input pipeline, AI categorization engine, and intelligent routing that lets users brain-dump and have it organized automatically.

## Overview

This is the primary input mechanism for Momentum 2026. Users speak freely about anything—the system transcribes, extracts structured data (wins, chores, events, ideas, etc.), and routes items to the appropriate sections. No categorization required from the user.

**Key Functionality:**
- Large, satisfying voice capture button with glow animation
- Live waveform visualization during recording
- AI transcription and extraction with visual progress
- Editable cards showing extracted items grouped by type
- Ability to adjust categories for misrouted items
- Capture history with date grouping
- Quick re-capture to add context to past dumps

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/voice-and-ai/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/voice-and-ai/components/`:
- Voice capture button with pulse animation
- Waveform/pulse visualization
- Processing state indicator
- Extracted items cards (editable)
- Capture history list
- Transcript viewer

### Data Layer

The components expect these data shapes:
- Capture (with transcript, extracted items, timestamp)
- Extracted items (type, content, routed destination)
- Capture history (list of past captures)

You'll need to:
- Integrate with speech-to-text API (Whisper, Superwhisper, etc.)
- Build AI extraction pipeline (LLM-based categorization)
- Create API endpoints for capture CRUD
- Implement routing logic to other entities

### Callbacks

Wire up these user actions:

| Callback | Description |
|----------|-------------|
| `onStartRecording` | Begins voice capture |
| `onStopRecording` | Ends recording, triggers processing |
| `onEditItem` | Opens edit modal for extracted item |
| `onChangeCategory` | Changes item category/routing |
| `onSaveCapture` | Saves capture and routes items |
| `onViewHistory` | Opens capture history |
| `onReCapture` | Adds more context to existing capture |

### Empty States

- **First capture:** Encouraging prompt to try voice input
- **No extracted items:** Show transcript with manual add option
- **Empty history:** "Your captures will appear here"

## Files to Reference

- `product-plan/sections/voice-and-ai/README.md` — Feature overview
- `product-plan/sections/voice-and-ai/tests.md` — Test-writing instructions
- `product-plan/sections/voice-and-ai/components/` — React components
- `product-plan/sections/voice-and-ai/types.ts` — TypeScript interfaces
- `product-plan/sections/voice-and-ai/sample-data.json` — Test data
- `product-plan/sections/voice-and-ai/screenshot.png` — Visual reference

## Expected User Flows

### Flow 1: Voice Capture and Processing

1. User taps the voice capture button
2. Waveform visualization shows recording in progress
3. User speaks freely (brain dump)
4. User taps to stop recording
5. Processing indicator appears while AI works
6. Extracted items appear as editable cards
7. User reviews and optionally edits categories
8. User saves the capture
9. **Outcome:** Items routed to appropriate sections

### Flow 2: Edit Misrouted Item

1. User sees an extracted item categorized incorrectly
2. User taps to change category (e.g., from "idea" to "chore")
3. Category updates with visual feedback
4. **Outcome:** Item will route to correct section on save

### Flow 3: Browse Capture History

1. User navigates to capture history
2. User sees past captures grouped by date
3. User taps a capture to view details
4. User can add more context via re-capture
5. **Outcome:** Full history accessible and editable

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Voice capture button works with animation
- [ ] Live visualization during recording
- [ ] Processing state shows progress
- [ ] Extracted items display correctly
- [ ] Category editing works
- [ ] Capture saves and routes items
- [ ] History shows past captures
- [ ] Empty states display properly
- [ ] Responsive on mobile
