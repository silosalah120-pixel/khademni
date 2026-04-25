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
  MessageSquare
} from 'lucide-react';
import { UserProfile } from '../../../types';
import { MOCK_FREELANCERS } from '@/lib/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ProfilePage() {
  const { id } = useParams();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock fetch
    const found = MOCK_FREELANCERS.find(f => f.uid === id);
    if (found) {
      setProfile(found);
    }
    setLoading(false);
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>Profile not found</div>;

  return (
    <div className="min-h-screen bg-secondary/10 pb-20">
      <Navbar />
      
      {/* Profile Header Background */}
      <div className="h-64 bg-primary relative">
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <main className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-[400px] space-y-6">
            <Card className="border-none shadow-2xl rounded-[2rem] overflow-hidden">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <Avatar className="h-40 w-40 border-8 border-background shadow-xl">
                      <AvatarImage src={profile.photoURL} />
                      <AvatarFallback className="text-4xl">{profile.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {profile.isVerified && (
                      <div className="absolute bottom-2 right-2 bg-background rounded-full p-1">
                        <CheckCircle2 className="h-10 w-10 text-primary fill-primary text-white" />
                      </div>
                    )}
                  </div>

                  <h1 className="text-3xl font-bold font-heading mb-2">{profile.name}</h1>
                  <p className="text-muted-foreground font-medium mb-6 flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> Algiers, Algeria
                  </p>

                  <div className="grid grid-cols-2 w-full gap-4 mb-8">
                    <div className="bg-secondary/50 rounded-2xl p-4">
                      <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Rating</div>
                      <div className="flex items-center justify-center gap-1">
                        <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                        <span className="text-xl font-bold">{profile.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="bg-secondary/50 rounded-2xl p-4">
                      <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Trust Score</div>
                      <div className="flex items-center justify-center gap-1 text-emerald-600 dark:text-emerald-400">
                        <ShieldCheck className="h-5 w-5" />
                        <span className="text-xl font-bold">{profile.trustScore}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full space-y-4 mb-8">
                    <Button className="w-full h-12 rounded-xl font-bold text-lg gap-2 shadow-lg shadow-primary/20">
                      <MessageSquare className="h-5 w-5" />
                      Hire Me
                    </Button>
                    <Button variant="outline" className="w-full h-12 rounded-xl font-bold">
                      Contact
                    </Button>
                  </div>

                  <div className="w-full border-t pt-6 space-y-4 text-sm font-medium">
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

            <Card className="border-none shadow-xl rounded-[2rem]">
              <CardHeader>
                <CardTitle className="text-xl font-heading">Verifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Email Address</span>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Phone Number</span>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Identity Verified</span>
                  </div>
                  <div className="text-xs font-bold text-amber-500">PENDING</div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            <Card className="border-none shadow-xl rounded-[2rem]">
              <CardContent className="p-10">
                <Tabs defaultValue="about" className="w-full">
                  <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-auto p-0 gap-10 mb-8">
                    <TabsTrigger value="about" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-4 font-bold text-lg">
                      About
                    </TabsTrigger>
                    <TabsTrigger value="portfolio" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-4 font-bold text-lg">
                      Portfolio
                    </TabsTrigger>
                    <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-4 font-bold text-lg">
                      Reviews ({profile.reviewCount})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="about" className="space-y-8 mt-0">
                    <div>
                      <h3 className="text-xl font-bold font-heading mb-4">Biography</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {profile.bio || "No biography provided."}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold font-heading mb-4">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="px-4 py-1.5 rounded-full font-medium">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="portfolio" className="mt-0">
                    <div className="grid md:grid-cols-2 gap-6">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="group cursor-pointer">
                          <div className="aspect-video rounded-3xl bg-secondary relative overflow-hidden mb-3">
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <ExternalLink className="h-8 w-8 text-white" />
                            </div>
                          </div>
                          <h4 className="font-bold">Project Title {i}</h4>
                          <p className="text-sm text-muted-foreground">Mobile App Development</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="reviews" className="mt-0">
                    <div className="space-y-8">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback>C</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <div className="flex justify-between items-center">
                              <h4 className="font-bold">Client Name</h4>
                              <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map((s) => (
                                  <Star key={s} className="h-3 w-3 fill-amber-400 text-amber-400" />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              "Excellent work! Mohamed is very professional and delivered the project on time. Highly recommended."
                            </p>
                            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">2 months ago</span>
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
