# Netflix Clone 🎬

A pixel-perfect, ultra-realistic Netflix clone built with vanilla HTML, CSS, and JavaScript, featuring full integration with The Movie Database (TMDB) API.

![Netflix Clone](https://img.shields.io/badge/Netflix-Clone-E50914?style=for-the-badge&logo=netflix)
![TMDB](https://img.shields.io/badge/TMDB-API-01D277?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## ✨ Features

### 🎨 Ultra-Realistic Netflix UI
- **Pixel-perfect design** matching Netflix's actual interface
- **Dark theme** with Netflix's signature black (#141414) and red (#E50914)
- **Smooth animations** and transitions throughout
- **Responsive design** for mobile, tablet, and desktop

### 🎞️ Dynamic Content Sections
- **Hero Banner** - Auto-rotating featured content with backdrop images
- **Trending Now** - Currently trending movies and TV shows
- **Netflix Originals** - Exclusive Netflix content
- **Popular Movies** - Most popular movies
- **Top Rated** - Highest-rated content
- **TV Shows** - Popular TV series
- **Continue Watching** - Now playing movies
- **New Releases** - Latest releases

### 🎬 Interactive Features
- **Movie Cards** with hover zoom effects and play icon overlays
- **Movie Details Modal** with backdrop, title, rating, description, and trailer link
- **Live Search** with debounced input and instant results
- **Horizontal Scrollable Rows** with smooth scrolling
- **Skeleton Loading** animations while content loads
- **Profile Dropdown** menu

### 🔌 TMDB API Integration
- Real-time data from The Movie Database
- High-quality poster and backdrop images
- Movie/TV show details, ratings, and release dates
- YouTube trailer links
- Search functionality across movies and TV shows

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for TMDB API calls)

### Installation

1. **Clone or download** this repository
2. **Open `index.html`** in your web browser
3. **That's it!** No build process or dependencies required

```bash
# If using a local server (optional but recommended)
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx serve

# Then open http://localhost:8000
```

## 📁 Project Structure

```
Netflix_clone/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles and animations
├── js/
│   ├── config.js       # TMDB API configuration
│   ├── api.js          # API service layer
│   ├── ui.js           # UI component builders
│   └── main.js         # Main application logic
└── README.md           # This file
```

## 🎯 Key Components

### HTML Structure
- Semantic HTML5 elements
- Accessible navigation with ARIA labels
- SEO-optimized meta tags
- Modal overlay for movie details

### CSS Features
- **CSS Variables** for consistent design system
- **Flexbox** for layout
- **CSS Grid** where appropriate
- **Custom scrollbars** for movie rows
- **Keyframe animations** for loading states
- **Media queries** for responsive design
- **Backdrop filters** for modern effects

### JavaScript Architecture
- **Modular design** with separate concerns
- **Async/await** for API calls
- **Event delegation** for performance
- **Debouncing** for search input
- **Error handling** for network failures
- **State management** for app data

## 🔧 Customization

### Change API Key
Edit `js/config.js` and replace the API key:
```javascript
API_KEY: 'your_api_key_here'
```

### Modify Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --netflix-red: #E50914;
    --netflix-black: #141414;
    /* ... other colors */
}
```

### Adjust Hero Rotation Speed
Edit `js/main.js`:
```javascript
setInterval(() => {
    // Change 8000 to desired milliseconds
}, 8000);
```

## 🎨 Design Highlights

- **Netflix-accurate typography** using Helvetica Neue
- **Smooth hover effects** with scale transforms
- **Gradient overlays** for text readability
- **Shadow elevation** for depth
- **Skeleton loaders** for perceived performance
- **Fade-in animations** for content sections
- **Responsive breakpoints** at 768px and 1024px

## 📱 Responsive Design

- **Desktop (>1024px)**: Full navigation, 5-6 cards per row
- **Tablet (768-1024px)**: Condensed navigation, 3-4 cards per row
- **Mobile (<768px)**: Hidden menu, 2-3 cards per row, touch-optimized

## 🌟 Advanced Features

### Search Functionality
- **Debounced input** (500ms delay)
- **Multi-type search** (movies and TV shows)
- **Instant results** display
- **Auto-scroll** to results

### Modal System
- **Click-to-open** movie details
- **Backdrop blur** effect
- **Trailer integration** with YouTube
- **Close on outside click** or Escape key
- **Smooth animations** for open/close

### Performance Optimizations
- **Lazy loading** images
- **Parallel API calls** with Promise.all
- **Skeleton loaders** for perceived speed
- **Efficient event listeners**
- **Minimal DOM manipulation**

## 🎓 Learning Resources

This project demonstrates:
- Modern vanilla JavaScript patterns
- CSS Grid and Flexbox layouts
- Responsive web design
- API integration and async programming
- UI/UX best practices
- Performance optimization techniques

## 📝 License

This is a demo project for educational purposes only. All movie data and images are provided by [The Movie Database (TMDB)](https://www.themoviedb.org/).

## 🙏 Acknowledgments

- **TMDB** for the comprehensive movie database API
- **Netflix** for design inspiration
- **Google Fonts** for typography options

## 🐛 Known Limitations

- This is a frontend-only demo (no user authentication)
- "Continue Watching" uses now playing movies (not actual watch history)
- Video playback is not implemented (links to trailers only)
- API key is exposed in frontend code (use backend proxy for production)

## 🚀 Future Enhancements

- User authentication and profiles
- Watch history tracking
- Video player integration
- Recommendation algorithm
- Backend API proxy
- Progressive Web App (PWA) features
- Offline support with Service Workers

---

**Built with ❤️ using TMDB API**

Enjoy exploring the Netflix Clone! 🍿
