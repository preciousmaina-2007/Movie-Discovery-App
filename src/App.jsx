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
    <div className="min-h-screen overflow-x-hidden bg-[#0b0c12] text-red-50">
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(145deg,rgba(8,9,14,1)_0%,rgba(23,18,25,1)_42%,rgba(9,21,24,1)_100%)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,250,240,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,250,240,0.035)_1px,transparent_1px)] bg-[size:72px_72px]" />
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
