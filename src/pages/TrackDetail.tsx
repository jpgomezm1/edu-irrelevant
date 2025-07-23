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
import { ArrowLeft, Clock, Play, CheckCircle, Target, BookOpen, TrendingUp, Award, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  is_coming_soon: boolean;
}

interface UserProgress {
  class_id: string;
  completed: boolean;
}

// Estructura para definir los cursos dentro de cada track
const trackCourses = {
  // ID del Track 'Fundamentos IA'
  '66774a85-35be-4e24-b875-61dbdd791bde': [
    { title: 'Curso 1: ¿Qué es la IA y por qué todos hablan de eso?', classCount: 5 },
    { title: 'Curso 2: Entendiendo los LLM (sin necesidad de ser ingeniero)', classCount: 5 },
    { title: 'Curso 3: Habla claro, humano – Prompting para no técnicos', classCount: 5 },
    { title: 'Curso 4: Aplicando IA sin ser técnico', classCount: 5 },
    { title: 'Curso 5: Mentalidad AI-First para empresas', classCount: 5 },
  ],
  // ID del Track 'Herramientas que te hacen parecer brujo...'
  'd8975638-5b05-430c-872a-6bdd6222ff93': [
    { title: 'Curso 1: Tu segundo cerebro (pero con esteroides)', classCount: 5 },
    { title: 'Curso 2: Crea sin tener equipo (ni talento)', classCount: 5 },
    { title: 'Curso 3: Análisis sin Excel (ni trauma)', classCount: 5 },
    { title: 'Curso 4: Automatiza o muere (la era del click está acabando)', classCount: 5 },
    { title: 'Curso 5: LLMs sin paja (cuál IA usar y para qué)', classCount: 5 },
  ],
  // ID del Track 'IA para Negocios: Automatización y Estrategia'
  '0725639f-7272-4e5e-bd51-5021a1cf678f': [
    { title: 'Curso 1: Vender sin perseguir (ni sonar como robot)', classCount: 5 },
    { title: 'Curso 2: Marketing que no parece hecho por interns', classCount: 5 },
    { title: 'Curso 3: Finanzas sin trauma (ni fórmulas del demonio)', classCount: 5 },
    { title: 'Curso 4: Atención al cliente que no da pena', classCount: 5 },
    { title: 'Curso 5: Operaciones sin drama (ni correos eternos)', classCount: 5 },
  ],
  // ID del Track 'Workflows que valen más que un empleado'
  'b71a930c-ee4c-46fc-9be2-863283f87b59': [
    { title: 'Curso 1 (n8n): "Responder leads automáticamente por WhatsApp (y hacer seguimiento)"', classCount: 5 },
    { title: 'Curso 2 (n8n): "Generar certificados laborales automáticos desde un correo"', classCount: 5 },
    { title: 'Curso 3 (Make): "Flujo de agendamiento con seguimiento automático"', classCount: 5 },
    { title: 'Curso 4 (Gumloop): "Dashboard de ventas automático (sin saber BI)"', classCount: 5 },
    { title: 'Curso 5 (Zapier): "Bot de atención básica 24/7 con FAQs y captura de datos"', classCount: 5 },
  ],
  // ID del Track 'Vibe Coding'
  '1ab56cb1-43f6-42db-b799-c3009ce6b76b': [
    { title: 'Curso 1: "Instala lo que nunca pensaste instalar (y no te asustes)"', classCount: 5 },
    { title: 'Curso 2: "Lovable: tu primer app sin backend ni estrés"', classCount: 5 },
    { title: 'Curso 3: "Cursor: programá como si tuvieras un copiloto que sí sabe"', classCount: 5 },
    { title: 'Curso 4: "Replit: tu laboratorio de experimentos sin instalar nada"', classCount: 5 },
    { title: 'Curso 5: "Construí una mini app real desde cero (sí, vos)"', classCount: 5 },
  ],
  // ID del Track 'Construí vainas útiles con Vibe Coding'
  '562e6e60-0ccd-4733-8ff3-a9ab0b38a3b1': [
    { title: 'Curso 1: Bot que responde correos por vos (modo pro)', classCount: 5 },
    { title: 'Curso 2: Generador de cotizaciones inteligente', classCount: 5 },
    { title: 'Curso 3: Scraper + analizador de reseñas de productos', classCount: 5 },
    { title: 'Curso 4: Asistente tipo ChatGPT con tu info personal', classCount: 5 },
    { title: 'Curso 5: Dashboard financiero que lee tus movimientos y te da insights', classCount: 5 },
  ]
};

export const TrackDetail: React.FC = () => {
  const { trackId } = useParams<{ trackId: string }>();
  const [track, setTrack] = useState<Track | null>(null);
  const [classes, setClasses] = useState<Class[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [earnedCertificates, setEarnedCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, userProfile, overallProgress } = useAuth();
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

        // Fetch earned certificates
        const { data: certData } = await supabase
          .from('certificates')
          .select('course_title, track_id')
          .eq('user_id', user.id)
          .eq('track_id', trackId);
        if (certData) {
          setEarnedCertificates(certData);
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background/95">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Cargando track...</p>
        </div>
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
  const totalDuration = classes.reduce((acc, cls) => acc + cls.duration_minutes, 0);
  const remainingDuration = classes
    .filter(cls => !getClassProgress(cls.id))
    .reduce((acc, cls) => acc + cls.duration_minutes, 0);

  const handleClassClick = (classId: string, isComingSoon: boolean = false) => {
    if (!isComingSoon) {
      navigate(`/class/${classId}`);
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const handleDownloadCertificate = async (courseTitle?: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('generate-certificate', {
        body: { 
          userId: user.id, 
          trackName: track?.name,
          courseTitle,
          userName: userProfile?.full_name,
          completionDate: new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
        },
      });
      if (error) throw error;

      const blob = new Blob([data], { type: 'image/svg+xml' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const fileName = courseTitle 
        ? `certificado-curso-${courseTitle.replace(/\s+/g, '-')}.svg` 
        : `certificado-track-${track?.name.replace(/\s+/g, '-')}.svg`;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      // Record certificate in database
      if (courseTitle) {
        await supabase.from('certificates').insert({
          user_id: user.id,
          track_id: trackId,
          course_title: courseTitle,
          certificate_type: 'course'
        });
      } else {
        await supabase.from('certificates').insert({
          user_id: user.id,
          track_id: trackId,
          certificate_type: 'track'
        });
      }

      toast({ 
        title: 'Certificado descargado', 
        description: 'Tu certificado se ha descargado exitosamente.' 
      });
    } catch (e) {
      toast({ 
        title: 'Error al descargar', 
        description: 'No se pudo generar tu certificado.', 
        variant: 'destructive' 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background/95">
      <Header userProfile={userProfile} overallProgress={overallProgress} />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="mb-8 hover:bg-primary/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Dashboard
          </Button>
        </motion.div>

        {/* Track Header Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <Card className="bg-background/60 backdrop-blur-sm border border-white/20 shadow-2xl overflow-hidden">
            {/* Header accent */}
            <div 
              className="h-2 w-full"
              style={{ backgroundColor: track.color }}
            />
            
            <CardHeader className="pb-8">
              <div className="flex items-start gap-6">
                <div 
                  className="flex items-center justify-center w-20 h-20 rounded-2xl shadow-lg"
                  style={{ backgroundColor: `${track.color}15`, color: track.color, border: `2px solid ${track.color}30` }}
                >
                  {IconComponent && <IconComponent className="h-10 w-10" />}
                </div>
                
                <div className="flex-1">
                  <CardTitle className="text-3xl font-bold text-foreground mb-3">
                    {track.name}
                  </CardTitle>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    {track.description}
                  </p>
                  
                  {/* Stats Row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Clases</p>
                        <p className="font-semibold text-foreground">{totalClasses}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 rounded-lg">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="text-xs text-muted-foreground">Duración</p>
                        <p className="font-semibold text-foreground">{formatTime(totalDuration)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-green-500/10 rounded-lg">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <div>
                        <p className="text-xs text-muted-foreground">Progreso</p>
                        <p className="font-semibold text-foreground">{Math.round(progressPercentage)}%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-orange-500/10 rounded-lg">
                      <Target className="h-4 w-4 text-orange-500" />
                      <div>
                        <p className="text-xs text-muted-foreground">Restante</p>
                        <p className="font-semibold text-foreground">{formatTime(remainingDuration)}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">Progreso del track</span>
                      <span className="text-sm font-bold" style={{ color: track.color }}>
                        {completedClasses}/{totalClasses} completadas
                      </span>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-muted/30 rounded-full h-3 overflow-hidden border border-muted/20">
                        <div 
                          className="h-3 rounded-full transition-all duration-700 ease-out shadow-sm"
                          style={{
                            background: `linear-gradient(90deg, ${track.color}, ${track.color}90)`,
                            width: `${progressPercentage}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Classes Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Clases del Track
              </h2>
              <p className="text-muted-foreground">
                Sigue el orden sugerido para maximizar tu aprendizaje
              </p>
            </div>
            
            {/* Achievement badge and Certificate button */}
            <div className="flex items-center gap-4">
              {progressPercentage === 100 && (
                <>
                  <Badge className="bg-yellow-500/15 text-yellow-600 border-yellow-500/30 px-4 py-2">
                    <Award className="w-4 h-4 mr-2" />
                    Track Completado
                  </Badge>
                  <Button onClick={() => handleDownloadCertificate()}>
                    <Award className="w-4 h-4 mr-2" />
                    Descargar Certificado del Track
                  </Button>
                </>
              )}
            </div>
          </div>
          
          <div className="space-y-8">
            {(() => {
              // Obtener la estructura de cursos para este track
              const currentTrackCourses = trackCourses[trackId as keyof typeof trackCourses];
              
              if (!currentTrackCourses) {
                // Fallback para tracks no configurados - mantener comportamiento anterior
                const groupedClasses = classes.reduce((acc, classItem, index) => {
                  const courseTitle = classItem.description;
                  if (!acc[courseTitle]) {
                    acc[courseTitle] = [];
                  }
                  acc[courseTitle].push({ ...classItem, globalIndex: index });
                  return acc;
                }, {} as Record<string, (Class & { globalIndex: number })[]>);

                return Object.entries(groupedClasses).map(([courseTitle, courseClasses], courseIndex) => (
                  <div key={courseTitle} className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * courseIndex }}
                      className="mb-6"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
                          style={{ backgroundColor: track.color }}
                        >
                          {courseIndex + 1}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-foreground">
                            {courseTitle}
                          </h3>
                          <p className="text-muted-foreground">
                            {courseClasses.length} clases • {courseClasses.reduce((acc, cls) => acc + cls.duration_minutes, 0)} minutos
                          </p>
                        </div>
                      </div>
                      <div 
                        className="h-px w-full opacity-30"
                        style={{ backgroundColor: track.color }}
                      />
                    </motion.div>

                    <div className="space-y-3 ml-16">
                      {courseClasses.map((classItem) => {
                        const isCompleted = getClassProgress(classItem.id);
                        const isComingSoon = classItem.is_coming_soon;
                        
                        return (
                          <motion.div
                            key={classItem.id}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 * classItem.globalIndex }}
                          >
                            <Card 
                              className={cn(
                                "bg-background/60 backdrop-blur-sm border border-white/20 transition-all duration-300 group shadow-lg",
                                isComingSoon 
                                  ? "opacity-60 cursor-not-allowed group-hover:border-white/20" 
                                  : "cursor-pointer hover:border-white/30 hover:shadow-xl"
                              )}
                              onClick={() => handleClassClick(classItem.id, isComingSoon)}
                            >
                              <CardContent className="p-5">
                                <div className="flex items-start gap-4">
                                  <div className="flex-shrink-0 mt-1">
                                    {isComingSoon ? (
                                      <div className="w-7 h-7 bg-gray-500/20 rounded-full flex items-center justify-center">
                                        <Lock className="h-4 w-4 text-gray-500" />
                                      </div>
                                    ) : isCompleted ? (
                                      <div className="w-7 h-7 bg-green-500/20 rounded-full flex items-center justify-center">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                      </div>
                                    ) : (
                                      <div className="w-7 h-7 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                                        <Play className="h-3.5 w-3.5 text-primary ml-0.5" />
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                      <div>
                                        <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                                          {classItem.title}
                                        </h4>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                          <div className="flex items-center gap-1">
                                            <Clock className="h-3.5 w-3.5" />
                                            {classItem.duration_minutes} minutos
                                          </div>
                                          <div className="flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                            Clase #{classItem.order_index}
                                          </div>
                                        </div>
                                      </div>
                                      
                                      {isComingSoon ? (
                                        <Badge variant="outline" className="bg-gray-500/10 text-gray-500 border-gray-500/20 text-xs">
                                          Próximamente
                                        </Badge>
                                      ) : isCompleted && (
                                        <Badge className="bg-green-500/15 text-green-600 border-green-500/30 text-xs">
                                          Completada
                                        </Badge>
                                      )}
                                    </div>
                                    
                                    {classItem.tools_used.length > 0 && (
                                      <div className="mt-3">
                                        <div className="flex flex-wrap gap-1.5">
                                          {classItem.tools_used.map((tool) => (
                                            <Badge key={tool} variant="outline" className="bg-muted/20 text-xs border-muted-foreground/30 py-0 px-2">
                                              {tool}
                                            </Badge>
                                          ))}
                                        </div>
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
                  </div>
                ));
              }

              // Nueva lógica usando la estructura trackCourses
              let classIndex = 0;
              
              return currentTrackCourses.map((course, courseIndex) => {
                // Obtener las clases para este curso usando slice
                const courseClasses = classes.slice(classIndex, classIndex + course.classCount);
                classIndex += course.classCount;

                return (
                  <div key={course.title} className="space-y-4">
                    {/* Course Header */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * courseIndex }}
                      className="mb-6"
                    >
                       <div className="flex items-center justify-between mb-4">
                         <div className="flex items-center gap-4">
                           <div 
                             className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
                             style={{ backgroundColor: track.color }}
                           >
                             {courseIndex + 1}
                           </div>
                           <div>
                             <h3 className="text-2xl font-bold text-foreground">
                               {course.title}
                             </h3>
                             <p className="text-muted-foreground">
                               {courseClasses.length} clases • {courseClasses.reduce((acc, cls) => acc + cls.duration_minutes, 0)} minutos
                             </p>
                           </div>
                         </div>
                         
                          {/* Course Certificate Button */}
                          {(() => {
                            // Only consider non-coming-soon classes for completion
                            const availableClasses = courseClasses.filter(cls => !cls.is_coming_soon);
                            const courseCompleted = availableClasses.length > 0 && availableClasses.every(cls => getClassProgress(cls.id));
                            const certificateEarned = earnedCertificates.some(c => c.course_title === course.title);
                            const hasComingSoonClasses = courseClasses.some(cls => cls.is_coming_soon);
                            
                            if (courseCompleted) {
                              return (
                                <div className="flex items-center gap-2">
                                  {hasComingSoonClasses && (
                                    <Badge variant="outline" className="bg-gray-500/10 text-gray-500 border-gray-500/20 text-xs">
                                      Próximamente
                                    </Badge>
                                  )}
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDownloadCertificate(course.title);
                                    }}
                                  >
                                    <Award className="w-4 h-4 mr-2" />
                                    {certificateEarned ? 'Descargar Certificado' : 'Obtener Certificado'}
                                  </Button>
                                </div>
                              );
                            } else if (hasComingSoonClasses && availableClasses.length === 0) {
                              return (
                                <Badge variant="outline" className="bg-gray-500/10 text-gray-500 border-gray-500/20">
                                  Próximamente
                                </Badge>
                              );
                            }
                            return null;
                          })()}
                       </div>
                      <div 
                        className="h-px w-full opacity-30"
                        style={{ backgroundColor: track.color }}
                      />
                    </motion.div>

                    {/* Course Classes */}
                    <div className="space-y-3 ml-16">
                      {courseClasses.map((classItem, classIndexInCourse) => {
                        const isCompleted = getClassProgress(classItem.id);
                        const isComingSoon = classItem.is_coming_soon;
                        const globalIndex = courseIndex * course.classCount + classIndexInCourse;
                        
                        return (
                          <motion.div
                            key={classItem.id}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 * globalIndex }}
                          >
                            <Card 
                              className={cn(
                                "bg-background/60 backdrop-blur-sm border border-white/20 transition-all duration-300 group shadow-lg",
                                isComingSoon 
                                  ? "opacity-60 cursor-not-allowed group-hover:border-white/20" 
                                  : "cursor-pointer hover:border-white/30 hover:shadow-xl"
                              )}
                              onClick={() => handleClassClick(classItem.id, isComingSoon)}
                            >
                              <CardContent className="p-5">
                                <div className="flex items-start gap-4">
                                  {/* Status Icon */}
                                  <div className="flex-shrink-0 mt-1">
                                    {isComingSoon ? (
                                      <div className="w-7 h-7 bg-gray-500/20 rounded-full flex items-center justify-center">
                                        <Lock className="h-4 w-4 text-gray-500" />
                                      </div>
                                    ) : isCompleted ? (
                                      <div className="w-7 h-7 bg-green-500/20 rounded-full flex items-center justify-center">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                      </div>
                                    ) : (
                                      <div className="w-7 h-7 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                                        <Play className="h-3.5 w-3.5 text-primary ml-0.5" />
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                      <div>
                                        <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                                          {classItem.title}
                                        </h4>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                          <div className="flex items-center gap-1">
                                            <Clock className="h-3.5 w-3.5" />
                                            {classItem.duration_minutes} minutos
                                          </div>
                                          <div className="flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                            Clase #{classItem.order_index}
                                          </div>
                                        </div>
                                      </div>
                                      
                                      {isComingSoon ? (
                                        <Badge variant="outline" className="bg-gray-500/10 text-gray-500 border-gray-500/20 text-xs">
                                          Próximamente
                                        </Badge>
                                      ) : isCompleted && (
                                        <Badge className="bg-green-500/15 text-green-600 border-green-500/30 text-xs">
                                          Completada
                                        </Badge>
                                      )}
                                    </div>
                                    
                                    {/* Tools */}
                                    {classItem.tools_used.length > 0 && (
                                      <div className="mt-3">
                                        <div className="flex flex-wrap gap-1.5">
                                          {classItem.tools_used.map((tool) => (
                                            <Badge key={tool} variant="outline" className="bg-muted/20 text-xs border-muted-foreground/30 py-0 px-2">
                                              {tool}
                                            </Badge>
                                          ))}
                                        </div>
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
                  </div>
                );
              });
            })()}
          </div>
        </motion.div>
      </main>
    </div>
  );
};