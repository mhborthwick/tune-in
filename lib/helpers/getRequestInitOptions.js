/**
 * Gets request init options
 *
 * @param {string} accessToken
 * @param {string} method GET | POST
 */
export function getRequestInitOptions(
  accessToken,
  method,
  details = undefined
) {
  return {
    method: method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    ...(details ? { body: JSON.stringify(details) } : {}),
  };
}
