import { clsx } from 'clsx'
import type { Issue } from '../../types'
import { PriorityIcon } from '../ui/PriorityIcon'
import { StatusIcon } from '../ui/StatusIcon'
import { UserAvatar } from '../ui/UserAvatar'
import { useUIStore } from '../../stores/ui'

export function IssueRow({ issue }: { issue: Issue }) {
  const openDetail = useUIStore((s) => s.openIssueDetail)
  const selectedIds = useUIStore((s) => s.selectedIssueIds)
  const toggleSelection = useUIStore((s) => s.toggleIssueSelection)
  const isSelected = selectedIds.has(issue.id)

  return (
    <div
      className={clsx(
        'group flex items-center gap-3 px-4 py-2 border-b border-border-primary hover:bg-surface-hover transition-colors cursor-pointer',
        isSelected && 'bg-accent/10'
      )}
      onClick={() => openDetail(issue.id)}
    >
      <button
        onClick={(e) => {
          e.stopPropagation()
          toggleSelection(issue.id)
        }}
        className={clsx(
          'size-4 rounded border flex items-center justify-center shrink-0 transition-colors',
          isSelected
            ? 'bg-accent border-accent text-white'
            : 'border-border-secondary opacity-0 group-hover:opacity-100'
        )}
      >
        {isSelected && (
          <svg className="size-2.5" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <PriorityIcon priority={issue.priority} />
      <StatusIcon state={issue.state} />

      <span className="text-xs text-text-tertiary font-mono w-16 shrink-0">{issue.identifier}</span>
      <span className="text-sm text-text-primary truncate flex-1">{issue.title}</span>

      {issue.labels.map((label) => (
        <span
          key={label.id}
          className="text-[11px] px-1.5 py-0.5 rounded-full border shrink-0"
          style={{ borderColor: label.color, color: label.color }}
        >
          {label.name}
        </span>
      ))}

      {issue.due_date && (
        <span className="text-xs text-text-tertiary shrink-0">
          {new Date(issue.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
      )}

      <UserAvatar user={issue.assignee} size="xs" />
    </div>
  )
}
