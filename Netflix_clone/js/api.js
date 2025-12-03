// ===================================
// TMDB API Service Layer
// Handles all API calls to TMDB
// ===================================

const API = {
    /**
     * Fetch trending movies and TV shows
     * @returns {Promise<Array>} Array of trending items
     */
    async getTrending() {
        try {
            const url = CONFIG.getApiUrl(CONFIG.ENDPOINTS.TRENDING);
            const response = await fetch(url);
            const data = await response.json();
            return data.results || [];
        } catch (error) {
            console.error('Error fetching trending:', error);
            return [];
        }
    },

    /**
     * Fetch popular movies
     * @returns {Promise<Array>} Array of popular movies
     */
    async getPopularMovies() {
        try {
            const url = CONFIG.getApiUrl(CONFIG.ENDPOINTS.POPULAR_MOVIES);
            const response = await fetch(url);
            const data = await response.json();
            return data.results || [];
        } catch (error) {
            console.error('Error fetching popular movies:', error);
            return [];
        }
    },

    /**
     * Fetch Netflix Originals (TV shows from Netflix)
     * @returns {Promise<Array>} Array of Netflix originals
     */
    async getNetflixOriginals() {
        try {
            const url = CONFIG.getApiUrl(CONFIG.ENDPOINTS.NETFLIX_ORIGINALS, {
                with_networks: '213' // Netflix network ID
            });
            const response = await fetch(url);
            const data = await response.json();
            return data.results || [];
        } catch (error) {
            console.error('Error fetching Netflix originals:', error);
            return [];
        }
    },

    /**
     * Fetch top rated movies
     * @returns {Promise<Array>} Array of top rated movies
     */
    async getTopRated() {
        try {
            const url = CONFIG.getApiUrl(CONFIG.ENDPOINTS.TOP_RATED);
            const response = await fetch(url);
            const data = await response.json();
            return data.results || [];
        } catch (error) {
            console.error('Error fetching top rated:', error);
            return [];
        }
    },

    /**
     * Fetch popular TV shows
     * @returns {Promise<Array>} Array of TV shows
     */
    async getTVShows() {
        try {
            const url = CONFIG.getApiUrl(CONFIG.ENDPOINTS.TV_SHOWS);
            const response = await fetch(url);
            const data = await response.json();
            return data.results || [];
        } catch (error) {
            console.error('Error fetching TV shows:', error);
            return [];
        }
    },

    /**
     * Fetch now playing movies (for Continue Watching section)
     * @returns {Promise<Array>} Array of now playing movies
     */
    async getNowPlaying() {
        try {
            const url = CONFIG.getApiUrl(CONFIG.ENDPOINTS.NOW_PLAYING);
            const response = await fetch(url);
            const data = await response.json();
            return data.results || [];
        } catch (error) {
            console.error('Error fetching now playing:', error);
            return [];
        }
    },

    /**
     * Search for movies and TV shows
     * @param {string} query - Search query
     * @returns {Promise<Array>} Array of search results
     */
    async search(query) {
        try {
            if (!query || query.trim() === '') return [];

            const url = CONFIG.getApiUrl(CONFIG.ENDPOINTS.SEARCH, {
                query: query.trim()
            });
            const response = await fetch(url);
            const data = await response.json();
            return data.results || [];
        } catch (error) {
            console.error('Error searching:', error);
            return [];
        }
    },

    /**
     * Get movie or TV show details
     * @param {number} id - Movie or TV show ID
     * @param {string} type - 'movie' or 'tv'
     * @returns {Promise<Object>} Details object
     */
    async getDetails(id, type = 'movie') {
        try {
            const endpoint = type === 'movie' ? CONFIG.ENDPOINTS.MOVIE_DETAILS : CONFIG.ENDPOINTS.TV_DETAILS;
            const url = CONFIG.getApiUrl(`${endpoint}/${id}`);
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching details:', error);
            return null;
        }
    },

    /**
     * Get videos/trailers for a movie or TV show
     * @param {number} id - Movie or TV show ID
     * @param {string} type - 'movie' or 'tv'
     * @returns {Promise<Array>} Array of videos
     */
    async getVideos(id, type = 'movie') {
        try {
            const endpoint = type === 'movie' ? CONFIG.ENDPOINTS.MOVIE_DETAILS : CONFIG.ENDPOINTS.TV_DETAILS;
            const url = CONFIG.getApiUrl(`${endpoint}/${id}${CONFIG.ENDPOINTS.VIDEOS}`);
            const response = await fetch(url);
            const data = await response.json();
            return data.results || [];
        } catch (error) {
            console.error('Error fetching videos:', error);
            return [];
        }
    },

    /**
     * Get YouTube trailer URL
     * @param {number} id - Movie or TV show ID
     * @param {string} type - 'movie' or 'tv'
     * @returns {Promise<string|null>} YouTube URL or null
     */
    async getTrailerUrl(id, type = 'movie') {
        try {
            const videos = await this.getVideos(id, type);
            const trailer = videos.find(video =>
                video.type === 'Trailer' && video.site === 'YouTube'
            );

            if (trailer) {
                return `https://www.youtube.com/watch?v=${trailer.key}`;
            }
            return null;
        } catch (error) {
            console.error('Error fetching trailer:', error);
            return null;
        }
    }
};

// Export for use in other files
window.API = API;
