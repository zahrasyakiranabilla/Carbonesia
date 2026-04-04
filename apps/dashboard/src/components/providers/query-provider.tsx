"use client"

import * as React from "react"
import { QueryClientProvider } from "@tanstack/react-query"

import { queryClient } from "@/lib/query-client"

interface Props {
  children: React.ReactNode
}

export function QueryProvider({ children }: Props) {
  const [queryClientInstance] = React.useState(() => queryClient)

  return (
    <QueryClientProvider client={queryClientInstance}>
      {children}
    </QueryClientProvider>
  )
}
