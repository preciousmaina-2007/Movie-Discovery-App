import { useEffect, useState } from 'react'
import MovieGrid from '../components/MovieGrid.jsx'
import SearchBar from '../components/SearchBar.jsx'
import StatusMessage from '../components/StatusMessage.jsx'
import { fetchTrendingMovies, searchMovies } from '../services/api.js'

function Home() {
  const [movies, setMovies] = useState([])
  const [query, setQuery] = useState('')
  const [heading, setHeading] = useState('Trending this week')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadTrending() {
      try {
        setLoading(true)
        setError('')
        const results = await fetchTrendingMovies()
        if (active) {
          setMovies(results)
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Could not load trending movies.')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadTrending()
    return () => {
      active = false
    }
  }, [])

  async function handleSearch(event) {
    event.preventDefault()

    try {
      setLoading(true)
      setError('')
      const results = await searchMovies(query)
      setMovies(results)
      setHeading(query.trim() ? `Results for "${query.trim()}"` : 'Trending this week')
    } catch (err) {
      setError(err.message || 'Search failed. Try another title.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <section className="border-b border-white/10">
        <div className="page-shell grid gap-8 py-10 md:grid-cols-[1.1fr_0.9fr] md:items-center lg:py-16">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-rose-300">
              Portfolio movie discovery
            </p>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                Find your next favorite film in CineVerse.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Browse weekly trends, search TMDB, open rich detail pages, and
                keep a cloud-synced watchlist after signing in.
              </p>
            </div>
            <SearchBar
              query={query}
              onQueryChange={setQuery}
              onSubmit={handleSearch}
              disabled={loading}
            />
          </div>

          <div className="hidden min-h-80 overflow-hidden rounded-md border border-white/10 bg-slate-900 shadow-glow md:block">
            <div className="grid h-full grid-cols-3 gap-2 p-3">
              {movies.slice(0, 6).map((movie) => (
                <img
                  key={movie.id}
                  src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                  alt=""
                  className="h-full min-h-36 w-full rounded object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell space-y-6 py-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">{heading}</h2>
            <p className="text-sm text-slate-400">Powered by The Movie Database.</p>
          </div>
        </div>

        {error && <StatusMessage tone="error">{error}</StatusMessage>}
        {loading ? (
          <StatusMessage>Loading movies...</StatusMessage>
        ) : (
          <MovieGrid movies={movies} emptyMessage="No movies matched your search." />
        )}
      </section>
    </main>
  )
}

export default Home
