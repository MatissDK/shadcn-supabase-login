import { z } from "zod";

export const forgotPasswordSchema = z.object({
    email: z.string().email('Email is required').default('matiss.aprups+122223@gmail.com'),
});

export type FormSchema = typeof forgotPasswordSchema;