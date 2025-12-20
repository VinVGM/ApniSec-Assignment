import { UserHandler } from '@/api/handlers/UserHandler';
import { NextRequest } from 'next/server';

const handler = new UserHandler();

export async function GET(req: NextRequest) {
  return handler.getProfile(req);
}

export async function PUT(req: NextRequest) {
  return handler.updateProfile(req);
}
