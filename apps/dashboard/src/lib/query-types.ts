export interface ApiError extends Error {
  status?: number
  code?: string
}

export interface QueryOptions<TData = unknown> {
  queryKey: string[]
  enabled?: boolean
  staleTime?: number
  retry?: number | boolean
  onError?: (error: ApiError) => void
  onSuccess?: (data: TData) => void
}

export interface MutationOptions<TData = unknown, TVariables = unknown> {
  onSuccess?: (data: TData, variables: TVariables) => void
  onError?: (error: ApiError, variables: TVariables) => void
  onSettled?: (
    data: TData | undefined,
    error: Error | null,
    variables: TVariables
  ) => void
}

export function createQueryKey(
  scope: string,
  ...resources: string[]
): string[] {
  return [scope, ...resources]
}

export const queryKeys = {
  employees: {
    all: ["employees"] as string[],
    list: (filters?: {
      page?: number
      search?: string
      status?: "active" | "inactive"
    }) => ["employees", "list", filters].filter(Boolean) as string[],
    detail: (id: string) => ["employees", "detail", id],
  },
} as const
