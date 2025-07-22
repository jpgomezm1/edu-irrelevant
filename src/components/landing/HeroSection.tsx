import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { ArrowRight, AlertTriangle, Zap, Clock, TrendingUp } from 'lucide-react';

const HeroSection = () => {
 const navigate = useNavigate();
 const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

 const fadeInUp = {
   initial: { opacity: 0, y: 60 },
   animate: { opacity: 1, y: 0 },
   transition: { duration: 0.8, ease: "easeOut" }
 };

 const fadeInLeft = {
   initial: { opacity: 0, x: -60 },
   animate: { opacity: 1, x: 0 },
   transition: { duration: 0.8, ease: "easeOut" }
 };

 const fadeInRight = {
   initial: { opacity: 0, x: 60 },
   animate: { opacity: 1, x: 0 },
   transition: { duration: 0.8, ease: "easeOut" }
 };

 const staggerContainer = {
   animate: {
     transition: { staggerChildren: 0.2 }
   }
 };

 const floatAnimation = {
   animate: {
     y: [-10, 10, -10],
     transition: {
       duration: 3,
       repeat: Infinity,
       ease: [0.4, 0, 0.6, 1]
     }
   }
 };

 return (
   <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
     {/* Background gradient */}
     <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/10 to-background" />
     
     {/* Animated background elements */}
     <div className="absolute inset-0 opacity-20">
       <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-3xl animate-pulse" />
       <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-light/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
     </div>

     <div className="relative z-10 max-w-7xl mx-auto px-4" ref={ref}>
       <div className="grid lg:grid-cols-2 gap-16 items-center">
         
         {/* Left Column - Content */}
         <motion.div
           variants={staggerContainer}
           initial="initial"
           animate={inView ? "animate" : "initial"}
           className="space-y-8 lg:pr-8"
         >
           {/* Warning Badge - Mejorado */}
           <motion.div variants={fadeInLeft}>
             <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-background/80 border-2 border-orange-500/50 rounded-full text-sm backdrop-blur-md shadow-lg">
               <div className="flex items-center justify-center w-6 h-6 bg-orange-500/20 rounded-full">
                 <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />
               </div>
               <span className="font-semibold text-orange-200">La IA no te va a reemplazar...</span>
             </div>
           </motion.div>

           {/* Headlines */}
           <motion.div variants={fadeInLeft} className="space-y-6">
             <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
               <span className="text-foreground">...pero sí quien</span>
               <br />
               <span className="text-foreground">la use</span>{" "}
               <span className="bg-gradient-primary bg-clip-text text-transparent">
                 mejor que tú
               </span>
             </h1>
             
             <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
               Aprende a <span className="text-primary font-semibold">automatizar tareas</span>, <span className="text-primary font-semibold">crear código sin programar</span> y <span className="text-primary font-semibold">multiplicar tu productividad</span>
             </p>
           </motion.div>

           {/* Value Pills - Nuevos */}
           <motion.div variants={fadeInLeft}>
             <div className="flex flex-wrap gap-3">
               <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm">
                 <Clock className="w-4 h-4 text-primary" />
                 <span className="text-foreground font-medium">15h/semana recuperadas</span>
               </div>
               <div className="flex items-center gap-2 px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-sm">
                 <TrendingUp className="w-4 h-4 text-green-400" />
                 <span className="text-foreground font-medium">Metodología paso a paso</span>
               </div>
             </div>
           </motion.div>

           {/* CTA */}
           <motion.div variants={fadeInLeft} className="pt-4">
             <div className="flex flex-col sm:flex-row gap-4">
               <Button
                 size="lg"
                 onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                 className="text-lg px-8 py-4 bg-gradient-primary hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-elegant"
               >
                 Quiero dominar la IA
                 <ArrowRight className="ml-2 h-5 w-5" />
               </Button>
               <Button
                 size="lg"
                 variant="outline"
                 onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                 className="text-lg px-8 py-4 border-primary/30 hover:bg-primary/10"
               >
                 Ver contenido
               </Button>
             </div>
           </motion.div>

           {/* Stats - Más específicos */}
           <motion.div variants={fadeInLeft}>
             <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/50">
               {[
                 { end: 15, suffix: 'h', label: 'Tiempo ahorrado/semana', color: 'text-blue-400' },
                 { end: 850, suffix: '', prefix: '+$', label: 'Aumento salarial promedio', color: 'text-green-400' },
                 { end: 24, suffix: 'h', label: 'Acceso de por vida', color: 'text-primary' }
               ].map((stat, index) => (
                 <div key={index} className="text-center">
                   <div className={`text-2xl md:text-3xl font-bold ${stat.color} mb-1`}>
                     {inView && (
                       <CountUp
                         end={stat.end}
                         duration={2.5 + index * 0.2}
                         suffix={stat.suffix}
                         prefix={stat.prefix || ''}
                       />
                     )}
                   </div>
                   <p className="text-xs text-muted-foreground leading-tight">{stat.label}</p>
                 </div>
               ))}
             </div>
           </motion.div>
         </motion.div>

         {/* Right Column - Image */}
         <motion.div
           variants={fadeInRight}
           initial="initial"
           animate={inView ? "animate" : "initial"}
           className="relative flex justify-center lg:justify-end"
         >
           <div className="relative">
             {/* Decorative elements */}
             <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl transform scale-150 opacity-40"></div>
             
             {/* Main image */}
             <motion.div
               animate={{
                 y: [-10, 10, -10],
                 transition: {
                   duration: 3,
                   repeat: Infinity,
                   ease: "easeInOut"
                 }
               }}
               className="relative z-10"
             >
               <img
                 src="https://storage.googleapis.com/cluvi/Imagenes/Variaciones%20Mr.%20irrelevant%20(1).PNG"
                 alt="Tu mentor de IA - No te quedes atrás"
                 className="w-full max-w-xl h-auto drop-shadow-2xl"
                 style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))' }}
               />
             </motion.div>

             {/* Floating value badges - Más específicos */}
             <motion.div
               className="absolute top-16 -left-6 bg-background/95 backdrop-blur-sm border border-green-500/30 rounded-xl px-4 py-3 shadow-xl"
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 1, duration: 0.6 }}
             >
               <div className="text-center">
                 <div className="text-lg font-bold text-green-400">+$850</div>
                 <div className="text-xs text-muted-foreground">promedio/mes</div>
               </div>
             </motion.div>

             <motion.div
               className="absolute bottom-24 -right-6 bg-background/95 backdrop-blur-sm border border-primary/30 rounded-xl px-4 py-3 shadow-xl"
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 1.5, duration: 0.6 }}
             >
               <div className="flex items-center gap-2">
                 <Zap className="w-5 h-5 text-primary" />
                 <div>
                   <div className="text-sm font-semibold">Automatización</div>
                   <div className="text-xs text-muted-foreground">sin código</div>
                 </div>
               </div>
             </motion.div>

             <motion.div
               className="absolute top-1/2 right-2 bg-background/95 backdrop-blur-sm border border-blue-500/30 rounded-xl px-3 py-2 shadow-xl"
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 2, duration: 0.6 }}
             >
               <div className="text-center">
                 <div className="text-sm font-bold text-blue-400">15h</div>
                 <div className="text-xs text-muted-foreground">ahorradas</div>
               </div>
             </motion.div>
           </div>
         </motion.div>

       </div>
     </div>
   </section>
 );
};

export default HeroSection;