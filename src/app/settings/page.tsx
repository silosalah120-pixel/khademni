'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { db, storage } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'sonner';
import { User, Mail, Camera, Save, Shield, Bell, CreditCard, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function SettingsPage() {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    skills: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        bio: profile.bio || '',
        skills: profile.skills?.join(', ') || '',
      });
      setPreviewUrl(profile.photoURL || null);
    }
  }, [profile]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      let photoURL = profile?.photoURL;

      if (imageFile) {
        const storageRef = ref(storage, `avatars/${user.uid}`);
        await uploadBytes(storageRef, imageFile);
        photoURL = await getDownloadURL(storageRef);
      }

      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        name: formData.name,
        bio: formData.bio,
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s !== ''),
        photoURL,
      });

      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary/10 pb-20">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl font-black font-heading mb-2">Settings</h1>
            <p className="text-muted-foreground font-bold">Manage your account preferences and profile information.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <aside className="md:col-span-1 space-y-2">
              <Button variant="secondary" className="w-full justify-start gap-3 rounded-xl h-12 font-bold bg-primary/10 text-primary border-none">
                <User className="h-4 w-4" /> Profile
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl h-12 font-bold text-muted-foreground hover:text-foreground">
                <Shield className="h-4 w-4" /> Security
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl h-12 font-bold text-muted-foreground hover:text-foreground">
                <Bell className="h-4 w-4" /> Notifications
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl h-12 font-bold text-muted-foreground hover:text-foreground">
                <CreditCard className="h-4 w-4" /> Payments
              </Button>
            </aside>

            <div className="md:col-span-3 space-y-8">
              <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-card/80 backdrop-blur-xl">
                <CardHeader className="p-8 pb-0">
                  <CardTitle className="text-2xl font-black font-heading">Public Profile</CardTitle>
                  <CardDescription className="font-bold">This information will be displayed publicly to other users.</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="flex flex-col sm:flex-row items-center gap-8 bg-secondary/30 p-6 rounded-[2rem] border border-border/50">
                      <div className="relative group">
                        <Avatar className="h-32 w-32 border-4 border-background shadow-2xl">
                          <AvatarImage src={previewUrl || undefined} />
                          <AvatarFallback className="text-3xl font-black">{formData.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <label 
                          htmlFor="avatar-upload" 
                          className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity backdrop-blur-sm"
                        >
                          <Camera className="h-8 w-8" />
                        </label>
                        <input 
                          id="avatar-upload" 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleImageChange}
                        />
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h4 className="font-black text-xl mb-1">Profile Photo</h4>
                        <p className="text-sm text-muted-foreground font-medium mb-4">
                          Upload a professional photo to build trust with clients.
                        </p>
                        <Button type="button" variant="outline" size="sm" className="rounded-full font-bold px-6" onClick={() => document.getElementById('avatar-upload')?.click()}>
                          Change Photo
                        </Button>
                      </div>
                    </div>

                    <div className="grid gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="name" className="text-sm font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</Label>
                        <Input 
                          id="name" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Your Name"
                          className="h-14 rounded-2xl bg-secondary/50 border-none px-6 font-bold focus-visible:ring-primary/20"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="skills" className="text-sm font-black uppercase tracking-widest text-muted-foreground ml-1">Professional Skills (comma separated)</Label>
                        <Input 
                          id="skills" 
                          value={formData.skills}
                          onChange={(e) => setFormData({...formData, skills: e.target.value})}
                          placeholder="React, Design, Marketing..."
                          className="h-14 rounded-2xl bg-secondary/50 border-none px-6 font-bold focus-visible:ring-primary/20"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="bio" className="text-sm font-black uppercase tracking-widest text-muted-foreground ml-1">Bio</Label>
                        <Textarea 
                          id="bio" 
                          rows={5}
                          value={formData.bio}
                          onChange={(e) => setFormData({...formData, bio: e.target.value})}
                          placeholder="Tell us about yourself and your expertise..."
                          className="rounded-[2rem] bg-secondary/50 border-none p-6 font-medium focus-visible:ring-primary/20"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button type="submit" disabled={loading} className="h-14 px-10 rounded-2xl font-black text-lg gap-2 premium-gradient shadow-xl shadow-primary/20 min-w-[200px]">
                        {loading ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          <Save className="h-5 w-5" />
                        )}
                        {loading ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-card/80 backdrop-blur-xl">
                <CardHeader className="p-8 pb-0">
                  <CardTitle className="text-2xl font-black font-heading">Account Email</CardTitle>
                  <CardDescription className="font-bold">Your primary contact email address.</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 bg-secondary/30 p-6 rounded-[2rem] border border-border/50">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold">{user?.email}</p>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Verified Primary Email</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
