import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../models/User';
import { AuthValidator } from '@/validators/AuthValidator';
import { BadRequestError, UnauthorizedError } from '@/utils/AppError';

import { EmailService } from './EmailService';

export class AuthService {
  private userRepository: UserRepository;
  private validator: AuthValidator;
  private emailService: EmailService;

  constructor() {
    this.userRepository = new UserRepository();
    this.validator = new AuthValidator();
    this.emailService = new EmailService();
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
    const user = await this.userRepository.create({
      email: validated.email,
      passwordHash,
      fullName: validated.full_name,
      role: validated.designation,
      sector: validated.sector
    });

    // Generate Token
    const token = this.generateToken(user);
    
    // Send Welcome Email
    const name = user.full_name || user.email.split('@')[0];
    await this.emailService.sendWelcomeEmail(user.email, name);

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
  
  async forgotPassword(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
        // Return true to avoid enumeration attacks, but don't send email
        return true; 
    }

    // Generate random string token
    const token = crypto.randomUUID();
    const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

    await this.userRepository.saveResetToken(email, token, expires);

    // Send Email
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
    const name = user.full_name || 'Agent';
    
    await this.emailService.sendPasswordResetEmail(email, resetLink, name);
    return true;
  }

  async resetPassword(token: string, newPassword: string) {
     const user = await this.userRepository.findByResetToken(token);
     if (!user || !user.reset_token_expires || new Date() > new Date(user.reset_token_expires)) {
         throw new BadRequestError('Invalid or expired token');
     }

     if (newPassword.length < 6) {
         throw new BadRequestError('Password must be at least 6 characters');
     }

     // Hash new password
     const salt = await bcrypt.genSalt(10);
     const passwordHash = await bcrypt.hash(newPassword, salt);

     // Update user
     await this.userRepository.updatePassword(user.id, passwordHash);
     await this.userRepository.clearResetToken(user.id);
     
     return true;
  }
}
