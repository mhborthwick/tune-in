import { getTokens } from "../utils/auth";

/**
 * Gets fetch request init options
 * @param {string} method GET | POST
 * @param {React.MutableRefObject<{access_token: string, refresh_token: string}>} tokens
 * @param {Object} data
 */
export async function getRequestInitOptions(method, tokens, data = {}) {
  if (!tokens.current.access_token) {
    const response = await getTokens();
    const json = await response.json();
    tokens.current.access_token = json.access_token;
    tokens.current.refresh_token = json.refresh_token;
  }
  if (method === "POST") {
    return {
      headers: {
        authorization: tokens.current.access_token,
        "content-type": "application/json",
      },
      method: method,
      body: JSON.stringify(data),
    };
  } else if (method === "GET") {
    return {
      headers: {
        authorization: tokens.current.access_token,
        "content-type": "application/json",
      },
      method: method,
    };
  } else {
    throw Error(`method should be GET or POST, received ${method}`);
  }
}

/**
 * Search for tracks
 *
 * @param {string} api
 * @param {string} accessToken
 */
export async function search(options) {
  const api = "/api/v1/search";
  return await fetch(api, options);
}

/**
 * get user id
 *
 * @param {string} api
 * @param {string} accessToken
 */
export async function getUserId(options) {
  const api = "/api/v1/id";
  return await fetch(api, options);
}
