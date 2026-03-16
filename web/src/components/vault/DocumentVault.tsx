import { useState } from 'react'
import { clsx } from 'clsx'
import {
  FileText,
  Plus,
  Trash2,
  Download,
  Lock,
  Search,
  Eye,
  EyeOff,
  File,
  FileImage,
  FileSpreadsheet,
  FileArchive,
  AlertTriangle,
} from 'lucide-react'
import { useVaultStore } from '../../stores/vault'
import { useVaultDocuments, useDeleteDocument } from '../../api/vault-hooks'
import type { VaultDocument, VaultDocumentCategory } from '../../types/vault'

const CATEGORIES: { value: VaultDocumentCategory; label: string }[] = [
  { value: 'general', label: 'General' },
  { value: 'contract', label: 'Contracts' },
  { value: 'invoice', label: 'Invoices' },
  { value: 'credential', label: 'Credentials' },
  { value: 'legal', label: 'Legal' },
  { value: 'compliance', label: 'Compliance' },
  { value: 'tax', label: 'Tax' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'other', label: 'Other' },
]

const CATEGORY_COLORS: Record<VaultDocumentCategory, string> = {
  general: '#6b7280',
  contract: '#8b5cf6',
  invoice: '#22c55e',
  credential: '#ef4444',
  legal: '#f97316',
  compliance: '#0ea5e9',
  tax: '#eab308',
  marketing: '#ec4899',
  other: '#6b7280',
}

function getFileIcon(contentType: string | null) {
  if (!contentType) return File
  if (contentType.startsWith('image/')) return FileImage
  if (contentType.includes('spreadsheet') || contentType.includes('csv') || contentType.includes('excel')) return FileSpreadsheet
  if (contentType.includes('zip') || contentType.includes('archive')) return FileArchive
  return FileText
}

export function DocumentVault() {
  const activeBusiness = useVaultStore((s) => s.activeBusiness)
  const setShowDocumentUpload = useVaultStore((s) => s.setShowDocumentUpload)

  const [categoryFilter, setCategoryFilter] = useState<string>('')
  const [searchFilter, setSearchFilter] = useState('')
  const [showSensitive, setShowSensitive] = useState(false)

  const { data: documents, isLoading } = useVaultDocuments(activeBusiness?.id, categoryFilter || undefined)
  const deleteDoc = useDeleteDocument()

  const filteredDocs = (documents || []).filter((doc) => {
    if (searchFilter && !doc.name.toLowerCase().includes(searchFilter.toLowerCase())) return false
    if (!showSensitive && doc.sensitive) return false
    return true
  })

  const handleDelete = (doc: VaultDocument) => {
    if (!activeBusiness) return
    if (confirm(`Delete "${doc.name}"? This cannot be undone.`)) {
      deleteDoc.mutate({ businessId: activeBusiness.id, id: doc.id })
    }
  }

  const handleDownload = (doc: VaultDocument) => {
    const base = (import.meta.env.VITE_API_URL || '') + '/api/v1'
    window.open(`${base}/vault/businesses/${activeBusiness?.id}/documents/${doc.id}/download`, '_blank')
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-vault-border shrink-0">
        <div className="flex items-center gap-3 mb-3">
          <FileText className="size-5 text-vault-accent" />
          <h2 className="text-sm font-semibold text-vault-text-primary">Document Vault</h2>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setShowSensitive(!showSensitive)}
              className={clsx(
                'flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors border',
                showSensitive
                  ? 'bg-red-500/10 border-red-500/20 text-red-400'
                  : 'bg-vault-surface border-vault-border text-vault-text-muted hover:text-vault-text-primary'
              )}
            >
              {showSensitive ? <Eye className="size-3" /> : <EyeOff className="size-3" />}
              Sensitive
            </button>
            <button
              onClick={() => setShowDocumentUpload(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-vault-accent text-white text-xs font-medium hover:bg-vault-accent-hover transition-colors"
            >
              <Plus className="size-3.5" />
              Upload
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="size-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-vault-text-muted" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-7 pr-3 py-1 rounded-md bg-vault-surface border border-vault-border text-xs text-vault-text-primary placeholder:text-vault-text-muted focus:outline-none focus:border-vault-accent/50 transition-colors"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto">
            <button
              onClick={() => setCategoryFilter('')}
              className={clsx(
                'px-2.5 py-1 rounded-md text-[10px] font-semibold tracking-wide transition-colors whitespace-nowrap border',
                !categoryFilter
                  ? 'bg-vault-accent/10 border-vault-accent/20 text-vault-accent'
                  : 'bg-vault-surface border-vault-border text-vault-text-muted hover:text-vault-text-primary'
              )}
            >
              ALL
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategoryFilter(cat.value)}
                className={clsx(
                  'px-2.5 py-1 rounded-md text-[10px] font-semibold tracking-wide transition-colors whitespace-nowrap border',
                  categoryFilter === cat.value
                    ? 'bg-vault-accent/10 border-vault-accent/20 text-vault-accent'
                    : 'bg-vault-surface border-vault-border text-vault-text-muted hover:text-vault-text-primary'
                )}
              >
                {cat.label.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Document Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="size-5 border-2 border-vault-accent border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!isLoading && filteredDocs.length === 0 && (
          <div className="text-center py-12">
            <div className="size-16 rounded-2xl bg-vault-surface border border-vault-border flex items-center justify-center mx-auto mb-4">
              <FileText className="size-8 text-vault-text-muted" />
            </div>
            <p className="text-sm text-vault-text-secondary mb-2">No documents yet</p>
            <p className="text-xs text-vault-text-muted mb-4">Upload contracts, invoices, credentials and more</p>
            <button
              onClick={() => setShowDocumentUpload(true)}
              className="text-xs text-vault-accent hover:text-vault-accent-hover transition-colors font-medium"
            >
              Upload your first document
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {filteredDocs.map((doc) => {
            const FileIcon = getFileIcon(doc.content_type)
            const catColor = CATEGORY_COLORS[doc.category] || '#6b7280'

            return (
              <div
                key={doc.id}
                className="group rounded-xl border border-vault-border bg-vault-surface hover:border-vault-border-active transition-all p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="size-10 rounded-lg bg-vault-bg flex items-center justify-center shrink-0">
                    <FileIcon className="size-5 text-vault-text-muted" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-vault-text-primary truncate">{doc.name}</span>
                      {doc.sensitive && (
                        <AlertTriangle className="size-3 text-red-400 shrink-0" />
                      )}
                    </div>
                    {doc.description && (
                      <p className="text-[11px] text-vault-text-muted mt-0.5 line-clamp-1">{doc.description}</p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className="text-[9px] px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider"
                        style={{ backgroundColor: `${catColor}15`, color: catColor }}
                      >
                        {doc.category}
                      </span>
                      {doc.file_size && (
                        <span className="text-[10px] text-vault-text-muted">{formatSize(doc.file_size)}</span>
                      )}
                      <span className="text-[10px] text-vault-text-muted">
                        {new Date(doc.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 mt-3 pt-3 border-t border-vault-border">
                  <span className="text-[10px] text-vault-text-muted flex-1">by {doc.uploaded_by.name}</span>
                  {doc.has_file && (
                    <button
                      onClick={() => handleDownload(doc)}
                      className="p-1 rounded text-vault-text-muted hover:text-vault-accent hover:bg-vault-hover transition-colors"
                      title="Download"
                    >
                      <Download className="size-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(doc)}
                    className="p-1 rounded text-vault-text-muted hover:text-red-400 hover:bg-vault-hover transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                  {doc.sensitive && (
                    <div className="ml-1">
                      <Lock className="size-3 text-red-400" />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
