import { IssueHandler } from '@/api/handlers/IssueHandler';
import { NextRequest } from 'next/server';

const handler = new IssueHandler();

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  return handler.getOne(req, props);
}

export async function PUT(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  return handler.update(req, props);
}

export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  return handler.delete(req, props);
}
