import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function Header() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  const linkClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-semibold transition ${
      isActive ? 'bg-red-500/15 text-red-100' : 'text-zinc-300 hover:text-red-50'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
      <nav className="page-shell flex min-h-16 flex-wrap items-center justify-between gap-3 py-2">
        <Link to="/" className="flex items-center gap-3 text-xl font-black tracking-tight">
          <span className="grid size-9 place-items-center rounded-md bg-red-600 text-sm text-white shadow-lg shadow-black/30">
            CV
          </span>
          <span>CineVerse</span>
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-1 sm:gap-3">
          <NavLink to="/" className={linkClass}>
            Movies
          </NavLink>
          <NavLink to="/favorites" className={linkClass}>
            Favorites
          </NavLink>
          {currentUser ? (
            <button type="button" onClick={handleLogout} className="ghost-button">
              Logout
            </button>
          ) : (
            <NavLink to="/login" className="primary-button">
              Login
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
