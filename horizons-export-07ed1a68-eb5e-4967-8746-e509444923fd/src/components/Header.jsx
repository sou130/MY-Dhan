
import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import TransactionForm from '@/components/TransactionForm';
import { motion } from 'framer-motion';

const Header = ({ onAddTransaction }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="py-6 px-4 md:px-8 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 shadow-xl rounded-b-xl mb-8"
    >
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 sm:mb-0">
          Finance Tracker Pro
        </h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="secondary" size="lg" className="bg-white text-purple-700 hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg">
              <PlusCircle className="mr-2 h-5 w-5" /> Add Transaction
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-slate-800 border-slate-700 text-slate-50">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Add New Transaction</DialogTitle>
              <DialogDescription className="text-slate-400">
                Fill in the details below to add a new financial record.
              </DialogDescription>
            </DialogHeader>
            <TransactionForm onAddTransaction={(data) => {
              onAddTransaction(data);
              setOpen(false); 
            }} />
          </DialogContent>
        </Dialog>
      </div>
    </motion.header>
  );
};

export default Header;
