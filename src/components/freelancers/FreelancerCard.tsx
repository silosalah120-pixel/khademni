'use client';

import { UserProfile } from '../../types';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import Link from 'next/link';

interface FreelancerCardProps {
  freelancer: UserProfile;
}

export default function FreelancerCard({ freelancer }: FreelancerCardProps) {
  return (
    <div className="premium-card group p-8 flex flex-col items-center text-center">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500 scale-75" />
        <div className="relative h-24 w-24 rounded-3xl border-4 border-background shadow-2xl overflow-hidden rotate-3 group-hover:rotate-0 transition-transform duration-500">
          <Avatar className="h-full w-full">
            <AvatarImage src={freelancer.photoURL} alt={freelancer.name} />
            <AvatarFallback>{freelancer.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        {freelancer.isVerified && (
          <div className="absolute -bottom-2 -right-2 bg-primary text-white p-1.5 rounded-xl shadow-lg border-2 border-background">
            <CheckCircle2 className="h-4 w-4" />
          </div>
        )}
      </div>

      <Link href={`/profile/${freelancer.uid}`}>
        <h3 className="text-xl font-bold group-hover:text-primary transition-colors mb-1">
          {freelancer.name}
        </h3>
      </Link>
      
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4 font-medium">
        <MapPin className="h-3.5 w-3.5" />
        Algiers, Algeria
      </div>

      <div className="flex items-center gap-1 bg-amber-400/10 text-amber-600 px-3 py-1 rounded-full text-xs font-black mb-6 border border-amber-400/20">
        <Star className="h-3.5 w-3.5 fill-amber-500" />
        {freelancer.rating} <span className="text-[10px] opacity-60 ml-0.5">({freelancer.reviewCount})</span>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2 mb-8 leading-relaxed">
        {freelancer.bio}
      </p>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {freelancer.skills.slice(0, 3).map((skill) => (
          <Badge key={skill} variant="secondary" className="bg-secondary/50 text-[10px] font-bold px-3 py-1">
            {skill}
          </Badge>
        ))}
      </div>

      <div className="w-full pt-6 border-t border-border/50 flex justify-between items-center mt-auto">
        <div className="flex flex-col items-start">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Score</span>
          <span className="font-black text-emerald-500">{freelancer.trustScore}% Trust</span>
        </div>
        <Link href={`/profile/${freelancer.uid}`}>
          <span className="text-xs font-bold text-primary hover:underline">View Profile</span>
        </Link>
      </div>
    </div>
  );
}
