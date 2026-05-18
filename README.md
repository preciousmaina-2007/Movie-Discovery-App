# CineVerse

A responsive Netflix-style React movie discovery app built with Vite, Tailwind CSS, Firebase, React Router, Axios, and the TMDB API.

## Features

- Trending movies homepage
- TMDB search
- Movie cards with posters, ratings, and release years
- Movie details with overview, rating, release date, runtime, backdrop, and trailer
- Firebase email/password and Google authentication
- Protected favorites route
- Firestore-backed favorites stored at `favorites/{userId}` as a `movies` array
- Loading and error states
- Vitest and React Testing Library coverage
- GitHub Actions CI and Vercel SPA rewrites

## Setup

Create a `.env` file from `.env.example` and fill in Firebase plus TMDB values.

```bash
npm install
npm run dev
```

Run checks:

```bash
npm run lint
npm run test:run
npm run build
```

## Firebase

Create a Firebase project named `cineverse`, add a web app, enable Authentication with Email/password and Google providers, and create a Firestore database in test mode for local portfolio development.

## Version Roadmap

- `v1.0.0`: Basic movie app
- `v1.1.0`: Details page
- `v1.2.0`: Favorites
- `v2.0.0`: Authentication
- `v2.1.0`: Testing and CI/CD
