"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface UserProfile {
  full_name?: string;
  role?: string;
  bio?: string;
  location?: string;
  status?: string;
  email: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/users/profile");
      if (res.ok) {
        setProfile(await res.json());
      } else {
        router.push("/login");
      }
    } catch (e) {
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!profile) return;
    setProfile({ ...profile, [e.target.id]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (res.ok) {
        setSuccess("Profile updated successfully");
      } else {
        const data = await res.json();
        setError(data.error || "Update failed");
      }
    } catch (e) {
      setError("An unexpected error occurred");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
     return <div className="min-h-screen bg-background flex items-center justify-center font-mono text-primary">LOADING DATA STREAM...</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 flex items-center justify-center relative overflow-hidden font-mono">
       <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
       
       <Card className="w-full max-w-2xl border-primary/20 shadow-[0_0_15px_rgba(34,197,94,0.1)] bg-card z-10">
        <CardHeader className="border-b border-primary/10">
          <CardTitle className="text-2xl font-bold tracking-tight text-primary">
            OPERATIVE PROFILE
          </CardTitle>
          <CardDescription className="text-muted-foreground/80 uppercase tracking-widest text-xs">
            Manage Identity & Status
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-primary/70 text-xs uppercase">Identifier (Read Only)</Label>
                    <Input id="email" value={profile?.email || ""} disabled className="bg-muted/10 border-primary/10 text-muted-foreground cursor-not-allowed" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="role" className="text-primary/70 text-xs uppercase">Clearance Role</Label>
                    <Input id="role" value={profile?.role || ""} onChange={handleChange} className="bg-background/50 border-primary/30 focus-visible:ring-primary/50" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="full_name" className="text-primary/70 text-xs uppercase">Full Designation</Label>
                    <Input id="full_name" value={profile?.full_name || ""} onChange={handleChange} className="bg-background/50 border-primary/30 focus-visible:ring-primary/50" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="location" className="text-primary/70 text-xs uppercase">Current Sector</Label>
                    <Input id="location" value={profile?.location || ""} onChange={handleChange} className="bg-background/50 border-primary/30 focus-visible:ring-primary/50" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="status" className="text-primary/70 text-xs uppercase">Operational Status</Label>
                    <Input id="status" value={profile?.status || ""} onChange={handleChange} className="bg-background/50 border-primary/30 focus-visible:ring-primary/50" />
                </div>
                 <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio" className="text-primary/70 text-xs uppercase">Mission Brief / Bio</Label>
                    <Input id="bio" value={profile?.bio || ""} onChange={handleChange} className="bg-background/50 border-primary/30 focus-visible:ring-primary/50" />
                </div>
            </div>

            {error && (
              <div className="text-destructive text-sm text-center font-bold p-2 border border-destructive/20 bg-destructive/10">
                ⚠ {error}
              </div>
            )}
             {success && (
              <div className="text-primary text-sm text-center font-bold p-2 border border-primary/20 bg-primary/10">
                ✓ {success}
              </div>
            )}

            <div className="flex gap-4 pt-4">
                 <Button type="button" variant="outline" onClick={() => router.push('/dashboard')} className="flex-1 border-primary/30 hover:bg-primary/10">
                    CANCEL
                </Button>
                <Button type="submit" disabled={saving} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                    {saving ? "UPDATING..." : "SAVE CHANGES"}
                </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
