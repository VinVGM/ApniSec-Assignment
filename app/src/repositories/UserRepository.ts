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

  async create(userData: { email: string, passwordHash: string, fullName: string, role: string, sector: string }): Promise<User> {
    const result = await this.db.query(
      'INSERT INTO users (email, password, full_name, role, sector, updated_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *',
      [userData.email, userData.passwordHash, userData.fullName, userData.role, userData.sector]
    );
    return this.mapRowToUser(result.rows[0]);
  }

  async findById(id: string): Promise<User | null> {
    const result = await this.db.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) return null;
    return this.mapRowToUser(result.rows[0]);
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    // Map 'location' to 'sector' for DB column match
    if (data.location !== undefined) {
        (data as any).sector = data.location;
        delete data.location;
    }

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

  async findByResetToken(token: string): Promise<User | null> {
    const result = await this.db.query('SELECT * FROM users WHERE reset_token = $1', [token]);
    if (result.rows.length === 0) return null;
    return this.mapRowToUser(result.rows[0]);
  }

  async saveResetToken(email: string, token: string, expires: Date): Promise<void> {
    await this.db.query(
      'UPDATE users SET reset_token = $1, reset_token_expires = $2 WHERE email = $3',
      [token, expires, email]
    );
  }

  async clearResetToken(id: string): Promise<void> {
    await this.db.query(
      'UPDATE users SET reset_token = NULL, reset_token_expires = NULL WHERE id = $1',
      [id]
    );
  }

  async updatePassword(id: string, passwordHash: string): Promise<void> {
     await this.db.query(
        'UPDATE users SET password = $1, updated_at = NOW() WHERE id = $2',
        [passwordHash, id]
     );
  }

  private mapRowToUser(row: any): User {
    return {
      id: row.id,
      email: row.email,
      password_hash: row.password, 
      full_name: row.full_name,
      role: row.role,
      bio: row.bio,
      location: row.sector,
      status: row.status,
      reset_token: row.reset_token,
      reset_token_expires: row.reset_token_expires,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }
}
