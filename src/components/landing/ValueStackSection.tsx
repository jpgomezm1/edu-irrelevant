import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { Card } from '@/components/ui/card';
import { BookOpen, Wrench, Users, CheckCircle } from 'lucide-react';

const ValueStackSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const valueItems = [
    {
      icon: BookOpen,
      title: 'Contenido Exclusivo',
      value: 15000,
      description: 'Más de 1,000 horas de contenido especializado',
      features: [
        '8 tracks especializados completos',
        'Casos reales de Fortune 500',
        'Metodologías probadas en consultoría',
        'Actualizaciones constantes'
      ]
    },
    {
      icon: Wrench,
      title: 'Herramientas Premium',
      value: 8000,
      description: 'Templates y recursos de implementación',
      features: [
        'Templates de prompts profesionales',
        'Frameworks de implementación',
        'Calculadoras ROI personalizadas',
        'Scripts de automatización'
      ]
    },
    {
      icon: Users,
      title: 'Soporte Experto',
      value: 25000,
      description: 'Acompañamiento personalizado de consultores',
      features: [
        'Consultor dedicado asignado',
        'Implementación guiada paso a paso',
        'Webinars mensuales exclusivos',
        'Soporte prioritario 24/7'
      ]
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/10" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="initial"
          animate={inView ? "animate" : "initial"}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Todo lo que Incluye
          </h2>
          <div className="inline-flex items-center gap-2 text-2xl font-semibold text-success">
            <span>Valor Total:</span>
            {inView && (
              <CountUp
                end={48000}
                duration={2.5}
                prefix="$"
                suffix="/año"
                separator=","
              />
            )}
          </div>
          <p className="text-lg text-muted-foreground mt-2">
            Obtén acceso a todo este valor por una fracción del costo
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {valueItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-8 h-full bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-elegant transition-all duration-300">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-primary-foreground" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    
                    <div className="text-3xl font-bold text-success mb-2">
                      {inView && (
                        <CountUp
                          end={item.value}
                          duration={2 + index * 0.2}
                          prefix="$"
                          separator=","
                        />
                      )}
                      <span className="text-lg text-muted-foreground"> valor</span>
                    </div>
                    
                    <p className="text-muted-foreground">
                      {item.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {item.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-4 px-6 py-4 bg-primary/10 border border-primary/30 rounded-lg">
            <CheckCircle className="w-6 h-6 text-primary" />
            <span className="text-lg font-semibold text-foreground">
              Acceso inmediato a todo el contenido
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValueStackSection;