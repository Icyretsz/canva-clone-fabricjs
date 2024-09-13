import {Hono} from 'hono';
import {getSignedURL} from '../s3-actions'

const mediaS3App = new Hono()
    .post('/put', async (c) => {

        try {
            const {fileName} = await c.req.json()

            const result = await getSignedURL(fileName, 'PUT')

            if (result.failure) {
                return c.json({error: result.failure}, 401)
            }
            return c.json({url: result.success?.url})
        } catch (error : any) {
            console.error('Error in /put route:', error);
            return c.json({ error: 'An unexpected error occurred.', details: error.message }, 500);
        }

    })
    .get('/get', async (c) => {
        try {
            const fileName = c.req.query('fileName');

            if (!fileName) {
                return c.json({error: 'File name required.'}, 500)
            }

            const result = await getSignedURL(fileName, 'GET')

            if (result.failure) {
                return c.json({error: result.failure}, 401)
            }
            return c.json({url: result.success?.url})
        } catch (error) {
            return c.json({error: 'An unexpected error occurred.'}, 500)
        }
    })
    .delete('/delete', async (c) => {
        try {
            const fileName = c.req.query('fileName');

            if (!fileName) {
                return c.json({error: 'File name required.'}, 500)
            }

            const result = await getSignedURL(fileName, 'DELETE')

            if (result.failure) {
                return c.json({error: result.failure}, 401)
            }
            return c.json({url: result.success?.url})
        } catch (error) {
            return c.json({error: 'An unexpected error occurred.'}, 500)
        }
    })

export default mediaS3App