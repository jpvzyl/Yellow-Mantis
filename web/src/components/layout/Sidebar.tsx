import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Inbox, User, Star, Layers, LayoutGrid, Map, Settings, ChevronDown, ChevronRight, Plus, Search, Shield, Check, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { clsx } from 'clsx'
import { useTeams, useCreateTeam, useUpdateTeam, useDeleteTeam } from '../../api/hooks'
import { useUIStore } from '../../stores/ui'
import { useAuthStore } from '../../stores/auth'
import { api } from '../../api/client'
import { useState, useRef, useEffect } from 'react'
import type { Company } from '../../types'
import { useQueryClient } from '@tanstack/react-query'

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

function EditTeamDialog({ team, onClose }: { team: { id: string; name: string; identifier: string; color: string }; onClose: () => void }) {
  const [name, setName] = useState(team.name)
  const [color, setColor] = useState(team.color)
  const updateTeam = useUpdateTeam()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateTeam.mutateAsync({ id: team.identifier, name, color })
      onClose()
    } catch {
      // error handled by mutation
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-surface-secondary border border-border-primary rounded-xl p-6 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Edit Team</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {updateTeam.isError && (
            <div className="text-sm text-priority-urgent bg-priority-urgent/10 border border-priority-urgent/20 rounded-lg px-3 py-2">
              {(updateTeam.error as Error).message}
            </div>
          )}
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Team Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-surface-tertiary border border-border-primary rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-accent transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Identifier</label>
            <input
              type="text"
              value={team.identifier}
              disabled
              className="w-full bg-surface-tertiary border border-border-primary rounded-lg px-3 py-2 text-sm text-text-tertiary font-mono outline-none opacity-50 cursor-not-allowed"
            />
            <p className="text-[11px] text-text-tertiary mt-1">Identifier cannot be changed after creation</p>
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Color</label>
            <div className="flex gap-2">
              {TEAM_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={clsx(
                    'size-8 rounded-lg transition-all',
                    color === c ? 'ring-2 ring-offset-2 ring-offset-surface-secondary ring-accent scale-110' : 'hover:scale-105'
                  )}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary rounded-lg hover:bg-surface-hover transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateTeam.isPending || !name}
              className="px-4 py-2 text-sm font-medium text-white bg-accent rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50"
            >
              {updateTeam.isPending ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function TeamSection({ team, isAdmin }: { team: { id: string; name: string; identifier: string; color: string; issue_count: number }; isAdmin: boolean }) {
  const [expanded, setExpanded] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const deleteTeam = useDeleteTeam()
  const isActive = (path: string) => location.pathname.includes(path)

  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
        setConfirmDelete(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  const handleDelete = async () => {
    try {
      await deleteTeam.mutateAsync(team.identifier)
      setMenuOpen(false)
      navigate('/')
    } catch {
      // error handled by mutation
    }
  }

  return (
    <div>
      <div className="flex items-center group">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex-1 flex items-center gap-2 px-3 py-1.5 text-left text-sm text-text-secondary hover:text-text-primary transition-colors min-w-0"
        >
          {expanded ? <ChevronDown className="size-3.5 shrink-0" /> : <ChevronRight className="size-3.5 shrink-0" />}
          <div className="size-4 rounded flex items-center justify-center text-[10px] font-bold text-white shrink-0" style={{ backgroundColor: team.color }}>
            {team.identifier[0]}
          </div>
          <span className="font-medium truncate">{team.name}</span>
          <span className="ml-auto text-xs text-text-tertiary">{team.issue_count}</span>
        </button>
        {isAdmin && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); setConfirmDelete(false) }}
              className="p-1 mr-1 rounded text-text-tertiary hover:text-text-primary hover:bg-surface-hover transition-colors opacity-0 group-hover:opacity-100"
            >
              <MoreHorizontal className="size-3.5" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-full mt-1 w-40 bg-surface-tertiary border border-border-primary rounded-lg shadow-xl py-1 z-50">
                <button
                  onClick={() => { setMenuOpen(false); setShowEdit(true) }}
                  className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors"
                >
                  <Pencil className="size-3" />
                  Edit team
                </button>
                {!confirmDelete ? (
                  <button
                    onClick={() => setConfirmDelete(true)}
                    className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-red-400 hover:bg-surface-hover transition-colors"
                  >
                    <Trash2 className="size-3" />
                    Delete team
                  </button>
                ) : (
                  <button
                    onClick={handleDelete}
                    className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-colors"
                  >
                    <Trash2 className="size-3" />
                    {deleteTeam.isPending ? 'Deleting...' : 'Confirm delete'}
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
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
      {showEdit && <EditTeamDialog team={team} onClose={() => setShowEdit(false)} />}
    </div>
  )
}

function CompanySwitcher() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const companies = useAuthStore((s) => s.companies)
  const currentCompany = useAuthStore((s) => s.currentCompany)
  const setCurrentCompany = useAuthStore((s) => s.setCurrentCompany)
  const setCurrentWorkspace = useAuthStore((s) => s.setCurrentWorkspace)
  const workspaces = useAuthStore((s) => s.workspaces)
  const qc = useQueryClient()
  const navigate = useNavigate()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const switchCompany = (company: Company) => {
    setCurrentCompany(company)
    localStorage.setItem('ym_company', company.id)
    if (company.workspace_slug) {
      api.setWorkspaceSlug(company.workspace_slug)
      const ws = workspaces.find((w) => w.slug === company.workspace_slug)
      if (ws) setCurrentWorkspace(ws)
    }
    qc.invalidateQueries()
    setOpen(false)
    navigate('/')
  }

  if (!companies.length) return null

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-3 flex items-center gap-2 border-b border-border-primary hover:bg-surface-hover transition-colors"
      >
        <div
          className="size-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
          style={{ backgroundColor: currentCompany?.color || '#6366f1' }}
        >
          {currentCompany?.name?.[0]?.toUpperCase() || 'C'}
        </div>
        <div className="flex-1 text-left min-w-0">
          <div className="font-semibold text-sm truncate text-text-primary">
            {currentCompany?.name || 'Select Company'}
          </div>
          {currentCompany?.role === 'admin' && (
            <div className="text-[10px] text-accent font-medium uppercase tracking-wider">Admin</div>
          )}
        </div>
        <ChevronDown className={clsx('size-3.5 text-text-tertiary transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute left-2 right-2 top-full mt-1 bg-surface-secondary border border-border-primary rounded-lg shadow-xl z-50 py-1 max-h-64 overflow-y-auto">
          <div className="px-3 py-1.5 text-[10px] font-medium text-text-tertiary uppercase tracking-wider">
            Your Companies
          </div>
          {companies.map((company) => (
            <button
              key={company.id}
              onClick={() => switchCompany(company)}
              className={clsx(
                'w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors',
                company.id === currentCompany?.id
                  ? 'bg-accent/10 text-accent'
                  : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
              )}
            >
              <div
                className="size-5 rounded flex items-center justify-center text-white text-[9px] font-bold shrink-0"
                style={{ backgroundColor: company.color }}
              >
                {company.name[0].toUpperCase()}
              </div>
              <span className="truncate flex-1 text-left">{company.name}</span>
              {company.id === currentCompany?.id && <Check className="size-3.5 shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const TEAM_COLORS = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#8b5cf6', '#06b6d4']

function CreateTeamDialog({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('')
  const [identifier, setIdentifier] = useState('')
  const [color, setColor] = useState(TEAM_COLORS[0])
  const [autoId, setAutoId] = useState(true)
  const createTeam = useCreateTeam()
  const navigate = useNavigate()

  const handleNameChange = (v: string) => {
    setName(v)
    if (autoId) {
      setIdentifier(v.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 4))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const team = await createTeam.mutateAsync({ name, identifier, color })
      onClose()
      navigate(`/team/${team.identifier}/board`)
    } catch {
      // error handled by mutation
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-surface-secondary border border-border-primary rounded-xl p-6 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Create Team</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {createTeam.isError && (
            <div className="text-sm text-priority-urgent bg-priority-urgent/10 border border-priority-urgent/20 rounded-lg px-3 py-2">
              {(createTeam.error as Error).message}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Team Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full bg-surface-tertiary border border-border-primary rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-accent transition-colors"
              placeholder="e.g. Engineering"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Identifier *</label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => { setAutoId(false); setIdentifier(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 5)) }}
              className="w-full bg-surface-tertiary border border-border-primary rounded-lg px-3 py-2 text-sm text-text-primary font-mono placeholder:text-text-tertiary outline-none focus:border-accent transition-colors"
              placeholder="e.g. ENG"
              required
              maxLength={5}
            />
            <p className="text-[11px] text-text-tertiary mt-1">Used as issue prefix (e.g. ENG-1, ENG-2)</p>
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Color</label>
            <div className="flex gap-2">
              {TEAM_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={clsx(
                    'size-8 rounded-lg transition-all',
                    color === c ? 'ring-2 ring-offset-2 ring-offset-surface-secondary ring-accent scale-110' : 'hover:scale-105'
                  )}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary rounded-lg hover:bg-surface-hover transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createTeam.isPending || !name || !identifier}
              className="px-4 py-2 text-sm font-medium text-white bg-accent rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50"
            >
              {createTeam.isPending ? 'Creating...' : 'Create Team'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export function Sidebar() {
  const { data: teams } = useTeams()
  const location = useLocation()
  const collapsed = useUIStore((s) => s.sidebarCollapsed)
  const openCommandPalette = useUIStore((s) => s.openCommandPalette)
  const currentCompany = useAuthStore((s) => s.currentCompany)
  const [showCreateTeam, setShowCreateTeam] = useState(false)

  if (collapsed) return null

  const isActive = (path: string) => location.pathname === path
  const isAdmin = currentCompany?.role === 'admin'

  return (
    <aside className="w-60 h-screen bg-surface-secondary border-r border-border-primary flex flex-col shrink-0">
      <CompanySwitcher />

      <button
        onClick={openCommandPalette}
        className="mx-3 mt-3 flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface-tertiary border border-border-primary text-text-tertiary text-sm hover:border-border-secondary transition-colors"
      >
        <Search className="size-3.5" />
        <span>Search...</span>
        <kbd className="ml-auto text-[10px] bg-surface-hover px-1.5 py-0.5 rounded border border-border-primary">⌘K</kbd>
      </button>

      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
        <SidebarLink to="/inbox" icon={Inbox} label="Inbox" active={isActive('/inbox')} />
        <SidebarLink to="/my-issues" icon={User} label="My Issues" active={isActive('/my-issues')} />
        <SidebarLink to="/favorites" icon={Star} label="Favorites" active={isActive('/favorites')} />

        <div className="pt-4 pb-1 px-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-tertiary uppercase tracking-wider">Teams</span>
            <button
              onClick={() => setShowCreateTeam(true)}
              className="text-text-tertiary hover:text-text-primary transition-colors"
              title="Create team"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
        </div>

        {teams?.map((team) => (
          <TeamSection key={team.id} team={team} isAdmin={!!isAdmin} />
        ))}

        <div className="pt-4 pb-1 px-3">
          <span className="text-xs font-medium text-text-tertiary uppercase tracking-wider">Workspace</span>
        </div>
        <SidebarLink to="/projects" icon={LayoutGrid} label="Projects" active={isActive('/projects')} />
        <SidebarLink to="/roadmap" icon={Map} label="Roadmap" active={isActive('/roadmap')} />

        <div className="pt-4 pb-1 px-3">
          <span className="text-xs font-medium text-text-tertiary uppercase tracking-wider">Administration</span>
        </div>
        <SidebarLink to="/admin" icon={Shield} label="User Management" active={isActive('/admin')} />
      </nav>

      <div className="p-2 border-t border-border-primary">
        <SidebarLink to="/settings" icon={Settings} label="Settings" active={isActive('/settings')} />
      </div>

      {showCreateTeam && <CreateTeamDialog onClose={() => setShowCreateTeam(false)} />}
    </aside>
  )
}
