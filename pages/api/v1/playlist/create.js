/**
 * Gets request init options
 *
 * @param {string} accessToken
 */
function _getRequestInitOptions(accessToken, params) {
  return {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  };
}

/**
 * Search for tracks
 *
 * @param {string} accessToken
 * @returns tracks
 */
async function _createPlaylist(accessToken, userId, params) {
  const baseUrl = "https://api.spotify.com";
  const endpoint = `/v1/users/${userId}/playlists`;
  const api = baseUrl + endpoint;
  const response = await fetch(
    api,
    _getRequestInitOptions(accessToken, params)
  );
  if (response.status === 401) {
    //todo - refresh token
  }
  const data = await response.json();
  return data;
}

/**
 * get user id
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async function handler(req, res) {
  try {
    const { authorization } = req.headers;
    const { id } = req.body;
    const params = {
      name: "test 12345",
      description: "test description",
    };
    const results = await _createPlaylist(authorization, id, params);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
