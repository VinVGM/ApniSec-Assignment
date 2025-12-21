"use client";

    import { useEffect, useState, useMemo } from "react";
    import { ArrowLeft } from "lucide-react";
    import Link from "next/link";
    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
    import { Label } from "@/components/ui/label";
    import { useRouter, useSearchParams } from "next/navigation";
    import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
    import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
    import { Badge } from "@/components/ui/badge";
    import { IssueDetailModal } from "@/components/IssueDetailModal";
    import { CustomToast } from "@/components/ui/custom-toast";
    import { AnimatePresence } from "framer-motion";

    interface Issue {
    id: string;
    type: string;
    title: string;
  description: string;
  priority: string;
  status: string;
  created_at: string;
}

const DEFAULT_FORM_DATA = {
    type: "Cloud Security",
    title: "",
    description: "",
    priority: "Low",
    status: "Open"
};

import { Suspense } from "react";

function IssuesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('q') || '';

  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  
  // Create/Edit Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Delete Dialog State
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Detail Modal State
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);

  // Toast State
  const [toast, setToast] = useState<{ message: string; type: "success" | "error"; visible: boolean }>({
      message: "",
      type: "success",
      visible: false
  });

  const showToast = (message: string, type: "success" | "error" = "success") => {
      setToast({ message, type, visible: true });
  };

  useEffect(() => {
    // Debounce search could be better, but basic effect is okay for now
    const timer = setTimeout(() => {
        fetchIssues();
    }, 300);
    return () => clearTimeout(timer);
  }, [filterType, searchQuery]);

  // Sync formData when editing
  const handleEditOpen = (issue: Issue) => {
      setEditingId(issue.id);
      setFormData({
          type: issue.type,
          title: issue.title,
          description: issue.description,
          priority: issue.priority,
          status: issue.status
      });
      setIsDialogOpen(true);
  };

  const handleCreateOpen = () => {
      setEditingId(null);
      setFormData(DEFAULT_FORM_DATA);
      setIsDialogOpen(true);
  };

  const handleIssueClick = (issue: Issue) => {
      setSelectedIssue(issue);
      setIsDetailOpen(true);
  };

  const fetchIssues = async () => {
    setLoading(true);
    try {
        const params = new URLSearchParams();
        if (filterType && filterType !== "All") params.append('type', filterType);
        if (searchQuery) params.append('search', searchQuery);

        const res = await fetch(`/api/issues?${params.toString()}`);
        if (res.ok) {
            setIssues(await res.json());
        } else {
            console.error("Failed to fetch issues");
        }
    } catch (e) {
        setError("Failed to load issues");
    } finally {
        setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const url = editingId ? `/api/issues/${editingId}` : "/api/issues";
        const method = editingId ? "PUT" : "POST";

        const res = await fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            setIsDialogOpen(false);
            fetchIssues();
            setFormData(DEFAULT_FORM_DATA);
            setEditingId(null);
            showToast(editingId ? "Issue updated successfully." : "New vulnerability reported successfully.");
        } else {
            const data = await res.json();
            showToast(data.error || "Operation failed", "error");
        }
    } catch (e) {
        showToast("An unexpected error occurred.", "error");
    }
  };

  const handleDeleteClick = (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      setDeleteId(id);
      setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
      if(!deleteId) return;
      try {
          const res = await fetch(`/api/issues/${deleteId}`, { method: "DELETE" });
          if(res.ok) {
              setIssues(issues.filter(i => i.id !== deleteId));
              setIsDeleteOpen(false);
              setDeleteId(null);
              showToast("Vulnerability record permanently deleted.");
          }
      } catch(e) {
          showToast("Failed to delete record.", "error");
      }
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
    <div className="min-h-screen bg-background text-foreground p-8 font-mono relative">
       <AnimatePresence>
            {toast.visible && (
                <CustomToast 
                    message={toast.message} 
                    type={toast.type} 
                    onClose={() => setToast(prev => ({ ...prev, visible: false }))} 
                />
            )}
       </AnimatePresence>

       <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-primary/20 pb-4 gap-4">
            <div className="flex items-center gap-4">
                 <Link href="/dashboard">
                    <Button variant="ghost" size="icon" className="h-10 w-10 border border-primary/20 hover:bg-primary/10 hover:text-primary">
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                 </Link>
                 <div>
                    <h1 className="text-3xl font-bold text-primary tracking-tight">ISSUE TRACKER</h1>
                    <p className="text-muted-foreground text-xs uppercase tracking-widest mt-1">Vulnerability Management System</p>
                 </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                 <Input 
                    placeholder="SEARCH PROTOCOLS..." 
                    className="w-full md:w-[250px] bg-card border-primary/20"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} 
                 />
                 <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-full md:w-[180px] bg-card border-primary/20">
                        <SelectValue placeholder="Filter Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All Types</SelectItem>
                        <SelectItem value="Cloud Security">Cloud Security</SelectItem>
                        <SelectItem value="Reteam Assessment">Red Team</SelectItem>
                        <SelectItem value="VAPT">VAPT</SelectItem>
                    </SelectContent>
                </Select>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={handleCreateOpen} className="bg-primary text-primary-foreground font-bold shadow-[0_0_10px_rgba(34,197,94,0.4)]">
                            + NEW ISSUE
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card border-primary/20 text-foreground">
                        <DialogHeader>
                            <DialogTitle className="text-primary font-mono tracking-tight">{editingId ? 'UPDATE VULNERABILITY' : 'REPORT VULNERABILITY'}</DialogTitle>
                            <DialogDescription>{editingId ? 'Modify existing issue details.' : 'Submit a new security issue for tracking.'}</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                            <div className="grid gap-2">
                                <Label htmlFor="type">Issue Type</Label>
                                <Select value={formData.type} onValueChange={(val) => setFormData({...formData, type: val})}>
                                    <SelectTrigger id="type" className="bg-background/50 border-primary/20">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Cloud Security">Cloud Security</SelectItem>
                                        <SelectItem value="Reteam Assessment">Red Team Assessment</SelectItem>
                                        <SelectItem value="VAPT">VAPT</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="bg-background/50 border-primary/20" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="desc">Description</Label>
                                <Input id="desc" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="bg-background/50 border-primary/20" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="priority">Priority</Label>
                                     <Select value={formData.priority} onValueChange={(val) => setFormData({...formData, priority: val})}>
                                        <SelectTrigger id="priority" className="bg-background/50 border-primary/20">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Low">Low</SelectItem>
                                            <SelectItem value="Medium">Medium</SelectItem>
                                            <SelectItem value="High">High</SelectItem>
                                            <SelectItem value="Critical">Critical</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                 <div className="grid gap-2">
                                    <Label htmlFor="status">Status</Label>
                                     <Select value={formData.status} onValueChange={(val) => setFormData({...formData, status: val})}>
                                        <SelectTrigger id="status" className="bg-background/50 border-primary/20">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Open">Open</SelectItem>
                                            <SelectItem value="In Progress">In Progress</SelectItem>
                                            <SelectItem value="Resolved">Resolved</SelectItem>
                                            <SelectItem value="Closed">Closed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" className="bg-primary text-primary-foreground font-bold">
                                    {editingId ? 'UPDATE RECORD' : 'SUBMIT REPORT'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
       </header>

       <IssueDetailModal 
          isOpen={isDetailOpen} 
          onClose={() => setIsDetailOpen(false)} 
          issue={selectedIssue} 
       />

       <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
            <AlertDialogContent className="bg-card border-primary/20 text-foreground">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-destructive">CONFIRM DELETION</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently remove the vulnerability report from the database.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="border-primary/20 hover:bg-primary/10 hover:text-primary">CANCEL</AlertDialogCancel>
                    <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">DELETE RECORD</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
       </AlertDialog>

       {loading ? (
           <div className="text-center text-primary animate-pulse">Scanning Database...</div>
       ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {issues.length === 0 ? (
                   <p className="text-muted-foreground col-span-full text-center">No issues found matching parameters.</p>
               ) : (
                   issues.map(issue => (
                       <Card 
                          key={issue.id} 
                          className="border-primary/10 bg-card/50 hover:bg-card hover:border-primary/30 transition-all group cursor-pointer"
                          onClick={() => handleIssueClick(issue)}
                        >
                           <CardHeader className="pb-2">
                               <div className="flex justify-between items-start">
                                    <Badge variant="outline" className={`border-0 text-white ${getPriorityColor(issue.priority)}`}>{issue.priority}</Badge>
                                    <Badge variant="outline" className="border-primary/30 text-primary">{issue.status}</Badge>
                               </div>
                               <CardTitle className="text-lg font-bold text-foreground mt-2 truncate">{issue.title}</CardTitle>
                               <CardDescription className="font-mono text-xs">{issue.type}</CardDescription>
                           </CardHeader>
                           <CardContent>
                               <p className="text-sm text-muted-foreground line-clamp-3 mb-4 h-[60px]">
                                   {issue.description.length > 100 
                                      ? issue.description.substring(0, 100) + '...' 
                                      : issue.description}
                               </p>
                               <div className="flex justify-end gap-2 pt-2 border-t border-primary/5">
                                   <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleEditOpen(issue); }} className="text-primary hover:bg-primary/10 h-8">
                                       EDIT
                                   </Button>
                                   <Button variant="ghost" size="sm" onClick={(e) => handleDeleteClick(issue.id, e)} className="text-destructive hover:bg-destructive/10 hover:text-destructive h-8">
                                       DELETE
                                   </Button>
                               </div>
                           </CardContent>
                       </Card>
                   ))
               )}
           </div>
       )}
    </div>
  );
}

export default function IssuesPage() {
  return (
    <Suspense fallback={<div className="text-center text-primary animate-pulse mt-10">Initializing Tracker...</div>}>
      <IssuesContent />
    </Suspense>
  );
}
