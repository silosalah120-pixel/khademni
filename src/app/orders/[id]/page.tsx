'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import ChatRoom from '@/components/messaging/ChatRoom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  DollarSign,
  ChevronRight,
  Star
} from 'lucide-react';
import { Order, OrderStatus } from '../../../types';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export default function OrderDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock fetch
    setOrder({
      id: id as string,
      projectId: 'p1',
      projectTitle: 'E-commerce Website for Algerian Craft Shop',
      offerId: 'o1',
      clientId: 'u1',
      clientName: 'Ahmed Bencherif',
      freelancerId: 'f1',
      freelancerName: 'Mohamed Amine',
      price: 45000,
      status: 'in-progress',
      createdAt: new Date(),
    });
    setLoading(false);
  }, [id]);

  const updateStatus = (newStatus: OrderStatus) => {
    if (order) {
      setOrder({ ...order, status: newStatus });
      toast.success(`Order status updated to ${newStatus}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!order) return <div>Order not found</div>;

  const isFreelancer = user?.uid === order.freelancerId;
  const isClient = user?.uid === order.clientId;

  const statusColors: Record<OrderStatus, string> = {
    'pending': 'bg-amber-500',
    'in-progress': 'bg-blue-500',
    'delivered': 'bg-purple-500',
    'completed': 'bg-emerald-500',
    'disputed': 'bg-destructive'
  };

  return (
    <div className="min-h-screen bg-secondary/10 pb-20">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Order Info */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden">
              <div className={`h-2 w-full ${statusColors[order.status]}`} />
              <CardHeader className="p-8 pb-0">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Order #{order.id}</span>
                    <h1 className="text-2xl font-bold font-heading mt-1">{order.projectTitle}</h1>
                  </div>
                  <Badge className={`${statusColors[order.status]} text-white px-4 py-1 rounded-full border-none uppercase text-[10px] font-bold`}>
                    {order.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y mb-8">
                  <div>
                    <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Price</div>
                    <div className="text-lg font-bold">{order.price} DZD</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Freelancer</div>
                    <div className="text-lg font-bold">{order.freelancerName}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Client</div>
                    <div className="text-lg font-bold">{order.clientName}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Started</div>
                    <div className="text-lg font-bold">{new Date().toLocaleDateString()}</div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold font-heading">Workflow Actions</h3>
                  
                  <div className="flex flex-wrap gap-4">
                    {isFreelancer && order.status === 'in-progress' && (
                      <Button onClick={() => updateStatus('delivered')} className="rounded-xl h-12 px-8 font-bold gap-2">
                        <CheckCircle2 className="h-5 w-5" />
                        Mark as Delivered
                      </Button>
                    )}
                    
                    {isClient && order.status === 'delivered' && (
                      <>
                        <Button onClick={() => updateStatus('completed')} className="rounded-xl h-12 px-8 font-bold gap-2">
                          <CheckCircle2 className="h-5 w-5" />
                          Accept Delivery
                        </Button>
                        <Button variant="destructive" onClick={() => updateStatus('disputed')} className="rounded-xl h-12 px-8 font-bold gap-2">
                          <AlertCircle className="h-5 w-5" />
                          Request Changes / Dispute
                        </Button>
                      </>
                    )}

                    {order.status === 'completed' && (
                      <Button variant="outline" className="rounded-xl h-12 px-8 font-bold gap-2 border-primary text-primary">
                        <Star className="h-5 w-5" />
                        Write a Review
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project Requirements / Deliverables */}
            <Card className="border-none shadow-xl rounded-[2rem]">
              <CardHeader>
                <CardTitle className="text-xl font-heading flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Deliverables
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-secondary/30 rounded-2xl p-12 text-center border-2 border-dashed">
                  <p className="text-muted-foreground">No files delivered yet.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Messaging */}
          <div className="lg:col-span-1">
            <ChatRoom 
              orderId={order.id} 
              otherPartyName={isFreelancer ? order.clientName : order.freelancerName} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}
