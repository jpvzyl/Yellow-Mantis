import type { ReactNode } from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useTeams, useIssues, useUpdateIssue } from './hooks'
import { api } from './client'

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    )
  }
}

vi.mock('./client', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
    getWorkspaceSlug: vi.fn(),
    setToken: vi.fn(),
    setWorkspaceSlug: vi.fn(),
  },
}))

describe('API hooks', () => {
  beforeEach(() => {
    vi.mocked(api.getWorkspaceSlug).mockReturnValue('test-workspace')
    vi.mocked(api.get).mockResolvedValue([])
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('useTeams', () => {
    it('fetches teams when workspace slug is set', async () => {
      const teams = [{ id: '1', name: 'Eng', identifier: 'ENG', color: '#333', issue_count: 0 }]
      vi.mocked(api.get).mockResolvedValue(teams as any)

      const { result } = renderHook(() => useTeams(), {
        wrapper: createWrapper(),
      })

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true)
      })

      expect(api.get).toHaveBeenCalledWith('/test-workspace/teams')
      expect(result.current.data).toEqual(teams)
    })

    it('does not fetch when workspace slug is empty', () => {
      vi.mocked(api.getWorkspaceSlug).mockReturnValue(null)
      renderHook(() => useTeams(), { wrapper: createWrapper() })
      expect(api.get).not.toHaveBeenCalled()
    })
  })

  describe('useIssues', () => {
    it('fetches issues for team when slug and teamId are set', async () => {
      const issues = [{ id: 'i1', title: 'Issue 1', identifier: 'ENG-1', priority: 2 }]
      vi.mocked(api.get).mockResolvedValue(issues as any)

      const { result } = renderHook(() => useIssues('ENG'), {
        wrapper: createWrapper(),
      })

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true)
      })

      expect(api.get).toHaveBeenCalledWith('/test-workspace/teams/ENG/issues')
      expect(result.current.data).toEqual(issues)
    })

    it('appends query params when provided', async () => {
      vi.mocked(api.get).mockResolvedValue([])
      renderHook(() => useIssues('ENG', { assignee_id: 'user-1' }), {
        wrapper: createWrapper(),
      })
      await waitFor(() => expect(api.get).toHaveBeenCalled())
      expect(api.get).toHaveBeenCalledWith(expect.stringContaining('assignee_id=user-1'))
    })
  })

  describe('useUpdateIssue', () => {
    it('calls PATCH and invalidates issues query on success', async () => {
      const updated = { id: 'i1', title: 'Updated', state: { id: 's2' } }
      vi.mocked(api.patch).mockResolvedValue(updated as any)

      const { result } = renderHook(() => useUpdateIssue('ENG'), {
        wrapper: createWrapper(),
      })

      result.current.mutate({ id: 'i1', state_id: 's2' } as any)

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true)
      })

      expect(api.patch).toHaveBeenCalledWith('/test-workspace/teams/ENG/issues/i1', { state_id: 's2' })
    })
  })
})
