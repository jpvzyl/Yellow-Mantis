import { useState } from 'react'
import { X } from 'lucide-react'
import { useCreateIssue, useTeam } from '../../api/hooks'
import { useUIStore } from '../../stores/ui'
import { PriorityIcon } from '../ui/PriorityIcon'

const priorities = [
  { value: 0, label: 'No priority' },
  { value: 1, label: 'Urgent' },
  { value: 2, label: 'High' },
  { value: 3, label: 'Medium' },
  { value: 4, label: 'Low' },
]

export function CreateIssueDialog({ teamId }: { teamId: string }) {
  const isOpen = useUIStore((s) => s.createIssueOpen)
  const close = useUIStore((s) => s.closeCreateIssue)
  const createIssue = useCreateIssue(teamId)
  const { data: team } = useTeam(teamId)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState(0)
  const [stateId, setStateId] = useState('')

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    await createIssue.mutateAsync({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      state_id: stateId || undefined,
    } as any)

    setTitle('')
    setDescription('')
    setPriority(0)
    setStateId('')
    close()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      <div className="absolute inset-0 bg-black/60" onClick={close} />
      <div className="relative w-full max-w-lg bg-surface-secondary border border-border-primary rounded-xl shadow-2xl">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between px-5 py-3 border-b border-border-primary">
            <div className="flex items-center gap-2">
              {team && (
                <span className="text-xs text-text-tertiary font-mono">{team.identifier}</span>
              )}
              <span className="text-sm font-medium text-text-primary">New issue</span>
            </div>
            <button type="button" onClick={close} className="p-1 rounded hover:bg-surface-hover text-text-tertiary">
              <X className="size-4" />
            </button>
          </div>

          <div className="p-5 space-y-4">
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Issue title"
              className="w-full bg-transparent text-base text-text-primary placeholder:text-text-tertiary outline-none font-medium"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add description..."
              rows={3}
              className="w-full bg-transparent text-sm text-text-secondary placeholder:text-text-tertiary outline-none resize-none"
            />

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-text-tertiary">Priority</span>
                <select
                  value={priority}
                  onChange={(e) => setPriority(Number(e.target.value))}
                  className="bg-surface-tertiary text-xs text-text-secondary border border-border-primary rounded px-2 py-1.5 outline-none focus:border-accent"
                >
                  {priorities.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>

              {team?.workflow_states && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-text-tertiary">Status</span>
                  <select
                    value={stateId}
                    onChange={(e) => setStateId(e.target.value)}
                    className="bg-surface-tertiary text-xs text-text-secondary border border-border-primary rounded px-2 py-1.5 outline-none focus:border-accent"
                  >
                    <option value="">Default (Backlog)</option>
                    {team.workflow_states.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 px-5 py-3 border-t border-border-primary">
            <button
              type="button"
              onClick={close}
              className="px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary rounded-md hover:bg-surface-hover transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim() || createIssue.isPending}
              className="px-4 py-1.5 text-sm bg-accent text-white rounded-md hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createIssue.isPending ? 'Creating...' : 'Create issue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
