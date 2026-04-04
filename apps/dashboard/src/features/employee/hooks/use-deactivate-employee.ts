/**
 * Hook for deactivating an employee
 */

import { useMutation, useQueryClient } from "@tanstack/react-query"

import { deactivateEmployee } from "../api/employee-api"

export function useDeactivateEmployee() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deactivateEmployee(id),
    onSuccess: () => {
      // Invalidate employees list
      queryClient.invalidateQueries({ queryKey: ["employees"] })
    },
  })
}
