export interface Post {
    id: string;
    user_id: string;
    content: string;
    created_at: string;
    author?: {
        full_name: string | null;
        role: string | null;
    };
    like_count?: number;
    is_liked?: boolean;
}
