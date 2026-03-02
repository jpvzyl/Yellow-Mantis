export interface User {
  id: string
  email: string
  name: string
  display_name: string
  avatar_url: string | null
  timezone: string
  theme: string
}

export interface Workspace {
  id: string
  name: string
  slug: string
  logo: string | null
  created_at: string
}

export interface WorkflowState {
  id: string
  name: string
  color: string
  position: number
  state_type: 'backlog' | 'unstarted' | 'started' | 'completed' | 'cancelled'
}

export interface Team {
  id: string
  name: string
  identifier: string
  description: string | null
  icon: string | null
  color: string
  issue_count: number
  workflow_states?: WorkflowState[]
  members?: User[]
}

export interface Label {
  id: string
  name: string
  color: string
  parent_label_id: string | null
}

export interface Issue {
  id: string
  identifier: string
  number: number
  title: string
  description?: string
  priority: number
  priority_label: string
  estimate: number | null
  due_date: string | null
  sort_order: number
  created_at: string
  updated_at: string
  state: WorkflowState
  assignee: User | null
  creator: User
  labels: Label[]
  project: { id: string; name: string; color: string } | null
  team: { id: string; identifier: string; name: string }
  sub_issue_count: number
  parent_id: string | null
  sub_issues?: SubIssue[]
  started_at?: string
  completed_at?: string
  cancelled_at?: string
  cycle?: { id: string; name: string; number: number } | null
  parent?: { id: string; identifier: string; title: string } | null
}

export interface SubIssue {
  id: string
  identifier: string
  title: string
  priority: number
  state: WorkflowState | null
  assignee: User | null
}

export interface Comment {
  id: string
  body: string
  user: User
  edited_at: string | null
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  name: string
  description: string | null
  icon: string | null
  color: string
  status: string
  start_date: string | null
  target_date: string | null
  lead: User | null
  progress: number
  issue_count: number
  created_at: string
  teams?: { id: string; name: string; identifier: string }[]
}

export type Priority = 0 | 1 | 2 | 3 | 4
export type StateType = 'backlog' | 'unstarted' | 'started' | 'completed' | 'cancelled'
