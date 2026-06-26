import { motion, AnimatePresence } from 'motion/react';
import { Play, X } from 'lucide-react';
import { useState } from 'react';

const VIDEOS = [
  { 
    id: 1, 
    title: 'Probina Nigeria Brand Film', 
    type: 'Corporate Showcase', 
    thumb: 'https://i.postimg.cc/02HvxYyj/probina-1.jpg', 
    embedUrl: 'https://player.vimeo.com/video/1204857332?badge=0&autopause=0&player_id=0&app_id=58479',
    isVertical: false
  },
  { 
    id: 2, 
    title: 'Probina Commercial II', 
    type: 'Campaign', 
    thumb: 'https://i.postimg.cc/7YQ4D3ZZ/probina-2.jpg', 
    embedUrl: 'https://player.vimeo.com/video/1204858017?badge=0&autopause=0&player_id=0&app_id=58479',
    isVertical: true
  },
  { 
    id: 7, 
    title: 'Flux Self Storage', 
    type: 'Corporate Showcase', 
    thumb: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop', 
    embedUrl: 'https://player.vimeo.com/video/1204873351?badge=0&autopause=0&player_id=0&app_id=58479',
    isVertical: false
  },
  { 
    id: 3, 
    title: 'Probina Commercial III', 
    type: 'Promotion', 
    thumb: 'https://i.postimg.cc/28XYmQSC/probina-3.jpg', 
    embedUrl: 'https://player.vimeo.com/video/1204858016?badge=0&autopause=0&player_id=0&app_id=58479',
    isVertical: true
  },
  { 
    id: 4, 
    title: 'Probina Commercial IV', 
    type: 'Product Showcase', 
    thumb: 'https://i.postimg.cc/GhpRZ7dC/probina-5.jpg', 
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
  { 
    id: 8, 
    title: 'Cold Chain Services', 
    type: 'Logistics Motion', 
    thumb: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2670&auto=format&fit=crop', 
    embedUrl: 'https://player.vimeo.com/video/1204873354?badge=0&autopause=0&player_id=0&app_id=58479',
    isVertical: false
  },
];

const NIFEMI_VIDEOS = [
  {
    id: 101,
    title: 'Audacity',
    type: 'Nifemi The Entertainer',
    thumb: 'https://img.youtube.com/vi/cdEIy5yrm0A/hqdefault.jpg',
    embedUrl: 'https://www.youtube.com/embed/cdEIy5yrm0A',
    isVertical: true
  },
  {
    id: 102,
    title: 'Reminiscing',
    type: 'Nifemi The Entertainer',
    thumb: 'https://img.youtube.com/vi/SA_7OI-iKsE/hqdefault.jpg',
    embedUrl: 'https://www.youtube.com/embed/SA_7OI-iKsE',
    isVertical: true
  },
  {
    id: 103,
    title: 'Bring BAck our Little Ones',
    type: 'Nifemi The Entertainer',
    thumb: 'https://img.youtube.com/vi/eg6rAiIk3pc/hqdefault.jpg',
    embedUrl: 'https://www.youtube.com/embed/eg6rAiIk3pc',
    isVertical: true
  },
  {
    id: 104,
    title: 'Energy and Vibes IV',
    type: 'Nifemi The Entertainer',
    thumb: 'https://img.youtube.com/vi/KqYaTdudLYM/hqdefault.jpg',
    embedUrl: 'https://www.youtube.com/embed/KqYaTdudLYM',
    isVertical: true
  },
  {
    id: 105,
    title: 'TTSNTE Pre-Season introduction S3',
    type: 'Nifemi The Entertainer',
    thumb: 'https://img.youtube.com/vi/V4FBD6Ory4E/hqdefault.jpg',
    embedUrl: 'https://www.youtube.com/embed/V4FBD6Ory4E',
    isVertical: false
  },
  {
    id: 106,
    title: 'TTSNTE Pre-Season Short Video 1',
    type: 'Nifemi The Entertainer',
    thumb: 'https://img.youtube.com/vi/MP73eDwLgZs/hqdefault.jpg',
    embedUrl: 'https://www.youtube.com/embed/MP73eDwLgZs',
    isVertical: false
  },
  {
    id: 107,
    title: 'TTSNTE with Mofehintola (TTSNTE S2)',
    type: 'Nifemi The Entertainer',
    thumb: 'https://img.youtube.com/vi/0qHfgqCFx1Y/hqdefault.jpg',
    embedUrl: 'https://www.youtube.com/embed/0qHfgqCFx1Y',
    isVertical: false
  }
];

export default function VideoShowcase() {
  const [selectedVideo, setSelectedVideo] = useState<typeof VIDEOS[0] | typeof NIFEMI_VIDEOS[0] | null>(null);

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

        {/* Divider */}
        <div className="my-24 border-t border-brand-sand/40" />

        {/* Nifemi Section Header */}
        <div className="mb-12">
          <span className="text-[11px] uppercase tracking-[0.3em] font-black text-brand-brown block mb-3 px-2 md:px-0">Spotlight Artist</span>
          <h2 className="text-4xl md:text-6xl font-display font-black uppercase mb-6 px-2 md:px-0">
            Nifemi <span className="text-transparent [-webkit-text-stroke:1px_black]">The Entertainer.</span>
          </h2>
          <p className="text-base md:text-xl font-light text-gray-500 max-w-3xl leading-relaxed px-2 md:px-0">
            Discover a curated collection of energetic performances, stand-up comedy acts, hosting highlight reels, and creative viral shorts by Nifemi The Entertainer.
          </p>
        </div>

        {/* Nifemi Videos Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 [column-fill:balance] px-2 md:px-0">
          {NIFEMI_VIDEOS.map((vid) => (
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
