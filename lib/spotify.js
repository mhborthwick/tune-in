/**
 * Gets fetch request init options
 * @param {Object} data
 * @param {string} method GET | POST
 * @param {React.MutableRefObject<{access_token: string, refresh_token: string}>} tokens
 */
export async function getRequestInitOptions(data, method, tokens) {
  if (!tokens.current.access_token) {
    const response = await fetch("/api/v1/tokens");
    const json = await response.json();
    tokens.current.access_token = json.access_token;
    tokens.current.refresh_token = json.refresh_token;
  }
  return {
    headers: {
      authorization: tokens.current.access_token,
      "content-type": "application/json",
    },
    method: method,
    body: JSON.stringify(data),
  };
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
