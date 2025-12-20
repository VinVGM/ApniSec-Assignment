import { z } from 'zod';
import { ValidationError } from '@/utils/AppError';

export class UserValidator {
  private updateProfileSchema = z.object({
    full_name: z.string().min(2, "Full Name must be at least 2 characters").max(50, "Full Name cannot exceed 50 characters").optional().or(z.literal('')),
    role: z.string().max(50, "Role cannot exceed 50 characters").optional().or(z.literal('')),
    bio: z.string().max(500, "Bio cannot exceed 500 characters").optional().or(z.literal('')),
    location: z.string().max(100, "Location cannot exceed 100 characters").optional().or(z.literal('')),
    status: z.string().max(50, "Status cannot exceed 50 characters").optional().or(z.literal('')),
  });

  validateUpdateProfile(data: any) {
    const result = this.updateProfileSchema.safeParse(data);
    if (!result.success) {
      const errorMessage = result.error.issues.map(issue => issue.message).join(', ');
      throw new ValidationError(errorMessage, result.error.issues);
    }
    return result.data;
  }
}
