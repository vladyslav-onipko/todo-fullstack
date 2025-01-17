import { z } from 'zod';

export const userSigninValidationSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).nonempty('Email is required').email('Invalid email address'),
  password: z
    .string({ required_error: 'Password is required' })
    .nonempty('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});

export const userSignupValidationSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).nonempty('Name is required'),
  email: z.string({ required_error: 'Email is required' }).nonempty('Email is required').email('Invalid email address'),
  password: z
    .string({ required_error: 'Password is required' })
    .nonempty('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});

export const todoListValidationSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .nonempty('Name is required')
    .min(3, 'Name must be at least 3 characters long'),
});
