import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import DashboardPage from '@/pages/DashboardPage';
import AuthPage from '@/pages/AuthPage';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';

function App() {
  const [user, setUser] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();


  useEffect(() => {
    setIsMounted(true);
    const storedUser = localStorage.getItem('financeUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if(isMounted) {
      if (user) {
        localStorage.setItem('financeUser', JSON.stringify(user));
      } else {
        localStorage.removeItem('financeUser');
        localStorage.removeItem(`transactions_${user?.id || 'guest'}`); 
      }
    }
  }, [user, isMounted]);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    const previousUser = user;
    setUser(null);
    toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
    if (previousUser?.isAdmin) {
      navigate('/auth');
    } else {
      navigate('/auth');
    }
  };
  
  if (!isMounted) {
    return null; 
  }

  return (
    <>
      <Routes>
        <Route 
          path="/" 
          element={
            user ? <DashboardPage user={user} onLogout={handleLogout} /> : <Navigate to="/auth" />
          } 
        />
        <Route 
          path="/auth" 
          element={
            !user ? <AuthPage onLogin={handleLogin} /> : <Navigate to="/" />
          } 
        />
        <Route
          path="/admin"
          element={
            user && user.isAdmin ? <AdminDashboardPage /> : <Navigate to="/" />
          }
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;