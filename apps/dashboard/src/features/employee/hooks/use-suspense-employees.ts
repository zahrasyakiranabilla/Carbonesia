/**
 * Suspense-enabled hook for fetching employees with filters and pagination
 */

import { useSuspenseQuery } from "@tanstack/react-query"

import { getEmployees } from "../api/employee-api"
import type { EmployeeFilters } from "../types"

export function useSuspenseEmployees(filters: EmployeeFilters = {}) {
  const query = useSuspenseQuery({
    queryKey: ["employees", filters],
    queryFn: () => getEmployees(filters),
    staleTime: 30000, // 30 seconds
  })

  return {
    employees: query.data.data,
    meta: query.data.meta,
    refetch: query.refetch,
  }
}
