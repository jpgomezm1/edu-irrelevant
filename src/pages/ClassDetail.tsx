import React, { useEffect, useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ArrowRight, Clock, CheckCircle, Play, Target, BookOpen, Lightbulb, Star } from 'lucide-react';

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background/95">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Cargando clase...</p>
        </div>
      </div>
    );
  }

  if (!classData) {
    return <Navigate to="/dashboard" replace />;
  }

  const isCompleted = userProgress?.completed || false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background/95">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate(`/track/${classData.track_id}`)}
            className="mb-8 hover:bg-primary/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Track
          </Button>
        </motion.div>

        {/* Class Header Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <Card className="bg-background/60 backdrop-blur-sm border border-white/20 shadow-2xl overflow-hidden">
            {/* Header accent */}
            {track && (
              <div 
                className="h-2 w-full"
                style={{ backgroundColor: track.color }}
              />
            )}
            
            <CardHeader className="pb-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    {track && (
                      <Badge 
                        className="text-white font-medium"
                        style={{ backgroundColor: track.color }}
                      >
                        {track.name}
                      </Badge>
                    )}
                    {isCompleted && (
                      <Badge className="bg-green-500/15 text-green-400 border-green-500/30">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Completada
                      </Badge>
                    )}
                  </div>
                  
                  <CardTitle className="text-3xl font-bold text-foreground mb-4 leading-tight">
                    {classData.title}
                  </CardTitle>
                  
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    {classData.description}
                  </p>
                  
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-full">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-foreground font-medium">{classData.duration_minutes} minutos</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 rounded-full">
                      <Play className="h-4 w-4 text-blue-500" />
                      <span className="text-foreground font-medium">Clase interactiva</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Learning Objectives */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="bg-background/60 backdrop-blur-sm border border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Lo que aprenderás
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    <div className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg">
                      <BookOpen className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground">Conceptos fundamentales</h4>
                        <p className="text-sm text-muted-foreground">Aplicaciones prácticas y fundamentos teóricos</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg">
                      <Star className="h-5 w-5 text-yellow-500 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground">Mejores prácticas</h4>
                        <p className="text-sm text-muted-foreground">Casos de uso reales y estrategias probadas</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg">
                      <Lightbulb className="h-5 w-5 text-orange-500 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground">Implementación práctica</h4>
                        <p className="text-sm text-muted-foreground">Ejercicios paso a paso para aplicar inmediatamente</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Class Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-background/60 backdrop-blur-sm border border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">
                    Contenido de la clase
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="prose prose-sm max-w-none text-muted-foreground">
                    <p className="text-base leading-relaxed">
                      Esta es una clase interactiva donde aprenderás sobre {classData.title.toLowerCase()}. 
                      El contenido incluye ejemplos prácticos y ejercicios que puedes aplicar inmediatamente 
                      en tu trabajo diario.
                    </p>
                  </div>
                  
                  <div className="bg-primary/5 border border-primary/20 p-6 rounded-xl">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Lightbulb className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">💡 Consejo Pro</h4>
                        <p className="text-sm text-muted-foreground">
                          Ten a mano las herramientas mencionadas para poder practicar mientras sigues la clase. 
                          La práctica activa acelera significativamente tu aprendizaje.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tools Section */}
            {classData.tools_used.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="bg-background/60 backdrop-blur-sm border border-white/20 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground">
                      🛠️ Herramientas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {classData.tools_used.map((tool) => (
                        <Badge key={tool} variant="outline" className="bg-muted/20 border-muted-foreground/30">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Progress Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="bg-background/60 backdrop-blur-sm border border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">
                    📈 Tu Progreso
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isCompleted ? (
                    <div className="text-center p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <p className="font-semibold text-green-600">¡Completada!</p>
                      <p className="text-xs text-green-600/80">Excelente trabajo</p>
                    </div>
                  ) : (
                    <Button
                      onClick={handleMarkComplete}
                      disabled={markingComplete}
                      className="w-full h-12 bg-gradient-primary hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      {markingComplete ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Marcando...
                        </div>
                      ) : (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Marcar como completada
                        </>
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-between mt-12 pt-8 border-t border-white/10"
        >
          <div>
            {prevClass && (
              <Button
                variant="outline"
                onClick={() => navigate(`/class/${prevClass.id}`)}
                className="hover:bg-primary/10"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Clase anterior
              </Button>
            )}
          </div>

          <div className="flex gap-3">
            {nextClass && (
              <Button
                onClick={() => navigate(`/class/${nextClass.id}`)}
                className={cn(
                  "h-12 px-6",
                  isCompleted 
                    ? "bg-gradient-primary hover:opacity-90" 
                    : "border-primary/50 hover:bg-primary/10"
                )}
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