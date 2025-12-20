import { PostHandler } from '@/api/handlers/PostHandler';
import { NextRequest } from 'next/server';

const handler = new PostHandler();

export async function POST(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  return handler.like(req, props);
}
