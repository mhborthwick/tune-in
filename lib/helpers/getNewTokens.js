/**
 * Generates new tokens
 *
 * @param {string} refreshToken
 * @returns {Promise<{access_token: string, refresh_token: string}>}
 */
export async function getNewTokens(refreshToken) {
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
      refresh_token: refreshToken,
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
    }),
  });
  const data = await response.json();
  return data;
}
