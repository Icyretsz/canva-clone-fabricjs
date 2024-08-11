import { Hono } from 'hono'
import { handle } from 'hono/vercel'


import imagesApp from "./images"
import mediaS3App from "@/app/api/[[...route]]/media-S3";


export const runtime = 'edge'

const app = new Hono().basePath('/api')

    .route("/upload", mediaS3App)

export const GET = handle(app)
export const POST = handle(app)

export type AppType = typeof app