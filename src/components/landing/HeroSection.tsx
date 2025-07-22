import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/10 to-background" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-light/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center" ref={ref}>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/30 rounded-full text-sm text-primary-foreground backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              Transforma tu empresa con IA empresarial
            </div>
          </motion.div>

          {/* Headlines */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Convierte tu Empresa en
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                AI-First
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              La academia ejecutiva que transforma profesionales tradicionales en{' '}
              <span className="text-primary font-semibold">líderes de IA empresarial</span>
            </p>
          </motion.div>

          {/* Value Proposition */}
          <motion.div variants={fadeInUp}>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Más de <strong>1,000 horas</strong> de contenido especializado, casos reales de Fortune 500, 
              metodologías probadas por <strong>$2M+</strong> en consultoría
            </p>
          </motion.div>

          {/* Animated Stats */}
          <motion.div variants={fadeInUp}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { end: 2847, suffix: '+', label: 'Ejecutivos entrenados' },
                { end: 340, suffix: '%', label: 'ROI promedio' },
                { end: 87, suffix: '%', label: 'Implementación exitosa' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {inView && (
                      <CountUp
                        end={stat.end}
                        duration={2.5 + index * 0.2}
                        suffix={stat.suffix}
                      />
                    )}
                  </div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeInUp} className="pt-8">
            <Button
              size="lg"
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-lg px-8 py-4 bg-gradient-primary hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-elegant"
            >
              Ver Planes
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;