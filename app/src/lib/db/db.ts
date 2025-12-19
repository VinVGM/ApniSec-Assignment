import { Pool, PoolClient } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

// Force load env if not present (debugging measure)
if (!process.env.DATABASE_URL) {
    console.log('Current working directory:', process.cwd());
    const envPath = path.resolve(process.cwd(), '.env');
    console.log('Attempting to load env from:', envPath);
    const result = dotenv.config({ path: envPath });
    if (result.error) {
        console.error('Dotenv error:', result.error);
    } else {
        console.log('Dotenv parsed keys:', Object.keys(result.parsed || {}));
    }
}

export class Database {
  private static instance: Database;
  private pool: Pool;

  private constructor() {
    // Debugging: Check if URL is loaded
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      console.error('CRITICAL: DATABASE_URL is missing!');
    } else {
      console.log('Database connecting to:', connectionString.split('@')[1] || 'Unknown Host');
    }

    this.pool = new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false
      } // Supabase requires SSL
    });

    this.pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
      process.exit(-1);
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async query(text: string, params?: any[]): Promise<any> {
    const start = Date.now();
    try {
        const res = await this.pool.query(text, params);
        const duration = Date.now() - start;
        // console.log('executed query', { text, duration, rows: res.rowCount });
        return res;
    } catch (error) {
        console.error('Error executing query', { text, error });
        throw error;
    }
  }

  public async getClient(): Promise<PoolClient> {
    return this.pool.connect();
  }
}
