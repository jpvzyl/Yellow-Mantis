export interface VaultBusiness {
  id: string
  name: string
  slug: string
  description: string | null
  color: string
  icon: string | null
  website_url: string | null
  position: number
  archived: boolean
  accounts_count: number
  pages_count: number
  documents_count: number
  accounts?: VaultAccount[]
  pages?: VaultPage[]
  created_at: string
  updated_at: string
}

export interface VaultAccount {
  id: string
  provider: 'google'
  email: string
  display_name: string | null
  avatar_url: string | null
  status: 'active' | 'expired' | 'revoked' | 'error'
  last_synced_at: string | null
  token_expires_at: string | null
}

export interface VaultPage {
  id: string
  name: string
  url: string
  icon: string | null
  category: VaultPageCategory
  position: number
  pinned: boolean
  created_at: string
}

export type VaultPageCategory =
  | 'github'
  | 'heroku'
  | 'hosting'
  | 'analytics'
  | 'email'
  | 'social'
  | 'docs'
  | 'billing'
  | 'other'

export interface VaultDocument {
  id: string
  name: string
  description: string | null
  category: VaultDocumentCategory
  file_size: number | null
  content_type: string | null
  sensitive: boolean
  uploaded_by: { id: string; name: string }
  has_file: boolean
  file_fingerprint?: string
  metadata?: Record<string, unknown>
  created_at: string
  updated_at: string
}

export type VaultDocumentCategory =
  | 'general'
  | 'contract'
  | 'invoice'
  | 'credential'
  | 'legal'
  | 'compliance'
  | 'tax'
  | 'marketing'
  | 'other'

export interface GmailMessage {
  id: string
  thread_id: string
  snippet: string
  label_ids: string[]
  from: string
  to: string
  subject: string
  date: string
  is_unread: boolean
  is_starred: boolean
}

export interface GmailMessageFull extends GmailMessage {
  cc: string | null
  bcc: string | null
  body_html: string | null
  body_text: string | null
  attachments: GmailAttachment[]
}

export interface GmailAttachment {
  id: string
  filename: string
  mime_type: string
  size: number
}

export interface GmailLabel {
  id: string
  name: string
  type: string
  messages_total: number
  messages_unread: number
}

export interface GmailMessagesResponse {
  messages: GmailMessage[]
  next_page_token: string | null
  result_size_estimate: number
}

export interface VaultAuditLog {
  id: string
  action: string
  resource_type: string | null
  resource_id: string | null
  ip_address: string | null
  details: Record<string, unknown>
  business_id: string | null
  created_at: string
}

export interface VaultCursorChat {
  id: string
  chat_uuid: string
  project_name: string | null
  title: string | null
  summary: string | null
  message_count: number
  file_size: number
  starred: boolean
  business_id: string | null
  chat_started_at: string | null
  chat_ended_at: string | null
  source_path?: string
  metadata?: Record<string, unknown>
  business?: { id: string; name: string; color: string } | null
  created_at: string
  updated_at: string
}

export interface CursorChatMessage {
  index: number
  role: 'user' | 'assistant'
  text: string
  has_tool_calls: boolean
}

export interface CursorChatScanResult {
  total_discovered: number
  already_imported: number
  new_available: number
  chats: {
    chat_uuid: string
    project_name: string
    source_path: string
    file_size: number
    modified_at: string
    imported: boolean
  }[]
}

export type VaultView = 'inbox' | 'pages' | 'documents' | 'cursor-chats' | 'audit' | 'settings'
