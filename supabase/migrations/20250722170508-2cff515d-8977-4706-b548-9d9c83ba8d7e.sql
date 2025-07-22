-- Agregar campo company_name a la tabla user_profiles
ALTER TABLE public.user_profiles 
ADD COLUMN company_name TEXT;