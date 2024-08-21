import { Hono } from 'hono';
import {db} from '@/app/db/db';
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import {mediaTable} from "@/app/db/schema";

const mediaPostSchema = z.object({
    id: z.number().int().nonnegative(),
    user_id: z.number().int().nonnegative(),
    title: z.string().nullable(),
    url: z.string()
})

const mediaDbApp = new Hono()
    .post('/add-img-url', zValidator('json', mediaPostSchema), async (c) => {
    try {
        const body = await c.req.json();
        const { id, user_id, title, url } = body;

        await db.insert(mediaTable).values({
            id,
            user_id,
            title,
            url
        }).run();

        return c.json({ success: true });
    } catch (error) {
        return c.json({ success: false, message: error.message }, 500);
    }
});

export default mediaDbApp;