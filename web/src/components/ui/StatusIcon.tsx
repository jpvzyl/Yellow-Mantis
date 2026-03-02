import { clsx } from 'clsx'
import type { WorkflowState } from '../../types'

const typeStyles: Record<string, string> = {
  backlog: 'border-dashed border-status-backlog',
  unstarted: 'border-solid border-status-todo',
  started: 'border-solid border-status-in-progress bg-status-in-progress/20',
  completed: 'border-solid border-status-done bg-status-done/20',
  cancelled: 'border-solid border-status-cancelled bg-status-cancelled/20',
}

export function StatusIcon({ state, className }: { state: WorkflowState; className?: string }) {
  if (state.state_type === 'completed') {
    return (
      <div className={clsx('size-4 rounded-full border-2 flex items-center justify-center', typeStyles[state.state_type], className)}>
        <svg className="size-2.5 text-status-done" viewBox="0 0 12 12" fill="none">
          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    )
  }

  if (state.state_type === 'cancelled') {
    return (
      <div className={clsx('size-4 rounded-full border-2 flex items-center justify-center', typeStyles[state.state_type], className)}>
        <svg className="size-2.5 text-status-cancelled" viewBox="0 0 12 12" fill="none">
          <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    )
  }

  if (state.state_type === 'started') {
    return (
      <div className={clsx('size-4 rounded-full border-2 relative overflow-hidden', typeStyles[state.state_type], className)}>
        <div className="absolute inset-0 bg-status-in-progress/40" style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }} />
      </div>
    )
  }

  return <div className={clsx('size-4 rounded-full border-2', typeStyles[state.state_type] || typeStyles.backlog, className)} />
}

export function StatusBadge({ state }: { state: WorkflowState }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-text-secondary">
      <StatusIcon state={state} />
      {state.name}
    </span>
  )
}
