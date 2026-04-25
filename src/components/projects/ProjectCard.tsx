'use client';

import { Project } from '../../types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, DollarSign, Tag, Users } from 'lucide-react';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`}>
      <Card className="h-full hover:shadow-lg transition-all duration-300 group overflow-hidden border-border/50">
        <CardHeader className="p-5 pb-0">
          <div className="flex justify-between items-start mb-3">
            <Badge variant="secondary" className="font-medium bg-primary/5 text-primary border-none">
              {project.category}
            </Badge>
            <div className="flex items-center gap-1 text-sm font-bold text-primary">
              <DollarSign className="h-4 w-4" />
              {project.budget}
            </div>
          </div>
          <h3 className="text-xl font-bold font-heading line-clamp-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
        </CardHeader>
        <CardContent className="p-5">
          <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
            {project.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {project.deliveryTime}
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {project.offerCount} proposals
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-5 pt-0 border-t bg-muted/30">
          <div className="flex items-center gap-2 mt-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src={project.ownerPhoto} />
              <AvatarFallback>{project.ownerName?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-xs font-semibold">{project.ownerName}</span>
              <span className="text-[10px] text-muted-foreground">Client</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
