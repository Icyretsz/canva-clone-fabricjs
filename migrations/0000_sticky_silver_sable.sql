CREATE TABLE IF NOT EXISTS "media_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"url" text NOT NULL,
	CONSTRAINT "media_table_url_unique" UNIQUE("url")
);

ALTER TABLE media_table RENAME COLUMN "url" TO "fileName"
END $$;

