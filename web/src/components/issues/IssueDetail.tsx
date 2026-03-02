import { X, MoreHorizontal } from 'lucide-react'
import { useIssue, useUpdateIssue, useTeam } from '../../api/hooks'
import { useUIStore } from '../../stores/ui'
import { PriorityBadge } from '../ui/PriorityIcon'
import { StatusIcon, StatusBadge } from '../ui/StatusIcon'
import { UserAvatar } from '../ui/UserAvatar'

export function IssueDetail({ teamId }: { teamId: string }) {
  const issueId = useUIStore((s) => s.selectedIssueId)
  const isOpen = useUIStore((s) => s.issueDetailOpen)
  const close = useUIStore((s) => s.closeIssueDetail)
  const { data: issue, isLoading } = useIssue(teamId, issueId || '')
  const { data: team } = useTeam(teamId)
  const updateIssue = useUpdateIssue(teamId)

  if (!isOpen || !issueId) return null

  return (
    <div className="fixed inset-y-0 right-0 w-[580px] bg-surface-secondary border-l border-border-primary shadow-2xl z-40 flex flex-col">
      {/* Header */}
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
          <button className="p-1.5 rounded hover:bg-surface-hover text-text-tertiary hover:text-text-primary transition-colors">
            <MoreHorizontal className="size-4" />
          </button>
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
          {/* Title */}
          <div className="px-5 pt-5 pb-3">
            <h1 className="text-lg font-semibold text-text-primary leading-tight">{issue.title}</h1>
          </div>

          {/* Properties */}
          <div className="px-5 py-3 border-b border-border-primary space-y-3">
            <div className="flex items-center gap-4">
              <span className="text-xs text-text-tertiary w-20">Status</span>
              <div className="flex items-center gap-2">
                <StatusBadge state={issue.state} />
                {team?.workflow_states && (
                  <select
                    value={issue.state.id}
                    onChange={(e) => updateIssue.mutate({ id: issue.id, state_id: e.target.value } as any)}
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
              <PriorityBadge priority={issue.priority} />
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs text-text-tertiary w-20">Assignee</span>
              <div className="flex items-center gap-2">
                <UserAvatar user={issue.assignee} size="xs" />
                <span className="text-xs text-text-secondary">{issue.assignee?.display_name || 'Unassigned'}</span>
              </div>
            </div>

            {issue.labels.length > 0 && (
              <div className="flex items-center gap-4">
                <span className="text-xs text-text-tertiary w-20">Labels</span>
                <div className="flex flex-wrap gap-1">
                  {issue.labels.map((label) => (
                    <span
                      key={label.id}
                      className="text-[11px] px-2 py-0.5 rounded-full border"
                      style={{ borderColor: label.color, color: label.color }}
                    >
                      {label.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

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

          {/* Description */}
          <div className="px-5 py-4">
            <h3 className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-2">Description</h3>
            {issue.description ? (
              <div className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">{issue.description}</div>
            ) : (
              <p className="text-sm text-text-tertiary italic">No description</p>
            )}
          </div>

          {/* Sub-issues */}
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
