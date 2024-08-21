import {InsertMedia} from "@/app/db/schema";

async function AddMedia(newMedia : InsertMedia) {
    const response = await fetch('/api/add-item', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMedia),
    });

    if (!response.ok) {
        throw new Error('Failed to add item');
    }
    return response.json();
}

export default AddMedia
