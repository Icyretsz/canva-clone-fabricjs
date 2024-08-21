import { Hono } from 'hono';
import {db} from '@/app/db/db';
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import {mediaTable} from "@/app/db/schema";

const mediaPostSchema = z.object({
    user_id: z.string(),
    url: z.string()
})

const mediaDbApp = new Hono()
    .post('/add-img-url', zValidator('json', mediaPostSchema), async (c) => {
    try {
        const body = c.req.valid('json');
        const {user_id, url } = body;

        await db.insert(mediaTable).values({
            user_id,
            url
        }).execute();

        return c.json({ success: true });
    } catch (error : any) {
        return c.json({ success: false, message: error.message }, 500);
    }
});

export default mediaDbApp;