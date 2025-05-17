import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, Phone } from 'lucide-react';

const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      if (!email || !password) {
        toast({ title: 'Error', description: 'Please enter email and password.', variant: 'destructive' });
        return;
      }
      // Mock login - in a real app, you'd verify credentials against a backend
      // For demo, if email is admin@example.com, consider it an admin login
      const isAdmin = email === 'admin@example.com';
      onLogin({ id: 'mockUserId', email, isAdmin, whatsappNumber: '' }); 
      toast({ title: 'Logged In!', description: `Welcome back, ${email}!`, className: 'bg-green-600 text-white' });
      navigate('/');
    } else {
      if (!email || !password || !confirmPassword) {
        toast({ title: 'Error', description: 'Please fill all required fields for sign up.', variant: 'destructive' });
        return;
      }
      if (password !== confirmPassword) {
        toast({ title: 'Error', description: 'Passwords do not match.', variant: 'destructive' });
        return;
      }
      // Mock signup
      onLogin({ id: `mockUserId_${Date.now()}`, email, isAdmin: false, whatsappNumber }); 
      toast({ title: 'Signed Up!', description: `Welcome, ${email}! Your account is created.`, className: 'bg-green-600 text-white' });
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Card className="w-full max-w-md bg-slate-800 border-slate-700 shadow-2xl">
          <CardHeader className="text-center">
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {isLogin ? 'Welcome Back!' : 'Create Account'}
              </CardTitle>
              <CardDescription className="text-slate-400 pt-2">
                {isLogin ? 'Sign in to access your finances.' : 'Sign up to start tracking your money.'}
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div 
                initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.4 }}
                className="space-y-2"
              >
                <Label htmlFor="email" className="text-slate-300">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="bg-slate-700 border-slate-600 text-slate-50 placeholder:text-slate-400 focus:ring-purple-500" 
                />
              </motion.div>
              <motion.div 
                initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.4 }}
                className="space-y-2"
              >
                <Label htmlFor="password" className="text-slate-300">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="bg-slate-700 border-slate-600 text-slate-50 placeholder:text-slate-400 focus:ring-purple-500" 
                />
              </motion.div>
              {!isLogin && (
                <>
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.4 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="confirmPassword" className="text-slate-300">Confirm Password</Label>
                    <Input 
                      id="confirmPassword" 
                      type="password" 
                      placeholder="••••••••" 
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)} 
                      className="bg-slate-700 border-slate-600 text-slate-50 placeholder:text-slate-400 focus:ring-purple-500" 
                    />
                  </motion.div>
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6, duration: 0.4 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="whatsappNumber" className="text-slate-300 flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-green-400" /> WhatsApp Number (Optional)
                    </Label>
                    <Input 
                      id="whatsappNumber" 
                      type="tel" 
                      placeholder="+91 XXXXX XXXXX" 
                      value={whatsappNumber} 
                      onChange={(e) => setWhatsappNumber(e.target.value)} 
                      className="bg-slate-700 border-slate-600 text-slate-50 placeholder:text-slate-400 focus:ring-purple-500" 
                    />
                    <p className="text-xs text-slate-500">For EMI reminders and loan updates via WhatsApp (if enabled).</p>
                  </motion.div>
                </>
              )}
              <motion.div 
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: isLogin ? 0.5 : 0.7, duration: 0.4 }}
              >
                <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg">
                  {isLogin ? <><LogIn className="mr-2 h-5 w-5" /> Sign In</> : <><UserPlus className="mr-2 h-5 w-5" /> Sign Up</>}
                </Button>
              </motion.div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: isLogin ? 0.6 : 0.8, duration: 0.4 }}
            >
              <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="text-purple-400 hover:text-pink-400">
                {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default AuthPage;