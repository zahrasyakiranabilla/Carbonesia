/**
 * Hook for activating an employee
 */

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { activateEmployee } from "../api/employee-api"

export function useActivateEmployee() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => activateEmployee(id),
    onSuccess: () => {
      // Invalidate employees list
      queryClient.invalidateQueries({ queryKey: ["employees"] })
    },
  })
}