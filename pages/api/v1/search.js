import { NextApiRequest, NextApiResponse } from "next";
import { search } from "../../../lib/spotify";

/**
 * get tokens
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async function handler(req, res) {
  try {
    const { authorization } = req.headers;
    const results = await search(authorization);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
