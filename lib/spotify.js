/**
 * Gets query params
 */
function _getQueryParams() {
  return {
    q: "track:come and play in the milky night",
    type: "track",
    include_external: "audio&limit=1",
  };
}

/**
 * Gets request client
 *
 * @param {string} accessToken
 */
function _getRequestClient(accessToken) {
  return {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
}

/**
 * Search for tracks
 *
 * @param {string} accessToken
 * @returns tracks
 */
export async function search(accessToken) {
  const baseUrl = "https://api.spotify.com/";
  const endpoint = "v1/search";
  const params = _getQueryParams();
  const query = new URLSearchParams(params).toString();
  const api = baseUrl + endpoint + "?" + query;
  const response = await fetch(api, _getRequestClient(accessToken));
  const data = await response.json();
  return data;
}
