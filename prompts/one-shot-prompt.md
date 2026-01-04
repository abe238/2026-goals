# One-Shot Implementation Prompt

## About Momentum 2026

An **anti-guilt life management app** featuring:
- **Voice-first input** with AI categorization
- **Gentle nudges**, not aggressive tracking
- **Celebration of wins** over punishment of failures
- **True black OLED aesthetic** with warm amber accents

> **Design Philosophy:** Avoid punitive language, red warnings, or failure-focused messaging. Celebrate progress, acknowledge effort, and maintain a warm, encouraging tone throughout.

---

I need you to implement a complete web application based on detailed design specifications and UI components I'm providing.

## Instructions

Please carefully read and analyze the following files:

1. **@product-plan/product-overview.md** — Product summary with sections and data model overview
2. **@product-plan/instructions/one-shot-instructions.md** — Complete implementation instructions for all milestones

After reading these, also review:
- **@product-plan/design-system/** — Color and typography tokens
- **@product-plan/data-model/** — Entity types and relationships
- **@product-plan/shell/** — Application shell components
- **@product-plan/sections/** — All section components, types, sample data, and test instructions

## Before You Begin

Please ask me clarifying questions about:

1. **Authentication & Authorization**
   - How should users sign up and log in? (email/password, OAuth providers, magic links?)
   - Are there different user roles with different permissions?
   - Should there be an admin interface?

2. **User & Account Modeling**
   - Is this a single-user app or multi-user?
   - Do users belong to organizations/teams/workspaces?
   - How should user profiles be structured?

3. **Tech Stack Preferences**
   - What backend framework/language should I use?
   - What database do you prefer?
   - Any specific hosting/deployment requirements?

4. **Backend Business Logic**
   - Any server-side logic, validations or processes needed beyond what's shown in the UI?
   - Background processes, notifications, or other processes to trigger?

5. **Voice & AI Integration**
   - Which speech-to-text service? (OpenAI Whisper, Deepgram, browser Web Speech API?)
   - Which LLM for AI categorization? (OpenAI, Anthropic, local model?)
   - Real-time streaming transcription or batch processing?
   - Fallback behavior when voice input fails?

6. **Notifications & Nudges**
   - Delivery channels for nudges? (push notifications, email, SMS, in-app only?)
   - Scheduling infrastructure for timed nudges? (cron, queue system, third-party service?)
   - User preference controls for notification frequency?

7. **Any Other Clarifications**
   - Questions about specific features or user flows
   - Edge cases that need clarification
   - Integration requirements

Lastly, be sure to ask me if I have any other notes to add for this implementation.

Once I answer your questions, create a comprehensive implementation plan before coding.
