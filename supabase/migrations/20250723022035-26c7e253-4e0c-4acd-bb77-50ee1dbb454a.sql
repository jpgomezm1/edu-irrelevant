-- Add third track: IA para Negocios
INSERT INTO public.tracks (name, description, icon_name, order_index, color) VALUES 
('IA para Negocios: Automatización y Estrategia', 'Aplica IA en Ventas, Marketing, Finanzas y Operaciones para automatizar procesos y tomar mejores decisiones.', 'Briefcase', 3, '#10B981');

-- Add 25 classes for the third track
-- Curso 1: Vender sin perseguir (ni sonar como robot)
INSERT INTO public.classes (title, description, track_id, order_index, duration_minutes, tools_used) VALUES
('Follow-ups que convierten mientras dormís', 'Use case: seguimiento por WhatsApp y correo 100% automático con GPT.', (SELECT id FROM public.tracks WHERE name = 'IA para Negocios: Automatización y Estrategia'), 1, 45, ARRAY['GPT', 'WhatsApp', 'Email']),
('¿Este lead vale la pena o no?', 'Use case: clasificación inteligente de leads según su mensaje.', (SELECT id FROM public.tracks WHERE name = 'IA para Negocios: Automatización y Estrategia'), 2, 40, ARRAY['GPT', 'CRM']),
('Cotizaciones automáticas que cierran (sin desgastarte)', 'Use case: generar propuestas con IA desde un prompt o un formulario.', (SELECT id FROM public.tracks WHERE name = 'IA para Negocios: Automatización y Estrategia'), 3, 50, ARRAY['GPT', 'Forms']),
('Tus llamadas analizadas como si tuvieras un coach comercial', 'Use case: resumen + alertas de intención de compra.', (SELECT id FROM public.tracks WHERE name = 'IA para Negocios: Automatización y Estrategia'), 4, 45, ARRAY['GPT', 'Audio Analysis']),
('Reporte de ventas sexy (y sin abrir una hoja)', 'Use case: dashboard autoactualizado vía IA.', (SELECT id FROM public.tracks WHERE name = 'IA para Negocios: Automatización y Estrategia'), 5, 40, ARRAY['GPT', 'Dashboard', 'Analytics']),

-- Curso 2: Marketing que no parece hecho por interns
('Campañas enteras con un solo prompt (literal)', 'Use case: plan de publicaciones y copies a partir de un objetivo.', (SELECT id FROM public.tracks WHERE name = 'IA para Negocios: Automatización y Estrategia'), 6, 50, ARRAY['GPT', 'Marketing']),
('Contenido visual + textos sin diseñador ni redactor', 'Use case: generar piezas que sí convierten, en minutos.', (SELECT id FROM public.tracks WHERE name = 'IA para Negocios: Automatización y Estrategia'), 7, 45, ARRAY['GPT', 'Design AI', 'Content']),
('''¿Y esto cómo va?'' → IA te lee los KPIs y te da ideas', 'Use case: analizar métricas y recibir recomendaciones accionables.', (SELECT id FROM public.tracks WHERE name = 'IA para Negocios: Automatización y Estrategia'), 8, 40, ARRAY['GPT', 'Analytics', 'KPIs']),
('Brainstorming con un ejército de creativos invisibles', 'Use case: generación de ideas alineadas al perfil de tu cliente.', (SELECT id FROM public.tracks WHERE name = 'IA para Negocios: Automatización y Estrategia'), 9, 45, ARRAY['GPT', 'Brainstorming']),
('Publica, programa y olvídate (modo piloto automático)', 'Use case: integración de generación + programación en tu stack.', (SELECT id FROM public.tracks WHERE name = 'IA para Negocios: Automatización y Estrategia'), 10, 50, ARRAY['GPT', 'Automation', 'Social Media']),

-- Curso 3: Finanzas sin trauma (ni fórmulas del demonio)
('Tu IA contadora: clasifica tus gastos sola', 'Use case: automatización de categorización de movimientos.', (SELECT id FROM public.tracks WHERE name = 'IA para Negocios: Automatización y Estrategia'), 11, 40, ARRAY['GPT', 'Finance', 'Categorization']),
('¿Cuánto gastamos este mes? Pregúntale, no lo calcules', 'Use case: generar reportes financieros conversacionales.', (SELECT id FROM public.tracks WHERE name = 'IA para Negocios: Automatización y Estrategia'), 12, 45, ARRAY['GPT', 'Finance', 'Reports']),
('IA que predice tu quiebre (y cómo evitarlo)', 'Use case: modelos simples de predicción de ingresos/egresos.', (SELECT id FROM public.tracks WHERE name = 'IA para Negocios: Automatización y Estrategia'), 13, 50, ARRAY['GPT', 'Predictions', 'Finance']),
('Pagos, facturas y caos → en orden con un prompt', 'Use case: flujo automatizado de control de facturación.', (SELECT id FROM public.tracks WHERE name = 'IA para Negocios: Automatización y Estrategia'), 14, 45, ARRAY['GPT', 'Invoicing', 'Automation']),
('¿Tu negocio da plata? Te lo dice la IA, sin piedad', 'Use case: entender unit economics con copiloto.', (SELECT id FROM public.tracks WHERE name = 'IA para Negocios: Automatización y Estrategia'), 15, 40, ARRAY['GPT', 'Economics', 'Analysis']),

-- Curso 4: Atención al cliente que no da pena
('Montá un bot que responde como vos (sin sonar a call center)', 'Use case: chatbot entrenado con tu info, tono y lógica.', (SELECT id FROM public.tracks WHERE name = 'IA para Negocios: Automatización y Estrategia'), 16, 50, ARRAY['GPT', 'Chatbot', 'Customer Service']),
('Análisis de chats que te dicen la verdad (aunque duela)', 'Use case: detección de patrones, frustraciones y oportunidades.', (SELECT id FROM public.tracks WHERE name = 'IA para Negocios: Automatización y Estrategia'), 17, 45, ARRAY['GPT', 'Chat Analysis', 'Sentiment']),
('Respuestas mágicas, en segundos (y sin repetir lo mismo)', 'Use case: generación personalizada de respuestas por canal.', (SELECT id FROM public.tracks WHERE name = 'IA para Negocios: Automatización y Estrategia'), 18, 40, ARRAY['GPT', 'Response Generation']),
('Soporte sin perder el hilo', 'Use case: seguimiento automático de casos abiertos.', (SELECT id FROM public.tracks WHERE name = 'IA para Negocios: Automatización y Estrategia'), 19, 45, ARRAY['GPT', 'Support', 'Tracking']),
('¿La gente está feliz o está a punto de irse?', 'Use case: análisis semántico de satisfacción con IA.', (SELECT id FROM public.tracks WHERE name = 'IA para Negocios: Automatización y Estrategia'), 20, 40, ARRAY['GPT', 'Sentiment Analysis', 'Satisfaction']),

-- Curso 5: Operaciones sin drama (ni correos eternos)
('Mapeá tu proceso → y hacelo automático con IA', 'Use case: diseño + ejecución de un flujo básico con lógica.', (SELECT id FROM public.tracks WHERE name = 'IA para Negocios: Automatización y Estrategia'), 21, 50, ARRAY['GPT', 'Process Mapping', 'Automation']),
('Tus documentos se llenan solos (como por arte de magia)', 'Use case: generación automática de PDFs y archivos desde formularios.', (SELECT id FROM public.tracks WHERE name = 'IA para Negocios: Automatización y Estrategia'), 22, 45, ARRAY['GPT', 'Document Generation', 'PDF']),
('La pelota nunca se queda en nadie (handoffs perfectos)', 'Use case: automatizar alertas y asignaciones entre equipos.', (SELECT id FROM public.tracks WHERE name = 'IA para Negocios: Automatización y Estrategia'), 23, 40, ARRAY['GPT', 'Workflow', 'Team Management']),
('Centralizá toda la info en un solo lugar (sin Excel compartido)', 'Use case: panel unificado con respuestas en tiempo real.', (SELECT id FROM public.tracks WHERE name = 'IA para Negocios: Automatización y Estrategia'), 24, 45, ARRAY['GPT', 'Dashboard', 'Centralization']),
('¿Qué está pasando? Preguntale al sistema, no al equipo', 'Use case: dashboards operativos y respuestas vía prompt.', (SELECT id FROM public.tracks WHERE name = 'IA para Negocios: Automatización y Estrategia'), 25, 50, ARRAY['GPT', 'Operations', 'Query System']);