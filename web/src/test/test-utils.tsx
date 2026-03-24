import React from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'

const defaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
})

interface WrapperProps {
  children: React.ReactNode
  initialEntries?: string[]
  queryClient?: QueryClient
}

function AllProviders({ children, initialEntries = ['/'], queryClient = defaultQueryClient }: WrapperProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={initialEntries}>
        {children}
      </MemoryRouter>
    </QueryClientProvider>
  )
}

export function renderWithProviders(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & {
    initialEntries?: string[]
    queryClient?: QueryClient
  }
) {
  const { initialEntries, queryClient, ...renderOptions } = options ?? {}
  return render(ui, {
    wrapper: ({ children }) => (
      <AllProviders initialEntries={initialEntries} queryClient={queryClient}>
        {children}
      </AllProviders>
    ),
    ...renderOptions,
  })
}

export function createWrapper(initialEntries: string[] = ['/'], queryClient?: QueryClient) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <AllProviders initialEntries={initialEntries} queryClient={queryClient}>
        {children}
      </AllProviders>
    )
  }
}

export * from '@testing-library/react'
