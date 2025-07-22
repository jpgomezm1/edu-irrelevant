import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/card';
import { Brain, Lightbulb, Users, Code2, Trophy, ArrowDown, Sparkles, Target } from 'lucide-react';

const ValueStackSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const steps = [
    {
      icon: Brain,
      title: 'Fundamentos IA',
      result: 'Ves oportunidades',
      description: 'Entiendes cómo funciona la IA para identificar problemas que puedes resolver',
      impact: 'Donde otros ven trabajo, tú ves soluciones'
    },
    {
      icon: Lightbulb,
      title: 'Pensamiento IA-First',
      result: 'Resuelves diferente',
      description: 'Desarrollas la mentalidad para descomponer problemas y crear workflows inteligentes',
      impact: 'Cada proceso se vuelve una oportunidad'
    },
    {
      icon: Code2,
      title: 'Stack + Código',
      result: 'Construyes herramientas',
      description: 'Creas tools personalizadas, apps funcionales y sistemas que otros necesitan',
      impact: 'De usuario a creador de soluciones'
    },
    {
      icon: Users,
      title: 'Aplicación Real',
      result: 'Generas valor',
      description: 'Implementas en tu trabajo actual o creas productos que la gente paga por usar',
      impact: 'Resultados medibles desde día 1'
    },
    {
      icon: Trophy,
      title: 'Impacto Exponencial',
      result: 'Te vuelves indispensable',
      description: 'Produces resultados que otros no pueden replicar sin ti',
      impact: 'El mercado compite por tu talento'
    }
  ];

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

  const pulseEffect = {
    animate: { 
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8]
    },
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  };

  return (
    <section className="py-24 px-4 relative overflow-hidden" ref={ref}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial="initial"
          animate={inView ? "animate" : "initial"}
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Para personas sin background técnico</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            De usar IA a <span className="text-primary">crear con IA</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Aprende los fundamentos para construir herramientas reales, resolver problemas complejos 
            y crear soluciones que <span className="text-primary font-semibold">la gente necesita y paga por usar</span>
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          className="space-y-6"
        >
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isLast = index === steps.length - 1;
            
            return (
              <div key={index}>
                <motion.div
                  variants={fadeInUp}
                  whileHover={{ scale: 1.01, y: -2 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="group"
                >
                  <Card className="p-8 bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/40 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-primary/10">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-8">
                      {/* Step indicator */}
                      <div className="flex-shrink-0">
                        <motion.div 
                          className="relative"
                          variants={index === 0 ? pulseEffect : {}}
                          animate={inView && index === 0 ? "animate" : ""}
                        >
                          <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 rounded-3xl flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                            <IconComponent className="w-10 h-10 text-primary" />
                          </div>
                          <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-sm font-bold text-primary-foreground">{index + 1}</span>
                          </div>
                        </motion.div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 space-y-4">
                        <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4">
                          <div className="space-y-3">
                            <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                              {step.title}
                            </h3>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                              {step.description}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-primary/80">
                              <Target className="w-4 h-4" />
                              <span>{step.impact}</span>
                            </div>
                          </div>
                          
                          <div className="flex-shrink-0">
                            <div className="px-6 py-3 bg-gradient-to-r from-primary/15 to-primary/10 border border-primary/30 rounded-xl group-hover:from-primary/25 group-hover:to-primary/15 transition-all duration-300">
                              <span className="text-base font-semibold text-primary flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                {step.result}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Arrow connector */}
                {!isLast && (
                  <div className="flex justify-center py-6">
                    <motion.div 
                      className="relative"
                      animate={{ 
                        y: [0, -3, 0],
                        opacity: [0.6, 1, 0.6]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="w-px h-12 bg-gradient-to-b from-primary/40 to-primary/20">
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                          <ArrowDown className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>

        {/* Final outcome */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-20"
        >
          <Card className="relative overflow-hidden p-10 bg-gradient-to-br from-primary/10 via-primary/5 to-primary/15 border border-primary/30">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-50" />
            <div className="relative text-center space-y-6">
              <h3 className="text-3xl font-bold text-foreground">
                No solo usas IA, <span className="text-primary">la aplicas estratégicamente</span>
              </h3>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Desarrollas la capacidad de ver problemas, diseñar soluciones y crear herramientas que 
                <span className="text-primary font-semibold"> otros profesionales necesitan pero no saben cómo construir.</span>
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                {[
                  { 
                    label: "Workflows inteligentes", 
                    detail: "Sistemas que piensan y ejecutan por ti",
                    example: "Ej: Dashboard que analiza datos y toma decisiones"
                  },
                  { 
                    label: "Tools personalizadas", 
                    detail: "Herramientas que resuelven problemas específicos",
                    example: "Ej: App que optimiza procesos de tu industria"
                  },
                  { 
                    label: "Productos monetizables", 
                    detail: "Soluciones que la gente paga por usar",
                    example: "Ej: SaaS para nichos específicos"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="text-center space-y-3 p-4">
                    <div className="w-3 h-3 bg-primary rounded-full mx-auto" />
                    <h4 className="font-bold text-foreground">{item.label}</h4>
                    <p className="text-sm text-muted-foreground">{item.detail}</p>
                    <p className="text-xs text-primary italic">{item.example}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ValueStackSection;