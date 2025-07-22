-- Create user profiles table
CREATE TABLE public.user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  work_area TEXT NOT NULL,
  company_size TEXT NOT NULL,
  ai_experience INTEGER NOT NULL CHECK (ai_experience >= 1 AND ai_experience <= 5),
  profile_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for user profiles
CREATE POLICY "Users can view their own profile"
ON public.user_profiles
FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can create their own profile"
ON public.user_profiles
FOR INSERT
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.user_profiles
FOR UPDATE
USING (auth.uid() = id);

-- Create tracks table
CREATE TABLE public.tracks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  color TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for tracks (public read access)
ALTER TABLE public.tracks ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read tracks
CREATE POLICY "Tracks are publicly readable"
ON public.tracks
FOR SELECT
USING (true);

-- Create classes table
CREATE TABLE public.classes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  track_id UUID REFERENCES public.tracks(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL,
  tools_used TEXT[] NOT NULL DEFAULT '{}',
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for classes (public read access)
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read classes
CREATE POLICY "Classes are publicly readable"
ON public.classes
FOR SELECT
USING (true);

-- Create user progress table
CREATE TABLE public.user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, class_id)
);

-- Enable RLS for user progress
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Create policies for user progress
CREATE POLICY "Users can view their own progress"
ON public.user_progress
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own progress"
ON public.user_progress
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
ON public.user_progress
FOR UPDATE
USING (auth.uid() = user_id);

-- Create trigger function to handle new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, work_area, company_size, ai_experience)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'work_area', ''),
    COALESCE(NEW.raw_user_meta_data->>'company_size', ''),
    COALESCE((NEW.raw_user_meta_data->>'ai_experience')::integer, 1)
  );
  RETURN NEW;
END;
$$;

-- Create trigger to automatically create user profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert initial tracks data
INSERT INTO public.tracks (name, description, icon_name, order_index, color) VALUES
('Fundamentos IA', 'Conceptos básicos de IA para no técnicos', 'Brain', 1, '#8B5CF6'),
('Tools Generales', 'Herramientas IA esenciales para cualquier rol', 'Wrench', 2, '#06B6D4'),
('Finanzas', 'IA para análisis financiero y automatización', 'DollarSign', 3, '#10B981'),
('Planeación', 'Planificación estratégica asistida por IA', 'Calendar', 4, '#F59E0B'),
('Ventas', 'Automatiza y potencia tu proceso de ventas', 'TrendingUp', 5, '#EF4444'),
('Marketing', 'Marketing personalizado a escala', 'Megaphone', 6, '#EC4899'),
('Legal', 'Automatiza procesos legales y compliance', 'Scale', 7, '#6366F1'),
('Vibe Coding', 'Programa sin saber programar usando IA', 'Code', 8, '#7C3AED');

-- Insert sample classes for Fundamentos IA track
INSERT INTO public.classes (track_id, title, description, duration_minutes, tools_used, order_index) VALUES
((SELECT id FROM public.tracks WHERE name = 'Fundamentos IA'), 'Qué es la Inteligencia Artificial', 'Introducción práctica a los conceptos básicos de IA', 15, '{}', 1),
((SELECT id FROM public.tracks WHERE name = 'Fundamentos IA'), 'Tipos de IA y sus Aplicaciones', 'Diferencias entre IA generativa, predictiva y de automatización', 20, '{}', 2),
((SELECT id FROM public.tracks WHERE name = 'Fundamentos IA'), 'Prompting Efectivo', 'Cómo escribir prompts que generen mejores resultados', 25, '{"ChatGPT", "Claude"}', 3),
((SELECT id FROM public.tracks WHERE name = 'Fundamentos IA'), 'Casos de Uso Empresariales', 'Ejemplos reales de implementación de IA en empresas', 30, '{"ChatGPT", "Claude", "Microsoft Copilot"}', 4);

-- Insert sample classes for Tools Generales track
INSERT INTO public.classes (track_id, title, description, duration_minutes, tools_used, order_index) VALUES
((SELECT id FROM public.tracks WHERE name = 'Tools Generales'), 'ChatGPT Mastery', 'Domina ChatGPT para maximizar tu productividad', 35, '{"ChatGPT"}', 1),
((SELECT id FROM public.tracks WHERE name = 'Tools Generales'), 'Claude para Empresas', 'Usa Claude para análisis y redacción empresarial', 30, '{"Claude"}', 2),
((SELECT id FROM public.tracks WHERE name = 'Tools Generales'), 'Microsoft Copilot', 'Integra IA en tu flujo de trabajo de Microsoft', 25, '{"Microsoft Copilot"}', 3),
((SELECT id FROM public.tracks WHERE name = 'Tools Generales'), 'Google Bard/Gemini', 'Aprovecha el poder de Google para búsqueda e investigación', 20, '{"Google Bard"}', 4);