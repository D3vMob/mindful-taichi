// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { InferModel, InferSelectModel, sql } from "drizzle-orm";
import {
  boolean,
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

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
    role: varchar("role", { length: 5 }),
    imgUrl: varchar("img_url", { length: 256 }),
    active: boolean("active").default(false),
    fav: varchar("fav")
      .array()
      .default(sql`'{}'::text[]`),
    email: varchar("email", { length: 255 }),
    section: varchar("section", { length: 50 }),
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
    name: varchar("name", { length: 256 }),
    shortName: varchar("short_name", { length: 12 }),
    description: varchar("description", { length: 1024 }),
    imgUrl: varchar("img_url", { length: 256 }),
    active: boolean("active").default(false),
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

export type Channels = InferSelectModel<typeof channels>;
export type Users = InferSelectModel<typeof users>;
