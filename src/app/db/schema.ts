import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod'
export const mediaTable = pgTable('media_table', {
    id: serial('id').primaryKey(),
    user_id: text('user_id').notNull(),
    fileName: text('fileName').notNull().unique(),
});

export const mediaSchema = createInsertSchema(mediaTable)
export type mediaType = typeof mediaTable.$inferInsert;
