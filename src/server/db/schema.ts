// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { type InferSelectModel, sql } from "drizzle-orm";
import {
  boolean,
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

// import { promises as fs } from 'fs';
// import { db } from ".";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((users) => `mindful-taichi_${users}`);

export const users = createTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    surname: varchar("surname", { length: 256 }),
    role: varchar("role", { length: 7 }),
    uuid: varchar("uuid", { length: 256 }),
    active: boolean("active").default(false),
    fav: varchar("fav")
      .array()
      .default(sql`'{}'::text[]`),
    email: varchar("email", { length: 255 }),
    section: varchar("section", { length: 255 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    nameIdex: index("name_idex").on(example.name),
    surnameIdex: index("surname_idex").on(example.surname),
  }),
);

export const channels = createTable(
  "channels",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    shortName: varchar("short_name", { length: 12 }).notNull(),
    description: varchar("description", { length: 1024 }),
    playlistId: varchar("playlist_id", { length: 1024 }).notNull(),
    active: boolean("active").default(false).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    nameIdex: index("channels_name_idex").on(example.name),
  }),
);

export const posts = createTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    content: varchar("post_content", { length: 4000 }).notNull(),
    imgUrl: varchar("img_url", { length: 1024 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    contentIdex: index("text_content_idex").on(example.content),
  }),
);

export const schedule = createTable(
  "schedule",
  {
    id: serial("id").primaryKey(),
    content: varchar("shedule_content", { length: 4000 }).notNull(),
    imgUrl: varchar("img_url", { length: 1024 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    contentIdex: index("schedule_content_idex").on(example.content),
  }),
);

export type Schedule = InferSelectModel<typeof posts>;
export type InsertSchedule = Omit<Schedule, "id"> & { id?: number };

export type Posts = InferSelectModel<typeof posts>;
export type InsertPost = Omit<Posts, "id"> & { id?: number };

export type Channels = InferSelectModel<typeof channels>;
export type InsertChannel = Omit<Channels, "id, createdAt, updatedAt"> & {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Users = InferSelectModel<typeof users>;
export type InsertUser = Omit<Users, "id"> & { id?: number };
