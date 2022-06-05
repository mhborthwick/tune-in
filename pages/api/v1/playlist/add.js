import { NextApiRequest, NextApiResponse } from "next";
import {
  getRequestInitOptions,
  getNewTokens,
} from "../../../../lib/helpers/index";

/**
 * Adds tracks to playlist
 *
 * @param {string} accessToken
 * @param {string} playListId
 * @param {string[]} trackUris
 * @returns {Promise<Object>}
 */
async function _addToPlaylist(accessToken, refresh, playlistId, trackUris) {
  const baseUrl = "https://api.spotify.com";
  const endpoint = `/v1/playlists/${playlistId}/tracks`;
  const api = baseUrl + endpoint;
  const details = { uris: trackUris };
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
 * Adds tracks to playlist
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async function handler(req, res) {
  try {
    const { authorization, refresh } = req.headers;
    const { id, uris } = req.body;
    const results = await _addToPlaylist(authorization, refresh, id, uris);
    if (results.error) {
      res.status(498).json(results);
    } else if (results.refresh_token) {
      res.status(401).json(results);
    } else {
      res.status(200).json(results);
    }
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
