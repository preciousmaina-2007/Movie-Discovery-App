import axios from 'axios'

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: import.meta.env.VITE_TMDB_KEY,
  },
})

function ensureTmdbKey() {
  if (!import.meta.env.VITE_TMDB_KEY && import.meta.env.MODE !== 'test') {
    throw new Error('TMDB is not configured yet. Add VITE_TMDB_KEY to your .env file.')
  }
}

const posterBase = 'https://image.tmdb.org/t/p/w500'
const backdropBase = 'https://image.tmdb.org/t/p/original'

export function getPosterUrl(path) {
  return path
    ? `${posterBase}${path}`
    : 'https://placehold.co/500x750/0f172a/e2e8f0?text=CineVerse'
}

export function getBackdropUrl(path) {
  return path ? `${backdropBase}${path}` : null
}

export async function fetchTrendingMovies() {
  ensureTmdbKey()
  const { data } = await tmdb.get('/trending/movie/week')
  return data.results ?? []
}

export async function searchMovies(query) {
  if (!query.trim()) {
    return fetchTrendingMovies()
  }

  ensureTmdbKey()
  const { data } = await tmdb.get('/search/movie', {
    params: {
      query,
      include_adult: false,
    },
  })

  return data.results ?? []
}

export async function fetchMovieDetails(id) {
  ensureTmdbKey()
  const { data } = await tmdb.get(`/movie/${id}`, {
    params: {
      append_to_response: 'videos',
    },
  })

  return data
}

export function getTrailer(movie) {
  return movie?.videos?.results?.find(
    (video) => video.site === 'YouTube' && video.type === 'Trailer',
  )
}
