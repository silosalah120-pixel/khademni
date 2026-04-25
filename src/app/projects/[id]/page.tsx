'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Clock, 
  DollarSign, 
  Calendar, 
  Tag, 
  ShieldCheck, 
  Send,
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Project } from '../../../types';
import { MOCK_PROJECTS } from '@/lib/mockData';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const { user, profile } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [offerData, setOfferData] = useState({
    price: '',
    deliveryTime: '',
    message: ''
  });

  useEffect(() => {
    // In a real app, fetch from Firestore
    // For now, use mock data
    const foundProject = MOCK_PROJECTS.find(p => p.id === id);
    if (foundProject) {
      setProject(foundProject);
    }
    setLoading(false);
  }, [id]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to apply');
      return;
    }

    setSubmitting(true);
    try {
      // Mock Firestore submission
      await addDoc(collection(db, 'offers'), {
        projectId: id,
        projectTitle: project?.title,
        freelancerId: user.uid,
        freelancerName: profile?.name,
        freelancerPhoto: profile?.photoURL,
        price: Number(offerData.price),
        deliveryTime: offerData.deliveryTime,
        message: offerData.message,
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      toast.success('Proposal submitted successfully!');
      setShowOfferForm(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit proposal');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!project) return <div>Project not found</div>;

  const isOwner = user?.uid === project.ownerId;

  return (
    <div className="min-h-screen bg-secondary/10 pb-20">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-8">
            <div className="bg-card rounded-3xl p-8 shadow-xl border border-border/50">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-none font-bold uppercase text-[10px] px-3">
                  {project.category}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Posted on {new Date().toLocaleDateString()}
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold font-heading mb-6">{project.title}</h1>
              
              <div className="flex flex-wrap gap-8 py-6 border-y mb-8">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Budget</div>
                    <div className="font-bold">{project.budget} DZD</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Delivery</div>
                    <div className="font-bold">{project.deliveryTime}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center">
                    <Send className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Proposals</div>
                    <div className="font-bold">{project.offerCount}</div>
                  </div>
                </div>
              </div>

              <div className="prose prose-blue dark:prose-invert max-w-none">
                <h3 className="text-xl font-bold font-heading mb-4">Description</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Offer Form */}
            {user && !isOwner && !showOfferForm && (
              <Button 
                onClick={() => setShowOfferForm(true)}
                className="w-full md:w-auto h-14 px-12 rounded-2xl font-bold text-lg shadow-lg shadow-primary/20"
              >
                Apply to this Project
              </Button>
            )}

            {showOfferForm && (
              <Card className="border-none shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                <CardHeader className="bg-primary text-primary-foreground">
                  <CardTitle className="text-2xl font-heading">Submit your proposal</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleApply} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="price">Your Price (DZD)</Label>
                        <Input 
                          id="price" 
                          type="number" 
                          placeholder="45000" 
                          className="h-12 rounded-xl"
                          required
                          value={offerData.price}
                          onChange={(e) => setOfferData({...offerData, price: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="delivery">Delivery Time</Label>
                        <Input 
                          id="delivery" 
                          placeholder="e.g. 10 days" 
                          className="h-12 rounded-xl"
                          required
                          value={offerData.deliveryTime}
                          onChange={(e) => setOfferData({...offerData, deliveryTime: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Cover Letter / Proposal</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Explain why you're the best fit for this project..." 
                        className="min-h-[150px] rounded-xl resize-none"
                        required
                        value={offerData.message}
                        onChange={(e) => setOfferData({...offerData, message: e.target.value})}
                      />
                    </div>
                    <div className="flex gap-4">
                      <Button 
                        type="submit" 
                        className="h-12 px-10 rounded-xl font-bold shadow-lg shadow-primary/20"
                        disabled={submitting}
                      >
                        {submitting ? "Submitting..." : "Send Proposal"}
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="h-12 px-8 rounded-xl font-bold" 
                        onClick={() => setShowOfferForm(false)}
                        type="button"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-[350px] space-y-8">
            <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-secondary/50">
                <CardTitle className="text-lg font-heading">About the Client</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={project.ownerPhoto} />
                    <AvatarFallback>{project.ownerName?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold">{project.ownerName}</h4>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <ShieldCheck className="h-3 w-3 text-emerald-500" />
                      Verified Client
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Member since</span>
                    <span className="font-bold">April 2024</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Projects posted</span>
                    <span className="font-bold">12</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Hire rate</span>
                    <span className="font-bold">85%</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-8 rounded-xl font-bold h-11 gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Contact Client
                </Button>
              </CardContent>
            </Card>

            <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10">
              <h3 className="font-bold font-heading mb-4 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Trust & Safety
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your payments are secure with KhadimDZ Escrow. Funds are released only after you approve the work.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
