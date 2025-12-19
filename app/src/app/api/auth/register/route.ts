import { AuthHandler } from '@/api/handlers/AuthHandler';
import { NextRequest } from 'next/server';

const handler = new AuthHandler();

export async function POST(req: NextRequest) {
  return handler.register(req);
}
