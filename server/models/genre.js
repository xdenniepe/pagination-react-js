const { data } = require("../utils/generator");

/**
 * @typedef {object} SearchResult
 * @property {string[]} results
 * @property {number} totalResults
 */

class Genre {
  /**
   * Return all genres
   * @returns {Promise<SearchResult>}
   */
  async findAll() {
    return {
      results: data.genres,
      totalResults: data.genres.length,
    };
  }
}

module.exports = new Genre();
