import { Inbox } from 'lucide-react'

export function InboxPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="rounded-full bg-surface-secondary border border-border-primary p-6 mb-4">
        <Inbox className="size-12 text-text-tertiary" />
      </div>
      <h1 className="text-lg font-semibold text-text-primary mb-1">Inbox</h1>
      <p className="text-sm text-text-secondary max-w-sm">
        Notifications and updates will appear here when you’re assigned to issues, mentioned in comments, or when there are other updates.
      </p>
      <p className="text-xs text-text-tertiary mt-4">No notifications yet</p>
    </div>
  )
}
