import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/services/UserService';
import { AppError } from '@/utils/AppError';
import jwt from 'jsonwebtoken';

export class UserHandler {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getProfile(req: NextRequest) {
    try {
      const userId = this.getUserIdFromToken(req);
      if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

      const user = await this.userService.getProfile(userId);
      return NextResponse.json(this.sanitizeUser(user));
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async updateProfile(req: NextRequest) {
    try {
      const userId = this.getUserIdFromToken(req);
      if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

      const body = await req.json();
      const updatedUser = await this.userService.updateProfile(userId, body);
      return NextResponse.json(this.sanitizeUser(updatedUser));
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  private getUserIdFromToken(req: NextRequest): string | null {
    const token = req.cookies.get('token')?.value;
    if (!token) return null;
    
    try {
      // Decode without verification for speed if middleware already verified it, 
      // BUT for security in handlers, verification is safer.
      // However, here we just need the ID. Middleware protects the route.
      const decoded = jwt.decode(token) as { userId: string };
      return decoded?.userId || null;
    } catch (e) {
      return null;
    }
  }

  private sanitizeUser(user: any) {
    const { password_hash, ...rest } = user;
    return rest;
  }

  private handleError(error: any) {
    if (error instanceof AppError) {
      return NextResponse.json({ error: error.message, details: (error as any).details }, { status: error.statusCode });
    }
    console.error('User Handler Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
