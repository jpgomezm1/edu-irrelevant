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
import { ChevronRight, ChevronLeft, Brain } from 'lucide-react';

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
  const { user } = useAuth();
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
        toast({
          title: 'Error',
          description: 'Hubo un problema al guardar tu perfil',
          variant: 'destructive',
        });
      } else {
        toast({
          title: '¡Bienvenido!',
          description: 'Tu perfil ha sido completado exitosamente',
        });
        navigate('/dashboard');
      }
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
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4">
              <Brain className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">¡Bienvenido a IrRelevant!</h1>
            <p className="text-muted-foreground mt-2">
              Vamos a personalizar tu experiencia de aprendizaje
            </p>
          </div>

          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-card-foreground">
                    {step === 1 ? 'Información Básica' : 'Contexto Empresarial'}
                  </CardTitle>
                  <CardDescription>
                    Paso {step} de 2
                  </CardDescription>
                </div>
                <div className="text-sm text-muted-foreground">
                  {step}/2
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {step === 1 ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nombre completo</Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Nombre de la empresa</Label>
                    <Input
                      id="companyName"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Nombre de tu empresa"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="workArea">Área de trabajo</Label>
                    <Select value={workArea} onValueChange={setWorkArea}>
                      <SelectTrigger>
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
                  <Button onClick={handleNext} className="w-full">
                    Continuar
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="companySize">Tamaño de empresa</Label>
                    <Select value={companySize} onValueChange={setCompanySize}>
                      <SelectTrigger>
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
                    <Label htmlFor="aiExperience">Experiencia con IA</Label>
                    <Select 
                      value={aiExperience.toString()} 
                      onValueChange={(value) => setAiExperience(parseInt(value))}
                    >
                      <SelectTrigger>
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
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setStep(1)}
                      className="w-full"
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Atrás
                    </Button>
                    <Button 
                      onClick={handleComplete} 
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? 'Completando...' : 'Completar perfil'}
                    </Button>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};