'use client';

import { 
  Code2, 
  Palette, 
  Megaphone, 
  Video, 
  PenTool, 
  Languages, 
  BarChart3, 
  Smartphone 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const categories = [
  { name: 'Graphics & Design', icon: Palette, color: 'bg-orange-500/10 text-orange-500' },
  { name: 'Digital Marketing', icon: Megaphone, color: 'bg-blue-500/10 text-blue-500' },
  { name: 'Writing & Translation', icon: PenTool, color: 'bg-emerald-500/10 text-emerald-500' },
  { name: 'Video & Animation', icon: Video, color: 'bg-purple-500/10 text-purple-500' },
  { name: 'Programming & Tech', icon: Code2, color: 'bg-sky-500/10 text-sky-500' },
  { name: 'Mobile App Dev', icon: Smartphone, color: 'bg-pink-500/10 text-pink-500' },
  { name: 'Data & Analytics', icon: BarChart3, color: 'bg-indigo-500/10 text-indigo-500' },
  { name: 'Translation', icon: Languages, color: 'bg-amber-500/10 text-amber-500' },
];

export default function Categories() {
  return (
    <section className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Browse by Category</h2>
          <p className="text-muted-foreground max-w-2xl">
            Explore the wide range of services offered by our talented Algerian freelancers.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-none group">
                <CardContent className="p-8 flex flex-col items-center text-center gap-4">
                  <div className={`h-16 w-16 rounded-2xl ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <cat.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-lg">{cat.name}</h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
