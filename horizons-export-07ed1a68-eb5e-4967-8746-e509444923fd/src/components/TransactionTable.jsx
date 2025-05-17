import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { motion } from 'framer-motion';
import { Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TransactionTable = ({ transactions, onEdit, onDelete, currencySymbol }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-10 text-slate-400"
      >
        <p className="text-xl">No transactions yet.</p>
        <p>Add a new transaction to get started!</p>
      </motion.div>
    );
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'Paid':
        return 'text-green-400 bg-green-900/50';
      case 'Pending':
        return 'text-yellow-400 bg-yellow-900/50';
      default:
        return 'text-slate-400 bg-slate-700/50';
    }
  };

  const getTypeClass = (type) => {
    switch (type) {
      case 'Credit':
        return 'text-sky-400';
      case 'Debit':
        return 'text-red-400';
      case 'EMI':
      case 'Loan':
        return 'text-orange-400';
      case 'Installment':
        return 'text-indigo-400';
      default:
        return 'text-slate-300';
    }
  };


  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="overflow-x-auto rounded-lg shadow-xl bg-slate-800 border border-slate-700"
    >
      <Table>
        <TableHeader className="bg-slate-700/50">
          <TableRow className="border-slate-700">
            <TableHead className="w-[50px] text-slate-300 font-semibold">Sr. No.</TableHead>
            <TableHead className="text-slate-300 font-semibold">Name</TableHead>
            <TableHead className="text-slate-300 font-semibold">Type</TableHead>
            <TableHead className="text-right text-slate-300 font-semibold">Amount</TableHead>
            <TableHead className="text-slate-300 font-semibold">Date</TableHead>
            <TableHead className="text-center text-slate-300 font-semibold">Status</TableHead>
            <TableHead className="text-slate-300 font-semibold">Notes</TableHead>
            <TableHead className="text-right text-slate-300 font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction, index) => (
            <motion.tr 
              key={transaction.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="border-slate-700 hover:bg-slate-700/70"
            >
              <TableCell className="font-medium text-slate-400">{index + 1}</TableCell>
              <TableCell className="text-slate-200">{transaction.name}</TableCell>
              <TableCell className={`${getTypeClass(transaction.type)} font-medium`}>{transaction.type}</TableCell>
              <TableCell className={`text-right font-medium ${transaction.type === 'Credit' ? 'text-green-400' : 'text-red-400'}`}>
                {currencySymbol}{transaction.amount.toFixed(2)}
              </TableCell>
              <TableCell className="text-slate-400">{new Date(transaction.date).toLocaleDateString()}</TableCell>
              <TableCell className="text-center">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(transaction.status)}`}>
                  {transaction.status}
                </span>
              </TableCell>
              <TableCell className="text-slate-400 max-w-xs truncate">{transaction.notes || '-'}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="ghost" size="icon" onClick={() => onEdit(transaction)} className="text-blue-400 hover:text-blue-300 hover:bg-slate-700">
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onDelete(transaction.id)} className="text-red-400 hover:text-red-300 hover:bg-slate-700">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default TransactionTable;