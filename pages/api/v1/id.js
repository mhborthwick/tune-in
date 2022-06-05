import { NextApiRequest, NextApiResponse } from "next";
import { getRequestInitOptions } from "../../../lib/helpers/index";

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
 * @param {string} accessToken
 * @returns {Promise<Object>}
 */
async function _getUser(accessToken, refresh) {
  const baseUrl = "https://api.spotify.com";
  const endpoint = "/v1/me";
  const api = baseUrl + endpoint;
  const response = await fetch(api, getRequestInitOptions(accessToken, "GET"));
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
  return await response.json();
}

/**
 * Gets user id
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async function handler(req, res) {
  try {
    const { authorization, refresh } = req.headers;
    const results = await _getUser(authorization, refresh);
    const id = _getId(results);
    if (results.error) {
      res.status(498).json(results);
    } else if (results.refresh_token) {
      res.status(401).json(results);
    } else {
      res.status(200).json({ id: id });
    }
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
