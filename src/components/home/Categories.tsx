'use client';

import { 
  Code, 
  Palette, 
  BarChart, 
  Video, 
  PenTool, 
  Megaphone, 
  Camera, 
  Smartphone,
  Globe,
  Database,
  Music,
  Layout
} from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  { name: 'Programming & Tech', icon: Code, color: 'bg-blue-500', count: '1.2k+ Projects' },
  { name: 'Graphics & Design', icon: Palette, color: 'bg-pink-500', count: '850+ Projects' },
  { name: 'Digital Marketing', icon: Megaphone, color: 'bg-amber-500', count: '640+ Projects' },
  { name: 'Video & Animation', icon: Video, color: 'bg-purple-500', count: '420+ Projects' },
  { name: 'Writing & Translation', icon: PenTool, color: 'bg-emerald-500', count: '310+ Projects' },
  { name: 'Music & Audio', icon: Music, color: 'bg-indigo-500', count: '180+ Projects' },
  { name: 'Business', icon: BarChart, color: 'bg-cyan-500', count: '290+ Projects' },
  { name: 'Data', icon: Database, color: 'bg-orange-500', count: '150+ Projects' },
];

export default function Categories() {
  return (
    <section className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold font-heading mb-4"
          >
            Explore the <span className="text-gradient">Marketplace</span>
          </motion.h2>
          <p className="text-muted-foreground">
            Whatever your business needs, there is a specialized freelancer in Algeria ready to help you succeed.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="premium-card group cursor-pointer overflow-hidden relative"
            >
              <div className="p-8 flex flex-col items-center text-center">
                <div className={`h-16 w-16 rounded-2xl ${cat.color} bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <cat.icon className={`h-8 w-8 ${cat.color.replace('bg-', 'text-')}`} />
                </div>
                <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{cat.name}</h3>
                <p className="text-xs text-muted-foreground font-medium">{cat.count}</p>
              </div>
              
              {/* Subtle background pattern */}
              <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <cat.icon className="h-24 w-24" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
