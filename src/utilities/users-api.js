import sendRequest from "./send-request";
const BASE_URL = '/api/users';

//* SignUp
export function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}


//* Login
export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

//* Check Token
export function checkToken() {
    return sendRequest(`${BASE_URL}/check-token`)
}