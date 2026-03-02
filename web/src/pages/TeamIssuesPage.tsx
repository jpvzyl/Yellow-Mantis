import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Plus, Filter, SortAsc } from 'lucide-react'
import { useIssues, useTeam } from '../api/hooks'
import { IssueList } from '../components/issues/IssueList'
import { IssueDetail } from '../components/issues/IssueDetail'
import { CreateIssueDialog } from '../components/issues/CreateIssueDialog'
import { useUIStore } from '../stores/ui'

export function TeamIssuesPage() {
  const { teamIdentifier } = useParams<{ teamIdentifier: string }>()
  const { data: team } = useTeam(teamIdentifier || '')
  const { data: issues, isLoading } = useIssues(teamIdentifier || '')
  const openCreateIssue = useUIStore((s) => s.openCreateIssue)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === 'c' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        openCreateIssue()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [openCreateIssue])

  return (
    <div className="h-full flex flex-col">
      {/* Page header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-border-primary bg-surface-primary/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="flex items-center gap-3">
          {team && (
            <div className="flex items-center gap-2">
              <div className="size-5 rounded flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: team.color }}>
                {team.identifier[0]}
              </div>
              <h1 className="text-sm font-semibold text-text-primary">{team.name}</h1>
              <span className="text-xs text-text-tertiary">Issues</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-md transition-colors">
            <Filter className="size-3.5" />
            Filter
          </button>
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-md transition-colors">
            <SortAsc className="size-3.5" />
            Sort
          </button>
          <button
            onClick={openCreateIssue}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-accent text-white rounded-md hover:bg-accent-hover transition-colors"
          >
            <Plus className="size-3.5" />
            New issue
          </button>
        </div>
      </div>

      {/* Issue list */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-20 text-text-tertiary text-sm">Loading issues...</div>
        ) : issues ? (
          <IssueList issues={issues} groupBy="status" />
        ) : null}
      </div>

      {/* Panels */}
      {teamIdentifier && <IssueDetail teamId={teamIdentifier} />}
      {teamIdentifier && <CreateIssueDialog teamId={teamIdentifier} />}
    </div>
  )
}
