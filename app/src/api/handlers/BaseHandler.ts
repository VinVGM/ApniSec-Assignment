import { NextRequest, NextResponse } from 'next/server';
import { AppError } from '@/utils/AppError';
import { verify } from 'jsonwebtoken';
import { RateLimitService } from '@/services/RateLimitService';

export class BaseHandler {
  protected rateLimiter: RateLimitService;

  constructor() {
    this.rateLimiter = RateLimitService.getInstance();
  }

  protected getUserId(req: NextRequest): string {
    const token = req.cookies.get('token')?.value;
    if (!token) {
      throw new Error('Unauthorized'); // Should be handled by middleware essentially, but good safety
    }

    try {
      const decoded: any = verify(token, process.env.JWT_SECRET!);
      return decoded.userId;
    } catch (err) {
      throw new Error('Invalid Token');
    }
  }

  protected handleError(error: any) {
    console.error('API Error:', error);

    if (error instanceof AppError) {
      return NextResponse.json(
        { error: error.message, details: error.stack },
        { status: error.statusCode }
      );
    }
    
    if (error.message === 'Unauthorized' || error.message === 'Invalid Token') {
         return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }

  protected checkRateLimit(req: NextRequest, limit: number = 100, windowMs: number = 15 * 60 * 1000, keySuffix: string = ''): NextResponse | null {

      
      let key = req.headers.get('x-forwarded-for') ?? 'unknown-ip';
      if (keySuffix) {
          key += `:${keySuffix}`;
      }
      
      const { allowed, remaining, reset } = this.rateLimiter.checkLimit(key, limit, windowMs);
      
      if (!allowed) {
          return NextResponse.json(
              { error: 'Too Many Requests', retryAfter: reset },
              { 
                  status: 429,
                  headers: {
                      'X-RateLimit-Limit': limit.toString(),
                      'X-RateLimit-Remaining': '0',
                      'X-RateLimit-Reset': reset.toString(),
                      'Retry-After': reset.toString() // Standard Header
                  }
              }
          );
      }
      
      // Note: We can't easily append headers to the *eventual* response here without wrapping the handler. 
      // We will assume successful response handling will leverage middleware or just be okay with missing headers for now, 
      // OR we return null here and let the specific handler add headers if it wants, but primarily this method's job is to BLOCK.
      return null;
  }

  protected preventDuplicates(req: NextRequest, userId: string, lockMs: number = 3000): NextResponse | null {
      const method = req.method;
      const path = req.nextUrl.pathname;
      const key = `dup:${userId}:${method}:${path}`;

      const isDuplicate = this.rateLimiter.checkDuplicate(key, lockMs);

      if (isDuplicate) {
           return NextResponse.json(
              { error: 'Duplicate Request Detected. Please wait.' },
              { status: 429 }
          );
      }
      return null;
  }
}
