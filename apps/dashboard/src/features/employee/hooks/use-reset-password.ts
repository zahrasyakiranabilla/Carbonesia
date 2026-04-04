/**
 * Hook for resetting an employee's password
 */

import { useMutation, useQueryClient } from "@tanstack/react-query"

import { resetPassword as resetPasswordApi } from "../api/employee-api"

export function useResetPassword() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => resetPasswordApi(id),
    onSuccess: () => {
      // Invalidate employees list
      queryClient.invalidateQueries({ queryKey: ["employees"] })
    },
  })
}
