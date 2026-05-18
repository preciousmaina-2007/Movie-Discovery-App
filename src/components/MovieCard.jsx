import { Link } from 'react-router-dom'
import { getPosterUrl } from '../services/api.js'

function MovieCard({ movie }) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group block overflow-hidden rounded-md border border-white/10 bg-zinc-950/70 shadow-lg shadow-black/20 transition duration-200 hover:-translate-y-1 hover:border-red-400/45 hover:bg-zinc-900/80 hover:shadow-2xl hover:shadow-black/30"
    >
      <div className="aspect-[2/3] overflow-hidden bg-zinc-900">
        <img
          src={getPosterUrl(movie.poster_path)}
          alt={`${movie.title} poster`}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="space-y-3 p-3">
        <h3 className="line-clamp-2 min-h-10 text-sm font-bold leading-5 text-red-50">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span className="font-medium">{movie.release_date?.slice(0, 4) || 'TBA'}</span>
          <span className="rounded bg-teal-300 px-2 py-1 font-black text-zinc-950">
            {movie.vote_average ? movie.vote_average.toFixed(1) : 'NR'}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard
