import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email().default('matiss.aprups+12345@gmail.com'),
    password: z.string().min(1, {message: 'Password is required'}).default('12345'),
});

export type FormSchema = typeof loginSchema;