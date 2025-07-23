-- Tabla para almacenar los certificados emitidos
CREATE TABLE public.certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
  track_id UUID REFERENCES public.tracks(id) ON DELETE CASCADE, -- Es nulo si el certificado es de un curso
  course_title TEXT, -- El título del curso, ej: "Curso 1: Tu segundo cerebro..."
  completion_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  certificate_type TEXT NOT NULL CHECK (certificate_type IN ('course', 'track')),

  UNIQUE(user_id, track_id, course_title) -- Evita duplicados
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad para la tabla
CREATE POLICY "Los usuarios pueden ver sus propios certificados"
ON public.certificates FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden crear sus propios certificados"
ON public.certificates FOR INSERT
WITH CHECK (auth.uid() = user_id);