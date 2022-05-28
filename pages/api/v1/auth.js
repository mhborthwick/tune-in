/**
 * Get auth tokens
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async function handler(req, res) {
  try {
    const { access_token, refresh_token } = req.cookies;
    res.status(200).json({ access_token, refresh_token });
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
