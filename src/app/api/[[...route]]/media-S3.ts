import {Hono} from 'hono';
import {getSignedURL} from '../s3-actions'
import {auth} from '@clerk/nextjs/server'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'

const mediaS3App = new Hono()
    .post('/put', clerkMiddleware(), async (c) => {
        const auth = getAuth(c)
        if (!auth?.userId) {
            return c.json({error: 'Unauthorized'}, 401)
        }
        try {
            const {fileName} = await c.req.json()

            const result = await getSignedURL(fileName, 'PUT')

            if (result.failure) {
                return c.json({error: 'Error when fetching putSignedUrl from S3: ', details: result.failure}, 500)
            }
            return c.json({url: result.success?.url})
        } catch (error: any) {
            console.error('Error in /put route:', error);
            return c.json({error: 'An unexpected error occurred.', details: error.message}, 500);
        }
    })
    .get('/get', clerkMiddleware(), async (c) => {
        const auth = getAuth(c)
        if (!auth?.userId) {
            return c.json({error: 'Unauthorized'}, 401)
        }
        try {
            const fileName = c.req.query('fileName');

            if (!fileName) {
                return c.json({error: 'File name required.'}, 500)
            }

            const result = await getSignedURL(fileName, 'GET')

            if (result.failure) {
                return c.json({error: 'Error when fetching getSignedUrl from S3: ', details: result.failure}, 500)
            }
            return c.json({url: result.success?.url})
        } catch (error: any) {
            console.error('Error in /get route:', error);
            return c.json({error: 'An unexpected error occurred.', details: error.message}, 500);
        }
    })
    .post('/delete', clerkMiddleware(), async (c) => {
        const auth = getAuth(c)
        if (!auth?.userId) {
            return c.json({error: 'Unauthorized'}, 401)
        }
        try {
            const fileName = c.req.query('fileName');

            if (!fileName) {
                return c.json({error: 'File name required.'}, 400)
            }

            const result = await getSignedURL(fileName, 'DELETE')

            if (result.failure) {
                return c.json({error: 'Error when fetching deleteSignedUrl from S3: ', details: result.failure}, 500)
            }
            return c.json({url: result.success?.url})
        } catch (error: any) {
            console.error('Error in /delete route:', error);
            return c.json({error: 'An unexpected error occurred.', details: error.message}, 500);
        }
    })

export default mediaS3App