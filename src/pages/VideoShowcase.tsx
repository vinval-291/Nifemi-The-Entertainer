import { motion, AnimatePresence } from 'motion/react';
import { Play, X } from 'lucide-react';
import { useState } from 'react';

const VIDEOS = [
  { 
    id: 1, 
    title: 'Probina Nigeria Brand Film', 
    type: 'Corporate Showcase', 
    thumb: 'https://i.postimg.cc/3rcrrFdV/probia-1.jpg', 
    embedUrl: 'https://player.vimeo.com/video/1204857332?badge=0&autopause=0&player_id=0&app_id=58479',
    isVertical: false
  },
  { 
    id: 2, 
    title: 'Probina Commercial II', 
    type: 'Campaign', 
    thumb: 'https://i.postimg.cc/tRMRRNYf/probia-2.jpg', 
    embedUrl: 'https://player.vimeo.com/video/1204858017?badge=0&autopause=0&player_id=0&app_id=58479',
    isVertical: true
  },
  { 
    id: 3, 
    title: 'Probina Commercial III', 
    type: 'Promotion', 
    thumb: 'https://i.postimg.cc/ZYMYYxCQ/probia-3.jpg', 
    embedUrl: 'https://player.vimeo.com/video/1204858016?badge=0&autopause=0&player_id=0&app_id=58479',
    isVertical: true
  },
  { 
    id: 4, 
    title: 'Probina Commercial IV', 
    type: 'Product Showcase', 
    thumb: 'https://i.postimg.cc/RCDCCLNp/probia-4.jpg', 
    embedUrl: 'https://player.vimeo.com/video/1204858015?badge=0&autopause=0&player_id=0&app_id=58479',
    isVertical: true
  },
  { 
    id: 5, 
    title: 'Golden Tulip brand commercial', 
    type: 'Luxury Hospitality', 
    thumb: 'https://i.postimg.cc/yxBmDCfp/golden-tulip.jpg', 
    embedUrl: 'https://player.vimeo.com/video/1204859103?badge=0&autopause=0&player_id=0&app_id=58479',
    isVertical: true
  },
  { 
    id: 6, 
    title: 'College of Health & Science Technology', 
    type: 'Educational Showcase', 
    thumb: 'https://i.postimg.cc/sfYFqP52/College-of-Heath-and-Science-Technology.jpg', 
    embedUrl: 'https://player.vimeo.com/video/1204859102?badge=0&autopause=0&player_id=0&app_id=58479',
    isVertical: false
  },
];

export default function VideoShowcase() {
  const [selectedVideo, setSelectedVideo] = useState<typeof VIDEOS[0] | null>(null);

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24">
      <div className="section-container">
        <h1 className="text-4xl md:text-7xl font-black uppercase mb-12 md:mb-20 px-2 md:px-0">
          Motion <span className="text-transparent [-webkit-text-stroke:1px_black]">Selection.</span>
        </h1>
        
        {/* Creative Masonry Grid to support mixed portrait (9:16) and landscape (16:9) ratios beautifully */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 [column-fill:balance] px-2 md:px-0">
          {VIDEOS.map((vid) => (
            <motion.div
              key={vid.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="break-inside-avoid mb-8 group cursor-pointer block"
              onClick={() => setSelectedVideo(vid)}
            >
              <div className={`relative rounded-2xl md:rounded-3xl overflow-hidden mb-4 md:mb-6 bg-black shadow-lg transition-all duration-500 ring-1 ring-black/5
                ${vid.isVertical ? 'aspect-[9/16]' : 'aspect-video'}`}
              >
                 <img 
                   src={vid.thumb} 
                   alt={vid.title} 
                   className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                   referrerPolicy="no-referrer"
                 />
                 <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform shadow-xl border border-white/30">
                       <Play fill="white" size={28} className="md:w-8 md:h-8" />
                    </div>
                 </div>
              </div>
              <div className="px-2">
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-brand-brown font-bold mb-1 md:mb-2 block">{vid.type}</span>
                <h3 className="text-xl md:text-2xl font-display font-black uppercase leading-tight group-hover:text-brand-brown transition-colors">{vid.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/98 p-4 md:p-10"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`relative w-full shadow-2xl ring-1 ring-white/10 overflow-hidden bg-black
                ${selectedVideo.isVertical 
                  ? 'max-w-[380px] md:max-w-[420px] aspect-[9/16] rounded-3xl' 
                  : 'max-w-5xl aspect-video rounded-xl md:rounded-3xl'
                }`}
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 md:bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10 backdrop-blur-md"
              >
                <X size={20} className="md:w-6 md:h-6" />
              </button>
              
              <iframe 
                src={selectedVideo.embedUrl} 
                className="w-full h-full border-0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
