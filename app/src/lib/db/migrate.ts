import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
const envLocalPath = path.resolve(process.cwd(), '.env.local');
const envPath = path.resolve(process.cwd(), '.env');

const loadPath = fs.existsSync(envLocalPath) ? envLocalPath : envPath;
console.log('Loading env from:', loadPath);
dotenv.config({ path: loadPath });

if (!process.env.DATABASE_URL) {
  console.error('Error: DATABASE_URL is not defined in .env or .env.local');
  process.exit(1);
}

import { Database } from './db';
import fs from 'fs';

async function runMigrations() {
  const db = Database.getInstance();
  
  try {
    const migrationPath = path.join(process.cwd(), 'src/lib/db/migrations/001_create_users_table.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');
    
    console.log('Running migration: 001_create_users_table.sql');
    await db.query(sql);
    console.log('Migration completed successfully.');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    process.exit(0);
  }
}

runMigrations();
