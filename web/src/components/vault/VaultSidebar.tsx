import { clsx } from 'clsx'
import {
  Plus,
  Mail,
  Globe,
  FileText,
  ScrollText,
  Settings,
  Shield,
  ChevronRight,
  Building2,
  Lock,
  MessageSquare,
} from 'lucide-react'
import { useVaultStore } from '../../stores/vault'
import type { VaultBusiness, VaultView } from '../../types/vault'

const NAV_ITEMS: { view: VaultView; icon: typeof Mail; label: string }[] = [
  { view: 'inbox', icon: Mail, label: 'Gmail Inbox' },
  { view: 'pages', icon: Globe, label: 'Pages & Services' },
  { view: 'documents', icon: FileText, label: 'Documents' },
  { view: 'cursor-chats', icon: MessageSquare, label: 'Cursor Chats' },
  { view: 'audit', icon: ScrollText, label: 'Audit Log' },
  { view: 'settings', icon: Settings, label: 'Business Settings' },
]

interface Props {
  businesses: VaultBusiness[]
}

export function VaultSidebar({ businesses }: Props) {
  const activeBusiness = useVaultStore((s) => s.activeBusiness)
  const activeView = useVaultStore((s) => s.activeView)
  const setActiveBusiness = useVaultStore((s) => s.setActiveBusiness)
  const setActiveView = useVaultStore((s) => s.setActiveView)
  const setShowBusinessForm = useVaultStore((s) => s.setShowBusinessForm)

  return (
    <aside className="w-64 h-full bg-vault-sidebar border-r border-vault-border flex flex-col shrink-0">
      {/* Vault Header */}
      <div className="p-4 border-b border-vault-border">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Shield className="size-5 text-vault-accent" />
            <Lock className="size-2.5 text-vault-accent absolute -bottom-0.5 -right-0.5" />
          </div>
          <span className="font-semibold text-sm tracking-wide text-vault-text-primary">COMPANY VAULT</span>
        </div>
        <p className="text-[10px] text-vault-text-muted mt-1 tracking-widest uppercase">Encrypted & Secured</p>
      </div>

      {/* Business Tabs */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-3">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[10px] font-semibold text-vault-text-muted tracking-widest uppercase">Businesses</span>
            <button
              onClick={() => setShowBusinessForm(true)}
              className="text-vault-text-muted hover:text-vault-accent transition-colors"
              title="Add Business"
            >
              <Plus className="size-3.5" />
            </button>
          </div>

          <div className="space-y-1">
            {businesses.map((biz) => (
              <button
                key={biz.id}
                onClick={() => setActiveBusiness(biz)}
                className={clsx(
                  'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-sm transition-all group',
                  activeBusiness?.id === biz.id
                    ? 'bg-vault-active text-vault-text-primary shadow-sm shadow-vault-accent/10 border border-vault-accent/20'
                    : 'text-vault-text-secondary hover:bg-vault-hover hover:text-vault-text-primary border border-transparent'
                )}
              >
                <div
                  className="size-7 rounded-md flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-sm"
                  style={{ backgroundColor: biz.color }}
                >
                  {biz.icon || biz.name[0]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="truncate font-medium text-[13px]">{biz.name}</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {biz.accounts_count > 0 && (
                      <span className="text-[10px] text-vault-text-muted flex items-center gap-0.5">
                        <Mail className="size-2.5" />{biz.accounts_count}
                      </span>
                    )}
                    <span className="text-[10px] text-vault-text-muted flex items-center gap-0.5">
                      <Globe className="size-2.5" />{biz.pages_count}
                    </span>
                    <span className="text-[10px] text-vault-text-muted flex items-center gap-0.5">
                      <FileText className="size-2.5" />{biz.documents_count}
                    </span>
                  </div>
                </div>
                <ChevronRight className={clsx(
                  'size-3.5 shrink-0 transition-opacity',
                  activeBusiness?.id === biz.id ? 'opacity-100 text-vault-accent' : 'opacity-0 group-hover:opacity-50'
                )} />
              </button>
            ))}

            {businesses.length === 0 && (
              <button
                onClick={() => setShowBusinessForm(true)}
                className="w-full flex flex-col items-center gap-2 px-4 py-6 rounded-lg border border-dashed border-vault-border-active text-vault-text-muted hover:border-vault-accent hover:text-vault-accent transition-colors"
              >
                <Building2 className="size-6" />
                <span className="text-xs font-medium">Add Your First Business</span>
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        {activeBusiness && (
          <div className="px-3 pb-3">
            <div className="h-px bg-vault-border my-2" />
            <div className="space-y-0.5">
              {NAV_ITEMS.map(({ view, icon: Icon, label }) => (
                <button
                  key={view}
                  onClick={() => setActiveView(view)}
                  className={clsx(
                    'w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md text-sm transition-all',
                    activeView === view
                      ? 'bg-vault-active text-vault-accent font-medium'
                      : 'text-vault-text-secondary hover:bg-vault-hover hover:text-vault-text-primary'
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  <span className="truncate">{label}</span>
                  {view === 'inbox' && activeBusiness.accounts_count > 0 && (
                    <span className="ml-auto size-1.5 rounded-full bg-green-500 animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Security Footer */}
      <div className="p-3 border-t border-vault-border">
        <div className="flex items-center gap-2 px-2">
          <div className="size-2 rounded-full bg-green-500 shadow-sm shadow-green-500/50" />
          <span className="text-[10px] text-vault-text-muted tracking-wide">AES-256 ENCRYPTED</span>
        </div>
      </div>
    </aside>
  )
}
