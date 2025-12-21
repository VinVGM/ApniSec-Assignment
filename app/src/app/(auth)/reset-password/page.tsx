"use client";

import { useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setErrorMsg("Passwords do not match");
            setStatus("error");
            return;
        }

        if (password.length < 6) {
            setErrorMsg("Password must be at least 6 characters");
            setStatus("error");
            return;
        }

        if (!token) {
            setErrorMsg("Invalid or missing reset token");
            setStatus("error");
            return;
        }

        setLoading(true);
        setStatus("idle");
        setErrorMsg("");

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to reset password");
            }

            setStatus("success");
            setTimeout(() => router.push("/login"), 3000);
        } catch (err: any) {
            setErrorMsg(err.message || "An error occurred");
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return (
             <div className="text-center text-red-400">
                <p>Invalid Request. Token is missing.</p>
                <Link href="/login" className="text-primary underline mt-2 inline-block">Return to Login</Link>
             </div>
        );
    }

    if (status === "success") {
        return (
             <div className="text-center space-y-4 animate-in fade-in zoom-in duration-300">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 border border-green-500/20">
                    <Lock className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-lg font-bold text-white">CREDENTIALS UPDATED</h3>
                <p className="text-sm text-gray-400">Your password has been successfully reset. Redirecting to login...</p>
                <Button asChild className="w-full bg-primary text-black font-bold">
                    <Link href="/login">LOGIN NOW</Link>
                </Button>
             </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
             {status === 'error' && (
                <div className="p-3 text-sm text-destructive border border-destructive/20 bg-destructive/10 rounded font-bold">
                  {errorMsg}
                </div>
              )}

             <div className="space-y-2">
                <Label htmlFor="pass" className="text-primary/80">New Password</Label>
                <Input
                  id="pass"
                  type="password"
                  placeholder="••••••••"
                  className="bg-background/50 border-primary/30 focus-visible:ring-primary/50"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm" className="text-primary/80">Confirm Password</Label>
                <Input
                  id="confirm"
                  type="password"
                  placeholder="••••••••"
                  className="bg-background/50 border-primary/30 focus-visible:ring-primary/50"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
                disabled={loading}
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "UPDATE CREDENTIALS"}
              </Button>
        </form>
    );
}

export default function ResetPasswordPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground relative overflow-hidden p-4 font-mono">
       <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-5 pointer-events-none" />
       
       <Card className="z-10 w-full max-w-md border-primary/20 bg-card shadow-[0_0_15px_rgba(34,197,94,0.1)]">
        <CardHeader>
           <CardTitle className="text-xl text-primary text-center font-bold">SET NEW PASSWORD</CardTitle>
           <CardDescription className="text-center text-muted-foreground">Create a new secure access key.</CardDescription>
        </CardHeader>
        <CardContent>
            <Suspense fallback={<div className="text-center text-primary animate-pulse">Initializing Security Protocols...</div>}>
                <ResetPasswordForm />
            </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
