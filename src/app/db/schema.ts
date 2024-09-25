import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const mediaTable = pgTable('media_table', {
    id: serial('id').primaryKey(),
    user_id: text('user_id').notNull(),
    fileName: text('fileName').notNull().unique(),
});

export type InsertMedia = typeof mediaTable.$inferInsert;
export type SelectMedia = typeof mediaTable.$inferSelect;
