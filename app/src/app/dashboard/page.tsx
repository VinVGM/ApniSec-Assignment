"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8 font-mono">
        <div className="max-w-7xl mx-auto space-y-8">
            <header className="flex justify-between items-center border-b border-primary/20 pb-4">
                <h1 className="text-3xl font-bold text-primary tracking-tight">COMMAND CENTER</h1>
                <Button 
                    onClick={handleLogout} 
                    variant="outline"
                    className="border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                    TERMINATE SESSION
                </Button>
            </header>
            
            <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card border border-primary/10 p-6 rounded-lg shadow-sm">
                    <h2 className="text-lg font-bold text-primary mb-2">SYSTEM STATUS</h2>
                    <p className="text-muted-foreground">ALL SYSTEMS OPERATIONAL</p>
                </div>
                 <div className="bg-card border border-primary/10 p-6 rounded-lg shadow-sm">
                    <h2 className="text-lg font-bold text-primary mb-2">THREAT LEVEL</h2>
                     <p className="text-green-500 font-bold">LOW</p>
                </div>
                 <div className="bg-card border border-primary/10 p-6 rounded-lg shadow-sm">
                    <h2 className="text-lg font-bold text-primary mb-2">ACTIVE NODES</h2>
                    <p className="text-primary font-mono text-2xl">42</p>
                </div>
            </main>
        </div>
    </div>
  );
}
