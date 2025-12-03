// ===================================
// TMDB API Configuration
// ===================================

const CONFIG = {
    // TMDB API Key
    API_KEY: '095423be92c5b39686c76fed20ee138a',

    // Base URLs
    BASE_URL: 'https://api.themoviedb.org/3',
    IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',

    // Image Sizes
    POSTER_SIZE: 'w500',
    BACKDROP_SIZE: 'original',
    PROFILE_SIZE: 'w185',

    // API Endpoints
    ENDPOINTS: {
        TRENDING: '/trending/all/week',
        POPULAR_MOVIES: '/movie/popular',
        TOP_RATED: '/movie/top_rated',
        TV_SHOWS: '/tv/popular',
        NETFLIX_ORIGINALS: '/discover/tv',
        NOW_PLAYING: '/movie/now_playing',
        SEARCH: '/search/multi',
        MOVIE_DETAILS: '/movie',
        TV_DETAILS: '/tv',
        VIDEOS: '/videos'
    },

    // Helper function to build full image URL
    getImageUrl: (path, size = 'w500') => {
        if (!path) return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='750' viewBox='0 0 500 750'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23141414;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23000000;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='500' height='750' fill='url(%23grad)'/%3E%3Cg transform='translate(250, 375)'%3E%3Ccircle cx='0' cy='0' r='80' fill='%23E50914' opacity='0.2'/%3E%3Cpath d='M-30,-20 L-30,20 L30,0 Z' fill='%23E50914' opacity='0.5'/%3E%3C/g%3E%3Ctext x='50%25' y='85%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='18' fill='%23666666'%3ENo Image Available%3C/text%3E%3C/svg%3E";
        return `${CONFIG.IMAGE_BASE_URL}/${size}${path}`;
    },

    // Helper function to build API URL
    getApiUrl: (endpoint, params = {}) => {
        const url = new URL(`${CONFIG.BASE_URL}${endpoint}`);
        url.searchParams.append('api_key', CONFIG.API_KEY);

        // Add additional parameters
        Object.keys(params).forEach(key => {
            url.searchParams.append(key, params[key]);
        });

        return url.toString();
    }
};

// Export for use in other files
window.CONFIG = CONFIG;
