'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import ProjectCard from '@/components/projects/ProjectCard';
import { MOCK_PROJECTS } from '@/lib/mockData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function BrowseProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');

  const filteredProjects = MOCK_PROJECTS.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === 'all' || p.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-secondary/10 pb-20">
      <Navbar />
      
      <div className="bg-primary pt-20 pb-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-6">
            Find your next <span className="text-secondary italic">mission</span>
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto mb-10">
            Thousands of projects are waiting for your expertise. Filter by category, budget, and more.
          </p>

          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search for projects..." 
                className="h-14 pl-12 rounded-2xl border-none shadow-xl text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="h-14 px-10 rounded-2xl bg-white text-primary hover:bg-secondary font-bold text-lg shadow-xl">
              Search
            </Button>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 -mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-card rounded-3xl p-6 shadow-xl border border-border/50 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <SlidersHorizontal className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold font-heading">Filters</h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Category</label>
                  <Select onValueChange={setCategory}>
                    <SelectTrigger className="h-11 rounded-xl">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Programming & Tech">Programming & Tech</SelectItem>
                      <SelectItem value="Graphics & Design">Graphics & Design</SelectItem>
                      <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Budget Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="Min" className="h-11 rounded-xl" />
                    <Input placeholder="Max" className="h-11 rounded-xl" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Project Length</label>
                  <div className="flex flex-col gap-2">
                    {['Any duration', 'Less than 1 week', '1 to 4 weeks', '1 to 3 months'].map((d) => (
                      <div key={d} className="flex items-center gap-2 py-1 px-2 hover:bg-secondary rounded-lg cursor-pointer">
                        <div className="h-4 w-4 rounded-full border border-primary" />
                        <span className="text-sm font-medium">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full rounded-xl font-bold h-11" variant="outline">
                  Clear All Filters
                </Button>
              </div>
            </div>
          </aside>

          {/* Projects Grid */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex justify-between items-center bg-card p-4 rounded-2xl shadow-sm border border-border/50">
              <span className="text-sm font-medium text-muted-foreground">
                Showing <span className="text-foreground font-bold">{filteredProjects.length}</span> results
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-[180px] h-9 border-none shadow-none font-bold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="budget-high">Highest Budget</SelectItem>
                    <SelectItem value="budget-low">Lowest Budget</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-32 bg-card rounded-3xl border border-border/50">
                <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-20" />
                <h3 className="text-2xl font-bold mb-2 font-heading">No projects found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters to find what you&apos;re looking for.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
