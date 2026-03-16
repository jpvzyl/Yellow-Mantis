import { useState } from 'react'
import { clsx } from 'clsx'
import {
  Globe,
  Plus,
  Pin,
  PinOff,
  Trash2,
  ExternalLink,
  RefreshCw,
  ChevronLeft,
  Search,
  Github,
  Cloud,
  BarChart3,
  FileText,
  CreditCard,
  Share2,
  Mail as MailIcon,
  MoreHorizontal,
  Edit,
  X,
} from 'lucide-react'
import { useVaultStore } from '../../stores/vault'
import { useVaultPages, useDeletePage, useTogglePagePin } from '../../api/vault-hooks'
import type { VaultPage, VaultPageCategory } from '../../types/vault'

const CATEGORY_ICONS: Record<VaultPageCategory, typeof Globe> = {
  github: Github,
  heroku: Cloud,
  hosting: Cloud,
  analytics: BarChart3,
  email: MailIcon,
  social: Share2,
  docs: FileText,
  billing: CreditCard,
  other: Globe,
}

const CATEGORY_COLORS: Record<VaultPageCategory, string> = {
  github: '#333',
  heroku: '#6762a6',
  hosting: '#0ea5e9',
  analytics: '#f97316',
  email: '#ef4444',
  social: '#8b5cf6',
  docs: '#22c55e',
  billing: '#eab308',
  other: '#6b7280',
}

export function PagesBrowser() {
  const activeBusiness = useVaultStore((s) => s.activeBusiness)
  const activePageUrl = useVaultStore((s) => s.activePageUrl)
  const setActivePageUrl = useVaultStore((s) => s.setActivePageUrl)
  const setShowPageForm = useVaultStore((s) => s.setShowPageForm)

  const { data: pages, isLoading } = useVaultPages(activeBusiness?.id)
  const deletePage = useDeletePage()
  const togglePin = useTogglePagePin()
  const [hoveredPage, setHoveredPage] = useState<string | null>(null)
  const [iframeError, setIframeError] = useState(false)
  const [iframeKey, setIframeKey] = useState(0)
  const [searchFilter, setSearchFilter] = useState('')

  const pinnedPages = pages?.filter((p) => p.pinned) || []
  const allPages = pages?.filter((p) =>
    !searchFilter || p.name.toLowerCase().includes(searchFilter.toLowerCase()) || p.url.toLowerCase().includes(searchFilter.toLowerCase())
  ) || []

  const activePage = pages?.find((p) => p.url === activePageUrl)

  const handleDeletePage = (page: VaultPage) => {
    if (!activeBusiness) return
    deletePage.mutate({ businessId: activeBusiness.id, id: page.id })
    if (activePageUrl === page.url) setActivePageUrl(null)
  }

  const handleTogglePin = (page: VaultPage) => {
    if (!activeBusiness) return
    togglePin.mutate({ businessId: activeBusiness.id, id: page.id })
  }

  if (activePageUrl && activePage) {
    return (
      <div className="h-full flex flex-col">
        {/* Browser Bar */}
        <div className="h-11 px-3 flex items-center gap-2 border-b border-vault-border bg-vault-surface/50 shrink-0">
          <button
            onClick={() => setActivePageUrl(null)}
            className="p-1 rounded text-vault-text-muted hover:text-vault-text-primary hover:bg-vault-hover transition-colors"
          >
            <ChevronLeft className="size-4" />
          </button>

          <div className="flex-1 flex items-center gap-2 px-3 py-1 rounded-md bg-vault-bg border border-vault-border">
            <div className="size-1.5 rounded-full bg-green-500" />
            <span className="text-xs text-vault-text-muted truncate font-mono">{activePageUrl}</span>
          </div>

          <button
            onClick={() => { setIframeError(false); setIframeKey((k) => k + 1) }}
            className="p-1 rounded text-vault-text-muted hover:text-vault-text-primary hover:bg-vault-hover transition-colors"
            title="Refresh"
          >
            <RefreshCw className="size-3.5" />
          </button>
          <a
            href={activePageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded text-vault-text-muted hover:text-vault-text-primary hover:bg-vault-hover transition-colors"
            title="Open in new tab"
          >
            <ExternalLink className="size-3.5" />
          </a>
        </div>

        {/* Iframe */}
        <div className="flex-1 relative">
          {iframeError ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center max-w-sm">
                <Globe className="size-12 text-vault-text-muted mx-auto mb-4" />
                <h3 className="text-base font-semibold text-vault-text-primary mb-2">Cannot Embed This Page</h3>
                <p className="text-sm text-vault-text-secondary mb-4">
                  This site blocks embedding for security reasons. You can open it in a new tab instead.
                </p>
                <a
                  href={activePageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-vault-accent text-white text-sm font-medium hover:bg-vault-accent-hover transition-colors"
                >
                  <ExternalLink className="size-4" />
                  Open in New Tab
                </a>
              </div>
            </div>
          ) : (
            <iframe
              key={iframeKey}
              src={activePageUrl}
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
              referrerPolicy="no-referrer"
              onError={() => setIframeError(true)}
              title={activePage.name}
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-vault-border flex items-center gap-3 shrink-0">
        <Globe className="size-5 text-vault-accent" />
        <h2 className="text-sm font-semibold text-vault-text-primary">Pages & Services</h2>
        <div className="flex-1" />
        <div className="relative">
          <Search className="size-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-vault-text-muted" />
          <input
            type="text"
            placeholder="Filter pages..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="pl-7 pr-3 py-1 rounded-md bg-vault-surface border border-vault-border text-xs text-vault-text-primary placeholder:text-vault-text-muted focus:outline-none focus:border-vault-accent/50 w-44 transition-colors"
          />
        </div>
        <button
          onClick={() => setShowPageForm(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-vault-accent text-white text-xs font-medium hover:bg-vault-accent-hover transition-colors"
        >
          <Plus className="size-3.5" />
          Add Page
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="size-5 text-vault-text-muted animate-spin" />
          </div>
        )}

        {/* Pinned Pages */}
        {pinnedPages.length > 0 && (
          <div className="mb-8">
            <h3 className="text-[10px] font-semibold text-vault-text-muted uppercase tracking-widest mb-3 px-1">Pinned</h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {pinnedPages.map((page) => (
                <PageCard
                  key={page.id}
                  page={page}
                  isHovered={hoveredPage === page.id}
                  onHover={setHoveredPage}
                  onOpen={() => setActivePageUrl(page.url)}
                  onDelete={() => handleDeletePage(page)}
                  onTogglePin={() => handleTogglePin(page)}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Pages */}
        <div>
          <h3 className="text-[10px] font-semibold text-vault-text-muted uppercase tracking-widest mb-3 px-1">All Pages</h3>
          {allPages.length === 0 && !isLoading ? (
            <div className="text-center py-12">
              <Globe className="size-10 text-vault-text-muted mx-auto mb-3" />
              <p className="text-sm text-vault-text-secondary mb-4">No pages added yet</p>
              <button
                onClick={() => setShowPageForm(true)}
                className="text-xs text-vault-accent hover:text-vault-accent-hover transition-colors font-medium"
              >
                Add your first page
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {allPages.map((page) => (
                <PageCard
                  key={page.id}
                  page={page}
                  isHovered={hoveredPage === page.id}
                  onHover={setHoveredPage}
                  onOpen={() => setActivePageUrl(page.url)}
                  onDelete={() => handleDeletePage(page)}
                  onTogglePin={() => handleTogglePin(page)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function PageCard({
  page,
  isHovered,
  onHover,
  onOpen,
  onDelete,
  onTogglePin,
}: {
  page: VaultPage
  isHovered: boolean
  onHover: (id: string | null) => void
  onOpen: () => void
  onDelete: () => void
  onTogglePin: () => void
}) {
  const Icon = CATEGORY_ICONS[page.category] || Globe
  const color = CATEGORY_COLORS[page.category] || '#6b7280'

  return (
    <div
      onMouseEnter={() => onHover(page.id)}
      onMouseLeave={() => onHover(null)}
      className="group relative rounded-xl border border-vault-border bg-vault-surface hover:border-vault-border-active transition-all cursor-pointer overflow-hidden"
      onClick={onOpen}
    >
      <div className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <div
            className="size-9 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon className="size-4" style={{ color }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-vault-text-primary truncate">{page.name}</div>
            <div className="text-[10px] text-vault-text-muted truncate font-mono mt-0.5">
              {page.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="text-[10px] px-1.5 py-0.5 rounded font-medium"
            style={{ backgroundColor: `${color}15`, color }}
          >
            {page.category}
          </span>
          {page.pinned && <Pin className="size-3 text-vault-accent" />}
        </div>
      </div>

      {/* Hover Actions */}
      <div className={clsx(
        'absolute top-2 right-2 flex items-center gap-0.5 transition-opacity',
        isHovered ? 'opacity-100' : 'opacity-0'
      )}>
        <button
          onClick={(e) => { e.stopPropagation(); onTogglePin() }}
          className="p-1 rounded bg-vault-bg/80 backdrop-blur-sm text-vault-text-muted hover:text-vault-accent transition-colors"
          title={page.pinned ? 'Unpin' : 'Pin'}
        >
          {page.pinned ? <PinOff className="size-3" /> : <Pin className="size-3" />}
        </button>
        <a
          href={page.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="p-1 rounded bg-vault-bg/80 backdrop-blur-sm text-vault-text-muted hover:text-vault-accent transition-colors"
          title="Open in new tab"
        >
          <ExternalLink className="size-3" />
        </a>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete() }}
          className="p-1 rounded bg-vault-bg/80 backdrop-blur-sm text-vault-text-muted hover:text-red-400 transition-colors"
          title="Delete"
        >
          <Trash2 className="size-3" />
        </button>
      </div>
    </div>
  )
}
