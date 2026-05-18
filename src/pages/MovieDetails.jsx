import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import StatusMessage from '../components/StatusMessage.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { addFavorite, getFavorites, removeFavorite } from '../services/favorites.js'
import {
  fetchMovieDetails,
  getBackdropUrl,
  getPosterUrl,
  getTrailer,
} from '../services/api.js'

function MovieDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [movie, setMovie] = useState(null)
  const [favorite, setFavorite] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadMovie() {
      try {
        setLoading(true)
        setError('')
        const details = await fetchMovieDetails(id)
        if (!active) return
        setMovie(details)

        if (currentUser) {
          const favorites = await getFavorites(currentUser.uid)
          if (active) {
            setFavorite(favorites.some((item) => item.id === Number(id)))
          }
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Could not load movie details.')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadMovie()
    return () => {
      active = false
    }
  }, [id, currentUser])

  async function handleFavorite() {
    if (!currentUser) {
      navigate('/login', { state: { from: { pathname: `/movie/${id}` } } })
      return
    }

    setSaving(true)
    try {
      if (favorite) {
        await removeFavorite(currentUser.uid, id)
        setFavorite(false)
      } else {
        await addFavorite(currentUser.uid, movie)
        setFavorite(true)
      }
    } catch (err) {
      setError(err.message || 'Could not update favorites.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <main className="page-shell py-10">
        <StatusMessage>Loading movie details...</StatusMessage>
      </main>
    )
  }

  if (error && !movie) {
    return (
      <main className="page-shell py-10">
        <StatusMessage tone="error">{error}</StatusMessage>
      </main>
    )
  }

  const trailer = getTrailer(movie)
  const backdrop = getBackdropUrl(movie.backdrop_path)

  return (
    <main>
      <section
        className="border-b border-white/10 bg-cover bg-center"
        style={{
          backgroundImage: backdrop
            ? `linear-gradient(90deg, rgba(11,12,18,0.98), rgba(11,12,18,0.78)), url(${backdrop})`
            : undefined,
        }}
      >
        <div className="page-shell grid gap-8 py-10 md:grid-cols-[280px_1fr] lg:py-16">
          <img
            src={getPosterUrl(movie.poster_path)}
            alt={`${movie.title} poster`}
            className="w-full max-w-72 rounded-md border border-white/10 object-cover shadow-2xl shadow-black/40"
          />
          <div className="max-w-3xl space-y-5 self-center">
            <Link to="/" className="text-sm font-semibold text-red-300 hover:text-red-100">
              Back to movies
            </Link>
            <div className="space-y-3">
              <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl">
                {movie.title}
              </h1>
              <div className="flex flex-wrap gap-3 text-sm text-zinc-300">
                <span>{movie.release_date || 'Release date TBA'}</span>
                <span>{movie.runtime ? `${movie.runtime} min` : 'Runtime TBA'}</span>
                <span className="font-bold text-teal-200">
                  {movie.vote_average?.toFixed(1) ?? 'NR'} / 10
                </span>
              </div>
            </div>
            <p className="text-base leading-7 text-zinc-200">{movie.overview}</p>
            {error && <StatusMessage tone="error">{error}</StatusMessage>}
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleFavorite}
                className={favorite ? 'ghost-button' : 'primary-button'}
                disabled={saving}
              >
                {favorite ? 'Remove favorite' : 'Add to favorites'}
              </button>
              {trailer && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noreferrer"
                  className="ghost-button"
                >
                  Watch trailer
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {trailer && (
        <section className="page-shell py-8">
          <div className="aspect-video overflow-hidden rounded-md border border-white/10 bg-black">
            <iframe
              title={`${movie.title} trailer`}
              src={`https://www.youtube.com/embed/${trailer.key}`}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      )}
    </main>
  )
}

export default MovieDetails
