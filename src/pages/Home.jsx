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

  const heroMovies = movies
    .filter((movie) => movie.poster_path)
    .slice(0, 6)

  return (
    <main>
      <section className="border-b border-white/10 bg-black/20">
        <div className="page-shell grid min-h-[520px] gap-10 py-10 md:grid-cols-[minmax(0,1fr)_420px] md:items-center lg:py-14">
          <div className="max-w-3xl space-y-7">
            <p className="section-kicker">
              Movie discovery
            </p>
            <div className="space-y-4">
              <h1 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Find something worth watching tonight.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
                Search the TMDB catalog, scan weekly trends, and keep a focused
                watchlist for later.
              </p>
            </div>
            <SearchBar
              query={query}
              onQueryChange={setQuery}
              onSubmit={handleSearch}
              disabled={loading}
            />
          </div>

          <div className="hidden md:block">
            <div className="grid h-[460px] grid-cols-3 gap-3 overflow-hidden rounded-md border border-white/10 bg-zinc-950/60 p-3 shadow-2xl shadow-black/40">
              {heroMovies.length ? (
                heroMovies.map((movie, index) => (
                  <img
                    key={movie.id}
                    src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                    alt=""
                    className={`h-full w-full rounded object-cover shadow-lg ${
                      index % 2 ? 'translate-y-6' : ''
                    }`}
                  />
                ))
              ) : (
                Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className={`rounded border border-white/10 bg-[linear-gradient(155deg,rgba(239,68,68,0.2),rgba(190,18,60,0.14)_45%,rgba(255,255,255,0.04))] ${
                      index % 2 ? 'translate-y-6' : ''
                    }`}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell space-y-6 py-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-black tracking-tight sm:text-3xl">{heading}</h2>
            <p className="text-sm text-zinc-400">Powered by The Movie Database.</p>
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
