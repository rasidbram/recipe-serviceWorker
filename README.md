## install dependencies
```bash
npm install
```

## run the project
```bash
npm run dev
```

## Configuration
The app uses Vite as the build tool and includes the VitePWA plugin for caching API responses.

vite.config.js: Includes configuration for PWA functionality, caching recipe data for offline access.
App Component: Handles fetching the list of recipes and individual recipe details. Data is cached using the browser’s Cache API for offline access.

## Caching
The app uses a CacheFirst strategy for recipe data, caching up to 50 entries for 30 days. If network requests fail, cached data will be used.
