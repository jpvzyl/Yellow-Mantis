import { useState } from 'react'
import { X, Globe, Shield } from 'lucide-react'
import { useVaultStore } from '../../stores/vault'
import { useCreatePage } from '../../api/vault-hooks'
import type { VaultPageCategory } from '../../types/vault'

const CATEGORIES: { value: VaultPageCategory; label: string }[] = [
  { value: 'github', label: 'GitHub' },
  { value: 'heroku', label: 'Heroku' },
  { value: 'hosting', label: 'Hosting' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'email', label: 'Email' },
  { value: 'social', label: 'Social Media' },
  { value: 'docs', label: 'Documentation' },
  { value: 'billing', label: 'Billing' },
  { value: 'other', label: 'Other' },
]

export function PageFormDialog() {
  const show = useVaultStore((s) => s.showPageForm)
  const setShow = useVaultStore((s) => s.setShowPageForm)
  const activeBusiness = useVaultStore((s) => s.activeBusiness)
  const createPage = useCreatePage()

  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [category, setCategory] = useState<VaultPageCategory>('other')

  if (!show || !activeBusiness) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !url.trim()) return

    await createPage.mutateAsync({
      businessId: activeBusiness.id,
      name: name.trim(),
      url: url.trim(),
      category,
    })
    setShow(false)
    resetForm()
  }

  const resetForm = () => {
    setName('')
    setUrl('')
    setCategory('other')
  }

  const handleClose = () => {
    setShow(false)
    resetForm()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative w-full max-w-md bg-vault-bg border border-vault-border rounded-2xl shadow-2xl shadow-black/50">
        <div className="flex items-center justify-between px-6 py-4 border-b border-vault-border">
          <div className="flex items-center gap-2.5">
            <Globe className="size-5 text-vault-accent" />
            <h3 className="text-sm font-semibold text-vault-text-primary">Add Page</h3>
          </div>
          <button onClick={handleClose} className="text-vault-text-muted hover:text-vault-text-primary transition-colors">
            <X className="size-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-vault-text-secondary mb-1.5">Page Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Company GitHub"
              autoFocus
              className="w-full px-3 py-2 rounded-lg bg-vault-surface border border-vault-border text-sm text-vault-text-primary placeholder:text-vault-text-muted focus:outline-none focus:border-vault-accent/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-vault-text-secondary mb-1.5">URL *</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://github.com/company"
              className="w-full px-3 py-2 rounded-lg bg-vault-surface border border-vault-border text-sm text-vault-text-primary placeholder:text-vault-text-muted focus:outline-none focus:border-vault-accent/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-vault-text-secondary mb-1.5">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as VaultPageCategory)}
              className="w-full px-3 py-2 rounded-lg bg-vault-surface border border-vault-border text-sm text-vault-text-primary focus:outline-none focus:border-vault-accent/50 transition-colors"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 pt-2 text-vault-text-muted">
            <Shield className="size-3" />
            <span className="text-[10px]">Pages are opened in a sandboxed iframe when possible</span>
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
              disabled={!name.trim() || !url.trim() || createPage.isPending}
              className="px-5 py-2 rounded-lg bg-vault-accent text-white text-sm font-medium hover:bg-vault-accent-hover transition-colors disabled:opacity-50 shadow-lg shadow-vault-accent/25"
            >
              {createPage.isPending ? 'Adding...' : 'Add Page'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
