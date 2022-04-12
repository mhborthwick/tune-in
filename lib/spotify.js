/**
 * Class representing Spotify client
 */
export class Spotify {
  /**
   * @param {React.MutableRefObject<{access_token: string, refresh_token: string}>} tokens
   */
  constructor(tokens) {
    this.tokens = tokens;
  }

  /**
   * Initialize Spotify client
   *
   * @param {React.MutableRefObject<{access_token: string, refresh_token: string}>} tokens
   */
  static init(tokens) {
    return new Spotify(tokens);
  }

  /**
   * Gets fetch init options
   *
   * @param {string} method "GET" | "POST"
   * @param {Object} data
   */
  async _getRequestInitOptions(method, data = {}) {
    if (!this.tokens.current.access_token) {
      const api = "/api/v1/tokens";
      const response = await fetch(api);
      const json = await response.json();
      this.tokens.current.access_token = json.access_token;
      this.tokens.current.refresh_token = json.refresh_token;
    }
    if (method === "POST") {
      return {
        headers: {
          authorization: this.tokens.current.access_token,
          "content-type": "application/json",
        },
        method: method,
        body: JSON.stringify(data),
      };
    } else if (method === "GET") {
      return {
        headers: {
          authorization: this.tokens.current.access_token,
          "content-type": "application/json",
        },
        method: method,
      };
    } else {
      throw Error(`method should be GET or POST, received ${method}`);
    }
  }

  /**
   * Gets track uris
   * Note: currently just returns a single uri in an array
   *
   * @param {Object} data
   * @returns {Promise<{uris: string[]}>} track uris
   */
  async search(data) {
    const options = await this._getRequestInitOptions("POST", data);
    const api = "/api/v1/search";
    return await fetch(api, options);
  }

  /**
   * Gets user Id
   *
   * @returns {Promise<{id: string}>} user id
   */
  async getUserId() {
    const options = await this._getRequestInitOptions("GET");
    const api = "/api/v1/id";
    return await fetch(api, options);
  }

  /**
   * Creates playlist
   *
   * @param {Object} data
   * @returns {Promise<{id: string}>} user id
   */
  async createPlaylist(data) {
    const options = await this._getRequestInitOptions("POST", data);
    const api = "/api/v1/playlist/create";
    return await fetch(api, options);
  }

  /**
   * Adds tracks to playlist
   *
   * @param {Object} data
   * @returns {Promise<{snapshot_it: string}>} snapshot id
   */
  async addToPlaylist(data) {
    const options = await this._getRequestInitOptions("POST", data);
    const api = "/api/v1/playlist/add";
    return await fetch(api, options);
  }
}
