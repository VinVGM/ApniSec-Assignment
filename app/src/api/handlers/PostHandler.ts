import { NextRequest, NextResponse } from 'next/server';
import { PostService } from '@/services/PostService';
import { BaseHandler } from './BaseHandler';

export class PostHandler extends BaseHandler {
  private service: PostService;

  constructor() {
    super();
    this.service = new PostService();
  }

  async getAll(req: NextRequest) {
    try {
      const userId = this.getUserId(req);
      if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

      const posts = await this.service.getFeed(userId);
      return NextResponse.json(posts);
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async create(req: NextRequest) {
    try {
      const userId = this.getUserId(req);
      if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

      const body = await req.json();
      const post = await this.service.createPost(userId, body);
      return NextResponse.json(post, { status: 201 });
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async like(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
      try {
          const userId = this.getUserId(req);
          if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

          const { id } = await params;
          const isLiked = await this.service.toggleLike(id, userId);
          return NextResponse.json({ is_liked: isLiked });
      } catch (error: any) {
          return this.handleError(error);
      }
  }
}
