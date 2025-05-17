import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDownCircle, ArrowUpCircle, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const SummaryCard = ({ title, value, icon, colorClass, delay, currencySymbol }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay * 0.15 }}
  >
    <Card className="bg-slate-800 border-slate-700 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-400">{title}</CardTitle>
        {React.cloneElement(icon, { className: `h-5 w-5 ${colorClass}` })}
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${colorClass}`}>
          {currencySymbol}{value.toFixed(2)}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const SummaryDisplay = ({ transactions, currencySymbol }) => {
  const totalDebit = transactions
    .filter(t => t.type === 'Debit')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalCredit = transactions
    .filter(t => t.type === 'Credit')
    .reduce((sum, t) => sum + t.amount, 0);

  const outstandingLoanEMI = transactions
    .filter(t => (t.type === 'Loan' || t.type === 'EMI') && t.status === 'Pending')
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingAmounts = transactions
    .filter(t => t.status === 'Pending' && t.type !== 'Loan' && t.type !== 'EMI')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const netBalance = totalCredit - totalDebit;

  const summaryItems = [
    { title: 'Total Credit', value: totalCredit, icon: <ArrowUpCircle />, colorClass: 'text-green-400', delay: 0 },
    { title: 'Total Debit', value: totalDebit, icon: <ArrowDownCircle />, colorClass: 'text-red-400', delay: 1 },
    { title: 'Net Balance', value: netBalance, icon: <TrendingUp />, colorClass: netBalance >= 0 ? 'text-sky-400' : 'text-orange-400', delay: 2 },
    { title: 'Outstanding Loan/EMI', value: outstandingLoanEMI, icon: <AlertTriangle />, colorClass: 'text-yellow-400', delay: 3 },
    { title: 'Other Pending', value: pendingAmounts, icon: <CheckCircle />, colorClass: 'text-indigo-400', delay: 4 },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-8">
      {summaryItems.map(item => (
        <SummaryCard key={item.title} {...item} currencySymbol={currencySymbol} />
      ))}
    </div>
  );
};

export default SummaryDisplay;