import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ChevronRight, ChevronLeft, User, Building, Briefcase, Users, Brain, Sparkles } from 'lucide-react';

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

const companySizes = [
  '1-10',
  '11-50',
  '51-200',
  '200+'
];

const aiExperienceOptions = [
  { value: 1, label: 'Nunca he usado IA' },
  { value: 2, label: 'He probado ChatGPT' },
  { value: 3, label: 'Uso IA ocasionalmente' },
  { value: 4, label: 'Uso IA regularmente' },
  { value: 5, label: 'Soy experto en IA' },
];

export const Onboarding: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user, refreshUserData } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form data
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [workArea, setWorkArea] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [aiExperience, setAiExperience] = useState<number>(1);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleNext = () => {
    if (step === 1 && (!fullName || !companyName || !workArea)) {
      toast({
        title: 'Campos requeridos',
        description: 'Por favor completa todos los campos',
        variant: 'destructive',
      });
      return;
    }
    setStep(2);
  };

  const handleComplete = async () => {
    if (!companySize) {
      toast({
        title: 'Campos requeridos',
        description: 'Por favor completa todos los campos',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          full_name: fullName,
          company_name: companyName,
          work_area: workArea,
          company_size: companySize,
          ai_experience: aiExperience,
          profile_completed: true,
        })
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      // Actualizar el estado global del usuario ANTES de navegar
      await refreshUserData();

      toast({
        title: '¡Bienvenido!',
        description: 'Tu perfil ha sido completado exitosamente',
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Hubo un problema al guardar tu perfil',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-background p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="w-full max-w-lg relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Header con logo mejorado */}
          <div className="text-center mb-10">
            <motion.div 
              className="flex flex-col items-center mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-lg opacity-30"></div>
                <div className="relative bg-background/80 backdrop-blur-md p-4 rounded-2xl border border-primary/20 shadow-2xl">
                  <img
                    src="https://storage.googleapis.com/cluvi/nuevo_irre-removebg-preview.png"
                    alt="irrelevant Logo"
                    className="h-12 w-auto"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  AI Academy
                </h1>
                <Sparkles className="w-6 h-6 text-primary animate-pulse" />
              </div>
            </motion.div>
            <motion.p 
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Personalicemos tu experiencia de aprendizaje IA
            </motion.p>
          </div>

          {/* Progress indicator mejorado */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                step >= 1 ? 'bg-primary border-primary text-primary-foreground' : 'border-muted-foreground/30 text-muted-foreground'
              }`}>
                <User className="w-5 h-5" />
              </div>
              <div className={`h-0.5 w-16 transition-all ${
                step >= 2 ? 'bg-primary' : 'bg-muted-foreground/30'
              }`} />
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                step >= 2 ? 'bg-primary border-primary text-primary-foreground' : 'border-muted-foreground/30 text-muted-foreground'
              }`}>
                <Brain className="w-5 h-5" />
              </div>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              {step === 1 ? 'Información personal' : 'Contexto empresarial'}
            </div>
          </motion.div>

          {/* Card principal mejorada */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card className="bg-background/80 backdrop-blur-md border-primary/20 shadow-2xl">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl text-center text-foreground font-bold">
                  {step === 1 ? '👋 Cuéntanos sobre ti' : '🏢 Tu contexto empresarial'}
                </CardTitle>
                <CardDescription className="text-center text-base">
                  {step === 1 
                    ? 'Información básica para personalizar tu aprendizaje' 
                    : 'Contexto empresarial para adaptar el contenido'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {step === 1 ? (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-5"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-sm font-medium flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Nombre completo
                      </Label>
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Tu nombre completo"
                        className="h-12 bg-background/50 border-primary/20 focus:border-primary/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-sm font-medium flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        Nombre de la empresa
                      </Label>
                      <Input
                        id="companyName"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Nombre de tu empresa"
                        className="h-12 bg-background/50 border-primary/20 focus:border-primary/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="workArea" className="text-sm font-medium flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        Área de trabajo
                      </Label>
                      <Select value={workArea} onValueChange={setWorkArea}>
                        <SelectTrigger className="h-12 bg-background/50 border-primary/20 focus:border-primary/50">
                          <SelectValue placeholder="Selecciona tu área" />
                        </SelectTrigger>
                        <SelectContent>
                          {workAreas.map((area) => (
                            <SelectItem key={area} value={area}>
                              {area}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button 
                      onClick={handleNext} 
                      className="w-full h-12 text-base font-semibold bg-gradient-primary hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                    >
                      Continuar
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-5"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="companySize" className="text-sm font-medium flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Tamaño de empresa
                      </Label>
                      <Select value={companySize} onValueChange={setCompanySize}>
                        <SelectTrigger className="h-12 bg-background/50 border-primary/20 focus:border-primary/50">
                          <SelectValue placeholder="Selecciona el tamaño" />
                        </SelectTrigger>
                        <SelectContent>
                          {companySizes.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size} empleados
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="aiExperience" className="text-sm font-medium flex items-center gap-2">
                        <Brain className="w-4 h-4" />
                        Experiencia con IA
                      </Label>
                      <Select 
                        value={aiExperience.toString()} 
                        onValueChange={(value) => setAiExperience(parseInt(value))}
                      >
                        <SelectTrigger className="h-12 bg-background/50 border-primary/20 focus:border-primary/50">
                          <SelectValue placeholder="Selecciona tu nivel" />
                        </SelectTrigger>
                        <SelectContent>
                          {aiExperienceOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value.toString()}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        onClick={() => setStep(1)}
                        className="flex-1 h-12"
                      >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Atrás
                      </Button>
                      <Button 
                        onClick={handleComplete} 
                        className="flex-1 h-12 text-base font-semibold bg-gradient-primary hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Completando...
                          </div>
                        ) : (
                          '🚀 Completar perfil'
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};