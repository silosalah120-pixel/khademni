'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { Order } from '../../types';
import Link from 'next/link';
import { MessageSquare, Search, Filter, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function MessagesPage() {
  const { user } = useAuth();
  const [activeChats, setActiveChats] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // Fetch orders where the user is either the client or the freelancer
    // This represents active "chat channels"
    const q = query(
      collection(db, 'orders'),
      where('status', 'in', ['pending', 'in-progress', 'delivered']),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const orders = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as Order))
        .filter(order => order.clientId === user.uid || order.freelancerId === user.uid);
      
      setActiveChats(orders);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="min-h-screen bg-secondary/10">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
            <div>
              <h1 className="text-4xl font-black font-heading mb-2">Messages</h1>
              <p className="text-muted-foreground font-bold">Manage your conversations with clients and freelancers.</p>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search chats..." 
                  className="w-full h-12 pl-12 pr-4 rounded-2xl bg-card border-none shadow-sm focus:ring-2 focus:ring-primary/20 text-sm"
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
              <p className="font-bold text-muted-foreground">Loading your conversations...</p>
            </div>
          ) : activeChats.length > 0 ? (
            <div className="grid gap-4">
              {activeChats.map((chat, i) => {
                const isClient = chat.clientId === user?.uid;
                const otherPartyName = isClient ? chat.freelancerName : chat.clientName;
                
                return (
                  <motion.div
                    key={chat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link href={`/orders/${chat.id}`}>
                      <Card className="premium-card group p-2 hover:bg-primary/[0.02]">
                        <CardContent className="p-6 flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <div className="relative">
                              <Avatar className="h-16 w-16 border-2 border-background shadow-lg">
                                <AvatarFallback className="bg-primary/10 text-primary font-black text-xl">
                                  {otherPartyName.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="absolute bottom-0 right-0 h-4 w-4 bg-emerald-500 rounded-full border-2 border-background shadow-sm" />
                            </div>
                            
                            <div>
                              <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                                {otherPartyName}
                              </h3>
                              <p className="text-sm font-bold text-muted-foreground mb-1">
                                Re: {chat.projectTitle}
                              </p>
                              <p className="text-xs text-primary font-black uppercase tracking-widest">
                                Active Order #{chat.id.slice(0, 8)}
                              </p>
                            </div>
                          </div>
                          
                          <div className="hidden sm:flex flex-col items-end gap-2">
                            <span className="text-xs font-bold text-muted-foreground">
                              {new Date(chat.createdAt?.toDate?.() || Date.now()).toLocaleDateString()}
                            </span>
                            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                              Open Chat
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
            <Card className="border-none shadow-xl rounded-[3rem] overflow-hidden bg-card/50 backdrop-blur-xl">
              <CardContent className="p-20 text-center flex flex-col items-center gap-6">
                <div className="h-24 w-24 rounded-[2rem] bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="h-12 w-12 text-primary" />
                </div>
                <div>
                  <h2 className="text-3xl font-black font-heading mb-2">No active conversations</h2>
                  <p className="text-muted-foreground font-bold max-w-sm mx-auto">
                    You don't have any active orders or messages yet. Start by browsing projects or freelancers!
                  </p>
                </div>
                <div className="flex gap-4 mt-4">
                  <Button asChild className="rounded-2xl h-12 px-8 font-bold premium-gradient">
                    <Link href="/projects">Browse Projects</Link>
                  </Button>
                  <Button variant="outline" asChild className="rounded-2xl h-12 px-8 font-bold">
                    <Link href="/freelancers">Find Talent</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
