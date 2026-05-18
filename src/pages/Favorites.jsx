import { useEffect, useState } from 'react'
import MovieGrid from '../components/MovieGrid.jsx'
import StatusMessage from '../components/StatusMessage.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { getFavorites } from '../services/favorites.js'

function Favorites() {
  const { currentUser } = useAuth()
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadFavorites() {
      try {
        setLoading(true)
        setError('')
        const favorites = await getFavorites(currentUser.uid)
        if (active) {
          setMovies(favorites)
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Could not load favorites.')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadFavorites()
    return () => {
      active = false
    }
  }, [currentUser])

  return (
    <main className="page-shell space-y-6 py-10">
      <div>
        <p className="section-kicker mb-3">Watchlist</p>
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Your favorites</h1>
        <p className="mt-2 text-sm text-zinc-300">
          A Firestore-backed watchlist for signed-in users.
        </p>
      </div>
      {error && <StatusMessage tone="error">{error}</StatusMessage>}
      {loading ? (
        <StatusMessage>Loading favorites...</StatusMessage>
      ) : (
        <MovieGrid
          movies={movies}
          emptyMessage="Your watchlist is empty. Add movies from a detail page."
        />
      )}
    </main>
  )
}

export default Favorites
