'use client';

import { Project } from '../../types';

import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, DollarSign, Tag, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="premium-card group">
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
            {project.category}
          </Badge>
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-500 bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/10">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {project.offerCount} Offers
          </div>
        </div>
        
        <Link href={`/projects/${project.id}`}>
          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
            {project.title}
          </h3>
        </Link>
        
        <p className="text-muted-foreground text-sm line-clamp-3 mb-8 leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex items-center gap-4 pt-6 border-t border-border/50">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full border-2 border-background shadow-sm overflow-hidden">
              <Avatar className="h-full w-full">
                <AvatarImage src={project.ownerPhoto} alt={project.ownerName} />
                <AvatarFallback>{project.ownerName.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <span className="text-xs font-bold">{project.ownerName}</span>
          </div>
        </div>
      </div>
      
      <div className="px-8 py-5 bg-secondary/30 rounded-b-3xl flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Budget</span>
          <span className="font-black text-lg text-primary">{project.budget.toLocaleString()} DZD</span>
        </div>
        <Link href={`/projects/${project.id}`}>
          <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <ChevronRight className="h-5 w-5" />
          </div>
        </Link>
      </div>
    </div>
  );
}
