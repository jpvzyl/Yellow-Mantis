import { describe, it, expect, beforeEach } from 'vitest'
import { useUIStore } from './ui'

describe('UIStore', () => {
  beforeEach(() => {
    useUIStore.setState({
      sidebarCollapsed: false,
      commandPaletteOpen: false,
      selectedIssueId: null,
      selectedIssueIds: new Set(),
      issueDetailOpen: false,
      createIssueOpen: false,
    })
  })

  it('toggles sidebar', () => {
    expect(useUIStore.getState().sidebarCollapsed).toBe(false)
    useUIStore.getState().toggleSidebar()
    expect(useUIStore.getState().sidebarCollapsed).toBe(true)
    useUIStore.getState().toggleSidebar()
    expect(useUIStore.getState().sidebarCollapsed).toBe(false)
  })

  it('opens and closes command palette', () => {
    useUIStore.getState().openCommandPalette()
    expect(useUIStore.getState().commandPaletteOpen).toBe(true)
    useUIStore.getState().closeCommandPalette()
    expect(useUIStore.getState().commandPaletteOpen).toBe(false)
  })

  it('opens issue detail with selected ID', () => {
    useUIStore.getState().openIssueDetail('issue-123')
    expect(useUIStore.getState().issueDetailOpen).toBe(true)
    expect(useUIStore.getState().selectedIssueId).toBe('issue-123')
  })

  it('closes issue detail and clears ID', () => {
    useUIStore.getState().openIssueDetail('issue-123')
    useUIStore.getState().closeIssueDetail()
    expect(useUIStore.getState().issueDetailOpen).toBe(false)
    expect(useUIStore.getState().selectedIssueId).toBeNull()
  })

  it('toggles issue selection', () => {
    useUIStore.getState().toggleIssueSelection('a')
    useUIStore.getState().toggleIssueSelection('b')
    expect(useUIStore.getState().selectedIssueIds.size).toBe(2)
    expect(useUIStore.getState().selectedIssueIds.has('a')).toBe(true)

    useUIStore.getState().toggleIssueSelection('a')
    expect(useUIStore.getState().selectedIssueIds.has('a')).toBe(false)
    expect(useUIStore.getState().selectedIssueIds.size).toBe(1)
  })

  it('clears selection', () => {
    useUIStore.getState().toggleIssueSelection('a')
    useUIStore.getState().toggleIssueSelection('b')
    useUIStore.getState().clearSelection()
    expect(useUIStore.getState().selectedIssueIds.size).toBe(0)
  })

  it('opens and closes create issue dialog', () => {
    useUIStore.getState().openCreateIssue()
    expect(useUIStore.getState().createIssueOpen).toBe(true)
    useUIStore.getState().closeCreateIssue()
    expect(useUIStore.getState().createIssueOpen).toBe(false)
  })
})
