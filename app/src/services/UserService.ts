import { UserRepository } from '../repositories/UserRepository';
import { User } from '../models/User';
import { UserValidator } from '@/validators/UserValidator';
import { NotFoundError } from '@/utils/AppError';

import { EmailService } from './EmailService';

export class UserService {
  private userRepository: UserRepository;
  private validator: UserValidator;
  private emailService: EmailService;

  constructor() {
    this.userRepository = new UserRepository();
    this.validator = new UserValidator();
    this.emailService = new EmailService();
  }

  async getProfile(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async updateProfile(userId: string, data: any): Promise<User> {
    // Validate input using Validator Class
    const validated = this.validator.validateUpdateProfile(data);

    // Update user
    const updatedUser = await this.userRepository.update(userId, validated);
    if (!updatedUser) {
      throw new NotFoundError('User not found or update failed');
    }

    // Send Notification Email
    try {
        const name = updatedUser.full_name || updatedUser.email.split('@')[0];
        await this.emailService.sendProfileUpdatedEmail(updatedUser.email, name);
    } catch(e) { console.error("Failed to send profile update email", e); }

    return updatedUser;
  }
}
