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
  Layout,
  Inbox,
  Trash2,
  Mail,
  ExternalLink,
  MessageSquare,
  BookOpen,
  Plus,
  Edit2
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
import { contactService, ContactInquiry } from '../services/contactService';
import { blogService } from '../services/blogService';
import { BlogPost } from '../constants/blog';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { isUserAdmin } from '../constants/admin';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [authChecking, setAuthChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [totalVisitorCount, setTotalVisitorCount] = useState(0);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [timeRange, setTimeRange] = useState(7);
  const [activeTab, setActiveTab] = useState<'analytics' | 'inquiries' | 'journals'>('analytics');
  const navigate = useNavigate();

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void | Promise<void>;
    confirmText?: string;
    cancelText?: string;
    isDestructive?: boolean;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    isDestructive: false
  });

  const [alertState, setAlertState] = useState<{
    isOpen: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    isOpen: false,
    message: '',
    type: 'success'
  });

  const showAlert = (message: string, type: 'success' | 'error' = 'success') => {
    setAlertState({ isOpen: true, message, type });
    setTimeout(() => {
      setAlertState(prev => ({ ...prev, isOpen: false }));
    }, 4000);
  };

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [data, total, inqs, allPosts] = await Promise.all([
        analyticsService.getRecentStats(timeRange),
        analyticsService.getTotalVisitorsCount(),
        contactService.getAllInquiries(),
        blogService.getAllPosts()
      ]);
      setEvents(data);
      setTotalVisitorCount(total);
      setInquiries(inqs);
      setPosts(allPosts);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && isUserAdmin(user.email)) {
        setIsAdmin(true);
        setAuthChecking(false);
      } else {
        navigate('/admin/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchStats();
    }
  }, [isAdmin, timeRange]);

  const handleDeleteInquiry = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Inquiry',
      message: 'Are you sure you want to delete this contact inquiry? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      isDestructive: true,
      onConfirm: async () => {
        try {
          await contactService.deleteInquiry(id);
          setInquiries(prev => prev.filter(inq => inq.id !== id));
          showAlert('Inquiry deleted successfully.', 'success');
        } catch (error) {
          console.error('Failed to delete inquiry:', error);
          showAlert('Failed to delete contact inquiry.', 'error');
        }
      }
    });
  };

  const handleDeletePost = (id: string | number) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Journal Post',
      message: 'Are you sure you want to delete this journal post? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      isDestructive: true,
      onConfirm: async () => {
        try {
          await blogService.deletePost(id);
          setPosts(prev => prev.filter(post => post.id !== id));
          showAlert('Journal post deleted successfully.', 'success');
        } catch (error) {
          console.error('Failed to delete post:', error);
          showAlert('Failed to delete the post.', 'error');
        }
      }
    });
  };

  const handleResetAnalytics = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Reset Analytics',
      message: 'Are you sure you want to reset all tracking statistics to zero? This action will permanently delete all logs of page views and user sessions.',
      confirmText: 'Reset Stats',
      cancelText: 'Cancel',
      isDestructive: true,
      onConfirm: async () => {
        setLoading(true);
        try {
          await analyticsService.clearAnalytics();
          setEvents([]);
          setTotalVisitorCount(0);
          showAlert('Analytics statistics have been successfully reset to zero.', 'success');
        } catch (error) {
          console.error('Failed to reset analytics:', error);
          showAlert('Failed to reset analytics. Please try again.', 'error');
        } finally {
          setLoading(false);
        }
      }
    });
  };

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

  if (authChecking || loading) return (
    <div className="pt-40 pb-24 text-center">
      <div className="animate-pulse inline-block bg-brand-sand/20 px-6 py-2 rounded-full text-brand-brown text-xs font-black uppercase tracking-widest">
        {authChecking ? "Checking Authentication..." : "Loading Dashboard..."}
      </div>
    </div>
  );

  return (
    <div className="pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto rounded-3xl">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-brown/60 mb-2 block">
            Dashboard
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-black uppercase leading-none">
            App <span className="text-brand-brown">Dashboard</span>.
          </h1>
        </div>

        {activeTab === 'analytics' && (
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex bg-brand-beige p-1 rounded-full border border-brand-sand">
              {[7, 30, 90].map((days) => (
                <button
                  key={days}
                  onClick={() => setTimeRange(days)}
                  className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-full transition-all cursor-pointer ${
                    timeRange === days 
                      ? 'bg-brand-brown text-white shadow-lg' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {days} Days
                </button>
              ))}
            </div>

            <button
              onClick={handleResetAnalytics}
              className="px-6 py-3 border border-red-200 hover:bg-red-50 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-full transition-all cursor-pointer flex items-center gap-2"
              title="Reset All Stats to Zero"
            >
              <Trash2 size={12} />
              Reset Stats
            </button>
          </div>
        )}
      </header>

      {/* Elegant minimalist tabs switcher */}
      <div className="flex border-b border-brand-sand gap-10 mb-12">
        <button 
          onClick={() => setActiveTab('analytics')}
          className={`pb-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all cursor-pointer ${
            activeTab === 'analytics' ? 'border-brand-brown text-brand-brown' : 'border-transparent text-gray-400 hover:text-black'
          }`}
        >
          Analytics Overview
        </button>
        <button 
          onClick={() => setActiveTab('inquiries')}
          className={`pb-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'inquiries' ? 'border-brand-brown text-brand-brown' : 'border-transparent text-gray-400 hover:text-black'
          }`}
        >
          Inquiries Inbox {inquiries.length > 0 && (
            <span className="bg-brand-brown text-white text-[9px] px-2 py-0.5 rounded-full font-bold ml-1">{inquiries.length}</span>
          )}
        </button>
        <button 
          onClick={() => setActiveTab('journals')}
          className={`pb-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'journals' ? 'border-brand-brown text-brand-brown' : 'border-transparent text-gray-400 hover:text-black'
          }`}
        >
          Manage Journal {posts.length > 0 && (
            <span className="bg-brand-brown text-white text-[9px] px-2 py-0.5 rounded-full font-bold ml-1">{posts.length}</span>
          )}
        </button>
      </div>

      {activeTab === 'analytics' && (
        <>
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
        </>
      )}

      {activeTab === 'inquiries' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <Inbox size={16} /> Inquiries Inbox ({inquiries.length})
            </h3>
          </div>
          
          {inquiries.length === 0 ? (
            <div className="text-center bg-white border border-brand-sand rounded-3xl p-16 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-brand-beige text-brand-brown flex items-center justify-center mx-auto mb-6">
                <Inbox size={24} />
              </div>
              <h3 className="text-2xl font-black uppercase mb-4 text-brand-brown">Inbox Empty</h3>
              <p className="text-gray-500 max-w-sm mx-auto font-light text-sm">
                No custom inquiries received yet. Once visitors submit the contact form, they will appear here in real time.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {inquiries.map((inq) => (
                <div 
                  key={inq.id} 
                  className="bg-white border border-brand-sand rounded-3xl p-8 shadow-sm relative group hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Name, date and delete button */}
                    <div className="flex justify-between items-start gap-4 mb-6">
                      <div>
                        <h4 className="text-lg font-black uppercase tracking-tight text-black">{inq.fullName}</h4>
                        <div className="flex items-center gap-2 text-gray-500 text-xs font-light mt-1">
                          <Mail size={12} className="text-brand-brown/60 flex-shrink-0" />
                          <a href={`mailto:${inq.email}`} className="hover:text-brand-brown hover:underline break-all">
                            {inq.email}
                          </a>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDeleteInquiry(inq.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-all cursor-pointer opacity-85 hover:opacity-100 flex-shrink-0"
                        title="Delete Inquiry"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Tag of project type */}
                    <div className="mb-6">
                      <span className="text-[9px] font-black uppercase tracking-widest bg-brand-beige border border-brand-sand px-3 py-1.5 rounded-full text-brand-brown inline-block">
                        {inq.projectType}
                      </span>
                    </div>

                    {/* Inquiry Message content */}
                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap italic font-serif">
                      "{inq.message}"
                    </p>
                  </div>

                  <div className="border-t border-brand-sand/60 mt-8 pt-4 flex justify-between items-center text-[10px] font-mono text-gray-400">
                    <div>
                      ID: <span className="opacity-75">{inq.id.substring(0, 8)}...</span>
                    </div>
                    <div>
                      {inq.createdAt ? new Date(inq.createdAt).toLocaleString(undefined, { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : 'N/A'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'journals' && (
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
            <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <BookOpen size={16} /> Journal Entries ({posts.length})
            </h3>
            <Link 
              to="/admin/blog/new" 
              className="inline-flex items-center justify-center gap-2 bg-brand-brown text-white hover:bg-black transition-colors px-5 py-3 rounded-full text-[10px] font-black uppercase tracking-widest"
            >
              <Plus size={14} /> New Journal Entry
            </Link>
          </div>

          {posts.length === 0 ? (
            <div className="text-center bg-white border border-brand-sand rounded-3xl p-16 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-brand-beige text-brand-brown flex items-center justify-center mx-auto mb-6">
                <BookOpen size={24} />
              </div>
              <h3 className="text-2xl font-black uppercase mb-4 text-brand-brown">No Entries</h3>
              <p className="text-gray-500 max-w-sm mx-auto font-light text-sm mb-6">
                No journal posts created yet. Get started by writing a new one.
              </p>
              <Link 
                to="/admin/blog/new" 
                className="inline-flex items-center justify-center gap-2 bg-brand-brown text-white hover:bg-black transition-colors px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest"
              >
                <Plus size={14} /> Create first post
              </Link>
            </div>
          ) : (
            <div className="bg-white border border-brand-sand rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-brand-sand bg-brand-beige/50">
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Post Details</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Categories</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-sand/60">
                    {posts.map((post) => {
                      const isStatic = !isNaN(Number(post.id));
                      return (
                        <tr key={post.id} className="hover:bg-brand-beige/20 transition-colors">
                          <td className="p-6">
                            <div className="flex items-center gap-4">
                              <img 
                                src={post.image} 
                                alt={post.title} 
                                className="w-14 h-10 object-cover rounded-lg flex-shrink-0 bg-brand-sand border border-brand-sand"
                                referrerPolicy="no-referrer"
                              />
                              <div>
                                <h4 className="text-sm font-black uppercase tracking-tight text-black line-clamp-1">
                                  {post.title}
                                </h4>
                                <span className="text-[10px] text-gray-400 font-mono block mt-1">
                                  {post.date} &bull; Slug: {post.slug}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="p-6">
                            <div className="flex flex-wrap gap-1.5">
                              {post.categories.map((cat, idx) => (
                                <span key={idx} className="px-2.5 py-1 bg-brand-sand/60 text-[8px] font-black uppercase tracking-widest text-brand-brown rounded-full">
                                  {cat}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-6">
                            <span className={`px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                              post.status === 'draft' 
                                ? 'bg-gray-100 text-gray-500 border border-gray-200' 
                                : 'bg-green-50 text-green-600 border border-green-200'
                            }`}>
                              {post.status || 'Published'}
                            </span>
                          </td>
                          <td className="p-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                to={`/admin/blog/edit/${post.id}`}
                                className="p-2 text-brand-brown hover:bg-brand-beige rounded-xl transition-all cursor-pointer inline-flex items-center justify-center border border-brand-sand/30"
                                title="Edit Journal Entry"
                              >
                                <Edit2 size={14} />
                              </Link>
                              
                              <button
                                onClick={() => handleDeletePost(post.id)}
                                className="p-2 rounded-xl transition-all inline-flex items-center justify-center border text-red-500 hover:bg-red-50 border-red-100 cursor-pointer"
                                title="Delete Journal Entry"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Custom Alert/Success Banner toast */}
      {alertState.isOpen && (
        <div id="analytics-alert" className="fixed bottom-6 left-6 z-50">
          <div className={`px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 border bg-white text-black animate-bounce ${
            alertState.type === 'success' 
              ? 'border-green-100' 
              : 'border-red-100'
          }`}>
            <div className={`w-2.5 h-2.5 rounded-full ${alertState.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
            <p className="text-[11px] uppercase tracking-wider font-black">{alertState.message}</p>
          </div>
        </div>
      )}

      {/* Custom Dialog/Confirmation Modal */}
      {confirmModal.isOpen && (
        <div id="analytics-confirm-modal" className="fixed inset-0 bg-black/45 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-brand-sand max-w-md w-full p-8 shadow-2xl relative">
            <h3 className="font-display font-black text-lg uppercase tracking-tight text-black mb-4">
              {confirmModal.title}
            </h3>
            <p className="text-xs text-gray-600 font-light leading-relaxed mb-8">
              {confirmModal.message}
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                id="analytics-confirm-cancel"
                onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                className="px-6 py-3 rounded-full border border-brand-sand hover:bg-brand-beige text-[10px] font-black uppercase tracking-widest text-gray-500 transition-colors cursor-pointer"
              >
                {confirmModal.cancelText || 'Cancel'}
              </button>
              <button
                id="analytics-confirm-action"
                onClick={async () => {
                  const onConfirmAction = confirmModal.onConfirm;
                  setConfirmModal(prev => ({ ...prev, isOpen: false }));
                  await onConfirmAction();
                }}
                className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest text-white transition-all cursor-pointer ${
                  confirmModal.isDestructive 
                    ? 'bg-red-500 hover:bg-red-600 shadow-red-100 shadow-lg' 
                    : 'bg-brand-brown hover:bg-black shadow-brand-sand/50 shadow-lg'
                }`}
              >
                {confirmModal.confirmText || 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
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
