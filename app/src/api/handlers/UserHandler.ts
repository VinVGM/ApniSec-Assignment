import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/services/UserService';
import { BaseHandler } from './BaseHandler';

export class UserHandler extends BaseHandler {
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  async getProfile(req: NextRequest) {
    try {
      const userId = this.getUserId(req);
      if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

      // Rate Limit: 100 req / 15 min (Standard view)
      const rateLimitRes = this.checkRateLimit(req, 100, 15 * 60 * 1000, userId);
      if (rateLimitRes) return rateLimitRes;

      const user = await this.userService.getProfile(userId);
      return NextResponse.json(this.sanitizeUser(user));
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async updateProfile(req: NextRequest) {
    try {
      const userId = this.getUserId(req);
      if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

      // Rate Limit: 20 req / 15 min (Update)
      const rateLimitRes = this.checkRateLimit(req, 20, 15 * 60 * 1000, userId);
      if (rateLimitRes) return rateLimitRes;

      // Duplicate Prevention: 5s lock
      const dupRes = this.preventDuplicates(req, userId, 5000);
      if (dupRes) return dupRes;

      const body = await req.json();
      const updatedUser = await this.userService.updateProfile(userId, body);
      return NextResponse.json(this.sanitizeUser(updatedUser));
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  private sanitizeUser(user: any) {
    const { password_hash, ...rest } = user;
    return rest;
  }
}
