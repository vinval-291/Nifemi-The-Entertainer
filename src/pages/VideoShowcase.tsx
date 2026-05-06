import { motion } from 'motion/react';
import { Play } from 'lucide-react';

const VIDEOS = [
  { id: 1, title: 'Summer Campaign 2024', type: 'Campaign', thumb: 'https://picsum.photos/seed/v1/1200/800' },
  { id: 2, title: 'NTE x Vogue Interview', type: 'Interview', thumb: 'https://picsum.photos/seed/v2/1200/800' },
  { id: 3, title: 'Lumina Fashion Film', type: 'Cinematic', thumb: 'https://picsum.photos/seed/v3/1200/800' },
  { id: 4, title: 'Music Festival Aftermovie', type: 'Event', thumb: 'https://picsum.photos/seed/v4/1200/800' },
];

export default function VideoShowcase() {
  return (
    <div className="pt-32 pb-24">
      <div className="section-container">
        <h1 className="text-7xl font-black uppercase mb-20">Motion <span className="text-transparent [-webkit-text-stroke:1px_black]">Selection.</span></h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {VIDEOS.map((vid) => (
            <motion.div
              key={vid.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 bg-black">
                 <img 
                   src={vid.thumb} 
                   alt={vid.title} 
                   className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                   referrerPolicy="no-referrer"
                 />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform">
                       <Play fill="white" size={32} />
                    </div>
                 </div>
              </div>
              <span className="text-xs uppercase tracking-widest text-brand-brown font-bold mb-2 block">{vid.type}</span>
              <h3 className="text-3xl font-display font-black uppercase">{vid.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
