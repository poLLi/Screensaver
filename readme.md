# Screensaver

A Vue 3 + VitePress static screensaver application featuring a large clock display, Kölner Haie hockey game schedule, live weather, historical events, Reddit notifications, and animated team commercials with Vanta.js background effects.

## Overview

This project is a full-screen screensaver designed for display during breaks or idle time. It combines:

- **Large Digital Clock**: Displays current time and date prominently in the center
- **3D Wave Background**: Animated Vanta.js waves with color cycling
- **Hockey Widget**: Shows upcoming Kölner Haie games with countdown timers
- **Weather Widget**: Live weather for Immelkeppel, Germany via Open-Meteo API
- **History Widget**: Random historical events from today's date via History Muffin Labs API
- **Reddit Notifications**: Sliding notifications for new r/NHL posts (excluding pinned megathreads)
- **Commercial Overlay**: Rotating team-specific commercials with animated diagonal slices

## Technology Stack

- **VitePress 1.6.4**: Static site generator (customized to remove documentation features)
- **Vue 3.5.13**: Frontend framework with Composition API
- **TypeScript**: Type-safe JavaScript (relaxed mode)
- **Three.js r134**: 3D graphics library (loaded via CDN)
- **Vanta.js**: Animated backgrounds (loaded via CDN)
- **GitHub Actions**: Automated deployment to GitHub Pages

## Project Structure

```
├── .vitepress/
│   ├── config.ts          # VitePress configuration with CDN scripts
│   └── theme/
│       ├── index.ts       # Custom theme registration
│       ├── Layout.vue     # Main app container (replaces default VitePress layout)
│       └── style.css      # Global styles
├── components/
│   ├── ClockDisplay.vue           # Large centered clock
│   ├── VantaBackground.vue        # 3D wave background with color cycling
│   ├── HockeyWidget.vue           # Kölner Haie game schedule
│   ├── WeatherWidget.vue          # Weather display
│   ├── HistoryWidget.vue          # Historical events
│   ├── RedditNotification.vue     # Sliding Reddit post notifications
│   └── CommercialOverlay.vue      # Animated team commercials
├── composables/
│   ├── useInterval.ts             # Interval with auto-cleanup
│   ├── useWeatherAPI.ts           # Open-Meteo API integration
│   ├── useHistoryAPI.ts           # History API integration
│   └── useRedditAPI.ts            # Reddit JSON feed (filters pinned posts)
├── data/
│   ├── gameSchedule.ts            # 26 Kölner Haie games
│   └── teams.ts                   # Team configurations (logos, gradients, glow colors)
├── .github/workflows/
│   └── deploy.yml                 # GitHub Actions deployment workflow
├── package.json                   # Dependencies and scripts
└── index.md                       # VitePress entry point (this file)
```

## How the Build Works

### Development Mode

```bash
npm run dev
```

**What happens:**
1. VitePress starts a hot-reload dev server on `http://localhost:5173/`
2. Vue components are compiled on-the-fly
3. Changes to `.vue`, `.ts`, or `.md` files trigger automatic browser refresh
4. CDN scripts (Three.js, Vanta.js) are loaded from external URLs

**Dev server features:**
- Fast Hot Module Replacement (HMR)
- TypeScript type checking
- Vue 3 component compilation
- Serves from memory (no build artifacts)

### Production Build

```bash
npm run build
```

**Build process:**
1. **Compilation**: VitePress compiles all Vue components, TypeScript, and markdown into optimized JavaScript
2. **Static Site Generation (SSG)**: 
   - Renders Vue components to HTML at build time
   - Generates static `.html` files for each route
   - Creates optimized CSS bundles
3. **Asset Optimization**:
   - Minifies JavaScript and CSS
   - Code splitting for better performance
   - Tree-shaking to remove unused code
4. **Output**: Creates `.vitepress/dist/` folder with:
   - `index.html` - Main entry point
   - `assets/` - Optimized JS/CSS chunks with cache-busting hashes
   - Static files ready for deployment

**Build output location:** `.vitepress/dist/`

### Preview Production Build

```bash
npm run preview
```

Serves the built static files from `.vitepress/dist/` locally to test production behavior before deployment.

### Deployment

**GitHub Pages (Automated via GitHub Actions):**

1. Push code to `main` branch
2. GitHub Actions workflow (`.github/workflows/deploy.yml`) triggers automatically
3. Workflow steps:
   - Checks out code
   - Sets up Node.js 20
   - Installs dependencies (`npm ci`)
   - Builds static site (`npm run build`)
   - Deploys `.vitepress/dist/` to `gh-pages` branch
4. GitHub Pages serves from `gh-pages` branch

**Manual deployment:**
```bash
npm run build
# Upload .vitepress/dist/ folder to any static hosting service
```

## Key Technical Decisions

### Why VitePress?
- Built-in SSG for fast page loads
- Vue 3 integration out-of-the-box
- Modern build tooling (Vite)
- Easy GitHub Pages deployment

### Why CDN for Three.js/Vanta.js?
- VitePress uses Server-Side Rendering (SSR) during build
- Three.js and Vanta.js are browser-only libraries
- CDN scripts load only in browser, avoiding SSR errors
- Scripts loaded via `<script>` tags in `.vitepress/config.ts`

### Custom Theme Instead of Default VitePress UI
- Default VitePress is for documentation sites
- Custom `Layout.vue` replaces documentation UI entirely
- Fullscreen screensaver experience without nav/sidebar

## APIs Used

1. **Open-Meteo** (`https://api.open-meteo.com/v1/forecast`)
   - Free weather API
   - Location: Immelkeppel, Germany (50.93°N, 7.58°E)
   - Updates every 10 minutes

2. **History Muffin Labs** (`http://history.muffinlabs.com/date`)
   - Historical events for current date
   - Random event selected from response
   - Updates every 5 minutes

3. **Reddit JSON** (`https://www.reddit.com/r/nhl.json`)
   - Public JSON feed for r/NHL subreddit
   - Filters out pinned/stickied posts
   - Checks for new posts every 5 minutes
   - Shows sliding notification for new posts (30-second display)

## Running the Project

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser

3. **Build for production:**
   ```bash
   npm run build
   ```
   Output in `.vitepress/dist/`

4. **Test production build locally:**
   ```bash
   npm run preview
   ```

## Features in Detail

- **Clock Updates**: Every second via `useInterval` composable
- **Background Animation**: Vanta waves with RGB color cycling (100ms intervals)
- **Game Countdown**: Shows "Today", "Tomorrow", or "in X days" for next Kölner Haie game
- **Commercial Overlays**: Rotates through team commercials (Kölner Haie, Edmonton Oilers) with 6 diagonal slice animations
- **Responsive**: Adapts to different screen sizes with media queries
- **No Cursor Hiding**: Cursor remains visible for easy interaction

## License

This is a personal screensaver project for displaying Kölner Haie hockey information.
