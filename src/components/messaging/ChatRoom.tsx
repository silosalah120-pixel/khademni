'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  serverTimestamp,
  doc,
  getDoc
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Image as ImageIcon, Smile } from 'lucide-react';
import { Message } from '@/types';

interface ChatRoomProps {
  orderId: string;
  otherPartyName: string;
}

export default function ChatRoom({ orderId, otherPartyName }: ChatRoomProps) {
  const { user, profile } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!orderId) return;

    const q = query(
      collection(db, 'messages'),
      where('orderId', '==', orderId),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];
      setMessages(msgs);
      
      // Scroll to bottom
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 100);
    });

    return () => unsubscribe();
  }, [orderId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    const text = newMessage;
    setNewMessage('');

    try {
      await addDoc(collection(db, 'messages'), {
        orderId,
        senderId: user.uid,
        senderName: profile?.name || 'User',
        text: text,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <Card className="h-[600px] flex flex-col border-none shadow-2xl overflow-hidden rounded-[2rem]">
      <div className="p-4 border-b bg-secondary/50 flex items-center gap-4">
        <Avatar className="h-10 w-10">
          <AvatarFallback>{otherPartyName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-bold">{otherPartyName}</h4>
          <span className="text-xs text-emerald-500 font-medium">Online</span>
        </div>
      </div>

      <ScrollArea className="flex-1 p-6" viewportRef={scrollRef}>
        <div className="space-y-6">
          {messages.map((msg) => {
            const isMe = msg.senderId === user?.uid;
            return (
              <div 
                key={msg.id} 
                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  <div className={`
                    p-4 rounded-[1.5rem] text-sm font-medium
                    ${isMe 
                      ? 'bg-primary text-primary-foreground rounded-tr-none' 
                      : 'bg-secondary text-foreground rounded-tl-none'}
                  `}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-1 px-1">
                    {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Sending...'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      <div className="p-4 bg-background border-t">
        <form onSubmit={handleSendMessage} className="flex gap-2 items-center">
          <Button type="button" variant="ghost" size="icon" className="rounded-full">
            <ImageIcon className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button type="button" variant="ghost" size="icon" className="rounded-full">
            <Smile className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Input 
            placeholder="Type your message..." 
            className="flex-1 h-11 rounded-full border-none bg-secondary px-6 focus-visible:ring-1 focus-visible:ring-primary"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button type="submit" size="icon" className="rounded-full h-11 w-11 shadow-lg shadow-primary/20">
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </Card>
  );
}

function Card({ children, className }: any) {
  return <div className={`bg-card text-card-foreground border shadow-sm ${className}`}>{children}</div>;
}
