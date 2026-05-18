import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Favorites from './pages/Favorites.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import MovieDetails from './pages/MovieDetails.jsx'
import Signup from './pages/Signup.jsx'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(225,29,72,0.22),transparent_34%),linear-gradient(135deg,#0f172a_0%,#111827_48%,#020617_100%)]" />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
