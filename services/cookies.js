export const cookies = {
  /**
   * Set cookie
   * @param {string} key
   * @param {string} value
   */
  set(key, value) {
    document.cookie = `${key}=${value}`;
  },
  /**
   * Remove cookie
   * @param {string} key
   */
  remove(key) {
    document.cookie =
      `${key}` + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=[/];";
  },
};
