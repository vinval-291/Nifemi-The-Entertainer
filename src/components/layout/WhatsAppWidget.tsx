import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send } from 'lucide-react';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const WHATSAPP_NUMBER = '2348104692461';
  const WHATSAPP_ICON = 'https://cdn-icons-png.flaticon.com/512/15707/15707820.png';

  const handleStartChat = (e: FormEvent) => {
    e.preventDefault();
    const defaultText = message.trim() || 'Hello Nifemi, I would like to inquire about your PR and creative direction services.';
    const encodedText = encodeURIComponent(defaultText);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setMessage('');
    setIsOpen(false);
  };

  return (
    <div id="whatsapp-widget-container" className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="whatsapp-chat-box"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mb-4 w-80 sm:w-96 bg-white rounded-3xl border border-brand-sand shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div id="whatsapp-header" className="bg-brand-brown text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-brand-beige border border-white/20 overflow-hidden flex items-center justify-center flex-shrink-0">
                  <span className="text-brand-brown font-display font-black text-sm uppercase">N</span>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-brand-brown"></span>
                </div>
                <div>
                  <h4 className="font-display font-black text-[11px] uppercase tracking-wider leading-none">Nifemi The Entertainer</h4>
                  <span className="text-[9px] text-white/75 font-mono tracking-widest uppercase">PR & Creative Expert</span>
                </div>
              </div>
              <button
                id="whatsapp-close-btn"
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white hover:bg-white/15 p-1.5 rounded-full transition-all cursor-pointer"
                title="Close chat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat Body */}
            <div id="whatsapp-body" className="p-6 bg-brand-beige/30 flex-1 space-y-4 max-h-60 overflow-y-auto">
              <div className="bg-white border border-brand-sand/40 p-4 rounded-2xl rounded-tl-none shadow-sm max-w-[85%]">
                <p className="text-xs text-gray-700 leading-relaxed font-light">
                  Hello! 👋 I'm Nifemi The Entertainer. How can I help elevate your brand or work with you today?
                </p>
                <span className="text-[8px] text-gray-400 font-mono block mt-1 text-right">Just now</span>
              </div>
            </div>

            {/* Form */}
            <form id="whatsapp-form" onSubmit={handleStartChat} className="p-4 border-t border-brand-sand bg-white flex gap-2 items-center">
              <input
                id="whatsapp-message-input"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="flex-1 bg-brand-beige/40 border border-brand-sand/60 rounded-full px-4 py-3 text-xs outline-none focus:border-brand-brown transition-colors placeholder:text-gray-400 font-light"
              />
              <button
                id="whatsapp-send-btn"
                type="submit"
                className="w-10 h-10 rounded-full bg-brand-brown hover:bg-black text-white flex items-center justify-center transition-colors flex-shrink-0 cursor-pointer"
                title="Send message on WhatsApp"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        id="whatsapp-floating-btn"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-16 h-16 rounded-full bg-white border border-brand-sand shadow-lg flex items-center justify-center cursor-pointer relative overflow-hidden group hover:shadow-xl transition-all"
        title="Chat with Nifemi on WhatsApp"
      >
        <span className="absolute inset-0 bg-brand-beige/20 scale-0 group-hover:scale-100 transition-transform rounded-full"></span>
        <img
          src={WHATSAPP_ICON}
          alt="WhatsApp Chat"
          className="w-10 h-10 object-contain relative z-10"
          referrerPolicy="no-referrer"
        />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-brown opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-brown border-2 border-white"></span>
        </span>
      </motion.button>
    </div>
  );
}
