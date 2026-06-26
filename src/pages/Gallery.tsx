import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const CAMPAIGNS = [
  {
    id: 'warehouse-leasing',
    title: 'Warehouse Leasing with Flux',
    subtitle: '5 Reasons Why Warehouse Leasing with Flux is Cost-Effective',
    category: 'Cost Optimization',
    images: [
      'https://i.postimg.cc/R01VMWYL/5-Reasons-Why-Warehouse-Leasing-with-Flux-is-Cost-Effective-cover.jpg',
      'https://i.postimg.cc/cCCsMXLB/Artboard-1-copy.jpg',
      'https://i.postimg.cc/rp2wX1f1/Artboard-1-copy-2.jpg',
      'https://i.postimg.cc/3wQx5XtN/Artboard-1-copy-3.jpg',
      'https://i.postimg.cc/GpPhc4fs/Artboard-1-copy-4.jpg',
      'https://i.postimg.cc/sXwjhtsX/Artboard-1-copy-5.jpg',
      'https://i.postimg.cc/VvvYBDkR/Last-Slide.jpg'
    ]
  },
  {
    id: 'air-logistics',
    title: 'Flux Air Logistics',
    subtitle: 'Streamlined global shipping and professional air charter services.',
    category: 'Logistics Campaign',
    images: [
      'https://i.postimg.cc/DzG5mTQ1/Flux-Air-Logistics-Carousel-cover.jpg',
      'https://i.postimg.cc/Sx3Dys9s/Flux-Air-Logistics-Carousel-2.jpg',
      'https://i.postimg.cc/c45cmHFG/Flux-Air-Logistics-Carousel-3.jpg',
      'https://i.postimg.cc/Z52VTRN0/Flux-Air-Logistics-Carousel-4.jpg',
      'https://i.postimg.cc/132J9tF9/Flux-Air-Logistics-Carousel-5.jpg'
    ]
  },
  {
    id: 'customer-service',
    title: 'Happy Customer Service Week',
    subtitle: 'Celebrating our commitment to excellence and seamless delivery.',
    category: 'Celebration',
    images: [
      'https://i.postimg.cc/6pryQb2p/Artboard-1-copy.jpg',
      'https://i.postimg.cc/0yYbNXMz/Artboard-1.jpg',
      'https://i.postimg.cc/Z58CqsBP/Artboard-2.jpg',
      'https://i.postimg.cc/VkqdNZrq/Artboard-2-copy.jpg',
      'https://i.postimg.cc/2SQV59b3/Artboard-2-copy-2.jpg',
      'https://i.postimg.cc/fRcJbqty/Artboard-2-copy-3.jpg',
      'https://i.postimg.cc/T3VpPNLy/Artboard-2-copy-4.jpg',
      'https://i.postimg.cc/y8mkNpgg/Artboard-2-copy-5.jpg',
      'https://i.postimg.cc/x1vcdpJH/Artboard-2-copy-6.jpg',
      'https://i.postimg.cc/wjX7B4yL/Artboard-2-copy-7.jpg'
    ]
  },
  {
    id: 'vaccine-logistics',
    title: 'Vaccine Cold-Chain Movement',
    subtitle: 'How pharmaceutical brands can move their vaccines safely across Nigeria.',
    category: 'Specialized Shipping',
    images: [
      'https://i.postimg.cc/fb6zjx9Q/How-Pharmaceuticals-Can-Move-Their-Vaccines-Safely-Across-Nigeria-cover.jpg',
      'https://i.postimg.cc/3wP8Cgv5/How-Pharmaceuticals-Can-Move-Their-Vaccines-Safely-Across-Nigeria-copy.jpg',
      'https://i.postimg.cc/YSJrf1m5/How-Pharmaceuticals-Can-Move-Their-Vaccines-Safely-Across-Nigeria-copy-2.jpg',
      'https://i.postimg.cc/N0Ws71Hh/How-Pharmaceuticals-Can-Move-Their-Vaccines-Safely-Across-Nigeria-copy-3.jpg'
    ]
  }
];

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
  
  const [selectedCampaign, setSelectedCampaign] = useState(0);
  const [[slideIndex, direction], setSlide] = useState([0, 0]);
  const [isPlaying, setIsPlaying] = useState(true);

  const campaign = CAMPAIGNS[selectedCampaign];
  const activeSlide = Math.abs(slideIndex % campaign.images.length);

  // Auto-play interval
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setSlide(([prevSlide, _]) => [prevSlide + 1, 1]);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, selectedCampaign, campaign.images.length]);

  const handleNextSlide = () => {
    setSlide(([prevSlide, _]) => [prevSlide + 1, 1]);
  };

  const handlePrevSlide = () => {
    setSlide(([prevSlide, _]) => [prevSlide - 1, -1]);
  };

  const handleSelectCampaign = (index: number) => {
    setSelectedCampaign(index);
    setSlide([0, 0]);
  };

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

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : dir < 0 ? '-100%' : 0,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? '100%' : dir > 0 ? '-100%' : 0,
      opacity: 0,
    }),
  };

  return (
    <div className="pt-32 pb-24">
      <div className="section-container">
        <header className="mb-20 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-black uppercase mb-8">Visual <span className="text-brand-brown italic font-serif">Diary.</span></h1>
          <p className="text-lg md:text-2xl font-light text-gray-500 leading-relaxed">
            A curated showcase of branding campaigns, educational resources, and corporate slide carousels designed to tell impactful stories.
          </p>
        </header>

        {/* Campaign Carousel Interface */}
        <div className="mb-24">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Campaign Selector / Sidebar */}
            <div className="w-full lg:w-1/3 space-y-4">
              <div className="border-b border-brand-sand pb-3 mb-6">
                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-brown">Campaign Hub</span>
                <h2 className="text-2xl font-display font-black uppercase">Select Campaign</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                {CAMPAIGNS.map((camp, idx) => (
                  <button
                    key={camp.id}
                    onClick={() => handleSelectCampaign(idx)}
                    className={`text-left p-5 rounded-2xl transition-all duration-300 border cursor-pointer ${
                      selectedCampaign === idx
                        ? 'bg-black border-black text-white shadow-lg shadow-black/10'
                        : 'bg-white border-brand-sand hover:border-black text-gray-800'
                    }`}
                  >
                    <span className={`text-[9px] uppercase tracking-widest font-bold mb-1 block ${selectedCampaign === idx ? 'text-brand-brown' : 'text-gray-400'}`}>
                      {camp.category}
                    </span>
                    <h3 className="text-base font-display font-black uppercase leading-tight">
                      {camp.title}
                    </h3>
                    <p className={`text-xs mt-2 line-clamp-2 ${selectedCampaign === idx ? 'text-gray-300' : 'text-gray-500'}`}>
                      {camp.subtitle}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Carousel Active Player */}
            <div className="w-full lg:w-2/3">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-brown">Interactive Presentation</span>
                  <h2 className="text-xl md:text-2xl font-display font-black uppercase line-clamp-1">{campaign.title}</h2>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-10 h-10 rounded-full bg-brand-sand/50 hover:bg-brand-sand text-brand-brown flex items-center justify-center transition-all cursor-pointer"
                    title={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                  <div className="w-px h-6 bg-brand-sand" />
                  <button 
                    onClick={handlePrevSlide}
                    className="w-10 h-10 rounded-full bg-brand-sand/50 hover:bg-brand-sand text-brand-brown flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button 
                    onClick={handleNextSlide}
                    className="w-10 h-10 rounded-full bg-brand-sand/50 hover:bg-brand-sand text-brand-brown flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              {/* Slider Core Container */}
              <div className="relative aspect-square w-full max-w-2xl mx-auto rounded-3xl overflow-hidden bg-zinc-950 shadow-2xl group border border-brand-sand/30 flex items-center justify-center">
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
                
                <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
                  <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                      key={activeSlide}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 350, damping: 35 },
                        opacity: { duration: 0.25 }
                      }}
                      className="absolute inset-0 w-full h-full flex items-center justify-center"
                    >
                      <img 
                        src={campaign.images[activeSlide]} 
                        alt={`${campaign.title} Slide ${activeSlide + 1}`}
                        className="w-full h-full object-contain select-none p-2 md:p-6"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Left Arrow overlay */}
                <button
                  onClick={handlePrevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70 cursor-pointer"
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Right Arrow overlay */}
                <button
                  onClick={handleNextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70 cursor-pointer"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Slide index overlay */}
                <div className="absolute top-6 right-6 z-10 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-mono border border-white/10 select-none">
                  {activeSlide + 1} / {campaign.images.length}
                </div>
              </div>

              {/* Progress and dot indicators */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl mx-auto">
                <div className="flex items-center gap-2">
                  {campaign.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSlide([idx, idx > activeSlide ? 1 : -1])}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        activeSlide === idx 
                          ? 'w-8 bg-black' 
                          : 'w-2.5 bg-brand-sand hover:bg-black/40'
                      }`}
                      title={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
                
                <span className="text-xs uppercase tracking-widest font-black text-gray-400">
                  Swipe or Click Arrows to Navigate
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Masonry Image Journal */}
        <div>
          <div className="mb-12 border-b border-brand-sand pb-4">
            <span className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-brown">Visual Chronicles</span>
            <h2 className="text-2xl md:text-4xl font-display font-black uppercase">Moment Archives</h2>
          </div>

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
