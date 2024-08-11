CREATE TABLE IF NOT EXISTS "media_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"title" text,
	"url" text NOT NULL,
	CONSTRAINT "media_table_url_unique" UNIQUE("url")
);
