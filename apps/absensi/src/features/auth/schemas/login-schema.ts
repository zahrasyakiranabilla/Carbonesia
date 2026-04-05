import * as z from "zod"

/**
 * Zod schema for login form validation
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
  password: z.string().min(1, "Kata sandi wajib diisi"),
})

export type LoginFormValues = z.infer<typeof loginSchema>
