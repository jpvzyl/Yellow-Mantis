import { clsx } from 'clsx'
import type { User } from '../../types'

export function UserAvatar({ user, size = 'sm' }: { user: User | null; size?: 'xs' | 'sm' | 'md' }) {
  const sizes = { xs: 'size-5 text-[10px]', sm: 'size-6 text-xs', md: 'size-8 text-sm' }

  if (!user) {
    return (
      <div className={clsx('rounded-full bg-surface-tertiary border border-border-primary flex items-center justify-center text-text-tertiary', sizes[size])}>
        ?
      </div>
    )
  }

  if (user.avatar_url) {
    return <img src={user.avatar_url} alt={user.display_name} className={clsx('rounded-full object-cover', sizes[size])} />
  }

  const initials = user.display_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  const colors = ['bg-indigo-600', 'bg-pink-600', 'bg-emerald-600', 'bg-amber-600', 'bg-cyan-600', 'bg-purple-600']
  const colorIndex = user.name.charCodeAt(0) % colors.length

  return (
    <div className={clsx('rounded-full flex items-center justify-center text-white font-medium', sizes[size], colors[colorIndex])}>
      {initials}
    </div>
  )
}
