'use client';

import { Button } from '@/components/ui/button';
import { Search, ArrowRight, Shield, Star, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-40">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
              <Star className="h-3 w-3 fill-primary" />
              The #1 Algerian Marketplace for Freelancers
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold font-heading tracking-tight mb-6 leading-[1.1]"
          >
            Find the perfect <span className="text-primary italic">talent</span> for your business
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-10 max-w-2xl"
          >
            Connect with top Algerian freelancers for your software development, design, marketing, and more. All in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-2xl relative mb-12"
          >
            <div className="flex p-2 rounded-2xl bg-card border shadow-2xl items-center gap-2">
              <div className="flex-1 flex items-center pl-4 gap-3">
                <Search className="h-5 w-5 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="What service are you looking for?"
                  className="w-full bg-transparent border-none focus:ring-0 text-base py-3"
                />
              </div>
              <Button size="lg" className="rounded-xl h-12 px-8 font-semibold">
                Search
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-muted-foreground">
              <span>Popular:</span>
              <Link href="/projects?q=logo" className="hover:text-primary transition-colors">Logo Design</Link>
              <Link href="/projects?q=web" className="hover:text-primary transition-colors">Web Development</Link>
              <Link href="/projects?q=mobile" className="hover:text-primary transition-colors">Mobile App</Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full border-t pt-12"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <span className="font-semibold">Secure Payments</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <span className="font-semibold">Verified Talent</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <span className="font-semibold">Top Rated</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <ArrowRight className="h-6 w-6 text-primary" />
              </div>
              <span className="font-semibold">Fast Delivery</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
