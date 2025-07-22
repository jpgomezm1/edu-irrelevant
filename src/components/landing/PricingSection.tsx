import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Crown, Mail } from 'lucide-react';

const PricingSection = () => {
  const navigate = useNavigate();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

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

  const plans = [
    {
      name: 'Sobreviviente',
      price: 25,
      description: 'Lo básico para no quedarte atrás',
      badge: null,
      popular: false,
      features: [
        'Todos los cursos y tracks',
        'Certificados de finalización',
        'Actualizaciones mensuales',
        'Soporte por email'
      ],
      cta: 'Empezar a sobrevivir',
      plan: 'survivor'
    },
    {
      name: 'Dominador',
      price: 49,
      originalPrice: 79,
      description: 'Para los que quieren dominar de verdad',
      badge: 'POPULAR',
      popular: true,
      features: [
        'Todo lo anterior +',
        'Comunidad exclusiva',
        'Templates y recursos premium',
        'Webinars en vivo',
        'Soporte prioritario'
      ],
      cta: 'Quiero dominar',
      plan: 'dominator'
    },
    {
      name: 'Conquistador',
      price: null,
      description: 'Transforma toda tu empresa',
      badge: 'ENTERPRISE',
      popular: false,
      features: [
        'Todo personalizado',
        'Consultor dedicado',
        'Workshops on-site',
        'ROI garantizado'
      ],
      cta: 'Hablemos',
      plan: 'conqueror'
    }
  ];

  return (
    <section id="pricing" className="py-24 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="initial"
          animate={inView ? "animate" : "initial"}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            No todos los héroes llevan capa
          </h2>
          <p className="text-xl text-muted-foreground">
            Pero todos necesitan el plan correcto
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <Card className={`p-6 h-full transition-all duration-300 relative ${
                plan.popular 
                  ? 'border-primary bg-primary/5 shadow-lg' 
                  : 'border-border/50 bg-card/60 hover:border-primary/20'
              }`}>
                
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-3 py-1 font-medium">
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                  
                  {plan.price ? (
                    <div className="mb-2">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-3xl font-bold text-foreground">
                          {inView && <CountUp end={plan.price} prefix="$" duration={1.5} />}
                        </span>
                        <span className="text-muted-foreground">/mes</span>
                      </div>
                      {plan.originalPrice && (
                        <p className="text-sm text-muted-foreground line-through">
                          Antes ${plan.originalPrice}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-foreground mb-2">
                      Precio custom
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-primary hover:bg-primary/90' 
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                  onClick={() => {
                    if (plan.plan === 'conqueror') {
                      window.location.href = 'mailto:hola@irrelevant.com';
                    } else {
                      navigate(`/auth?plan=${plan.plan}`);
                    }
                  }}
                >
                  {plan.plan === 'conqueror' && <Mail className="w-4 h-4 mr-2" />}
                  {plan.cta}
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;