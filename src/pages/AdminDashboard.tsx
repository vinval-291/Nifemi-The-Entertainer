import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  BarChart3, 
  MousePointer2, 
  Eye,
  Calendar,
  ChevronRight,
  TrendingUp,
  Layout
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as ReTooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { analyticsService, AnalyticsEvent } from '../services/analyticsService';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { isUserAdmin } from '../constants/admin';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [totalVisitorCount, setTotalVisitorCount] = useState(0);
  const [timeRange, setTimeRange] = useState(7);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!isUserAdmin(user?.email)) {
        navigate('/admin/login');
      }
    });

    const fetchStats = async () => {
      setLoading(true);
      const [data, total] = await Promise.all([
        analyticsService.getRecentStats(timeRange),
        analyticsService.getTotalVisitorsCount()
      ]);
      setEvents(data);
      setTotalVisitorCount(total);
      setLoading(false);
    };

    fetchStats();
    return () => unsubscribe();
  }, [timeRange, navigate]);

  const stats = {
    totalViews: events.length,
    uniqueVisitors: new Set(events.map(e => e.visitorId)).size,
    avgViewsPerVisitor: events.length > 0 ? (events.length / new Set(events.map(e => e.visitorId)).size).toFixed(1) : 0,
  };

  // Get daily views for chart
  const getDailyViews = () => {
    const days: { [key: string]: number } = {};
    const now = new Date();
    
    // Initialize days
    for (let i = 0; i < timeRange; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        days[date.toISOString().split('T')[0]] = 0;
    }

    events.forEach(event => {
      const dateStr = event.timestamp?.toDate?.()?.toISOString().split('T')[0] || 
                      new Date(event.timestamp).toISOString().split('T')[0];
      if (days[dateStr] !== undefined) {
        days[dateStr]++;
      }
    });

    return Object.keys(days).reverse().map(date => ({
      date: date.split('-').slice(1).join('/'),
      views: days[date]
    }));
  };

  const getPageBreakdown = () => {
    const pages: { [key: string]: number } = {};
    events.forEach(event => {
      pages[event.path] = (pages[event.path] || 0) + 1;
    });
    return Object.entries(pages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };

  const pageData = getPageBreakdown();
  const chartData = getDailyViews();

  if (loading) return (
    <div className="pt-40 pb-24 text-center">
      <div className="animate-pulse inline-block bg-brand-sand/20 px-6 py-2 rounded-full text-brand-brown text-xs font-black uppercase tracking-widest">
        Loading Analytics...
      </div>
    </div>
  );

  return (
    <div className="pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-brown/60 mb-2 block">
            Dashboard
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-black uppercase leading-none">
            App <span className="text-brand-brown">Analytics</span>.
          </h1>
        </div>

        <div className="flex bg-brand-beige p-1 rounded-full border border-brand-sand">
          {[7, 30, 90].map((days) => (
            <button
              key={days}
              onClick={() => setTimeRange(days)}
              className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-full transition-all ${
                timeRange === days 
                  ? 'bg-brand-brown text-white shadow-lg' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {days} Days
            </button>
          ))}
        </div>
      </header>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard 
          icon={<Eye size={20} />} 
          label="Total Page Views" 
          value={stats.totalViews} 
          trend="+12%" 
        />
        <StatCard 
          icon={<Users size={20} />} 
          label="Unique Visitors" 
          value={stats.uniqueVisitors} 
          trend="+5%" 
        />
        <StatCard 
          icon={<MousePointer2 size={20} />} 
          label="Avg. Engagement" 
          value={`${stats.avgViewsPerVisitor}`} 
          subLabel="Views per visitor" 
        />
        <StatCard 
          icon={<Users size={20} />} 
          label="Lifetime Visitors" 
          value={totalVisitorCount} 
          subLabel="Since tracking began" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white border border-brand-sand p-8 rounded-3xl shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <BarChart3 size={16} /> Traffic Overview
            </h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4A3F35" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4A3F35" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0EBE6" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#A39689' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#A39689' }}
                />
                <ReTooltip 
                  contentStyle={{ 
                    backgroundColor: '#1C1917', 
                    border: 'none', 
                    borderRadius: '12px',
                    color: '#fff',
                    padding: '8px 12px'
                  }}
                  itemStyle={{ color: '#fff', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase' }}
                  labelStyle={{ display: 'none' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#4A3F35" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorViews)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-brand-beige border border-brand-sand p-8 rounded-3xl">
          <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2 mb-8">
            <Layout size={16} /> Top Destinations
          </h3>
          <div className="space-y-6">
            {pageData.map(([path, count], index) => (
              <div key={path} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black text-brand-brown/40 w-4">0{index + 1}</span>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest group-hover:text-brand-brown transition-colors">
                      {path === '/' ? '/home' : path}
                    </p>
                    <div className="w-32 h-1 bg-brand-sand/50 rounded-full mt-1 overflow-hidden">
                      <div 
                        className="h-full bg-brand-brown/30" 
                        style={{ width: `${(count / stats.totalViews) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-black bg-white px-3 py-1 rounded-full border border-brand-sand">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, trend, subLabel, status }: any) {
  return (
    <div className="bg-white border border-brand-sand p-8 rounded-3xl shadow-sm hover:shadow-md transition-all group">
      <div className="flex items-start justify-between mb-6">
        <div className="p-3 bg-brand-beige rounded-2xl text-brand-brown group-hover:scale-110 transition-transform">
          {icon}
        </div>
        {trend && (
          <span className="text-[8px] font-black text-green-500 bg-green-50 px-2 py-1 rounded-full uppercase">
            {trend}
          </span>
        )}
        {status === 'online' && (
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
        )}
      </div>
      <div>
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-brown/40 mb-1">{label}</h4>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-display font-black uppercase leading-none">{value}</span>
          {subLabel && <span className="text-[8px] font-black text-gray-400 uppercase">{subLabel}</span>}
        </div>
      </div>
    </div>
  );
}
