import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import mediaDbApp from "@/app/api/[[...route]]/media-db"
import mediaS3App from "@/app/api/[[...route]]/media-S3";
import magicWrite from "@/app/api/[[...route]]/magic-write";


export const runtime = 'edge'

const app = new Hono().basePath('/api')
    .route("/media", mediaS3App)
    .route("/media_interact", mediaDbApp)
    .route("/magic-write", magicWrite)

export const GET = handle(app)
export const POST = handle(app)

export type AppType = typeof app