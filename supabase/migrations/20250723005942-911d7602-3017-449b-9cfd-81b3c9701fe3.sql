-- Eliminar todos los tracks excepto 'Fundamentos IA'
DELETE FROM tracks WHERE name != 'Fundamentos IA';

-- Eliminar todas las clases existentes
DELETE FROM classes;

-- Obtener el track_id de 'Fundamentos IA' para usar en las inserciones
-- Insertar las nuevas clases organizadas por curso

-- Curso 1: ¿Qué es la IA y por qué todos hablan de eso?
INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, '¿IA? ¿Eso no era ciencia ficción?', 1, 'Curso 1: ¿Qué es la IA y por qué todos hablan de eso?', 30, '{}' FROM tracks WHERE name = 'Fundamentos IA';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'IA es un loro muy inteligente (pero no mágico)', 2, 'Curso 1: ¿Qué es la IA y por qué todos hablan de eso?', 30, '{}' FROM tracks WHERE name = 'Fundamentos IA';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'De Matrix a Alexa: historia rápida y cool de la IA', 3, 'Curso 1: ¿Qué es la IA y por qué todos hablan de eso?', 30, '{}' FROM tracks WHERE name = 'Fundamentos IA';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'Tipos de IA: la floja, la pro y la que da miedo (AGI)', 4, 'Curso 1: ¿Qué es la IA y por qué todos hablan de eso?', 30, '{}' FROM tracks WHERE name = 'Fundamentos IA';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, '¿Por qué ahora? ¿Por qué todos alborotados?', 5, 'Curso 1: ¿Qué es la IA y por qué todos hablan de eso?', 30, '{}' FROM tracks WHERE name = 'Fundamentos IA';

-- Curso 2: Entendiendo los LLM (sin necesidad de ser ingeniero)
INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, '¿Qué rayos es un modelo de lenguaje?', 6, 'Curso 2: Entendiendo los LLM (sin necesidad de ser ingeniero)', 30, '{}' FROM tracks WHERE name = 'Fundamentos IA';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'Tokens: las fichas con las que juega la IA', 7, 'Curso 2: Entendiendo los LLM (sin necesidad de ser ingeniero)', 30, '{}' FROM tracks WHERE name = 'Fundamentos IA';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'Embeddings: cómo la IA relaciona ideas', 8, 'Curso 2: Entendiendo los LLM (sin necesidad de ser ingeniero)', 30, '{}' FROM tracks WHERE name = 'Fundamentos IA';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, '¿Por qué se inventa cosas? (Hallucinations y límites)', 9, 'Curso 2: Entendiendo los LLM (sin necesidad de ser ingeniero)', 30, '{}' FROM tracks WHERE name = 'Fundamentos IA';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'Qué se viene: memoria, contexto largo, razonamiento', 10, 'Curso 2: Entendiendo los LLM (sin necesidad de ser ingeniero)', 30, '{}' FROM tracks WHERE name = 'Fundamentos IA';

-- Curso 3: Habla claro, humano – Prompting para no técnicos
INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, '¿Qué es un prompt y por qué importa?', 11, 'Curso 3: Habla claro, humano – Prompting para no técnicos', 30, '{}' FROM tracks WHERE name = 'Fundamentos IA';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'El prompt perfecto: estructura base', 12, 'Curso 3: Habla claro, humano – Prompting para no técnicos', 30, '{}' FROM tracks WHERE name = 'Fundamentos IA';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'Patrones que funcionan (y puedes copiar ya)', 13, 'Curso 3: Habla claro, humano – Prompting para no técnicos', 30, '{}' FROM tracks WHERE name = 'Fundamentos IA';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'Cómo iterar un prompt como un pro', 14, 'Curso 3: Habla claro, humano – Prompting para no técnicos', 30, '{}' FROM tracks WHERE name = 'Fundamentos IA';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'Errores comunes (y cómo evitarlos)', 15, 'Curso 3: Habla claro, humano – Prompting para no técnicos', 30, '{}' FROM tracks WHERE name = 'Fundamentos IA';

-- Curso 4: Aplicando IA sin ser técnico
INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, '¿Qué tareas puedes delegar ya?', 16, 'Curso 4: Aplicando IA sin ser técnico', 30, '{}' FROM tracks WHERE name = 'Fundamentos IA';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'IA para escribir, resumir y analizar', 17, 'Curso 4: Aplicando IA sin ser técnico', 30, '{}' FROM tracks WHERE name = 'Fundamentos IA';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'IA como copiloto de ideas y estrategia', 18, 'Curso 4: Aplicando IA sin ser técnico', 30, '{}' FROM tracks WHERE name = 'Fundamentos IA';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'Automatización sin código (Notion, Gumloop, Zapier)', 19, 'Curso 4: Aplicando IA sin ser técnico', 30, '{}' FROM tracks WHERE name = 'Fundamentos IA';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'Tu primer stack de herramientas AI-friendly', 20, 'Curso 4: Aplicando IA sin ser técnico', 30, '{}' FROM tracks WHERE name = 'Fundamentos IA';

-- Curso 5: Mentalidad AI-First para empresas
INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, '¿Qué significa tener una mentalidad AI-First?', 21, 'Curso 5: Mentalidad AI-First para empresas', 30, '{}' FROM tracks WHERE name = 'Fundamentos IA';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, '¿Cómo identificar cuellos de botella en tu negocio?', 22, 'Curso 5: Mentalidad AI-First para empresas', 30, '{}' FROM tracks WHERE name = 'Fundamentos IA';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, '¿Qué tipo de tareas son reemplazables o automatizables con IA?', 23, 'Curso 5: Mentalidad AI-First para empresas', 30, '{}' FROM tracks WHERE name = 'Fundamentos IA';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'IA como copiloto, no como reemplazo', 24, 'Curso 5: Mentalidad AI-First para empresas', 30, '{}' FROM tracks WHERE name = 'Fundamentos IA';

INSERT INTO classes (track_id, title, order_index, description, duration_minutes, tools_used) 
SELECT id, 'Primeros pasos para aplicar IA a tu empresa sin morir en el intento', 25, 'Curso 5: Mentalidad AI-First para empresas', 30, '{}' FROM tracks WHERE name = 'Fundamentos IA';