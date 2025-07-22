import React, { useEffect, useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import * as Icons from 'lucide-react';
import { ArrowLeft, Clock, Play, CheckCircle } from 'lucide-react';

interface Track {
  id: string;
  name: string;
  description: string;
  icon_name: string;
  color: string;
}

interface Class {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
  tools_used: string[];
  order_index: number;
}

interface UserProgress {
  class_id: string;
  completed: boolean;
}

export const TrackDetail: React.FC = () => {
  const { trackId } = useParams<{ trackId: string }>();
  const [track, setTrack] = useState<Track | null>(null);
  const [classes, setClasses] = useState<Class[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  useEffect(() => {
    const fetchTrackData = async () => {
      if (!trackId) return;

      try {
        // Fetch track info
        const { data: trackData, error: trackError } = await supabase
          .from('tracks')
          .select('*')
          .eq('id', trackId)
          .single();

        if (trackError) {
          toast({
            title: 'Error',
            description: 'No se pudo cargar el track',
            variant: 'destructive',
          });
          navigate('/dashboard');
          return;
        }

        setTrack(trackData);

        // Fetch classes for this track
        const { data: classesData, error: classesError } = await supabase
          .from('classes')
          .select('*')
          .eq('track_id', trackId)
          .order('order_index');

        if (classesError) {
          toast({
            title: 'Error',
            description: 'No se pudieron cargar las clases',
            variant: 'destructive',
          });
        } else {
          setClasses(classesData || []);
        }

        // Fetch user progress
        const { data: progressData, error: progressError } = await supabase
          .from('user_progress')
          .select('class_id, completed')
          .eq('user_id', user.id)
          .in('class_id', classesData?.map(c => c.id) || []);

        if (!progressError) {
          setUserProgress(progressData || []);
        }

      } catch (error) {
        console.error('Track detail error:', error);
        toast({
          title: 'Error',
          description: 'Hubo un problema al cargar el track',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTrackData();
  }, [trackId, user.id, toast, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!track) {
    return <Navigate to="/dashboard" replace />;
  }

  const IconComponent = Icons[track.icon_name as keyof typeof Icons] as React.ComponentType<any>;
  
  const getClassProgress = (classId: string) => {
    return userProgress.find(p => p.class_id === classId)?.completed || false;
  };

  const completedClasses = userProgress.filter(p => p.completed).length;
  const totalClasses = classes.length;
  const progressPercentage = totalClasses > 0 ? (completedClasses / totalClasses) * 100 : 0;

  const handleClassClick = (classId: string) => {
    navigate(`/class/${classId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al Dashboard
        </Button>

        {/* Track Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div 
                  className="flex items-center justify-center w-16 h-16 rounded-xl"
                  style={{ backgroundColor: `${track.color}20`, color: track.color }}
                >
                  {IconComponent && <IconComponent className="h-8 w-8" />}
                </div>
                
                <div className="flex-1">
                  <CardTitle className="text-2xl text-card-foreground mb-2">
                    {track.name}
                  </CardTitle>
                  <p className="text-muted-foreground mb-4">
                    {track.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progreso del track</span>
                      <span className="text-card-foreground font-medium">
                        {completedClasses}/{totalClasses} clases completadas
                      </span>
                    </div>
                    <Progress 
                      value={progressPercentage} 
                      className="h-3"
                      style={{
                        '--progress-color': track.color
                      } as React.CSSProperties}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Classes List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-foreground mb-6">Clases</h2>
          
          <div className="space-y-4">
            {classes.map((classItem, index) => {
              const isCompleted = getClassProgress(classItem.id);
              
              return (
                <motion.div
                  key={classItem.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <Card 
                    className="cursor-pointer hover:shadow-card transition-all duration-200 bg-card border-border group"
                    onClick={() => handleClassClick(classItem.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          {isCompleted ? (
                            <CheckCircle className="h-6 w-6 text-success" />
                          ) : (
                            <Play className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-medium text-card-foreground group-hover:text-primary transition-colors">
                              {classItem.title}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              {classItem.duration_minutes} min
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground mb-3">
                            {classItem.description}
                          </p>
                          
                          {classItem.tools_used.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {classItem.tools_used.map((tool) => (
                                <Badge key={tool} variant="secondary" className="text-xs">
                                  {tool}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </main>
    </div>
  );
};