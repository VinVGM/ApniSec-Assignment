"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Issue {
  id: string;
  type: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  created_at?: string;
}

interface IssueDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  issue: Issue | null;
}

export function IssueDetailModal({ isOpen, onClose, issue }: IssueDetailModalProps) {
  if (!issue) return null;

  const getPriorityColor = (p: string) => {
      switch(p) {
          case 'Critical': return 'bg-red-500';
          case 'High': return 'bg-orange-500';
          case 'Medium': return 'bg-yellow-500';
          default: return 'bg-primary/80';
      }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-primary/20 text-foreground max-w-2xl">
        <DialogHeader>
          <div className="flex justify-between mt-5 items-start gap-4">
              <div>
                  <DialogTitle className="text-2xl font-bold text-primary tracking-tight">{issue.title}</DialogTitle>
                  <p className="text-muted-foreground text-sm font-mono mt-1">{issue.type}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                  <Badge className={`${getPriorityColor(issue.priority)} text-white border-0`}>{issue.priority}</Badge>
                  <Badge variant="outline" className="border-primary/30 text-primary">{issue.status}</Badge>
              </div>
          </div>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] mt-4 pr-4">
            <div className="space-y-4">
                <div>
                    <h3 className="text-sm font-bold text-muted-foreground mb-1 uppercase tracking-wider">Description</h3>
                    <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">{issue.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary/10">
                    <div>
                        <h3 className="text-xs font-bold text-muted-foreground mb-1 uppercase">Reference ID</h3>
                        <p className="font-mono text-sm">{issue.id}</p>
                    </div>
                     <div>
                        <h3 className="text-xs font-bold text-muted-foreground mb-1 uppercase">Reported Date</h3>
                        <p className="font-mono text-sm">{issue.created_at ? new Date(issue.created_at).toLocaleDateString() : 'N/A'}</p>
                    </div>
                </div>
            </div>
        </ScrollArea>

        
      </DialogContent>
    </Dialog>
  );
}
