import { useState, useRef, useEffect } from 'react'
import { X, MoreHorizontal, Trash2, Check } from 'lucide-react'
import { useIssue, useUpdateIssue, useDeleteIssue, useTeam, useLabels, useWorkspaceMembers } from '../../api/hooks'
import { useUIStore } from '../../stores/ui'
import { PriorityIcon } from '../ui/PriorityIcon'
import { StatusIcon, StatusBadge } from '../ui/StatusIcon'
import { UserAvatar } from '../ui/UserAvatar'

const PRIORITIES = [
  { value: 0, label: 'No priority' },
  { value: 1, label: 'Urgent' },
  { value: 2, label: 'High' },
  { value: 3, label: 'Medium' },
  { value: 4, label: 'Low' },
]

function EditableTitle({ value, onSave }: { value: string; onSave: (v: string) => void }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { setDraft(value) }, [value])
  useEffect(() => { if (editing) inputRef.current?.focus() }, [editing])

  const commit = () => {
    const trimmed = draft.trim()
    if (trimmed && trimmed !== value) onSave(trimmed)
    else setDraft(value)
    setEditing(false)
  }

  if (!editing) {
    return (
      <h1
        className="text-lg font-semibold text-text-primary leading-tight cursor-text hover:bg-surface-hover/50 rounded px-1 -mx-1 py-0.5"
        onClick={() => setEditing(true)}
      >
        {value}
      </h1>
    )
  }

  return (
    <input
      ref={inputRef}
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === 'Enter') commit()
        if (e.key === 'Escape') { setDraft(value); setEditing(false) }
      }}
      className="w-full text-lg font-semibold text-text-primary bg-surface-tertiary rounded px-1 -mx-1 py-0.5 outline-none ring-1 ring-accent"
    />
  )
}

function EditableDescription({ value, onSave }: { value?: string; onSave: (v: string) => void }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value || '')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => { setDraft(value || '') }, [value])
  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.focus()
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [editing])

  const commit = () => {
    const trimmed = draft.trim()
    if (trimmed !== (value || '').trim()) onSave(trimmed)
    setEditing(false)
  }

  const cancel = () => {
    setDraft(value || '')
    setEditing(false)
  }

  if (!editing) {
    return (
      <div
        className="cursor-text hover:bg-surface-hover/50 rounded px-1 -mx-1 py-0.5 min-h-[2rem]"
        onClick={() => setEditing(true)}
      >
        {value ? (
          <div className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">{value}</div>
        ) : (
          <p className="text-sm text-text-tertiary italic">Click to add description...</p>
        )}
      </div>
    )
  }

  return (
    <div>
      <textarea
        ref={textareaRef}
        value={draft}
        onChange={(e) => {
          setDraft(e.target.value)
          e.target.style.height = 'auto'
          e.target.style.height = e.target.scrollHeight + 'px'
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') cancel()
        }}
        placeholder="Add description..."
        className="w-full text-sm text-text-secondary bg-surface-tertiary rounded px-1 -mx-1 py-0.5 outline-none ring-1 ring-accent resize-none leading-relaxed min-h-[4rem]"
      />
      <div className="flex items-center gap-2 mt-2">
        <button
          onClick={commit}
          className="px-3 py-1.5 text-xs font-medium text-white bg-accent rounded-md hover:bg-accent-hover transition-colors"
        >
          Save
        </button>
        <button
          onClick={cancel}
          className="px-3 py-1.5 text-xs text-text-secondary hover:text-text-primary rounded-md hover:bg-surface-hover transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export function IssueDetail({ teamId }: { teamId: string }) {
  const issueId = useUIStore((s) => s.selectedIssueId)
  const isOpen = useUIStore((s) => s.issueDetailOpen)
  const close = useUIStore((s) => s.closeIssueDetail)
  const { data: issue, isLoading } = useIssue(teamId, issueId || '')
  const { data: team } = useTeam(teamId)
  const { data: allLabels } = useLabels()
  const { data: memberships } = useWorkspaceMembers()
  const updateIssue = useUpdateIssue(teamId)
  const deleteIssue = useDeleteIssue(teamId)

  const [menuOpen, setMenuOpen] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    setMenuOpen(false)
    setConfirmDelete(false)
  }, [issueId])

  if (!isOpen || !issueId) return null

  const handleUpdate = (fields: Record<string, unknown>) => {
    if (!issue) return
    updateIssue.mutate({ id: issue.id, ...fields } as any)
  }

  const handleDelete = () => {
    if (!issue) return
    deleteIssue.mutate(issue.id, { onSuccess: () => close() })
  }

  const handleToggleLabel = (labelId: string) => {
    if (!issue) return
    const current = issue.labels.map((l) => l.id)
    const next = current.includes(labelId)
      ? current.filter((id) => id !== labelId)
      : [...current, labelId]
    handleUpdate({ label_ids: next })
  }

  return (
    <div className="fixed inset-y-0 right-0 w-[580px] bg-surface-secondary border-l border-border-primary shadow-2xl z-40 flex flex-col">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border-primary">
        <div className="flex items-center gap-2">
          {issue && (
            <>
              <span className="text-xs text-text-tertiary font-mono">{issue.identifier}</span>
              <span className="text-xs text-text-tertiary">·</span>
              <span className="text-xs text-text-tertiary">{issue.team.name}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-1">
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => { setMenuOpen(!menuOpen); setConfirmDelete(false) }}
              className="p-1.5 rounded hover:bg-surface-hover text-text-tertiary hover:text-text-primary transition-colors"
            >
              <MoreHorizontal className="size-4" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-surface-tertiary border border-border-primary rounded-lg shadow-xl py-1 z-50">
                {!confirmDelete ? (
                  <button
                    onClick={() => setConfirmDelete(true)}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:bg-surface-hover transition-colors"
                  >
                    <Trash2 className="size-3.5" />
                    Delete issue
                  </button>
                ) : (
                  <button
                    onClick={handleDelete}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-colors"
                  >
                    <Trash2 className="size-3.5" />
                    Confirm delete
                  </button>
                )}
              </div>
            )}
          </div>
          <button
            onClick={close}
            className="p-1.5 rounded hover:bg-surface-hover text-text-tertiary hover:text-text-primary transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center text-text-tertiary text-sm">Loading...</div>
      ) : issue ? (
        <div className="flex-1 overflow-y-auto">
          <div className="px-5 pt-5 pb-3">
            <EditableTitle
              value={issue.title}
              onSave={(title) => handleUpdate({ title })}
            />
          </div>

          <div className="px-5 py-3 border-b border-border-primary space-y-3">
            <div className="flex items-center gap-4">
              <span className="text-xs text-text-tertiary w-20">Status</span>
              <div className="flex items-center gap-2">
                <StatusBadge state={issue.state} />
                {team?.workflow_states && (
                  <select
                    value={issue.state.id}
                    onChange={(e) => handleUpdate({ state_id: e.target.value })}
                    className="bg-transparent text-xs text-text-secondary border border-border-primary rounded px-2 py-1 outline-none focus:border-accent"
                  >
                    {team.workflow_states.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs text-text-tertiary w-20">Priority</span>
              <div className="flex items-center gap-2">
                <PriorityIcon priority={issue.priority} />
                <select
                  value={issue.priority}
                  onChange={(e) => handleUpdate({ priority: Number(e.target.value) })}
                  className="bg-transparent text-xs text-text-secondary border border-border-primary rounded px-2 py-1 outline-none focus:border-accent"
                >
                  {PRIORITIES.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs text-text-tertiary w-20">Assignee</span>
              <div className="flex items-center gap-2">
                <UserAvatar user={issue.assignee} size="xs" />
                <select
                  value={issue.assignee?.id || ''}
                  onChange={(e) => handleUpdate({ assignee_id: e.target.value || null })}
                  className="bg-transparent text-xs text-text-secondary border border-border-primary rounded px-2 py-1 outline-none focus:border-accent"
                >
                  <option value="">Unassigned</option>
                  {memberships?.map((m) => (
                    <option key={m.user.id} value={m.user.id}>{m.user.display_name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-xs text-text-tertiary w-20 pt-1">Labels</span>
              <div className="flex flex-wrap gap-1.5">
                {allLabels?.map((label) => {
                  const active = issue.labels.some((l) => l.id === label.id)
                  return (
                    <button
                      key={label.id}
                      onClick={() => handleToggleLabel(label.id)}
                      className="text-[11px] px-2 py-0.5 rounded-full border transition-all flex items-center gap-1"
                      style={{
                        borderColor: active ? label.color : 'var(--border-primary)',
                        color: active ? label.color : 'var(--text-tertiary)',
                        backgroundColor: active ? `${label.color}10` : 'transparent',
                      }}
                    >
                      {active && <Check className="size-2.5" />}
                      {label.name}
                    </button>
                  )
                })}
              </div>
            </div>

            {issue.project && (
              <div className="flex items-center gap-4">
                <span className="text-xs text-text-tertiary w-20">Project</span>
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded" style={{ backgroundColor: issue.project.color }} />
                  <span className="text-xs text-text-secondary">{issue.project.name}</span>
                </div>
              </div>
            )}

            {issue.due_date && (
              <div className="flex items-center gap-4">
                <span className="text-xs text-text-tertiary w-20">Due date</span>
                <span className="text-xs text-text-secondary">
                  {new Date(issue.due_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            )}
          </div>

          <div className="px-5 py-4">
            <h3 className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-2">Description</h3>
            <EditableDescription
              value={issue.description}
              onSave={(description) => handleUpdate({ description })}
            />
          </div>

          {issue.sub_issues && issue.sub_issues.length > 0 && (
            <div className="px-5 py-4 border-t border-border-primary">
              <h3 className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-2">
                Sub-issues ({issue.sub_issues.length})
              </h3>
              <div className="space-y-1">
                {issue.sub_issues.map((si) => (
                  <div key={si.id} className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-surface-hover">
                    {si.state && <StatusIcon state={si.state} />}
                    <span className="text-xs text-text-tertiary font-mono">{si.identifier}</span>
                    <span className="text-sm text-text-secondary truncate">{si.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-text-tertiary text-sm">Issue not found</div>
      )}
    </div>
  )
}
