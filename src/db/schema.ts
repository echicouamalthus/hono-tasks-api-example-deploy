import {boolean, pgTable, serial, text, timestamp} from "drizzle-orm/pg-core"
// import { integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// export const tasks = sqliteTable("tasks", {
//   id: integer("id", { mode: "number" })
//     .primaryKey({ autoIncrement: true }),
//   name: text("name")
//     .notNull(),
//   done: integer("done", { mode: "boolean" })
//     .notNull()
//     .default(false),
//   createdAt: integer("created_at", { mode: "timestamp" })
//     .$defaultFn(() => new Date()),
//   updatedAt: integer("updated_at", { mode: "timestamp" })
//     .$defaultFn(() => new Date())
//     .$onUpdate(() => new Date()),
// });

export const tasks = pgTable("tasks",{
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  done: boolean("done").notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updateAt: timestamp("update_at").notNull().defaultNow()
})

export const selectTasksSchema = createSelectSchema(tasks);

export const insertTasksSchema = createInsertSchema(
  tasks,
  {
    name: schema => schema.name.min(1).max(500),
  },
).required({
  done: true,
}).omit({
  id: true,
  createdAt: true,
  updateAt: true
});

export const patchTasksSchema = insertTasksSchema.partial();
