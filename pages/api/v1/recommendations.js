import { NextApiRequest, NextApiResponse } from "next";
import { getRequestInitOptions } from "../../../lib/helpers/index";

/**
 * Gets recommmendations
 */
async function _getRecommendations(accessToken, refresh, params) {
  const baseUrl = "https://api.spotify.com";
  const endpoint = "/v1/recommendations";
  const query = new URLSearchParams(params).toString();
  const api = baseUrl + endpoint + "?" + query;
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
    const { authorization, refresh } = req.headers;
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
    const results = await _getRecommendations(authorization, refresh, params);
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
