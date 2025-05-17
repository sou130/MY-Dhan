import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BellRing, AlertTriangle, CheckCircle, MessageSquare as MessageSquareText } from 'lucide-react';
import { motion } from 'framer-motion';

const AlertItem = ({ title, description, date, type, icon, color, channel }) => (
  <motion.div 
    className="flex items-start space-x-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:shadow-lg transition-shadow"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
  >
    {React.cloneElement(icon, { className: `h-6 w-6 ${color} mt-1` })}
    <div className="flex-1">
      <h4 className={`font-semibold ${color}`}>{title}</h4>
      <p className="text-sm text-slate-300">{description}</p>
      {date && <p className="text-xs text-slate-400 mt-1">Date: {date}</p>}
    </div>
    {channel && (
      <div className="flex items-center text-xs text-slate-500 bg-slate-600/50 px-2 py-1 rounded">
        <MessageSquareText className="h-3 w-3 mr-1 text-green-400" /> {channel}
      </div>
    )}
  </motion.div>
);

const AlertsNotifications = () => {
  const alerts = [
    { 
      id: 1, 
      title: 'EMI Due Soon', 
      description: 'Your home loan EMI of ₹15,000 is due next week.', 
      date: '2025-05-23', 
      type: 'due',
      icon: <AlertTriangle />,
      color: 'text-yellow-400',
      channel: 'WhatsApp'
    },
    { 
      id: 2, 
      title: 'Investment Matured', 
      description: 'Your Fixed Deposit of ₹50,000 has matured.', 
      date: '2025-05-10', 
      type: 'maturity',
      icon: <CheckCircle />,
      color: 'text-green-400',
      channel: 'In-App'
    },
    { 
      id: 3, 
      title: 'Credit Card Payment', 
      description: 'Credit card bill payment of ₹5,000 is due in 3 days.', 
      date: '2025-05-19', 
      type: 'payment',
      icon: <AlertTriangle />,
      color: 'text-orange-400',
      channel: 'WhatsApp'
    },
    { 
      id: 4, 
      title: 'Loan Status Update', 
      description: 'Your personal loan application has been approved.', 
      date: '2025-05-15', 
      type: 'status',
      icon: <CheckCircle />,
      color: 'text-sky-400',
      channel: 'In-App'
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="bg-slate-800 border-slate-700 shadow-xl w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 flex items-center">
            <BellRing className="mr-3 h-7 w-7 text-purple-400" /> Alerts & Notifications
          </CardTitle>
          <CardDescription className="text-slate-400">
            Stay updated with your financial reminders. Some alerts can be sent via WhatsApp if enabled. (Full functionality requires backend & WhatsApp API integration)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {alerts.length > 0 ? (
            alerts.map(alert => <AlertItem key={alert.id} {...alert} />)
          ) : (
            <p className="text-slate-400 text-center py-4">No active alerts.</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AlertsNotifications;