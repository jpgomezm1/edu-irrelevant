-- Insertar el nuevo track "Herramientas que te hacen parecer brujo (aunque no sepas programar)"
INSERT INTO public.tracks (name, description, icon_name, order_index, color) VALUES 
('Herramientas que te hacen parecer brujo (aunque no sepas programar)', 'Aprende a usar solo las herramientas que sí sirven, con ejemplos reales, aplicados y rápidos.', 'Wand2', 2, '#EC4899');

-- Insertar las 25 clases del nuevo track
-- Curso 1: Tu segundo cerebro (pero con esteroides)
INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'Notion AI – El arquitecto de tus ideas', 1, 'Curso 1: Tu segundo cerebro (pero con esteroides) - Use case: convertir un desorden mental en plan de acción.', 30, '{}' FROM tracks WHERE name = 'Herramientas que te hacen parecer brujo (aunque no sepas programar)';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'Reclaim – El guardaespaldas de tu calendario', 2, 'Curso 1: Tu segundo cerebro (pero con esteroides) - Use case: bloquear espacio para lo importante aunque no te des cuenta.', 30, '{}' FROM tracks WHERE name = 'Herramientas que te hacen parecer brujo (aunque no sepas programar)';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'Mem.ai – Tu memoria externa, siempre conectada', 3, 'Curso 1: Tu segundo cerebro (pero con esteroides) - Use case: nunca más perder una idea brillante (ni una reunión).', 30, '{}' FROM tracks WHERE name = 'Herramientas que te hacen parecer brujo (aunque no sepas programar)';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'ChatGPT con memoria – El asistente que sí te entiende', 4, 'Curso 1: Tu segundo cerebro (pero con esteroides) - Use case: seguimiento real de tareas personales con contexto acumulado.', 30, '{}' FROM tracks WHERE name = 'Herramientas que te hacen parecer brujo (aunque no sepas programar)';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'Superhuman AI – Inbox cero en tiempo récord', 5, 'Curso 1: Tu segundo cerebro (pero con esteroides) - Use case: responder 20 correos en 5 minutos y que suene como tú.', 30, '{}' FROM tracks WHERE name = 'Herramientas que te hacen parecer brujo (aunque no sepas programar)';

-- Curso 2: Crea sin tener equipo (ni talento)
INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'Claude – El guionista sensible', 6, 'Curso 2: Crea sin tener equipo (ni talento) - Use case: convertir ideas vagas en guiones virales.', 30, '{}' FROM tracks WHERE name = 'Herramientas que te hacen parecer brujo (aunque no sepas programar)';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'Veo 3 – El director que nunca duerme', 7, 'Curso 2: Crea sin tener equipo (ni talento) - Use case: producir un video de TikTok cinematográfico sin grabar nada.', 30, '{}' FROM tracks WHERE name = 'Herramientas que te hacen parecer brujo (aunque no sepas programar)';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'HeyGen + ElevenLabs – El actor clonado', 8, 'Curso 2: Crea sin tener equipo (ni talento) - Use case: hacer videos donde apareces… sin aparecer.', 30, '{}' FROM tracks WHERE name = 'Herramientas que te hacen parecer brujo (aunque no sepas programar)';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'Gamma – El diseñador de presentaciones que sí tiene gusto', 9, 'Curso 2: Crea sin tener equipo (ni talento) - Use case: armar un pitch visual sin abrir PowerPoint.', 30, '{}' FROM tracks WHERE name = 'Herramientas que te hacen parecer brujo (aunque no sepas programar)';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'Ideogram – El creativo gráfico que no cobra por horas', 10, 'Curso 2: Crea sin tener equipo (ni talento) - Use case: generar imágenes con texto para redes sin diseñador.', 30, '{}' FROM tracks WHERE name = 'Herramientas que te hacen parecer brujo (aunque no sepas programar)';

-- Curso 3: Análisis sin Excel (ni trauma)
INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'Perplexity – El que investiga por ti, sin inventarse cosas', 11, 'Curso 3: Análisis sin Excel (ni trauma) - Use case: hacer un benchmark rápido y confiable.', 30, '{}' FROM tracks WHERE name = 'Herramientas que te hacen parecer brujo (aunque no sepas programar)';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'Reducto – El extractor de oro en archivos PDF', 12, 'Curso 3: Análisis sin Excel (ni trauma) - Use case: sacar data útil de facturas, reportes o contratos.', 30, '{}' FROM tracks WHERE name = 'Herramientas que te hacen parecer brujo (aunque no sepas programar)';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'ChatGPT + Data Interpreter – El analista que no se queja', 13, 'Curso 3: Análisis sin Excel (ni trauma) - Use case: cargar un Excel y pedirle insights sin fórmulas.', 30, '{}' FROM tracks WHERE name = 'Herramientas que te hacen parecer brujo (aunque no sepas programar)';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'Gumloop – Tu primer dashboard en 10 minutos', 14, 'Curso 3: Análisis sin Excel (ni trauma) - Use case: ver tus ventas o clientes sin depender de nadie.', 30, '{}' FROM tracks WHERE name = 'Herramientas que te hacen parecer brujo (aunque no sepas programar)';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'Browse AI – El espía de datos web', 15, 'Curso 3: Análisis sin Excel (ni trauma) - Use case: scrapear info de páginas sin saber scraping.', 30, '{}' FROM tracks WHERE name = 'Herramientas que te hacen parecer brujo (aunque no sepas programar)';

-- Curso 4: Automatiza o muere (la era del click está acabando)
INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'Make – El constructor visual de robots', 16, 'Curso 4: Automatiza o muere (la era del click está acabando) - Use case: crear flujos entre apps que ejecutan tareas por vos.', 30, '{}' FROM tracks WHERE name = 'Herramientas que te hacen parecer brujo (aunque no sepas programar)';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'Zapier AI – El mago que conecta todo sin que sepas cómo', 17, 'Curso 4: Automatiza o muere (la era del click está acabando) - Use case: decirle "automatizá esto" y que lo haga solo.', 30, '{}' FROM tracks WHERE name = 'Herramientas que te hacen parecer brujo (aunque no sepas programar)';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'Gumloop Actions – El botón invisible que hace cosas por ti', 18, 'Curso 4: Automatiza o muere (la era del click está acabando) - Use case: mandar recordatorios o reportes semanales sin hacer nada.', 30, '{}' FROM tracks WHERE name = 'Herramientas que te hacen parecer brujo (aunque no sepas programar)';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'Bardeen – El clon que trabaja en tu navegador', 19, 'Curso 4: Automatiza o muere (la era del click está acabando) - Use case: copiar datos de páginas a Sheets con un click.', 30, '{}' FROM tracks WHERE name = 'Herramientas que te hacen parecer brujo (aunque no sepas programar)';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'Taskade AI – El jefe de proyectos que no duerme', 20, 'Curso 4: Automatiza o muere (la era del click está acabando) - Use case: tareas + notas + automatización en una sola app.', 30, '{}' FROM tracks WHERE name = 'Herramientas que te hacen parecer brujo (aunque no sepas programar)';

-- Curso 5: LLMs sin paja (cuál IA usar y para qué)
INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'ChatGPT – El todoterreno que no necesita presentación', 21, 'Curso 5: LLMs sin paja (cuál IA usar y para qué) - Use case: escribir, razonar, aprender… todo con estilo.', 30, '{}' FROM tracks WHERE name = 'Herramientas que te hacen parecer brujo (aunque no sepas programar)';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'Claude – El escritor reflexivo con memoria brutal', 22, 'Curso 5: LLMs sin paja (cuál IA usar y para qué) - Use case: redactar textos largos, sensibles, detallados.', 30, '{}' FROM tracks WHERE name = 'Herramientas que te hacen parecer brujo (aunque no sepas programar)';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'Gemini – El crack de los documentos y las imágenes', 23, 'Curso 5: LLMs sin paja (cuál IA usar y para qué) - Use case: subir PDFs + fotos y tener insights conectados.', 30, '{}' FROM tracks WHERE name = 'Herramientas que te hacen parecer brujo (aunque no sepas programar)';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'Perplexity – El investigador sin alucinaciones', 24, 'Curso 5: LLMs sin paja (cuál IA usar y para qué) - Use case: responder preguntas difíciles con fuentes confiables.', 30, '{}' FROM tracks WHERE name = 'Herramientas que te hacen parecer brujo (aunque no sepas programar)';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'Grok – El raro pero potente (si estás en el ecosistema X)', 25, 'Curso 5: LLMs sin paja (cuál IA usar y para qué) - Use case: navegación en tiempo real, integración con X (Twitter), visión alternativa.', 30, '{}' FROM tracks WHERE name = 'Herramientas que te hacen parecer brujo (aunque no sepas programar)';