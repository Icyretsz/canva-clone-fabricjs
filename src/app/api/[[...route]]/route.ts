import { Hono } from 'hono'
import { handle } from 'hono/vercel'


import imagesApp from "./images"


export const runtime = 'edge'

const app = new Hono().basePath('/api')
    .route("/images", imagesApp)

export const GET = handle(app)
export const POST = handle(app)

export type AppType = typeof app