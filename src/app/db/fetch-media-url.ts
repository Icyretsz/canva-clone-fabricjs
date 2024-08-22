
const FetchMediaUrl = async (userId : string) => {
        const GETURLDbResponse = await fetch(`/api/media-interact/get-img-url?userId=${userId}`, {
            method: 'GET',
        });
        if (!GETURLDbResponse.ok) {
            throw new Error('Failed to fetch media URLs');
        }
        return GETURLDbResponse.json();
}
export default FetchMediaUrl