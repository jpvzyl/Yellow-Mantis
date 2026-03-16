import { useState } from 'react'
import { clsx } from 'clsx'
import {
  Mail,
  Star,
  Archive,
  Search,
  RefreshCw,
  ChevronRight,
  Plus,
  ExternalLink,
  Shield,
  Inbox,
  AlertCircle,
} from 'lucide-react'
import { useVaultStore } from '../../stores/vault'
import { useGmailMessages, useGmailMessage, useMarkGmailRead, useArchiveGmail, useGoogleAuthorize } from '../../api/vault-hooks'
import type { GmailMessage } from '../../types/vault'

export function GmailInbox() {
  const activeBusiness = useVaultStore((s) => s.activeBusiness)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)

  const account = activeBusiness?.accounts?.[0]
  const authorize = useGoogleAuthorize()

  const {
    data: messagesData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useGmailMessages(activeBusiness?.id, account?.id, searchQuery || undefined)

  const { data: messageDetail } = useGmailMessage(activeBusiness?.id, account?.id, selectedMessage || undefined)
  const markRead = useMarkGmailRead()
  const archiveMsg = useArchiveGmail()

  const messages = messagesData?.pages.flatMap((p) => p.messages) || []

  const handleLinkAccount = async () => {
    if (!activeBusiness) return
    try {
      const result = await authorize.mutateAsync(activeBusiness.id)
      window.location.href = result.authorization_url
    } catch {
      // Error handled by mutation
    }
  }

  const handleSelectMessage = (msg: GmailMessage) => {
    setSelectedMessage(msg.id)
    if (msg.is_unread && account) {
      markRead.mutate({ businessId: activeBusiness!.id, accountId: account.id, messageId: msg.id })
    }
  }

  const handleArchive = (messageId: string) => {
    if (!account) return
    archiveMsg.mutate({ businessId: activeBusiness!.id, accountId: account.id, messageId })
    setSelectedMessage(null)
  }

  if (!account || activeBusiness?.accounts_count === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center max-w-sm">
          <div className="size-16 rounded-2xl bg-vault-surface border border-vault-border flex items-center justify-center mx-auto mb-5 shadow-lg shadow-vault-accent/5">
            <Mail className="size-8 text-vault-accent" />
          </div>
          <h3 className="text-lg font-semibold text-vault-text-primary mb-2">Link Gmail Account</h3>
          <p className="text-sm text-vault-text-secondary mb-6 leading-relaxed">
            Connect your Gmail account to view emails directly in the vault. OAuth2 tokens are encrypted at rest.
          </p>
          <button
            onClick={handleLinkAccount}
            disabled={authorize.isPending}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-vault-accent text-white text-sm font-medium hover:bg-vault-accent-hover transition-colors shadow-lg shadow-vault-accent/25 disabled:opacity-50"
          >
            <Plus className="size-4" />
            {authorize.isPending ? 'Connecting...' : 'Connect Gmail'}
          </button>
          <div className="flex items-center gap-2 justify-center mt-4">
            <Shield className="size-3 text-vault-text-muted" />
            <span className="text-[10px] text-vault-text-muted">Tokens encrypted with AES-256</span>
          </div>
        </div>
      </div>
    )
  }

  if (account.status === 'revoked' || account.status === 'error') {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center max-w-sm">
          <AlertCircle className="size-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-vault-text-primary mb-2">Account Needs Reconnection</h3>
          <p className="text-sm text-vault-text-secondary mb-4">
            The connection to {account.email} has expired. Please reconnect to continue.
          </p>
          <button
            onClick={handleLinkAccount}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-vault-accent text-white text-sm font-medium hover:bg-vault-accent-hover transition-colors"
          >
            Reconnect Account
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex">
      {/* Message List */}
      <div className={clsx('flex flex-col border-r border-vault-border', selectedMessage ? 'w-96' : 'flex-1')}>
        {/* Search & Actions Bar */}
        <div className="px-4 py-3 border-b border-vault-border flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-vault-text-muted" />
            <input
              type="text"
              placeholder="Search emails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-md bg-vault-surface border border-vault-border text-sm text-vault-text-primary placeholder:text-vault-text-muted focus:outline-none focus:border-vault-accent/50 transition-colors"
            />
          </div>
          <button
            onClick={() => refetch()}
            className="p-1.5 rounded-md text-vault-text-muted hover:text-vault-text-primary hover:bg-vault-hover transition-colors"
            title="Refresh"
          >
            <RefreshCw className="size-4" />
          </button>
        </div>

        {/* Account Info */}
        <div className="px-4 py-2 border-b border-vault-border flex items-center gap-2 bg-vault-surface/30">
          {account.avatar_url ? (
            <img src={account.avatar_url} alt="" className="size-5 rounded-full" />
          ) : (
            <div className="size-5 rounded-full bg-vault-accent/20 flex items-center justify-center">
              <Mail className="size-2.5 text-vault-accent" />
            </div>
          )}
          <span className="text-xs text-vault-text-secondary">{account.email}</span>
          <div className="size-1.5 rounded-full bg-green-500 ml-1" />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="size-5 text-vault-text-muted animate-spin" />
            </div>
          )}

          {!isLoading && messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-vault-text-muted">
              <Inbox className="size-8 mb-2" />
              <span className="text-sm">No messages found</span>
            </div>
          )}

          {messages.map((msg) => (
            <button
              key={msg.id}
              onClick={() => handleSelectMessage(msg)}
              className={clsx(
                'w-full text-left px-4 py-3 border-b border-vault-border transition-colors group',
                selectedMessage === msg.id
                  ? 'bg-vault-active'
                  : 'hover:bg-vault-hover',
                msg.is_unread && 'bg-vault-surface/50'
              )}
            >
              <div className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                  {msg.is_starred ? (
                    <Star className="size-3.5 text-amber-400 fill-amber-400" />
                  ) : (
                    <div className={clsx('size-2 rounded-full mt-1', msg.is_unread ? 'bg-vault-accent' : 'bg-transparent')} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={clsx('text-[13px] truncate', msg.is_unread ? 'font-semibold text-vault-text-primary' : 'text-vault-text-secondary')}>
                      {extractName(msg.from)}
                    </span>
                    <span className="ml-auto text-[10px] text-vault-text-muted shrink-0">{formatDate(msg.date)}</span>
                  </div>
                  <div className={clsx('text-xs truncate mb-0.5', msg.is_unread ? 'text-vault-text-primary font-medium' : 'text-vault-text-secondary')}>
                    {msg.subject || '(no subject)'}
                  </div>
                  <div className="text-[11px] text-vault-text-muted truncate">{msg.snippet}</div>
                </div>
                <ChevronRight className="size-3.5 text-vault-text-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
              </div>
            </button>
          ))}

          {hasNextPage && (
            <button
              onClick={() => fetchNextPage()}
              className="w-full py-3 text-xs text-vault-accent hover:text-vault-accent-hover transition-colors font-medium"
            >
              Load more messages
            </button>
          )}
        </div>
      </div>

      {/* Message Detail */}
      {selectedMessage && messageDetail && (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="px-6 py-4 border-b border-vault-border flex items-center gap-3">
            <button
              onClick={() => setSelectedMessage(null)}
              className="text-vault-text-muted hover:text-vault-text-primary transition-colors text-sm"
            >
              &larr; Back
            </button>
            <div className="ml-auto flex items-center gap-1">
              <button
                onClick={() => handleArchive(messageDetail.id)}
                className="p-1.5 rounded-md text-vault-text-muted hover:text-vault-text-primary hover:bg-vault-hover transition-colors"
                title="Archive"
              >
                <Archive className="size-4" />
              </button>
              <a
                href={`https://mail.google.com/mail/u/?authuser=${account.email}#inbox/${messageDetail.thread_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-md text-vault-text-muted hover:text-vault-text-primary hover:bg-vault-hover transition-colors"
                title="Open in Gmail"
              >
                <ExternalLink className="size-4" />
              </a>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            <h2 className="text-lg font-semibold text-vault-text-primary mb-4">{messageDetail.subject || '(no subject)'}</h2>

            <div className="flex items-start gap-3 mb-6 pb-4 border-b border-vault-border">
              <div className="size-9 rounded-full bg-vault-accent/20 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-vault-accent">{extractName(messageDetail.from)?.[0]?.toUpperCase()}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-vault-text-primary">{extractName(messageDetail.from)}</span>
                  <span className="text-xs text-vault-text-muted">&lt;{extractEmail(messageDetail.from)}&gt;</span>
                </div>
                <div className="text-xs text-vault-text-muted mt-0.5">
                  To: {messageDetail.to}
                  {messageDetail.cc && <span> · CC: {messageDetail.cc}</span>}
                </div>
                <div className="text-[10px] text-vault-text-muted mt-1">{messageDetail.date}</div>
              </div>
            </div>

            {messageDetail.body_html ? (
              <div
                className="vault-email-body text-sm text-vault-text-secondary"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(messageDetail.body_html) }}
              />
            ) : (
              <pre className="text-sm text-vault-text-secondary whitespace-pre-wrap font-sans">{messageDetail.body_text}</pre>
            )}

            {messageDetail.attachments.length > 0 && (
              <div className="mt-6 pt-4 border-t border-vault-border">
                <h4 className="text-xs font-semibold text-vault-text-muted uppercase tracking-wider mb-3">Attachments</h4>
                <div className="space-y-2">
                  {messageDetail.attachments.map((att) => (
                    <div key={att.id} className="flex items-center gap-2 px-3 py-2 rounded-md bg-vault-surface border border-vault-border">
                      <span className="text-sm text-vault-text-primary">{att.filename}</span>
                      <span className="text-xs text-vault-text-muted ml-auto">{formatFileSize(att.size)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function extractName(from: string | null): string {
  if (!from) return 'Unknown'
  const match = from.match(/^"?([^"<]+)"?\s*</)
  return match ? match[1].trim() : from.split('@')[0]
}

function extractEmail(from: string | null): string {
  if (!from) return ''
  const match = from.match(/<([^>]+)>/)
  return match ? match[1] : from
}

function formatDate(date: string | null): string {
  if (!date) return ''
  try {
    const d = new Date(date)
    const now = new Date()
    if (d.toDateString() === now.toDateString()) {
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' })
  } catch {
    return date
  }
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+\s*=/gi, 'data-removed=')
    .replace(/javascript:/gi, 'removed:')
}
