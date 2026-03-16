import { Star } from 'lucide-react'

export function FavoritesPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="rounded-full bg-surface-secondary border border-border-primary p-6 mb-4">
        <Star className="size-12 text-text-tertiary" />
      </div>
      <h1 className="text-lg font-semibold text-text-primary mb-1">Favorites</h1>
      <p className="text-sm text-text-secondary max-w-sm">
        Star issues, projects, or views to quickly find them here.
      </p>
      <p className="text-xs text-text-tertiary mt-4">No favorites yet</p>
    </div>
  )
}
