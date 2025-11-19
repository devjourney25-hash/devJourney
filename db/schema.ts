import { relations } from "drizzle-orm";
import {
  varchar, 
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageSrc: text("image_src"), // Removed .notNull()
});

export const coursesRelations = relations(courses, ({ many }) => ({
  userProgress: many(userProgress),
  units: many(units),
  lessonModules: many(lessonModules),
}));

export const units = pgTable("units", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(), // Unit 1
  description: text("description").notNull(), // Learn the basics of spanish
  courseId: integer("course_id")
    .references(() => courses.id, {
      onDelete: "cascade",
    })
    .notNull(),
  order: integer("order").notNull(),
});

export const unitsRelations = relations(units, ({ many, one }) => ({
  course: one(courses, {
    fields: [units.courseId],
    references: [courses.id],
  }),
  lessons: many(lessons),
}));

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  unitId: integer("unit_id")
    .references(() => units.id, {
      onDelete: "cascade",
    })
    .notNull(),
  order: integer("order").notNull(),
});

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  unit: one(units, {
    fields: [lessons.unitId],
    references: [units.id],
  }),
  challenges: many(challenges),
}));

export const challengesEnum = pgEnum("type", ["SELECT"]);

export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id")
    .references(() => lessons.id, {
      onDelete: "cascade",
    })
    .notNull(),
  type: challengesEnum("type").notNull(),
  question: text("question").notNull(),
  order: integer("order").notNull(),
});

export const challengesRelations = relations(challenges, ({ one, many }) => ({
  lesson: one(lessons, {
    fields: [challenges.lessonId],
    references: [lessons.id],
  }),
  challengeOptions: many(challengeOptions),
  challengeProgress: many(challengeProgress),
}));

export const challengeOptions = pgTable("challenge_options", {
  id: serial("id").primaryKey(),
  challengeId: integer("challenge_id")
    .references(() => challenges.id, {
      onDelete: "cascade",
    })
    .notNull(),
  text: text("text").notNull(),
  correct: boolean("correct").notNull(),
  imageSrc: text("image_src"),
});

export const challengeOptionsRelations = relations(
  challengeOptions,
  ({ one }) => ({
    challenge: one(challenges, {
      fields: [challengeOptions.challengeId],
      references: [challenges.id],
    }),
  })
);

export const challengeProgress = pgTable("challenge_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  challengeId: integer("challenge_id")
    .references(() => challenges.id, {
      onDelete: "cascade",
    })
    .notNull(),
  completed: boolean("completed").notNull().default(false),
});

export const challengeProgressRelations = relations(
  challengeProgress,
  ({ one }) => ({
    challenge: one(challenges, {
      fields: [challengeProgress.challengeId],
      references: [challenges.id],
    }),
  })
);

export const userProgress = pgTable("user_progress", {
  userId: text("user_id").primaryKey(),
  userName: text("user_name").notNull().default("User"),
  userImageSrc: text("user_image_src").notNull().default("/mascot.svg"),
  activeCourseId: integer("active_course_id").references(() => courses.id, {
    onDelete: "cascade",
  }),
  hearts: integer("hearts").notNull().default(5),
  points: integer("points").notNull().default(0),
});

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  activeCourse: one(courses, {
    fields: [userProgress.activeCourseId],
    references: [courses.id],
  }),
}));

// Define the priority enum
export const priorityEnum = pgEnum('priority', ['LOW', 'MEDIUM', 'HIGH']);

// Daily tips table
export const dailyTips = pgTable('daily_tips', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  priority: priorityEnum('priority').notNull().default('MEDIUM'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// Type inference for TypeScript
export type DailyTip = typeof dailyTips.$inferSelect;
export type NewDailyTip = typeof dailyTips.$inferInsert;

// Lesson modules table
export const lessonModules = pgTable("lesson_modules", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id")
    .references(() => courses.id, { onDelete: "cascade" })
    .notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  
  concepts: text("concepts"), // JSON string array
  tip: text("tip"),
  order: integer("order").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const lessonModulesRelations = relations(lessonModules, ({ one, many }) => ({
  course: one(courses, {
    fields: [lessonModules.courseId],
    references: [courses.id],
  }),
  unitDetails: many(unitDetails), // ADD THIS LINE
}));

// Type inference
export type LessonModule = typeof lessonModules.$inferSelect;
export type NewLessonModule = typeof lessonModules.$inferInsert;

// Unit details table - NOW BELONGS TO LESSON MODULES
export const unitDetails = pgTable("unit_details", {
  id: serial("id").primaryKey(),
  lessonModuleId: integer("lesson_module_id") // CHANGED FROM unitId
    .references(() => lessonModules.id, { onDelete: "cascade" }) // CHANGED FROM units.id
    .notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(), // Detailed explanation
  sampleCode: text("sample_code"),
  codeExplanation: text("code_explanation"),
  keyPoints: text("key_points"), // JSON string array
  order: integer("order").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// Updated relations
export const unitDetailsRelations = relations(unitDetails, ({ one }) => ({
  lessonModule: one(lessonModules, { // CHANGED FROM unit
    fields: [unitDetails.lessonModuleId], // CHANGED FROM unitId
    references: [lessonModules.id], // CHANGED FROM units.id
  }),
}));

// Type exports
export type UnitDetail = typeof unitDetails.$inferSelect;
export type NewUnitDetail = typeof unitDetails.$inferInsert;

// Add this new table
export const questProgress = pgTable("quest_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  questId: integer("quest_id").notNull(), // This corresponds to quest.value
  claimed: boolean("claimed").default(false).notNull(),
  claimedAt: timestamp("claimed_at").defaultNow(),
});

// Add this relation
export const questProgressRelations = relations(questProgress, ({ one }) => ({
  userProgress: one(userProgress, {
    fields: [questProgress.userId],
    references: [userProgress.userId],
  }),
}));