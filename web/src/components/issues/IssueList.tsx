import { useMemo } from 'react'
import type { Issue, WorkflowState } from '../../types'
import { IssueRow } from './IssueRow'
import { StatusIcon } from '../ui/StatusIcon'
import { ChevronDown } from 'lucide-react'

interface IssueListProps {
  issues: Issue[]
  groupBy?: 'status' | 'priority' | 'assignee' | 'none'
}

function StatusGroup({ state, issues }: { state: WorkflowState; issues: Issue[] }) {
  return (
    <div>
      <div className="flex items-center gap-2 px-4 py-2 bg-surface-secondary border-b border-border-primary sticky top-0 z-10">
        <StatusIcon state={state} />
        <span className="text-sm font-medium text-text-primary">{state.name}</span>
        <span className="text-xs text-text-tertiary">{issues.length}</span>
        <ChevronDown className="size-3.5 text-text-tertiary ml-auto" />
      </div>
      {issues.map((issue) => (
        <IssueRow key={issue.id} issue={issue} />
      ))}
    </div>
  )
}

const stateOrder = ['backlog', 'unstarted', 'started', 'completed', 'cancelled']

export function IssueList({ issues, groupBy = 'status' }: IssueListProps) {
  const grouped = useMemo(() => {
    if (groupBy !== 'status') return null

    const groups = new Map<string, { state: WorkflowState; issues: Issue[] }>()
    for (const issue of issues) {
      const key = issue.state.id
      if (!groups.has(key)) {
        groups.set(key, { state: issue.state, issues: [] })
      }
      groups.get(key)!.issues.push(issue)
    }

    return [...groups.values()].sort(
      (a, b) => stateOrder.indexOf(a.state.state_type) - stateOrder.indexOf(b.state.state_type)
    )
  }, [issues, groupBy])

  if (issues.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-text-tertiary">
        <Layers className="size-10 mb-3 opacity-50" />
        <p className="text-sm">No issues found</p>
        <p className="text-xs mt-1">Create your first issue with <kbd className="bg-surface-tertiary px-1.5 py-0.5 rounded text-[10px] border border-border-primary">C</kbd></p>
      </div>
    )
  }

  if (grouped) {
    return (
      <div>
        {grouped.map(({ state, issues }) => (
          <StatusGroup key={state.id} state={state} issues={issues} />
        ))}
      </div>
    )
  }

  return (
    <div>
      {issues.map((issue) => (
        <IssueRow key={issue.id} issue={issue} />
      ))}
    </div>
  )
}

function Layers({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  )
}
