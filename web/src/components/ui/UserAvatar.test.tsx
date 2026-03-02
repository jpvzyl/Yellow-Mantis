import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { UserAvatar } from './UserAvatar'
import type { User } from '../../types'

const mockUser: User = {
  id: '1', email: 'jp@test.com', name: 'JP van Zyl', display_name: 'JP van Zyl',
  avatar_url: null, timezone: 'UTC', theme: 'dark',
}

describe('UserAvatar', () => {
  it('shows ? for null user', () => {
    render(<UserAvatar user={null} />)
    expect(screen.getByText('?')).toBeInTheDocument()
  })

  it('shows initials for user without avatar', () => {
    render(<UserAvatar user={mockUser} />)
    expect(screen.getByText('JV')).toBeInTheDocument()
  })

  it('shows image for user with avatar_url', () => {
    const withAvatar = { ...mockUser, avatar_url: 'https://example.com/avatar.png' }
    render(<UserAvatar user={withAvatar} />)
    const img = screen.getByAltText('JP van Zyl')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.png')
  })
})
