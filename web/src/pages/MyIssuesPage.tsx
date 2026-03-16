import { useQueries } from '@tanstack/react-query'
import { useMe, useTeams } from '../api/hooks'
import { api } from '../api/client'
import { useUIStore } from '../stores/ui'
import type { Issue } from '../types'
import { IssueRow } from '../components/issues/IssueRow'
import { IssueDetail } from '../components/issues/IssueDetail'
import { User, Layers } from 'lucide-react'

export function MyIssuesPage() {
  const { data: meData } = useMe()
  const { data: teams } = useTeams()
  const userId = meData?.user?.id
  const slug = api.getWorkspaceSlug()

  const issueQueries = useQueries({
    queries: (teams || []).map((team) => ({
      queryKey: ['issues', team.identifier, 'assignee', userId] as const,
      queryFn: () =>
        api.get<Issue[]>(`/${slug}/teams/${team.identifier}/issues?assignee_id=${userId}`),
      enabled: !!slug && !!userId,
    })),
  })

  const allIssues = issueQueries.flatMap((q) => q.data ?? [])
  const isLoading = issueQueries.some((q) => q.isLoading)
  const selectedIssueId = useUIStore((s) => s.selectedIssueId)
  const selectedIssue = allIssues.find((i) => i.id === selectedIssueId)
  const detailTeamId = selectedIssue?.team?.identifier ?? teams?.[0]?.identifier ?? ''

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-border-primary">
        <h1 className="text-lg font-semibold text-text-primary flex items-center gap-2">
          <User className="size-5" />
          My Issues
        </h1>
        <p className="text-sm text-text-secondary mt-0.5">
          Issues assigned to you across all teams
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-20 text-text-tertiary text-sm">Loading...</div>
        ) : allIssues.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-text-tertiary">
            <Layers className="size-12 mb-3 opacity-50" />
            <p className="text-sm">No issues assigned to you</p>
            <p className="text-xs mt-1">Issues you’re assigned to will appear here</p>
          </div>
        ) : (
          <div>
            {allIssues.map((issue) => (
              <div key={issue.id} className="border-b border-border-primary">
                <IssueRow issue={issue} />
              </div>
            ))}
          </div>
        )}
      </div>

      {detailTeamId && <IssueDetail teamId={detailTeamId} />}
    </div>
  )
}
