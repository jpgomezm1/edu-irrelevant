import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { TrackCard } from '@/components/TrackCard';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  const { user } = useAuth();
  const { toast } = useToast();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user profile
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('full_name, work_area, profile_completed')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.error('Profile error:', profileError);
        } else {
          setUserProfile(profile);
          
          // If profile is not completed, redirect to onboarding
          if (!profile.profile_completed) {
            return <Navigate to="/onboarding" replace />;
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
  }, [user.id, toast]);

  // If profile is not completed, redirect to onboarding
  if (userProfile && !userProfile.profile_completed) {
    return <Navigate to="/onboarding" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
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

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userProfile={userProfile || undefined} 
        overallProgress={calculateOverallProgress()}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">
            ¡Hola{userProfile?.full_name ? `, ${userProfile.full_name.split(' ')[0]}` : ''}!
          </h1>
          <p className="text-lg text-muted-foreground">
            {userProfile?.work_area 
              ? `Continúa tu formación en IA para ${userProfile.work_area.toLowerCase()}`
              : 'Continúa tu formación en IA empresarial'
            }
          </p>
        </motion.div>

        {/* Tracks Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Tracks de Aprendizaje
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tracks.map((track, index) => {
              const trackProgressData = getTrackProgress(track.id);
              
              return (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
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