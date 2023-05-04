import sendRequest from './send-request';

const BASE_URL = '/api/profiles';

export default async function getProfile(profileId) {
  return sendRequest(`${BASE_URL}/${profileId}`);
}

export async function getAll() {
    return sendRequest(BASE_URL);
}

export function getSelfProfile(userId) {
  return sendRequest(`${BASE_URL}/getSelfProfile/${userId}`);
}

export async function createProfile(profileData) {
  return sendRequest(BASE_URL, 'POST', profileData);
}

export async function updateProfile(profileId, profileData) {
  return sendRequest(`${BASE_URL}/${profileId}`, 'PUT', profileData);
}

export async function getFavorites(userId) {
  return sendRequest(`${BASE_URL}/favorites/${userId}`)
}