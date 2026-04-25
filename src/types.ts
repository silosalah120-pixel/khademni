export type UserProfile = {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
  bio?: string;
  skills: string[];
  portfolio: PortfolioItem[];
  rating: number;
  reviewCount: number;
  completedProjects: number;
  trustScore: number;
  isVerified: boolean;
  phoneVerified: boolean;
  emailVerified: boolean;
  createdAt: any;
};

export type PortfolioItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
};

export type Project = {
  id: string;
  ownerId: string;
  ownerName: string;
  ownerPhoto?: string;
  title: string;
  description: string;
  budget: number;
  deliveryTime: string;
  category: string;
  attachments: string[];
  status: 'open' | 'assigned' | 'completed' | 'cancelled';
  offerCount: number;
  createdAt: any;
};

export type Offer = {
  id: string;
  projectId: string;
  projectTitle: string;
  freelancerId: string;
  freelancerName: string;
  freelancerPhoto?: string;
  price: number;
  deliveryTime: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: any;
};

export type OrderStatus = 'pending' | 'in-progress' | 'delivered' | 'completed' | 'disputed';

export type Order = {
  id: string;
  projectId: string;
  projectTitle: string;
  offerId: string;
  clientId: string;
  clientName: string;
  freelancerId: string;
  freelancerName: string;
  price: number;
  status: OrderStatus;
  createdAt: any;
  deliveredAt?: any;
  completedAt?: any;
};

export type Message = {
  id: string;
  orderId: string;
  senderId: string;
  senderName: string;
  text: string;
  createdAt: any;
};

export type Review = {
  id: string;
  orderId: string;
  reviewerId: string;
  revieweeId: string;
  reviewerName: string;
  rating: number;
  comment: string;
  type: 'client-to-freelancer' | 'freelancer-to-client';
  createdAt: any;
};
