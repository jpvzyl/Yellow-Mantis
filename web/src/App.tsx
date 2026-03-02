import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useMe } from './api/hooks'
import { api } from './api/client'
import { useAuthStore } from './stores/auth'
import { AppLayout } from './components/layout/AppLayout'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { TeamIssuesPage } from './pages/TeamIssuesPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30_000, retry: 1 },
  },
})

function AuthGuard({ children }: { children: React.ReactNode }) {
  const token = api.getToken()
  const { data, isLoading, isError } = useMe()
  const setUser = useAuthStore((s) => s.setUser)
  const setWorkspaces = useAuthStore((s) => s.setWorkspaces)
  const setCurrentWorkspace = useAuthStore((s) => s.setCurrentWorkspace)
  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      setUser(data.user)
      setWorkspaces(data.workspaces)
      if (data.workspaces.length > 0) {
        const saved = api.getWorkspaceSlug()
        const ws = data.workspaces.find((w) => w.slug === saved) || data.workspaces[0]
        api.setWorkspaceSlug(ws.slug)
        setCurrentWorkspace(ws)
      }
    }
  }, [data, setUser, setWorkspaces, setCurrentWorkspace])

  useEffect(() => {
    if (!token || isError) {
      navigate('/login')
    }
  }, [token, isError, navigate])

  if (!token) return null
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-primary">
        <div className="flex flex-col items-center gap-3">
          <div className="size-10 rounded-xl bg-accent flex items-center justify-center text-white font-bold animate-pulse">YM</div>
          <span className="text-sm text-text-tertiary">Loading...</span>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        element={
          <AuthGuard>
            <AppLayout />
          </AuthGuard>
        }
      >
        <Route path="/" element={<DashboardPage />} />
        <Route path="/team/:teamIdentifier/issues" element={<TeamIssuesPage />} />
        <Route path="/team/:teamIdentifier/board" element={<TeamIssuesPage />} />
        <Route path="/inbox" element={<PlaceholderPage title="Inbox" />} />
        <Route path="/my-issues" element={<PlaceholderPage title="My Issues" />} />
        <Route path="/favorites" element={<PlaceholderPage title="Favorites" />} />
        <Route path="/projects" element={<PlaceholderPage title="Projects" />} />
        <Route path="/roadmap" element={<PlaceholderPage title="Roadmap" />} />
        <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-text-tertiary">
      <h1 className="text-lg font-semibold text-text-primary mb-1">{title}</h1>
      <p className="text-sm">Coming in Phase 2</p>
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  )
}
