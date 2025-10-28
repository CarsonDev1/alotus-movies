# Project - Movies

**Movies** is a movies app using the [The Movie Database API](https://developers.themoviedb.org/3).

## User Stories

The following **required** functionality is completed:

-   [x] User can view a list of movies currently playing in theaters. Poster images load asynchronously.
-   [x] Add a tab bar for **Now Playing** and **Top Rated** movies.
-   [x] Add a search bar.
-   [x] User can view movie details by tapping on a cell.
-   [x] User sees loading state while waiting for the API.
-   [x] User sees an error message when there is a network error.
-   [x] Simple responsive.

The following **optional** features are implemented:

-   [x] Implement segmented control to switch between list view and grid view.
-   [x] All images fade in.
-   [x] Implement lazy load image.
-   [x] Customize the highlight and selection effect of the cell.
-   [x] Improve UX loading by skeleton loading.
-   [x] Enhance responsive.

The following **additional** features are implemented:

-   [x] Dark/Light theme toggle
-   [x] Multi-language support (English/Vietnamese)
-   [x] Infinite scroll pagination
-   [x] Movie trailers (YouTube embed)
-   [x] Cast and crew information
-   [x] Hover preview trailers (desktop)
-   [x] My List feature (localStorage)
-   [x] Error boundaries with custom error pages

## Tech Stack

-   React 18 with TypeScript
-   Vite
-   React Router v7
-   TanStack Query (React Query)
-   SCSS (no frameworks)
-   i18next
-   Axios

## Build Instructions

### Prerequisites

-   Node.js 18+
-   TMDB API Key

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd alotus-movies
```

2. Install dependencies

```bash
npm install
```

3. Create `.env` file in root directory

```bash
VITE_TMDB_API_KEY=your_api_key_here
```

Get your API key from [TMDB](https://www.themoviedb.org/settings/api)

4. Start development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Production Build

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── api/              # TMDB API integration
├── components/       # Reusable UI components
├── constants/        # App constants
├── hooks/            # Custom React hooks
├── layout/           # Layout components
├── pages/            # Page components
├── router/           # Routing configuration
├── styles/           # Global SCSS styles
├── theme/            # Theme provider
└── types/            # TypeScript definitions
```

## Key Features

### Core Features

-   Now Playing and Top Rated movies with tab navigation
-   Search functionality with real-time results
-   Movie detail page with comprehensive information
-   Grid and list view toggle
-   Infinite scroll pagination

### Image Optimization

-   Lazy loading with IntersectionObserver
-   Fade-in animation on load
-   Responsive image sizes from TMDB

### Loading & Error States

-   Skeleton screens for better UX
-   Network error handling
-   Custom error pages (404, 500)

### Performance

-   React Query for caching and state management
-   Code splitting with React Router
-   Optimized re-renders with memo/callback

### Accessibility

-   Semantic HTML
-   ARIA labels
-   Keyboard navigation support

## Video Walkthrough

> [Add your video walkthrough or GIF here ](https://drive.google.com/file/d/1rmb3kBn883DNYEH70PGqGHSoMKdaSTkq/view?usp=sharing)

## Requirements Met

-   ReactJS with TypeScript: Yes
-   SCSS for styling: Yes
-   No CSS/SCSS frameworks or UI libraries: Yes

## License

    Copyright [2025] [CarsonDev1]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
