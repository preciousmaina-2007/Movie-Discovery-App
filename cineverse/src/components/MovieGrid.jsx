import MovieCard from './MovieCard.jsx'

function MovieGrid({ movies, emptyMessage = 'No movies found.' }) {
  if (!movies.length) {
    return (
      <div className="glass-panel rounded-md p-10 text-center text-slate-300">
        {emptyMessage}
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
