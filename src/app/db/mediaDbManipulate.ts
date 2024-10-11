import {mediaType} from "@/app/db/schema";
import {client} from '@/app/api/[[...route]]/hono'


export async function insertMediaToDb(newMedia : mediaType) {
    const newMediaJson = {
        json : newMedia
    }
    const POSTImgDbResponse = await client.api.media_interact.add_img_db.$post(newMediaJson)
    if (!POSTImgDbResponse.ok) {
        throw new Error('Failed to add media to database');
    }
    return POSTImgDbResponse.json();
}

export const fetchMediaFromDb = async () => {
    const GETImgDbResponse = await client.api.media_interact.get_img_db.$get()
    if (!GETImgDbResponse.ok) {
        throw new Error('Failed to fetch media URLs from database');
    }
    return GETImgDbResponse.json();
}

export async function deleteMediaFromDb(fileName : string) {
    const DELImgDbResponse = await client.api.media_interact.delete_img_db.$post({
        json : fileName
    })

    if (!DELImgDbResponse.ok) {
        throw new Error('Failed to delete media from database');
    }
    return DELImgDbResponse.json();
}


