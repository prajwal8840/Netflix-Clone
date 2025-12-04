// ===================================
// Main Application Logic
// Initializes the Netflix clone and handles user interactions
// ===================================

// State management
const AppState = {
    searchTimeout: null,
    currentHeroIndex: 0,
    heroItems: []
};

/**
 * Initialize the application
 */
async function initApp() {
    console.log('🎬 Initializing Netflix Clone...');

    // Set up event listeners
    setupEventListeners();

    // Load all content
    await loadAllContent();

    // Start hero banner rotation
    startHeroRotation();

    console.log('✅ Netflix Clone initialized successfully!');
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);

    // Search functionality
    const searchToggle = document.getElementById('searchToggle');
    const searchInput = document.getElementById('searchInput');

    searchToggle.addEventListener('click', () => {
        searchInput.classList.toggle('active');
        if (searchInput.classList.contains('active')) {
            searchInput.focus();
        }
    });

    searchInput.addEventListener('input', handleSearch);

    // Click outside search to close
    document.addEventListener('click', (e) => {
        if (!searchToggle.contains(e.target) && !searchInput.contains(e.target)) {
            searchInput.classList.remove('active');
        }
    });

    // Modal close handlers
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');

    modalClose.addEventListener('click', UI.closeModal);

    // Close modal when clicking outside
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            UI.closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            UI.closeModal();
        }
    });

    // Profile dropdown toggle
    const profileButton = document.getElementById('profileButton');
    const profileDropdown = document.getElementById('profileDropdown');

    // Prevent dropdown from closing when clicking inside it
    profileDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

/**
 * Handle navbar background on scroll
 */
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

/**
 * Handle search input with debouncing
 */
function handleSearch(e) {
    const query = e.target.value.trim();

    // Clear previous timeout
    if (AppState.searchTimeout) {
        clearTimeout(AppState.searchTimeout);
    }

    // If query is empty, hide search results
    if (!query) {
        document.getElementById('searchResults').style.display = 'none';
        return;
    }

    // Debounce search (wait 500ms after user stops typing)
    AppState.searchTimeout = setTimeout(async () => {
        console.log('🔍 Searching for:', query);

        const results = await API.search(query);

        if (results.length > 0) {
            UI.populateMovieRow('searchResultsRow', results);
            document.getElementById('searchResults').style.display = 'block';

            // Scroll to search results
            document.getElementById('searchResults').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            document.getElementById('searchResults').style.display = 'none';
        }
    }, 500);
}

/**
 * Load all content sections
 */
async function loadAllContent() {
    console.log('📥 Loading content from TMDB...');

    // Show skeleton loaders
    UI.showSkeletons('trendingRow');
    UI.showSkeletons('originalsRow');
    UI.showSkeletons('popularRow');
    UI.showSkeletons('topRatedRow');
    UI.showSkeletons('tvShowsRow');
    UI.showSkeletons('continueRow');
    UI.showSkeletons('newReleasesRow');

    // Fetch all content in parallel for better performance
    const [
        trending,
        originals,
        popular,
        topRated,
        tvShows,
        nowPlaying
    ] = await Promise.all([
        API.getTrending(),
        API.getNetflixOriginals(),
        API.getPopularMovies(),
        API.getTopRated(),
        API.getTVShows(),
        API.getNowPlaying()
    ]);

    // Populate hero banner with first trending item
    if (trending.length > 0) {
        AppState.heroItems = trending.slice(0, 5); // Store first 5 for rotation
        UI.updateHeroBanner(trending[0]);
    }

    // Populate all rows
    UI.populateMovieRow('trendingRow', trending);
    UI.populateMovieRow('originalsRow', originals);
    UI.populateMovieRow('popularRow', popular);
    UI.populateMovieRow('topRatedRow', topRated);
    UI.populateMovieRow('tvShowsRow', tvShows);
    UI.populateMovieRow('continueRow', nowPlaying);
    UI.populateMovieRow('newReleasesRow', popular.slice(10, 20)); // Use different slice for variety

    console.log('✅ All content loaded successfully!');
}

/**
 * Start hero banner auto-rotation
 */
function startHeroRotation() {
    // Rotate hero banner every 8 seconds
    setInterval(() => {
        if (AppState.heroItems.length > 0) {
            AppState.currentHeroIndex = (AppState.currentHeroIndex + 1) % AppState.heroItems.length;
            UI.updateHeroBanner(AppState.heroItems[AppState.currentHeroIndex]);
        }
    }, 8000);
}

/**
 * Handle errors gracefully
 */
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
});

/**
 * Handle unhandled promise rejections
 */
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
