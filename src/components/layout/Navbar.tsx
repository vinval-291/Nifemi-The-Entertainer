import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, LayoutDashboard } from 'lucide-react';
import { useState, useEffect } from 'react';
import { auth } from '../../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { isUserAdmin } from '../../constants/admin';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdmin(isUserAdmin(user?.email));
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Services', path: '/services' },
    { 
      name: 'Gallery', 
      path: '/gallery',
      subItems: [
        { name: 'Photos', path: '/gallery' },
        { name: 'Videos', path: '/videos' }
      ]
    },
    { name: 'Journal', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState<string | null>(null);

  const toggleMobileSubMenu = (name: string) => {
    setMobileSubMenuOpen(mobileSubMenuOpen === name ? null : name);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-brand-white/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link to="/" className="text-2xl font-display font-black tracking-tighter hover:opacity-80 transition-opacity">
          NTE<span className="text-brand-brown">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <div 
              key={link.name} 
              className="relative group"
              onMouseEnter={() => link.subItems && setActiveSubMenu(link.name)}
              onMouseLeave={() => setActiveSubMenu(null)}
            >
              {link.subItems ? (
                <div className="flex items-center gap-1 cursor-pointer">
                  <span className="nav-link">{link.name}</span>
                  <div className={`w-4 h-4 transition-transform duration-300 ${activeSubMenu === link.name ? 'rotate-180' : ''}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                  
                  {/* Submenu */}
                  <AnimatePresence>
                    {activeSubMenu === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-4 w-48 bg-brand-white shadow-xl rounded-xl border border-brand-sand overflow-hidden"
                      >
                        <div className="flex flex-col py-3">
                          {link.subItems.map((sub) => (
                            <Link 
                              key={sub.name} 
                              to={sub.path} 
                              className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-brand-sand hover:text-brand-brown transition-colors"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link to={link.path} className="nav-link">
                  {link.name}
                </Link>
              )}
            </div>
          ))}
          {isAdmin && (
            <Link to="/admin/dashboard" className="p-2 bg-brand-brown text-white rounded-full hover:scale-110 transition-all shadow-md group" title="Dashboard">
              <LayoutDashboard size={14} />
            </Link>
          )}
          <a href="https://wa.me/2348137790608" target="_blank" rel="noreferrer" className="btn-primary py-2 px-6 text-[10px]">
            Work With Me
          </a>
        </div>

        {/* Mobile Nav Toggle */}
        <button className="lg:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-brand-white border-t border-brand-sand shadow-xl lg:hidden flex flex-col p-8 gap-6 max-h-[80vh] overflow-y-auto"
          >
            {navLinks.map((link) => (
              <div key={link.name} className="flex flex-col gap-4">
                {link.subItems ? (
                  <>
                    <button 
                      className="flex items-center justify-between w-full text-left"
                      onClick={() => toggleMobileSubMenu(link.name)}
                    >
                      <span className={`text-xl font-display font-black uppercase tracking-tight ${mobileSubMenuOpen === link.name ? 'text-brand-brown' : 'text-gray-400'}`}>
                        {link.name}
                      </span>
                      <div className={`w-5 h-5 transition-transform duration-300 ${mobileSubMenuOpen === link.name ? 'rotate-180' : ''}`}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </div>
                    </button>
                    <AnimatePresence>
                      {mobileSubMenuOpen === link.name && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-4 pl-4 border-l-2 border-brand-sand py-2">
                            {link.subItems.map((sub) => (
                              <Link
                                key={sub.name}
                                to={sub.path}
                                className="text-lg font-display font-medium tracking-tight hover:text-brand-brown transition-colors"
                                onClick={() => setIsOpen(false)}
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    to={link.path}
                    className="text-xl font-display font-medium tracking-tight hover:text-brand-brown transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            <a href="https://wa.me/2348137790608" target="_blank" rel="noreferrer" className="btn-primary w-full text-center" onClick={() => setIsOpen(false)}>
              Work With Me
            </a>

            {isAdmin && (
              <Link 
                to="/admin/dashboard" 
                className="flex items-center justify-center gap-3 w-full py-4 bg-brand-brown text-white rounded-full text-[10px] font-black uppercase tracking-widest"
                onClick={() => setIsOpen(false)}
              >
                <LayoutDashboard size={14} />
                Admin Dashboard
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
