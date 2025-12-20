import { z } from 'zod';
import { ValidationError } from '@/utils/AppError';

export class IssueValidator {
  private createSchema = z.object({
    type: z.enum(['Cloud Security', 'Reteam Assessment', 'VAPT'], { 
      message: "Type must be one of: Cloud Security, Reteam Assessment, VAPT" 
    }),
    title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title cannot exceed 100 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    priority: z.enum(['Low', 'Medium', 'High', 'Critical']).optional().default('Low'),
    status: z.enum(['Open', 'In Progress', 'Resolved', 'Closed']).optional().default('Open'),
  });

  private updateSchema = z.object({
    type: z.enum(['Cloud Security', 'Reteam Assessment', 'VAPT']).optional(),
    title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title cannot exceed 100 characters").optional(),
    description: z.string().min(10, "Description must be at least 10 characters").optional(),
    priority: z.enum(['Low', 'Medium', 'High', 'Critical']).optional(),
    status: z.enum(['Open', 'In Progress', 'Resolved', 'Closed']).optional(),
  });

  validateCreate(data: any) {
    const result = this.createSchema.safeParse(data);
    if (!result.success) {
      const errorMessage = result.error.issues.map(issue => issue.message).join(', ');
      throw new ValidationError(errorMessage, result.error.issues);
    }
    return result.data;
  }

  validateUpdate(data: any) {
    const result = this.updateSchema.safeParse(data);
    if (!result.success) {
      const errorMessage = result.error.issues.map(issue => issue.message).join(', ');
      throw new ValidationError(errorMessage, result.error.issues);
    }
    return result.data;
  }
}
