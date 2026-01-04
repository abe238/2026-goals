import { pgTable, text, timestamp, uuid, boolean, integer, jsonb, pgEnum } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const goalAreaEnum = pgEnum('goal_area', [
  'physical_health',
  'mental_health',
  'family_ian',
  'family_wife',
  'work_strategic',
  'work_leadership',
  'content_newsletter'
])

export const checkInTypeEnum = pgEnum('check_in_type', ['morning', 'evening', 'quick'])
export const captureStatusEnum = pgEnum('capture_status', ['pending', 'processing', 'processed', 'failed'])
export const workItemTypeEnum = pgEnum('work_item_type', ['strategic', 'reactive'])
export const nudgeChannelEnum = pgEnum('nudge_channel', ['sms', 'slack', 'telegram'])

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const captures = pgTable('captures', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id),
  audioUrl: text('audio_url'),
  transcript: text('transcript'),
  aiSummary: text('ai_summary'),
  status: captureStatusEnum('status').default('pending').notNull(),
  extractedData: jsonb('extracted_data'),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

export const checkIns = pgTable('check_ins', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id),
  type: checkInTypeEnum('type').notNull(),
  goalArea: goalAreaEnum('goal_area'),
  prompts: jsonb('prompts'),
  responses: jsonb('responses'),
  mood: integer('mood'),
  energyLevel: integer('energy_level'),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

export const wins = pgTable('wins', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id),
  title: text('title').notNull(),
  description: text('description'),
  goalArea: goalAreaEnum('goal_area'),
  captureId: uuid('capture_id').references(() => captures.id),
  checkInId: uuid('check_in_id').references(() => checkIns.id),
  celebratedAt: timestamp('celebrated_at'),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

export const streaks = pgTable('streaks', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id),
  goalArea: goalAreaEnum('goal_area').notNull(),
  weeklyTarget: integer('weekly_target').default(5).notNull(),
  currentCount: integer('current_count').default(0).notNull(),
  graceDaysUsed: integer('grace_days_used').default(0).notNull(),
  isPaused: boolean('is_paused').default(false).notNull(),
  weekStartDate: timestamp('week_start_date').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const events = pgTable('events', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id),
  title: text('title').notNull(),
  description: text('description'),
  startsAt: timestamp('starts_at').notNull(),
  endsAt: timestamp('ends_at'),
  goalArea: goalAreaEnum('goal_area'),
  personId: uuid('person_id').references(() => persons.id),
  location: text('location'),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

export const persons = pgTable('persons', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id),
  name: text('name').notNull(),
  relationship: text('relationship'),
  lastContactAt: timestamp('last_contact_at'),
  targetFrequencyDays: integer('target_frequency_days'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

export const ideas = pgTable('ideas', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id),
  title: text('title').notNull(),
  description: text('description'),
  tags: jsonb('tags'),
  captureId: uuid('capture_id').references(() => captures.id),
  isArchived: boolean('is_archived').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

export const chores = pgTable('chores', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id),
  title: text('title').notNull(),
  description: text('description'),
  dueAt: timestamp('due_at').notNull(),
  goalArea: goalAreaEnum('goal_area'),
  isCompleted: boolean('is_completed').default(false).notNull(),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

export const workItems = pgTable('work_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id),
  title: text('title').notNull(),
  description: text('description'),
  type: workItemTypeEnum('type').notNull(),
  priority: integer('priority'),
  isCompleted: boolean('is_completed').default(false).notNull(),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

export const nudges = pgTable('nudges', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id),
  message: text('message').notNull(),
  channel: nudgeChannelEnum('channel').notNull(),
  scheduledAt: timestamp('scheduled_at'),
  sentAt: timestamp('sent_at'),
  entityType: text('entity_type'),
  entityId: uuid('entity_id'),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

export const usersRelations = relations(users, ({ many }) => ({
  captures: many(captures),
  checkIns: many(checkIns),
  wins: many(wins),
  streaks: many(streaks),
  events: many(events),
  persons: many(persons),
  ideas: many(ideas),
  chores: many(chores),
  workItems: many(workItems),
  nudges: many(nudges)
}))

export const capturesRelations = relations(captures, ({ one, many }) => ({
  user: one(users, { fields: [captures.userId], references: [users.id] }),
  wins: many(wins),
  ideas: many(ideas)
}))

export const checkInsRelations = relations(checkIns, ({ one, many }) => ({
  user: one(users, { fields: [checkIns.userId], references: [users.id] }),
  wins: many(wins)
}))

export const winsRelations = relations(wins, ({ one }) => ({
  user: one(users, { fields: [wins.userId], references: [users.id] }),
  capture: one(captures, { fields: [wins.captureId], references: [captures.id] }),
  checkIn: one(checkIns, { fields: [wins.checkInId], references: [checkIns.id] })
}))

export const streaksRelations = relations(streaks, ({ one }) => ({
  user: one(users, { fields: [streaks.userId], references: [users.id] })
}))

export const eventsRelations = relations(events, ({ one }) => ({
  user: one(users, { fields: [events.userId], references: [users.id] }),
  person: one(persons, { fields: [events.personId], references: [persons.id] })
}))

export const personsRelations = relations(persons, ({ one, many }) => ({
  user: one(users, { fields: [persons.userId], references: [users.id] }),
  events: many(events)
}))

export const ideasRelations = relations(ideas, ({ one }) => ({
  user: one(users, { fields: [ideas.userId], references: [users.id] }),
  capture: one(captures, { fields: [ideas.captureId], references: [captures.id] })
}))

export const choresRelations = relations(chores, ({ one }) => ({
  user: one(users, { fields: [chores.userId], references: [users.id] })
}))

export const workItemsRelations = relations(workItems, ({ one }) => ({
  user: one(users, { fields: [workItems.userId], references: [users.id] })
}))

export const nudgesRelations = relations(nudges, ({ one }) => ({
  user: one(users, { fields: [nudges.userId], references: [users.id] })
}))
