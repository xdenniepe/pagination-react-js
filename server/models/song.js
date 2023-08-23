const Fuse = require("fuse.js");

const { data } = require("../utils/generator");

const songs = data.songs.sort((a, b) => a.title.localeCompare(b.title));

/**
 * @typedef {object} SongInfo
 * @property {string} id
 * @property {string} title
 * @property {string} album
 * @property {string} artist
 * @property {number} year
 * @property {string} duration
 * @property {string[]} genre
 * @property {string} coverImage
 */

/**
 * @typedef {object} SearchResult
 * @property {SongInfo[]} results
 * @property {number} page
 * @property {number} limit
 * @property {number} totalResults
 */

class Song {
  fuse = {
    title: new Fuse(songs, { keys: ["title"], threshold: 0.4 }),
    album: new Fuse(songs, { keys: ["album"], threshold: 0.4 }),
    artist: new Fuse(songs, { keys: ["artist"], threshold: 0.4 }),
    genre: new Fuse(songs, { keys: ["genre"], threshold: 0.2 }),
  };

  /**
   * Return all songs
   * @param {number} page
   * @param {number} limit
   * @returns {Promise<SearchResult>}
   */
  async findAll(page = 1, limit = 50) {
    return this._applyPageLimit(songs, page, limit);
  }

  /**
   * Search for songs by title
   * @param {string} searchTerm
   * @param {number} page
   * @param {number} limit
   * @returns {Promise<SearchResult>}
   */
  async searchByTitle(searchTerm, page = 1, limit = 50) {
    return this._applyPageLimit(
      this._fuzzySearch(searchTerm, "title"),
      page,
      limit
    );
  }

  /**
   * Search for songs by album name
   * @param {string} searchTerm
   * @param {number} page
   * @param {number} limit
   * @returns {Promise<SearchResult>}
   */
  async searchByAlbum(searchTerm, page = 1, limit = 50) {
    return this._applyPageLimit(
      this._fuzzySearch(searchTerm, "album"),
      page,
      limit
    );
  }

  /**
   * Search for songs by artist name
   * @param {string} searchTerm
   * @param {number} page
   * @param {number} limit
   * @returns {Promise<SearchResult>}
   */
  async searchByArtist(searchTerm, page = 1, limit = 50) {
    return this._applyPageLimit(
      this._fuzzySearch(searchTerm, "artist"),
      page,
      limit
    );
  }

  /**
   * Search for songs by genre
   * @param {string} searchTerm
   * @param {number} page
   * @param {number} limit
   * @returns {Promise<SearchResult>}
   */
  async searchByGenre(searchTerm, page = 1, limit = 50) {
    return this._applyPageLimit(
      this._fuzzySearch(searchTerm, "genre"),
      page,
      limit
    );
  }

  /**
   * Search for songs by year
   * @param {number|string} year
   * @param {number} page
   * @param {number} limit
   * @returns {SearchResult}
   */
  searchByYear(year, page = 1, limit = 50) {
    return this._applyPageLimit(
      data.songs.filter((song) => song.year === Number(year)),
      page,
      limit
    );
  }

  _fuzzySearch(searchTerm, key) {
    return this.fuse[key].search(searchTerm).map((result) => result.item);
  }

  _applyPageLimit(results, page, limit) {
    const offset = (page - 1) * limit;
    return {
      results: results.slice(offset, offset + limit),
      page,
      limit,
      totalResults: results.length,
    };
  }
}

module.exports = new Song();
