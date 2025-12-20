import { z } from 'zod';
import { BadRequestError } from '@/utils/AppError';

export class PostValidator {
  private createSchema = z.object({
    content: z.string()
      .min(1, "Post cannot be empty")
      .max(280, "Post cannot exceed 280 characters"),
  });

  validateCreate(data: any) {
    const result = this.createSchema.safeParse(data);
    if (!result.success) {
      const errorMessage = (result as any).error.errors.map((e: any) => e.message).join(', ');
      throw new BadRequestError(errorMessage);
    }
    return result.data;
  }
}
