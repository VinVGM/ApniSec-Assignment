import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/AuthService';
import { ZodError } from 'zod';

export class AuthHandler {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: NextRequest) {
    try {
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

  private handleError(error: any) {
    if (error instanceof ZodError) {
      // Format validation errors into a single string for valid display in simple UIs
      const errorMessage = error.issues.map(issue => issue.message).join(', ');
      return NextResponse.json({ error: errorMessage, details: error.issues }, { status: 400 });
    }
    if (error.message === 'User already exists' || error.message === 'Invalid credentials') {
        return NextResponse.json({ error: error.message }, { status: 401 });
    }
    console.error('Auth Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
