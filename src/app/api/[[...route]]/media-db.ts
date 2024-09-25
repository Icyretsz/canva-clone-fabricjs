import {Hono} from 'hono';
import {db} from '@/app/db/db';
import {z} from 'zod'
import {zValidator} from '@hono/zod-validator'
import {mediaTable} from "@/app/db/schema";
import {auth} from '@clerk/nextjs/server'
import {and, eq} from "drizzle-orm";

const mediaPostSchema = z.object({
    user_id: z.string(),
    fileName: z.string()
})

type MediaEntry = z.infer<typeof mediaPostSchema>;

const mediaDbApp = new Hono()
    .post('/add-img-db', zValidator('json', mediaPostSchema), async (c) => {
        const userId = auth().userId
        if (!userId) {
            return c.json({success: false, message: 'Unauthorized'}, 401);
        }
        try {
            const body = c.req.valid('json');
            const {user_id, fileName} = body;

            await db.insert(mediaTable).values({
                user_id,
                fileName
            }).execute();

            return c.json({success: true});
        } catch (error: any) {
            return c.json({success: false, message: error.message}, 500);
        }
    })
    .get('/get-img-db', async (c) => {
        try {
            const userIdServer = auth().userId

            if (!userIdServer) {
                return c.json({success: false, message: 'Unauthorized'}, 401);
            }

            const result: MediaEntry[] = await db.select({
                user_id: mediaTable.user_id,
                fileName: mediaTable.fileName
            }).from(mediaTable).where(eq(mediaTable.user_id, userIdServer));

            return c.json({data: result}, 200);

        } catch (error: any) {
            return c.json({success: false, message: error.message}, 500);
        }
    })
    .post('/delete-img-db', async (c) => {
        try {
            const fileName = c.req.query('fileName');
            const userId = auth().userId

            if (!userId) {
                return c.json({success: false, message: 'Unauthorized'}, 401);
            }

            const result = await db.delete(mediaTable)
                .where(
                    and(
                        eq(mediaTable.user_id, userId),
                        eq(mediaTable.fileName, fileName!)
                    )
                );

            return c.json({data: result}, 200);

        } catch (error: any) {
            return c.json({success: false, message: error.message}, 500);
        }
    });

export default mediaDbApp;