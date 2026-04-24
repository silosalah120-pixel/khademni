'use client';

import { UserProfile } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface FreelancerCardProps {
  freelancer: UserProfile;
}

export default function FreelancerCard({ freelancer }: FreelancerCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-border/50 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <Avatar className="h-24 w-24 border-4 border-background shadow-md">
              <AvatarImage src={freelancer.photoURL} />
              <AvatarFallback className="text-2xl">{freelancer.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            {freelancer.isVerified && (
              <div className="absolute bottom-0 right-0 bg-background rounded-full p-0.5">
                <CheckCircle2 className="h-6 w-6 text-primary fill-primary text-white" />
              </div>
            )}
          </div>

          <Link href={`/profile/${freelancer.uid}`} className="hover:text-primary transition-colors">
            <h3 className="text-lg font-bold font-heading">{freelancer.name}</h3>
          </Link>
          
          <div className="flex items-center gap-1 mt-1 mb-3">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-bold">{freelancer.rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground font-medium">({freelancer.reviewCount} reviews)</span>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
            {freelancer.bio || "Pro Algerian freelancer ready to help you with your next project."}
          </p>

          <div className="flex flex-wrap justify-center gap-1.5 mb-6">
            {freelancer.skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-[10px] py-0 px-2 font-medium">
                {skill}
              </Badge>
            ))}
            {freelancer.skills.length > 3 && (
              <Badge variant="outline" className="text-[10px] py-0 px-2">+{freelancer.skills.length - 3}</Badge>
            )}
          </div>

          <div className="w-full grid grid-cols-2 gap-4 border-t pt-4 mb-6">
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Completed</span>
              <span className="font-bold">{freelancer.completedProjects}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Trust Score</span>
              <div className="flex items-center justify-center gap-1">
                <ShieldCheck className="h-3 w-3 text-emerald-500" />
                <span className="font-bold">{freelancer.trustScore}%</span>
              </div>
            </div>
          </div>

          <Button className="w-full rounded-xl" asChild>
            <Link href={`/profile/${freelancer.uid}`}>View Profile</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
