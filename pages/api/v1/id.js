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
 * Search for tracks
 *
 * @param {string} accessToken
 * @returns tracks
 */
async function _getUserId(accessToken) {
  const baseUrl = "https://api.spotify.com/";
  const endpoint = "v1/me";
  const api = baseUrl + endpoint;
  const response = await fetch(api, _getRequestInitOptions(accessToken));
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
    const results = await _getUserId(authorization);
    const id = { id: results.id };
    res.status(200).json(id);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
