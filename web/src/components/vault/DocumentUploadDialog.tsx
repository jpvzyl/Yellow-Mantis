import { useState, useRef } from 'react'
import { X, FileText, Upload, Shield, Lock, AlertTriangle } from 'lucide-react'
import { useVaultStore } from '../../stores/vault'
import { useUploadDocument } from '../../api/vault-hooks'
import type { VaultDocumentCategory } from '../../types/vault'

const CATEGORIES: { value: VaultDocumentCategory; label: string }[] = [
  { value: 'general', label: 'General' },
  { value: 'contract', label: 'Contract' },
  { value: 'invoice', label: 'Invoice' },
  { value: 'credential', label: 'Credential' },
  { value: 'legal', label: 'Legal' },
  { value: 'compliance', label: 'Compliance' },
  { value: 'tax', label: 'Tax' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'other', label: 'Other' },
]

export function DocumentUploadDialog() {
  const show = useVaultStore((s) => s.showDocumentUpload)
  const setShow = useVaultStore((s) => s.setShowDocumentUpload)
  const activeBusiness = useVaultStore((s) => s.activeBusiness)
  const uploadDoc = useUploadDocument()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<VaultDocumentCategory>('general')
  const [sensitive, setSensitive] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  if (!show || !activeBusiness) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !file) return

    await uploadDoc.mutateAsync({
      businessId: activeBusiness.id,
      file,
      name: name.trim(),
      description: description.trim() || undefined,
      category,
      sensitive,
    })
    setShow(false)
    resetForm()
  }

  const resetForm = () => {
    setName('')
    setDescription('')
    setCategory('general')
    setSensitive(false)
    setFile(null)
  }

  const handleClose = () => {
    setShow(false)
    resetForm()
  }

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile)
    if (!name) setName(selectedFile.name.replace(/\.[^/.]+$/, ''))
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) handleFileSelect(droppedFile)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative w-full max-w-md bg-vault-bg border border-vault-border rounded-2xl shadow-2xl shadow-black/50">
        <div className="flex items-center justify-between px-6 py-4 border-b border-vault-border">
          <div className="flex items-center gap-2.5">
            <FileText className="size-5 text-vault-accent" />
            <h3 className="text-sm font-semibold text-vault-text-primary">Upload Document</h3>
          </div>
          <button onClick={handleClose} className="text-vault-text-muted hover:text-vault-text-primary transition-colors">
            <X className="size-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Drop Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            className={`flex flex-col items-center gap-2 p-6 rounded-xl border-2 border-dashed cursor-pointer transition-colors ${
              dragOver
                ? 'border-vault-accent bg-vault-accent/5'
                : file
                  ? 'border-green-500/30 bg-green-500/5'
                  : 'border-vault-border-active hover:border-vault-accent/50'
            }`}
          >
            <input
              ref={fileRef}
              type="file"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            />
            {file ? (
              <>
                <FileText className="size-8 text-green-400" />
                <span className="text-sm text-vault-text-primary font-medium">{file.name}</span>
                <span className="text-[10px] text-vault-text-muted">{formatSize(file.size)}</span>
              </>
            ) : (
              <>
                <Upload className="size-8 text-vault-text-muted" />
                <span className="text-sm text-vault-text-secondary">Drop file here or click to browse</span>
                <span className="text-[10px] text-vault-text-muted">Max 50MB · PDF, DOC, XLS, images, and more</span>
              </>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-vault-text-secondary mb-1.5">Document Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Q4 Financial Report"
              className="w-full px-3 py-2 rounded-lg bg-vault-surface border border-vault-border text-sm text-vault-text-primary placeholder:text-vault-text-muted focus:outline-none focus:border-vault-accent/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-vault-text-secondary mb-1.5">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional notes about this document..."
              rows={2}
              className="w-full px-3 py-2 rounded-lg bg-vault-surface border border-vault-border text-sm text-vault-text-primary placeholder:text-vault-text-muted focus:outline-none focus:border-vault-accent/50 transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-vault-text-secondary mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as VaultDocumentCategory)}
                className="w-full px-3 py-2 rounded-lg bg-vault-surface border border-vault-border text-sm text-vault-text-primary focus:outline-none focus:border-vault-accent/50 transition-colors"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end pb-0.5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sensitive}
                  onChange={(e) => setSensitive(e.target.checked)}
                  className="rounded border-vault-border"
                />
                <div className="flex items-center gap-1.5">
                  <Lock className="size-3 text-red-400" />
                  <span className="text-xs text-vault-text-secondary">Mark as Sensitive</span>
                </div>
              </label>
            </div>
          </div>

          {sensitive && (
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-red-500/5 border border-red-500/20">
              <AlertTriangle className="size-3.5 text-red-400 shrink-0" />
              <span className="text-[10px] text-red-400">
                Sensitive documents require explicit visibility toggle in the document list
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 pt-1 text-vault-text-muted">
            <Shield className="size-3" />
            <span className="text-[10px]">Files are stored with SHA-256 integrity verification</span>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 rounded-lg text-sm text-vault-text-secondary hover:text-vault-text-primary transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim() || !file || uploadDoc.isPending}
              className="px-5 py-2 rounded-lg bg-vault-accent text-white text-sm font-medium hover:bg-vault-accent-hover transition-colors disabled:opacity-50 shadow-lg shadow-vault-accent/25"
            >
              {uploadDoc.isPending ? 'Uploading...' : 'Upload Document'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
