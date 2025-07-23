import { Resend } from 'npm:resend@4.0.0';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders } from '../_shared/cors.ts';

// Inicializa Resend con la API Key desde los secretos de Supabase
const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

serve(async (req) => {
  // Manejo de la petición pre-vuelo para CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();
    const domain = Deno.env.get('DOMAIN');

    if (!domain) {
      throw new Error('El secreto DOMAIN no está configurado en Supabase.');
    }

    // Envía el correo con el nuevo diseño
    const { data, error } = await resend.emails.send({
      from: `AI Academy <hola@${domain}>`,
      to: [email],
      subject: '¡Bienvenido a AI Academy! 🚀 Tu viaje comienza ahora.',
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Bienvenido a AI Academy</title>
            <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; margin: 0; padding: 0; background-color: #0d1117; color: #c9d1d9; }
                .container { max-width: 600px; margin: 40px auto; background-color: #161b22; border: 1px solid #30363d; border-radius: 12px; overflow: hidden; }
                .header { padding: 40px; text-align: center; border-bottom: 1px solid #30363d; }
                .header img { max-width: 100px; }
                .content { padding: 40px; }
                .content h1 { font-size: 24px; color: #f0f6fc; margin-top: 0; }
                .content p { font-size: 16px; line-height: 1.6; }
                .button-container { text-align: center; margin-top: 30px; }
                .button { background: linear-gradient(135deg, #8B5CF6, #7C3AED); color: #ffffff; padding: 15px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; }
                .footer { padding: 20px; text-align: center; font-size: 12px; color: #8b949e; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="https://storage.googleapis.com/cluvi/nuevo_irre-removebg-preview.png" alt="AI Academy Logo">
                </div>
                <div class="content">
                    <h1>¡Tu viaje en AI Academy comienza ahora!</h1>
                    <p>Hola,</p>
                    <p>Estamos increíblemente emocionados de tenerte a bordo. Has tomado el primer paso para dejar de ser un simple usuario de IA y convertirte en un creador de soluciones.</p>
                    <p>En AI Academy, no solo aprenderás a usar herramientas, sino a pensar estratégicamente para automatizar tareas, construir productos y, en definitiva, volverte indispensable en tu campo.</p>
                    <div class="button-container">
                        <a href="https://URL_DE_TU_APP/dashboard" class="button">Ir a mi Dashboard</a>
                    </div>
                </div>
                <div class="footer">
                    <p>irrelevant club © ${new Date().getFullYear()}</p>
                </div>
            </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error({ error });
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      });
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (err) {
    return new Response(String(err?.message ?? err), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});