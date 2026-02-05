"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowLeft, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error("Failed to send reset link");
      }

      setSubmitted(true);
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground relative overflow-hidden p-4 font-mono">
       <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-5 pointer-events-none" />
       
       <Card className="z-10 w-full max-w-md border-primary/20 bg-card shadow-[0_0_15px_rgba(34,197,94,0.1)]">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
             <ShieldAlert className="h-8 w-8 text-primary" />
             <span className="text-xl font-bold tracking-tighter text-primary">CYBER<span className="text-foreground">-GM</span></span>
          </div>
          <CardTitle className="text-xl text-primary font-bold">RECOVER ACCESS</CardTitle>
          <CardDescription className="text-muted-foreground">Enter your secure comms channel (email) to receive a reset link.</CardDescription>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="text-center space-y-4">
              <div className="p-4 border border-primary/20 bg-primary/5 rounded-md text-sm text-foreground">
                <p>If an account matches <strong>{email}</strong>, a secure link has been transmitted.</p>
                <p className="mt-2 text-xs text-muted-foreground">Check your inbox and spam folder. Link expires in 15 minutes.</p>
              </div>
              <Button asChild className="w-full bg-primary/10 text-primary border border-primary/50 hover:bg-primary/20">
                 <Link href="/login">RETURN TO LOGIN</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-destructive border border-destructive/20 bg-destructive/10 rounded font-bold">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-primary/80">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="agent@cyber-gm.com"
                  className="bg-background/50 border-primary/30 focus-visible:ring-primary/50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
                disabled={loading}
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "SEND RESET LINK"}
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-center border-t border-primary/10 pt-4">
            <Link href="/login" className="flex items-center text-xs text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="mr-2 h-3 w-3" /> BACK TO LOGIN
            </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
