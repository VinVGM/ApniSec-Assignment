import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../models/User';
import { AuthValidator } from '@/validators/AuthValidator';
import { BadRequestError, UnauthorizedError } from '@/utils/AppError';

export class AuthService {
  private userRepository: UserRepository;
  private validator: AuthValidator;

  constructor() {
    this.userRepository = new UserRepository();
    this.validator = new AuthValidator();
  }

  async register(data: any) {
    // Validate input using Validator Class
    const validated = this.validator.validateRegister(data);

    // Check if user exists
    const existingUser = await this.userRepository.findByEmail(validated.email);
    if (existingUser) {
      throw new BadRequestError('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(validated.password, salt);

    // Create user
    const user = await this.userRepository.create(validated.email, passwordHash);

    // Generate Token
    const token = this.generateToken(user);

    return { user: this.sanitizeUser(user), token };
  }

  async login(data: any) {
    // Validate input using Validator Class
    const validated = this.validator.validateLogin(data);

    const user = await this.userRepository.findByEmail(validated.email);
    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(validated.password, user.password_hash);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const token = this.generateToken(user);

    return { user: this.sanitizeUser(user), token };
  }

  private generateToken(user: User): string {
    return jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' } // 1 week
    );
  }

  private sanitizeUser(user: User) {
    const { password_hash, ...rest } = user;
    return rest;
  }
}
