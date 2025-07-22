import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Crown } from 'lucide-react';

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
      name: 'Básico',
      price: 197,
      target: 'Profesionales individuales',
      badge: 'INDIVIDUAL',
      badgeColor: 'bg-secondary',
      icon: Star,
      popular: false,
      features: [
        'Acceso a Fundamentos IA + 2 tracks especializados',
        '20+ clases prácticas',
        'Comunidad exclusiva',
        'Certificado básico IrRelevant',
        'Soporte por email',
        'Actualizaciones mensuales'
      ],
      cta: 'Empezar Plan Básico',
      idealFor: 'CEOs, Gerentes, Consultores independientes',
      plan: 'basic'
    },
    {
      name: 'Professional',
      price: 497,
      target: 'Equipos pequeños (2-10 personas)',
      badge: 'MÁS POPULAR',
      badgeColor: 'bg-primary',
      icon: Zap,
      popular: true,
      features: [
        'Todos los 8 tracks completos (50+ clases)',
        'Casos reales de Fortune 500',
        'Certificaciones avanzadas IrRelevant',
        'Soporte prioritario + webinars mensuales',
        'Templates y herramientas exclusivas',
        'Dashboard de progreso del equipo',
        'Implementación guiada por consultores',
        'Actualizaciones semanales'
      ],
      cta: 'Empezar Plan Professional',
      idealFor: 'Equipos de marketing, ventas, operaciones',
      discount: 'Ahorra $1,500/año vs plan básico por persona',
      plan: 'professional'
    },
    {
      name: 'Enterprise',
      price: 2997,
      target: 'Empresas grandes (equipos ilimitados)',
      badge: 'ENTERPRISE',
      badgeColor: 'bg-warning',
      icon: Crown,
      popular: false,
      features: [
        'Todo lo del plan Professional',
        'Usuarios ilimitados de la empresa',
        'Workshops personalizados exclusivos',
        'Consultor dedicado asignado',
        'Implementación completa guiada',
        'ROI tracking personalizado por empresa',
        'Integraciones personalizadas',
        'SLA de soporte 24/7',
        'Reportes ejecutivos mensuales'
      ],
      cta: 'Agendar Demo Enterprise',
      idealFor: 'Corporaciones, multinacionales, empresas 200+ empleados',
      guarantee: 'ROI garantizado o reembolso completo',
      plan: 'enterprise'
    }
  ];

  const cardHover = {
    hover: { 
      scale: 1.02, 
      y: -8,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section id="pricing" className="py-20 px-4" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="initial"
          animate={inView ? "animate" : "initial"}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Planes que se Adaptan a tu Empresa
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Desde profesionales individuales hasta equipos enterprise
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <motion.div
                key={plan.name}
                variants={fadeInUp}
                whileHover="hover"
              >
                <Card
                  className={`relative p-8 h-full transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-gradient-to-br from-primary/10 to-primary/5 border-primary shadow-elegant' 
                      : 'bg-card/50 backdrop-blur-sm border-border/50'
                  }`}
                >
                  {/* Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <Badge className={`${plan.badgeColor} text-primary-foreground px-3 py-1`}>
                      {plan.badge}
                    </Badge>
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>

                  {/* Plan info */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{plan.target}</p>
                    
                    <div className="flex items-baseline mb-4">
                      <span className="text-4xl font-bold text-foreground">
                        {inView && (
                          <CountUp end={plan.price} prefix="$" duration={2} />
                        )}
                      </span>
                      <span className="text-muted-foreground ml-1">/mes</span>
                    </div>

                    {plan.discount && (
                      <p className="text-sm text-success font-medium">{plan.discount}</p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="space-y-4">
                    <Button
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-primary hover:bg-primary/90' 
                          : 'bg-secondary hover:bg-secondary/80'
                      }`}
                      onClick={() => navigate(`/auth?plan=${plan.plan}`)}
                    >
                      {plan.cta}
                    </Button>

                    <div className="text-center">
                      <p className="text-xs text-muted-foreground font-medium">
                        Ideal para:
                      </p>
                      <p className="text-sm text-foreground">{plan.idealFor}</p>
                      
                      {plan.guarantee && (
                        <p className="text-xs text-success mt-2 font-medium">
                          {plan.guarantee}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;