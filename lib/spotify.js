/**
 * Gets request init
 *
 * @param {string} accessToken
 */
function _getRequestInit(accessToken) {
  return {
    headers: {
      authorization: accessToken,
    },
  };
}

/**
 * Search for tracks
 *
 * @param {string} api
 * @param {string} accessToken
 * @returns
 */
export async function search(accessToken) {
  const api = "/api/v1/search";
  const init = _getRequestInit(accessToken);
  return await fetch(api, init);
}
