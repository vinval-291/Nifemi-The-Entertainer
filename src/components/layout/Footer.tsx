import { motion } from 'motion/react';
import { Mail, Instagram, Twitter, Linkedin, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-beige border-t border-brand-sand">
      <div className="section-container pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="lg:col-span-2">
            <h2 className="text-4xl font-display font-black leading-tight mb-6">
              LETS BUILD <br /> YOUR <span className="text-brand-brown italic">LEGACY</span>.
            </h2>
            <p className="text-gray-500 max-w-md mb-8">
              Available for PR strategy, creative direction, and campaign consulting worldwide.
              Based in Lagos, working globally as Nifemi the Entertainer.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Instagram size={20} />} href="#" />
              <SocialIcon icon={<Twitter size={20} />} href="#" />
              <SocialIcon icon={<Linkedin size={20} />} href="https://linkedin.com/in/nifemi-ajisefinni" />
              <SocialIcon icon={<Mail size={20} />} href="mailto:hello@nte-global.com" />
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-8">Navigation</h4>
            <ul className="flex flex-col gap-4">
              <li><Link to="/about" className="text-sm hover:text-brand-brown transition-colors">Biography</Link></li>
              <li><Link to="/portfolio" className="text-sm hover:text-brand-brown transition-colors">The Portfolio</Link></li>
              <li><Link to="/services" className="text-sm hover:text-brand-brown transition-colors">Offerings</Link></li>
              <li><Link to="/blog" className="text-sm hover:text-brand-brown transition-colors">The Journal</Link></li>
              <li><Link to="/admin/login" className="text-[10px] uppercase font-bold text-gray-300 hover:text-brand-brown transition-colors">Admin Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-8">Contact</h4>
            <ul className="flex flex-col gap-4">
              <li className="text-sm">hello@nte-global.com</li>
              <li className="text-sm">+234 813 779 0608</li>
              <li className="flex items-center gap-2 group cursor-pointer">
                <a href="https://wa.me/2348137790608" target="_blank" rel="noreferrer" className="text-sm flex items-center gap-2">
                  WhatsApp Chat
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-brand-sand flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2 items-center md:items-start">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">© {currentYear} NTE GLOBAL. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6 text-[9px] uppercase tracking-widest text-gray-400 font-medium">
              <button className="hover:text-black">Privacy Policy</button>
              <button className="hover:text-black">Terms of Service</button>
            </div>
          </div>

          <a 
            href="https://linkedin.com/in/kuteyi-oluwaloye-vincent" 
            target="_blank" 
            rel="noreferrer" 
            className="group flex flex-col items-center md:items-end gap-1"
          >
            <span className="text-[8px] uppercase tracking-[0.3em] font-black text-gray-400">Website developed by</span>
            <span className="text-2xl font-serif italic text-black lowercase tracking-tight group-hover:text-brand-brown transition-colors">
              Kuteyi Vincent.
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon, href }: { icon: ReactNode; href: string }) {
  return (
    <a
      href={href}
      className="w-12 h-12 rounded-full border border-brand-sand flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
    >
      {icon}
    </a>
  );
}
