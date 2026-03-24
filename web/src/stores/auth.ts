import { create } from 'zustand'
import type { User, Workspace, Company } from '../types'

interface AuthStore {
  user: User | null
  workspaces: Workspace[]
  currentWorkspace: Workspace | null
  companies: Company[]
  currentCompany: Company | null
  setUser: (user: User | null) => void
  setWorkspaces: (workspaces: Workspace[]) => void
  setCurrentWorkspace: (workspace: Workspace | null) => void
  setCompanies: (companies: Company[]) => void
  setCurrentCompany: (company: Company | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  workspaces: [],
  currentWorkspace: null,
  companies: [],
  currentCompany: null,
  setUser: (user) => set({ user }),
  setWorkspaces: (workspaces) => set({ workspaces }),
  setCurrentWorkspace: (workspace) => set({ currentWorkspace: workspace }),
  setCompanies: (companies) => set({ companies }),
  setCurrentCompany: (company) => set({ currentCompany: company }),
  logout: () => {
    localStorage.removeItem('ym_token')
    localStorage.removeItem('ym_workspace')
    localStorage.removeItem('ym_company')
    set({ user: null, workspaces: [], currentWorkspace: null, companies: [], currentCompany: null })
  },
}))
