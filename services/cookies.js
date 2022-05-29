export const cookies = {
  // get(key) {},
  /**
   * Set cookie
   * @param {string} key
   * @param {string} value
   */
  set(key, value) {
    document.cookie = `${key}=${value}`;
  },
  // remove(key) {},
  // clear() {},
};
