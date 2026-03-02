import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useLogin } from '../api/hooks'
import { api } from '../api/client'

export function LoginPage() {
  const [email, setEmail] = useState('jp@yellow-mantis.com')
  const [password, setPassword] = useState('password123')
  const [error, setError] = useState('')
  const login = useLogin()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const data = await login.mutateAsync({ email, password })
      api.setToken(data.token)
      navigate('/')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-primary">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center size-12 rounded-xl bg-accent text-white text-xl font-bold mb-4">
            YM
          </div>
          <h1 className="text-xl font-semibold text-text-primary">Sign in to Yellow Mantis</h1>
          <p className="text-sm text-text-secondary mt-1">Project management for builders</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-surface-secondary border border-border-primary rounded-xl p-6 space-y-4">
          {error && (
            <div className="text-sm text-priority-urgent bg-priority-urgent/10 border border-priority-urgent/20 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-tertiary border border-border-primary rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-accent transition-colors"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-tertiary border border-border-primary rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-accent transition-colors"
              placeholder="Password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={login.isPending}
            className="w-full bg-accent text-white rounded-lg py-2 text-sm font-medium hover:bg-accent-hover transition-colors disabled:opacity-50"
          >
            {login.isPending ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-xs text-text-tertiary mt-4">
          Don't have an account? <Link to="/register" className="text-accent hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
