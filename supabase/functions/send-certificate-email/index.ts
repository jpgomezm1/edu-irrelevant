import { Resend } from 'resend';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders } from '../_shared/cors.ts';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { userId, trackId, userEmail, courseTitle } = await req.json();
    const domain = Deno.env.get('DOMAIN');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const { data: profile } = await supabase.from('user_profiles').select('full_name').eq('id', userId).single();
    const { data: track } = await supabase.from('tracks').select('name').eq('id', trackId).single();

    if (!profile || !track) throw new Error('Usuario o track no encontrado.');

    const completionDate = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

    // Invocar la función que genera el SVG
    const { data: svgData, error: svgError } = await supabase.functions.invoke('generate-certificate', {
      body: { userName: profile.full_name, trackName: track.name, courseTitle, completionDate },
    });
    if (svgError) throw svgError;

    const certificateBuffer = new TextEncoder().encode(svgData);

    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://URL_DE_TU_APP')}`;
    const subject = courseTitle 
        ? `¡Felicitaciones! Has completado el curso ${courseTitle}`
        : `¡Felicitaciones! Has completado el track ${track.name}`;

    await resend.emails.send({
      from: `AI Academy <hola@${domain}>`,
      to: [userEmail],
      subject,
      html: `
        <h1>¡Lo lograste!</h1>
        <p>Has completado un nuevo hito en tu aprendizaje y estamos muy orgullosos de tu progreso. Adjunto encontrarás tu certificado.</p>
        <p>¡Comparte tu logro con tu red profesional en LinkedIn y muéstrale al mundo tus nuevas habilidades!</p>
        <a href="${linkedInShareUrl}" style="background-color: #0A66C2; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Compartir en LinkedIn</a>
        <p>Sigue aprendiendo y construyendo con nosotros.</p>
      `,
      attachments: [
        {
          filename: 'certificado.svg',
          content: certificateBuffer,
        },
      ],
    });

    return new Response(JSON.stringify({ message: 'Correo enviado' }), {
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