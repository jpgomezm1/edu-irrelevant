import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Lightbulb, Brain, Wrench, Zap } from 'lucide-react';

const WhyIrRelevantMemo = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: { staggerChildren: 0.15 }
    }
  };

  const insights = [
    {
      icon: Brain,
      title: "Fundamentos sólidos",
      description: "No es solo usar ChatGPT. Es entender cómo funciona la IA para identificar dónde aplicarla estratégicamente."
    },
    {
      icon: Lightbulb,
      title: "Pensamiento IA-First",
      description: "La mentalidad que te permite ver cada problema como una oportunidad de crear una solución inteligente."
    },
    {
      icon: Wrench,
      title: "Stack probado",
      description: "Las herramientas y recursos exactos que ya funcionan en empresas reales, no experimentos teóricos."
    },
    {
      icon: Zap,
      title: "Intersección poderosa",
      description: "Cuando combinas estos tres elementos, no solo usas IA - la dominas para crear valor real."
    }
  ];

  return (
    <section className="py-20 px-4" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={inView ? "animate" : "initial"}
        >
          {/* Memo header */}
          <motion.div
            variants={fadeInUp}
            className="relative"
          >
            {/* Memo styling */}
            <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12 relative overflow-hidden">
              {/* Memo tape effect */}
              <div className="absolute top-0 left-8 w-16 h-8 bg-primary/10 border border-primary/20 rounded-b-lg"></div>
              <div className="absolute top-0 right-8 w-16 h-8 bg-primary/10 border border-primary/20 rounded-b-lg"></div>
              
              {/* Content */}
              <div className="relative">
                {/* Header */}
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary mb-6">
                    <Lightbulb className="w-4 h-4" />
                    Memo interno
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    ¿Por qué <span className="text-primary">Irrelevant</span>?
                  </h2>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                    La mayoría aprende IA de forma fragmentada. Nosotros encontramos la intersección 
                    que realmente <span className="text-primary font-medium">transforma profesionales</span>.
                  </p>
                </div>

                {/* Insights grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {insights.map((insight, index) => {
                    const IconComponent = insight.icon;
                    return (
                      <motion.div
                        key={index}
                        variants={fadeInUp}
                        className="group"
                      >
                        <div className="p-6 bg-background/50 border border-border/30 rounded-xl hover:border-primary/30 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/5">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors duration-300">
                              <IconComponent className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                                {insight.title}
                              </h3>
                              <p className="text-muted-foreground text-sm leading-relaxed">
                                {insight.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Bottom insight */}
                <motion.div
                  variants={fadeInUp}
                  className="text-center"
                >
                  <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <p className="text-foreground font-medium">
                      <span className="text-primary">Resultado:</span> Mientras otros usan IA como herramienta, 
                      tú la aplicas como ventaja competitiva.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyIrRelevantMemo;