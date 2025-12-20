export interface User {
  id: string;
  email: string;
  password_hash: string;
  full_name?: string;
  role?: string;
  bio?: string;
  location?: string;
  status?: string;
  created_at: Date;
  updated_at: Date;
}
