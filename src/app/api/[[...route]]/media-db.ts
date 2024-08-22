import {Hono} from 'hono';
import {db} from '@/app/db/db';
import {z} from 'zod'
import {zValidator} from '@hono/zod-validator'
import {mediaTable} from "@/app/db/schema";
import {useUser} from '@clerk/nextjs';
import { getAuth } from '@clerk/nextjs/server';
import {auth} from '@clerk/nextjs/server'
import {eq} from "drizzle-orm";

const mediaPostSchema = z.object({
    user_id: z.string(),
    url: z.string()
})

type MediaEntry = z.infer<typeof mediaPostSchema>;

const mediaDbApp = new Hono()
    .post('/add-img-url', zValidator('json', mediaPostSchema), async (c) => {
        if (!auth().sessionId) {
            return c.json({success: false, message: 'Unauthorized'}, 401);
        }
        try {
            const body = c.req.valid('json');
            const {user_id, url} = body;

            await db.insert(mediaTable).values({
                user_id,
                url
            }).execute();

            return c.json({success: true});
        } catch (error: any) {
            return c.json({success: false, message: error.message}, 500);
        }
    })
    .get('/get-img-url', async (c) => {
        try {
            const userId = c.req.query('userId');

            if (!userId) {
                return c.json({success: false, message: 'Unauthorized'}, 401);
            }
            const result: MediaEntry[] = await db.select({
                user_id: mediaTable.user_id,
                url: mediaTable.url
            }).from(mediaTable).where(eq(mediaTable.user_id, userId));

            return c.json({data: result}, 200);

        } catch (error: any) {
            return c.json({success: false, message: error.message}, 500);
        }
    });

export default mediaDbApp;