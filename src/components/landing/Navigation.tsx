import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="text-xl font-bold text-foreground">
          IrRelevant AI Academy
        </div>
        
        <div className="flex items-center gap-4">
          <Button asChild variant="outline">
            <Link to="/auth">Iniciar Sesión</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;