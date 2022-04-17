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
 * Gets recommmendations
 */
async function _getRecommendations(accessToken, params) {
  const baseUrl = "https://api.spotify.com";
  const endpoint = "/v1/recommendations";
  const query = new URLSearchParams(params).toString();
  const api = baseUrl + endpoint + "?" + query;
  const response = await fetch(api, _getRequestInitOptions(accessToken));
  if (response.status === 401) {
    //todo - refresh token
  }
  const data = await response.json();
  return data;
}

/**
 * Gets recommendations
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async function handler(req, res) {
  try {
    const { authorization } = req.headers;
    const {
      seedArtists,
      seedGenres,
      seedTracks,
      targetDanceability,
      targetEnergy,
      targetLoudness,
      targetPopularity,
    } = req.body;
    const params = {
      seed_artists: seedArtists,
      seed_genres: seedGenres,
      seed_tracks: seedTracks,
      target_danceability: targetDanceability,
      target_energy: targetEnergy,
      target_loudness: targetLoudness,
      target_popularity: targetPopularity,
    };
    const results = await _getRecommendations(authorization, params);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
