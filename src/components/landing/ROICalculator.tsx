import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, Code, Compass, ArrowRight } from 'lucide-react';

const ROICalculator = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

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

  const features = [
    {
      icon: Lightbulb,
      title: "Aprende",
      description: "Domina los conceptos fundamentales y aprende a usar los agentes más avanzados de IA para potenciar tu trabajo.",
    },
    {
      icon: Code,
      title: "Construye",
      description: "Crea aplicaciones y automatizaciones personalizadas que eliminen tareas repetitivas de tu día a día.",
    },
    {
      icon: Compass,
      title: "Descubre",
      description: "Explora herramientas existentes y técnicas probadas que multiplicarán tu productividad desde el primer día.",
    }
  ];

  return (
    <section className="py-24 px-4 bg-muted/20" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="initial"
          animate={inView ? "animate" : "initial"}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Tu camino hacia el dominio de la IA
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Una metodología probada que te llevará desde los conceptos básicos hasta implementar 
            soluciones que transformen tu productividad profesional
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8 h-full bg-card/60 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col items-center text-center h-full">
                  {/* Step number */}
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                    <span className="text-lg font-bold text-primary">{index + 1}</span>
                  </div>

                  {/* Icon */}
                  <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 mb-6">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Card className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 backdrop-blur-sm">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              ¿Listo para multiplicar tu productividad?
            </h3>
            <p className="text-muted-foreground mb-8 text-lg max-w-2xl mx-auto">
              Únete a profesionales que ya están automatizando tareas y aumentando sus ingresos con IA
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-lg px-8 py-4 bg-gradient-primary hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-elegant"
              >
                Comenzar ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-lg px-8 py-4 border-primary/30 hover:bg-primary/10"
              >
                Ver casos de éxito
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ROICalculator;