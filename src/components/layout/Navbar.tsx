'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Bell, MessageSquare, Menu, X, PlusCircle, LayoutDashboard, Settings, User, LogOut, Briefcase, Languages } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/translations';

export default function Navbar() {
  const { user, profile, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLinks = () => (
    <>
      <Link href="/projects" className="text-sm font-bold hover:text-primary transition-all flex items-center gap-2 group">
        <Briefcase className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        {t.common.browseProjects}
      </Link>
      <Link href="/freelancers" className="text-sm font-bold hover:text-primary transition-all flex items-center gap-2 group">
        <UsersIcon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        {t.common.findFreelancers}
      </Link>
      {user && (
        <Link href="/dashboard" className="text-sm font-bold hover:text-primary transition-all flex items-center gap-2 group">
          <LayoutDashboard className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          {t.common.dashboard}
        </Link>
      )}
    </>
  );

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-500 ${
      scrolled 
        ? 'py-3 bg-background/60 backdrop-blur-2xl border-b shadow-[0_8px_32px_-10px_rgba(0,0,0,0.05)]' 
        : 'py-6 bg-transparent'
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between gap-8">
        <div className="flex items-center gap-12">
          <Link href="/" className="text-2xl font-black font-heading tracking-tighter flex items-center gap-2">
            <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
              <span className="text-white text-xl">K</span>
            </div>
            <span className="hidden sm:inline bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">Khademni</span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8">
            <NavLinks />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex relative w-64 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search services..." 
              className="w-full h-11 pl-11 pr-4 rounded-full bg-secondary/50 border-none focus:ring-2 focus:ring-primary/20 text-sm transition-all"
            />
          </div>

          {user ? (
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-xl h-11 w-11">
                    <Languages className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-2xl border-border/50 shadow-2xl">
                  <DropdownMenuItem onClick={() => setLanguage('en')} className="rounded-lg py-2.5 font-bold">
                    English {language === 'en' && '✓'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage('ar')} className="rounded-lg py-2.5 font-bold">
                    العربية {language === 'ar' && '✓'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage('fr')} className="rounded-lg py-2.5 font-bold">
                    Français {language === 'fr' && '✓'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" size="icon" className="hidden sm:flex rounded-xl h-11 w-11" asChild>
                <Link href="/messages">
                  <MessageSquare className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="hidden sm:flex rounded-xl h-11 w-11">
                <Bell className="h-5 w-5" />
              </Button>
              
              <Link href="/projects/new" className="hidden md:block ml-2">
                <Button className="rounded-full h-11 px-6 font-bold shadow-lg shadow-primary/20 premium-gradient">
                  {t.common.postProject}
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-11 w-11 rounded-2xl p-0 ml-2 overflow-hidden ring-2 ring-primary/10 hover:ring-primary/30 transition-all">
                    <Avatar className="h-full w-full">
                      <AvatarImage src={profile?.photoURL} alt={profile?.name} />
                      <AvatarFallback>{profile?.name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl shadow-2xl border-border/50">
                  <div className="flex flex-col space-y-1 p-3 bg-secondary/30 rounded-xl mb-2">
                    <p className="font-bold text-sm">{profile?.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {profile?.email}
                    </p>
                  </div>
                  <DropdownMenuItem asChild className="rounded-lg py-2.5">
                    <Link href={`/profile/${user.uid}`} className="flex items-center gap-3 font-bold">
                      <User className="h-4 w-4" /> {t.common.profile}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-lg py-2.5">
                    <Link href="/dashboard" className="flex items-center gap-3 font-bold">
                      <LayoutDashboard className="h-4 w-4" /> {t.common.dashboard}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-lg py-2.5">
                    <Link href="/settings" className="flex items-center gap-3 font-bold">
                      <Settings className="h-4 w-4" /> {t.common.settings}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-2" />
                  <DropdownMenuItem 
                    className="text-destructive focus:text-destructive cursor-pointer rounded-lg py-2.5 flex items-center gap-3 font-bold"
                    onClick={() => logout()}
                  >
                    <LogOut className="h-4 w-4" /> {t.common.logout}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" className="font-bold px-6 h-11 rounded-full">{t.common.login}</Button>
              </Link>
              <Link href="/signup">
                <Button className="rounded-full h-11 px-8 font-bold premium-gradient shadow-lg shadow-primary/20">{t.common.signup}</Button>
              </Link>
            </div>
          )}

          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l-0 glass rounded-l-[3rem]">
                <div className="flex flex-col gap-8 mt-12">
                  <div className="flex flex-col gap-4">
                    <NavLinks />
                  </div>
                  <Separator />
                  {!user && (
                    <div className="flex flex-col gap-3">
                      <Link href="/login">
                        <Button variant="outline" className="w-full h-12 rounded-2xl font-bold">Login</Button>
                      </Link>
                      <Link href="/signup">
                        <Button className="w-full h-12 rounded-2xl font-bold premium-gradient">Join Now</Button>
                      </Link>
                    </div>
                  )}
                  {user && (
                    <Link href="/projects/new">
                      <Button className="w-full h-12 rounded-2xl font-bold premium-gradient">Post a Project</Button>
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
