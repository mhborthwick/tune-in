import { NextApiRequest, NextApiResponse } from "next";

/**
 * Gets request init options
 *
 * @param {string} accessToken
 */
function _getRequestInitOptions(accessToken, trackUris) {
  return {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uris: trackUris }),
  };
}

/**
 * Adds tracks to playlist
 *
 * @param {string} accessToken
 * @param {string} playListId
 * @param {string[]} trackUris
 * @returns {Promise<Object>}
 */
async function _addToPlaylist(accessToken, playlistId, trackUris) {
  const baseUrl = "https://api.spotify.com";
  const endpoint = `/v1/playlists/${playlistId}/tracks`;
  const api = baseUrl + endpoint;
  const response = await fetch(
    api,
    _getRequestInitOptions(accessToken, trackUris)
  );
  console.log(response);
  if (response.status === 401) {
    //todo - refresh token
  }
  const data = await response.json();
  return data;
}

/**
 * Adds tracks to playlist
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async function handler(req, res) {
  try {
    const { authorization } = req.headers;
    const { id, uris } = req.body;
    const results = await _addToPlaylist(authorization, id, uris);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
