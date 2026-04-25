'use client';

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import ProjectCard from "@/components/projects/ProjectCard";
import FreelancerCard from "@/components/freelancers/FreelancerCard";
import { MOCK_PROJECTS, MOCK_FREELANCERS } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Quote } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t, isRTL } = useLanguage();

  return (
    <main className={`min-h-screen ${isRTL ? 'font-arabic' : ''}`}>
      <Navbar />
      
      <Hero />
      
      <Categories />

      {/* Featured Projects Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold font-heading mb-2">{t.projects.recentlyPosted}</h2>
              <p className="text-muted-foreground font-medium">{t.projects.recentlyPostedSubtitle}</p>
            </div>
            <Link href="/projects">
              <Button variant="ghost" className="group gap-2 font-bold">
                {t.common.viewAll}
                <ArrowRight className={`h-4 w-4 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {MOCK_PROJECTS.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Freelancers Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold font-heading mb-2">{t.freelancers.topRated}</h2>
              <p className="text-muted-foreground font-medium">{t.freelancers.topRatedSubtitle}</p>
            </div>
            <Link href="/freelancers">
              <Button variant="ghost" className="group gap-2 font-bold">
                {t.common.viewAll}
                <ArrowRight className={`h-4 w-4 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {MOCK_FREELANCERS.map((freelancer, i) => (
              <motion.div
                key={freelancer.uid}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <FreelancerCard freelancer={freelancer} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/5 rounded-full blur-[120px] -z-10" />
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading mb-4">What our community says</h2>
            <div className="flex justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-6 w-6 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm font-black mt-2 block uppercase tracking-widest opacity-60">Rated 4.9/5 by over 10,000+ users</span>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: isRTL ? "ساعدني 'خدمني' في العثور على مطور محترف في وهران في أقل من 24 ساعة. تم الانجاز بإتقان!" : "Khademni helped me find a professional developer in Oran in less than 24 hours. The project was completed perfectly!",
                author: "Karim B.",
                role: isRTL ? "رائد أعمال" : "Entrepreneur"
              },
              {
                text: isRTL ? "كمصممة مستقلة، هذه المنصة غيرت قواعد اللعبة بالنسبة لي. من السهل جداً العثور على مشاريع عالية الجودة." : "As a freelance designer, this platform is a game changer. It's so easy to find high-quality projects from local clients.",
                author: "Amel S.",
                role: isRTL ? "مصممة جرافيك" : "Graphic Designer"
              },
              {
                text: isRTL ? "نظام الضمان والرسائل يجعلني أشعر بالأمان. أخيراً، سوق عمل موثوق للمستقلين في الجزائر." : "The escrow and messaging system makes me feel safe. Finally, a reliable freelance marketplace for Algeria.",
                author: "Sofiane M.",
                role: isRTL ? "مؤسس شركة ناشئة" : "Startup Founder"
              }
            ].map((t_data, i) => (
              <Card key={i} className="premium-card p-10 relative overflow-hidden group">
                <Quote className={`absolute -top-4 -right-4 h-24 w-24 text-primary/5 -rotate-12 transition-transform group-hover:rotate-0 duration-500 ${isRTL ? '-right-auto -left-4 rotate-12 group-hover:rotate-0' : ''}`} />
                <p className="text-xl italic mb-8 relative z-10 font-medium">"{t_data.text}"</p>
                <div className="flex flex-col">
                  <span className="font-black text-lg">{t_data.author}</span>
                  <span className="text-sm text-muted-foreground font-bold">{t_data.role}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="premium-gradient rounded-[4rem] p-12 md:p-32 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/20">
            <div className="absolute top-0 left-0 w-full h-full bg-black/10" />
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-black/20 rounded-full blur-3xl" />
            
            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-5xl md:text-7xl font-black font-heading mb-10 leading-tight">Ready to get things done?</h2>
              <p className="text-xl md:text-2xl opacity-90 mb-14 font-medium max-w-2xl mx-auto">
                Join thousands of Algerian businesses and freelancers already using Khademni.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Button size="lg" variant="secondary" className="rounded-full h-16 px-12 text-primary font-black text-lg shadow-xl hover:scale-105 transition-transform">
                  Post a Project
                </Button>
                <Button size="lg" className="rounded-full h-16 px-12 bg-white/20 hover:bg-white/30 backdrop-blur-md border-white/40 font-black text-lg shadow-xl hover:scale-105 transition-transform">
                  Become a Freelancer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-background border-t py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="text-3xl font-black font-heading text-primary tracking-tighter mb-6 block">
                Khademni <span className="text-foreground font-arabic ml-1">خدمني</span>
              </Link>
              <p className="text-muted-foreground font-medium leading-relaxed">
                {t.footer.tagline}
              </p>
            </div>
            <div>
              <h4 className="font-black mb-6 uppercase tracking-widest text-sm">Categories</h4>
              <ul className="space-y-4 text-muted-foreground font-bold">
                <li><Link href="#" className="hover:text-primary transition-colors">Graphics & Design</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Digital Marketing</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Writing & Translation</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Video & Animation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black mb-6 uppercase tracking-widest text-sm">Support</h4>
              <ul className="space-y-4 text-muted-foreground font-bold">
                <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Trust & Safety</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Selling on Khademni</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Buying on Khademni</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black mb-6 uppercase tracking-widest text-sm">Company</h4>
              <ul className="space-y-4 text-muted-foreground font-bold">
                <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t flex flex-col md:flex-row justify-between gap-6 text-muted-foreground font-bold">
            <p>{t.footer.rights} {t.footer.madeWith}</p>
            <div className="flex gap-8">
              <Link href="#" className="hover:text-primary transition-colors">Twitter</Link>
              <Link href="#" className="hover:text-primary transition-colors">LinkedIn</Link>
              <Link href="#" className="hover:text-primary transition-colors">Instagram</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Card({ children, className, ...props }: any) {
  return <div className={`rounded-xl border bg-card text-card-foreground shadow-sm ${className}`} {...props}>{children}</div>;
}
