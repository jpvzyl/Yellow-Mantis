import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ArrowRight } from 'lucide-react'
import { useSearch } from '../../api/hooks'
import { useUIStore } from '../../stores/ui'
import { PriorityIcon } from '../ui/PriorityIcon'
import { StatusIcon } from '../ui/StatusIcon'

export function CommandPalette() {
  const open = useUIStore((s) => s.commandPaletteOpen)
  const close = useUIStore((s) => s.closeCommandPalette)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const { data } = useSearch(query)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        useUIStore.getState().commandPaletteOpen
          ? close()
          : useUIStore.getState().openCommandPalette()
      }
      if (e.key === 'Escape' && open) {
        close()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, close])

  useEffect(() => {
    if (open) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div className="absolute inset-0 bg-black/60" onClick={close} />
      <div className="relative w-full max-w-lg bg-surface-secondary border border-border-primary rounded-xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border-primary">
          <Search className="size-4 text-text-tertiary" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search issues, projects..."
            className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-tertiary outline-none"
          />
          <kbd className="text-[10px] bg-surface-hover text-text-tertiary px-1.5 py-0.5 rounded border border-border-primary">ESC</kbd>
        </div>

        {data && (data.issues.length > 0 || data.projects.length > 0) && (
          <div className="max-h-80 overflow-y-auto p-2">
            {data.issues.length > 0 && (
              <div>
                <div className="px-3 py-1.5 text-xs font-medium text-text-tertiary">Issues</div>
                {data.issues.map((issue) => (
                  <button
                    key={issue.id}
                    onClick={() => {
                      navigate(`/team/${issue.team.identifier}/issues`)
                      close()
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-surface-hover transition-colors text-left"
                  >
                    <PriorityIcon priority={issue.priority} />
                    <StatusIcon state={issue.state} />
                    <span className="text-xs text-text-tertiary font-mono">{issue.identifier}</span>
                    <span className="text-sm text-text-primary truncate">{issue.title}</span>
                    <ArrowRight className="size-3.5 text-text-tertiary ml-auto shrink-0" />
                  </button>
                ))}
              </div>
            )}
            {data.projects.length > 0 && (
              <div>
                <div className="px-3 py-1.5 text-xs font-medium text-text-tertiary">Projects</div>
                {data.projects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => {
                      navigate('/projects')
                      close()
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-surface-hover transition-colors text-left"
                  >
                    <div className="size-4 rounded" style={{ backgroundColor: project.color }} />
                    <span className="text-sm text-text-primary truncate">{project.name}</span>
                    <ArrowRight className="size-3.5 text-text-tertiary ml-auto shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {query.length >= 2 && data && data.issues.length === 0 && data.projects.length === 0 && (
          <div className="p-8 text-center text-sm text-text-tertiary">No results found</div>
        )}

        {query.length < 2 && (
          <div className="p-4 text-center text-xs text-text-tertiary">Type to search issues and projects</div>
        )}
      </div>
    </div>
  )
}
