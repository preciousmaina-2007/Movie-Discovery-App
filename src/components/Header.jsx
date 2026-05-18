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
    `rounded-md px-3 py-2 text-sm font-medium transition ${
      isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:text-white'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/85 backdrop-blur">
      <nav className="page-shell flex min-h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-black">
          <span className="grid size-9 place-items-center rounded-md bg-rose-600 text-sm">
            CV
          </span>
          <span>CineVerse</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-3">
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
