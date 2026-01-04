# Momentum 2026 — Product Overview

## Summary

Your life's mission control—a voice-first command center that captures everything you throw at it, lets AI organize the chaos, and surfaces what matters when it matters. Built around anti-guilt psychology and neurodivergent needs: no punishment for absence, visual urgency for time blindness, and a hybrid interface that's smart by default but gives you full access when you want it.

## Core Philosophy

- **Anti-guilt design**: No punishment for absence, weekly streaks with grace days, warm welcome-back flows
- **Voice-first input**: Speak freely, AI extracts and categorizes automatically
- **Visual urgency**: Color-coded countdown bars for time blindness (green → amber → red)
- **Wins Vault**: Proof of progress always visible when motivation is low
- **Gentle nudges**: Encouraging reminders, never nagging or guilt-tripping
- **One unified system**: All of life in one place with contextual smart surfaces

## Planned Sections

1. **Command Center** — The smart contextual home screen that adapts to time of day, shows what matters now, and delivers the warm welcome-back experience.

2. **Voice & AI** — The voice input pipeline, AI categorization engine, and intelligent routing that lets you brain-dump and have it organized automatically.

3. **Goals & Wins** — The anti-guilt momentum system with weekly streaks, grace days, progress visualization, and the Wins Vault that proves you're making progress.

4. **Work & Leadership** — Strategic vs reactive work tracking, leadership development, team visibility, and perception-building for the Senior Director transition.

5. **Life Domains** — Events & Calendar, People & Relationships, Ideas Vault, and Chores with visual countdown urgency—all the "stuff" of life in one place.

6. **Nudges & Coaching** — SMS communication, gentle coaching, wins celebrations, and content creation assistance.

## Data Model

Core entities in this system:

- **Capture** — Raw voice dumps processed by AI and routed to appropriate places
- **CheckIn** — Structured check-ins (morning, evening, quick) with prompts and responses
- **Win** — Positive moments extracted and stored in the Wins Vault
- **GoalArea** — One of 7 life areas being tracked with weekly streaks
- **Streak** — Weekly progress tracking with anti-guilt design
- **Event** — Calendar items that surface contextually
- **Person** — People to track connection frequency with
- **Idea** — Crazy ideas in the Ideas Vault, celebrated not backlogged
- **Chore** — Non-negotiable tasks with visual countdown urgency
- **WorkItem** — Work items tagged as strategic or reactive
- **Nudge** — Outbound SMS messages (scheduled or triggered)

## Design System

**Colors:**
- Primary: `amber` — Warm gold for key actions and accents
- Secondary: `yellow` — Bright highlights and celebrations
- Neutral: `neutral` — True black (#000000) backgrounds for OLED, warm grays for text/borders

**Typography:**
- Heading: Manrope
- Body: Manrope
- Mono: JetBrains Mono

**Aesthetic:**
- True black OLED theme with amber/gold accents
- Sleek, motion-rich UI with satisfying micro-animations
- Large touch targets for tired evening use
- Dark "warm embrace" aesthetic for nighttime/sauna use

> **Design Philosophy:** Avoid punitive language, red warnings, or failure-focused messaging. Celebrate progress, acknowledge effort, and maintain a warm, encouraging tone throughout.

## Implementation Sequence

Build this product in milestones:

1. **Foundation** — Set up design tokens, data model types, routing structure, and application shell
2. **Command Center** — Smart contextual home screen with time-of-day adaptation
3. **Voice & AI** — Voice input pipeline and AI categorization engine
4. **Goals & Wins** — Anti-guilt momentum system with streaks and Wins Vault
5. **Work & Leadership** — Strategic vs reactive tracking and leadership development
6. **Life Domains** — Events, People, Ideas, and Chores management
7. **Nudges & Coaching** — SMS nudges, gentle coaching, and wins celebrations

Each milestone has a dedicated instruction document in `product-plan/instructions/`.
