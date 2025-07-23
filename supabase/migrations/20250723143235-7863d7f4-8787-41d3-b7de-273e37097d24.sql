-- Añadir campo 'is_coming_soon' a la tabla de tracks
ALTER TABLE public.tracks
ADD COLUMN is_coming_soon BOOLEAN DEFAULT FALSE NOT NULL;

-- Añadir campo 'is_coming_soon' a la tabla de clases
ALTER TABLE public.classes
ADD COLUMN is_coming_soon BOOLEAN DEFAULT FALSE NOT NULL;