import z from "zod"

export const clientDetailsSchema = z.object({
  name: z.string().min(5, "Required"),
  email: z
    .string()
    .min(5, "Required")
    .email({ message: "Must be valid email address" }),
})
