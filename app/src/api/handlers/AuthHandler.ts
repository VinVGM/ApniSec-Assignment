import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/AuthService';
import { BaseHandler } from './BaseHandler';

export class AuthHandler extends BaseHandler {
  private authService: AuthService;

  constructor() {
    super();
    this.authService = new AuthService();
  }

  async register(req: NextRequest) {
    try {
      // Rate Limit: 20 req / 15 min per IP
      const rateLimitRes = this.checkRateLimit(req, 20, 15 * 60 * 1000);
      if (rateLimitRes) return rateLimitRes;

      const body = await req.json();
      const result = await this.authService.register(body);
      
      const response = NextResponse.json(result, { status: 201 });
      
      // Set HTTP-only cookie
      response.cookies.set('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });

      return response;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async login(req: NextRequest) {
    try {
      // Rate Limit: 20 req / 15 min per IP
      const rateLimitRes = this.checkRateLimit(req, 20, 15 * 60 * 1000);
      if (rateLimitRes) return rateLimitRes;

      const body = await req.json();
      const result = await this.authService.login(body);
      
      const response = NextResponse.json(result, { status: 200 });
      
      response.cookies.set('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });

      return response;
    } catch (error: any) {
      return this.handleError(error);
    }
  }
  
  async logout(req: NextRequest) {
    const response = NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
    response.cookies.set('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0,
        path: '/',
    });
    return response;
  }
}
