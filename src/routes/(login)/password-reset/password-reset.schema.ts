import { z } from "zod";

export const resetPasswordSchema = z.object({
    email: z.string().email('Email is required').default('matiss.aprups+122223@gmail.com'),
    password: z.string().min(1, {message: 'Password is required'}).default('12345678'),
});

export type FormSchema = typeof resetPasswordSchema;