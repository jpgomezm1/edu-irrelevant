import React, { useEffect, useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ArrowRight, Clock, CheckCircle, Play } from 'lucide-react';

interface Class {
  id: string;
  track_id: string;
  title: string;
  description: string;
  duration_minutes: number;
  tools_used: string[];
  order_index: number;
}

interface Track {
  id: string;
  name: string;
  color: string;
}

interface NavClass {
  id: string;
  title: string;
  order_index: number;
}

interface UserProgress {
  completed: boolean;
}

export const ClassDetail: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const [classData, setClassData] = useState<Class | null>(null);
  const [track, setTrack] = useState<Track | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [nextClass, setNextClass] = useState<NavClass | null>(null);
  const [prevClass, setPrevClass] = useState<NavClass | null>(null);
  const [loading, setLoading] = useState(true);
  const [markingComplete, setMarkingComplete] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  useEffect(() => {
    const fetchClassData = async () => {
      if (!classId) return;

      try {
        // Fetch class info
        const { data: classDataResult, error: classError } = await supabase
          .from('classes')
          .select('*')
          .eq('id', classId)
          .single();

        if (classError) {
          toast({
            title: 'Error',
            description: 'No se pudo cargar la clase',
            variant: 'destructive',
          });
          navigate('/dashboard');
          return;
        }

        setClassData(classDataResult);

        // Fetch track info
        const { data: trackData, error: trackError } = await supabase
          .from('tracks')
          .select('id, name, color')
          .eq('id', classDataResult.track_id)
          .single();

        if (!trackError) {
          setTrack(trackData);
        }

        // Fetch user progress for this class
        const { data: progressData, error: progressError } = await supabase
          .from('user_progress')
          .select('completed')
          .eq('user_id', user.id)
          .eq('class_id', classId)
          .maybeSingle();

        if (!progressError) {
          setUserProgress(progressData);
        }

        // Fetch next and previous classes
        const { data: allClasses, error: allClassesError } = await supabase
          .from('classes')
          .select('id, title, order_index')
          .eq('track_id', classDataResult.track_id)
          .order('order_index');

        if (!allClassesError && allClasses) {
          const currentIndex = allClasses.findIndex(c => c.id === classId);
          if (currentIndex > 0) {
            setPrevClass(allClasses[currentIndex - 1]);
          }
          if (currentIndex < allClasses.length - 1) {
            setNextClass(allClasses[currentIndex + 1]);
          }
        }

      } catch (error) {
        console.error('Class detail error:', error);
        toast({
          title: 'Error',
          description: 'Hubo un problema al cargar la clase',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchClassData();
  }, [classId, user.id, toast, navigate]);

  const handleMarkComplete = async () => {
    if (!classData || markingComplete) return;

    setMarkingComplete(true);
    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          class_id: classData.id,
          completed: true,
          completed_at: new Date().toISOString(),
        });

      if (error) {
        toast({
          title: 'Error',
          description: 'No se pudo marcar la clase como completada',
          variant: 'destructive',
        });
      } else {
        setUserProgress({ completed: true });
        toast({
          title: '¡Clase completada!',
          description: 'Has completado esta clase exitosamente',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Hubo un problema al marcar la clase como completada',
        variant: 'destructive',
      });
    } finally {
      setMarkingComplete(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!classData) {
    return <Navigate to="/dashboard" replace />;
  }

  const isCompleted = userProgress?.completed || false;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(`/track/${classData.track_id}`)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al Track
        </Button>

        {/* Class Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {track && (
                      <Badge 
                        variant="secondary" 
                        style={{ backgroundColor: `${track.color}20`, color: track.color }}
                      >
                        {track.name}
                      </Badge>
                    )}
                    {isCompleted && (
                      <Badge variant="default" className="bg-success text-white">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Completada
                      </Badge>
                    )}
                  </div>
                  
                  <CardTitle className="text-2xl text-card-foreground mb-3">
                    {classData.title}
                  </CardTitle>
                  
                  <p className="text-muted-foreground mb-4">
                    {classData.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {classData.duration_minutes} minutos
                    </div>
                    <div className="flex items-center gap-1">
                      <Play className="h-4 w-4" />
                      Clase interactiva
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Tools Section */}
        {classData.tools_used.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg text-card-foreground">
                  Herramientas que utilizarás
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {classData.tools_used.map((tool) => (
                    <Badge key={tool} variant="outline" className="text-sm">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Class Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg text-card-foreground">
                Contenido de la clase
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Esta es una clase interactiva donde aprenderás sobre {classData.title.toLowerCase()}. 
                  El contenido incluye ejemplos prácticos y ejercicios que puedes aplicar inmediatamente 
                  en tu trabajo.
                </p>
                
                <div className="bg-muted/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-card-foreground mb-2">Lo que aprenderás:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Conceptos fundamentales y aplicaciones prácticas</li>
                    <li>Mejores prácticas y casos de uso reales</li>
                    <li>Ejercicios paso a paso para implementar inmediatamente</li>
                    <li>Tips y trucos de profesionales experimentados</li>
                  </ul>
                </div>
                
                <p>
                  <strong>Duración estimada:</strong> {classData.duration_minutes} minutos
                </p>
                
                <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                  <p className="text-sm">
                    💡 <strong>Consejo:</strong> Ten a mano las herramientas mencionadas arriba 
                    para poder practicar mientras sigues la clase.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-between"
        >
          <div className="flex gap-2">
            {prevClass && (
              <Button
                variant="outline"
                onClick={() => navigate(`/class/${prevClass.id}`)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Clase anterior
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            {!isCompleted && (
              <Button
                onClick={handleMarkComplete}
                disabled={markingComplete}
                className="bg-success hover:bg-success/90 text-white"
              >
                {markingComplete ? 'Marcando...' : 'Marcar como completada'}
                <CheckCircle className="ml-2 h-4 w-4" />
              </Button>
            )}
            
            {nextClass && (
              <Button
                onClick={() => navigate(`/class/${nextClass.id}`)}
                variant={isCompleted ? "default" : "outline"}
              >
                Siguiente clase
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
};