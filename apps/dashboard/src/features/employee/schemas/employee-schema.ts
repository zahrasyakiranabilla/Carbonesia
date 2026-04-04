import * as z from "zod"

/**
 * Zod schema for employee form validation
 */

const baseEmployeeSchema = z.object({
  name: z
    .string()
    .min(1, "Nama wajib diisi")
    .min(3, "Nama minimal 3 karakter")
    .max(100, "Nama maksimal 100 karakter"),
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
})

/**
 * Create employee schema - password is required
 */
export const createEmployeeSchema = baseEmployeeSchema.extend({
  password: z
    .string()
    .min(1, "Password wajib diisi")
    .min(8, "Password minimal 8 karakter"),
})

export type CreateEmployeeFormValues = z.infer<typeof createEmployeeSchema>

/**
 * Update employee schema - password is not used in update
 */
export const updateEmployeeSchema = baseEmployeeSchema.extend({
  password: z.string(),
})

export type UpdateEmployeeFormValues = z.infer<typeof updateEmployeeSchema>
