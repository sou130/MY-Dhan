import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, Edit3 } from 'lucide-react';

const TransactionForm = ({ onAddTransaction, initialData }) => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [type, setType] = useState('Debit');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState('Paid');
  const [notes, setNotes] = useState('');
  
  const [isLoanType, setIsLoanType] = useState(false);
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');


  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setType(initialData.type || 'Debit');
      setAmount(initialData.amount || '');
      setDate(initialData.date || new Date().toISOString().split('T')[0]);
      setStatus(initialData.status || 'Paid');
      setNotes(initialData.notes || '');
      setInterestRate(initialData.interestRate || '');
      setLoanTerm(initialData.loanTerm || '');
    }
    setIsLoanType(initialData?.type === 'Loan' || initialData?.type === 'EMI');
  }, [initialData]);

  useEffect(() => {
    setIsLoanType(type === 'Loan' || type === 'EMI');
  }, [type]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount || !date) {
      toast({
        title: 'Error',
        description: 'Name, Amount, and Date are required.',
        variant: 'destructive',
      });
      return;
    }

    const transactionData = {
      id: initialData?.id || Date.now(), 
      name,
      type,
      amount: parseFloat(amount),
      date,
      status,
      notes,
    };

    if (isLoanType) {
      transactionData.interestRate = parseFloat(interestRate) || null;
      transactionData.loanTerm = parseFloat(loanTerm) || null;
    }

    onAddTransaction(transactionData);

    toast({
      title: 'Success!',
      description: `Transaction "${name}" ${initialData ? 'updated' : 'added'}.`,
      className: 'bg-green-600 text-white'
    });

    if (!initialData) {
      setName('');
      setType('Debit');
      setAmount('');
      setDate(new Date().toISOString().split('T')[0]);
      setStatus('Paid');
      setNotes('');
      setInterestRate('');
      setLoanTerm('');
    }
  };

  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };
  
  const loanFieldVariants = {
    hidden: { opacity: 0, height: 0, marginTop: 0, marginBottom: 0, y: 10 },
    visible: { opacity: 1, height: 'auto', marginTop: '1rem', marginBottom: '1rem', y: 0, transition: { duration: 0.3 } }
  };


  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-6 py-4"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.05 }}}}
    >
      <motion.div variants={formItemVariants} className="space-y-2">
        <Label htmlFor="name" className="text-slate-300">Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Groceries, Salary" className="bg-slate-700 border-slate-600 text-slate-50 placeholder:text-slate-400 focus:ring-purple-500" />
      </motion.div>
      
      <motion.div variants={formItemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type" className="text-slate-300">Type</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger id="type" className="w-full bg-slate-700 border-slate-600 text-slate-50 focus:ring-purple-500">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600 text-slate-50">
              {['Debit', 'Credit', 'EMI', 'Loan', 'Installment'].map(item => (
                <SelectItem key={item} value={item} className="hover:bg-slate-600 focus:bg-slate-600">{item}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-slate-300">Amount</Label>
          <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="bg-slate-700 border-slate-600 text-slate-50 placeholder:text-slate-400 focus:ring-purple-500" />
        </div>
      </motion.div>

      <AnimatePresence>
      {isLoanType && (
        <motion.div 
          variants={loanFieldVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="space-y-2">
            <Label htmlFor="interestRate" className="text-slate-300">Interest Rate (% p.a.)</Label>
            <Input id="interestRate" type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="e.g., 8.5" className="bg-slate-700 border-slate-600 text-slate-50 placeholder:text-slate-400 focus:ring-purple-500" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="loanTerm" className="text-slate-300">Loan Term (Years)</Label>
            <Input id="loanTerm" type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} placeholder="e.g., 5" className="bg-slate-700 border-slate-600 text-slate-50 placeholder:text-slate-400 focus:ring-purple-500" />
          </div>
        </motion.div>
      )}
      </AnimatePresence>
      
      <motion.div variants={formItemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date" className="text-slate-300">Date</Label>
          <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="bg-slate-700 border-slate-600 text-slate-50 focus:ring-purple-500" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status" className="text-slate-300">Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger id="status" className="w-full bg-slate-700 border-slate-600 text-slate-50 focus:ring-purple-500">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600 text-slate-50">
              {['Paid', 'Pending'].map(item => (
                <SelectItem key={item} value={item} className="hover:bg-slate-600 focus:bg-slate-600">{item}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </motion.div>
      
      <motion.div variants={formItemVariants} className="space-y-2">
        <Label htmlFor="notes" className="text-slate-300">Notes/Description</Label>
        <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional notes, e.g., loan details, payment schedule" className="bg-slate-700 border-slate-600 text-slate-50 placeholder:text-slate-400 focus:ring-purple-500" />
      </motion.div>
      
      <motion.div variants={formItemVariants} className="flex justify-end pt-2">
        <Button type="submit" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center">
          {initialData ? <Edit3 className="mr-2 h-5 w-5" /> : <PlusCircle className="mr-2 h-5 w-5" />}
          {initialData ? 'Update' : 'Add'} Transaction
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default TransactionForm;