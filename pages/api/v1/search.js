import { NextApiRequest, NextApiResponse } from "next";

/**
 * Gets query params
 *
 * @param {string} track
 */
function _getQueryParams(track) {
  return {
    q: track,
    type: "track",
    include_external: "audio&limit=1",
  };
}

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
 * @param {string} track
 * @returns tracks
 */
async function _search(accessToken, track) {
  const baseUrl = "https://api.spotify.com";
  const endpoint = "/v1/search";
  const params = _getQueryParams(track);
  const query = new URLSearchParams(params).toString();
  const api = baseUrl + endpoint + "?" + query;
  const response = await fetch(api, _getRequestInitOptions(accessToken));
  if (response.status === 401) {
    //todo - refresh token
  }
  const json = await response.json();
  return json;
}

/**
 * Parses data to return uris
 *
 * @param {Object} data
 * @returns {string[]} uris
 */
function _getUris(data) {
  return [data.tracks.items[0].uri];
}

/**
 * Search for tracks
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async function handler(req, res) {
  try {
    const { authorization } = req.headers;
    const { track } = req.body;
    const results = await _search(authorization, track);
    const uris = _getUris(results);
    res.status(200).json({ uris: uris });
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
