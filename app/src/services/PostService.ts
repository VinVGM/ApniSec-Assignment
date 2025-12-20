import { PostRepository } from '@/repositories/PostRepository';
import { PostValidator } from '@/validators/PostValidator';
import { Post } from '@/models/Post';

export class PostService {
  private repository: PostRepository;
  private validator: PostValidator;

  constructor() {
    this.repository = new PostRepository();
    this.validator = new PostValidator();
  }

  async createPost(userId: string, data: any): Promise<Post> {
    const validated = this.validator.validateCreate(data);
    return this.repository.create(userId, validated.content);
  }

  async getFeed(currentUserId: string): Promise<Post[]> {
    return this.repository.findAll(currentUserId);
  }

  async toggleLike(postId: string, userId: string): Promise<boolean> {
    return this.repository.toggleLike(postId, userId);
  }
}
