import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';
import { TrendingUp, Percent, CalendarDays, Landmark } from 'lucide-react';

const CURRENCY_SYMBOL = '₹';

const LoanCalculatorTool = () => {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(8);
  const [loanTenure, setLoanTenure] = useState(5); 
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  const calculateEmi = () => {
    if (loanAmount <= 0 || interestRate <= 0 || loanTenure <= 0) {
      setEmi(0);
      setTotalInterest(0);
      setTotalPayment(0);
      return;
    }

    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12; 
    const tenureMonths = parseFloat(loanTenure) * 12;

    if (rate === 0) { 
      const calculatedEmi = principal / tenureMonths;
      setEmi(calculatedEmi);
      setTotalInterest(0);
      setTotalPayment(principal);
      return;
    }

    const emiValue = (principal * rate * Math.pow(1 + rate, tenureMonths)) / (Math.pow(1 + rate, tenureMonths) - 1);
    const totalPaymentValue = emiValue * tenureMonths;
    const totalInterestValue = totalPaymentValue - principal;

    setEmi(emiValue);
    setTotalInterest(totalInterestValue);
    setTotalPayment(totalPaymentValue);
  };

  React.useEffect(() => {
    calculateEmi();
  }, [loanAmount, interestRate, loanTenure]);

  const formatCurrency = (value) => {
    return `${CURRENCY_SYMBOL}${value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-slate-800 border-slate-700 shadow-xl w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 flex items-center">
            <Landmark className="mr-3 h-7 w-7 text-purple-400" /> Loan EMI Calculator
          </CardTitle>
          <CardDescription className="text-slate-400">
            Simulate your loan EMIs, interest, and total payments.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div className="space-y-2">
              <Label htmlFor="loanAmount" className="text-slate-300 flex items-center"><TrendingUp className="mr-2 h-4 w-4 text-sky-400" />Loan Amount ({CURRENCY_SYMBOL})</Label>
              <Input
                id="loanAmount"
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Math.max(0, parseFloat(e.target.value)))}
                className="bg-slate-700 border-slate-600 text-slate-50 placeholder:text-slate-400 focus:ring-purple-500"
                placeholder="e.g., 500000"
              />
              <Slider
                value={[loanAmount]}
                onValueChange={(value) => setLoanAmount(value[0])}
                max={10000000}
                step={10000}
                className="[&>span:first-child]:h-1 [&>span:first-child]:bg-purple-500 [&>span:first-child>span]:bg-pink-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interestRate" className="text-slate-300 flex items-center"><Percent className="mr-2 h-4 w-4 text-red-400" />Interest Rate (% p.a.)</Label>
              <Input
                id="interestRate"
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Math.max(0, parseFloat(e.target.value)))}
                className="bg-slate-700 border-slate-600 text-slate-50 placeholder:text-slate-400 focus:ring-purple-500"
                placeholder="e.g., 8.5"
              />
              <Slider
                value={[interestRate]}
                onValueChange={(value) => setInterestRate(value[0])}
                max={20}
                step={0.1}
                className="[&>span:first-child]:h-1 [&>span:first-child]:bg-purple-500 [&>span:first-child>span]:bg-pink-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loanTenure" className="text-slate-300 flex items-center"><CalendarDays className="mr-2 h-4 w-4 text-green-400" />Loan Tenure (Years)</Label>
              <Input
                id="loanTenure"
                type="number"
                value={loanTenure}
                onChange={(e) => setLoanTenure(Math.max(0, parseFloat(e.target.value)))}
                className="bg-slate-700 border-slate-600 text-slate-50 placeholder:text-slate-400 focus:ring-purple-500"
                placeholder="e.g., 10"
              />
              <Slider
                value={[loanTenure]}
                onValueChange={(value) => setLoanTenure(value[0])}
                max={30}
                step={1}
                className="[&>span:first-child]:h-1 [&>span:first-child]:bg-purple-500 [&>span:first-child>span]:bg-pink-500"
              />
            </div>
          </div>
          
          {emi > 0 && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.5 }}
              className="mt-8 p-6 bg-slate-700/50 rounded-lg border border-slate-600 space-y-4"
            >
              <h3 className="text-xl font-semibold text-slate-100 mb-4">Loan Summary</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-slate-400">Monthly EMI</p>
                  <p className="text-2xl font-bold text-purple-400">{formatCurrency(emi)}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Total Interest Payable</p>
                  <p className="text-2xl font-bold text-pink-400">{formatCurrency(totalInterest)}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Total Payment</p>
                  <p className="text-2xl font-bold text-sky-400">{formatCurrency(totalPayment)}</p>
                </div>
              </div>
            </motion.div>
          )}
          <div className="text-xs text-slate-500 mt-4">
            <p>*Calculations are indicative and may vary based on bank policies.</p>
            <p>*This calculator assumes a fixed interest rate for the entire tenure.</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LoanCalculatorTool;