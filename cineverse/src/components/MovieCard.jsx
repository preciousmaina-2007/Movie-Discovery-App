import { Link } from 'react-router-dom'
import { getPosterUrl } from '../services/api.js'

function MovieCard({ movie }) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group block overflow-hidden rounded-md border border-white/10 bg-slate-900/80 shadow-lg transition hover:-translate-y-1 hover:border-rose-400/60 hover:shadow-glow"
    >
      <div className="aspect-[2/3] overflow-hidden bg-slate-800">
        <img
          src={getPosterUrl(movie.poster_path)}
          alt={`${movie.title} poster`}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="space-y-2 p-3">
        <h3 className="line-clamp-2 min-h-10 text-sm font-semibold text-white">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between text-xs text-slate-300">
          <span>{movie.release_date?.slice(0, 4) || 'TBA'}</span>
          <span className="rounded bg-amber-400 px-2 py-1 font-bold text-slate-950">
            {movie.vote_average ? movie.vote_average.toFixed(1) : 'NR'}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard
