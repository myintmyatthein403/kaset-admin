import { z } from "zod";

export const registerSchema = z.object({
  email: z.email('Invalid email address'),
  name: z.string(''),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters long'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'], // This links the error to the confirmPassword field
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
