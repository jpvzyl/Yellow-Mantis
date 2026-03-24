import type { Issue, WorkflowState, Team, User } from '../types'

export const mockUser: User = {
  id: 'user-1',
  email: 'test@example.com',
  name: 'Test User',
  display_name: 'Test User',
  avatar_url: null,
  timezone: 'UTC',
  theme: 'light',
}

export const mockWorkflowStates: WorkflowState[] = [
  { id: 'state-backlog', name: 'Backlog', color: '#94a3b8', position: 0, state_type: 'backlog' },
  { id: 'state-unstarted', name: 'Todo', color: '#e2e8f0', position: 1, state_type: 'unstarted' },
  { id: 'state-started', name: 'In Progress', color: '#6366f1', position: 2, state_type: 'started' },
  { id: 'state-completed', name: 'Done', color: '#22c55e', position: 3, state_type: 'completed' },
  { id: 'state-cancelled', name: 'Cancelled', color: '#64748b', position: 4, state_type: 'cancelled' },
]

export const mockIssue = (overrides: Partial<Issue> = {}): Issue => ({
  id: 'issue-1',
  identifier: 'ENG-1',
  number: 1,
  title: 'Test issue',
  priority: 2,
  priority_label: 'Medium',
  estimate: null,
  due_date: null,
  sort_order: 0,
  created_at: '2025-01-01T00:00:00Z',
  updated_at: '2025-01-01T00:00:00Z',
  state: mockWorkflowStates[0],
  assignee: null,
  creator: mockUser,
  labels: [],
  project: null,
  team: { id: 'team-1', identifier: 'ENG', name: 'Engineering' },
  sub_issue_count: 0,
  parent_id: null,
  ...overrides,
})

export const mockTeam: Team = {
  id: 'team-1',
  name: 'Engineering',
  identifier: 'ENG',
  description: null,
  icon: null,
  color: '#6366f1',
  issue_count: 2,
  workflow_states: mockWorkflowStates,
}
