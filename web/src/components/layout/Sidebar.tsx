import { Link, useLocation } from 'react-router-dom'
import { Inbox, User, Star, Layers, LayoutGrid, Map, Settings, ChevronDown, ChevronRight, Plus, Search } from 'lucide-react'
import { clsx } from 'clsx'
import { useTeams } from '../../api/hooks'
import { useUIStore } from '../../stores/ui'
import { useAuthStore } from '../../stores/auth'
import { useState } from 'react'

function SidebarLink({ to, icon: Icon, label, active }: { to: string; icon: typeof Inbox; label: string; active?: boolean }) {
  return (
    <Link to={to} className={clsx(
      'flex items-center gap-2.5 px-3 py-1.5 rounded-md text-sm transition-colors',
      active ? 'bg-surface-active text-text-primary' : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
    )}>
      <Icon className="size-4 shrink-0" />
      <span className="truncate">{label}</span>
    </Link>
  )
}

function TeamSection({ team }: { team: { id: string; name: string; identifier: string; color: string; issue_count: number } }) {
  const [expanded, setExpanded] = useState(true)
  const location = useLocation()
  const isActive = (path: string) => location.pathname.includes(path)

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 px-3 py-1.5 w-full text-left text-sm text-text-secondary hover:text-text-primary transition-colors"
      >
        {expanded ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
        <div className="size-4 rounded flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: team.color }}>
          {team.identifier[0]}
        </div>
        <span className="font-medium truncate">{team.name}</span>
        <span className="ml-auto text-xs text-text-tertiary">{team.issue_count}</span>
      </button>
      {expanded && (
        <div className="ml-4 mt-0.5 space-y-0.5">
          <Link
            to={`/team/${team.identifier}/issues`}
            className={clsx(
              'flex items-center gap-2 px-3 py-1 rounded text-sm transition-colors',
              isActive(`/team/${team.identifier}/issues`)
                ? 'bg-surface-active text-text-primary'
                : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
            )}
          >
            <Layers className="size-3.5" />
            Issues
          </Link>
          <Link
            to={`/team/${team.identifier}/board`}
            className={clsx(
              'flex items-center gap-2 px-3 py-1 rounded text-sm transition-colors',
              isActive(`/team/${team.identifier}/board`)
                ? 'bg-surface-active text-text-primary'
                : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
            )}
          >
            <LayoutGrid className="size-3.5" />
            Board
          </Link>
        </div>
      )}
    </div>
  )
}

export function Sidebar() {
  const { data: teams } = useTeams()
  const location = useLocation()
  const collapsed = useUIStore((s) => s.sidebarCollapsed)
  const openCommandPalette = useUIStore((s) => s.openCommandPalette)
  const currentWorkspace = useAuthStore((s) => s.currentWorkspace)

  if (collapsed) return null

  const isActive = (path: string) => location.pathname === path

  return (
    <aside className="w-60 h-screen bg-surface-secondary border-r border-border-primary flex flex-col shrink-0">
      {/* Workspace header */}
      <div className="p-3 flex items-center gap-2 border-b border-border-primary">
        <div className="size-6 rounded bg-accent flex items-center justify-center text-white text-xs font-bold">
          {currentWorkspace?.name?.[0]?.toUpperCase() || 'Y'}
        </div>
        <span className="font-semibold text-sm truncate">{currentWorkspace?.name || 'Yellow Mantis'}</span>
      </div>

      {/* Search */}
      <button
        onClick={openCommandPalette}
        className="mx-3 mt-3 flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface-tertiary border border-border-primary text-text-tertiary text-sm hover:border-border-secondary transition-colors"
      >
        <Search className="size-3.5" />
        <span>Search...</span>
        <kbd className="ml-auto text-[10px] bg-surface-hover px-1.5 py-0.5 rounded border border-border-primary">⌘K</kbd>
      </button>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
        <SidebarLink to="/inbox" icon={Inbox} label="Inbox" active={isActive('/inbox')} />
        <SidebarLink to="/my-issues" icon={User} label="My Issues" active={isActive('/my-issues')} />
        <SidebarLink to="/favorites" icon={Star} label="Favorites" active={isActive('/favorites')} />

        <div className="pt-4 pb-1 px-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-tertiary uppercase tracking-wider">Teams</span>
            <button className="text-text-tertiary hover:text-text-primary transition-colors">
              <Plus className="size-3.5" />
            </button>
          </div>
        </div>

        {teams?.map((team) => (
          <TeamSection key={team.id} team={team} />
        ))}

        <div className="pt-4 pb-1 px-3">
          <span className="text-xs font-medium text-text-tertiary uppercase tracking-wider">Workspace</span>
        </div>
        <SidebarLink to="/projects" icon={LayoutGrid} label="Projects" active={isActive('/projects')} />
        <SidebarLink to="/roadmap" icon={Map} label="Roadmap" active={isActive('/roadmap')} />
      </nav>

      {/* Settings */}
      <div className="p-2 border-t border-border-primary">
        <SidebarLink to="/settings" icon={Settings} label="Settings" active={isActive('/settings')} />
      </div>
    </aside>
  )
}
