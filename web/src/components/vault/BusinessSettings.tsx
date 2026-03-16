import { useState, useEffect } from 'react'
import {
  Settings,
  Trash2,
  Archive,
  ArchiveRestore,
  Save,
  Mail,
  Shield,
  Plus,
  Unlink,
  AlertTriangle,
} from 'lucide-react'
import { useVaultStore } from '../../stores/vault'
import { useUpdateBusiness, useDeleteBusiness, useArchiveBusiness, useGoogleAuthorize, useRevokeAccount } from '../../api/vault-hooks'

const COLORS = [
  '#6366f1', '#8b5cf6', '#ec4899', '#ef4444', '#f97316',
  '#eab308', '#22c55e', '#0ea5e9', '#3b82f6', '#14b8a6',
]

export function BusinessSettings() {
  const activeBusiness = useVaultStore((s) => s.activeBusiness)
  const setActiveBusiness = useVaultStore((s) => s.setActiveBusiness)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [color, setColor] = useState('#6366f1')
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  const updateBiz = useUpdateBusiness()
  const deleteBiz = useDeleteBusiness()
  const archiveBiz = useArchiveBusiness()
  const authorize = useGoogleAuthorize()
  const revokeAccount = useRevokeAccount()

  useEffect(() => {
    if (activeBusiness) {
      setName(activeBusiness.name)
      setDescription(activeBusiness.description || '')
      setWebsiteUrl(activeBusiness.website_url || '')
      setColor(activeBusiness.color)
    }
  }, [activeBusiness])

  if (!activeBusiness) return null

  const handleSave = async () => {
    await updateBiz.mutateAsync({ id: activeBusiness.id, name, description, color, website_url: websiteUrl || undefined })
  }

  const handleDelete = async () => {
    await deleteBiz.mutateAsync(activeBusiness.id)
    setActiveBusiness(null)
  }

  const handleArchive = async () => {
    await archiveBiz.mutateAsync(activeBusiness.id)
  }

  const handleLinkGmail = async () => {
    const result = await authorize.mutateAsync(activeBusiness.id)
    window.location.href = result.authorization_url
  }

  const handleRevokeAccount = async (accountId: string) => {
    await revokeAccount.mutateAsync({ businessId: activeBusiness.id, accountId })
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-2xl mx-auto p-8">
        <div className="flex items-center gap-3 mb-8">
          <Settings className="size-5 text-vault-accent" />
          <h2 className="text-lg font-semibold text-vault-text-primary">Business Settings</h2>
        </div>

        {/* General Settings */}
        <section className="mb-10">
          <h3 className="text-xs font-semibold text-vault-text-muted uppercase tracking-widest mb-4">General</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-vault-text-secondary mb-1.5">Business Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-vault-surface border border-vault-border text-sm text-vault-text-primary focus:outline-none focus:border-vault-accent/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-vault-text-secondary mb-1.5">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 rounded-lg bg-vault-surface border border-vault-border text-sm text-vault-text-primary focus:outline-none focus:border-vault-accent/50 transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-vault-text-secondary mb-1.5">Website URL</label>
              <input
                type="url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-3 py-2 rounded-lg bg-vault-surface border border-vault-border text-sm text-vault-text-primary placeholder:text-vault-text-muted focus:outline-none focus:border-vault-accent/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-vault-text-secondary mb-1.5">Color</label>
              <div className="flex items-center gap-2">
                {COLORS.map((c) => (
                  <button
                    key={c}
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

            <button
              onClick={handleSave}
              disabled={updateBiz.isPending}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-vault-accent text-white text-sm font-medium hover:bg-vault-accent-hover transition-colors disabled:opacity-50"
            >
              <Save className="size-4" />
              {updateBiz.isPending ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </section>

        {/* Connected Accounts */}
        <section className="mb-10">
          <h3 className="text-xs font-semibold text-vault-text-muted uppercase tracking-widest mb-4">Connected Accounts</h3>
          <div className="space-y-3">
            {activeBusiness.accounts?.map((account) => (
              <div
                key={account.id}
                className="flex items-center gap-3 p-4 rounded-xl bg-vault-surface border border-vault-border"
              >
                {account.avatar_url ? (
                  <img src={account.avatar_url} alt="" className="size-9 rounded-full" />
                ) : (
                  <div className="size-9 rounded-full bg-vault-accent/20 flex items-center justify-center">
                    <Mail className="size-4 text-vault-accent" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-vault-text-primary">{account.display_name || account.email}</div>
                  <div className="text-xs text-vault-text-muted">{account.email}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    account.status === 'active'
                      ? 'bg-green-500/10 text-green-400'
                      : 'bg-red-500/10 text-red-400'
                  }`}>
                    {account.status}
                  </span>
                  <button
                    onClick={() => handleRevokeAccount(account.id)}
                    className="p-1.5 rounded-md text-vault-text-muted hover:text-red-400 hover:bg-vault-hover transition-colors"
                    title="Revoke access"
                  >
                    <Unlink className="size-3.5" />
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={handleLinkGmail}
              disabled={authorize.isPending}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-dashed border-vault-border-active text-sm text-vault-text-secondary hover:border-vault-accent hover:text-vault-accent transition-colors disabled:opacity-50"
            >
              <Plus className="size-4" />
              {authorize.isPending ? 'Connecting...' : 'Link Gmail Account'}
            </button>

            <div className="flex items-center gap-2 px-1">
              <Shield className="size-3 text-vault-text-muted" />
              <span className="text-[10px] text-vault-text-muted">OAuth2 tokens are encrypted with AES-256 at rest</span>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section>
          <h3 className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-4">Danger Zone</h3>
          <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 space-y-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handleArchive}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-vault-border bg-vault-surface text-sm text-vault-text-secondary hover:text-vault-text-primary transition-colors"
              >
                {activeBusiness.archived ? <ArchiveRestore className="size-4" /> : <Archive className="size-4" />}
                {activeBusiness.archived ? 'Restore Business' : 'Archive Business'}
              </button>
            </div>

            <div className="flex items-center gap-3">
              {!deleteConfirm ? (
                <button
                  onClick={() => setDeleteConfirm(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400 hover:bg-red-500/20 transition-colors"
                >
                  <Trash2 className="size-4" />
                  Delete Business
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <AlertTriangle className="size-5 text-red-400 shrink-0" />
                  <span className="text-sm text-red-400">This will permanently delete all data.</span>
                  <button
                    onClick={handleDelete}
                    disabled={deleteBiz.isPending}
                    className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
                  >
                    {deleteBiz.isPending ? 'Deleting...' : 'Confirm Delete'}
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(false)}
                    className="text-sm text-vault-text-muted hover:text-vault-text-primary transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
