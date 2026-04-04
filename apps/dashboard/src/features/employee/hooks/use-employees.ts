/**
 * Hook for fetching employees with filters and pagination
 */

import { useQuery } from "@tanstack/react-query"

import { getEmployees } from "../api/employee-api"
import type { EmployeeFilters } from "../types"

export function useEmployees(filters: EmployeeFilters = {}) {
  const query = useQuery({
    queryKey: ["employees", filters],
    queryFn: () => getEmployees(filters),
    staleTime: 30000, // 30 seconds
  })

  return {
    employees: query.data?.data ?? [],
    meta: query.data?.meta,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  }
}
