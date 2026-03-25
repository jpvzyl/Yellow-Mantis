import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from './client'
import type { Issue, Team, Label, User, Workspace, Comment, Project, Company, CompanyMember } from '../types'

// Auth
export function useMe() {
  return useQuery({
    queryKey: ['me'],
    queryFn: () => api.get<{ user: User; workspaces: Workspace[]; companies: Company[] }>('/auth/me'),
    retry: false,
  })
}

export function useLogin() {
  return useMutation({
    mutationFn: (params: { email: string; password: string }) =>
      api.post<{ user: User; token: string; refresh_token: string }>('/auth/login', params),
    onSuccess: (data) => {
      api.setToken(data.token)
    },
  })
}

export function useRegister() {
  return useMutation({
    mutationFn: (params: { email: string; name: string; password: string; password_confirmation: string; workspace_name?: string }) =>
      api.post<{ user: User; token: string; refresh_token: string; workspace: Workspace | null }>('/auth/register', params),
    onSuccess: (data) => {
      api.setToken(data.token)
      if (data.workspace) api.setWorkspaceSlug(data.workspace.slug)
    },
  })
}

// Teams
export function useTeams() {
  const slug = api.getWorkspaceSlug()
  return useQuery({
    queryKey: ['teams', slug],
    queryFn: () => api.get<Team[]>(`/${slug}/teams`),
    enabled: !!slug,
  })
}

export function useTeam(teamId: string) {
  const slug = api.getWorkspaceSlug()
  return useQuery({
    queryKey: ['team', teamId],
    queryFn: () => api.get<Team>(`/${slug}/teams/${teamId}`),
    enabled: !!slug && !!teamId,
  })
}

// Issues
export function useIssues(teamId: string, params?: Record<string, string>) {
  const slug = api.getWorkspaceSlug()
  const searchParams = params ? '?' + new URLSearchParams(params).toString() : ''
  return useQuery({
    queryKey: ['issues', teamId, params],
    queryFn: () => api.get<Issue[]>(`/${slug}/teams/${teamId}/issues${searchParams}`),
    enabled: !!slug && !!teamId,
  })
}

export function useIssue(teamId: string, issueId: string) {
  const slug = api.getWorkspaceSlug()
  return useQuery({
    queryKey: ['issue', issueId],
    queryFn: () => api.get<Issue>(`/${slug}/teams/${teamId}/issues/${issueId}`),
    enabled: !!slug && !!teamId && !!issueId,
  })
}

export function useCreateTeam() {
  const qc = useQueryClient()
  const slug = api.getWorkspaceSlug()
  return useMutation({
    mutationFn: (params: { name: string; identifier: string; color?: string; description?: string }) =>
      api.post<Team>(`/${slug}/teams`, params),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['teams', slug] })
    },
  })
}

export function useUpdateTeam() {
  const qc = useQueryClient()
  const slug = api.getWorkspaceSlug()
  return useMutation({
    mutationFn: ({ id, ...params }: { id: string; name?: string; color?: string; description?: string }) =>
      api.patch<Team>(`/${slug}/teams/${id}`, params),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ['teams', slug] })
      qc.invalidateQueries({ queryKey: ['team', data.identifier] })
    },
  })
}

export function useDeleteTeam() {
  const qc = useQueryClient()
  const slug = api.getWorkspaceSlug()
  return useMutation({
    mutationFn: (teamId: string) =>
      api.delete(`/${slug}/teams/${teamId}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['teams', slug] })
    },
  })
}

export function useCreateIssue(teamId: string) {
  const qc = useQueryClient()
  const slug = api.getWorkspaceSlug()
  return useMutation({
    mutationFn: (params: Partial<Issue>) =>
      api.post<Issue>(`/${slug}/teams/${teamId}/issues`, params),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['issues', teamId] })
    },
  })
}

export function useUpdateIssue(teamId: string) {
  const qc = useQueryClient()
  const slug = api.getWorkspaceSlug()
  return useMutation({
    mutationFn: ({ id, ...params }: Partial<Issue> & { id: string }) =>
      api.patch<Issue>(`/${slug}/teams/${teamId}/issues/${id}`, params),
    onMutate: async ({ id, ...params }) => {
      await qc.cancelQueries({ queryKey: ['issue', id] })
      const previous = qc.getQueryData<Issue>(['issue', id])
      if (previous) {
        qc.setQueryData<Issue>(['issue', id], { ...previous, ...params } as Issue)
      }
      return { previous, id }
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        qc.setQueryData(['issue', context.id], context.previous)
      }
    },
    onSuccess: (data) => {
      qc.setQueryData(['issue', data.id], data)
      qc.invalidateQueries({ queryKey: ['issues', teamId] })
    },
  })
}

export function useBulkUpdateIssues(teamId: string) {
  const qc = useQueryClient()
  const slug = api.getWorkspaceSlug()
  return useMutation({
    mutationFn: (params: { issue_ids: string[]; updates: { state_id?: string; priority?: number; assignee_id?: string | null; project_id?: string | null } }) =>
      api.post<Issue[]>(`/${slug}/teams/${teamId}/issues/bulk_update`, params),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['issues', teamId] })
    },
  })
}

export function useDeleteIssue(teamId: string) {
  const qc = useQueryClient()
  const slug = api.getWorkspaceSlug()
  return useMutation({
    mutationFn: (issueId: string) =>
      api.delete(`/${slug}/teams/${teamId}/issues/${issueId}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['issues', teamId] })
    },
  })
}

// Workspace Members
export function useWorkspaceMembers() {
  const slug = api.getWorkspaceSlug()
  return useQuery({
    queryKey: ['members', slug],
    queryFn: () => api.get<{ id: string; user: User; role: string }[]>(`/${slug}/workspace/members`),
    enabled: !!slug,
  })
}

// Labels
export function useLabels() {
  const slug = api.getWorkspaceSlug()
  return useQuery({
    queryKey: ['labels', slug],
    queryFn: () => api.get<Label[]>(`/${slug}/labels`),
    enabled: !!slug,
  })
}

// Comments
export function useComments(issueId: string) {
  const slug = api.getWorkspaceSlug()
  return useQuery({
    queryKey: ['comments', issueId],
    queryFn: () => api.get<Comment[]>(`/${slug}/teams/_/issues/${issueId}/comments`),
    enabled: !!slug && !!issueId,
  })
}

// Projects
export function useProjects() {
  const slug = api.getWorkspaceSlug()
  return useQuery({
    queryKey: ['projects', slug],
    queryFn: () => api.get<Project[]>(`/${slug}/projects`),
    enabled: !!slug,
  })
}

export function useCreateProject() {
  const qc = useQueryClient()
  const slug = api.getWorkspaceSlug()
  return useMutation({
    mutationFn: (params: { name: string; description?: string; color?: string; status?: string; target_date?: string }) =>
      api.post<Project>(`/${slug}/projects`, params),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['projects', slug] })
    },
  })
}

// Search
export function useSearch(query: string) {
  const slug = api.getWorkspaceSlug()
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => api.get<{ issues: Issue[]; projects: Project[] }>(`/${slug}/search?q=${encodeURIComponent(query)}`),
    enabled: !!slug && query.length >= 2,
  })
}

// Companies
export function useCompanies() {
  return useQuery({
    queryKey: ['companies'],
    queryFn: () => api.get<Company[]>('/companies'),
  })
}

export function useCreateCompany() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (params: { name: string; description?: string; color?: string }) =>
      api.post<Company>('/companies', params),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['companies'] })
      qc.invalidateQueries({ queryKey: ['me'] })
    },
  })
}

export function useCompanyMembers(companyId: string) {
  return useQuery({
    queryKey: ['company-members', companyId],
    queryFn: () => api.get<CompanyMember[]>(`/companies/${companyId}/members`),
    enabled: !!companyId,
  })
}

export function useAddCompanyMember(companyId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (params: { email: string; name?: string; password?: string; role?: string }) =>
      api.post<CompanyMember>(`/companies/${companyId}/members`, params),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['company-members', companyId] })
    },
  })
}

export function useUpdateCompanyMember(companyId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: string }) =>
      api.patch<CompanyMember>(`/companies/${companyId}/members/${id}`, { role }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['company-members', companyId] })
    },
  })
}

export function useRemoveCompanyMember(companyId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (memberId: string) =>
      api.delete(`/companies/${companyId}/members/${memberId}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['company-members', companyId] })
    },
  })
}
