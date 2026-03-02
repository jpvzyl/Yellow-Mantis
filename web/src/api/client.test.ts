import { describe, it, expect, beforeEach } from 'vitest'
import { api } from './client'

describe('ApiClient', () => {
  beforeEach(() => {
    localStorage.clear()
    api.setToken(null)
    api.setWorkspaceSlug(null)
  })

  it('stores and retrieves token', () => {
    expect(api.getToken()).toBeNull()
    api.setToken('my-token')
    expect(api.getToken()).toBe('my-token')
    expect(localStorage.getItem('ym_token')).toBe('my-token')
  })

  it('stores and retrieves workspace slug', () => {
    expect(api.getWorkspaceSlug()).toBeNull()
    api.setWorkspaceSlug('my-workspace')
    expect(api.getWorkspaceSlug()).toBe('my-workspace')
    expect(localStorage.getItem('ym_workspace')).toBe('my-workspace')
  })

  it('clears token from localStorage', () => {
    api.setToken('temp')
    api.setToken(null)
    expect(localStorage.getItem('ym_token')).toBeNull()
  })

  it('clears workspace from localStorage', () => {
    api.setWorkspaceSlug('temp')
    api.setWorkspaceSlug(null)
    expect(localStorage.getItem('ym_workspace')).toBeNull()
  })

  it('workspacePath builds correct path', () => {
    api.setWorkspaceSlug('yellow-mantis')
    expect(api.workspacePath('/teams')).toBe('/yellow-mantis/teams')
    expect(api.workspacePath('')).toBe('/yellow-mantis')
  })
})
