import { z } from "zod";

export const registerSchema = z.object({
    email: z.string().email().default('asdas@gmail.com'),
    password: z.string().min(1, {message: 'Password is required'}).default('1234567'),
});

export type FormSchema = typeof registerSchema;