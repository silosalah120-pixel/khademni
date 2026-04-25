'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { Order } from '../../types';
import Link from 'next/link';
import { MessageSquare, Search, Filter, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function MessagesPage() {
  const { user } = useAuth();
  const { t, isRTL } = useLanguage();
  const [activeChats, setActiveChats] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'orders'),
      where('status', 'in', ['pending', 'in-progress', 'delivered'])
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      try {
        const orders = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() } as Order))
          .filter(order => order.clientId === user.uid || order.freelancerId === user.uid)
          .sort((a, b) => {
            const dateA = a.createdAt?.toDate?.() || new Date(0);
            const dateB = b.createdAt?.toDate?.() || new Date(0);
            return dateB.getTime() - dateA.getTime();
          });
        setActiveChats(orders);
        setLoading(false);
        setError(null);
      } catch (err) {
        setError(t.common.loadingError);
        setLoading(false);
      }
    }, (err) => {
      setError(t.common.connectionError);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user, t]);

  return (
    <div className={`min-h-screen bg-secondary/10 ${isRTL ? 'font-arabic' : ''}`}>
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
            <div>
              <h1 className="text-4xl font-black font-heading mb-2">{t.messages.title}</h1>
              <p className="text-muted-foreground font-bold">{t.messages.subtitle}</p>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground`} />
                <input 
                  type="text" 
                  placeholder={t.common.search} 
                  className={`w-full h-12 ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} rounded-2xl bg-card border-none shadow-sm focus:ring-2 focus:ring-primary/20 text-sm font-medium`}
                />
              </div>
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl border-none shadow-sm bg-card">
                <Filter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="font-bold text-muted-foreground">{t.common.loading}</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4 text-center">
              <AlertCircle className="h-12 w-12 text-destructive" />
              <p className="font-bold text-lg">{error}</p>
            </div>
          ) : activeChats.length > 0 ? (
            <div className="grid gap-4">
              {activeChats.map((chat, i) => {
                const isClient = chat.clientId === user?.uid;
                const otherPartyName = isClient ? chat.freelancerName : chat.clientName;
                return (
                  <motion.div key={chat.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <Link href={`/orders/${chat.id}`}>
                      <Card className="premium-card group p-2">
                        <CardContent className="p-6 flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <Avatar className="h-16 w-16 border-2 border-background shadow-lg">
                              <AvatarFallback className="bg-primary/10 text-primary font-black text-xl">{otherPartyName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{otherPartyName}</h3>
                              <p className="text-sm font-bold text-muted-foreground">{chat.projectTitle}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-40 bg-card/50 rounded-[3rem] p-10 backdrop-blur-xl">
              <MessageSquare className="h-16 w-16 mx-auto mb-6 text-primary/20" />
              <h2 className="text-2xl font-black mb-2">{t.messages.noChats}</h2>
              <p className="text-muted-foreground font-bold mb-8">{t.messages.noChatsDesc}</p>
              <Button asChild className="rounded-2xl h-12 px-10 font-bold premium-gradient">
                <Link href="/projects">{t.common.browseProjects}</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
