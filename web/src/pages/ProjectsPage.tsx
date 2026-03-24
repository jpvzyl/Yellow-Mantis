import { useState } from 'react'
import { useProjects, useCreateProject } from '../api/hooks'
import { LayoutGrid, Calendar, User, Plus } from 'lucide-react'
import { clsx } from 'clsx'

const PROJECT_COLORS = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#8b5cf6', '#06b6d4']

function CreateProjectDialog({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [color, setColor] = useState(PROJECT_COLORS[0])
  const [targetDate, setTargetDate] = useState('')
  const createProject = useCreateProject()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createProject.mutateAsync({
        name,
        description: description || undefined,
        color,
        target_date: targetDate || undefined,
      })
      onClose()
    } catch {
      // error handled by mutation
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-surface-secondary border border-border-primary rounded-xl p-6 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Create Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {createProject.isError && (
            <div className="text-sm text-priority-urgent bg-priority-urgent/10 border border-priority-urgent/20 rounded-lg px-3 py-2">
              {(createProject.error as Error).message}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Project Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-surface-tertiary border border-border-primary rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-accent transition-colors"
              placeholder="e.g. Q2 Launch"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full bg-surface-tertiary border border-border-primary rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-accent transition-colors resize-none"
              placeholder="Brief description..."
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Target Date</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full bg-surface-tertiary border border-border-primary rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-accent transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Color</label>
            <div className="flex gap-2">
              {PROJECT_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={clsx(
                    'size-8 rounded-lg transition-all',
                    color === c ? 'ring-2 ring-offset-2 ring-offset-surface-secondary ring-accent scale-110' : 'hover:scale-105'
                  )}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary rounded-lg hover:bg-surface-hover transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createProject.isPending || !name}
              className="px-4 py-2 text-sm font-medium text-white bg-accent rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50"
            >
              {createProject.isPending ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export function ProjectsPage() {
  const { data: projects, isLoading } = useProjects()
  const [showCreate, setShowCreate] = useState(false)

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-border-primary flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-text-primary flex items-center gap-2">
            <LayoutGrid className="size-5" />
            Projects
          </h1>
          <p className="text-sm text-text-secondary mt-0.5">
            All projects in this workspace
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-accent rounded-lg hover:bg-accent-hover transition-colors"
        >
          <Plus className="size-3.5" />
          New Project
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {isLoading ? (
          <div className="text-sm text-text-tertiary">Loading...</div>
        ) : !projects?.length ? (
          <div className="flex flex-col items-center justify-center py-20 text-text-tertiary">
            <LayoutGrid className="size-12 mb-3 opacity-50" />
            <p className="text-sm mb-3">No projects yet</p>
            <button
              onClick={() => setShowCreate(true)}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-accent rounded-lg hover:bg-accent-hover transition-colors"
            >
              <Plus className="size-3.5" />
              Create your first project
            </button>
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

      {showCreate && <CreateProjectDialog onClose={() => setShowCreate(false)} />}
    </div>
  )
}
