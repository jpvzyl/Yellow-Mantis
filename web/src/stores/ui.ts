import { create } from 'zustand'

interface UIStore {
  sidebarCollapsed: boolean
  toggleSidebar: () => void

  commandPaletteOpen: boolean
  openCommandPalette: () => void
  closeCommandPalette: () => void

  selectedIssueId: string | null
  setSelectedIssue: (id: string | null) => void

  selectedIssueIds: Set<string>
  toggleIssueSelection: (id: string) => void
  clearSelection: () => void

  issueDetailOpen: boolean
  openIssueDetail: (id: string) => void
  closeIssueDetail: () => void

  createIssueOpen: boolean
  openCreateIssue: () => void
  closeCreateIssue: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

  commandPaletteOpen: false,
  openCommandPalette: () => set({ commandPaletteOpen: true }),
  closeCommandPalette: () => set({ commandPaletteOpen: false }),

  selectedIssueId: null,
  setSelectedIssue: (id) => set({ selectedIssueId: id }),

  selectedIssueIds: new Set(),
  toggleIssueSelection: (id) =>
    set((s) => {
      const next = new Set(s.selectedIssueIds)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return { selectedIssueIds: next }
    }),
  clearSelection: () => set({ selectedIssueIds: new Set() }),

  issueDetailOpen: false,
  openIssueDetail: (id) => set({ issueDetailOpen: true, selectedIssueId: id }),
  closeIssueDetail: () => set({ issueDetailOpen: false, selectedIssueId: null }),

  createIssueOpen: false,
  openCreateIssue: () => set({ createIssueOpen: true }),
  closeCreateIssue: () => set({ createIssueOpen: false }),
}))
