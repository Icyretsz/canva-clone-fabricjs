import {InsertMedia} from "@/app/db/schema";

async function AddMedia(newMedia : InsertMedia) {
    const response = await fetch('/api/add-item/add-img-url', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMedia),
    });

    if (!response.ok) {
        throw new Error('Failed to add media');
    }
    return response.json();
}

export default AddMedia
