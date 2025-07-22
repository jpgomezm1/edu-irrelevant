import React, { useState, useEffect } from 'react';
import Navigation from '@/components/landing/Navigation';
import HeroSection from '@/components/landing/HeroSection';
import ROICalculator from '@/components/landing/ROICalculator';
import PricingSection from '@/components/landing/PricingSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import ValueStackSection from '@/components/landing/ValueStackSection';
import SocialProofSection from '@/components/landing/SocialProofSection';
import FAQSection from '@/components/landing/FAQSection';
import Footer from '@/components/landing/Footer';
import WhyIrRelevantMemo from '@/components/landing/WhyIrRelevantMemo';

const Index = () => {
  const [isWhatsAppVisible, setIsWhatsAppVisible] = useState(false);

  // Mostrar el botón de WhatsApp después de un delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWhatsAppVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = '+573183849532';
    const message = encodeURIComponent('¡Hola! Me interesa saber más sobre AI Academy 🚀');
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background relative">
      <Navigation />
      <div className="pt-16">
        <HeroSection />
        <WhyIrRelevantMemo />
        <ROICalculator />
        <PricingSection />
        {/* <TestimonialsSection /> */}
        <ValueStackSection />
        {/* <SocialProofSection /> */}
        <FAQSection />
      </div>
      <Footer />
      
      {/* Floating WhatsApp Button - Mejorado con animaciones y estados */}
      <div 
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
          isWhatsAppVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
      >
        <div className="relative group">
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            ¡Chatea con nosotros!
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
          </div>
          
          {/* Anillo de pulso */}
          <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
          
          {/* Botón principal */}
          <button
            onClick={handleWhatsAppClick}
            className="relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-110 active:scale-95 group"
            aria-label="Contactar por WhatsApp"
          >
            {/* Icono de WhatsApp mejorado */}
            <svg 
              className="w-6 h-6 transition-transform duration-200 group-hover:scale-110" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.386"/>
            </svg>
          </button>
        </div>
        
        {/* Mensaje flotante adicional (opcional) */}
        {isWhatsAppVisible && (
          <div className="absolute bottom-full right-0 mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 max-w-xs animate-bounce">
            <div className="text-sm text-gray-800 dark:text-gray-200 font-medium">
              💬 ¿Tienes preguntas?
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              ¡Escríbenos por WhatsApp!
            </div>
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white dark:border-t-gray-800"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;