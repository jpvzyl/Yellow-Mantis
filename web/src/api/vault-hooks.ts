import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'
import { api } from './client'
import type {
  VaultBusiness,
  VaultPage,
  VaultDocument,
  GmailMessagesResponse,
  GmailMessageFull,
  GmailLabel,
  VaultAuditLog,
  VaultCursorChat,
  CursorChatMessage,
  CursorChatScanResult,
} from '../types/vault'

const VAULT_BASE = '/vault'

// ─── Businesses ──────────────────────────────────────────

export function useVaultBusinesses(includeArchived = false) {
  return useQuery({
    queryKey: ['vault', 'businesses', { includeArchived }],
    queryFn: () =>
      api.get<VaultBusiness[]>(
        `${VAULT_BASE}/businesses${includeArchived ? '?include_archived=true' : ''}`
      ),
  })
}

export function useVaultBusiness(id: string | undefined) {
  return useQuery({
    queryKey: ['vault', 'businesses', id],
    queryFn: () => api.get<VaultBusiness>(`${VAULT_BASE}/businesses/${id}`),
    enabled: !!id,
  })
}

export function useCreateBusiness() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: { name: string; description?: string; color?: string; icon?: string; website_url?: string }) =>
      api.post<VaultBusiness>(`${VAULT_BASE}/businesses`, { business: data }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['vault', 'businesses'] }),
  })
}

export function useUpdateBusiness() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...data }: { id: string; name?: string; description?: string; color?: string; icon?: string; website_url?: string }) =>
      api.patch<VaultBusiness>(`${VAULT_BASE}/businesses/${id}`, { business: data }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['vault', 'businesses'] }),
  })
}

export function useDeleteBusiness() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.delete(`${VAULT_BASE}/businesses/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['vault', 'businesses'] }),
  })
}

export function useArchiveBusiness() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.post(`${VAULT_BASE}/businesses/${id}/archive`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['vault', 'businesses'] }),
  })
}

// ─── OAuth ───────────────────────────────────────────────

export function useGoogleAuthorize() {
  return useMutation({
    mutationFn: (businessId: string) =>
      api.get<{ authorization_url: string }>(`${VAULT_BASE}/oauth/google/authorize?business_id=${businessId}`),
  })
}

export function useRevokeAccount() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ businessId, accountId }: { businessId: string; accountId: string }) =>
      api.delete(`${VAULT_BASE}/oauth/google/revoke?business_id=${businessId}&account_id=${accountId}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['vault', 'businesses'] }),
  })
}

// ─── Pages ───────────────────────────────────────────────

export function useVaultPages(businessId: string | undefined) {
  return useQuery({
    queryKey: ['vault', 'pages', businessId],
    queryFn: () => api.get<VaultPage[]>(`${VAULT_BASE}/businesses/${businessId}/pages`),
    enabled: !!businessId,
  })
}

export function useCreatePage() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ businessId, ...data }: { businessId: string; name: string; url: string; icon?: string; category?: string }) =>
      api.post<VaultPage>(`${VAULT_BASE}/businesses/${businessId}/pages`, { page: data }),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ['vault', 'pages', vars.businessId] })
      qc.invalidateQueries({ queryKey: ['vault', 'businesses'] })
    },
  })
}

export function useUpdatePage() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ businessId, id, ...data }: { businessId: string; id: string; name?: string; url?: string; icon?: string; category?: string }) =>
      api.patch<VaultPage>(`${VAULT_BASE}/businesses/${businessId}/pages/${id}`, { page: data }),
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: ['vault', 'pages', vars.businessId] }),
  })
}

export function useDeletePage() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ businessId, id }: { businessId: string; id: string }) =>
      api.delete(`${VAULT_BASE}/businesses/${businessId}/pages/${id}`),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ['vault', 'pages', vars.businessId] })
      qc.invalidateQueries({ queryKey: ['vault', 'businesses'] })
    },
  })
}

export function useTogglePagePin() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ businessId, id }: { businessId: string; id: string }) =>
      api.post<VaultPage>(`${VAULT_BASE}/businesses/${businessId}/pages/${id}/toggle_pin`),
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: ['vault', 'pages', vars.businessId] }),
  })
}

// ─── Documents ───────────────────────────────────────────

export function useVaultDocuments(businessId: string | undefined, category?: string) {
  return useQuery({
    queryKey: ['vault', 'documents', businessId, category],
    queryFn: () => {
      const params = category ? `?category=${category}` : ''
      return api.get<VaultDocument[]>(`${VAULT_BASE}/businesses/${businessId}/documents${params}`)
    },
    enabled: !!businessId,
  })
}

export function useUploadDocument() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ businessId, file, name, description, category, sensitive }: {
      businessId: string
      file: File
      name: string
      description?: string
      category?: string
      sensitive?: boolean
    }) => {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('name', name)
      if (description) formData.append('description', description)
      if (category) formData.append('category', category)
      if (sensitive) formData.append('sensitive', 'true')

      const token = api.getToken()
      const slug = api.getWorkspaceSlug()
      const base = (import.meta.env.VITE_API_URL || '') + '/api/v1'

      const res = await fetch(`${base}${VAULT_BASE}/businesses/${businessId}/documents`, {
        method: 'POST',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...(slug ? { 'X-Workspace-Slug': slug } : {}),
        },
        body: formData,
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Upload failed' }))
        throw new Error(err.error || err.errors?.join(', ') || 'Upload failed')
      }

      return res.json() as Promise<VaultDocument>
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ['vault', 'documents', vars.businessId] })
      qc.invalidateQueries({ queryKey: ['vault', 'businesses'] })
    },
  })
}

export function useDeleteDocument() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ businessId, id }: { businessId: string; id: string }) =>
      api.delete(`${VAULT_BASE}/businesses/${businessId}/documents/${id}`),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ['vault', 'documents', vars.businessId] })
      qc.invalidateQueries({ queryKey: ['vault', 'businesses'] })
    },
  })
}

// ─── Gmail ───────────────────────────────────────────────

export function useGmailMessages(businessId: string | undefined, accountId: string | undefined, query?: string) {
  return useInfiniteQuery({
    queryKey: ['vault', 'gmail', 'messages', businessId, accountId, query],
    queryFn: ({ pageParam }) => {
      const params = new URLSearchParams()
      if (pageParam) params.set('page_token', pageParam)
      if (query) params.set('q', query)
      const qs = params.toString()
      return api.get<GmailMessagesResponse>(
        `${VAULT_BASE}/businesses/${businessId}/accounts/${accountId}/gmail/messages${qs ? `?${qs}` : ''}`
      )
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.next_page_token ?? undefined,
    enabled: !!businessId && !!accountId,
  })
}

export function useGmailMessage(businessId: string | undefined, accountId: string | undefined, messageId: string | undefined) {
  return useQuery({
    queryKey: ['vault', 'gmail', 'message', messageId],
    queryFn: () =>
      api.get<GmailMessageFull>(
        `${VAULT_BASE}/businesses/${businessId}/accounts/${accountId}/gmail/messages/${messageId}`
      ),
    enabled: !!businessId && !!accountId && !!messageId,
  })
}

export function useGmailLabels(businessId: string | undefined, accountId: string | undefined) {
  return useQuery({
    queryKey: ['vault', 'gmail', 'labels', businessId, accountId],
    queryFn: () =>
      api.get<GmailLabel[]>(
        `${VAULT_BASE}/businesses/${businessId}/accounts/${accountId}/gmail/labels`
      ),
    enabled: !!businessId && !!accountId,
  })
}

export function useMarkGmailRead() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ businessId, accountId, messageId }: { businessId: string; accountId: string; messageId: string }) =>
      api.post(`${VAULT_BASE}/businesses/${businessId}/accounts/${accountId}/gmail/messages/${messageId}/read`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['vault', 'gmail'] }),
  })
}

export function useArchiveGmail() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ businessId, accountId, messageId }: { businessId: string; accountId: string; messageId: string }) =>
      api.post(`${VAULT_BASE}/businesses/${businessId}/accounts/${accountId}/gmail/messages/${messageId}/archive`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['vault', 'gmail'] }),
  })
}

export function useSendGmail() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ businessId, accountId, ...data }: { businessId: string; accountId: string; to: string; subject: string; body: string; thread_id?: string }) =>
      api.post(`${VAULT_BASE}/businesses/${businessId}/accounts/${accountId}/gmail/send`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['vault', 'gmail'] }),
  })
}

// ─── Cursor Chats ────────────────────────────────────────

export function useVaultCursorChats(params?: { businessId?: string; unassigned?: boolean; starred?: boolean; project?: string; q?: string }) {
  return useQuery({
    queryKey: ['vault', 'cursor-chats', params],
    queryFn: () => {
      const qs = new URLSearchParams()
      if (params?.businessId) qs.set('business_id', params.businessId)
      if (params?.unassigned) qs.set('unassigned', 'true')
      if (params?.starred) qs.set('starred', 'true')
      if (params?.project) qs.set('project', params.project)
      if (params?.q) qs.set('q', params.q)
      const query = qs.toString()
      return api.get<VaultCursorChat[]>(`${VAULT_BASE}/cursor_chats${query ? `?${query}` : ''}`)
    },
  })
}

export function useVaultCursorChat(id: string | undefined) {
  return useQuery({
    queryKey: ['vault', 'cursor-chats', id],
    queryFn: () => api.get<VaultCursorChat>(`${VAULT_BASE}/cursor_chats/${id}`),
    enabled: !!id,
  })
}

export function useCursorChatMessages(id: string | undefined) {
  return useQuery({
    queryKey: ['vault', 'cursor-chat-messages', id],
    queryFn: () => api.get<{ messages: CursorChatMessage[]; total: number }>(`${VAULT_BASE}/cursor_chats/${id}/messages`),
    enabled: !!id,
  })
}

export function useScanCursorChats() {
  return useQuery({
    queryKey: ['vault', 'cursor-chats-scan'],
    queryFn: () => api.get<CursorChatScanResult>(`${VAULT_BASE}/cursor_chats/scan`),
    enabled: false,
  })
}

export function useImportCursorChats() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: { chat_uuids?: string[]; business_id?: string; import_all?: boolean }) =>
      api.post<{ imported: number; chats: VaultCursorChat[] }>(`${VAULT_BASE}/cursor_chats/import`, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['vault', 'cursor-chats'] })
      qc.invalidateQueries({ queryKey: ['vault', 'cursor-chats-scan'] })
    },
  })
}

export function useSyncCursorChats() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: () => api.post<{ created: number; updated: number; total: number }>(`${VAULT_BASE}/cursor_chats/sync`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['vault', 'cursor-chats'] }),
  })
}

export function useAssignCursorChat() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, businessId }: { id: string; businessId: string | null }) =>
      api.post<VaultCursorChat>(`${VAULT_BASE}/cursor_chats/${id}/assign`, { business_id: businessId }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['vault', 'cursor-chats'] }),
  })
}

export function useStarCursorChat() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.post<VaultCursorChat>(`${VAULT_BASE}/cursor_chats/${id}/star`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['vault', 'cursor-chats'] }),
  })
}

export function useCursorChatProjects() {
  return useQuery({
    queryKey: ['vault', 'cursor-chat-projects'],
    queryFn: () => api.get<string[]>(`${VAULT_BASE}/cursor_chats/projects`),
  })
}

// ─── Audit Logs ──────────────────────────────────────────

export function useVaultAuditLogs(businessId?: string) {
  return useQuery({
    queryKey: ['vault', 'audit-logs', businessId],
    queryFn: () => {
      const params = businessId ? `?business_id=${businessId}` : ''
      return api.get<VaultAuditLog[]>(`${VAULT_BASE}/audit-logs${params}`)
    },
  })
}
