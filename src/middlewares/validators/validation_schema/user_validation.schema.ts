import { z } from 'zod';

export const userSchema = z.object({
  fullname: z.string().optional(),
  username: z
    .string()
    .min(6, 'Username must be between 6 and 20 characters')
    .max(20, 'Username must be between 6 and 20 characters')
    .regex(
      /^[a-zA-Z0-9-_.]+$/,
      'Username can only contain letters, numbers, hyphens (-), underscores (_), and dots (.)'
    )
    .optional(),
  email: z.string().email('Email must be a valid email').optional(),
  phone: z
    .string()
    .regex(/^[0-9]+$/, 'Phone number must contain only numbers')
    .min(10, 'Phone number must be between 10 and 13 characters')
    .max(13, 'Phone number must be between 10 and 13 characters')
    .optional(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .refine((password) => /[a-z]/.test(password) && /[A-Z]/.test(password), {
      message:
        'Password must contain at least one lowercase and one uppercase letter'
    })
    .optional(),
  confirm_password: z.string().optional(),
  role: z
    .enum(['ADMIN', 'CUSTOMER'], {
      errorMap: () => ({
        message: "Role must be either 'ADMIN' or 'CUSTOMER'"
      })
    })
    .optional()
});
