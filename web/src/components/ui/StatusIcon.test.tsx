import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatusBadge } from './StatusIcon'
import type { WorkflowState } from '../../types'

const makeState = (name: string, stateType: string): WorkflowState => ({
  id: '1', name, color: '#ccc', position: 0,
  state_type: stateType as WorkflowState['state_type'],
})

describe('StatusBadge', () => {
  it('renders state name', () => {
    render(<StatusBadge state={makeState('In Progress', 'started')} />)
    expect(screen.getByText('In Progress')).toBeInTheDocument()
  })

  it('renders Backlog state', () => {
    render(<StatusBadge state={makeState('Backlog', 'backlog')} />)
    expect(screen.getByText('Backlog')).toBeInTheDocument()
  })

  it('renders Done state', () => {
    render(<StatusBadge state={makeState('Done', 'completed')} />)
    expect(screen.getByText('Done')).toBeInTheDocument()
  })

  it('renders Cancelled state', () => {
    render(<StatusBadge state={makeState('Cancelled', 'cancelled')} />)
    expect(screen.getByText('Cancelled')).toBeInTheDocument()
  })
})
