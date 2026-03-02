import { useTeams } from '../api/hooks'
import { Link } from 'react-router-dom'
import { Layers, ArrowRight } from 'lucide-react'

export function DashboardPage() {
  const { data: teams, isLoading } = useTeams()

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-text-primary">Welcome to Yellow Mantis</h1>
        <p className="text-sm text-text-secondary mt-1">Your project management workspace</p>
      </div>

      <div className="space-y-3">
        <h2 className="text-xs font-medium text-text-tertiary uppercase tracking-wider">Your teams</h2>

        {isLoading ? (
          <div className="text-sm text-text-tertiary">Loading...</div>
        ) : teams?.length === 0 ? (
          <div className="bg-surface-secondary border border-border-primary rounded-lg p-6 text-center">
            <p className="text-sm text-text-secondary">No teams yet. Create your first team to get started.</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {teams?.map((team) => (
              <Link
                key={team.id}
                to={`/team/${team.identifier}/issues`}
                className="group flex items-center gap-4 bg-surface-secondary border border-border-primary rounded-lg p-4 hover:border-border-secondary transition-colors"
              >
                <div className="size-10 rounded-lg flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: team.color }}>
                  {team.identifier}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-text-primary">{team.name}</h3>
                  <p className="text-xs text-text-tertiary">{team.issue_count} issues</p>
                </div>
                <ArrowRight className="size-4 text-text-tertiary group-hover:text-text-secondary transition-colors" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
