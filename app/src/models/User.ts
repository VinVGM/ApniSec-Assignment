export interface User {
  id: string;
  email: string;
  password_hash: string;
  full_name?: string;
  role?: string;
  bio?: string;
  location?: string;
  sector?: string;
  status?: string;
  reset_token?: string;
  reset_token_expires?: Date;
  created_at: Date;
  updated_at: Date;
}
