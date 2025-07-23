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

// Track courses structure
const trackCourses = {
  "track-1": [
    { title: "Curso 1: Tu segundo cerebro - Prompts para la captura, organización y síntesis de información", classCount: 5 },
    { title: "Curso 2: Acelerador de contenido - Prompts para escribir mejor y más rápido", classCount: 6 },
    { title: "Curso 3: Análisis inteligente - Prompts para análisis de datos y documentos", classCount: 5 }
  ],
  "track-2": [
    { title: "Curso 1: Asistente creativo - Prompts para campañas de marketing", classCount: 6 },
    { title: "Curso 2: Personalizador de ventas - Prompts para crear mensajes que conecten", classCount: 5 },
    { title: "Curso 3: Growth hacker - Prompts para hacer crecer tu negocio", classCount: 5 }
  ],
  "track-3": [
    { title: "Curso 1: Tu asistente de recursos humanos - Prompts para el talento humano", classCount: 5 },
    { title: "Curso 2: Mentor de liderazgo - Prompts para liderar con inteligencia artificial", classCount: 5 },
    { title: "Curso 3: Facilitador de equipos - Prompts para potenciar equipos de trabajo", classCount: 5 }
  ],
  "track-4": [
    { title: "Curso 1: Consultor estratégico - Prompts para la planeación estratégica", classCount: 5 },
    { title: "Curso 2: Analista de mercados - Prompts para investigación de mercados", classCount: 5 },
    { title: "Curso 3: Optimizador de procesos - Prompts para la mejora de procesos", classCount: 5 }
  ],
  "track-5": [
    { title: "Curso 1: Asistente financiero - Prompts para análisis financiero", classCount: 5 },
    { title: "Curso 2: Evaluador de riesgos - Prompts para evaluación de riesgos", classCount: 5 },
    { title: "Curso 3: Planificador de inversiones - Prompts para planificación de inversiones", classCount: 5 }
  ],
  "track-6": [
    { title: "Curso 1: Diseñador instruccional - Prompts para crear contenido educativo", classCount: 5 },
    { title: "Curso 2: Evaluador pedagógico - Prompts para evaluación y retroalimentación", classCount: 5 },
    { title: "Curso 3: Facilitador de aprendizaje - Prompts para facilitar el aprendizaje", classCount: 5 }
  ]
};

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

interface UserProfile {
  full_name: string;
  email: string;
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
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
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

        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('full_name, email')
          .eq('id', user.id)
          .single();

        if (!profileError) {
          setUserProfile(profileData);
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

  const checkAndProcessCompletions = async () => {
    if (!user || !track || !classData) return;

    // Obtener todas las clases y el progreso del track actual
    const { data: trackClasses } = await supabase.from('classes').select('id, order_index').eq('track_id', track.id);
    const { data: userProgressForTrack } = await supabase.from('user_progress').select('class_id').eq('user_id', user.id).eq('completed', true).in('class_id', trackClasses?.map(c => c.id) || []);

    if (!trackClasses || !userProgressForTrack) return;

    const completedClassIds = new Set(userProgressForTrack.map(p => p.class_id));
    const coursesInTrack = trackCourses[track.id as keyof typeof trackCourses] || [];
    let classStartIndex = 0;

    // Verificar cada curso del track
    for (const course of coursesInTrack) {
      const courseClasses = trackClasses.slice(classStartIndex, classStartIndex + course.classCount);
      const allCourseClassesCompleted = courseClasses.every(c => completedClassIds.has(c.id));

      if (allCourseClassesCompleted) {
        // Verificar si ya se emitió certificado para este curso
        const { data: existingCourseCert } = await supabase.from('certificates').select('id').eq('user_id', user.id).eq('track_id', track.id).eq('course_title', course.title).maybeSingle();

        if (!existingCourseCert) {
          // Si no existe, crearlo y enviar correo
          await supabase.from('certificates').insert({
            user_id: user.id,
            track_id: track.id,
            course_title: course.title,
            certificate_type: 'course',
          });
          await supabase.functions.invoke('send-certificate-email', {
            body: { userId: user.id, trackId: track.id, userEmail: user.email, courseTitle: course.title },
          });
          toast({ title: `¡Curso "${course.title}" completado!`, description: 'Te hemos enviado tu certificado por correo.' });
        }
      }
      classStartIndex += course.classCount;
    }

    // Verificar si el track completo está finalizado
    if (completedClassIds.size === trackClasses.length) {
      const { data: existingTrackCert } = await supabase.from('certificates').select('id').eq('user_id', user.id).eq('track_id', track.id).eq('certificate_type', 'track').maybeSingle();

      if (!existingTrackCert) {
        // Si no existe, crearlo y enviar correo
        await supabase.from('certificates').insert({
          user_id: user.id,
          track_id: track.id,
          certificate_type: 'track',
        });
        await supabase.functions.invoke('send-certificate-email', {
          body: { userId: user.id, trackId: track.id, userEmail: user.email },
        });
        toast({ title: `¡Track "${track.name}" completado!`, description: '¡Felicidades! Tu certificado ha sido enviado a tu correo.' });
      }
    }
  };

  const handleMarkComplete = async () => {
    if (!classData || !user || markingComplete) return;

    setMarkingComplete(true);
    try {
      // 1. Marcar la clase actual como completada
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          class_id: classData.id,
          completed: true,
          completed_at: new Date().toISOString(),
        });

      if (error) throw error;

      setUserProgress({ completed: true });
      toast({
        title: '¡Clase completada!',
        description: 'Has completado esta clase exitosamente.',
      });

      // 2. Verificar si se ha completado un curso o el track entero
      await checkAndProcessCompletions();

    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo marcar la clase como completada.',
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

        <div className="space-y-8">
          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-background/60 backdrop-blur-sm border border-white/20 shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 aspect-video flex items-center justify-center">
                  {/* Video placeholder with styling to match the reference */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 mx-auto border border-white/30">
                      <Play className="h-8 w-8 text-white ml-1" />
                    </div>
                    <h3 className="text-white text-xl font-semibold mb-2">
                      {classData.title}
                    </h3>
                    <p className="text-white/80 text-sm">
                      Duración: {classData.duration_minutes} minutos
                    </p>
                  </div>
                  
                  {/* Overlay effects for modern look */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-black/30 text-white border-white/20 backdrop-blur-sm">
                      🎥 Video Clase
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Resources Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="bg-background/60 backdrop-blur-sm border border-white/20 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      Recursos de la Clase
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-3">
                      <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-muted/30 hover:border-primary/30 transition-colors group cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                            <span className="text-red-500 font-bold text-sm">PDF</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              50 Prompts que te van a ahorrar horas
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Guía completa con ejemplos prácticos
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="hover:bg-primary/10">
                          Descargar
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-muted/30 hover:border-primary/30 transition-colors group cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <Lightbulb className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              Plantillas de Prompts
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Formatos listos para usar
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="hover:bg-primary/10">
                          Ver
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-muted/30 hover:border-primary/30 transition-colors group cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                            <Target className="h-5 w-5 text-green-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              Ejercicios Prácticos
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Actividades para aplicar lo aprendido
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="hover:bg-primary/10">
                          Practicar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Learning Objectives */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
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