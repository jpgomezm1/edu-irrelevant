import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import CountUp from 'react-countup';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Calculator, TrendingUp } from 'lucide-react';

interface CalculatorForm {
  hours: number;
  salary: number;
  area: string;
}

const ROICalculator = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [calculatedROI, setCalculatedROI] = useState(0);
  const [hours, setHours] = useState([20]);
  const [salary, setSalary] = useState(60000);
  const [area, setArea] = useState('');

  const calculateROI = () => {
    const hourlyRate = salary / 2080; // horas anuales
    const timeSaved = hours[0] * 0.6; // 60% ahorro promedio
    const monthlySaving = timeSaved * hourlyRate * 4.33;
    const annualSaving = monthlySaving * 12;
    setCalculatedROI(annualSaving);
  };

  React.useEffect(() => {
    if (salary && hours[0] && area) {
      calculateROI();
    }
  }, [salary, hours, area]);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const salaryRanges = [
    { value: 30000, label: '$30K - $40K' },
    { value: 50000, label: '$40K - $60K' },
    { value: 70000, label: '$60K - $80K' },
    { value: 90000, label: '$80K - $100K' },
    { value: 120000, label: '$100K - $150K' },
    { value: 175000, label: '$150K - $200K' },
    { value: 250000, label: '$200K+' }
  ];

  const workAreas = [
    'Finanzas',
    'Planeación',
    'Ventas',
    'Marketing',
    'Legal',
    'RRHH',
    'Operaciones',
    'Dirección'
  ];

  return (
    <section className="py-20 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="initial"
          animate={inView ? "animate" : "initial"}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/20 border border-success/30 rounded-full text-sm text-success mb-6">
            <Calculator className="w-4 h-4" />
            Calculadora ROI
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Calcula tu Retorno de Inversión
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubre cuánto puede ahorrar tu empresa implementando IA
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="p-8 bg-card/50 backdrop-blur-sm border border-border/50 shadow-elegant">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form */}
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-semibold text-foreground">
                    Horas semanales de trabajo: {hours[0]}h
                  </Label>
                  <div className="mt-3">
                    <Slider
                      value={hours}
                      onValueChange={setHours}
                      max={40}
                      min={10}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>10h</span>
                      <span>40h</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold text-foreground">
                    Rango salarial anual
                  </Label>
                  <Select value={salary.toString()} onValueChange={(value) => setSalary(Number(value))}>
                    <SelectTrigger className="mt-3">
                      <SelectValue placeholder="Selecciona tu rango salarial" />
                    </SelectTrigger>
                    <SelectContent>
                      {salaryRanges.map((range) => (
                        <SelectItem key={range.value} value={range.value.toString()}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-semibold text-foreground">
                    Área de trabajo
                  </Label>
                  <Select value={area} onValueChange={setArea}>
                    <SelectTrigger className="mt-3">
                      <SelectValue placeholder="Selecciona tu área" />
                    </SelectTrigger>
                    <SelectContent>
                      {workAreas.map((workArea) => (
                        <SelectItem key={workArea} value={workArea}>
                          {workArea}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Results */}
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 bg-gradient-primary rounded-full flex items-center justify-center">
                    <TrendingUp className="w-12 h-12 text-primary-foreground" />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-lg text-muted-foreground">Ahorro anual estimado</p>
                    <div className="text-4xl md:text-5xl font-bold text-success">
                      {calculatedROI > 0 && (
                        <CountUp
                          end={calculatedROI}
                          duration={2}
                          prefix="$"
                          separator=","
                          decimals={0}
                        />
                      )}
                    </div>
                    {calculatedROI > 0 && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-muted-foreground"
                      >
                        ROI de {Math.round((calculatedROI / 497) * 100)}% en el primer año
                      </motion.p>
                    )}
                  </div>

                  {calculatedROI > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mt-6"
                    >
                      <Button
                        onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-success hover:bg-success/90"
                      >
                        Ver Planes
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ROICalculator;