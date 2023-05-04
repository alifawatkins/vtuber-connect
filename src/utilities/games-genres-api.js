import sendRequest from './send-request';

const BASE_URL = '/api/gamesGenres';

export default async function getGamesGenres() {
    return sendRequest(BASE_URL);
}

export async function createGamesGenre(formData) {
    return sendRequest(BASE_URL, 'POST', formData);
}

export async function deleteGamesGenre(gamesGenreId) {
    return sendRequest(`${BASE_URL}/${gamesGenreId}`, 'DELETE');
}