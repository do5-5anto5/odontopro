'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

/**
 * A React context provider for @tanstack/react-query's QueryClient.
 * 
 * @example
 * <QueryClientContext>
 *   <App />
 * </QueryClientContext>
 * 
 * @see https://tanstack.github.io/docs/react-query/v4/guides/providers#_using-a-react-context-provider
 */
export function QueryClientContext({
  children,
}: {
  children: React.ReactNode
}) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
