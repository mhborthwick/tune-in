import { NextApiRequest, NextApiResponse } from "next";
import {
  getRequestInitOptions,
  getNewTokens,
} from "../../../lib/helpers/index";

/**
 * Get top items (artists/tracks)
 *
 * @param {string} accessToken
 * @param {string} type
 * @returns {Promise<Object>}
 */
async function _getTopItems(accessToken, refresh, type) {
  const baseUrl = "https://api.spotify.com";
  const endpoint = `/v1/me/top/${type}`;
  const api = baseUrl + endpoint;
  const response = await fetch(api, getRequestInitOptions(accessToken, "GET"));
  if (response.status === 401) {
    return await getNewTokens(refresh);
  }
  return await response.json();
}

/**
 * Gets top items (artists/tracks)
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async function handler(req, res) {
  try {
    const { authorization, refresh } = req.headers;
    const { type } = req.query;
    const results = await _getTopItems(authorization, refresh, type);
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
