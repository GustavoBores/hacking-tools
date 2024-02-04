import { z } from "zod"

export const loginSchema = z.object({
    password: z.string()
     .min(8, "The password must have at least 8 characters"),
    email: z.string()
     .min(1, "This field email cannot be empty")
     .email("Invalid email")
})

export type LoginSchemaType = z.infer<typeof loginSchema>