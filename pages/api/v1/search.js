import { NextApiRequest, NextApiResponse } from "next";

/**
 * Gets query params
 */
function _getQueryParams() {
  return {
    q: "track:come and play in the milky night",
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
 * @returns tracks
 */
async function _search(accessToken) {
  const baseUrl = "https://api.spotify.com/";
  const endpoint = "v1/search";
  const params = _getQueryParams();
  const query = new URLSearchParams(params).toString();
  const api = baseUrl + endpoint + "?" + query;
  const response = await fetch(api, _getRequestInitOptions(accessToken));
  const data = await response.json();
  return data;
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
    const results = await _search(authorization);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
