import { z } from 'zod';
import { ValidationError } from '@/utils/AppError';

export class AuthValidator {
  private registerSchema = z.object({
    email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters long"),
  });

  private loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
  });

  validateRegister(data: any) {
    const result = this.registerSchema.safeParse(data);
    if (!result.success) {
      const errorMessage = result.error.issues.map(issue => issue.message).join(', ');
      throw new ValidationError(errorMessage, result.error.issues);
    }
    return result.data;
  }

  validateLogin(data: any) {
    const result = this.loginSchema.safeParse(data);
    if (!result.success) {
      const errorMessage = result.error.issues.map(issue => issue.message).join(', ');
      throw new ValidationError(errorMessage, result.error.issues);
    }
    return result.data;
  }
}
