import { NextApiRequest, NextApiResponse } from "next";
import {
  getRequestInitOptions,
  getNewTokens,
} from "../../../lib/helpers/index";

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
 * Parses data and returns track uris
 *
 * @param {Object} data
 * @returns {string[]} uris
 */
function _getUris(data) {
  return [data.tracks.items[0].uri];
}

/**
 * Searches for tracks
 *
 * @param {string} accessToken
 * @param {string} track
 * @returns {Promise<Object>}
 */
async function _search(accessToken, refresh, track) {
  const baseUrl = "https://api.spotify.com";
  const endpoint = "/v1/search";
  const params = _getQueryParams(track);
  const query = new URLSearchParams(params).toString();
  const api = baseUrl + endpoint + "?" + query;
  const response = await fetch(api, getRequestInitOptions(accessToken, "GET"));
  if (response.status === 401) {
    return await getNewTokens(refresh);
  }
  const json = await response.json();
  return json;
}

/**
 * Search for tracks
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async function handler(req, res) {
  try {
    const { authorization, refresh } = req.headers;
    const { track } = req.body;
    const results = await _search(authorization, refresh, track);
    if (results.error) {
      res.status(498).json(results);
    } else if (results.refresh_token) {
      res.status(401).json(results);
    } else {
      const uris = _getUris(results);
      res.status(200).json({ uris: uris });
    }
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
