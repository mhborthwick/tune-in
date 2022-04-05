import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

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
 * Gets default auth params
 *
 * @param {string} scope
 * @param {string} state
 * @param {string} challenge
 */
function _getAuthParams(scope, state, challenge) {
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
 * Util function to set an item to local storage
 *
 * @param {string} name
 * @param {string} item
 */
function _setItemToStorage(name, item) {
  localStorage.setItem(name, item);
}

/**
 * Sets state to local storage
 *
 * @param {string} state
 */
function _setStateIdToStorage(state) {
  _setItemToStorage("state-origin", state);
}

/**
 * Sets verifier to local storage
 *
 * @param {string} verifier
 */
function _setVerifierToStorage(verifier) {
  _setItemToStorage("verifier", verifier);
}

/**
 * Redirects user to initiate auth flow
 */
export function redirectToAuthorize() {
  const baseUrl = "https://accounts.spotify.com";
  const scope = "user-read-private user-read-email";
  const state = uuidv4(); // ⇨ e.g. '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
  const verifier = _base64URLEncode(crypto.randomBytes(32));
  const challenge = _base64URLEncode(_sha256(verifier));
  const params = _getAuthParams(scope, state, challenge);
  const query = new URLSearchParams(params).toString();
  const api = baseUrl + "/authorize" + "?" + query;
  _setStateIdToStorage(state);
  _setVerifierToStorage(verifier);
  window.location.replace(api);
}
