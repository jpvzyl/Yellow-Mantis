import { useVaultStore } from '../../stores/vault'
import { GmailInbox } from './GmailInbox'
import { PagesBrowser } from './PagesBrowser'
import { DocumentVault } from './DocumentVault'
import { CursorChats } from './CursorChats'
import { AuditLogViewer } from './AuditLogViewer'
import { BusinessSettings } from './BusinessSettings'
import { Shield, Building2, Plus, Lock, KeyRound, Fingerprint } from 'lucide-react'

export function VaultContent() {
  const activeBusiness = useVaultStore((s) => s.activeBusiness)
  const activeView = useVaultStore((s) => s.activeView)
  const setShowBusinessForm = useVaultStore((s) => s.setShowBusinessForm)

  if (!activeBusiness) {
    return (
      <div className="flex-1 flex items-center justify-center bg-vault-bg">
        <div className="text-center max-w-md px-8">
          <div className="relative inline-block mb-6">
            <div className="size-20 rounded-2xl bg-vault-surface border border-vault-border flex items-center justify-center shadow-lg shadow-vault-accent/5">
              <Shield className="size-10 text-vault-accent" />
            </div>
            <div className="absolute -bottom-1 -right-1 size-8 rounded-lg bg-vault-surface border border-vault-border flex items-center justify-center">
              <Lock className="size-4 text-vault-accent" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-vault-text-primary mb-2 tracking-tight">Welcome to Company Vault</h2>
          <p className="text-sm text-vault-text-secondary mb-6 leading-relaxed">
            Your secure command center for managing multiple businesses. Gmail accounts, services, documents — all encrypted and in one place.
          </p>
          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="p-3 rounded-lg bg-vault-surface border border-vault-border">
              <Lock className="size-4 text-vault-accent mb-2 mx-auto" />
              <span className="text-[10px] text-vault-text-muted block">Encrypted<br />Storage</span>
            </div>
            <div className="p-3 rounded-lg bg-vault-surface border border-vault-border">
              <KeyRound className="size-4 text-vault-accent mb-2 mx-auto" />
              <span className="text-[10px] text-vault-text-muted block">OAuth2<br />Tokens</span>
            </div>
            <div className="p-3 rounded-lg bg-vault-surface border border-vault-border">
              <Fingerprint className="size-4 text-vault-accent mb-2 mx-auto" />
              <span className="text-[10px] text-vault-text-muted block">Audit<br />Logging</span>
            </div>
          </div>
          <button
            onClick={() => setShowBusinessForm(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-vault-accent text-white text-sm font-medium hover:bg-vault-accent-hover transition-colors shadow-lg shadow-vault-accent/25"
          >
            <Plus className="size-4" />
            Add Your First Business
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-vault-bg">
      {/* Business Header */}
      <header className="h-14 px-6 flex items-center gap-3 border-b border-vault-border bg-vault-surface/50 backdrop-blur-sm shrink-0">
        <div
          className="size-8 rounded-lg flex items-center justify-center text-sm font-bold text-white shadow-sm"
          style={{ backgroundColor: activeBusiness.color }}
        >
          {activeBusiness.icon || activeBusiness.name[0]?.toUpperCase()}
        </div>
        <div>
          <h1 className="text-sm font-semibold text-vault-text-primary tracking-tight">{activeBusiness.name}</h1>
          {activeBusiness.website_url && (
            <a
              href={activeBusiness.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-vault-text-muted hover:text-vault-accent transition-colors"
            >
              {activeBusiness.website_url.replace(/^https?:\/\//, '')}
            </a>
          )}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-vault-surface border border-vault-border">
            <div className="size-1.5 rounded-full bg-green-500" />
            <span className="text-[10px] text-vault-text-muted font-medium tracking-wide">SECURED</span>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-hidden">
        {activeView === 'inbox' && <GmailInbox />}
        {activeView === 'pages' && <PagesBrowser />}
        {activeView === 'documents' && <DocumentVault />}
        {activeView === 'cursor-chats' && <CursorChats />}
        {activeView === 'audit' && <AuditLogViewer />}
        {activeView === 'settings' && <BusinessSettings />}
      </main>
    </div>
  )
}
