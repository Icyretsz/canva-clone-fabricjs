'use server'

import {
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3';
// @ts-ignore
import { v4 } from 'uuid';
import { auth } from '@clerk/nextjs/server'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
    region: process.env.S3_BUCKET_REGION as string,
    forcePathStyle: true,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY as string,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
    },
});

type SignedURLResponse = Promise<
    | { failure?: undefined; success: { url: string } }
    | { failure: string | unknown; success?: undefined }
>;

export const getSignedURL = async (fileName : string): SignedURLResponse => {
    if (!auth().sessionId) {
        return { failure: "Unauthorized" };
    }

    const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET!,
        Key: `${v4()}-${Date.now()}`,
    });
    const url = await getSignedUrl(s3Client, putObjectCommand, { expiresIn: 60 });
        return { success: { url } };
};






