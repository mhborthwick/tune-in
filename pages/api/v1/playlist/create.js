import { NextApiRequest, NextApiResponse } from "next";
import {
  getRequestInitOptions,
  getNewTokens,
} from "../../../../lib/helpers/index";

/**
 * Parses data and returns playlist id
 *
 * @param {Object} data
 * @returns {string} id
 */
function _getPlaylistId(data) {
  const { id } = data;
  return id;
}

/**
 * Creates playlist
 *
 * @param {string} accessToken
 * @param {string} userId
 * @param {{name: string, description: string}} details
 * @returns {Promise<Object>}
 */
async function _createPlaylist(accessToken, refresh, userId, details) {
  const baseUrl = "https://api.spotify.com";
  const endpoint = `/v1/users/${userId}/playlists`;
  const api = baseUrl + endpoint;
  const response = await fetch(
    api,
    getRequestInitOptions(accessToken, "POST", details)
  );
  if (response.status === 401) {
    return await getNewTokens(refresh);
  }
  const data = await response.json();
  return data;
}

/**
 * Creates playlist
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async function handler(req, res) {
  try {
    const { authorization, refresh } = req.headers;
    const { id, name, description } = req.body;
    const details = { name: name, description: description };
    const results = await _createPlaylist(authorization, refresh, id, details);
    if (results.error) {
      res.status(498).json(results);
    } else if (results.refresh_token) {
      res.status(401).json(results);
    } else {
      const playlistId = _getPlaylistId(results);
      res.status(200).json({ id: playlistId });
    }
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
