import { NextApiRequest, NextApiResponse } from "next";
import { getRequestInitOptions } from "../../../../lib/helpers/index";

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
    const baseUrl = "https://accounts.spotify.com";
    const endpoint = "/api/token";
    const api = baseUrl + endpoint;
    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refresh,
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      }),
    });
    const data = await response.json();
    return data;
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
