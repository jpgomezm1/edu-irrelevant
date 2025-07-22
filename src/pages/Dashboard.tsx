import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { TrackCard } from '@/components/TrackCard';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { TrendingUp, Target, Clock, Sparkles } from 'lucide-react';

interface Track {
 id: string;
 name: string;
 description: string;
 icon_name: string;
 color: string;
 order_index: number;
}

interface UserProfile {
 full_name: string;
 work_area: string;
 profile_completed: boolean;
}

interface ClassProgress {
 track_id: string;
 total_classes: number;
 completed_classes: number;
}

export const Dashboard: React.FC = () => {
 const [tracks, setTracks] = useState<Track[]>([]);
 const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
 const [classProgress, setClassProgress] = useState<ClassProgress[]>([]);
 const [loading, setLoading] = useState(true);
 const [profileChecked, setProfileChecked] = useState(false);
 const { user } = useAuth();
 const { toast } = useToast();

 useEffect(() => {
   const fetchData = async () => {
     if (!user?.id) return;

     try {
       // Fetch user profile
       const { data: profile, error: profileError } = await supabase
         .from('user_profiles')
         .select('full_name, work_area, profile_completed')
         .eq('id', user.id)
         .single();

       if (profileError) {
         console.error('Profile error:', profileError);
       } else if (profile) {
         setUserProfile(profile);
         setProfileChecked(true);
         
         // If profile is not completed, we'll handle redirect after state update
         if (!profile.profile_completed) {
           return;
         }
       }

       // Fetch tracks
       const { data: tracksData, error: tracksError } = await supabase
         .from('tracks')
         .select('*')
         .order('order_index');

       if (tracksError) {
         toast({
           title: 'Error',
           description: 'No se pudieron cargar los tracks',
           variant: 'destructive',
         });
       } else {
         setTracks(tracksData || []);
       }

       // Fetch class progress for each track
       const { data: progressData, error: progressError } = await supabase
         .from('user_progress')
         .select(`
           class_id,
           completed,
           classes (
             track_id
           )
         `)
         .eq('user_id', user.id);

       if (!progressError && progressData) {
         // Get total classes per track
         const { data: classesData } = await supabase
           .from('classes')
           .select('track_id, id');

         if (classesData) {
           const trackProgress: { [key: string]: ClassProgress } = {};
           
           // Initialize with total classes count
           classesData.forEach(cls => {
             if (!trackProgress[cls.track_id]) {
               trackProgress[cls.track_id] = {
                 track_id: cls.track_id,
                 total_classes: 0,
                 completed_classes: 0
               };
             }
             trackProgress[cls.track_id].total_classes++;
           });

           // Count completed classes
           progressData.forEach(progress => {
             if (progress.completed && progress.classes) {
               const trackId = progress.classes.track_id;
               if (trackProgress[trackId]) {
                 trackProgress[trackId].completed_classes++;
               }
             }
           });

           setClassProgress(Object.values(trackProgress));
         }
       }
     } catch (error) {
       console.error('Dashboard error:', error);
       toast({
         title: 'Error',
         description: 'Hubo un problema al cargar el dashboard',
         variant: 'destructive',
       });
     } finally {
       setLoading(false);
     }
   };

   fetchData();
 }, [user?.id, toast]);

 // Early return for auth check
 if (!user) {
   return <Navigate to="/auth" replace />;
 }

 // Early return for profile completion check
 if (profileChecked && userProfile && !userProfile.profile_completed) {
   return <Navigate to="/onboarding" replace />;
 }

 // Loading state
 if (loading || !profileChecked) {
   return (
     <div className="min-h-screen flex items-center justify-center bg-background">
       <div className="flex flex-col items-center gap-4">
         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
         <p className="text-sm text-muted-foreground">Cargando tu dashboard...</p>
       </div>
     </div>
   );
 }

 const calculateOverallProgress = () => {
   if (classProgress.length === 0) return 0;
   
   const totalClasses = classProgress.reduce((acc, track) => acc + track.total_classes, 0);
   const completedClasses = classProgress.reduce((acc, track) => acc + track.completed_classes, 0);
   
   return totalClasses > 0 ? (completedClasses / totalClasses) * 100 : 0;
 };

 const getTrackProgress = (trackId: string) => {
   const progress = classProgress.find(p => p.track_id === trackId);
   return progress ? {
     progress: progress.total_classes > 0 ? (progress.completed_classes / progress.total_classes) * 100 : 0,
     completedClasses: progress.completed_classes,
     totalClasses: progress.total_classes,
     estimatedTime: (progress.total_classes - progress.completed_classes) * 25 // Approximate 25 min per class
   } : {
     progress: 0,
     completedClasses: 0,
     totalClasses: 0,
     estimatedTime: 0
   };
 };

 const getGreeting = () => {
   const hour = new Date().getHours();
   if (hour < 12) return '🌅 Buenos días';
   if (hour < 18) return '☀️ Buenas tardes';
   return '🌙 Buenas noches';
 };

 const getMotivationalMessage = () => {
   const overallProgress = calculateOverallProgress();
   if (overallProgress === 0) {
     return "¡Es hora de comenzar tu viaje hacia el dominio de la IA!";
   } else if (overallProgress < 25) {
     return "¡Excelente inicio! Cada paso te acerca más a ser un experto en IA.";
   } else if (overallProgress < 50) {
     return "¡Vas por buen camino! Tu dedicación está dando frutos.";
   } else if (overallProgress < 75) {
     return "¡Increíble progreso! Estás dominando la IA empresarial.";
   } else if (overallProgress < 100) {
     return "¡Casi lo logras! Estás a punto de completar tu formación.";
   } else {
     return "🎉 ¡Felicitaciones! Has completado toda tu formación en IA.";
   }
 };

 const totalRemainingTime = classProgress.reduce((acc, track) => 
   acc + (track.total_classes - track.completed_classes) * 25, 0
 );

 return (
   <div className="min-h-screen bg-gradient-to-br from-background via-primary/2 to-background">
     <Header 
       userProfile={userProfile || undefined} 
       overallProgress={calculateOverallProgress()}
     />
     
     <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
       {/* Welcome Section mejorada */}
       <motion.div
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, ease: "easeOut" }}
         className="mb-12"
       >
         <div className="bg-background/60 backdrop-blur-sm border border-primary/10 rounded-2xl p-8 shadow-lg">
           <div className="flex items-start justify-between">
             <div className="flex-1">
               <div className="flex items-center gap-2 mb-2">
                 <h1 className="text-3xl font-bold text-foreground">
                   {getGreeting()}{userProfile?.full_name ? `, ${userProfile.full_name.split(' ')[0]}` : ''}!
                 </h1>
                 <Sparkles className="w-6 h-6 text-primary animate-pulse" />
               </div>
               <p className="text-lg text-muted-foreground mb-4">
                 {getMotivationalMessage()}
               </p>
               
               {/* Stats row con toolkit integrado */}
               <div className="flex items-center gap-6 flex-wrap">
                 <div className="flex items-center gap-2">
                   <TrendingUp className="w-5 h-5 text-primary" />
                   <span className="text-sm font-medium text-foreground">
                     {Math.round(calculateOverallProgress())}% completado
                   </span>
                 </div>
                 <div className="flex items-center gap-2">
                   <Target className="w-5 h-5 text-green-500" />
                   <span className="text-sm text-muted-foreground">
                     {tracks.length} tracks disponibles
                   </span>
                 </div>
                 {totalRemainingTime > 0 && (
                   <div className="flex items-center gap-2">
                     <Clock className="w-5 h-5 text-blue-500" />
                     <span className="text-sm text-muted-foreground">
                       {totalRemainingTime < 60 ? `${totalRemainingTime}m` : `${Math.floor(totalRemainingTime / 60)}h ${totalRemainingTime % 60}m`} restantes
                     </span>
                   </div>
                 )}
                 
                 {/* Toolkit button integrado */}
                 <Button
                   onClick={() => window.open('https://tools.stayirrelevant.com/', '_blank')}
                   variant="outline"
                   size="sm"
                   className="border-primary/30 hover:bg-primary/10 text-sm font-medium"
                 >
                   🛠️ Toolkit IA
                   <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                   </svg>
                 </Button>
               </div>
             </div>
             
             {/* Progress circle visual */}
             <div className="hidden lg:block">
               <div className="relative w-24 h-24">
                 <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                   <circle
                     cx="50"
                     cy="50"
                     r="40"
                     stroke="currentColor"
                     strokeWidth="8"
                     fill="transparent"
                     className="text-muted/20"
                   />
                   <circle
                     cx="50"
                     cy="50"
                     r="40"
                     stroke="currentColor"
                     strokeWidth="8"
                     fill="transparent"
                     strokeDasharray={`${calculateOverallProgress() * 2.51}, 251`}
                     className="text-primary transition-all duration-1000 ease-out"
                   />
                 </svg>
                 <div className="absolute inset-0 flex items-center justify-center">
                   <span className="text-lg font-bold text-primary">
                     {Math.round(calculateOverallProgress())}%
                   </span>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </motion.div>

       {/* Tracks Grid mejorada */}
       <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.5, delay: 0.3 }}
       >
         <div className="flex items-center justify-between mb-8">
           <div>
             <h2 className="text-2xl font-bold text-foreground mb-2">
               Tracks de Aprendizaje
             </h2>
             <p className="text-muted-foreground">
               Selecciona un track para continuar tu formación en IA empresarial
             </p>
           </div>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {tracks.map((track, index) => {
             const trackProgressData = getTrackProgress(track.id);
             
             return (
               <motion.div
                 key={track.id}
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ 
                   duration: 0.5, 
                   delay: 0.1 * index,
                   ease: "easeOut"
                 }}
               >
                 <TrackCard
                   id={track.id}
                   name={track.name}
                   description={track.description}
                   iconName={track.icon_name}
                   color={track.color}
                   progress={trackProgressData.progress}
                   totalClasses={trackProgressData.totalClasses}
                   completedClasses={trackProgressData.completedClasses}
                   estimatedTime={trackProgressData.estimatedTime}
                 />
               </motion.div>
             );
           })}
         </div>
       </motion.div>
     </main>
   </div>
 );
};