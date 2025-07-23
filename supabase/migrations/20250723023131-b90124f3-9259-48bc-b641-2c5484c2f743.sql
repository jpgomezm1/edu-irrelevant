-- Add fourth track: Workflows que valen más que un empleado
INSERT INTO public.tracks (name, description, icon_name, order_index, color) VALUES 
('Workflows que valen más que un empleado', '5 flujos reales que te ahorran horas, ejecutados paso a paso sin código.', 'GitMerge', 4, '#F59E0B');

-- Insert 25 classes for the Workflows track
-- Get the track_id for the new track
WITH new_track AS (
  SELECT id FROM public.tracks WHERE name = 'Workflows que valen más que un empleado'
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
  -- Curso 1 (n8n): "Responder leads automáticamente por WhatsApp (y hacer seguimiento)"
  ('Conectá tu formulario (Typeform o Tally) a n8n', 'Use case: Alguien llena un formulario → le llega un mensaje automático → si no responde en 24h, se le hace seguimiento.', 1, ARRAY['n8n', 'Typeform']),
  ('Integra WhatsApp usando WATI o Gupshup', 'Use case: Alguien llena un formulario → le llega un mensaje automático → si no responde en 24h, se le hace seguimiento.', 2, ARRAY['n8n', 'WhatsApp', 'WATI']),
  ('Crea el mensaje inicial con GPT (prompt dinámico)', 'Use case: Alguien llena un formulario → le llega un mensaje automático → si no responde en 24h, se le hace seguimiento.', 3, ARRAY['n8n', 'GPT', 'OpenAI']),
  ('Agrega lógica condicional: ¿respondió? ¿no respondió?', 'Use case: Alguien llena un formulario → le llega un mensaje automático → si no responde en 24h, se le hace seguimiento.', 4, ARRAY['n8n', 'Automation']),
  ('Configura seguimiento automático en 24h + log en Google Sheets', 'Use case: Alguien llena un formulario → le llega un mensaje automático → si no responde en 24h, se le hace seguimiento.', 5, ARRAY['n8n', 'Google Sheets']),
  
  -- Curso 2 (n8n): "Generar certificados laborales automáticos desde un correo"
  ('Conectá tu correo (IMAP/SMTP) a n8n y detectá solicitudes', 'Use case: Alguien solicita un certificado → IA clasifica si es con o sin salario → busca datos → genera PDF → lo responde por correo.', 6, ARRAY['n8n', 'Email', 'IMAP']),
  ('Analizá el mensaje con GPT para clasificar la solicitud (NLP)', 'Use case: Alguien solicita un certificado → IA clasifica si es con o sin salario → busca datos → genera PDF → lo responde por correo.', 7, ARRAY['n8n', 'GPT', 'NLP']),
  ('Buscá los datos del empleado en Google Sheets o Airtable', 'Use case: Alguien solicita un certificado → IA clasifica si es con o sin salario → busca datos → genera PDF → lo responde por correo.', 8, ARRAY['n8n', 'Google Sheets', 'Airtable']),
  ('Completa el template .docx según el tipo de certificado', 'Use case: Alguien solicita un certificado → IA clasifica si es con o sin salario → busca datos → genera PDF → lo responde por correo.', 9, ARRAY['n8n', 'Word', 'Templates']),
  ('Convierte a PDF, responde el correo y guarda backup en Drive', 'Use case: Alguien solicita un certificado → IA clasifica si es con o sin salario → busca datos → genera PDF → lo responde por correo.', 10, ARRAY['n8n', 'PDF', 'Google Drive']),
  
  -- Curso 3 (Make): "Flujo de agendamiento con seguimiento automático"
  ('Conectá Calendly/Google Calendar a Make + webhook inicial', 'Use case: Cliente reserva una cita → recibe confirmación → IA resume lo que pidió → recordatorio previo → seguimiento post-servicio.', 11, ARRAY['Make', 'Calendly', 'Google Calendar']),
  ('Envía confirmación automática por correo o WhatsApp', 'Use case: Cliente reserva una cita → recibe confirmación → IA resume lo que pidió → recordatorio previo → seguimiento post-servicio.', 12, ARRAY['Make', 'Email', 'WhatsApp']),
  ('Resume info de la cita usando GPT', 'Use case: Cliente reserva una cita → recibe confirmación → IA resume lo que pidió → recordatorio previo → seguimiento post-servicio.', 13, ARRAY['Make', 'GPT', 'OpenAI']),
  ('Automatiza recordatorio 2h antes del encuentro', 'Use case: Cliente reserva una cita → recibe confirmación → IA resume lo que pidió → recordatorio previo → seguimiento post-servicio.', 14, ARRAY['Make', 'Scheduling']),
  ('48h después, envío de mensaje de seguimiento + NPS simple', 'Use case: Cliente reserva una cita → recibe confirmación → IA resume lo que pidió → recordatorio previo → seguimiento post-servicio.', 15, ARRAY['Make', 'NPS', 'Automation']),
  
  -- Curso 4 (Gumloop): "Dashboard de ventas automático (sin saber BI)"
  ('Diseñá el formulario de carga de datos (manual o auto)', 'Use case: Cargar ventas manualmente o desde WhatsApp → IA organiza y resume → dashboard listo sin abrir Excel.', 16, ARRAY['Gumloop', 'Forms']),
  ('Conectá WhatsApp y convierte mensajes en registros (opcional)', 'Use case: Cargar ventas manualmente o desde WhatsApp → IA organiza y resume → dashboard listo sin abrir Excel.', 17, ARRAY['Gumloop', 'WhatsApp']),
  ('Usá GPT para categorizar productos, calcular totales, etc.', 'Use case: Cargar ventas manualmente o desde WhatsApp → IA organiza y resume → dashboard listo sin abrir Excel.', 18, ARRAY['Gumloop', 'GPT', 'Analytics']),
  ('Visualizá ventas, márgenes y tickets en un dashboard autoactualizado', 'Use case: Cargar ventas manualmente o desde WhatsApp → IA organiza y resume → dashboard listo sin abrir Excel.', 19, ARRAY['Gumloop', 'Dashboard', 'Analytics']),
  ('Crea alertas automáticas si hay datos atípicos o caídas', 'Use case: Cargar ventas manualmente o desde WhatsApp → IA organiza y resume → dashboard listo sin abrir Excel.', 20, ARRAY['Gumloop', 'Alerts', 'Analytics']),
  
  -- Curso 5 (Zapier): "Bot de atención básica 24/7 con FAQs y captura de datos"
  ('Integra Zapier con tu canal de entrada (Instagram DMs o WhatsApp)', 'Use case: Usuario llega por Instagram → pregunta algo → IA responde (con base de conocimiento) → si no se resuelve, guarda contacto y pasa al humano.', 21, ARRAY['Zapier', 'Instagram', 'WhatsApp']),
  ('Conectá GPT con base de conocimiento (FAQ o documento)', 'Use case: Usuario llega por Instagram → pregunta algo → IA responde (con base de conocimiento) → si no se resuelve, guarda contacto y pasa al humano.', 22, ARRAY['Zapier', 'GPT', 'FAQ']),
  ('Crea lógica condicional: ¿la respuesta fue útil o no?', 'Use case: Usuario llega por Instagram → pregunta algo → IA responde (con base de conocimiento) → si no se resuelve, guarda contacto y pasa al humano.', 23, ARRAY['Zapier', 'Logic', 'Automation']),
  ('Si no lo fue: capturá contacto y guarda en base de datos', 'Use case: Usuario llega por Instagram → pregunta algo → IA responde (con base de conocimiento) → si no se resuelve, guarda contacto y pasa al humano.', 24, ARRAY['Zapier', 'Database', 'CRM']),
  ('Envía alerta al humano para intervenir', 'Use case: Usuario llega por Instagram → pregunta algo → IA responde (con base de conocimiento) → si no se resuelve, guarda contacto y pasa al humano.', 25, ARRAY['Zapier', 'Alerts', 'Human Handoff'])
) AS class_data(title, description, order_index, tools_used);