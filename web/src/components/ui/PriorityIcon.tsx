import { AlertTriangle, ArrowUp, ArrowDown, Minus, MoreHorizontal } from 'lucide-react'
import { clsx } from 'clsx'

const config: Record<number, { icon: typeof AlertTriangle; color: string; label: string }> = {
  0: { icon: MoreHorizontal, color: 'text-text-tertiary', label: 'No priority' },
  1: { icon: AlertTriangle, color: 'text-priority-urgent', label: 'Urgent' },
  2: { icon: ArrowUp, color: 'text-priority-high', label: 'High' },
  3: { icon: Minus, color: 'text-priority-medium', label: 'Medium' },
  4: { icon: ArrowDown, color: 'text-priority-low', label: 'Low' },
}

export function PriorityIcon({ priority, className }: { priority: number; className?: string }) {
  const { icon: Icon, color } = config[priority] || config[0]
  return <Icon className={clsx('size-4', color, className)} />
}

export function PriorityBadge({ priority }: { priority: number }) {
  const { icon: Icon, color, label } = config[priority] || config[0]
  return (
    <span className={clsx('inline-flex items-center gap-1 text-xs', color)}>
      <Icon className="size-3.5" />
      {label}
    </span>
  )
}
