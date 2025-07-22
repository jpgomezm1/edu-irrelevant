import React from 'react';
import HeroSection from '@/components/landing/HeroSection';
import ROICalculator from '@/components/landing/ROICalculator';
import PricingSection from '@/components/landing/PricingSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import ValueStackSection from '@/components/landing/ValueStackSection';
import SocialProofSection from '@/components/landing/SocialProofSection';
import FAQSection from '@/components/landing/FAQSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ROICalculator />
      <PricingSection />
      <TestimonialsSection />
      <ValueStackSection />
      <SocialProofSection />
      <FAQSection />
    </div>
  );
};

export default Index;