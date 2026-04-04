/**
 * Suspense-enabled hook for fetching a single employee
 */

import { useSuspenseQuery } from "@tanstack/react-query"

import { getEmployee } from "../api/employee-api"

export function useSuspenseEmployee(id: string) {
  const query = useSuspenseQuery({
    queryKey: ["employee", id],
    queryFn: () => getEmployee(id),
    staleTime: 60000, // 1 minute
  })

  return {
    employee: query.data,
    refetch: query.refetch,
  }
}
