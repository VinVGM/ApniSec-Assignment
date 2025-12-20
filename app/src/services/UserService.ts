import { UserRepository } from '../repositories/UserRepository';
import { User } from '../models/User';
import { UserValidator } from '@/validators/UserValidator';
import { NotFoundError } from '@/utils/AppError';

export class UserService {
  private userRepository: UserRepository;
  private validator: UserValidator;

  constructor() {
    this.userRepository = new UserRepository();
    this.validator = new UserValidator();
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

    return updatedUser;
  }
}
