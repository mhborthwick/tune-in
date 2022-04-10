import { NextApiRequest, NextApiResponse } from "next";
import { getTokens } from "../../../utils/auth";

/**
 * get tokens
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async function handler(req, res) {
  try {
    const { code, verifier } = req.cookies;
    const tokens = await getTokens(code, verifier);
    res.status(200).json(tokens);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
