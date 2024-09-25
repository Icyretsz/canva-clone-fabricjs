import {InsertMedia} from "@/app/db/schema";

export async function insertMediaToDb(newMedia : InsertMedia) {
    const response = await fetch('/api/media-interact/add-img-db', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMedia),
    });

    if (!response.ok) {
        throw new Error('Failed to add media to database');
    }
    return response.json();
}

export const fetchMediaFromDb = async () => {
    const GETImgDbResponse = await fetch(`/api/media-interact/get-img-db`, {
        method: 'GET',
    });
    if (!GETImgDbResponse.ok) {
        throw new Error('Failed to fetch media URLs from database');
    }
    return GETImgDbResponse.json();
}

export async function deleteMediaFromDb(fileName : string) {
    const response = await fetch(`/api/media-interact/delete-img-db?fileName=${fileName}`, {
        method: 'POST',
    });

    if (!response.ok) {
        throw new Error('Failed to delete media from database');
    }
    return response.json();
}


