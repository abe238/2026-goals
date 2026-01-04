# Section Implementation Prompt

## About Momentum 2026

An **anti-guilt life management app** featuring:
- **Voice-first input** with AI categorization
- **Gentle nudges**, not aggressive tracking
- **Celebration of wins** over punishment of failures
- **True black OLED aesthetic** with warm amber accents

> **Design Philosophy:** Avoid punitive language, red warnings, or failure-focused messaging. Celebrate progress, acknowledge effort, and maintain a warm, encouraging tone throughout.

---

## Define Section Variables

- **SECTION_NAME** = [Human-readable name, e.g., "Nudges & Coaching" or "Goals & Wins"]
- **SECTION_ID** = [Folder name in sections/, e.g., "nudges-and-coaching" or "goals-and-wins"]
- **NN** = [Milestone number, e.g., "02" or "07" — sections start at 02 since 01 is Foundation]

---

I need you to implement the **SECTION_NAME** section of my application.

## Instructions

Please carefully read and analyze the following files:

1. **@product-plan/product-overview.md** — Product summary for overall context
2. **@product-plan/instructions/incremental/NN-SECTION_ID.md** — Specific instructions for this section

Also review the section assets:
- **@product-plan/sections/SECTION_ID/README.md** — Feature overview and design intent
- **@product-plan/sections/SECTION_ID/tests.md** — Test-writing instructions (use TDD approach)
- **@product-plan/sections/SECTION_ID/components/** — React components to integrate
- **@product-plan/sections/SECTION_ID/types.ts** — TypeScript interfaces
- **@product-plan/sections/SECTION_ID/sample-data.json** — Test data

## Before You Begin

Please ask me clarifying questions about:

1. **Authentication & Authorization** (if not yet established)
   - How should users authenticate?
   - What permissions are needed for this section?

2. **Data Relationships**
   - How does this section's data relate to other entities?
   - Are there any cross-section dependencies?

3. **Integration Points**
   - How should this section connect to existing features?
   - Any API endpoints already built that this should use?

4. **Backend Business Logic**
   - Any server-side logic, validations or processes needed beyond what's shown in the UI?
   - Background processes, notifications, or other processes to trigger?

5. **Voice & AI Integration** (if applicable to this section)
   - Which speech-to-text service? (OpenAI Whisper, Deepgram, browser Web Speech API?)
   - Which LLM for AI categorization? (OpenAI, Anthropic, local model?)
   - Real-time streaming or batch processing?

6. **Notifications & Nudges** (if applicable to this section)
   - Delivery channels? (push notifications, email, SMS, in-app only?)
   - Scheduling infrastructure for timed nudges?
   - User preference controls?

7. **Any Other Clarifications**
   - Questions about specific user flows in this section
   - Edge cases that need clarification

## Implementation Approach

Use test-driven development:
1. Read the `tests.md` file and write failing tests first
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

Lastly, be sure to ask me if I have any other notes to add for this implementation.

Once I answer your questions, proceed with implementation.
