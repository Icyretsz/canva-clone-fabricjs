import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const mediaTable = pgTable('media_table', {
    id: serial('id').primaryKey(),
    user_id: integer('user_id').notNull(),
    title: text('title'),
    url: text('url').notNull().unique(),
});

export type InsertMedia = typeof mediaTable.$inferInsert;
export type SelectMedia = typeof mediaTable.$inferSelect;
