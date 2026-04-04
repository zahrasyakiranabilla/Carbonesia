/**
 * Employee Types
 * Types for employee management feature
 */

import type { PaginatedFilters } from "@/types"

export interface Employee {
  id: string
  email: string
  name: string
  role: "admin" | "employee"
  active: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateEmployeeRequest {
  email: string
  name: string
  password: string
}

export interface UpdateEmployeeRequest {
  email?: string
  name?: string
}

export interface EmployeeFilters extends PaginatedFilters {
  search?: string
}

export interface CreateEmployeeResponse {
  employee: Employee
  plainPassword?: string
}

export interface ResetPasswordResponse {
  plainPassword: string
}
