// ===================================
// UI Component Builders
// Functions to create and manage UI elements
// ===================================

const UI = {
    /**
     * Create a movie card element
     * @param {Object} item - Movie or TV show object from TMDB
     * @returns {HTMLElement} Movie card element
     */
    createMovieCard(item) {
        const card = document.createElement('div');
        card.className = 'movie-card';

        const title = item.title || item.name || 'Unknown';
        const posterPath = item.poster_path;
        const imageUrl = CONFIG.getImageUrl(posterPath, CONFIG.POSTER_SIZE);
        const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';
        const year = item.release_date || item.first_air_date;
        const yearDisplay = year ? new Date(year).getFullYear() : '';

        card.innerHTML = `
            <img src="${imageUrl}" alt="${title}" class="movie-card-image" loading="lazy" onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22500%22 height=%22750%22 viewBox=%220 0 500 750%22%3E%3Crect width=%22500%22 height=%22750%22 fill=%22%23141414%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial, sans-serif%22 font-size=%2224%22 fill=%22%23ffffff%22%3E${encodeURIComponent(title)}%3C/text%3E%3C/svg%3E';">
            <div class="movie-card-overlay">
                <h3 class="movie-card-title">${title}</h3>
                <div class="movie-card-info">
                    ${yearDisplay ? `<span>${yearDisplay}</span>` : ''}
                    ${rating !== 'N/A' ? `<span>⭐ ${rating}</span>` : ''}
                </div>
            </div>
            <div class="play-icon">
                <svg viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                </svg>
            </div>
        `;

        // Add click event to show details
        card.addEventListener('click', () => {
            const type = item.media_type || (item.title ? 'movie' : 'tv');
            UI.showMovieDetails(item.id, type, item);
        });

        return card;
    },

    /**
     * Create a skeleton loading card
     * @returns {HTMLElement} Skeleton card element
     */
    createSkeletonCard() {
        const skeleton = document.createElement('div');
        skeleton.className = 'skeleton-card';
        return skeleton;
    },

    /**
     * Populate a movie row with content
     * @param {string} containerId - ID of the container element
     * @param {Array} items - Array of movies/TV shows
     */
    populateMovieRow(containerId, items) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Clear existing content (including skeletons)
        container.innerHTML = '';

        // Add movie cards
        items.forEach(item => {
            const card = UI.createMovieCard(item);
            container.appendChild(card);
        });
    },

    /**
     * Show skeleton loaders in a row
     * @param {string} containerId - ID of the container element
     * @param {number} count - Number of skeletons to show
     */
    showSkeletons(containerId, count = 8) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';
        for (let i = 0; i < count; i++) {
            container.appendChild(UI.createSkeletonCard());
        }
    },

    /**
     * Show movie/TV show details in modal
     * @param {number} id - Movie or TV show ID
     * @param {string} type - 'movie' or 'tv'
     * @param {Object} preloadedData - Optional preloaded data to show immediately
     */
    async showMovieDetails(id, type, preloadedData = null) {
        const modal = document.getElementById('modalOverlay');
        const modalTitle = document.getElementById('modalTitle');
        const modalMeta = document.getElementById('modalMeta');
        const modalDescription = document.getElementById('modalDescription');
        const modalBackdrop = document.getElementById('modalBackdrop');
        const modalTrailerBtn = document.getElementById('modalTrailerBtn');

        // Show modal immediately with preloaded data if available
        if (preloadedData) {
            const title = preloadedData.title || preloadedData.name || 'Unknown';
            const backdropPath = preloadedData.backdrop_path || preloadedData.poster_path;
            const backdropUrl = CONFIG.getImageUrl(backdropPath, CONFIG.BACKDROP_SIZE);
            const overview = preloadedData.overview || 'No description available.';
            const rating = preloadedData.vote_average ? preloadedData.vote_average.toFixed(1) : 'N/A';
            const year = preloadedData.release_date || preloadedData.first_air_date;
            const yearDisplay = year ? new Date(year).getFullYear() : '';

            modalTitle.textContent = title;
            modalBackdrop.style.backgroundImage = `url(${backdropUrl})`;
            modalDescription.textContent = overview;
            modalMeta.innerHTML = `
                ${yearDisplay ? `<span>${yearDisplay}</span>` : ''}
                ${rating !== 'N/A' ? `<span>⭐ ${rating}</span>` : ''}
            `;
        }

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Fetch full details
        try {
            const details = await API.getDetails(id, type);
            if (!details) return;

            const title = details.title || details.name || 'Unknown';
            const backdropPath = details.backdrop_path || details.poster_path;
            const backdropUrl = CONFIG.getImageUrl(backdropPath, CONFIG.BACKDROP_SIZE);
            const overview = details.overview || 'No description available.';
            const rating = details.vote_average ? details.vote_average.toFixed(1) : 'N/A';
            const releaseDate = details.release_date || details.first_air_date;
            const year = releaseDate ? new Date(releaseDate).getFullYear() : '';
            const runtime = details.runtime || details.episode_run_time?.[0];
            const runtimeDisplay = runtime ? `${runtime} min` : '';

            // Update modal content
            modalTitle.textContent = title;
            modalBackdrop.style.backgroundImage = `url(${backdropUrl})`;
            modalDescription.textContent = overview;

            modalMeta.innerHTML = `
                ${year ? `<span>${year}</span>` : ''}
                ${rating !== 'N/A' ? `<span>⭐ ${rating}</span>` : ''}
                ${runtimeDisplay ? `<span>${runtimeDisplay}</span>` : ''}
            `;

            // Get trailer
            const trailerUrl = await API.getTrailerUrl(id, type);
            if (trailerUrl) {
                modalTrailerBtn.style.display = 'inline-flex';
                modalTrailerBtn.onclick = () => window.open(trailerUrl, '_blank');
            } else {
                modalTrailerBtn.style.display = 'none';
            }

        } catch (error) {
            console.error('Error loading movie details:', error);
        }
    },

    /**
     * Close the modal
     */
    closeModal() {
        const modal = document.getElementById('modalOverlay');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    },

    /**
     * Update hero banner with movie/show data
     * @param {Object} item - Movie or TV show object
     */
    updateHeroBanner(item) {
        const heroBanner = document.getElementById('heroBanner');
        const heroTitle = document.getElementById('heroTitle');
        const heroMeta = document.getElementById('heroMeta');
        const heroDescription = document.getElementById('heroDescription');
        const heroPlayBtn = document.getElementById('heroPlayBtn');
        const heroInfoBtn = document.getElementById('heroInfoBtn');

        const title = item.title || item.name || 'Unknown';
        const backdropPath = item.backdrop_path;
        const backdropUrl = CONFIG.getImageUrl(backdropPath, CONFIG.BACKDROP_SIZE);
        const overview = item.overview || 'No description available.';
        const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';
        const year = item.release_date || item.first_air_date;
        const yearDisplay = year ? new Date(year).getFullYear() : '';

        // Update banner
        heroBanner.style.backgroundImage = `url(${backdropUrl})`;
        heroTitle.textContent = title;
        heroDescription.textContent = overview;

        heroMeta.innerHTML = `
            ${yearDisplay ? `<span>${yearDisplay}</span>` : ''}
            ${rating !== 'N/A' ? `<span>⭐ ${rating}</span>` : ''}
            <span style="color: #46d369; font-weight: 600;">98% Match</span>
        `;

        // Add click handlers
        const type = item.media_type || (item.title ? 'movie' : 'tv');
        heroInfoBtn.onclick = () => UI.showMovieDetails(item.id, type, item);
        heroPlayBtn.onclick = () => UI.showMovieDetails(item.id, type, item);
    },

    /**
     * Truncate text to specified length
     * @param {string} text - Text to truncate
     * @param {number} maxLength - Maximum length
     * @returns {string} Truncated text
     */
    truncateText(text, maxLength = 150) {
        if (!text || text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }
};

// Export for use in other files
window.UI = UI;
