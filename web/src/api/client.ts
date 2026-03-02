const API_BASE = (import.meta.env.VITE_API_URL || '') + '/api/v1'

interface RequestOptions {
  method?: string
  body?: unknown
  headers?: Record<string, string>
}

class ApiClient {
  private token: string | null = null
  private workspaceSlug: string | null = null

  setToken(token: string | null) {
    this.token = token
    if (token) localStorage.setItem('ym_token', token)
    else localStorage.removeItem('ym_token')
  }

  setWorkspaceSlug(slug: string | null) {
    this.workspaceSlug = slug
    if (slug) localStorage.setItem('ym_workspace', slug)
    else localStorage.removeItem('ym_workspace')
  }

  getToken(): string | null {
    if (!this.token) this.token = localStorage.getItem('ym_token')
    return this.token
  }

  getWorkspaceSlug(): string | null {
    if (!this.workspaceSlug) this.workspaceSlug = localStorage.getItem('ym_workspace')
    return this.workspaceSlug
  }

  private async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    const token = this.getToken()
    if (token) headers['Authorization'] = `Bearer ${token}`

    const slug = this.getWorkspaceSlug()
    if (slug) headers['X-Workspace-Slug'] = slug

    const response = await fetch(`${API_BASE}${path}`, {
      method: options.method || 'GET',
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    })

    if (response.status === 401) {
      this.setToken(null)
      window.location.href = '/login'
      throw new Error('Unauthorized')
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }))
      throw new Error(error.error || error.errors?.join(', ') || 'Request failed')
    }

    if (response.status === 204) return undefined as T
    return response.json()
  }

  get<T>(path: string) {
    return this.request<T>(path)
  }

  post<T>(path: string, body?: unknown) {
    return this.request<T>(path, { method: 'POST', body })
  }

  patch<T>(path: string, body?: unknown) {
    return this.request<T>(path, { method: 'PATCH', body })
  }

  delete<T>(path: string) {
    return this.request<T>(path, { method: 'DELETE' })
  }

  workspacePath(path: string = '') {
    return `/${this.getWorkspaceSlug()}${path}`
  }
}

export const api = new ApiClient()
