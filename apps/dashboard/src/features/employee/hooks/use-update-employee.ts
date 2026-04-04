/**
 * Hook for updating an employee
 */

import { useMutation, useQueryClient } from "@tanstack/react-query"

import { updateEmployee } from "../api/employee-api"
import type { UpdateEmployeeRequest } from "../types"

export function useUpdateEmployee() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEmployeeRequest }) =>
      updateEmployee(id, data),
    onSuccess: (_, variables) => {
      // Invalidate employees list and specific employee
      queryClient.invalidateQueries({ queryKey: ["employees"] })
      queryClient.invalidateQueries({ queryKey: ["employee", variables.id] })
    },
  })
}
