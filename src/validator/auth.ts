import { z } from 'zod';

export const signUpSchema = z
  .object({
    email: z
      .string({
        required_error: 'Email is required!',
      })
      .email('This is not valid email')
      .trim(),
    firstName: z
      .string({
        required_error: 'First name is required!',
      })
      .trim(),
    lastName: z.string({ required_error: 'Last name is required!' }).trim(),
    password: z.string({ required_error: 'Password is required!' }).trim(),
    passwordConfirm: z
      .string({ required_error: 'Password confirm is required!' })
      .trim(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ['passwordConfirm'],
  });
