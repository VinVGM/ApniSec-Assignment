import { IssueHandler } from '@/api/handlers/IssueHandler';
import { NextRequest } from 'next/server';

const handler = new IssueHandler();

export async function GET(req: NextRequest) {
  return handler.getAll(req);
}

export async function POST(req: NextRequest) {
  return handler.create(req);
}
