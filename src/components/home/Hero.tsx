'use client';

import { Button } from '@/components/ui/button';
import { Search, ArrowRight, Shield, Star, CheckCircle, Sparkles, Globe, Users } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-24 pb-32 lg:pt-40 lg:pb-52">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/4 right-1/4 w-[30%] h-[30%] bg-violet-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-8 border border-primary/20 shadow-lg shadow-primary/5">
              <Sparkles className="h-3.5 w-3.5" />
              {t.hero.badge}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={`text-6xl md:text-8xl font-black font-heading tracking-tight mb-8 leading-[0.95] drop-shadow-sm ${isRTL ? 'font-arabic' : ''}`}
          >
            {t.hero.title} <br />
            <span className="text-gradient">{t.hero.titleAccent}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-3xl relative mb-16"
          >
            <div className="flex p-3 rounded-[2.5rem] bg-background/80 backdrop-blur-2xl border border-border shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] dark:shadow-primary/5 items-center gap-3">
              <div className="flex-1 flex items-center px-4 gap-4">
                <Search className="h-6 w-6 text-primary shrink-0" />
                <input 
                  type="text" 
                  placeholder={t.hero.placeholder}
                  className="w-full bg-transparent border-none focus:ring-0 text-lg py-4 placeholder:text-muted-foreground/60"
                />
              </div>
              <Button size="lg" className="rounded-full h-14 px-10 font-bold premium-gradient hover:scale-105 transition-transform shadow-xl shadow-primary/20 shrink-0">
                {t.common.findTalent}
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm font-medium">
              <span className="text-muted-foreground">{t.hero.popular}</span>
              {['UX Design', 'Full-stack', 'SEO', 'Mobile App'].map((tag) => (
                <Link key={tag} href={`/projects?q=${tag}`} className="text-foreground hover:text-primary transition-all hover:translate-y-[-1px]">
                  {tag}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full max-w-4xl border-t border-border/50 pt-16"
          >
            <div className="flex flex-col items-center gap-4 group">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                <Shield className="h-7 w-7" />
              </div>
              <div className="text-center">
                <p className="font-bold text-lg">{t.hero.securePayments}</p>
                <p className="text-xs text-muted-foreground">{t.hero.securePaymentsDesc}</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 group">
              <div className="h-16 w-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500 shadow-inner">
                <Users className="h-7 w-7" />
              </div>
              <div className="text-center">
                <p className="font-bold text-lg">{t.hero.localTalent}</p>
                <p className="text-xs text-muted-foreground">{t.hero.localTalentDesc}</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 group">
              <div className="h-16 w-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 shadow-inner">
                <Globe className="h-7 w-7" />
              </div>
              <div className="text-center">
                <p className="font-bold text-lg">{t.hero.verifiedTalent}</p>
                <p className="text-xs text-muted-foreground">{t.hero.verifiedTalentDesc}</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 group">
              <div className="h-16 w-16 rounded-2xl bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-all duration-500 shadow-inner">
                <Star className="h-7 w-7" />
              </div>
              <div className="text-center">
                <p className="font-bold text-lg">{t.hero.topRated}</p>
                <p className="text-xs text-muted-foreground">{t.hero.topRatedDesc}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
