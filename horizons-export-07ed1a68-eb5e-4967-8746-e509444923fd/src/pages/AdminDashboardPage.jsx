import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, TrendingUp, UserPlus, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ title, value, icon, description, colorClass, delay }) => (
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
        <div className={`text-3xl font-bold ${colorClass}`}>{value}</div>
        {description && <p className="text-xs text-slate-500 mt-1">{description}</p>}
      </CardContent>
    </Card>
  </motion.div>
);

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  // Mock data - in a real app, this would come from a backend
  const userStats = {
    totalRegistered: 1250,
    dailyActive: 320,
    newUsersToday: 15,
    monthlyGrowth: 12, // percentage
  };

  const chartCardVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-slate-50 p-4 md:p-8">
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Admin Dashboard
          </h1>
          <Button variant="outline" onClick={() => navigate('/')} className="text-purple-400 border-purple-400 hover:bg-purple-500 hover:text-slate-900">
            Back to App
          </Button>
        </div>
        <p className="text-slate-400 mt-2 container mx-auto">User statistics and application growth insights.</p>
      </motion.header>

      <main className="container mx-auto">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard title="Total Registered Users" value={userStats.totalRegistered.toLocaleString()} icon={<Users />} colorClass="text-sky-400" delay={0} description="All time registered users" />
          <StatCard title="Daily Active Users (DAU)" value={userStats.dailyActive.toLocaleString()} icon={<TrendingUp />} colorClass="text-green-400" delay={1} description="Active in last 24 hours" />
          <StatCard title="New Users Today" value={userStats.newUsersToday.toLocaleString()} icon={<UserPlus />} colorClass="text-yellow-400" delay={2} description="Signed up today" />
          <StatCard title="Monthly Growth Rate" value={`${userStats.monthlyGrowth}%`} icon={<BarChart3 />} colorClass="text-pink-400" delay={3} description="Compared to last month" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div variants={chartCardVariants} initial="initial" animate="animate">
            <Card className="bg-slate-800 border-slate-700 shadow-xl h-96">
              <CardHeader>
                <CardTitle className="text-xl text-purple-300">User Growth Over Time</CardTitle>
                <CardDescription className="text-slate-400">Placeholder for user registration trend chart.</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center text-slate-500">
                  <BarChart3 size={64} className="mx-auto mb-2 opacity-30" />
                  <p>Chart Component (e.g., Recharts, Chart.js) would be integrated here.</p>
                  <p className="text-xs">(Full functionality requires backend data & charting library)</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={chartCardVariants} initial="initial" animate="animate">
            <Card className="bg-slate-800 border-slate-700 shadow-xl h-96">
              <CardHeader>
                <CardTitle className="text-xl text-purple-300">Daily Active Users (DAU) Trend</CardTitle>
                <CardDescription className="text-slate-400">Placeholder for DAU trend chart.</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center text-slate-500">
                  <TrendingUp size={64} className="mx-auto mb-2 opacity-30" />
                  <p>Chart Component would display DAU trends here.</p>
                  <p className="text-xs">(Full functionality requires backend data & charting library)</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <div className="mt-8 text-center text-sm text-slate-500">
          <p>Note: All data displayed on this admin panel is currently mock data for demonstration purposes.</p>
          <p>Real-time user tracking requires backend integration (e.g., with Supabase).</p>
        </div>
      </main>
       <footer className="py-6 mt-12 text-center text-sm text-slate-400 border-t border-slate-700/50">
        <p>&copy; {new Date().getFullYear()} Finance Tracker Pro - Admin Panel. Built by Hostinger Horizons.</p>
      </footer>
    </div>
  );
};

export default AdminDashboardPage;