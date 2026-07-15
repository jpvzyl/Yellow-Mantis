import { useMemo, useState } from 'react'
import type { Issue, WorkflowState } from '../../types'
import { StatusIcon } from '../ui/StatusIcon'
import { PriorityIcon } from '../ui/PriorityIcon'
import { UserAvatar } from '../ui/UserAvatar'
import { useUIStore } from '../../stores/ui'

const STATE_ORDER: WorkflowState['state_type'][] = ['backlog', 'unstarted', 'started', 'in_review', 'completed', 'cancelled']

const DRAG_ISSUE_KEY = 'application/x-ym-issue-id'

interface IssueBoardProps {
  issues: Issue[]
  workflowStates: WorkflowState[]
  onMoveIssue: (issueId: string, stateId: string) => void
}

function IssueCard({
  issue,
  onDragStart,
  onDragEnd,
  isDragging,
}: {
  issue: Issue
  onDragStart: (e: React.DragEvent) => void
  onDragEnd: () => void
  isDragging: boolean
}) {
  const openDetail = useUIStore((s) => s.openIssueDetail)

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={() => openDetail(issue.id)}
      className={`
        group rounded-lg border border-border-primary bg-surface-primary p-3 cursor-grab active:cursor-grabbing
        hover:border-border-secondary hover:shadow-sm transition-all
        ${isDragging ? 'opacity-50 shadow-lg ring-2 ring-accent' : ''}
      `}
    >
      <div className="flex items-start gap-2">
        <PriorityIcon priority={issue.priority} className="shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <span className="text-xs font-mono text-text-tertiary block">{issue.identifier}</span>
          <p className="text-sm text-text-primary font-medium truncate">{issue.title}</p>
          {issue.labels.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {issue.labels.slice(0, 3).map((label) => (
                <span
                  key={label.id}
                  className="text-[10px] px-1.5 py-0.5 rounded border"
                  style={{ borderColor: label.color, color: label.color }}
                >
                  {label.name}
                </span>
              ))}
              {issue.labels.length > 3 && (
                <span className="text-[10px] text-text-tertiary">+{issue.labels.length - 3}</span>
              )}
            </div>
          )}
        </div>
        <UserAvatar user={issue.assignee} size="xs" />
      </div>
    </div>
  )
}

function BoardColumn({
  state,
  issues,
  onDrop,
  onDragStart,
  onDragEnd,
  draggingIssueId,
}: {
  state: WorkflowState
  issues: Issue[]
  onDrop: (stateId: string, issueId: string) => void
  onDragStart: (issueId: string) => void
  onDragEnd: () => void
  draggingIssueId: string | null
}) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const issueId = e.dataTransfer.getData(DRAG_ISSUE_KEY)
    if (issueId) onDrop(state.id, issueId)
  }

  return (
    <div
      className="flex-shrink-0 w-72 flex flex-col rounded-lg border border-border-primary bg-surface-secondary/50"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border-primary">
        <StatusIcon state={state} />
        <span className="text-sm font-medium text-text-primary">{state.name}</span>
        <span className="text-xs text-text-tertiary ml-auto">{issues.length}</span>
      </div>
      <div className="flex-1 min-h-[120px] p-2 space-y-2 overflow-y-auto">
        {issues.map((issue) => (
          <IssueCard
            key={issue.id}
            issue={issue}
            isDragging={draggingIssueId === issue.id}
            onDragStart={(e) => {
              e.dataTransfer.setData(DRAG_ISSUE_KEY, issue.id)
              e.dataTransfer.effectAllowed = 'move'
              onDragStart(issue.id)
            }}
            onDragEnd={onDragEnd}
          />
        ))}
      </div>
    </div>
  )
}

export function IssueBoard({ issues, workflowStates, onMoveIssue }: IssueBoardProps) {
  const [draggingId, setDraggingId] = useState<string | null>(null)

  const columns = useMemo(() => {
    const byState = new Map<string, Issue[]>()
    for (const issue of issues) {
      const key = issue.state.id
      if (!byState.has(key)) byState.set(key, [])
      byState.get(key)!.push(issue)
    }
    const ordered = STATE_ORDER.map((type) => workflowStates.find((s) => s.state_type === type)).filter(Boolean) as WorkflowState[]
    return ordered.map((state) => ({
      state,
      issues: (byState.get(state.id) || []).sort((a, b) => a.sort_order - b.sort_order),
    }))
  }, [issues, workflowStates])

  const handleDragEnd = () => setDraggingId(null)

  const handleDrop = (stateId: string, issueId: string) => {
    onMoveIssue(issueId, stateId)
    setDraggingId(null)
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 h-full">
      {columns.map(({ state, issues: colIssues }) => (
        <BoardColumn
          key={state.id}
          state={state}
          issues={colIssues}
          draggingIssueId={draggingId}
          onDragStart={(id) => setDraggingId(id)}
          onDragEnd={handleDragEnd}
          onDrop={handleDrop}
        />
      ))}
    </div>
  )
}
