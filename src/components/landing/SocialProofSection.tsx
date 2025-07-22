import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import CountUp from 'react-countup';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Globe, Award, Quote } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';

const SocialProofSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const companies = [
    'Bancolombia',
    'Grupo Éxito',
    'EPM',
    'Avianca',
    'ECOPETROL',
    'Falabella',
    'Corona',
    'Cemex'
  ];

  const metrics = [
    {
      icon: Globe,
      value: 15,
      suffix: '+',
      label: 'Países de LATAM'
    },
    {
      icon: Award,
      value: 95,
      suffix: '%',
      label: 'Satisfacción de clientes'
    },
    {
      icon: Building2,
      value: 340,
      suffix: '%',
      label: 'ROI promedio primer año'
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-muted/10 to-background" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="initial"
          animate={inView ? "animate" : "initial"}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/30 rounded-full text-sm text-primary mb-6">
            <Building2 className="w-4 h-4" />
            Respaldo Empresarial
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Empresas que Confiaron en IrRelevant
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Líderes de la industria que transformaron sus operaciones con IA
          </p>
        </motion.div>

        {/* Company Logos Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-16"
        >
          <Swiper
            modules={[Autoplay]}
            spaceBetween={40}
            slidesPerView={2}
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 5,
              },
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="company-logos-swiper"
          >
            {companies.map((company, index) => (
              <SwiperSlide key={index}>
                <div className="flex items-center justify-center h-20 px-4">
                  <span className="text-2xl font-bold text-muted-foreground/60 hover:text-primary transition-colors duration-300 text-center">
                    {company}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Metrics */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border border-border/50">
                  <IconComponent className="w-8 h-8 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold text-foreground mb-2">
                    {inView && (
                      <CountUp
                        end={metric.value}
                        duration={2 + index * 0.2}
                        suffix={metric.suffix}
                      />
                    )}
                  </div>
                  <p className="text-muted-foreground">{metric.label}</p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Case Study */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Card className="p-8 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
            <div className="flex flex-col lg:flex-row items-start gap-6">
              <div className="flex-shrink-0">
                <Quote className="w-12 h-12 text-primary" />
              </div>
              
              <div className="flex-grow">
                <Badge className="mb-4 bg-primary text-primary-foreground">
                  Caso de Éxito Destacado
                </Badge>
                
                <blockquote className="text-xl text-foreground mb-4 font-medium">
                  "Bancolombia redujo 60% el tiempo en análisis de riesgo crediticio 
                  usando nuestras metodologías de IA"
                </blockquote>
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>Implementación en 6 semanas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <span>ROI de 420% en primer año</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>15,000+ empleados beneficiados</span>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 text-right">
                <div className="text-3xl font-bold text-success mb-1">
                  {inView && <CountUp end={60} suffix="%" duration={2} />}
                </div>
                <p className="text-sm text-muted-foreground">Reducción de tiempo</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofSection;