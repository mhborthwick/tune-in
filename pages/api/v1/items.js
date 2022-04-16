import { NextApiRequest, NextApiResponse } from "next";

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
 * Get top items (artists/tracks)
 *
 * @param {string} accessToken
 * @param {string} type
 * @returns {Promise<Object>}
 */
async function _getTopItems(accessToken, type) {
  const baseUrl = "https://api.spotify.com";
  const endpoint = `/v1/me/top/${type}`;
  const api = baseUrl + endpoint;
  const response = await fetch(api, _getRequestInitOptions(accessToken));
  if (response.status === 401) {
    //todo - refresh token
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
    const { authorization } = req.headers;
    const { type } = req.query;
    const results = await _getTopItems(authorization, type);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
