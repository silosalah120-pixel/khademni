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

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <Hero />
      
      <Categories />

      {/* Featured Projects Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold font-heading mb-2">Recently Posted Projects</h2>
              <p className="text-muted-foreground">Find the latest opportunities for your skills.</p>
            </div>
            <Link href="/projects">
              <Button variant="ghost" className="group gap-2">
                View all projects
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
              <h2 className="text-3xl font-bold font-heading mb-2">Top Rated Freelancers</h2>
              <p className="text-muted-foreground">Work with the best talent in Algeria.</p>
            </div>
            <Link href="/freelancers">
              <Button variant="ghost" className="group gap-2">
                Find more talent
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-heading mb-4">What our community says</h2>
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-5 w-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm font-semibold mt-2 block">Rated 4.9/5 by over 10,000+ users</span>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "KhadimDZ helped me find a professional developer in Oran in less than 24 hours. The project was completed perfectly!",
                author: "Karim B.",
                role: "Entrepreneur"
              },
              {
                text: "As a freelance designer, this platform is a game changer. It's so easy to find high-quality projects from local clients.",
                author: "Amel S.",
                role: "Graphic Designer"
              },
              {
                text: "The escrow and messaging system makes me feel safe. Finally, a reliable freelance marketplace for Algeria.",
                author: "Sofiane M.",
                role: "Startup Founder"
              }
            ].map((t, i) => (
              <Card key={i} className="bg-card/50 border-none shadow-xl p-8 relative overflow-hidden">
                <Quote className="absolute -top-4 -right-4 h-24 w-24 text-primary/5 -rotate-12" />
                <p className="text-lg italic mb-6 relative z-10">"{t.text}"</p>
                <div className="flex flex-col">
                  <span className="font-bold">{t.author}</span>
                  <span className="text-sm text-muted-foreground">{t.role}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="premium-gradient rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-black/10" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold font-heading mb-8">Ready to get things done?</h2>
              <p className="text-xl opacity-90 mb-10">
                Join thousands of Algerian businesses and freelancers already using Khademni.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" variant="secondary" className="rounded-full h-14 px-10 text-primary font-bold">
                  Post a Project
                </Button>
                <Button size="lg" className="rounded-full h-14 px-10 bg-white/20 hover:bg-white/30 backdrop-blur-md border-white/40 font-bold">
                  Become a Freelancer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="text-2xl font-bold font-heading text-primary tracking-tighter mb-4 block">
                Khademni <span className="text-foreground font-arabic ml-1">خدمني</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                The premier destination for professional services in Algeria.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Graphics & Design</li>
                <li>Digital Marketing</li>
                <li>Writing & Translation</li>
                <li>Video & Animation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Help Center</li>
                <li>Trust & Safety</li>
                <li>Selling on KhadimDZ</li>
                <li>Buying on KhadimDZ</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t flex flex-col md:flex-row justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2026 Khademni. Made with ❤️ in Algeria.</p>
            <div className="flex gap-6">
              <Link href="#">Twitter</Link>
              <Link href="#">LinkedIn</Link>
              <Link href="#">Instagram</Link>
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
