import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PriorityBadge } from './PriorityIcon'

describe('PriorityBadge', () => {
  it('renders Urgent label for priority 1', () => {
    render(<PriorityBadge priority={1} />)
    expect(screen.getByText('Urgent')).toBeInTheDocument()
  })

  it('renders High label for priority 2', () => {
    render(<PriorityBadge priority={2} />)
    expect(screen.getByText('High')).toBeInTheDocument()
  })

  it('renders Medium label for priority 3', () => {
    render(<PriorityBadge priority={3} />)
    expect(screen.getByText('Medium')).toBeInTheDocument()
  })

  it('renders Low label for priority 4', () => {
    render(<PriorityBadge priority={4} />)
    expect(screen.getByText('Low')).toBeInTheDocument()
  })

  it('renders No priority for priority 0', () => {
    render(<PriorityBadge priority={0} />)
    expect(screen.getByText('No priority')).toBeInTheDocument()
  })
})
