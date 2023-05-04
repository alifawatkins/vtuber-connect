import sendRequest from './send-request';

const BASE_URL = '/api/favorites';

export async function addFavorite(userProfile) {
    return sendRequest(BASE_URL, 'POST', userProfile);
}

export async function removeFavorite(favoriteId) {
    return sendRequest(`${BASE_URL}/${favoriteId}`, 'DELETE');
}