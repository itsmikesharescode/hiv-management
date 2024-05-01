import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email({ message: "Email is required." }),
    password: z.string().min(1, { message: "Must enter a password." })
})