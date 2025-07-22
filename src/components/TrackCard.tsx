import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';

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
  estimatedTime
}) => {
  const navigate = useNavigate();
  
  // Get the icon component dynamically
  const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<any>;

  const handleClick = () => {
    navigate(`/track/${id}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className={cn(
          "cursor-pointer bg-card border-border hover:shadow-card transition-all duration-300",
          "group relative overflow-hidden"
        )}
        onClick={handleClick}
      >
        <div 
          className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity"
          style={{ background: `linear-gradient(135deg, ${color}, transparent)` }}
        />
        
        <CardContent className="p-6 relative">
          <div className="flex items-start justify-between mb-4">
            <div 
              className="flex items-center justify-center w-12 h-12 rounded-lg"
              style={{ backgroundColor: `${color}20`, color }}
            >
              {IconComponent && <IconComponent className="h-6 w-6" />}
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">
                {completedClasses}/{totalClasses} clases
              </div>
              <div className="text-xs text-muted-foreground">
                ~{estimatedTime} min restantes
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {description}
          </p>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progreso</span>
              <span className="text-card-foreground font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress 
              value={progress} 
              className="h-2"
              style={{
                '--progress-color': color
              } as React.CSSProperties}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};