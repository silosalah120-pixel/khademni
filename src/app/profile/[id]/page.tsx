'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Star, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Mail, 
  Phone,
  ShieldCheck,
  Briefcase,
  Trophy,
  ExternalLink,
  MessageSquare,
  Loader2
} from 'lucide-react';
import { UserProfile } from '../../../types';
import { MOCK_FREELANCERS } from '@/lib/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function ProfilePage() {
  const { id } = useParams();
  const { user, profile: authProfile } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      
      // 1. Check if it's the current user
      if (user && user.uid === id && authProfile) {
        setProfile(authProfile);
        setLoading(false);
        return;
      }

      // 2. Try fetching from Firestore
      try {
        const docRef = doc(db, 'users', id as string);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }

      // 3. Fallback to Mock Data
      const found = MOCK_FREELANCERS.find(f => f.uid === id);
      if (found) {
        setProfile(found);
      } else {
        setProfile(null);
      }
      
      setLoading(false);
    }

    if (id) {
      fetchProfile();
    }
  }, [id, user, authProfile]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Profile Not Found</h1>
          <p className="text-muted-foreground mb-8">The freelancer profile you are looking for does not exist or has been removed.</p>
          <Button asChild>
            <a href="/freelancers">Browse Freelancers</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/10 pb-20">
      <Navbar />
      
      {/* Profile Header Background */}
      <div className="h-64 bg-primary relative">
        <div className="absolute inset-0 bg-black/20" />
        <div className="premium-gradient absolute inset-0 opacity-40" />
      </div>

      <main className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-[400px] space-y-6">
            <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-card/80 backdrop-blur-xl">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl scale-110" />
                    <Avatar className="h-44 w-44 border-8 border-background shadow-2xl relative z-10">
                      <AvatarImage src={profile.photoURL} />
                      <AvatarFallback className="text-4xl">{profile.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {profile.isVerified && (
                      <div className="absolute bottom-2 right-2 bg-primary rounded-full p-2 z-20 shadow-lg border-4 border-background">
                        <CheckCircle2 className="h-6 w-6 text-white" />
                      </div>
                    )}
                  </div>

                  <h1 className="text-4xl font-black font-heading mb-2 tracking-tight">{profile.name}</h1>
                  <p className="text-muted-foreground font-bold mb-8 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" /> Algiers, Algeria
                  </p>

                  <div className="grid grid-cols-2 w-full gap-4 mb-8">
                    <div className="bg-secondary/50 rounded-[2rem] p-5 border border-border/50">
                      <div className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Rating</div>
                      <div className="flex items-center justify-center gap-1">
                        <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                        <span className="text-2xl font-black">{profile.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="bg-secondary/50 rounded-[2rem] p-5 border border-border/50">
                      <div className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Trust Score</div>
                      <div className="flex items-center justify-center gap-1 text-emerald-600 dark:text-emerald-400">
                        <ShieldCheck className="h-5 w-5" />
                        <span className="text-2xl font-black">{profile.trustScore}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full space-y-4 mb-8">
                    <Button className="w-full h-14 rounded-2xl font-black text-lg gap-2 shadow-xl shadow-primary/20 premium-gradient">
                      <MessageSquare className="h-5 w-5" />
                      Hire Me
                    </Button>
                    <Button variant="outline" className="w-full h-14 rounded-2xl font-bold border-2">
                      Contact
                    </Button>
                  </div>

                  <div className="w-full border-t border-border/50 pt-8 space-y-4 text-sm font-bold">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" /> Joined
                      </div>
                      <span>April 2024</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Trophy className="h-4 w-4" /> Completed
                      </div>
                      <span>{profile.completedProjects} projects</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl rounded-[3rem] bg-card/80 backdrop-blur-xl">
              <CardHeader className="pt-8 px-8 pb-0">
                <CardTitle className="text-xl font-black font-heading">Verifications</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-secondary/50 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <span className="text-sm font-bold">Email Address</span>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-secondary/50 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <span className="text-sm font-bold">Phone Number</span>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-secondary/50 flex items-center justify-center">
                      <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <span className="text-sm font-bold">Identity Verified</span>
                  </div>
                  <div className="text-[10px] font-black text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">PENDING</div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            <Card className="border-none shadow-xl rounded-[3rem] overflow-hidden bg-card/80 backdrop-blur-xl">
              <CardContent className="p-10">
                <Tabs defaultValue="about" className="w-full">
                  <TabsList className="w-full justify-start bg-transparent border-b border-border/50 rounded-none h-auto p-0 gap-12 mb-10">
                    <TabsTrigger value="about" className="rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-5 font-black text-xl transition-all">
                      About
                    </TabsTrigger>
                    <TabsTrigger value="portfolio" className="rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-5 font-black text-xl transition-all">
                      Portfolio
                    </TabsTrigger>
                    <TabsTrigger value="reviews" className="rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-5 font-black text-xl transition-all">
                      Reviews ({profile.reviewCount})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="about" className="space-y-12 mt-0">
                    <div>
                      <h3 className="text-2xl font-black font-heading mb-6 flex items-center gap-3">
                        <div className="h-8 w-1 bg-primary rounded-full" />
                        Biography
                      </h3>
                      <p className="text-muted-foreground leading-loose text-lg">
                        {profile.bio || "No biography provided."}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-black font-heading mb-6 flex items-center gap-3">
                        <div className="h-8 w-1 bg-primary rounded-full" />
                        Professional Skills
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {profile.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="px-6 py-2.5 rounded-2xl font-bold text-sm bg-secondary/80 border border-border/50 hover:border-primary/30 transition-all">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="portfolio" className="mt-0">
                    <div className="grid md:grid-cols-2 gap-8">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="group cursor-pointer">
                          <div className="aspect-[16/10] rounded-[2.5rem] bg-secondary relative overflow-hidden mb-5 shadow-inner">
                            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
                              <ExternalLink className="h-10 w-10 text-white" />
                            </div>
                          </div>
                          <h4 className="font-black text-xl mb-1 group-hover:text-primary transition-colors">Digital Product Design {i}</h4>
                          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Mobile & Web App</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="reviews" className="mt-0">
                    <div className="space-y-10">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-6 p-6 rounded-[2.5rem] bg-secondary/30 border border-border/50">
                          <Avatar className="h-14 w-14 border-2 border-background shadow-md">
                            <AvatarFallback className="font-bold">C</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-3">
                            <div className="flex justify-between items-center">
                              <h4 className="font-black text-lg">Elite Client {i}</h4>
                              <div className="flex gap-1 bg-amber-400/10 px-3 py-1 rounded-full">
                                {[1, 2, 3, 4, 5].map((s) => (
                                  <Star key={s} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                                ))}
                              </div>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                              "Working with {profile.name.split(' ')[0]} was an absolute pleasure. Their attention to detail and professional communication is top-tier. The project exceeded our expectations in every way."
                            </p>
                            <div className="flex items-center gap-2 pt-2">
                              <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Delivered on Time</span>
                              <div className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                              <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">2 months ago</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
