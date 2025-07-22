import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { HelpCircle, MessageCircle } from 'lucide-react';

const FAQSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const faqs = [
    {
      question: '¿Realmente puedo crear herramientas sin ser programador?',
      answer: 'Absolutamente. Nuestro enfoque se basa en entender los fundamentos de IA y usar las herramientas correctas, no en ser un experto en código. Te enseñamos a pensar en modo IA-first, usar templates probados y adaptar soluciones existentes. Muchos de nuestros estudiantes han creado sus primeras tools funcionales en las primeras 2 semanas.'
    },
    {
      question: '¿Qué tipo de herramientas podré construir específicamente?',
      answer: 'Depende de tu industria y necesidades, pero típicamente: dashboards inteligentes que analizan datos y sugieren acciones, workflows que procesan información automáticamente, chatbots especializados para tu nicho, apps web simples que resuelven problemas específicos, y sistemas de análisis personalizado. Todo usando IA + código de forma estratégica.'
    },
    {
      question: '¿Cuánto tiempo necesito para ver resultados reales?',
      answer: 'Los primeros resultados llegan rápido: en 1-2 semanas ya estarás pensando diferente y viendo oportunidades. Tu primera herramienta funcional típicamente en 3-4 semanas. Para crear algo que puedas monetizar o que genere impacto significativo en tu trabajo, cuenta 6-8 semanas de aplicación constante.'
    },
    {
      question: '¿Esto funciona en mi industria específica?',
      answer: 'Los fundamentos de IA y pensamiento estratégico aplican a cualquier industria. Tenemos casos de éxito en consultoría, marketing, finanzas, retail, salud, educación y más. Lo importante no es la industria, sino entender cómo aplicar IA para resolver problemas reales que la gente tenga.'
    },
    {
      question: '¿Qué pasa si no tengo ideas de qué construir?',
      answer: 'Parte del proceso es justamente desarrollar esa visión. Te enseñamos frameworks para identificar problemas, analizar tu día a día laboral, y detectar oportunidades. Además, la comunidad comparte constantemente ideas y casos reales. Muchas veces las mejores oportunidades están en problemas que ya enfrentas pero no habías considerado como solucionables.'
    },
    {
      question: '¿Incluye acceso a las herramientas y tecnologías necesarias?',
      answer: 'Te enseñamos qué herramientas usar (muchas gratuitas o de bajo costo) y cómo acceder a ellas, pero las licencias son por tu cuenta. Esto te da flexibilidad total y ownership real de tus creaciones. Incluimos templates, códigos base, y acceso a nuestra comunidad donde compartimos recursos y soluciones.'
    },
    {
      question: '¿Ofrecen garantía si no logro crear nada funcional?',
      answer: 'Sí. Si sigues el programa completo y no logras crear al menos una herramienta funcional en 60 días, te devolvemos el 100% de tu inversión. Pero esto rara vez pasa - nuestro enfoque está diseñado para garantizar que produces resultados reales, no solo consumes contenido.'
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
            Las dudas más comunes
          </h2>
          <p className="text-xl text-muted-foreground">
            Respuestas directas sobre qué puedes lograr realmente
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
                  <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:border-primary/30">
                    <Disclosure.Button className="flex justify-between items-center w-full px-6 py-5 text-left focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75 group">
                      <span className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors duration-200">
                        {faq.question}
                      </span>
                      <ChevronDownIcon
                        className={`${
                          open ? 'rotate-180' : ''
                        } w-5 h-5 text-primary transition-transform duration-300 flex-shrink-0 ml-4`}
                      />
                    </Disclosure.Button>
                    
                    <Disclosure.Panel className="px-6 pb-5">
                      <div className="text-muted-foreground leading-relaxed text-[15px] border-t border-border/30 pt-4">
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
          className="text-center mt-16"
        >
          <div className="bg-card/30 border border-border/50 rounded-xl p-8">
            <MessageCircle className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              ¿Tienes una pregunta específica?
            </h3>
            <p className="text-muted-foreground mb-6">
              Escríbenos directamente y te respondemos en menos de 24 horas
            </p>
            <button
              onClick={() => window.open('mailto:hola@irrelevant.com', '_blank')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/20 rounded-lg text-primary hover:bg-primary/20 transition-all duration-200 font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              Contáctanos directamente
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;