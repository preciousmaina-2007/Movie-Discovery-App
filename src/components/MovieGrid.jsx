import MovieCard from './MovieCard.jsx'

function MovieGrid({ movies, emptyMessage = 'No movies found.' }) {
  if (!movies.length) {
    return (
      <div className="glass-panel grid min-h-52 place-items-center rounded-md p-8 text-center">
        <div className="max-w-md space-y-2">
          <p className="text-lg font-bold text-red-50">{emptyMessage}</p>
          <p className="text-sm leading-6 text-zinc-400">
            Try a different title or add your API keys in the local environment file.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

export default MovieGrid
