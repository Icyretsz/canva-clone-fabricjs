ALTER TABLE "media_table" RENAME COLUMN "url" TO "fileName";--> statement-breakpoint
ALTER TABLE "media_table" DROP CONSTRAINT "media_table_url_unique";--> statement-breakpoint
ALTER TABLE "media_table" ADD CONSTRAINT "media_table_fileName_unique" UNIQUE("fileName");