import { zValidator } from '@hono/zod-validator';

import { Hono } from 'hono';

import { uploadMedia, getMedia, deleteMedia } from '@/app/api/actions'
import {z} from "zod";
import * as stream from "node:stream";

const mediaRoute = new Hono();

const mediaSchema = z.object({
    id: z.number().int(),
    title: z.string(),
    url: z.string()
})

mediaRoute.post(
    '/',
    zValidator('media', uploadMediaSchema),
     async(c) => {
        const fileData = c.req.valid('media');
        try {
            const docId = await uploadMedia(fileData.file);
            return c.json({id: docId}, 201);
        } catch (error) {
            console.error(error);
            return c.json({error: 'Failed to upload file', details: error}, 500);
        }
    }
);

// Get a document
mediaRoute.get(
    '/:docId',
    async (c) => {
        const docId = c.req.param('docId');
        try {
            const object = await getMedia(docId);
            // our object contains the data and the content type
            const byteArray = await object.data;
            if (byteArray === undefined) {
                return c.json({error: 'Failed to read file'}, 500);
            }

            // Set the content type of the file in header to be understandable
            // by clients
            c.header('Content-Type', object.contentType);

            // Just stream the byte array (with content type it will be interpreted
            // in the good way)
            return stream(c, async (stream) => {
                // Write a process to be executed when aborted.
                stream.onAbort(() => {
                    console.log('Aborted!');
                });
                await stream.write(byteArray);
            });
        } catch (error) {
            return c.json({error: 'Failed to read file'}, 500);
        }
    }
);

mediaRoute.delete(
    '/:docId',
    async (c) => {
        const docId = c.req.param('docId');
        try {
            await deleteMedia(docId);
            return c.status(204);
        } catch (error) {
            return c.json({ error: 'Failed to delete file' }, 500);
        }
    });

export default mediaRoute;