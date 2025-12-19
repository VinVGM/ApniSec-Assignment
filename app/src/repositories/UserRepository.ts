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

  private mapRowToUser(row: any): User {
    return {
      id: row.id,
      email: row.email,
      password_hash: row.password, // Mapping 'password' column to 'password_hash' property
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }
}
