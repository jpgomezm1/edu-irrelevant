import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { LogOut, TrendingUp, Sparkles } from 'lucide-react';

interface HeaderProps {
  userProfile?: {
    full_name: string;
    work_area: string;
  };
  overallProgress?: number;
}

export const Header: React.FC<HeaderProps> = ({ userProfile, overallProgress = 0 }) => {
  const { signOut } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  return (
    <header className="bg-background/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo mejorado */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-xl blur-sm opacity-30"></div>
              <div className="relative bg-background/80 backdrop-blur-sm p-2 rounded-xl border border-primary/20 shadow-lg">
                <img
                  src="https://storage.googleapis.com/cluvi/nuevo_irre-removebg-preview.png"
                  alt="irrelevant Logo"
                  className="h-7 w-auto"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div>
                <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  AI Academy
                </h1>
                <p className="text-xs text-muted-foreground -mt-1">
                  Dashboard
                </p>
              </div>
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            </div>
          </div>

          {/* User Info mejorado */}
          <div className="flex items-center space-x-4">
            {/* Progress Badge mejorado */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-background/60 border border-primary/20 rounded-full backdrop-blur-sm">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {Math.round(overallProgress)}%
                </span>
                <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${getProgressColor(overallProgress)}`}
                    style={{ width: `${overallProgress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Progress Badge para móvil */}
            <Badge variant="secondary" className="flex md:hidden">
              {Math.round(overallProgress)}%
            </Badge>

            {/* User Profile mejorado */}
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-foreground">
                  {userProfile?.full_name || 'Usuario'}
                </p>
                <div className="flex items-center gap-1 justify-end">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <p className="text-xs text-muted-foreground">
                    {userProfile?.work_area || 'Área no especificada'}
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <Avatar className="h-9 w-9 ring-2 ring-primary/20 transition-all hover:ring-primary/40">
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground text-sm font-semibold">
                    {userProfile?.full_name ? getInitials(userProfile.full_name) : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-background rounded-full"></div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={signOut}
                className="text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200 px-3 py-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:ml-2 sm:inline">Salir</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};