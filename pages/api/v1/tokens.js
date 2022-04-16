import { NextApiRequest, NextApiResponse } from "next";

/**
 * Gets request init options
 *
 * @param {string} auth
 */
function _getRequestInitOptions(auth) {
  return {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(auth).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
}

/**
 * Gets request body
 *
 * @param {string} code
 * @param {string} verifier
 * @returns request body
 */
function _getRequestBody(code, verifier) {
  return {
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      code_verifier: verifier,
    }),
  };
}

/**
 * Gets tokens for auth
 *
 * @param {string} code
 * @param {string} verifier
 * @returns {Promise<{access_token: string, refresh_token: string}>}
 */
export async function _getTokens(code, verifier) {
  const baseUrl = "https://accounts.spotify.com";
  const endpoint = "/api/token";
  const auth =
    process.env.NEXT_PUBLIC_CLIENT_ID +
    ":" +
    process.env.NEXT_PUBLIC_CLIENT_SECRET;
  const api = baseUrl + endpoint;
  const response = await fetch(api, {
    ..._getRequestInitOptions(auth),
    ..._getRequestBody(code, verifier),
  });
  const json = await response.json();
  const { access_token, refresh_token } = json;
  return { access_token, refresh_token };
}

/**
 * Get tokens
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async function handler(req, res) {
  try {
    const { code, verifier } = req.cookies;
    const tokens = await _getTokens(code, verifier);
    res.status(200).json(tokens);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
