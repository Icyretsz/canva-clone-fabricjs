import {InsertMedia} from "@/app/db/schema";

export async function insertMediaUrlToDb(newMedia : InsertMedia) {
    const response = await fetch('/api/media-interact/add-img-url', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMedia),
    });

    if (!response.ok) {
        throw new Error('Failed to add media from database');
    }
    return response.json();
}

export const fetchMediaUrlFromDb = async (userId : string) => {
    const GETURLDbResponse = await fetch(`/api/media-interact/get-img-url?userId=${userId}`, {
        method: 'GET',
    });
    if (!GETURLDbResponse.ok) {
        throw new Error('Failed to fetch media URLs from database');
    }
    return GETURLDbResponse.json();
}

export async function deleteMediaUrlFromDb(fileName : string) {
    const response = await fetch(`/api/media-interact/delete-img-url?fileName=${fileName}`, {
        method: 'POST',
    });

    if (!response.ok) {
        throw new Error('Failed to delete media from database');
    }
    return response.json();
}


