import { useProjects } from '../api/hooks'
import { Map, Calendar } from 'lucide-react'

export function RoadmapPage() {
  const { data: projects, isLoading } = useProjects()

  const withDates = (projects ?? []).filter((p) => p.start_date || p.target_date)
  const sorted = [...withDates].sort((a, b) => {
    const aEnd = a.target_date ? new Date(a.target_date).getTime() : 0
    const bEnd = b.target_date ? new Date(b.target_date).getTime() : 0
    return aEnd - bEnd
  })

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-border-primary">
        <h1 className="text-lg font-semibold text-text-primary flex items-center gap-2">
          <Map className="size-5" />
          Roadmap
        </h1>
        <p className="text-sm text-text-secondary mt-0.5">
          Project timelines and progress
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {isLoading ? (
          <div className="text-sm text-text-tertiary">Loading...</div>
        ) : sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-text-tertiary">
            <Calendar className="size-12 mb-3 opacity-50" />
            <p className="text-sm">No projects with dates yet</p>
            <p className="text-xs mt-1">Add start or target dates to projects to see them on the roadmap</p>
          </div>
        ) : (
          <div className="space-y-6">
            {sorted.map((project) => {
              const start = project.start_date ? new Date(project.start_date) : null
              const end = project.target_date ? new Date(project.target_date) : null
              return (
                <div
                  key={project.id}
                  className="rounded-lg border border-border-primary bg-surface-secondary p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="size-3 rounded-full shrink-0"
                        style={{ backgroundColor: project.color || '#6366f1' }}
                      />
                      <h3 className="text-sm font-medium text-text-primary">{project.name}</h3>
                    </div>
                    <span className="text-xs text-text-tertiary">{project.progress ?? 0}% complete</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    {start && (
                      <span>
                        <Calendar className="size-3 inline mr-1" />
                        {start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    )}
                    {start && end && <span>→</span>}
                    {end && (
                      <span>
                        {end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-surface-tertiary overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all"
                      style={{ width: `${Math.min(100, project.progress ?? 0)}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
