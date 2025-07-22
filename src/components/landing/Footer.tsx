import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight, MessageCircle, Mail, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const footerLinks = {
    empresa: [
      { name: 'Sobre nosotros', href: '#' },
      { name: 'Contacto', href: '#' }
    ],
    recursos: [
      { name: 'Blog', href: '#' },
      { name: 'Casos de estudio', href: '#' }
    ],
    legal: [
      { name: 'Términos', href: '#' },
      { name: 'Privacidad', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Mail, href: 'mailto:hola@irrelevant.com', label: 'Email' }
  ];

  return (
    <footer className="bg-background border-t border-border/50" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Main footer content */}
        <motion.div
          initial="initial"
          animate={inView ? "animate" : "initial"}
          className="py-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Brand section */}
            <motion.div variants={fadeInUp} className="lg:col-span-5">
              <img 
                src="https://storage.googleapis.com/cluvi/nuevo_irre-removebg-preview.png" 
                alt="irrelevant" 
                className="h-8 w-auto mb-4"
              />
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-sm">
                La comunidad de profesionales que dominan IA para crear herramientas reales.
              </p>
              
              {/* CTA Button */}
              <motion.a
                href="#WHATSAPP_LINK_PLACEHOLDER"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                Únirse a la comunidad
                <ArrowUpRight className="w-4 h-4" />
              </motion.a>
            </motion.div>

            {/* Links sections */}
            <div className="lg:col-span-7 grid grid-cols-3 gap-8">
              <motion.div variants={fadeInUp}>
                <h3 className="font-medium text-foreground mb-3">Empresa</h3>
                <ul className="space-y-2">
                  {footerLinks.empresa.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <h3 className="font-medium text-foreground mb-3">Recursos</h3>
                <ul className="space-y-2">
                  {footerLinks.recursos.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <h3 className="font-medium text-foreground mb-3">Legal</h3>
                <ul className="space-y-2">
                  {footerLinks.legal.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="border-t border-border/50 py-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-muted-foreground text-sm">
              © 2025 irrelevant club. Todos los derechos reservados.
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 bg-muted/10 hover:bg-primary/10 border border-border/30 hover:border-primary/30 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-200"
                    aria-label={social.label}
                  >
                    <IconComponent className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;