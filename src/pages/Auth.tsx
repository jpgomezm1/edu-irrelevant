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
import { Brain } from 'lucide-react';

export const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
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
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4">
              <Brain className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">IrRelevant</h1>
            <p className="text-muted-foreground mt-2">
              Tu academia de IA empresarial
            </p>
          </div>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-card-foreground">
                {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
              </CardTitle>
              <CardDescription className="text-center">
                {isLogin
                  ? 'Accede a tu academia de IA'
                  : 'Únete a la revolución de IA empresarial'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={isLogin ? handleSubmit : (e) => e.preventDefault()} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@empresa.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
                <Button
                  type={isLogin ? "submit" : "button"}
                  className="w-full"
                  disabled={loading}
                  onClick={isLogin ? undefined : handleRegisterClick}
                >
                  {loading ? 'Procesando...' : isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                </Button>
              </form>
              
              <div className="mt-4 text-center">
                <Button
                  variant="ghost"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm"
                >
                  {isLogin
                    ? '¿No tienes cuenta? Regístrate'
                    : '¿Ya tienes cuenta? Inicia sesión'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Dialog de código de acceso */}
        <Dialog open={showAccessDialog} onOpenChange={setShowAccessDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Código de Acceso Requerido</DialogTitle>
              <DialogDescription>
                Por favor ingresa el código de acceso para crear tu cuenta en IrRelevant Academy.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="accessCode">Código de Acceso</Label>
                <Input
                  id="accessCode"
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="Ingresa el código de acceso"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAccessCodeSubmit();
                    }
                  }}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowAccessDialog(false)}
                  className="w-full"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleAccessCodeSubmit}
                  className="w-full"
                  disabled={!accessCode.trim()}
                >
                  Continuar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};