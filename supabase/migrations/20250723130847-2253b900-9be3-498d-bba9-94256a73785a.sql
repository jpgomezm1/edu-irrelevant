-- Add sixth track: "Construí vainas útiles con Vibe Coding"
INSERT INTO public.tracks (name, description, icon_name, order_index, color) VALUES 
('Construí vainas útiles con Vibe Coding', 'Proyectos reales, con código guiado, para aprender creando.', 'FlaskConical', 6, '#06B6D4');

-- Get the track ID for the classes
DO $$
DECLARE
    track_uuid UUID;
BEGIN
    -- Get the track ID
    SELECT id INTO track_uuid FROM public.tracks WHERE name = 'Construí vainas útiles con Vibe Coding';
    
    -- Insert classes for Course 1: Bot que responde correos por vos (modo pro)
    INSERT INTO public.classes (track_id, title, description, order_index, duration_minutes, tools_used) VALUES
    (track_uuid, 'Conectá Gmail con tu script usando la API de Google', 'Un asistente que lee correos, detecta la intención y propone una respuesta automática con estilo profesional.', 1, 45, ARRAY['Gmail API', 'Python']),
    (track_uuid, 'Leé correos nuevos y filtrá solo los que requieren acción', 'Un asistente que lee correos, detecta la intención y propone una respuesta automática con estilo profesional.', 2, 40, ARRAY['Gmail API', 'Python']),
    (track_uuid, 'Usá OpenAI para generar una respuesta personalizada', 'Un asistente que lee correos, detecta la intención y propone una respuesta automática con estilo profesional.', 3, 35, ARRAY['OpenAI API', 'Python']),
    (track_uuid, 'Mostrá la respuesta por consola o interfaz para que vos decidas', 'Un asistente que lee correos, detecta la intención y propone una respuesta automática con estilo profesional.', 4, 30, ARRAY['Python', 'CLI']),
    (track_uuid, 'Enviá el correo de forma automática (opcional)', 'Un asistente que lee correos, detecta la intención y propone una respuesta automática con estilo profesional.', 5, 25, ARRAY['Gmail API', 'Python']),

    -- Course 2: Generador de cotizaciones inteligente
    (track_uuid, 'Diseñá el formulario (HTML + JS) para capturar info', 'Una app web donde ingresás detalles de un cliente y te genera una cotización bien presentada, en PDF, lista para enviar.', 6, 40, ARRAY['HTML', 'JavaScript']),
    (track_uuid, 'Procesá los datos con Python (usando lógica de pricing y GPT)', 'Una app web donde ingresás detalles de un cliente y te genera una cotización bien presentada, en PDF, lista para enviar.', 7, 45, ARRAY['Python', 'OpenAI API']),
    (track_uuid, 'Generá un texto tipo propuesta con OpenAI', 'Una app web donde ingresás detalles de un cliente y te genera una cotización bien presentada, en PDF, lista para enviar.', 8, 35, ARRAY['OpenAI API', 'Python']),
    (track_uuid, 'Convertí eso en PDF bonito (usando pdfkit o weasyprint)', 'Una app web donde ingresás detalles de un cliente y te genera una cotización bien presentada, en PDF, lista para enviar.', 9, 40, ARRAY['Python', 'PDFKit']),
    (track_uuid, 'Agregá opción para descargar o enviar por email', 'Una app web donde ingresás detalles de un cliente y te genera una cotización bien presentada, en PDF, lista para enviar.', 10, 30, ARRAY['Python', 'Email']),

    -- Course 3: Scraper + analizador de reseñas de productos
    (track_uuid, 'Armá el scraper con BeautifulSoup o Playwright', 'Un script que va a Amazon o páginas similares, scrapea reseñas y te da un resumen general con insights clave.', 11, 45, ARRAY['Python', 'BeautifulSoup', 'Playwright']),
    (track_uuid, 'Extraé las reseñas y guardalas en una lista', 'Un script que va a Amazon o páginas similares, scrapea reseñas y te da un resumen general con insights clave.', 12, 35, ARRAY['Python', 'Web Scraping']),
    (track_uuid, 'Enviá las reseñas a OpenAI para analizarlas y agrupar temas', 'Un script que va a Amazon o páginas similares, scrapea reseñas y te da un resumen general con insights clave.', 13, 40, ARRAY['OpenAI API', 'Python']),
    (track_uuid, 'Mostrá el análisis en consola o una mini interfaz web', 'Un script que va a Amazon o páginas similares, scrapea reseñas y te da un resumen general con insights clave.', 14, 30, ARRAY['Python', 'HTML']),
    (track_uuid, 'Agregá opción de exportar el reporte', 'Un script que va a Amazon o páginas similares, scrapea reseñas y te da un resumen general con insights clave.', 15, 25, ARRAY['Python', 'Export']),

    -- Course 4: Asistente tipo ChatGPT con tu info personal
    (track_uuid, 'Armá la interfaz del chat (Replit o Lovable)', 'Un chat en el que subís tus documentos y te responde preguntas como si fuera tu mini GPT personalizado.', 16, 40, ARRAY['Replit', 'Lovable']),
    (track_uuid, 'Subí y procesá documentos (PDF, CSV, TXT)', 'Un chat en el que subís tus documentos y te responde preguntas como si fuera tu mini GPT personalizado.', 17, 45, ARRAY['Python', 'File Processing']),
    (track_uuid, 'Usá embeddings + base vectorial (ej. Supabase + OpenAI)', 'Un chat en el que subís tus documentos y te responde preguntas como si fuera tu mini GPT personalizado.', 18, 50, ARRAY['OpenAI API', 'Supabase', 'Embeddings']),
    (track_uuid, 'Conectá el flujo: input → búsqueda semántica → respuesta con contexto', 'Un chat en el que subís tus documentos y te responde preguntas como si fuera tu mini GPT personalizado.', 19, 45, ARRAY['OpenAI API', 'Vector Search']),
    (track_uuid, 'Agregá mejora visual y CTA para uso real', 'Un chat en el que subís tus documentos y te responde preguntas como si fuera tu mini GPT personalizado.', 20, 35, ARRAY['UI/UX', 'Frontend']),

    -- Course 5: Dashboard financiero que lee tus movimientos y te da insights
    (track_uuid, 'Interfaz para subir archivos (en Replit o Flask simple)', 'Subís un archivo CSV con tus gastos o ingresos y te genera visuales + análisis con IA.', 21, 40, ARRAY['Flask', 'Replit']),
    (track_uuid, 'Procesá el CSV: limpiar, categorizar con GPT', 'Subís un archivo CSV con tus gastos o ingresos y te genera visuales + análisis con IA.', 22, 45, ARRAY['Python', 'OpenAI API', 'CSV']),
    (track_uuid, 'Calculá métricas clave (ingresos, egresos, categorías, etc.)', 'Subís un archivo CSV con tus gastos o ingresos y te genera visuales + análisis con IA.', 23, 35, ARRAY['Python', 'Data Analysis']),
    (track_uuid, 'Mostrá visualizaciones con Plotly o Chart.js', 'Subís un archivo CSV con tus gastos o ingresos y te genera visuales + análisis con IA.', 24, 40, ARRAY['Plotly', 'Chart.js']),
    (track_uuid, 'Agregá recomendaciones automáticas con GPT', 'Subís un archivo CSV con tus gastos o ingresos y te genera visuales + análisis con IA.', 25, 30, ARRAY['OpenAI API', 'Python']);

END $$;