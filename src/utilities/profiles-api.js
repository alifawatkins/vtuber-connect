import sendRequest from './send-request';

const BASE_URL = '/api/profiles';

export function getProfile(profileId) {
  return sendRequest(`${BASE_URL}/${profileId}`);
}

export function getAll() {
    return sendRequest(BASE_URL);
}

export function getSelfProfile() {
    return sendRequest(`${BASE_URL}/getSelfProfile`, 'GET')
}