import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import StatusMessage from '../components/StatusMessage.jsx'
import { useAuth } from '../context/AuthContext.jsx'

function Signup() {
  const { signup, loginWithGoogle, isFirebaseConfigured } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signup(email, password)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Signup failed.')
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleSignup() {
    setError('')
    setLoading(true)

    try {
      await loginWithGoogle()
      navigate('/')
    } catch (err) {
      setError(err.message || 'Google signup failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="page-shell grid min-h-[calc(100vh-4rem)] place-items-center py-10">
      <section className="glass-panel w-full max-w-md rounded-md p-6 shadow-2xl">
        <div className="mb-6 space-y-2">
          <h1 className="text-3xl font-black tracking-tight">Create account</h1>
          <p className="text-sm text-zinc-300">Save favorites across devices.</p>
        </div>
        {!isFirebaseConfigured && (
          <div className="mb-4">
            <StatusMessage tone="error">
              Firebase is not configured yet. Create a .env file from .env.example.
            </StatusMessage>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="form-field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <input
            className="form-field"
            type="password"
            placeholder="Password"
            value={password}
            minLength={6}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          {error && <StatusMessage tone="error">{error}</StatusMessage>}
          <button
            type="submit"
            className="primary-button w-full"
            disabled={loading || !isFirebaseConfigured}
          >
            Sign up
          </button>
        </form>
        <button
          type="button"
          className="ghost-button mt-3 w-full"
          onClick={handleGoogleSignup}
          disabled={loading || !isFirebaseConfigured}
        >
          Continue with Google
        </button>
        <p className="mt-6 text-center text-sm text-zinc-300">
          Already have an account?{' '}
          <Link className="font-semibold text-red-300 hover:text-red-100" to="/login">
            Log in
          </Link>
        </p>
      </section>
    </main>
  )
}

export default Signup
