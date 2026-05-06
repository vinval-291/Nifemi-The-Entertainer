import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const IMAGES = [
  { id: 1, src: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=80&w=2574&auto=format&fit=crop', aspect: 'portrait' },
  { id: 2, src: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2574&auto=format&fit=crop', aspect: 'square' },
  { id: 3, src: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=2680&auto=format&fit=crop', aspect: 'landscape' },
  { id: 4, src: 'https://images.unsplash.com/photo-1581333100576-b73967322927?q=80&w=2574&auto=format&fit=crop', aspect: 'portrait' },
  { id: 5, src: 'https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=2659&auto=format&fit=crop', aspect: 'tall' },
  { id: 6, src: 'https://images.unsplash.com/photo-1534030347209-467a5bd55b8a?q=80&w=2574&auto=format&fit=crop', aspect: 'landscape' },
  { id: 7, src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2670&auto=format&fit=crop', aspect: 'square' },
  { id: 8, src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2576&auto=format&fit=crop', aspect: 'portrait' },
];

export default function Gallery() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % IMAGES.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + IMAGES.length) % IMAGES.length);
    }
  };

  return (
    <div className="pt-32 pb-24">
      <div className="section-container">
        <header className="mb-20 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-black uppercase mb-8">Visual <span className="text-brand-brown italic font-serif">Diary.</span></h1>
          <p className="text-lg md:text-2xl font-light text-gray-500 leading-relaxed">
            A raw, unfiltered look into my creative process and the moments that inspire my direction. From event captures to brand storytelling assets, this is the visual pulse of my work.
          </p>
        </header>
        
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {IMAGES.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-2xl group cursor-zoom-in"
              onClick={() => setSelectedImageIndex(index)}
            >
              <img 
                src={img.src} 
                alt="Gallery Item" 
                className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <span className="text-white text-xs uppercase tracking-[0.3em] font-bold">Zoom View</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10 cursor-zoom-out"
            onClick={() => setSelectedImageIndex(null)}
          >
            <button 
              className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={() => setSelectedImageIndex(null)}
            >
              <X size={24} />
            </button>

            <button 
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={handlePrev}
            >
              <ChevronLeft size={24} />
            </button>

            <button 
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl max-h-[85vh] flex items-center justify-center"
              onClick={e => e.stopPropagation()}
            >
              <img 
                src={IMAGES[selectedImageIndex].src} 
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                alt="Selected Gallery Item"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
