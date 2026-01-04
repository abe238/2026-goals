# Data Model

## Core Entities

### Capture
A raw voice dump that gets processed by AI and routed to the right places. This is the primary input mechanism—speak freely, and the system extracts structured data.

### CheckIn
A structured check-in (morning, evening, or quick) with prompts and responses. Morning check-ins set focus, evening check-ins reflect on the day.

### Win
A positive moment extracted from check-ins or captures, stored in the Wins Vault. Serves as proof of progress when motivation is low.

### GoalArea
One of 7 life areas: Physical Health, Mental Health, Family (Ian), Family (Wife), Work (Strategic), Work (Leadership), Content/Newsletter.

### Streak
Weekly progress tracking for a goal area. Uses anti-guilt design: weekly targets, built-in grace days, streaks that pause rather than reset.

### Event
A calendar item or upcoming activity. Can involve people, relate to goal areas, and surface contextually.

### Person
Someone in your life to track connection frequency with. Not a CRM—just gentle reminders about who needs attention.

### Idea
A crazy idea or tech to explore, living in the Ideas Vault. Celebrated, not backlogged.

### Chore
A non-negotiable task with a hard deadline and visual urgency (countdown visualization).

### WorkItem
A work-related item tagged as strategic or reactive. Helps track leadership vs firefighting.

### Nudge
An outbound SMS message, either scheduled or triggered. Warm tone, never guilt-inducing.

## Relationships

- Capture → produces Wins, CheckIns, Events, Chores, Ideas, WorkItems, Person mentions
- CheckIn → belongs to GoalAreas, may produce Wins
- Win → belongs to GoalArea, may come from Capture or CheckIn
- Streak → belongs to GoalArea (one active per goal area)
- GoalArea → has many Wins, CheckIns, and one active Streak
- Event → may involve a Person, may relate to GoalArea
- Chore → may relate to GoalArea
- WorkItem → belongs to Work GoalAreas
- Nudge → may reference any entity
