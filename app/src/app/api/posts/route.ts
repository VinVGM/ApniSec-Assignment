import { PostHandler } from '@/api/handlers/PostHandler';
import { NextRequest } from 'next/server';

const handler = new PostHandler();

export async function GET(req: NextRequest) {
  return handler.getAll(req);
}

export async function POST(req: NextRequest) {
  return handler.create(req);
}
