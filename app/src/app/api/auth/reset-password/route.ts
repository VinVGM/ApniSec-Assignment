import { NextResponse } from 'next/server';
import { AuthService } from '@/services/AuthService';
import { AppError } from '@/utils/AppError';

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();
    
    if (!token || !password) {
      return NextResponse.json({ error: "Token and password are required" }, { status: 400 });
    }

    const authService = new AuthService();
    await authService.resetPassword(token, password);

    return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Reset Password Error:", error);
    if (error instanceof AppError) {
        return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
