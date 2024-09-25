CREATE TABLE IF NOT EXISTS "media_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"url" text NOT NULL,
	CONSTRAINT "media_table_url_unique" UNIQUE("url")
);

ALTER TABLE mediaTable RENAME COLUMN 'url' TO 'fileName';

