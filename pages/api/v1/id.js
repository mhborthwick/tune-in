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
 * Gets user id
 *
 * @param {string} accessToken
 * @returns {Promise<Object>}
 */
async function _getUser(accessToken) {
  const baseUrl = "https://api.spotify.com";
  const endpoint = "/v1/me";
  const api = baseUrl + endpoint;
  const response = await fetch(api, _getRequestInitOptions(accessToken));
  if (response.status === 401) {
    //todo - refresh token
  }
  return await response.json();
}

/**
 * Parses data and gets user id
 *
 * @param {Object} data
 * @returns {string} id
 */
function _getId(data) {
  const { id } = data;
  return id;
}

/**
 * Gets user id
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async function handler(req, res) {
  try {
    const { authorization } = req.headers;
    const results = await _getUser(authorization);
    const id = _getId(results);
    res.status(200).json({ id: id });
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
