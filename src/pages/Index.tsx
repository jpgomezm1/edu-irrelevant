import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Brain, ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl px-4"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-full mb-8">
          <Brain className="h-10 w-10 text-primary-foreground" />
        </div>
        
        <h1 className="text-5xl font-bold text-foreground mb-6">
          IrRelevant
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          La plataforma educativa que convierte tu empresa en <strong>AI-First</strong>.
          Aprende IA práctica sin tecnicismos.
        </p>
        
        <div className="space-y-4">
          <Button
            size="lg"
            onClick={() => navigate('/auth')}
            className="text-lg px-8 py-3"
          >
            Comenzar mi transformación IA
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <p className="text-sm text-muted-foreground">
            Únete a miles de profesionales que ya dominan la IA
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
