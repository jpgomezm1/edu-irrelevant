import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';
import { Play, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

interface TrackCardProps {
  id: string;
  name: string;
  description: string;
  iconName: string;
  color: string;
  progress: number;
  totalClasses: number;
  completedClasses: number;
  estimatedTime: number;
  isComingSoon?: boolean;
}

export const TrackCard: React.FC<TrackCardProps> = ({
  id,
  name,
  description,
  iconName,
  color,
  progress,
  totalClasses,
  completedClasses,
  estimatedTime,
  isComingSoon = false
}) => {
  const navigate = useNavigate();
  
  // Get the icon component dynamically
  const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<any>;

  const handleClick = () => {
    if (!isComingSoon) {
      navigate(`/track/${id}`);
    }
  };

  const getStatusBadge = () => {
    if (isComingSoon) {
      return (
        <Badge variant="outline" className="bg-gray-500/10 text-gray-500 border-gray-500/20">
          <Clock className="w-3 h-3 mr-1" />
          Próximamente
        </Badge>
      );
    } else if (progress === 100) {
      return (
        <Badge className="bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Completado
        </Badge>
      );
    } else if (progress > 0) {
      return (
        <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/20">
          <Play className="w-3 h-3 mr-1" />
          En progreso
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="text-muted-foreground">
          Nuevo
        </Badge>
      );
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -8 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <Card 
        className={cn(
          "bg-background/60 backdrop-blur-sm border border-white/25 transition-all duration-300",
          "group relative overflow-hidden",
          isComingSoon 
            ? "opacity-50 cursor-not-allowed" 
            : "cursor-pointer hover:border-white/35 hover:shadow-2xl"
        )}
        onClick={handleClick}
      >
        {/* Background gradient effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
          style={{ background: `linear-gradient(135deg, ${color}, transparent)` }}
        />
        
        {/* Hover border effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg"
          style={{ 
            background: `linear-gradient(135deg, transparent, ${color}30, transparent)`,
            padding: '1px'
          }}
        />
        
        <CardContent className="p-6 relative">
          {/* Header con icono y badge */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div 
                className="flex items-center justify-center w-12 h-12 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-200"
                style={{ 
                  backgroundColor: `${color}15`, 
                  color,
                  border: `1px solid ${color}30`
                }}
              >
                {IconComponent && <IconComponent className="h-6 w-6" />}
              </div>
              {getStatusBadge()}
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
          </div>

          {/* Título y descripción */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Stats */}
          {isComingSoon ? (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground">Contenido en preparación</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4 text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{completedClasses}/{totalClasses} clases</span>
                  </div>
                  {estimatedTime > 0 && (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{formatTime(estimatedTime)} restantes</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Progreso</span>
                  <span 
                    className="text-sm font-bold"
                    style={{ color }}
                  >
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="relative">
                  <Progress 
                    value={progress} 
                    className="h-2.5 bg-muted/50"
                  />
                  <div 
                    className="absolute top-0 left-0 h-2.5 rounded-full transition-all duration-500 ease-out"
                    style={{
                      background: `linear-gradient(90deg, ${color}, ${color}80)`,
                      width: `${progress}%`
                    }}
                  />
                </div>
              </div>
            </>
          )}

          {/* Continue button hint */}
          {!isComingSoon && (
            <div className="mt-4 pt-4 border-t border-border/50">
              <div className="flex items-center justify-center text-xs text-muted-foreground group-hover:text-primary transition-colors">
                <span>Hacer clic para {progress > 0 ? 'continuar' : 'comenzar'}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};