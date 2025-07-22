import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, Sparkles } from 'lucide-react';

export const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showAccessDialog, setShowAccessDialog] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const { user, signIn, signUp } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      // User is authenticated, they will be redirected by the router
    }
  }, [user]);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleRegisterClick = () => {
    if (isLogin) {
      setIsLogin(false);
    } else {
      setShowAccessDialog(true);
    }
  };

  const handleAccessCodeSubmit = () => {
    if (accessCode.toLowerCase() === 'irrelevant crew') {
      setShowAccessDialog(false);
      setAccessCode('');
      handleSubmit();
    } else {
      toast({
        title: 'Código incorrecto',
        description: 'El código de acceso no es válido',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);

    try {
      const { error } = isLogin
        ? await signIn(email, password)
        : await signUp(email, password, { email });

      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      } else if (!isLogin) {
        toast({
          title: 'Cuenta creada',
          description: 'Tu cuenta ha sido creada exitosamente. Ahora puedes iniciar sesión.',
        });
        setIsLogin(true);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Hubo un problema con la autenticación',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-background p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="w-full max-w-md relative z-10">
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
          </div>

          {/* Card principal mejorada */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card className="bg-background/80 backdrop-blur-md border-primary/20 shadow-2xl">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl text-center text-foreground font-bold">
                  {isLogin ? 'Bienvenido de vuelta' : 'Únete a la revolución IA'}
                </CardTitle>
                <CardDescription className="text-center text-base">
                  {isLogin
                    ? 'Accede a tu entrenamiento personalizado'
                    : 'Transforma tu carrera con inteligencia artificial'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={isLogin ? handleSubmit : (e) => e.preventDefault()} className="space-y-5">
                  {/* Email input mejorado */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@empresa.com"
                        className="pl-10 h-12 bg-background/50 border-primary/20 focus:border-primary/50 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {/* Password input mejorado */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">Contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="pl-10 pr-10 h-12 bg-background/50 border-primary/20 focus:border-primary/50 transition-colors"
                        required
                        minLength={6}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* CTA button mejorado */}
                  <Button
                    type={isLogin ? "submit" : "button"}
                    className="w-full h-12 text-base font-semibold bg-gradient-primary hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                    disabled={loading}
                    onClick={isLogin ? undefined : handleRegisterClick}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Procesando...
                      </div>
                    ) : (
                      isLogin ? '🚀 Acceder' : '🚀 Crear mi cuenta'
                    )}
                  </Button>
                </form>
                
                {/* Switch mode mejorado */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-primary/20"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-4 text-muted-foreground font-medium">o</span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  onClick={() => setIsLogin(!isLogin)}
                  className="w-full text-sm hover:bg-primary/10 transition-colors"
                >
                  {isLogin
                    ? '¿Nuevo aquí? Únete a la revolución IA →'
                    : '¿Ya tienes cuenta? Inicia sesión →'}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Dialog mejorado */}
        <Dialog open={showAccessDialog} onOpenChange={setShowAccessDialog}>
          <DialogContent className="bg-background/95 backdrop-blur-md border-primary/20">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">🔐 Código de Acceso Exclusivo</DialogTitle>
              <DialogDescription className="text-base">
                Ingresa tu código de acceso especial para unirte a AI Academy.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="accessCode" className="text-sm font-medium">Código de Acceso</Label>
                <Input
                  id="accessCode"
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="Ingresa tu código especial"
                  className="h-12 bg-background/50 border-primary/20 focus:border-primary/50"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAccessCodeSubmit();
                    }
                  }}
                />
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowAccessDialog(false)}
                  className="flex-1 h-11"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleAccessCodeSubmit}
                  className="flex-1 h-11 bg-gradient-primary hover:opacity-90"
                  disabled={!accessCode.trim()}
                >
                  Verificar Código
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};