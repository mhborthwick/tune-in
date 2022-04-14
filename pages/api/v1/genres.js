/**
 * Gets request init options
 *
 * @param {string} accessToken
 */
function _getRequestInitOptions(accessToken) {
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
 * Get genre seeds
 *
 * @param {string} accessToken
 * @returns {Promise<{genres: string[]}>}
 */
async function _getGenres(accessToken) {
  const baseUrl = "https://api.spotify.com";
  const endpoint = "/v1/recommendations/available-genre-seeds";
  const api = baseUrl + endpoint;
  const response = await fetch(api, _getRequestInitOptions(accessToken));
  if (response.status === 401) {
    //todo - refresh token
  }
  return await response.json();
}

/**
 * Gets genres
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async function handler(req, res) {
  try {
    const { authorization } = req.headers;
    const results = await _getGenres(authorization);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
