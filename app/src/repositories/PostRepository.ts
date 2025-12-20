import { Database } from '@/lib/db/db';
import { Post } from '@/models/Post';

export class PostRepository {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  async create(userId: string, content: string): Promise<Post> {
    const query = `
      INSERT INTO posts (user_id, content)
      VALUES ($1, $2)
      RETURNING *
    `;
    const result = await this.db.query(query, [userId, content]);
    return result.rows[0];
  }

  async findAll(currentUserId: string): Promise<Post[]> {
    const query = `
      SELECT 
        p.*,
        u.full_name as author_name,
        u.role as author_role,
        (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id)::int as like_count,
        EXISTS(SELECT 1 FROM likes l WHERE l.post_id = p.id AND l.user_id = $1) as is_liked
      FROM posts p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
    `;
    const result = await this.db.query(query, [currentUserId]);
    return result.rows.map((row: any) => ({
      ...row,
      author: {
        full_name: row.author_name,
        role: row.author_role
      },
      like_count: row.like_count || 0,
      is_liked: row.is_liked
    }));
  }

  async toggleLike(postId: string, userId: string): Promise<boolean> {
    // Check if exists
    const check = await this.db.query(
      'SELECT * FROM likes WHERE post_id = $1 AND user_id = $2',
      [postId, userId]
    );

    if (check.rows.length > 0) {
      // Unlike
      await this.db.query(
        'DELETE FROM likes WHERE post_id = $1 AND user_id = $2',
        [postId, userId]
      );
      return false; // Liked = false
    } else {
      // Like
      await this.db.query(
        'INSERT INTO likes (post_id, user_id) VALUES ($1, $2)',
        [postId, userId]
      );
      return true; // Liked = true
    }
  }
}
