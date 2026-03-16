import { useState } from 'react'
import { clsx } from 'clsx'
import {
  MessageSquare,
  Search,
  RefreshCw,
  Download,
  Star,
  StarOff,
  ChevronLeft,
  User,
  Bot,
  FolderOpen,
  Building2,
  Wrench,
  Clock,
  Hash,
  ArrowDownToLine,
  Check,
} from 'lucide-react'
import { useVaultStore } from '../../stores/vault'
import {
  useVaultCursorChats,
  useCursorChatMessages,
  useSyncCursorChats,
  useImportCursorChats,
  useAssignCursorChat,
  useStarCursorChat,
  useVaultBusinesses,
  useScanCursorChats,
} from '../../api/vault-hooks'
import type { VaultCursorChat, CursorChatMessage } from '../../types/vault'

export function CursorChats() {
  const activeBusiness = useVaultStore((s) => s.activeBusiness)
  const [selectedChat, setSelectedChat] = useState<VaultCursorChat | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterMode, setFilterMode] = useState<'business' | 'all' | 'unassigned' | 'starred'>('all')
  const [showImportPanel, setShowImportPanel] = useState(false)

  const queryParams = {
    businessId: filterMode === 'business' ? activeBusiness?.id : undefined,
    unassigned: filterMode === 'unassigned' || undefined,
    starred: filterMode === 'starred' || undefined,
    q: searchQuery || undefined,
  }

  const { data: chats, isLoading } = useVaultCursorChats(queryParams)
  const { data: messagesData, isLoading: loadingMessages } = useCursorChatMessages(selectedChat?.id)
  const syncChats = useSyncCursorChats()
  const starChat = useStarCursorChat()
  const assignChat = useAssignCursorChat()
  const { data: businesses } = useVaultBusinesses()

  const handleSync = () => {
    syncChats.mutate()
  }

  const handleStar = (chat: VaultCursorChat, e: React.MouseEvent) => {
    e.stopPropagation()
    starChat.mutate(chat.id)
  }

  const handleAssign = (chatId: string, businessId: string | null) => {
    assignChat.mutate({ id: chatId, businessId })
  }

  if (showImportPanel) {
    return <ImportPanel onClose={() => setShowImportPanel(false)} />
  }

  if (selectedChat && messagesData) {
    return (
      <ChatViewer
        chat={selectedChat}
        messages={messagesData.messages}
        loading={loadingMessages}
        businesses={businesses || []}
        onBack={() => setSelectedChat(null)}
        onStar={() => starChat.mutate(selectedChat.id)}
        onAssign={(bizId) => handleAssign(selectedChat.id, bizId)}
      />
    )
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-vault-border shrink-0">
        <div className="flex items-center gap-3 mb-3">
          <MessageSquare className="size-5 text-vault-accent" />
          <h2 className="text-sm font-semibold text-vault-text-primary">Cursor Chats</h2>
          <span className="text-xs text-vault-text-muted">
            {chats?.length || 0} conversations
          </span>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setShowImportPanel(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-vault-border bg-vault-surface text-xs font-medium text-vault-text-secondary hover:text-vault-text-primary transition-colors"
            >
              <ArrowDownToLine className="size-3.5" />
              Import
            </button>
            <button
              onClick={handleSync}
              disabled={syncChats.isPending}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-vault-accent text-white text-xs font-medium hover:bg-vault-accent-hover transition-colors disabled:opacity-50"
            >
              <RefreshCw className={clsx('size-3.5', syncChats.isPending && 'animate-spin')} />
              {syncChats.isPending ? 'Syncing...' : 'Sync All'}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="size-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-vault-text-muted" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-7 pr-3 py-1 rounded-md bg-vault-surface border border-vault-border text-xs text-vault-text-primary placeholder:text-vault-text-muted focus:outline-none focus:border-vault-accent/50 transition-colors"
            />
          </div>

          <div className="flex items-center gap-1">
            {(['all', 'business', 'unassigned', 'starred'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setFilterMode(mode)}
                className={clsx(
                  'px-2.5 py-1 rounded-md text-[10px] font-semibold tracking-wide transition-colors border',
                  filterMode === mode
                    ? 'bg-vault-accent/10 border-vault-accent/20 text-vault-accent'
                    : 'bg-vault-surface border-vault-border text-vault-text-muted hover:text-vault-text-primary'
                )}
              >
                {mode === 'business' ? (activeBusiness?.name || 'THIS BIZ') : mode.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {syncChats.isSuccess && (
          <div className="mt-2 text-xs text-green-400 flex items-center gap-1.5">
            <Check className="size-3" />
            Synced: {syncChats.data.created} new, {syncChats.data.updated} updated ({syncChats.data.total} total)
          </div>
        )}
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="size-5 border-2 border-vault-accent border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!isLoading && (!chats || chats.length === 0) && (
          <div className="text-center py-16">
            <MessageSquare className="size-12 text-vault-text-muted mx-auto mb-4" />
            <h3 className="text-base font-semibold text-vault-text-primary mb-2">No Chats Found</h3>
            <p className="text-sm text-vault-text-secondary mb-4 max-w-sm mx-auto">
              Click "Sync All" to scan your local Cursor installation and import chat transcripts, or use "Import" for selective import.
            </p>
            <button
              onClick={handleSync}
              disabled={syncChats.isPending}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-vault-accent text-white text-sm font-medium hover:bg-vault-accent-hover transition-colors disabled:opacity-50"
            >
              <RefreshCw className={clsx('size-4', syncChats.isPending && 'animate-spin')} />
              {syncChats.isPending ? 'Scanning...' : 'Sync Cursor Chats'}
            </button>
          </div>
        )}

        {chats?.map((chat) => (
          <button
            key={chat.id}
            onClick={() => setSelectedChat(chat)}
            className="w-full text-left px-6 py-3.5 border-b border-vault-border hover:bg-vault-hover transition-colors group"
          >
            <div className="flex items-start gap-3">
              <div className="size-9 rounded-lg bg-vault-surface border border-vault-border flex items-center justify-center shrink-0 mt-0.5">
                <MessageSquare className="size-4 text-vault-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[13px] font-medium text-vault-text-primary truncate">
                    {chat.title || 'Untitled Chat'}
                  </span>
                  {chat.starred && <Star className="size-3 text-amber-400 fill-amber-400 shrink-0" />}
                </div>
                {chat.summary && (
                  <p className="text-[11px] text-vault-text-muted line-clamp-1 mb-1.5">{chat.summary}</p>
                )}
                <div className="flex items-center gap-3 text-[10px] text-vault-text-muted">
                  <span className="flex items-center gap-1">
                    <FolderOpen className="size-2.5" />
                    {chat.project_name || 'Unknown'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Hash className="size-2.5" />
                    {chat.message_count} msgs
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-2.5" />
                    {formatDate(chat.chat_started_at)}
                  </span>
                  {chat.business_id && (
                    <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-vault-accent/10 text-vault-accent">
                      <Building2 className="size-2.5" />
                      Assigned
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => handleStar(chat, e)}
                  className="p-1 rounded text-vault-text-muted hover:text-amber-400 transition-colors"
                  title={chat.starred ? 'Unstar' : 'Star'}
                >
                  {chat.starred ? <StarOff className="size-3.5" /> : <Star className="size-3.5" />}
                </button>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function ChatViewer({
  chat,
  messages,
  loading,
  businesses,
  onBack,
  onStar,
  onAssign,
}: {
  chat: VaultCursorChat
  messages: CursorChatMessage[]
  loading: boolean
  businesses: { id: string; name: string; color: string }[]
  onBack: () => void
  onStar: () => void
  onAssign: (bizId: string | null) => void
}) {
  const [showAssign, setShowAssign] = useState(false)

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-6 py-3 border-b border-vault-border flex items-center gap-3 shrink-0 bg-vault-surface/30">
        <button
          onClick={onBack}
          className="p-1 rounded text-vault-text-muted hover:text-vault-text-primary hover:bg-vault-hover transition-colors"
        >
          <ChevronLeft className="size-4" />
        </button>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-vault-text-primary truncate">{chat.title || 'Untitled Chat'}</h3>
          <div className="flex items-center gap-3 text-[10px] text-vault-text-muted mt-0.5">
            <span>{chat.project_name}</span>
            <span>{chat.message_count} messages</span>
            <span>{formatDate(chat.chat_started_at)}</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onStar}
            className={clsx('p-1.5 rounded-md transition-colors', chat.starred ? 'text-amber-400' : 'text-vault-text-muted hover:text-amber-400')}
            title={chat.starred ? 'Unstar' : 'Star'}
          >
            <Star className={clsx('size-4', chat.starred && 'fill-amber-400')} />
          </button>
          <div className="relative">
            <button
              onClick={() => setShowAssign(!showAssign)}
              className="p-1.5 rounded-md text-vault-text-muted hover:text-vault-text-primary transition-colors"
              title="Assign to business"
            >
              <Building2 className="size-4" />
            </button>
            {showAssign && (
              <div className="absolute right-0 top-full mt-1 w-56 bg-vault-bg border border-vault-border rounded-lg shadow-xl z-10 py-1 overflow-hidden">
                <button
                  onClick={() => { onAssign(null); setShowAssign(false) }}
                  className="w-full text-left px-3 py-2 text-xs text-vault-text-secondary hover:bg-vault-hover transition-colors"
                >
                  Unassign
                </button>
                {businesses.map((biz) => (
                  <button
                    key={biz.id}
                    onClick={() => { onAssign(biz.id); setShowAssign(false) }}
                    className={clsx(
                      'w-full text-left px-3 py-2 text-xs hover:bg-vault-hover transition-colors flex items-center gap-2',
                      chat.business_id === biz.id ? 'text-vault-accent' : 'text-vault-text-secondary'
                    )}
                  >
                    <div className="size-4 rounded" style={{ backgroundColor: biz.color }} />
                    {biz.name}
                    {chat.business_id === biz.id && <Check className="size-3 ml-auto" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="size-5 border-2 border-vault-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto py-6 px-6 space-y-4">
            {messages.map((msg) => (
              <div key={msg.index} className={clsx('flex gap-3', msg.role === 'user' ? 'justify-end' : '')}>
                {msg.role === 'assistant' && (
                  <div className="size-7 rounded-lg bg-vault-accent/15 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="size-3.5 text-vault-accent" />
                  </div>
                )}
                <div
                  className={clsx(
                    'rounded-xl px-4 py-3 max-w-[85%] text-sm leading-relaxed',
                    msg.role === 'user'
                      ? 'bg-vault-accent/15 text-vault-text-primary border border-vault-accent/20'
                      : 'bg-vault-surface border border-vault-border text-vault-text-secondary'
                  )}
                >
                  {msg.has_tool_calls && (
                    <div className="flex items-center gap-1.5 text-[10px] text-vault-text-muted mb-2 pb-2 border-b border-vault-border">
                      <Wrench className="size-2.5" />
                      Used tools
                    </div>
                  )}
                  <div className="whitespace-pre-wrap break-words text-[13px]">{truncateMessage(msg.text)}</div>
                </div>
                {msg.role === 'user' && (
                  <div className="size-7 rounded-lg bg-vault-surface border border-vault-border flex items-center justify-center shrink-0 mt-1">
                    <User className="size-3.5 text-vault-text-muted" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ImportPanel({ onClose }: { onClose: () => void }) {
  const { data: scanResult, isLoading, refetch } = useScanCursorChats()
  const importChats = useImportCursorChats()
  const [selectedUuids, setSelectedUuids] = useState<Set<string>>(new Set())
  const { data: businesses } = useVaultBusinesses()
  const [assignBizId, setAssignBizId] = useState<string>('')

  const handleScan = () => {
    refetch()
  }

  const toggleSelect = (uuid: string) => {
    const next = new Set(selectedUuids)
    if (next.has(uuid)) next.delete(uuid)
    else next.add(uuid)
    setSelectedUuids(next)
  }

  const selectAllNew = () => {
    if (!scanResult) return
    const newUuids = scanResult.chats.filter((c) => !c.imported).map((c) => c.chat_uuid)
    setSelectedUuids(new Set(newUuids))
  }

  const handleImport = () => {
    importChats.mutate({
      chat_uuids: Array.from(selectedUuids),
      business_id: assignBizId || undefined,
    })
  }

  const handleImportAll = () => {
    importChats.mutate({
      import_all: true,
      business_id: assignBizId || undefined,
    })
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="px-6 py-4 border-b border-vault-border flex items-center gap-3 shrink-0">
        <button onClick={onClose} className="p-1 rounded text-vault-text-muted hover:text-vault-text-primary transition-colors">
          <ChevronLeft className="size-4" />
        </button>
        <ArrowDownToLine className="size-5 text-vault-accent" />
        <h2 className="text-sm font-semibold text-vault-text-primary">Import Cursor Chats</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {!scanResult && !isLoading && (
          <div className="text-center py-12">
            <Download className="size-12 text-vault-text-muted mx-auto mb-4" />
            <h3 className="text-base font-semibold text-vault-text-primary mb-2">Scan Local Cursor Data</h3>
            <p className="text-sm text-vault-text-secondary mb-6 max-w-sm mx-auto">
              Scan your local Cursor installation to discover chat transcripts from all your projects.
            </p>
            <button
              onClick={handleScan}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-vault-accent text-white text-sm font-medium hover:bg-vault-accent-hover transition-colors"
            >
              <Search className="size-4" />
              Scan for Chats
            </button>
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3">
              <div className="size-5 border-2 border-vault-accent border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-vault-text-secondary">Scanning ~/.cursor/projects/...</span>
            </div>
          </div>
        )}

        {scanResult && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="p-4 rounded-xl bg-vault-surface border border-vault-border text-center">
                <div className="text-2xl font-bold text-vault-text-primary">{scanResult.total_discovered}</div>
                <div className="text-[10px] text-vault-text-muted uppercase tracking-wider mt-1">Discovered</div>
              </div>
              <div className="p-4 rounded-xl bg-vault-surface border border-vault-border text-center">
                <div className="text-2xl font-bold text-green-400">{scanResult.already_imported}</div>
                <div className="text-[10px] text-vault-text-muted uppercase tracking-wider mt-1">Imported</div>
              </div>
              <div className="p-4 rounded-xl bg-vault-surface border border-vault-border text-center">
                <div className="text-2xl font-bold text-vault-accent">{scanResult.new_available}</div>
                <div className="text-[10px] text-vault-text-muted uppercase tracking-wider mt-1">New</div>
              </div>
            </div>

            {/* Assign to business */}
            <div className="mb-4 flex items-center gap-3">
              <label className="text-xs text-vault-text-secondary">Assign imported to:</label>
              <select
                value={assignBizId}
                onChange={(e) => setAssignBizId(e.target.value)}
                className="px-3 py-1.5 rounded-md bg-vault-surface border border-vault-border text-xs text-vault-text-primary focus:outline-none focus:border-vault-accent/50"
              >
                <option value="">No business (import only)</option>
                {businesses?.map((biz) => (
                  <option key={biz.id} value={biz.id}>{biz.name}</option>
                ))}
              </select>

              <div className="ml-auto flex items-center gap-2">
                <button
                  onClick={selectAllNew}
                  className="text-xs text-vault-accent hover:text-vault-accent-hover transition-colors"
                >
                  Select all new ({scanResult.new_available})
                </button>
                <button
                  onClick={handleImportAll}
                  disabled={importChats.isPending}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-vault-accent text-white text-xs font-medium hover:bg-vault-accent-hover transition-colors disabled:opacity-50"
                >
                  Import All
                </button>
                {selectedUuids.size > 0 && (
                  <button
                    onClick={handleImport}
                    disabled={importChats.isPending}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-vault-accent text-vault-accent text-xs font-medium hover:bg-vault-accent/10 transition-colors disabled:opacity-50"
                  >
                    Import Selected ({selectedUuids.size})
                  </button>
                )}
              </div>
            </div>

            {importChats.isSuccess && (
              <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-xs text-green-400 flex items-center gap-2">
                <Check className="size-3.5" />
                Successfully imported {importChats.data.imported} chats
              </div>
            )}

            {/* Chat list */}
            <div className="space-y-1">
              {scanResult.chats.map((chat) => (
                <div
                  key={chat.chat_uuid}
                  onClick={() => !chat.imported && toggleSelect(chat.chat_uuid)}
                  className={clsx(
                    'flex items-center gap-3 px-4 py-2.5 rounded-lg border transition-colors',
                    chat.imported
                      ? 'bg-vault-surface/50 border-vault-border opacity-60'
                      : selectedUuids.has(chat.chat_uuid)
                        ? 'bg-vault-accent/5 border-vault-accent/30 cursor-pointer'
                        : 'bg-vault-surface border-vault-border hover:border-vault-border-active cursor-pointer'
                  )}
                >
                  <div className={clsx(
                    'size-4 rounded border flex items-center justify-center',
                    chat.imported
                      ? 'border-green-500/30 bg-green-500/10'
                      : selectedUuids.has(chat.chat_uuid)
                        ? 'border-vault-accent bg-vault-accent'
                        : 'border-vault-border'
                  )}>
                    {(chat.imported || selectedUuids.has(chat.chat_uuid)) && <Check className="size-2.5 text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-mono text-vault-text-secondary truncate">{chat.chat_uuid}</div>
                    <div className="text-[10px] text-vault-text-muted mt-0.5">{chat.project_name}</div>
                  </div>
                  <span className="text-[10px] text-vault-text-muted">{(chat.file_size / 1024).toFixed(1)} KB</span>
                  <span className="text-[10px] text-vault-text-muted">{formatDate(chat.modified_at)}</span>
                  {chat.imported && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-green-500/10 text-green-400 font-medium">IMPORTED</span>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function truncateMessage(text: string): string {
  if (text.length <= 2000) return text
  return text.slice(0, 2000) + '\n\n... [truncated]'
}

function formatDate(date: string | null): string {
  if (!date) return ''
  try {
    const d = new Date(date)
    return d.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return ''
  }
}
