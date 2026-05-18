import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'

function favoritesRef(userId) {
  if (!db) {
    throw new Error('Firestore is not configured yet. Add Firebase values to your .env file.')
  }

  return doc(db, 'favorites', userId)
}

export async function getFavorites(userId) {
  const snapshot = await getDoc(favoritesRef(userId))
  return snapshot.exists() ? snapshot.data().movies ?? [] : []
}

export async function addFavorite(userId, movie) {
  const movies = await getFavorites(userId)
  const nextMovies = [
    {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      release_date: movie.release_date ?? '',
      overview: movie.overview ?? '',
    },
    ...movies.filter((item) => item.id !== movie.id),
  ]

  await setDoc(favoritesRef(userId), { movies: nextMovies }, { merge: true })
  return nextMovies
}

export async function removeFavorite(userId, movieId) {
  const movies = await getFavorites(userId)
  const nextMovies = movies.filter((movie) => movie.id !== Number(movieId))

  await setDoc(favoritesRef(userId), { movies: nextMovies }, { merge: true })
  return nextMovies
}
