import { clsx } from 'clsx'
import {
  ScrollText,
  Shield,
  Globe,
  Mail,
  FileText,
  Settings,
  LogIn,
  LogOut,
  Plus,
  Trash2,
  RefreshCw,
  Eye,
  Download,
  Send,
  Link2,
  Unlink,
} from 'lucide-react'
import { useVaultStore } from '../../stores/vault'
import { useVaultAuditLogs } from '../../api/vault-hooks'
import type { VaultAuditLog } from '../../types/vault'

const ACTION_ICONS: Record<string, typeof Shield> = {
  'business.create': Plus,
  'business.update': Settings,
  'business.delete': Trash2,
  'business.archive': Shield,
  'account.link': Link2,
  'account.unlink': Unlink,
  'account.refresh': RefreshCw,
  'account.revoke': Unlink,
  'page.create': Plus,
  'page.update': Settings,
  'page.delete': Trash2,
  'document.upload': FileText,
  'document.download': Download,
  'document.delete': Trash2,
  'gmail.view': Eye,
  'gmail.read': Mail,
  'gmail.send': Send,
  'session.login': LogIn,
  'session.logout': LogOut,
}

const ACTION_COLORS: Record<string, string> = {
  'business.create': '#22c55e',
  'business.delete': '#ef4444',
  'business.archive': '#f97316',
  'account.link': '#22c55e',
  'account.revoke': '#ef4444',
  'document.upload': '#0ea5e9',
  'document.download': '#8b5cf6',
  'document.delete': '#ef4444',
  'gmail.send': '#22c55e',
  'gmail.view': '#6b7280',
  'gmail.read': '#6b7280',
}

export function AuditLogViewer() {
  const activeBusiness = useVaultStore((s) => s.activeBusiness)
  const { data: logs, isLoading } = useVaultAuditLogs(activeBusiness?.id)

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="px-6 py-4 border-b border-vault-border flex items-center gap-3 shrink-0">
        <ScrollText className="size-5 text-vault-accent" />
        <h2 className="text-sm font-semibold text-vault-text-primary">Audit Log</h2>
        <span className="text-xs text-vault-text-muted">
          Every action is recorded for security compliance
        </span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="size-5 border-2 border-vault-accent border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!isLoading && (!logs || logs.length === 0) && (
          <div className="text-center py-12">
            <ScrollText className="size-10 text-vault-text-muted mx-auto mb-3" />
            <p className="text-sm text-vault-text-secondary">No activity recorded yet</p>
          </div>
        )}

        <div className="px-6 py-4">
          {logs?.map((log, idx) => {
            const Icon = ACTION_ICONS[log.action] || Shield
            const color = ACTION_COLORS[log.action] || '#6b7280'
            const isLast = idx === (logs?.length || 0) - 1

            return (
              <div key={log.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className="size-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    <Icon className="size-3.5" style={{ color }} />
                  </div>
                  {!isLast && <div className="w-px flex-1 bg-vault-border my-1" />}
                </div>

                <div className="flex-1 pb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-vault-text-primary">
                      {formatAction(log.action)}
                    </span>
                    <span className="text-[10px] text-vault-text-muted">
                      {formatTimestamp(log.created_at)}
                    </span>
                  </div>

                  {Object.keys(log.details).length > 0 && (
                    <div className="mt-1.5 px-3 py-2 rounded-md bg-vault-surface border border-vault-border">
                      {Object.entries(log.details).map(([key, val]) => (
                        <div key={key} className="flex items-center gap-2 text-xs">
                          <span className="text-vault-text-muted font-mono">{key}:</span>
                          <span className="text-vault-text-secondary">{String(val)}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {log.ip_address && (
                    <span className="text-[10px] text-vault-text-muted mt-1 block font-mono">
                      IP: {log.ip_address}
                    </span>
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

function formatAction(action: string): string {
  const parts = action.split('.')
  const resource = parts[0].charAt(0).toUpperCase() + parts[0].slice(1)
  const verb = parts[1]?.charAt(0).toUpperCase() + parts[1]?.slice(1)
  return `${resource} ${verb}`
}

function formatTimestamp(ts: string): string {
  const d = new Date(ts)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMin = Math.floor(diffMs / 60000)

  if (diffMin < 1) return 'just now'
  if (diffMin < 60) return `${diffMin}m ago`
  if (diffMin < 1440) return `${Math.floor(diffMin / 60)}h ago`
  return d.toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}
