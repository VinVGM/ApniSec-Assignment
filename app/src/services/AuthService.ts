import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../models/User';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters long"),
});

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(data: z.infer<typeof registerSchema>) {
    // Validate input
    const validated = registerSchema.parse(data);

    // Check if user exists
    const existingUser = await this.userRepository.findByEmail(validated.email);
    if (existingUser) {
      throw new Error('User already exists');
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

  async login(data: z.infer<typeof loginSchema>) {
    const validated = loginSchema.parse(data);

    const user = await this.userRepository.findByEmail(validated.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(validated.password, user.password_hash);
    if (!isMatch) {
      throw new Error('Invalid credentials');
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
