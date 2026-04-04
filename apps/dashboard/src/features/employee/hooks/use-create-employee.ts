/**
 * Hook for creating a new employee
 */

import { useMutation, useQueryClient } from "@tanstack/react-query"

import { createEmployee } from "../api/employee-api"
import type { CreateEmployeeRequest } from "../types"

export function useCreateEmployee() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateEmployeeRequest) => createEmployee(data),
    onSuccess: () => {
      // Invalidate employees list
      queryClient.invalidateQueries({ queryKey: ["employees"] })
    },
  })
}
