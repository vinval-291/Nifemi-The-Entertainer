import { motion, AnimatePresence } from 'motion/react';
import { Play, X } from 'lucide-react';
import { useState } from 'react';

const VIDEOS = [
  { 
    id: 5, 
    title: 'NTE x Sanctuary of Life Live', 
    type: 'Live Production', 
    thumb: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2670&auto=format&fit=crop', 
    embedUrl: 'https://www.instagram.com/reel/DX6OdL_SKtB/embed/'
  },
  { 
    id: 1, 
    title: 'Summer Campaign 2024', 
    type: 'Campaign', 
    thumb: 'https://images.unsplash.com/photo-1492691523567-6119521a9365?q=80&w=2670&auto=format&fit=crop', 
    videoUrl: 'https://res.cloudinary.com/demo/video/upload/dog.mp4' 
  },
  { 
    id: 2, 
    title: 'NTE x Vogue Interview', 
    type: 'Interview', 
    thumb: 'https://images.unsplash.com/photo-1544365312-832a89363840?q=80&w=2576&auto=format&fit=crop', 
    videoUrl: 'https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4' 
  },
  { 
    id: 3, 
    title: 'Lumina Fashion Film', 
    type: 'Cinematic', 
    thumb: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2640&auto=format&fit=crop', 
    videoUrl: 'https://res.cloudinary.com/demo/video/upload/w_1280,h_720,c_fill/dog.mp4' 
  },
  { 
    id: 4, 
    title: 'Music Festival Aftermovie', 
    type: 'Event', 
    thumb: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2670&auto=format&fit=crop', 
    videoUrl: 'https://res.cloudinary.com/demo/video/upload/w_1280,h_720,c_fill/sea_turtle.mp4' 
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {VIDEOS.map((vid) => (
            <motion.div
              key={vid.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer px-2 md:px-0"
              onClick={() => setSelectedVideo(vid)}
            >
              <div className="relative aspect-video rounded-2xl md:rounded-3xl overflow-hidden mb-4 md:mb-6 bg-black shadow-lg">
                 <img 
                   src={vid.thumb} 
                   alt={vid.title} 
                   className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                   referrerPolicy="no-referrer"
                 />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform shadow-xl border border-white/30">
                       <Play fill="white" size={28} className="md:w-8 md:h-8" />
                    </div>
                 </div>
              </div>
              <div className="px-1">
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-brand-brown font-bold mb-1 md:mb-2 block">{vid.type}</span>
                <h3 className="text-xl md:text-3xl font-display font-black uppercase leading-tight">{vid.title}</h3>
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/98 p-2 md:p-10"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl aspect-video bg-black rounded-xl md:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 md:bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10 backdrop-blur-md"
              >
                <X size={20} className="md:w-6 md:h-6" />
              </button>
              {selectedVideo.embedUrl ? (
                <iframe 
                  src={selectedVideo.embedUrl} 
                  className="w-full h-full border-0"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" 
                  allowFullScreen
                />
              ) : (
                <video 
                  src={selectedVideo.videoUrl} 
                  className="w-full h-full object-contain md:object-cover"
                  controls
                  autoPlay
                  muted
                  playsInline
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
