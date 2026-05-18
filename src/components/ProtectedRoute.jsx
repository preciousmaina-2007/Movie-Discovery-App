import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function ProtectedRoute({ children }) {
  const { currentUser, authLoading } = useAuth()
  const location = useLocation()

  if (authLoading) {
    return (
      <main className="page-shell flex min-h-[70vh] items-center justify-center">
        <p className="text-sm text-slate-300">Checking your session...</p>
      </main>
    )
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute
