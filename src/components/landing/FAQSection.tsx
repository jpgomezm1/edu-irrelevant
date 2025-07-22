import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { HelpCircle } from 'lucide-react';

const FAQSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const faqs = [
    {
      question: '¿Qué incluye cada plan exactamente?',
      answer: 'El plan Básico incluye Fundamentos IA + 2 tracks especializados (20+ clases). El plan Professional incluye todos los 8 tracks completos (50+ clases) más casos reales de Fortune 500, certificaciones avanzadas y soporte prioritario. El plan Enterprise incluye todo lo anterior más usuarios ilimitados, consultor dedicado e implementación personalizada.'
    },
    {
      question: '¿Puedo cambiar de plan después?',
      answer: 'Sí, puedes cambiar de plan en cualquier momento. Si actualizas, solo pagas la diferencia prorrateada. Si reduces el plan, el cambio se aplicará en tu próximo ciclo de facturación. Tu progreso y certificaciones se mantienen intactos.'
    },
    {
      question: '¿Hay garantía de satisfacción?',
      answer: 'Ofrecemos garantía de satisfacción de 30 días para todos los planes. Si no ves resultados tangibles en tu empresa, te devolvemos el 100% de tu inversión. Para el plan Enterprise, garantizamos ROI o reembolso completo en los primeros 90 días.'
    },
    {
      question: '¿Qué tan rápido veo resultados?',
      answer: 'La mayoría de nuestros clientes ven primeros resultados en 2-3 semanas. Implementaciones básicas de IA (como optimización de prompts y automatizaciones simples) se pueden implementar inmediatamente. Transformaciones más profundas típicamente toman 2-3 meses para mostrar ROI completo.'
    },
    {
      question: '¿Necesito conocimientos técnicos previos?',
      answer: 'No necesitas experiencia técnica previa. Nuestro contenido está diseñado específicamente para profesionales no técnicos. Empezamos desde conceptos básicos y te llevamos paso a paso hasta implementaciones avanzadas, todo explicado en lenguaje empresarial sin jerga técnica.'
    },
    {
      question: '¿Ofrecen prueba gratuita o demo?',
      answer: 'Para planes Básico y Professional, ofrecemos acceso a 3 clases gratuitas para que evalúes la calidad del contenido. Para el plan Enterprise, incluimos una consultoría estratégica gratuita de 60 minutos donde evaluamos tu empresa y diseñamos una hoja de ruta personalizada.'
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
    <section className="py-20 px-4" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="initial"
          animate={inView ? "animate" : "initial"}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 border border-border/50 rounded-full text-sm text-foreground mb-6">
            <HelpCircle className="w-4 h-4" />
            Preguntas Frecuentes
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Resolvemos tus Dudas
          </h2>
          <p className="text-xl text-muted-foreground">
            Todo lo que necesitas saber sobre IrRelevant
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Disclosure>
                {({ open }) => (
                  <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg overflow-hidden hover:shadow-card transition-all duration-300">
                    <Disclosure.Button className="flex justify-between items-center w-full px-6 py-4 text-left focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75">
                      <span className="font-semibold text-foreground text-lg">
                        {faq.question}
                      </span>
                      <ChevronDownIcon
                        className={`${
                          open ? 'rotate-180' : ''
                        } w-5 h-5 text-primary transition-transform duration-300`}
                      />
                    </Disclosure.Button>
                    
                    <Disclosure.Panel className="px-6 pb-4">
                      <div className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </div>
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            ¿Tienes más preguntas?
          </p>
          <button
            onClick={() => window.open('mailto:soporte@irrelevant.com', '_blank')}
            className="text-primary hover:text-primary/80 font-semibold underline underline-offset-4 transition-colors"
          >
            Contáctanos directamente
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;