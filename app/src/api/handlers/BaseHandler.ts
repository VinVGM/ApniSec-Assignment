import { NextRequest, NextResponse } from 'next/server';
import { AppError } from '@/utils/AppError';
import jwt from 'jsonwebtoken';

export abstract class BaseHandler {
  
  protected getUserId(req: NextRequest): string | null {
    const token = req.cookies.get('token')?.value;
    if (!token) return null;
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      return decoded.id || decoded.userId; 
    } catch (e) {
      return null;
    }
  }

  protected handleError(error: any) {
    if (error instanceof AppError) {
      return NextResponse.json({ error: error.message, details: (error as any).details }, { status: error.statusCode });
    }
    console.error('Handler Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
