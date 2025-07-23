-- Add fifth track: Vibe Coding – Programar sin parecer ingeniero
INSERT INTO public.tracks (name, description, icon_name, order_index, color) VALUES 
('Vibe Coding – Programar sin parecer ingeniero', 'El track donde aprendés lo justo de código para crear cosas potentes, sin traumarte.', 'Code', 5, '#6366F1');

-- Insert 25 classes for the Vibe Coding track
-- Get the track_id for the new track
WITH new_track AS (
  SELECT id FROM public.tracks WHERE name = 'Vibe Coding – Programar sin parecer ingeniero'
)

INSERT INTO public.classes (track_id, title, description, duration_minutes, order_index, tools_used) 
SELECT 
  new_track.id,
  title,
  description,
  45,
  order_index,
  tools_used
FROM new_track,
(VALUES 
  -- Curso 1: "Instala lo que nunca pensaste instalar (y no te asustes)"
  ('¿Qué es código y por qué no tenés que saberlo todo?', 'Mentalidad de maker moderno.', 1, ARRAY['Conceptos', 'Mindset']),
  ('Instalá VS Code (y que se vea bonito)', 'Tipos de extensiones, atajos, configuraciones clave.', 2, ARRAY['VS Code', 'Setup']),
  ('Instalá Python, Node y npm sin romper tu compu', 'Paso a paso guiado con gifs y humor.', 3, ARRAY['Python', 'Node.js', 'npm']),
  ('Probá que todo funcione: tu primer "hola mundo" productivo', 'Crear un script que responda a un prompt de OpenAI desde consola.', 4, ARRAY['Python', 'OpenAI', 'Terminal']),
  ('Manejá tu compu como hacker (pero con flow)', 'Terminal, carpetas, rutas, errores comunes sin drama.', 5, ARRAY['Terminal', 'Command Line']),
  
  -- Curso 2: "Lovable: tu primer app sin backend ni estrés"
  ('Qué es Lovable y qué tipo de cosas podés construir', 'Use case: una app que genera textos, nombres de productos o ideas con un botón.', 6, ARRAY['Lovable', 'No-code']),
  ('Diseñá tu primera app visualmente (formulario, input, botón, resultado)', 'Use case: una app que genera textos, nombres de productos o ideas con un botón.', 7, ARRAY['Lovable', 'UI Design']),
  ('Usá un prompt con OpenAI y obtené resultados en pantalla', 'Use case: una app que genera textos, nombres de productos o ideas con un botón.', 8, ARRAY['Lovable', 'OpenAI', 'API']),
  ('Conectá tu app a una base de datos tipo Supabase o Airtable', 'Use case: una app que genera textos, nombres de productos o ideas con un botón.', 9, ARRAY['Lovable', 'Supabase', 'Database']),
  ('Publicá tu app y compartila con el mundo (sin deploy raros)', 'Use case: una app que genera textos, nombres de productos o ideas con un botón.', 10, ARRAY['Lovable', 'Deploy', 'Publishing']),
  
  -- Curso 3: "Cursor: programá como si tuvieras un copiloto que sí sabe"
  ('¿Por qué Cursor es el VS Code con esteroides?', 'Comparativa, instalación, shortcuts.', 11, ARRAY['Cursor', 'AI Coding']),
  ('Cómo escribir instrucciones que Cursor entienda (prompting técnico)', 'Ejemplos tipo: "Creá un bot de Telegram en Python que…"', 12, ARRAY['Cursor', 'AI Prompting']),
  ('Creá tu primer script con ayuda de Cursor paso a paso', 'Ej: un scraper o una automatización simple.', 13, ARRAY['Cursor', 'Python', 'Scripting']),
  ('Pedile explicaciones, documentación y arreglos a Cursor', 'Aprende a depurar y entender código con IA.', 14, ARRAY['Cursor', 'Debugging', 'Documentation']),
  ('Cómo usar Cursor para editar proyectos existentes', 'No tenerle miedo al código de otros.', 15, ARRAY['Cursor', 'Code Editing']),
  
  -- Curso 4: "Replit: tu laboratorio de experimentos sin instalar nada"
  ('Qué es Replit y por qué es tu nuevo campo de juego', 'Use case: bot que responde preguntas en Telegram con GPT + logs.', 16, ARRAY['Replit', 'Cloud IDE']),
  ('Escribí y corré tu primer bot en 5 minutos', 'Use case: bot que responde preguntas en Telegram con GPT + logs.', 17, ARRAY['Replit', 'Bot Development']),
  ('Conectá tu bot a una API (ej. OpenAI, Telegram o WhatsApp)', 'Use case: bot que responde preguntas en Telegram con GPT + logs.', 18, ARRAY['Replit', 'API Integration', 'Telegram']),
  ('Almacená info en una base de datos ligera (Replit DB)', 'Use case: bot que responde preguntas en Telegram con GPT + logs.', 19, ARRAY['Replit', 'Database', 'Data Storage']),
  ('Compartí tu proyecto con el mundo y colaborá con otros', 'Use case: bot que responde preguntas en Telegram con GPT + logs.', 20, ARRAY['Replit', 'Collaboration', 'Sharing']),
  
  -- Curso 5: "Construí una mini app real desde cero (sí, vos)"
  ('Diseñá la idea y los componentes: qué va a hacer tu app', 'Ej: Generador de presupuestos / Cotizador / Clasificador de leads.', 21, ARRAY['App Design', 'Planning']),
  ('Configurá el backend con Python + OpenAI (en Replit o local)', 'Ej: Generador de presupuestos / Cotizador / Clasificador de leads.', 22, ARRAY['Python', 'OpenAI', 'Backend']),
  ('Armá una interfaz visual con HTML + JS + Tailwind (asistido por Cursor)', 'Ej: Generador de presupuestos / Cotizador / Clasificador de leads.', 23, ARRAY['HTML', 'JavaScript', 'Tailwind', 'Frontend']),
  ('Conectá todo y hacé las pruebas', 'Ej: Generador de presupuestos / Cotizador / Clasificador de leads.', 24, ARRAY['Integration', 'Testing']),
  ('Deployalo o compartilo desde Replit / Vercel / Netlify', 'Ej: Generador de presupuestos / Cotizador / Clasificador de leads.', 25, ARRAY['Deploy', 'Vercel', 'Netlify', 'Replit'])
) AS class_data(title, description, order_index, tools_used);