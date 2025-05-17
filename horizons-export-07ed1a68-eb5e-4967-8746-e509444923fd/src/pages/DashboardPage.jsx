import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import TransactionTable from '@/components/TransactionTable';
import SummaryDisplay from '@/components/SummaryDisplay';
import LoanCalculatorTool from '@/components/LoanCalculatorTool';
import AlertsNotifications from '@/components/AlertsNotifications';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import TransactionForm from '@/components/TransactionForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LogOut, LayoutDashboard, Calculator, Bell, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const CURRENCY_SYMBOL = '₹';

const DashboardPage = ({ user, onLogout }) => {
  const [transactions, setTransactions] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const getStorageKey = () => `transactions_${user?.id || 'guest'}`;

  useEffect(() => {
    setIsMounted(true);
    if (user) {
      const storedTransactions = localStorage.getItem(getStorageKey());
      if (storedTransactions) {
        setTransactions(JSON.parse(storedTransactions));
      } else {
        setTransactions([]); 
      }
    }
  }, [user]);

  useEffect(() => {
    if (isMounted && user) {
      localStorage.setItem(getStorageKey(), JSON.stringify(transactions));
    }
  }, [transactions, isMounted, user]);

  const addTransaction = (transaction) => {
    setTransactions(prev => [...prev, { ...transaction, userId: user.id }].sort((a,b) => new Date(b.date) - new Date(a.date)));
  };
  
  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsEditDialogOpen(true);
  };

  const updateTransaction = (updatedTransaction) => {
    setTransactions(prev => 
      prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t)
        .sort((a,b) => new Date(b.date) - new Date(a.date))
    );
    setEditingTransaction(null);
    setIsEditDialogOpen(false);
  };

  const deleteTransaction = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      setTransactions(prev => prev.filter(t => t.id !== id));
      toast({
        title: 'Deleted!',
        description: 'Transaction has been removed.',
        variant: 'destructive'
      });
    }
  };

  if (!isMounted) {
    return null; 
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-50">
      <Header onAddTransaction={addTransaction} />
      <main className="container mx-auto px-4 md:px-8 flex-grow">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <p className="text-slate-300 text-lg mb-2 sm:mb-0">Welcome, <span className="font-semibold text-purple-400">{user.email}</span>!</p>
          <div className="flex items-center gap-2">
            {user.isAdmin && (
              <Button 
                variant="ghost" 
                onClick={() => navigate('/admin')} 
                className="text-sky-400 hover:bg-sky-500/20 hover:text-sky-300 transition-colors duration-300"
              >
                <ShieldCheck className="mr-2 h-4 w-4" /> Admin Panel
              </Button>
            )}
            <Button variant="outline" onClick={onLogout} className="text-purple-400 border-purple-400 hover:bg-purple-500 hover:text-slate-900 transition-colors duration-300">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 gap-2 mb-6 bg-slate-800 border border-slate-700 rounded-lg p-1">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=inactive]:hover:bg-slate-700 transition-colors flex items-center justify-center py-2.5">
              <LayoutDashboard className="mr-2 h-5 w-5" /> Dashboard
            </TabsTrigger>
            <TabsTrigger value="loan-calculator" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=inactive]:hover:bg-slate-700 transition-colors flex items-center justify-center py-2.5">
              <Calculator className="mr-2 h-5 w-5" /> Loan Tools
            </TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=inactive]:hover:bg-slate-700 transition-colors flex items-center justify-center py-2.5 col-span-2 md:col-span-1">
              <Bell className="mr-2 h-5 w-5" /> Alerts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <SummaryDisplay transactions={transactions} currencySymbol={CURRENCY_SYMBOL} />
                <TransactionTable transactions={transactions} onEdit={handleEdit} onDelete={deleteTransaction} currencySymbol={CURRENCY_SYMBOL} />
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          <TabsContent value="loan-calculator">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <LoanCalculatorTool />
              <Card className="bg-slate-800 border-slate-700 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400">Custom Interest Schedules & Visual Timeline</CardTitle>
                  <CardDescription className="text-slate-400">
                    (Placeholder for advanced loan features like variable rates, balloon payments, and visual timelines. These are complex and will be implemented in future updates.)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">Future enhancements will include:</p>
                  <ul className="list-disc list-inside text-slate-400 mt-2 space-y-1">
                    <li>Editing interest rates per period for loans.</li>
                    <li>Calculating total cost of complex loans.</li>
                    <li>Simulating prepayment impact.</li>
                    <li>Charts showing interest paid over time and principal vs. interest ratios.</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="alerts">
             <AlertsNotifications />
          </TabsContent>
        </Tabs>

        {editingTransaction && (
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[425px] bg-slate-800 border-slate-700 text-slate-50">
              <DialogHeader>
                <DialogTitle className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Edit Transaction</DialogTitle>
                <DialogDescription className="text-slate-400">
                  Update the details of your transaction.
                </DialogDescription>
              </DialogHeader>
              <TransactionForm 
                onAddTransaction={updateTransaction} 
                initialData={editingTransaction}
              />
            </DialogContent>
          </Dialog>
        )}

      </main>
      <footer className="py-6 mt-12 text-center text-sm text-slate-400 bg-slate-900/50 border-t border-slate-700">
        <p>&copy; {new Date().getFullYear()} Finance Tracker Pro. Built with Hostinger Horizons.</p>
        <p>All data is stored locally in your browser, associated with your session.</p>
      </footer>
    </div>
  );
};

export default DashboardPage;