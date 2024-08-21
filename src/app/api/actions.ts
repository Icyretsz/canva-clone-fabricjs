'use server'

import {
    PutObjectCommand,
    GetObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3';
import {auth} from '@clerk/nextjs/server'
import {getSignedUrl} from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
    region: process.env.S3_BUCKET_REGION as string,
    forcePathStyle: false,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY as string,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
    },
});

type SignedURLResponse = Promise<
    | { failure?: undefined; success: { url: string } }
    | { failure: string | unknown; success?: undefined }
>;

export const getSignedURL = async (fileName: string, operation: 'PUT' | 'GET'): SignedURLResponse => {
    if (!auth().sessionId) {
        return {failure: "Unauthorized"};
    }
    let url : string = ''
    if (operation === 'PUT') {
        const putObjectCommand = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET!,
            Key: fileName,
        });
        url = await getSignedUrl(s3Client, putObjectCommand, {expiresIn: 60});

    } else if (operation === 'GET') {
        const getObjectCommand = new GetObjectCommand({
            Bucket: process.env.S3_BUCKET!,
            Key: fileName,
        });
        url = await getSignedUrl(s3Client, getObjectCommand, {expiresIn: 60});
    }
    return {success: {url}};
};






