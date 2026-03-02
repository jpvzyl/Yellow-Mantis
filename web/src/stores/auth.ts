import { create } from 'zustand'
import type { User, Workspace } from '../types'

interface AuthStore {
  user: User | null
  workspaces: Workspace[]
  currentWorkspace: Workspace | null
  setUser: (user: User | null) => void
  setWorkspaces: (workspaces: Workspace[]) => void
  setCurrentWorkspace: (workspace: Workspace | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  workspaces: [],
  currentWorkspace: null,
  setUser: (user) => set({ user }),
  setWorkspaces: (workspaces) => set({ workspaces }),
  setCurrentWorkspace: (workspace) => set({ currentWorkspace: workspace }),
  logout: () => {
    localStorage.removeItem('ym_token')
    localStorage.removeItem('ym_workspace')
    set({ user: null, workspaces: [], currentWorkspace: null })
  },
}))
