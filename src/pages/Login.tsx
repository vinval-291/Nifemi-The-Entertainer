import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { LogIn, LogOut, User, ShieldCheck, Mail, Lock, ChevronRight } from 'lucide-react';
import { isUserAdmin } from '../constants/admin';

export default function Login() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isEmailLogin, setIsEmailLogin] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    setAuthError(null);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      if (isUserAdmin(result.user.email)) {
        navigate('/blog');
      }
    } catch (error: any) {
      console.error('Google login failed:', error);
      setAuthError('Google sign-in failed. Please try again.');
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (isUserAdmin(result.user.email)) {
        navigate('/blog');
      }
    } catch (error: any) {
      console.error('Email login failed:', error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        setAuthError('Invalid email or password.');
      } else {
        setAuthError('Failed to sign in. Please ensure Email/Password is enabled in Firebase.');
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) return (
    <div className="pt-40 pb-24 text-center">
      <p className="animate-pulse">Authenticating...</p>
    </div>
  );

  const isAdmin = isUserAdmin(user?.email);

  return (
    <div className="pt-40 pb-24">
      <div className="section-container max-w-md mx-auto text-center">
        <header className="mb-12">
            <h1 className="text-4xl font-display font-black uppercase mb-4">Admin <span className="text-brand-brown">Access.</span></h1>
            <p className="text-sm text-gray-500 font-light">
              Management portal for curated content.
            </p>
        </header>

        <div className="bg-brand-beige border border-brand-sand p-8 md:p-10 rounded-3xl shadow-xl">
          {user ? (
            <div className="flex flex-col items-center gap-6">
              <div className="w-20 h-20 rounded-full border-4 border-brand-sand overflow-hidden bg-white flex items-center justify-center">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
                ) : (
                  <User size={32} className="text-gray-300" />
                )}
              </div>
              <div>
                <h2 className="text-xl font-display font-black uppercase mb-1">{user.displayName || user.email?.split('@')[0]}</h2>
                <p className="text-xs text-brand-brown font-bold uppercase tracking-widest">{user.email}</p>
              </div>

              {isAdmin ? (
                <div className="flex flex-col gap-4 w-full mt-4">
                  <div className="flex items-center justify-center gap-2 text-green-600 text-xs font-black uppercase tracking-widest bg-green-50 py-3 rounded-xl border border-green-100">
                    <ShieldCheck size={16} /> Admin Verified
                  </div>
                  <button onClick={() => navigate('/blog')} className="btn-primary py-4">
                    Manage Journal
                  </button>
                </div>
              ) : (
                <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                  <p className="text-red-500 text-[10px] font-black uppercase tracking-widest leading-relaxed">
                    Insufficient permissions. Your account is not in the admin registry.
                  </p>
                </div>
              )}

              <button 
                onClick={handleLogout}
                className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-gray-400 hover:text-black transition-colors"
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                {!isEmailLogin ? (
                  <motion.div 
                    key="social"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col items-center gap-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-gray-300">
                      <User size={32} />
                    </div>
                    
                    <button 
                      onClick={handleGoogleLogin}
                      className="btn-primary w-full py-4 flex items-center justify-center gap-3"
                    >
                      <LogIn size={18} />
                      Sign in with Google
                    </button>

                    <div className="w-full flex items-center gap-4">
                      <div className="flex-grow h-[1px] bg-brand-sand"></div>
                      <span className="text-[10px] font-black uppercase text-gray-400">or</span>
                      <div className="flex-grow h-[1px] bg-brand-sand"></div>
                    </div>

                    <button 
                      onClick={() => setIsEmailLogin(true)}
                      className="w-full py-4 border border-brand-sand rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2"
                    >
                      <Mail size={14} />
                      Use Email & Password
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="email"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    onSubmit={handleEmailLogin}
                    className="space-y-4 text-left"
                  >
                    <button 
                      type="button"
                      onClick={() => setIsEmailLogin(false)}
                      className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 hover:text-black flex items-center gap-1"
                    >
                      <ChevronRight size={14} className="rotate-180" /> Back
                    </button>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input 
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-white border border-brand-sand rounded-xl pl-12 pr-4 py-4 outline-none focus:border-black transition-colors"
                          placeholder="admin@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input 
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-white border border-brand-sand rounded-xl pl-12 pr-4 py-4 outline-none focus:border-black transition-colors"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>

                    {authError && (
                      <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest text-center py-2">
                        {authError}
                      </p>
                    )}

                    <button 
                      type="submit"
                      className="btn-primary w-full py-4 mt-4"
                    >
                      Sign In
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
