import { useProjects } from '../api/hooks'
import { LayoutGrid, Calendar, User } from 'lucide-react'

export function ProjectsPage() {
  const { data: projects, isLoading } = useProjects()

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-border-primary">
        <h1 className="text-lg font-semibold text-text-primary flex items-center gap-2">
          <LayoutGrid className="size-5" />
          Projects
        </h1>
        <p className="text-sm text-text-secondary mt-0.5">
          All projects in this workspace
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {isLoading ? (
          <div className="text-sm text-text-tertiary">Loading...</div>
        ) : !projects?.length ? (
          <div className="flex flex-col items-center justify-center py-20 text-text-tertiary">
            <LayoutGrid className="size-12 mb-3 opacity-50" />
            <p className="text-sm">No projects yet</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex items-center gap-4 p-4 rounded-lg border border-border-primary bg-surface-secondary hover:border-border-secondary transition-colors"
              >
                <div
                  className="size-10 rounded-lg flex items-center justify-center text-white text-sm font-bold shrink-0"
                  style={{ backgroundColor: project.color || '#6366f1' }}
                >
                  {project.name[0]?.toUpperCase() ?? 'P'}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-text-primary">{project.name}</h3>
                  {project.description && (
                    <p className="text-xs text-text-tertiary truncate mt-0.5">{project.description}</p>
                  )}
                  <div className="flex items-center gap-3 mt-2 text-xs text-text-tertiary">
                    <span className="flex items-center gap-1">
                      <LayoutGrid className="size-3" />
                      {project.issue_count} issues
                    </span>
                    {project.target_date && (
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        {new Date(project.target_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    )}
                    {project.lead && (
                      <span className="flex items-center gap-1">
                        <User className="size-3" />
                        {project.lead.display_name || project.lead.name}
                      </span>
                    )}
                  </div>
                </div>
                <div className="shrink-0">
                  <div className="w-20 h-2 rounded-full bg-surface-tertiary overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all"
                      style={{ width: `${Math.min(100, project.progress ?? 0)}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-text-tertiary block mt-1 text-right">{project.progress ?? 0}%</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
