import { NextRequest, NextResponse } from 'next/server';
import { IssueService } from '@/services/IssueService';
import { BaseHandler } from './BaseHandler';

export class IssueHandler extends BaseHandler {
  private issueService: IssueService;

  constructor() {
    super();
    this.issueService = new IssueService();
  }

  async create(req: NextRequest) {
    try {
      const userId = this.getUserId(req);
      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      // 1. Rate Limit (20 req / 15 min)
      const rateLimitRes = this.checkRateLimit(req, 20, 15 * 60 * 1000, userId);
      if (rateLimitRes) return rateLimitRes;

      // 2. Duplicate Prevention (5 sec lock)
      const dupRes = this.preventDuplicates(req, userId, 5000);
      if (dupRes) return dupRes;

      const body = await req.json();
      const issue = await this.issueService.createIssue(userId, body);
      return NextResponse.json(issue, { status: 201 });
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAll(req: NextRequest) {
    try {
      const userId = this.getUserId(req);
      if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

      const { searchParams } = new URL(req.url);
      const type = searchParams.get('type') || undefined;
      const search = searchParams.get('search') || undefined;

      const issues = await this.issueService.getIssues(userId, type, search);
      return NextResponse.json(issues);
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async getOne(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
      const userId = this.getUserId(req);
      if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      
      const { id } = await params;
      const issue = await this.issueService.getIssueById(id, userId);
      return NextResponse.json(issue);
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async update(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
      const userId = this.getUserId(req);
      if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

      const { id } = await params;
      const body = await req.json();
      const issue = await this.issueService.updateIssue(id, userId, body);
      return NextResponse.json(issue);
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async delete(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
      const userId = this.getUserId(req);
      if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

      const { id } = await params;
      await this.issueService.deleteIssue(id, userId);
      return NextResponse.json({ message: 'Issue deleted successfully' });
    } catch (error: any) {
      return this.handleError(error);
    }
  }
}
