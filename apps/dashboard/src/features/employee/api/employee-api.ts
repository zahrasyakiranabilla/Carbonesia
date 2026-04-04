/**
 * Employee API Client
 * API methods for employee management
 */

import { api } from "@/features/auth/api/api-client"
import type { PaginatedResponse } from "@/types"

import type {
  CreateEmployeeRequest,
  CreateEmployeeResponse,
  Employee,
  EmployeeFilters,
  ResetPasswordResponse,
  UpdateEmployeeRequest,
} from "../types"

const ADMIN_USERS_PATH = "/v1/admin/users"

export async function getEmployees(
  filters: EmployeeFilters = {}
): Promise<PaginatedResponse<Employee>> {
  const params = new URLSearchParams()

  if (filters.search) params.append("search", filters.search)
  if (filters.page) params.append("page", String(filters.page))
  if (filters.limit) params.append("limit", String(filters.limit))

  const queryString = params.toString()
  const path = queryString
    ? `${ADMIN_USERS_PATH}?${queryString}`
    : ADMIN_USERS_PATH

  return api.get<PaginatedResponse<Employee>>(path)
}

export async function getEmployee(id: string): Promise<Employee> {
  return api.get<Employee>(`${ADMIN_USERS_PATH}/${id}`)
}

export async function createEmployee(
  data: CreateEmployeeRequest
): Promise<CreateEmployeeResponse> {
  return api.post<CreateEmployeeResponse>(ADMIN_USERS_PATH, data)
}

export async function updateEmployee(
  id: string,
  data: UpdateEmployeeRequest
): Promise<Employee> {
  return api.put<Employee>(`${ADMIN_USERS_PATH}/${id}`, data)
}

export async function activateEmployee(id: string): Promise<Employee> {
  return api.patch<Employee>(`${ADMIN_USERS_PATH}/${id}/activate`, {})
}

export async function deactivateEmployee(id: string): Promise<Employee> {
  return api.patch<Employee>(`${ADMIN_USERS_PATH}/${id}/deactivate`, {})
}

export async function resetPassword(
  id: string
): Promise<ResetPasswordResponse> {
  return api.post<ResetPasswordResponse>(
    `${ADMIN_USERS_PATH}/${id}/reset-password`,
    {}
  )
}
