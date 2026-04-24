'use client';

import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, 
  Handshake, 
  MessageSquare, 
  Star, 
  Wallet, 
  Plus,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { MOCK_PROJECTS } from '@/lib/mockData';

export default function DashboardPage() {
  const { profile, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-secondary/20">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-bold font-heading mb-2">Welcome back, {profile?.name}!</h1>
            <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your projects today.</p>
          </div>
          <Link href="/projects/new">
            <Button className="rounded-xl gap-2 h-11 px-6 font-bold shadow-lg shadow-primary/20">
              <Plus className="h-5 w-5" />
              Post a New Project
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Stats Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-none shadow-xl bg-primary text-primary-foreground overflow-hidden relative">
              <div className="absolute -right-4 -bottom-4 opacity-20">
                <Wallet className="h-32 w-32" />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium opacity-90 font-heading">Total Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-heading">0.00 DZD</div>
                <div className="mt-4 flex flex-col gap-2 text-sm opacity-90">
                  <div className="flex justify-between">
                    <span>Pending:</span>
                    <span className="font-bold">0.00 DZD</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Withdrawable:</span>
                    <span className="font-bold">0.00 DZD</span>
                  </div>
                </div>
                <Button variant="secondary" className="w-full mt-6 rounded-xl font-bold text-primary">
                  Withdraw Funds
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-heading">Profile Strength</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-muted-foreground">Trust Score</span>
                    <span className="font-bold">{profile?.trustScore}%</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-500" 
                      style={{ width: `${profile?.trustScore}%` }} 
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-xs font-medium">
                    {profile?.emailVerified ? (
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                    )}
                    Email Verified
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium">
                    {profile?.phoneVerified ? (
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                    )}
                    Phone Verified
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="projects" className="w-full">
              <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-auto p-0 gap-8 mb-8">
                <TabsTrigger 
                  value="projects" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-4 font-bold text-base"
                >
                  <Briefcase className="h-4 w-4 mr-2" />
                  My Projects
                </TabsTrigger>
                <TabsTrigger 
                  value="offers"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-4 font-bold text-base"
                >
                  <Handshake className="h-4 w-4 mr-2" />
                  My Offers
                </TabsTrigger>
                <TabsTrigger 
                  value="orders"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-4 font-bold text-base"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  My Orders
                </TabsTrigger>
                <TabsTrigger 
                  value="messages"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-4 font-bold text-base"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Messages
                </TabsTrigger>
              </TabsList>

              <TabsContent value="projects" className="mt-0">
                <div className="grid gap-4">
                  {MOCK_PROJECTS.slice(0, 2).map((project) => (
                    <Card key={project.id} className="hover:shadow-md transition-shadow border-none shadow-sm">
                      <CardContent className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="rounded-md uppercase text-[10px] tracking-wider font-bold">
                              {project.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">• Posted 2 days ago</span>
                          </div>
                          <h3 className="text-xl font-bold font-heading mb-2">{project.title}</h3>
                          <div className="flex items-center gap-4 text-sm font-medium">
                            <span className="text-primary">{project.budget} DZD</span>
                            <span className="text-muted-foreground">{project.offerCount} applicants</span>
                          </div>
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                          <Button variant="outline" className="flex-1 md:flex-none rounded-xl font-bold">
                            View Applicants
                          </Button>
                          <Button className="flex-1 md:flex-none rounded-xl font-bold">
                            Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {MOCK_PROJECTS.length === 0 && (
                    <div className="text-center py-20 bg-card rounded-2xl border-2 border-dashed">
                      <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                      <h3 className="text-lg font-bold mb-1">No projects yet</h3>
                      <p className="text-muted-foreground mb-6">Post your first project to start hiring.</p>
                      <Button asChild className="rounded-xl font-bold">
                        <Link href="/projects/new">Post a Project</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="offers">
                <div className="text-center py-20 bg-card rounded-2xl border-2 border-dashed">
                  <Handshake className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                  <h3 className="text-lg font-bold mb-1">No active offers</h3>
                  <p className="text-muted-foreground mb-6">Browse projects and submit your first proposal.</p>
                  <Button asChild className="rounded-xl font-bold">
                    <Link href="/projects">Browse Projects</Link>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="orders">
                {/* Empty State Mockup */}
                <div className="text-center py-20 bg-card rounded-2xl border-2 border-dashed">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                  <h3 className="text-lg font-bold mb-1">No orders in progress</h3>
                  <p className="text-muted-foreground mb-6">Hire someone or get hired to see orders here.</p>
                </div>
              </TabsContent>

              <TabsContent value="messages">
                <Card className="border-none shadow-sm overflow-hidden">
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {[1, 2].map((i) => (
                        <div key={i} className="p-6 flex gap-4 hover:bg-secondary/50 cursor-pointer transition-colors">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-1">
                              <h4 className="font-bold truncate">Mohamed Amine</h4>
                              <span className="text-xs text-muted-foreground">10:45 AM</span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              Hello Ahmed! I have checked your project requirements and I am very interested...
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
