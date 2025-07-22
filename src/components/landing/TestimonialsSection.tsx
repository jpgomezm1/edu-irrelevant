import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, Quote, TrendingUp, DollarSign, Zap } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const TestimonialsSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const testimonials = [
    {
      id: 1,
      name: 'Carlos Mendoza',
      role: 'CEO',
      company: 'TechFlow Solutions',
      content: 'En 3 meses aumentamos cierres 340%. ROI inmediato.',
      metric: '+340% en ventas',
      icon: TrendingUp,
      color: 'text-success'
    },
    {
      id: 2,
      name: 'Ana Rivera',
      role: 'CMO',
      company: 'Innovate Corp',
      content: 'Redujimos costos de marketing 60% automatizando campañas.',
      metric: '-60% costos adquisición',
      icon: DollarSign,
      color: 'text-warning'
    },
    {
      id: 3,
      name: 'Roberto Silva',
      role: 'CFO',
      company: 'GrowthCo',
      content: 'Reportes de 3 días ahora en 10 minutos. ROI de 1,200%.',
      metric: '1,200% ROI',
      icon: Zap,
      color: 'text-primary'
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <section className="py-20 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="initial"
          animate={inView ? "animate" : "initial"}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-warning/20 border border-warning/30 rounded-full text-sm text-warning mb-6">
            <Star className="w-4 h-4" />
            Testimonios
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Resultados Reales de Nuestros Clientes
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Empresas que transformaron sus operaciones con IA empresarial
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            loop={true}
            className="testimonials-swiper"
          >
            {testimonials.map((testimonial) => {
              const IconComponent = testimonial.icon;
              return (
                <SwiperSlide key={testimonial.id}>
                  <Card className="p-6 h-full bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-elegant transition-all duration-300">
                    <div className="flex flex-col h-full">
                      {/* Quote icon */}
                      <Quote className="w-8 h-8 text-primary mb-4" />
                      
                      {/* Content */}
                      <blockquote className="text-lg text-foreground mb-6 flex-grow">
                        "{testimonial.content}"
                      </blockquote>
                      
                      {/* Metric highlight */}
                      <div className={`inline-flex items-center gap-2 mb-6 px-3 py-2 rounded-full bg-background/50 border border-border/50 w-fit`}>
                        <IconComponent className={`w-4 h-4 ${testimonial.color}`} />
                        <span className={`text-sm font-semibold ${testimonial.color}`}>
                          {testimonial.metric}
                        </span>
                      </div>
                      
                      {/* Author */}
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-foreground">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </motion.div>
      </div>

      <style>{`
        .testimonials-swiper .swiper-pagination {
          position: relative;
          margin-top: 2rem;
        }
        .testimonials-swiper .swiper-pagination-bullet {
          background: hsl(var(--primary));
          opacity: 0.3;
        }
        .testimonials-swiper .swiper-pagination-bullet-active {
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;