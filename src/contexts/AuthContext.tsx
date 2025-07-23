import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

// Tipos para el perfil y progreso
interface UserProfile {
  full_name: string;
  work_area: string;
  profile_completed: boolean;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  userProfile: UserProfile | null;
  overallProgress: number;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, userData: any) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [overallProgress, setOverallProgress] = useState<number>(0);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (!session) {
          // Limpiar datos al cerrar sesión
          setUserProfile(null);
          setOverallProgress(0);
        }
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Nuevo useEffect para cargar datos del perfil y progreso
  useEffect(() => {
    if (user?.id) {
      const fetchData = async () => {
        // Fetch user profile
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('full_name, work_area, profile_completed')
          .eq('id', user.id)
          .single();
        setUserProfile(profile);

        // Fetch and calculate overall progress
        const { data: progressData } = await supabase
          .from('user_progress')
          .select('class_id')
          .eq('user_id', user.id)
          .eq('completed', true);

        const { count: totalClassesCount } = await supabase
          .from('classes')
          .select('id', { count: 'exact' });

        if (progressData && totalClassesCount && totalClassesCount > 0) {
          const progressPercentage = (progressData.length / totalClassesCount) * 100;
          setOverallProgress(progressPercentage);
        }
      };
      fetchData();
    }
  }, [user]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string, userData: any) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: userData
      }
    });

    // Si el registro fue exitoso, invoca la función para enviar el correo
    if (!error) {
      try {
        await supabase.functions.invoke('send-welcome-email', {
          body: { email },
        });
      } catch (functionError) {
        // Opcional: Manejar el error si el correo no se pudo enviar,
        // pero sin bloquear al usuario, ya que el registro fue exitoso.
        console.error('Error sending welcome email:', functionError);
      }
    }

    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    loading,
    userProfile,
    overallProgress,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};