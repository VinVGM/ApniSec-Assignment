"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [full_name, setFullName] = useState("");
  const [designation, setDesignation] = useState("");
  const [sector, setSector] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, full_name, designation, sector }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Decorative Grid Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <Card className="w-full max-w-md border-primary/20 shadow-[0_0_15px_rgba(34,197,94,0.1)] bg-card z-10">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold tracking-tight text-primary font-mono">
            NEW ACCOUNT
          </CardTitle>
          <CardDescription className="text-muted-foreground/80 font-mono text-xs uppercase tracking-widest">
            Create LOGIN Credentials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full_name" className="font-mono text-primary/80">Full Name</Label>
              <Input
                id="full_name"
                type="text"
                placeholder="Agent Name"
                value={full_name}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="bg-background/50 border-primary/30 focus-visible:ring-primary/50 font-mono placeholder:text-muted-foreground/50"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="designation" className="font-mono text-primary/80">Designation</Label>
                <Input
                    id="designation"
                    type="text"
                    placeholder="Role"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    required
                    className="bg-background/50 border-primary/30 focus-visible:ring-primary/50 font-mono placeholder:text-muted-foreground/50"
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="sector" className="font-mono text-primary/80">Location</Label>
                <Input
                    id="sector"
                    type="text"
                    placeholder="Unit/Dept"
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    required
                    className="bg-background/50 border-primary/30 focus-visible:ring-primary/50 font-mono placeholder:text-muted-foreground/50"
                />
                </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-mono text-primary/80">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="agent@apnisec.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background/50 border-primary/30 focus-visible:ring-primary/50 font-mono placeholder:text-muted-foreground/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="font-mono text-primary/80">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-background/50 border-primary/30 focus-visible:ring-primary/50 font-mono"
              />
            </div>
            {error && (
              <div className="text-destructive text-sm text-center font-bold font-mono p-2 border border-destructive/20 bg-destructive/10">
                ⚠ {error}
              </div>
            )}
            <Button 
                type="submit" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-mono font-bold tracking-wide uppercase transition-all shadow-[0_0_10px_rgba(34,197,94,0.5)] hover:shadow-[0_0_20px_rgba(34,197,94,0.7)]" 
                disabled={loading}
            >
              {loading ? "REGISTERING..." : "REGISTER"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-primary/10 pt-4">
          <p className="text-xs text-muted-foreground font-mono">
           ALREADY ACTIVE? <a href="/login" className="text-primary hover:underline hover:text-primary/80 transition-colors">LOGIN HERE</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
