import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Lightbulb } from 'lucide-react';

export const FeedbackButton: React.FC = () => {
  const handleFeedbackClick = () => {
    const phoneNumber = '573183335173'; // Número sin el '+'
    const message = encodeURIComponent('¡Hola AI Academy! Me encantaría proponer un nuevo curso o track sobre el siguiente tema: ');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleFeedbackClick}
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-primary shadow-lg hover:scale-110 transition-transform duration-200 z-50 animate-pulse"
            size="icon"
            aria-label="Proponer un curso nuevo"
          >
            <Lightbulb className="h-7 w-7" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" className="bg-background border-primary/50 text-center">
          <p className="font-semibold text-foreground">¿Qué quieres aprender?</p>
          <p className="text-muted-foreground">Dile a nuestro AI Agent qué curso crear.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};