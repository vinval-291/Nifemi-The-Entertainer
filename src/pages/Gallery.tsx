import { motion } from 'motion/react';

const IMAGES = [
  { id: 1, src: 'https://picsum.photos/seed/g1/800/1200', aspect: 'portrait' },
  { id: 2, src: 'https://picsum.photos/seed/g2/800/800', aspect: 'square' },
  { id: 3, src: 'https://picsum.photos/seed/g3/1200/800', aspect: 'landscape' },
  { id: 4, src: 'https://picsum.photos/seed/g4/800/1200', aspect: 'portrait' },
  { id: 5, src: 'https://picsum.photos/seed/g5/800/1000', aspect: 'tall' },
  { id: 6, src: 'https://picsum.photos/seed/g6/1200/800', aspect: 'landscape' },
  { id: 7, src: 'https://picsum.photos/seed/g7/800/800', aspect: 'square' },
  { id: 8, src: 'https://picsum.photos/seed/g8/800/1200', aspect: 'portrait' },
];

export default function Gallery() {
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
          {IMAGES.map((img) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-2xl group cursor-zoom-in"
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
    </div>
  );
}
