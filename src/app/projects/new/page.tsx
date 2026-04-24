'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, DollarSign, Clock, Tag, Briefcase } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const categories = [
  'Graphics & Design',
  'Digital Marketing',
  'Writing & Translation',
  'Video & Animation',
  'Programming & Tech',
  'Business',
  'Lifestyle',
  'Data'
];

export default function NewProjectPage() {
  const { user, profile } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    deliveryTime: '',
    category: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('You must be logged in to post a project');
      return;
    }

    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, 'projects'), {
        ownerId: user.uid,
        ownerName: profile?.name,
        ownerPhoto: profile?.photoURL,
        title: formData.title,
        description: formData.description,
        budget: Number(formData.budget),
        deliveryTime: formData.deliveryTime,
        category: formData.category,
        status: 'open',
        offerCount: 0,
        attachments: [],
        createdAt: serverTimestamp(),
      });

      toast.success('Project posted successfully!');
      router.push(`/projects/${docRef.id}`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to post project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary/20 pb-20">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-heading mb-2">Post a Project</h1>
            <p className="text-muted-foreground">Describe what you need and get proposals from experts.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-heading flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Project Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input 
                    id="title" 
                    placeholder="e.g. Build a mobile app for my restaurant" 
                    required 
                    className="h-12 rounded-xl"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                  <p className="text-[10px] text-muted-foreground">A clear title helps attract the right freelancers.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    onValueChange={(val) => setFormData({...formData, category: val})}
                    required
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe your project requirements, goals, and expectations..." 
                    className="min-h-[200px] rounded-xl resize-none"
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-none shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-heading flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Budget
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Input 
                      id="budget" 
                      type="number" 
                      placeholder="Enter amount in DZD" 
                      className="h-12 rounded-xl pl-12"
                      required
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">DA</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-heading flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Deadline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input 
                    id="delivery" 
                    placeholder="e.g. 2 weeks" 
                    className="h-12 rounded-xl"
                    required
                    value={formData.deliveryTime}
                    onChange={(e) => setFormData({...formData, deliveryTime: e.target.value})}
                  />
                </CardContent>
              </Card>
            </div>

            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-heading flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  Attachments (Optional)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed rounded-2xl p-12 text-center hover:bg-secondary/50 transition-colors cursor-pointer group">
                  <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4 group-hover:text-primary transition-colors" />
                  <p className="font-medium">Click to upload or drag and drop</p>
                  <p className="text-sm text-muted-foreground mt-1">Images, PDF, or documents (max 10MB)</p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button variant="ghost" className="rounded-xl font-bold h-12 px-8" type="button" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button className="rounded-xl font-bold h-12 px-12 shadow-lg shadow-primary/20" type="submit" disabled={loading}>
                {loading ? "Posting..." : "Post Project Now"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
