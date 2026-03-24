import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { IssueBoard } from './IssueBoard'
import { mockIssue, mockWorkflowStates } from '../../test/fixtures'

describe('IssueBoard', () => {
  const issues = [
    mockIssue({ id: 'i1', title: 'Issue One', state: mockWorkflowStates[0] }),
    mockIssue({ id: 'i2', title: 'Issue Two', state: mockWorkflowStates[2] }),
  ]
  const onMoveIssue = vi.fn()

  beforeEach(() => {
    onMoveIssue.mockClear()
  })

  it('renders columns for each workflow state', () => {
    render(
      <IssueBoard
        issues={issues}
        workflowStates={mockWorkflowStates}
        onMoveIssue={onMoveIssue}
      />
    )
    expect(screen.getByText('Backlog')).toBeInTheDocument()
    expect(screen.getByText('Todo')).toBeInTheDocument()
    expect(screen.getByText('In Progress')).toBeInTheDocument()
    expect(screen.getByText('Done')).toBeInTheDocument()
    expect(screen.getByText('Cancelled')).toBeInTheDocument()
  })

  it('renders issue cards in correct columns', () => {
    render(
      <IssueBoard
        issues={issues}
        workflowStates={mockWorkflowStates}
        onMoveIssue={onMoveIssue}
      />
    )
    expect(screen.getByText('Issue One')).toBeInTheDocument()
    expect(screen.getByText('Issue Two')).toBeInTheDocument()
    expect(screen.getAllByText('ENG-1').length).toBeGreaterThanOrEqual(1)
  })

  it('calls onMoveIssue when card is dropped on another column', () => {
    render(
      <IssueBoard
        issues={issues}
        workflowStates={mockWorkflowStates}
        onMoveIssue={onMoveIssue}
      />
    )
    const inProgressColumn = screen.getByText('In Progress').closest('div')?.parentElement
    if (!inProgressColumn) throw new Error('Column not found')
    const preventDefault = vi.fn()
    fireEvent.drop(inProgressColumn, {
      dataTransfer: {
        getData: (key: string) => (key === 'application/x-ym-issue-id' ? 'i1' : ''),
        setData: vi.fn(),
        effectAllowed: 'move',
        dropEffect: 'move',
      },
      preventDefault,
    })
    expect(onMoveIssue).toHaveBeenCalledWith('i1', 'state-started')
  })

  it('sets drag data on drag start', () => {
    const setData = vi.fn()
    render(
      <IssueBoard
        issues={issues}
        workflowStates={mockWorkflowStates}
        onMoveIssue={onMoveIssue}
      />
    )
    const card = screen.getByText('Issue One').closest('[draggable="true"]')
    if (!card) throw new Error('Card not found')
    fireEvent.dragStart(card, {
      dataTransfer: { setData, effectAllowed: '' },
    })
    expect(setData).toHaveBeenCalledWith('application/x-ym-issue-id', 'i1')
  })
})
