import { Database } from '../lib/db/db';
import { User } from '../models/User';

export class UserRepository {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) return null;
    return this.mapRowToUser(result.rows[0]);
  }

  async create(email: string, passwordHash: string): Promise<User> {
    const result = await this.db.query(
      'INSERT INTO users (email, password, updated_at) VALUES ($1, $2, NOW()) RETURNING *',
      [email, passwordHash]
    );
    return this.mapRowToUser(result.rows[0]);
  }

  async findById(id: string): Promise<User | null> {
    const result = await this.db.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) return null;
    return this.mapRowToUser(result.rows[0]);
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    const fields = Object.keys(data);
    if (fields.length === 0) return this.findById(id);

    // Build dynamic update query
    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
    const values = [id, ...Object.values(data)];

    const query = `
      UPDATE users 
      SET ${setClause}, updated_at = NOW() 
      WHERE id = $1 
      RETURNING *
    `;

    const result = await this.db.query(query, values);
    if (result.rows.length === 0) return null;
    return this.mapRowToUser(result.rows[0]);
  }

  private mapRowToUser(row: any): User {
    return {
      id: row.id,
      email: row.email,
      password_hash: row.password, 
      full_name: row.full_name,
      role: row.role,
      bio: row.bio,
      location: row.location,
      status: row.status,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }
}
