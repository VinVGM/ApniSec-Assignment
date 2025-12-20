import { Database } from '@/lib/db/db';
import { Issue } from '@/models/Issue';

export class IssueRepository {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  async create(issue: Omit<Issue, 'id' | 'created_at' | 'updated_at'>): Promise<Issue> {
    const { user_id, type, title, description, priority, status } = issue;
    const query = `
      INSERT INTO issues (user_id, type, title, description, priority, status)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const result = await this.db.query(query, [user_id, type, title, description, priority, status]);
    return result.rows[0];
  }

  async findAll(userId: string, filterType?: string, searchQuery?: string): Promise<Issue[]> {
    let query = 'SELECT * FROM issues WHERE user_id = $1';
    const params: any[] = [userId];
    let paramIndex = 2;

    if (filterType) {
      query += ` AND type = $${paramIndex}`;
      params.push(filterType);
      paramIndex++;
    }

    if (searchQuery) {
      query += ` AND (title ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`;
      params.push(`%${searchQuery}%`);
      paramIndex++;
    }

    query += ' ORDER BY created_at DESC';

    const result = await this.db.query(query, params);
    return result.rows;
  }

  async findById(id: string): Promise<Issue | null> {
    const result = await this.db.query('SELECT * FROM issues WHERE id = $1', [id]);
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }

  async update(id: string, userId: string, data: Partial<Issue>): Promise<Issue | null> {
    const fields = Object.keys(data).filter(key => key !== 'id' && key !== 'user_id' && key !== 'created_at' && key !== 'updated_at');
    if (fields.length === 0) return this.findById(id);

    const setClause = fields.map((field, index) => `${field} = $${index + 3}`).join(', ');
    const values = [id, userId, ...fields.map(field => (data as any)[field])];

    // Ensure user owns the issue
    const query = `
      UPDATE issues 
      SET ${setClause}, updated_at = NOW() 
      WHERE id = $1 AND user_id = $2
      RETURNING *
    `;

    const result = await this.db.query(query, values);
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }

  async delete(id: string, userId: string): Promise<boolean> {
    const result = await this.db.query('DELETE FROM issues WHERE id = $1 AND user_id = $2', [id, userId]);
    return (result.rowCount ?? 0) > 0;
  }
}
