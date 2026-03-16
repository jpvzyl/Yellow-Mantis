import { useNavigate } from 'react-router-dom'
import { useMe } from '../api/hooks'
import { api } from '../api/client'
import { Settings, User, LogOut } from 'lucide-react'

export function SettingsPage() {
  const { data } = useMe()
  const user = data?.user
  const navigate = useNavigate()

  const handleLogout = () => {
    api.setToken(null)
    api.setWorkspaceSlug(null)
    navigate('/login')
  }

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-border-primary">
        <h1 className="text-lg font-semibold text-text-primary flex items-center gap-2">
          <Settings className="size-5" />
          Settings
        </h1>
        <p className="text-sm text-text-secondary mt-0.5">
          Your account and preferences
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 max-w-xl">
        <section className="mb-8">
          <h2 className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-3">Profile</h2>
          <div className="rounded-lg border border-border-primary bg-surface-secondary p-4 flex items-center gap-4">
            <div className="size-12 rounded-full bg-accent flex items-center justify-center text-white font-bold text-lg">
              {user?.name?.[0]?.toUpperCase() ?? user?.email?.[0]?.toUpperCase() ?? '?'}
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">{user?.name ?? '—'}</p>
              <p className="text-xs text-text-tertiary">{user?.email}</p>
              <p className="text-xs text-text-tertiary mt-0.5">Theme: {user?.theme ?? 'dark'}</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-3">Account</h2>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border-primary text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors"
          >
            <LogOut className="size-4" />
            Log out
          </button>
        </section>
      </div>
    </div>
  )
}
