import {Hono} from 'hono';
import {db} from '@/app/db/db';
import {z} from 'zod'
import {zValidator} from '@hono/zod-validator'
import {mediaTable} from "@/app/db/schema";
import {auth} from '@clerk/nextjs/server'
import {and, eq} from "drizzle-orm";
import {clerkMiddleware, getAuth} from "@hono/clerk-auth";

const mediaPostSchema = z.object({
    user_id: z.string(),
    fileName: z.string()
})

type MediaEntry = z.infer<typeof mediaPostSchema>;

const mediaDbApp = new Hono()
    .post('/add_img_db', zValidator('json', mediaPostSchema), clerkMiddleware(), async (c) => {
        const auth = getAuth(c)
        const userId = auth?.userId
        if (!userId) {
            return c.json({error: 'Unauthorized'}, 401);
        } else {
            try {
                const body = c.req.valid('json');
                const {user_id, fileName} = body;

                await db.insert(mediaTable).values({
                    user_id,
                    fileName
                }).execute();

                return c.json({success: true});
            } catch (error: any) {
                return c.json({error: error.message}, 500);
            }
        }
    })
    .get('/get_img_db', clerkMiddleware(), async (c) => {
        const auth = getAuth(c)
        const userId = auth?.userId
        if (!userId) {
            return c.json({error: 'Unauthorized'}, 401);
        } else {
            try {
                const result: MediaEntry[] = await db.select({
                    user_id: mediaTable.user_id,
                    fileName: mediaTable.fileName
                }).from(mediaTable).where(eq(mediaTable.user_id, userId));

                return c.json({data: result});

            } catch (error: any) {
                return c.json({error: error.message}, 500);
            }
        }
    })
    .post('/delete_img_db', clerkMiddleware(), async (c) => {
        const auth = getAuth(c)
        const userId = auth?.userId
        if (!userId) {
            return c.json({error: 'Unauthorized'}, 401);
        } else {
            try {
                const fileName = c.req.query('fileName');

                const result = await db.delete(mediaTable)
                    .where(
                        and(
                            eq(mediaTable.user_id, userId),
                            eq(mediaTable.fileName, fileName!)
                        )
                    );

                return c.json({data: result});

            } catch (error: any) {
                return c.json({error: error.message}, 500);
            }
        }
    });

export default mediaDbApp;