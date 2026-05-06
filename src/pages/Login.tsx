import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { LogIn, LogOut, User, ShieldCheck } from 'lucide-react';

import { ADMIN_EMAILS, isUserAdmin } from '../constants/admin';

export default function Login() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      if (isUserAdmin(result.user.email)) {
        navigate('/blog');
      }
    } catch (error) {
      console.error('Login failed:', error);
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
      <p>Authenticating...</p>
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

        <div className="bg-brand-beige border border-brand-sand p-10 rounded-3xl shadow-xl">
          {user ? (
            <div className="flex flex-col items-center gap-6">
              <div className="w-20 h-20 rounded-full border-4 border-brand-sand overflow-hidden">
                <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-xl font-display font-black uppercase mb-1">{user.displayName}</h2>
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
                <div className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-4">
                  Insufficient permissions for content management.
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
            <div className="flex flex-col items-center gap-8">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-gray-300">
                <User size={32} />
              </div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
                Please sign in with your authorized Google account.
              </p>
              <button 
                onClick={handleLogin}
                className="btn-primary w-full py-4 flex items-center justify-center gap-3"
              >
                <LogIn size={18} />
                Sign in with Google
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
