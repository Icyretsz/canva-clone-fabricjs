import { Hono } from 'hono';
import {getSignedURL} from '../actions'

const mediaS3App = new Hono()
 .post('/', async (c) => {

     try {
     const {fileName} = await c.req.json()

     const result = await getSignedURL(fileName)

     if (result.failure) {
         return c.json({ error: result.failure}, 401)
     }
     return c.json({ url: result.success?.url})
     } catch (error) {
         return c.json({ error : 'An unexpected error occurred.'}, 500)
     }

 })

export default mediaS3App