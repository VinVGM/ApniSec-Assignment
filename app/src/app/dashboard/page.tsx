"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { IssueDetailModal } from "@/components/IssueDetailModal";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Shield, LayoutList, User as UserIcon, LogOut, ArrowUpRight, Search } from "lucide-react";

interface Issue {
    id: string;
    title: string;
    priority: string;
    status: string;
    type: string;
    description: string;
    created_at: string;
}

interface Post {
    id: string;
    content: string;
    created_at: string;
    author: {
        role: string;
        full_name: string;
    };
    like_count: number;
    is_liked: boolean;
}

interface User {
    id: string;
    username: string;
    full_name: string;
    role: string;
    email: string;
}

const PRIORITY_MAP: Record<string, number> = {
    'Critical': 3,
    'High': 2,
    'Medium': 1,
    'Low': 0
};

export default function DashboardPage() {
  const router = useRouter();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [postContent, setPostContent] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    fetchPosts();
    fetchUser();
  }, []);

  const fetchUser = async () => {
      try {
          const res = await fetch("/api/users/profile");
          if(res.ok) setUser(await res.json());
      } catch(e) { console.error(e); }
  };

  const fetchPosts = async () => {
      try {
          const res = await fetch("/api/posts");
          if(res.ok) setPosts(await res.json());
      } catch(e) { console.error(e); }
  };

  const handlePostCreate = async (e: React.FormEvent) => {
      e.preventDefault();
      if(!postContent.trim()) return;
      
      try {
          const res = await fetch("/api/posts", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ content: postContent })
          });
          if(res.ok) {
              setPostContent("");
              fetchPosts();
          }
      } catch(e) {
          alert("Failed to post");
      }
  };

  const handleLike = async (id: string) => {
      try {
          // Optimistic update
          setPosts(posts.map(p => 
              p.id === id 
              ? { ...p, is_liked: !p.is_liked, like_count: p.is_liked ? p.like_count - 1 : p.like_count + 1 }
              : p
          ));
          await fetch(`/api/posts/${id}/like`, { method: "POST" });
      } catch(e) {
          fetchPosts(); // Revert on error
      }
  };

  useEffect(() => {
    fetch("/api/issues")
        .then(res => res.ok ? res.json() : [])
        .then((data: Issue[]) => {
            // Sort by priority desc
            const sorted = data.sort((a, b) => (PRIORITY_MAP[b.priority] || 0) - (PRIORITY_MAP[a.priority] || 0));
            setIssues(sorted);
            setLoading(false);
        })
        .catch(() => setIssues([]));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
    router.push("/login");
  };

  const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      if(searchQuery.trim()) {
          router.push(`/dashboard/issues?q=${encodeURIComponent(searchQuery)}`);
      }
  };
  
  const handleIssueClick = (issue: Issue) => {
      setSelectedIssue(issue);
      setIsDetailOpen(true);
  };

  const getPriorityColor = (p: string) => {
      switch(p) {
          case 'Critical': return 'bg-red-500 hover:bg-red-600';
          case 'High': return 'bg-orange-500 hover:bg-orange-600';
          case 'Medium': return 'bg-yellow-500 hover:bg-yellow-600';
          default: return 'bg-primary/80 hover:bg-primary';
      }
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8 font-mono">
        
        <IssueDetailModal 
            isOpen={isDetailOpen} 
            onClose={() => setIsDetailOpen(false)} 
            issue={selectedIssue} 
        />
        
        <div className="max-w-7xl mx-auto space-y-8">
            <header className="flex flex-col gap-6 border-b border-primary/20 pb-6">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="flex items-center gap-2">
                            <Shield className="h-5 w-5 md:h-6 md:w-6 text-primary animate-pulse" />
                            <span className="font-mono text-lg md:text-xl font-bold tracking-tighter text-primary">
                                CYBER<span className="text-primary">-GM <span className="hidden sm:inline">DASHBOARD</span></span>
                            </span>
                        </div>
                         <p className="text-muted-foreground text-[10px] md:text-xs uppercase tracking-widest mt-1">Status: Online</p>
                    </div>
                    <div className="flex gap-2 md:gap-4 items-center">
                        <ThemeToggle />
                        
                        <Button 
                            onClick={() => router.push('/dashboard/issues')} 
                            variant="ghost"
                            size="sm"
                            className="text-primary hover:bg-primary/10"
                        >
                            <LayoutList className="h-5 w-5 md:mr-2" />
                            <span className="hidden md:inline">ISSUE TRACKER</span>
                        </Button>
                        <Button 
                            onClick={() => router.push('/profile')} 
                            variant="ghost"
                            size="sm"
                            className="text-primary hover:bg-primary/10"
                        >
                            <UserIcon className="h-5 w-5 md:mr-2" />
                            <span className="hidden md:inline">PROFILE</span>
                        </Button>

                        {user && (
                            <div className="flex items-center gap-3 mr-2 bg-primary/5 px-2 md:px-3 py-1.5 rounded-full border border-primary/10">
                                <Avatar className="h-6 w-6 md:h-8 md:w-8 border border-primary/20">
                                    <AvatarFallback className="bg-primary/10 text-primary text-[10px] md:text-xs font-bold">
                                        {user.full_name?.substring(0, 2).toUpperCase() || user.username?.substring(0, 2).toUpperCase() || 'OP'}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="hidden lg:block text-right">
                                    <p className="text-sm font-bold text-primary leading-none">{user.full_name || user.username}</p>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{user.role || 'OPERATIVE'}</p>
                                </div>
                            </div>
                        )}

                        <Button 
                            onClick={handleLogout} 
                            variant="outline"
                            size="sm"
                            className="border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive"
                        >
                            <LogOut className="h-5 w-5 md:mr-2" />
                            <span className="hidden md:inline">LOGOUT</span>
                        </Button>
                    </div>
                </div>

            </header>
            
            <main className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                 {/* Left Column: Stats & Threat */}
                 <div className="flex flex-col gap-6">
                    {/* Vulnerability Tracker */}
                    <div className="bg-card border border-primary/10 p-6 rounded-lg shadow-sm hover:border-primary/30 transition-all cursor-pointer group flex-1 flex flex-col justify-between" onClick={() => router.push('/dashboard/issues')}>
                        <div>
                            <h2 className="text-lg font-bold text-primary mb-2 group-hover:text-primary/80">VULNERABILITY TRACKER</h2>
                            <p className="text-muted-foreground text-sm uppercase tracking-wide">Active Reports</p>
                        </div>
                        <p className="text-4xl text-primary font-bold mt-4">{issues.length}</p>
                        <p className="text-xs text-muted-foreground mt-2 group-hover:underline">VIEW ALL ISSUES &rarr;</p>
                    </div>

                    {/* Threat Level */}
                    <div className="bg-card border border-primary/10 p-6 rounded-lg shadow-sm flex-1 flex flex-col justify-center">
                        <h2 className="text-lg font-bold text-primary mb-2">THREAT LEVEL</h2>
                         <p className={`text-4xl font-bold ${issues.some(i => i.priority === 'Critical') ? 'text-red-500 animate-pulse' : 'text-green-500'}`}>
                             {issues.some(i => i.priority === 'Critical') ? 'CRITICAL' : 'LOW'}
                         </p>
                    </div>
                 </div>

    
                <div className="md:col-span-2 bg-card border border-primary/10 p-6 rounded-lg shadow-sm h-full flex flex-col">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 shrink-0">
                        <h2 className="text-lg font-bold text-primary">ISSUES OVERVIEW</h2>
                         {/* Search within card */}
                         <div className="flex gap-2 w-full md:w-auto">
                             <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-[300px]">
                                <Input 
                                    placeholder="SEARCH ISSUES..." 
                                    className="bg-background/50 border-primary/20 h-9 w-full min-w-[120px]"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Button type="submit" size="sm" className="bg-primary/20 text-primary hover:bg-primary/30 h-9 px-3">
                                    <span className="hidden sm:inline">SEARCH</span>
                                    <Search className="h-4 w-4 sm:hidden" />
                                </Button>
                            </form>
                            <Button variant="ghost" size="sm" onClick={() => router.push('/dashboard/issues')} className="text-xs text-muted-foreground hover:text-primary h-9 px-2 shrink-0">
                                <span className="hidden sm:inline">VIEW ALL</span>
                                <ArrowUpRight className="h-4 w-4 sm:hidden" />
                            </Button>
                        </div>
                    </div>
                    
                    <div className="space-y-3 overflow-y-auto flex-grow h-[300px] md:h-auto pr-2">
                        {loading ? (
                            <p className="text-muted-foreground text-sm">Loading issues...</p>
                        ) : issues.length === 0 ? (
                            <p className="text-muted-foreground text-sm">No issues found.</p>
                        ) : (
                            issues.slice(0, 10).map(issue => (
                                <div 
                                    key={issue.id} 
                                    className="flex items-center justify-between p-3 bg-background/50 rounded border border-primary/5 hover:border-primary/20 transition-all cursor-pointer" 
                                    onClick={() => handleIssueClick(issue)}
                                >
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <Badge className={`${getPriorityColor(issue.priority)} text-white border-0 w-20 justify-center`}>{issue.priority}</Badge>
                                        <span className="font-semibold truncate text-sm">{issue.title}</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground whitespace-nowrap">{issue.status}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {/* Team Feed */}
                <div className="md:col-span-2 bg-card border border-primary/10 p-6 rounded-lg shadow-sm">
                    <h2 className="text-lg font-bold text-primary mb-6">TEAM INTEL FEED</h2>
                    
                    {/* Create Post */}
                    <div className="flex gap-4 mb-8">
                        <Avatar>
                            <AvatarFallback className="bg-primary/20 text-primary">ME</AvatarFallback>
                        </Avatar>
                         <form onSubmit={handlePostCreate} className="flex-1 space-y-2">
                             <Textarea 
                                placeholder="Share intelligence..." 
                                className="bg-background/50 border-primary/20 min-h-[80px]"
                                value={postContent}
                                onChange={(e) => setPostContent(e.target.value)}
                             />
                             <div className="flex justify-end">
                                 <Button type="submit" size="sm" className="bg-primary text-primary-foreground font-bold" disabled={!postContent.trim()}>
                                     POST UPDATE
                                 </Button>
                             </div>
                         </form>
                    </div>

                    {/* Feed List */}
                     <ScrollArea className="h-[400px] w-full pr-4">
                        <div className="space-y-6">
                            {loading ? (
                            <p className="text-muted-foreground text-sm">Loading posts...</p>
                            ) 
                            : 
                            posts.length === 0 ? (
                                <p className="text-muted-foreground text-center py-8">No community updates yet.</p>
                            ) 
                            : (
                                posts.map(post => (
                                    <div key={post.id} className="flex gap-4 border-b border-primary/10 pb-6 last:border-0 animation-in fade-in slide-in-from-bottom-2 duration-500">
                                         <Avatar className="mt-1">
                                            <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                                                {post.author?.full_name?.substring(0,2).toUpperCase() || 'AN'}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-bold text-primary/90 text-sm">{post.author?.full_name || 'Anonymous'}</p>
                                                    <p className="text-xs text-muted-foreground">{post.author?.role || 'Operative'} • {new Date(post.created_at).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <p className="text-sm text-foreground/90 whitespace-pre-wrap">{post.content}</p>
                                            
                                            <div className="flex gap-2 pt-1">
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    className={`h-6 px-2 text-xs gap-1 ${post.is_liked ? 'text-red-500 hover:text-red-600 hover:bg-red-500/10' : 'text-muted-foreground hover:text-primary hover:bg-primary/10'}`}
                                                    onClick={() => handleLike(post.id)}
                                                >
                                                    ♥ {post.like_count}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </ScrollArea>
                </div>

                <div className="bg-card border border-primary/10 p-6 rounded-lg shadow-sm flex flex-col justify-center items-center text-center space-y-4">
                    <div className="h-24 w-24 rounded-full bg-primary/5 border border-primary/20 flex items-center justify-center animate-pulse">
                         <span className="text-4xl">🛡️</span>
                    </div>
                     <div>
                         <h2 className="text-lg font-bold text-primary">SECURE CHANNEL</h2>
                         <p className="text-sm text-muted-foreground mt-2">All communications are encrypted and logged for security auditing.</p>
                     </div>
                </div>
            </div>
        </div>
    </div>
  );
}
