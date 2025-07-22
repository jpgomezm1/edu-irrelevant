import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  return (
    <nav className="fixed top-5 z-50 w-[95%] max-w-4xl left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-md border border-border rounded-xl shadow-lg">
      <div className="px-8 h-20 flex items-center justify-between">

        {/* Logo con AI Academy debajo */}
        <Link to="/" className="flex flex-col items-center hover:opacity-80 transition-opacity">
          <img
            src="https://storage.googleapis.com/cluvi/nuevo_irre-removebg-preview.png"
            alt="irrelevant AI Academy Logo"
            className="h-8 w-auto"
          />
          <span className="text-sm font-semibold text-foreground mt-1">
            AI Academy
          </span>
        </Link>

        {/* Botón destacado para ingresar */}
        <div className="flex items-center">
          <Button 
            asChild 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Link to="/auth">Ingresa</Link>
          </Button>
        </div>

      </div>
    </nav>
  );
};

export default Navigation;