import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders } from '../_shared/cors.ts';

serve(async (req) => {
  // Manejo de la petición pre-vuelo para CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { userName, trackName, courseTitle, completionDate } = await req.json();

    const isCourseCertificate = !!courseTitle;
    const title = isCourseCertificate ? "Certificado de Curso" : "Certificado de Finalización de Track";
    const mainText = isCourseCertificate ? courseTitle : trackName;
    const mainTextY = isCourseCertificate ? "410" : "400";
    const mainTextSize = isCourseCertificate ? "28" : "32";
    const subText = isCourseCertificate ? `Dentro del track: ${trackName}` : "Por haber completado exitosamente el track:";

    const svgContent = `
    <svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#161b22" />
      <rect x="20" y="20" width="760" height="560" fill="none" stroke="#8B5CF6" stroke-width="10" />
      <text x="50%" y="120" font-family="sans-serif" font-size="40" fill="#f0f6fc" text-anchor="middle">${title}</text>
      <text x="50%" y="200" font-family="sans-serif" font-size="24" fill="#c9d1d9" text-anchor="middle">Otorgado a</text>
      <text x="50%" y="280" font-family="sans-serif" font-size="48" font-weight="bold" fill="#f0f6fc" text-anchor="middle">${userName}</text>
      <text x="50%" y="350" font-family="sans-serif" font-size="24" fill="#c9d1d9" text-anchor="middle">${subText}</text>
      <text x="50%" y="${mainTextY}" font-family="sans-serif" font-size="${mainTextSize}" font-weight="bold" fill="#8B5CF6" text-anchor="middle">${mainText}</text>
      <text x="100" y="540" font-family="sans-serif" font-size="16" fill="#8b949e" text-anchor="start">Fecha: ${completionDate}</text>
      <image href="https://storage.googleapis.com/cluvi/nuevo_irre-removebg-preview.png" x="650" y="500" height="60" width="120"/>
    </svg>
    `;

    return new Response(svgContent, {
      headers: { ...corsHeaders, 'Content-Type': 'image/svg+xml' },
      status: 200,
    });

  } catch (err) {
    return new Response(String(err?.message ?? err), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});