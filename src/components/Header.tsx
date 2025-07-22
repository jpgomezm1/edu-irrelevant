import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { LogOut, Brain } from 'lucide-react';

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

  return (
    <header className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-lg">
              <Brain className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">IrRelevant</h1>
              <p className="text-xs text-muted-foreground">AI Academy</p>
            </div>
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-4">
            {/* Progress Badge */}
            <Badge variant="secondary" className="hidden sm:flex">
              Progreso: {Math.round(overallProgress)}%
            </Badge>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-foreground">
                  {userProfile?.full_name || 'Usuario'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {userProfile?.work_area || 'Área no especificada'}
                </p>
              </div>
              
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {userProfile?.full_name ? getInitials(userProfile.full_name) : 'U'}
                </AvatarFallback>
              </Avatar>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={signOut}
                className="text-muted-foreground hover:text-foreground"
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