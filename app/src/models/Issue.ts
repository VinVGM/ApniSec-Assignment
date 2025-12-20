export interface Issue {
  id: string;
  user_id: string;
  type: 'Cloud Security' | 'Reteam Assessment' | 'VAPT';
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  created_at: Date;
  updated_at: Date;
}
