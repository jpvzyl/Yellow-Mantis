import { describe, it, expect } from 'vitest'
import type { Issue, Priority, StateType, WorkflowState, User, Team, Label, Project } from './index'

describe('Type definitions', () => {
  it('Priority type accepts valid values', () => {
    const priorities: Priority[] = [0, 1, 2, 3, 4]
    expect(priorities).toHaveLength(5)
  })

  it('StateType accepts valid values', () => {
    const states: StateType[] = ['backlog', 'unstarted', 'started', 'completed', 'cancelled']
    expect(states).toHaveLength(5)
  })

  it('Issue shape is correct', () => {
    const issue: Issue = {
      id: '1', identifier: 'ENG-1', number: 1, title: 'Test',
      priority: 2, priority_label: 'High', estimate: null, due_date: null,
      sort_order: 0, created_at: '', updated_at: '',
      state: { id: '1', name: 'Todo', color: '#ccc', position: 0, state_type: 'unstarted' },
      assignee: null,
      creator: { id: '1', email: 'a@b.c', name: 'Test', display_name: 'Test', avatar_url: null, timezone: 'UTC', theme: 'dark' },
      labels: [], project: null,
      team: { id: '1', identifier: 'ENG', name: 'Engineering' },
      sub_issue_count: 0, parent_id: null,
    }
    expect(issue.identifier).toBe('ENG-1')
    expect(issue.priority).toBe(2)
  })
})
