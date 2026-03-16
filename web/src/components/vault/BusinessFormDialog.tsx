import { useState } from 'react'
import { X, Building2, Shield } from 'lucide-react'
import { useVaultStore } from '../../stores/vault'
import { useCreateBusiness } from '../../api/vault-hooks'

const COLORS = [
  '#6366f1', '#8b5cf6', '#ec4899', '#ef4444', '#f97316',
  '#eab308', '#22c55e', '#0ea5e9', '#3b82f6', '#14b8a6',
]

export function BusinessFormDialog() {
  const show = useVaultStore((s) => s.showBusinessForm)
  const setShow = useVaultStore((s) => s.setShowBusinessForm)
  const setActiveBusiness = useVaultStore((s) => s.setActiveBusiness)
  const createBiz = useCreateBusiness()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [color, setColor] = useState('#6366f1')

  if (!show) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    const biz = await createBiz.mutateAsync({
      name: name.trim(),
      description: description.trim() || undefined,
      color,
      website_url: websiteUrl.trim() || undefined,
    })
    setActiveBusiness(biz)
    setShow(false)
    resetForm()
  }

  const resetForm = () => {
    setName('')
    setDescription('')
    setWebsiteUrl('')
    setColor('#6366f1')
  }

  const handleClose = () => {
    setShow(false)
    resetForm()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative w-full max-w-md bg-vault-bg border border-vault-border rounded-2xl shadow-2xl shadow-black/50">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-vault-border">
          <div className="flex items-center gap-2.5">
            <Building2 className="size-5 text-vault-accent" />
            <h3 className="text-sm font-semibold text-vault-text-primary">Add Business</h3>
          </div>
          <button onClick={handleClose} className="text-vault-text-muted hover:text-vault-text-primary transition-colors">
            <X className="size-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-vault-text-secondary mb-1.5">Business Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Acme Corporation"
              autoFocus
              className="w-full px-3 py-2 rounded-lg bg-vault-surface border border-vault-border text-sm text-vault-text-primary placeholder:text-vault-text-muted focus:outline-none focus:border-vault-accent/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-vault-text-secondary mb-1.5">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the business..."
              rows={2}
              className="w-full px-3 py-2 rounded-lg bg-vault-surface border border-vault-border text-sm text-vault-text-primary placeholder:text-vault-text-muted focus:outline-none focus:border-vault-accent/50 transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-vault-text-secondary mb-1.5">Website</label>
            <input
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://acme.com"
              className="w-full px-3 py-2 rounded-lg bg-vault-surface border border-vault-border text-sm text-vault-text-primary placeholder:text-vault-text-muted focus:outline-none focus:border-vault-accent/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-vault-text-secondary mb-1.5">Brand Color</label>
            <div className="flex items-center gap-2">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className="size-7 rounded-lg transition-transform hover:scale-110"
                  style={{
                    backgroundColor: c,
                    outline: color === c ? '2px solid white' : 'none',
                    outlineOffset: '2px',
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 text-vault-text-muted">
            <Shield className="size-3" />
            <span className="text-[10px]">All business data is encrypted at rest</span>
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
              disabled={!name.trim() || createBiz.isPending}
              className="px-5 py-2 rounded-lg bg-vault-accent text-white text-sm font-medium hover:bg-vault-accent-hover transition-colors disabled:opacity-50 shadow-lg shadow-vault-accent/25"
            >
              {createBiz.isPending ? 'Creating...' : 'Create Business'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
