import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore } from './auth'
import type { User, Workspace } from '../types'

const mockUser: User = {
  id: 'u1', email: 'test@test.com', name: 'Test', display_name: 'Test',
  avatar_url: null, timezone: 'UTC', theme: 'dark',
}

const mockWorkspace: Workspace = {
  id: 'w1', name: 'Test WS', slug: 'test-ws', logo: null, created_at: '2026-01-01',
}

describe('AuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, workspaces: [], currentWorkspace: null })
  })

  it('sets user', () => {
    useAuthStore.getState().setUser(mockUser)
    expect(useAuthStore.getState().user).toEqual(mockUser)
  })

  it('sets workspaces', () => {
    useAuthStore.getState().setWorkspaces([mockWorkspace])
    expect(useAuthStore.getState().workspaces).toHaveLength(1)
  })

  it('sets current workspace', () => {
    useAuthStore.getState().setCurrentWorkspace(mockWorkspace)
    expect(useAuthStore.getState().currentWorkspace?.slug).toBe('test-ws')
  })

  it('logout clears all state', () => {
    useAuthStore.getState().setUser(mockUser)
    useAuthStore.getState().setWorkspaces([mockWorkspace])
    useAuthStore.getState().setCurrentWorkspace(mockWorkspace)
    useAuthStore.getState().logout()

    expect(useAuthStore.getState().user).toBeNull()
    expect(useAuthStore.getState().workspaces).toEqual([])
    expect(useAuthStore.getState().currentWorkspace).toBeNull()
  })
})
