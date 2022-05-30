import { cookies } from "../services/cookies";

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
    if (!tokens.current) {
      throw new Error(
        `Expected argument to be mutable ref object, received: ${JSON.stringify(
          tokens
        )}`
      );
    }
    return new Spotify(tokens);
  }

  /**
   * Gets fetch init options
   *
   * @param {string} method "GET" | "POST"
   * @param {Object} data
   */
  async _getRequestInitOptions(method, data = {}) {
    const authTokens = await this.auth();
    const authTokensJson = await authTokens.json();
    if (!authTokensJson.access_token) {
      const api = "/api/v1/tokens";
      const response = await fetch(api);
      const json = await response.json();
      cookies.set("access_token", json.access_token);
      cookies.set("refresh_token", json.refresh_token);
      // todo - refactor later
      if (method === "POST") {
        return {
          headers: {
            authorization: json.access_token,
            refresh: json.refresh_token,
            "content-type": "application/json",
          },
          method: method,
          body: JSON.stringify(data),
        };
      } else if (method === "GET") {
        return {
          headers: {
            authorization: json.access_token,
            refresh: json.refresh_token,
            "content-type": "application/json",
          },
          method: method,
        };
      } else {
        throw Error(`method should be GET or POST, received ${method}`);
      }
    } else {
      if (method === "POST") {
        return {
          headers: {
            authorization: authTokensJson.access_token,
            refresh: authTokensJson.refresh_token,
            "content-type": "application/json",
          },
          method: method,
          body: JSON.stringify(data),
        };
      } else if (method === "GET") {
        return {
          headers: {
            authorization: authTokensJson.access_token,
            refresh: authTokensJson.refresh_token,
            "content-type": "application/json",
          },
          method: method,
        };
      } else {
        throw Error(`method should be GET or POST, received ${method}`);
      }
    }
  }

  /**
   * Gets access and refresh tokens
   *
   * @returns {Promise<{access_token: string, refresh_token: string}>}
   */
  async auth() {
    const api = "/api/v1/auth";
    return await fetch(api);
  }

  /**
   * Resets tokens and executes call back
   */
  async resetTokensAndExecute(res, cb, data = undefined) {
    const json = await res.json();
    cookies.set("access_token", json.access_token);
    cookies.set("refresh_token", json.refresh_token);
    return data ? await cb(data) : await cb();
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
    const res = await fetch(api, options);
    if (res.status === 498) {
      cookies.remove("access_token");
      cookies.remove("refresh_token");
      window.location.href = "/";
    }
    if (res.status === 401) {
      return await this.resetTokensAndExecute(
        res,
        this.search.bind(this),
        data
      );
    }
    return res;
  }

  /**
   * Gets user Id
   *
   * @returns {Promise<{id: string}>} user id
   */
  async getUserId() {
    const options = await this._getRequestInitOptions("GET");
    const api = "/api/v1/id";
    const res = await fetch(api, options);
    if (res.status === 498) {
      cookies.remove("access_token");
      cookies.remove("refresh_token");
      window.location.href = "/";
    }
    if (res.status === 401) {
      return await this.resetTokensAndExecute(res, this.getUserId.bind(this));
    }
    return res;
  }

  /**
   * Gets genres
   *
   * @returns {Promise<{genres: string[]}>} genres
   */
  async getGenres() {
    const options = await this._getRequestInitOptions("GET");
    const api = "/api/v1/genres";
    const res = await fetch(api, options);
    if (res.status === 498) {
      cookies.remove("access_token");
      cookies.remove("refresh_token");
      window.location.href = "/";
    }
    if (res.status === 401) {
      return await this.resetTokensAndExecute(res, this.getGenres.bind(this));
    }
    return res;
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
    const res = await fetch(api, options);
    if (res.status === 498) {
      cookies.remove("access_token");
      cookies.remove("refresh_token");
      window.location.href = "/";
    }
    if (res.status === 401) {
      return await this.resetTokensAndExecute(
        res,
        this.createPlaylist.bind(this),
        data
      );
    }
    return res;
  }

  /**
   * Get top artist / tracks
   *
   * @param {Object} data
   */
  async getTopItems(type) {
    const options = await this._getRequestInitOptions("GET");
    const api = `/api/v1/items?type=${type}`;
    const res = await fetch(api, options);
    if (res.status === 498) {
      cookies.remove("access_token");
      cookies.remove("refresh_token");
      window.location.href = "/";
    }
    if (res.status === 401) {
      return await this.resetTokensAndExecute(
        res,
        this.getTopItems.bind(this),
        type
      );
    }
    return res;
  }

  /**
   * Adds tracks to playlist
   *
   * @param {Object} data
   * @returns {Promise<{snapshot_id: string}>} snapshot id
   */
  async addToPlaylist(data) {
    const options = await this._getRequestInitOptions("POST", data);
    const api = "/api/v1/playlist/add";
    const res = await fetch(api, options);
    if (res.status === 498) {
      cookies.remove("access_token");
      cookies.remove("refresh_token");
      window.location.href = "/";
    }
    if (res.status === 401) {
      return await this.resetTokensAndExecute(
        res,
        this.addToPlaylist.bind(this),
        data
      );
    }
    return res;
  }

  /**
   * Gets recommendations
   *
   * @param {Object} data
   * @returns {Promise<Object>} recommendations
   */
  async getRecommendations(data) {
    const options = await this._getRequestInitOptions("POST", data);
    const api = "/api/v1/recommendations";
    const res = await fetch(api, options);
    if (res.status === 498) {
      cookies.remove("access_token");
      cookies.remove("refresh_token");
      window.location.href = "/";
    }
    if (res.status === 401) {
      return await this.resetTokensAndExecute(
        res,
        this.getRecommendations.bind(this),
        data
      );
    }
    return res;
  }
}
