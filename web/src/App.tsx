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
import { InboxPage } from './pages/InboxPage'
import { MyIssuesPage } from './pages/MyIssuesPage'
import { FavoritesPage } from './pages/FavoritesPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { RoadmapPage } from './pages/RoadmapPage'
import { SettingsPage } from './pages/SettingsPage'
import { AdminPage } from './pages/AdminPage'
import { AiPresentationPage } from './pages/AiPresentationPage'

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
  const setCompanies = useAuthStore((s) => s.setCompanies)
  const setCurrentCompany = useAuthStore((s) => s.setCurrentCompany)
  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      setUser(data.user)
      setWorkspaces(data.workspaces)
      setCompanies(data.companies || [])

      const savedCompanyId = localStorage.getItem('ym_company')
      const company = data.companies?.find((c) => c.id === savedCompanyId) || data.companies?.[0]

      if (company) {
        setCurrentCompany(company)
        localStorage.setItem('ym_company', company.id)
        if (company.workspace_slug) {
          api.setWorkspaceSlug(company.workspace_slug)
          const ws = data.workspaces.find((w) => w.slug === company.workspace_slug)
          if (ws) setCurrentWorkspace(ws)
        }
      } else if (data.workspaces.length > 0) {
        const saved = api.getWorkspaceSlug()
        const ws = data.workspaces.find((w) => w.slug === saved) || data.workspaces[0]
        api.setWorkspaceSlug(ws.slug)
        setCurrentWorkspace(ws)
      }
    }
  }, [data, setUser, setWorkspaces, setCurrentWorkspace, setCompanies, setCurrentCompany])

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
      <Route path="/presentations/ai" element={<AiPresentationPage />} />
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
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/my-issues" element={<MyIssuesPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
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
