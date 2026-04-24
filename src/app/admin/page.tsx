'use client';

import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Briefcase, 
  AlertTriangle, 
  ShieldAlert,
  Search,
  MoreVertical
} from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function AdminPanel() {
  return (
    <div className="min-h-screen bg-secondary/10 pb-20">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold font-heading">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage users, projects, and platform safety.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <ShieldAlert className="h-4 w-4" />
              Security Logs
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="border-none shadow-lg">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground font-bold uppercase tracking-wider">Total Users</div>
                <div className="text-2xl font-bold">1,284</div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-emerald-500" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground font-bold uppercase tracking-wider">Active Projects</div>
                <div className="text-2xl font-bold">456</div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground font-bold uppercase tracking-wider">Open Disputes</div>
                <div className="text-2xl font-bold">12</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-white dark:bg-card p-8 border-b">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <CardTitle className="text-xl font-heading">User Management</CardTitle>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search users..." className="pl-10 h-10 rounded-xl bg-secondary border-none" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/30 border-none">
                    <TableHead className="font-bold py-4">User</TableHead>
                    <TableHead className="font-bold py-4">Status</TableHead>
                    <TableHead className="font-bold py-4">Role</TableHead>
                    <TableHead className="font-bold py-4 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: 'Amine Djazairi', email: 'amine@example.com', status: 'Active', role: 'Freelancer' },
                    { name: 'Sarah B.', email: 'sarah@example.com', status: 'Banned', role: 'Client' },
                    { name: 'Karim Mansouri', email: 'karim@example.com', status: 'Active', role: 'Freelancer' },
                  ].map((user, i) => (
                    <TableRow key={i} className="hover:bg-secondary/20 transition-colors border-b last:border-none">
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-secondary" />
                          <div>
                            <div className="font-bold">{user.name}</div>
                            <div className="text-xs text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge variant={user.status === 'Active' ? 'default' : 'destructive'} className="rounded-md">
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4 font-medium">{user.role}</TableCell>
                      <TableCell className="py-4 text-right">
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
