import crypto from "crypto";

/**
 * Base64 encodes a buffer object
 *
 * @param {Buffer} buffer
 * @returns {string}
 */
function _base64URLEncode(buffer) {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

/**
 * Creates a code challenge
 *
 * @param {string} str
 * @returns {Buffer}
 */
function _sha256(str) {
  return crypto.createHash("sha256").update(str).digest();
}

/**
 * Get verifier and challenge for pkce auth
 *
 * @returns {{ verifier: string, challenge: string }} verifier and challenge
 */
export function getCodeChallenge() {
  const verifier = _base64URLEncode(crypto.randomBytes(32));
  const challenge = _base64URLEncode(_sha256(verifier));
  return { verifier, challenge };
}

/**
 * Gets default auth params
 *
 * @param {string} scope
 * @param {string} state
 * @param {string} challenge
 */
export function getAuthParams(scope, state, challenge) {
  return {
    response_type: "code",
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
    scope: scope,
    redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
    state: state,
    code_challenge_method: "S256",
    code_challenge: challenge,
  };
}

/**
 * Redirects user to initiate auth flow
 *
 * @param {string} query
 */
export function redirectToAuthUrl(query) {
  const baseUrl = "https://accounts.spotify.com";
  const api = baseUrl + "/authorize" + "?" + query;
  window.location.replace(api);
}

/**
 * Gets code param query string
 *
 * @returns {string}
 */
export function getCodeFromQuery() {
  const query = window.location.search;
  return new URLSearchParams(query).get("code");
}
