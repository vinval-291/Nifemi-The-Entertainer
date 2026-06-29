import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS, Project } from '../constants/projects';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

type VideoType = NonNullable<Project['videos']>[number];

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = PROJECTS.find(p => p.slug === slug);

  // Modal player state
  const [selectedVideo, setSelectedVideo] = useState<VideoType | null>(null);

  // Multiple carousel tracking state: map of { [carouselId]: currentSlideIndex }
  const [carouselIndices, setCarouselIndices] = useState<Record<string, number>>({});

  if (!project) {
    return (
      <div className="pt-32 pb-24 text-center">
        <h1 className="text-4xl font-black uppercase mb-8">Project Not Found</h1>
        <Link to="/portfolio" className="btn-primary">Back to Portfolio</Link>
      </div>
    );
  }

  // Helper to get or initialize index for a carousel
  const getCarouselIndex = (id: string) => {
    return carouselIndices[id] || 0;
  };

  const handleNextSlide = (carouselId: string, max: number) => {
    setCarouselIndices(prev => ({
      ...prev,
      [carouselId]: (getCarouselIndex(carouselId) + 1) % max
    }));
  };

  const handlePrevSlide = (carouselId: string, max: number) => {
    setCarouselIndices(prev => ({
      ...prev,
      [carouselId]: (getCarouselIndex(carouselId) - 1 + max) % max
    }));
  };

  const handleJumpToSlide = (carouselId: string, index: number) => {
    setCarouselIndices(prev => ({
      ...prev,
      [carouselId]: index
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 pb-24"
    >
      <div className="section-container">
        <Link to="/portfolio" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-12">
          <ArrowLeft size={16} />
          Back to Portfolio
        </Link>

        <header className="mb-20">
          <span className="text-xs uppercase tracking-widest text-brand-brown font-black mb-4 block">
            {project.category}
          </span>
          <h1 className="text-4xl md:text-8xl font-black uppercase mb-12 leading-[0.85]">
            {project.title.split(' ').map((word, i) => (
              <span key={i} className={i % 2 !== 0 ? 'text-brand-brown italic font-serif lowercase' : ''}>
                {word}{' '}
              </span>
            ))}
          </h1>
          <div className="aspect-[21/9] w-full overflow-hidden rounded-3xl shadow-2xl bg-brand-sand">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
              style={{ objectPosition: project.imagePosition || 'center' }}
              referrerPolicy="no-referrer"
            />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          <div className="lg:col-span-12">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 pb-20 border-b border-brand-sand">
                <div className="md:col-span-2">
                  <h2 className="text-xs uppercase tracking-[0.3em] font-black mb-6 text-gray-400">Context</h2>
                  <p className="text-xl md:text-3xl font-light leading-relaxed">
                    {project.fullDesc}
                  </p>
                </div>
                <div>
                   <h2 className="text-xs uppercase tracking-[0.3em] font-black mb-6 text-gray-400">Services Provided</h2>
                   <ul className="space-y-4">
                      {project.services.map(service => (
                        <li key={service} className="flex items-start gap-3">
                           <CheckCircle2 size={18} className="text-brand-brown shrink-0 mt-0.5" />
                           <span className="text-sm font-bold uppercase tracking-tight">{service}</span>
                        </li>
                      ))}
                   </ul>
                </div>
             </div>
          </div>
        </div>


        {/* Dynamic Video Showcase Section */}
        {project.videos && project.videos.length > 0 && (
          <section className="mb-32">
            <div className="mb-12">
              <span className="text-[11px] uppercase tracking-[0.3em] font-black text-brand-brown block mb-3">Motion Deliverables</span>
              <h2 className="text-4xl font-black uppercase">
                Video <span className="text-brand-brown">Showcase.</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {project.videos.map((vid) => (
                <div
                  key={vid.id}
                  className="group cursor-pointer block"
                  onClick={() => setSelectedVideo(vid)}
                >
                  <div className={`relative rounded-3xl overflow-hidden mb-6 bg-black shadow-lg transition-all duration-500 ring-1 ring-black/5
                    ${vid.isVertical ? 'aspect-[9/16] max-w-sm mx-auto' : 'aspect-video'}`}
                  >
                    {vid.thumb ? (
                      <img 
                        src={vid.thumb} 
                        alt={vid.title} 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-600">
                        No Preview Available
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/15 group-hover:bg-black/30 transition-colors">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform shadow-xl border border-white/30">
                        <Play fill="white" size={24} />
                      </div>
                    </div>
                  </div>
                  <div className="px-2 text-center md:text-left">
                    <span className="text-[10px] uppercase tracking-widest text-brand-brown font-bold mb-1.5 block">{vid.type}</span>
                    <h3 className="text-lg font-display font-black uppercase leading-tight group-hover:text-brand-brown transition-colors">{vid.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Dynamic Campaign Carousels Section */}
        {project.carousels && project.carousels.length > 0 && (
          <section className="mb-32">
            <div className="mb-12">
              <span className="text-[11px] uppercase tracking-[0.3em] font-black text-brand-brown block mb-3">Interactive Decks</span>
              <h2 className="text-4xl font-black uppercase">
                Campaign <span className="text-brand-brown">Carousels.</span>
              </h2>
            </div>

            <div className="space-y-24">
              {project.carousels.map((carousel) => {
                const currentIndex = getCarouselIndex(carousel.id);
                return (
                  <div key={carousel.id} className="bg-brand-beige border border-brand-sand rounded-3xl p-6 md:p-12 shadow-md">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                      
                      {/* Left Column: Carousel Details */}
                      <div className="lg:col-span-5">
                        <span className="text-[10px] uppercase tracking-widest text-brand-brown font-black block mb-4">
                          {carousel.category}
                        </span>
                        <h3 className="text-3xl md:text-4xl font-display font-black uppercase mb-4 leading-tight">
                          {carousel.title}
                        </h3>
                        <p className="text-gray-500 font-light mb-8 leading-relaxed text-sm md:text-base">
                          {carousel.subtitle}
                        </p>
                        
                        {/* Slide dots and counts */}
                        <div className="flex flex-col gap-4">
                          <span className="text-xs uppercase tracking-widest font-bold text-gray-400">
                            Slide <span className="text-black font-black">{currentIndex + 1}</span> of <span className="font-black text-black">{carousel.images.length}</span>
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {carousel.images.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleJumpToSlide(carousel.id, idx)}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                  currentIndex === idx ? 'w-8 bg-black' : 'w-2 bg-black/10 hover:bg-black/30'
                                }`}
                                aria-label={`Go to slide ${idx + 1}`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Prev/Next buttons for desktop */}
                        <div className="hidden lg:flex gap-4 mt-12">
                          <button
                            onClick={() => handlePrevSlide(carousel.id, carousel.images.length)}
                            className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <button
                            onClick={() => handleNextSlide(carousel.id, carousel.images.length)}
                            className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                          >
                            <ChevronRight size={20} />
                          </button>
                        </div>
                      </div>

                      {/* Right Column: Carousel Viewer */}
                      <div className="lg:col-span-7 relative">
                        <div className="aspect-[4/5] md:aspect-[1/1] xl:aspect-[4/5] max-w-lg mx-auto rounded-2xl overflow-hidden shadow-2xl relative bg-zinc-950">
                          <AnimatePresence mode="wait">
                            <motion.img
                              key={currentIndex}
                              src={carousel.images[currentIndex]}
                              alt={`${carousel.title} slide ${currentIndex + 1}`}
                              initial={{ opacity: 0, scale: 1.02 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="w-full h-full object-contain"
                              referrerPolicy="no-referrer"
                            />
                          </AnimatePresence>
                        </div>

                        {/* Prev/Next buttons overlay for touch screens or smaller layouts */}
                        <div className="flex lg:hidden justify-center gap-6 mt-8">
                          <button
                            onClick={() => handlePrevSlide(carousel.id, carousel.images.length)}
                            className="w-12 h-12 rounded-full bg-white shadow border border-black/5 flex items-center justify-center text-black active:scale-95 transition-transform"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <button
                            onClick={() => handleNextSlide(carousel.id, carousel.images.length)}
                            className="w-12 h-12 rounded-full bg-white shadow border border-black/5 flex items-center justify-center text-black active:scale-95 transition-transform"
                          >
                            <ChevronRight size={20} />
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {project.gallery && project.gallery.length > 0 && !project.carousels && (
          <section className="mb-32">
             <h2 className="text-4xl font-black uppercase mb-12">Visual <span className="text-brand-brown">Records.</span></h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {project.gallery.map((img, i) => (
                  <div key={i} className="aspect-video rounded-3xl overflow-hidden shadow-xl">
                    <img 
                      src={img} 
                      alt={`${project.title} gallery ${i}`} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
             </div>
          </section>
        )}

        <footer className="grid grid-cols-2 gap-px bg-brand-sand border-t border-brand-sand">
           {(() => {
             const currentIndex = PROJECTS.findIndex(p => p.id === project.id);
             const prevIndex = (currentIndex - 1 + PROJECTS.length) % PROJECTS.length;
             const nextIndex = (currentIndex + 1) % PROJECTS.length;
             
             const prevProject = PROJECTS[prevIndex];
             const nextProject = PROJECTS[nextIndex];

             return (
               <>
                 <Link to={`/portfolio/${prevProject.slug}`} className="group bg-brand-white p-6 sm:p-12 hover:bg-brand-beige transition-colors text-left flex flex-col justify-between h-full">
                    <div>
                      <span className="text-[8px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.5em] font-black text-gray-400 mb-2 md:mb-6 block">Previous</span>
                      <span className="text-sm sm:text-2xl md:text-5xl font-black uppercase group-hover:text-brand-brown transition-colors line-clamp-2">
                        {prevProject.title}
                      </span>
                    </div>
                    <div className="mt-4 md:mt-8">
                      <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                        <ArrowLeft size={16} className="md:w-5 md:h-5" />
                      </div>
                    </div>
                 </Link>

                 <Link to={`/portfolio/${nextProject.slug}`} className="group bg-brand-white p-6 sm:p-12 hover:bg-brand-beige transition-colors text-right flex flex-col justify-between h-full">
                    <div>
                      <span className="text-[8px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.5em] font-black text-gray-400 mb-2 md:mb-6 block">Next</span>
                      <span className="text-sm sm:text-2xl md:text-5xl font-black uppercase group-hover:text-brand-brown transition-colors line-clamp-2">
                        {nextProject.title}
                      </span>
                    </div>
                    <div className="flex justify-end mt-4 md:mt-8">
                      <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-brand-brown transition-colors">
                        <ArrowUpRight size={16} className="md:w-5 md:h-5 group-hover:rotate-45 transition-transform" />
                      </div>
                    </div>
                 </Link>
               </>
             );
           })()}
        </footer>
      </div>

      {/* Immersive Video Modal Overlay Player */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all"
            >
              <X size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className={`w-full bg-zinc-950 rounded-2xl overflow-hidden shadow-2xl relative border border-white/10
                ${selectedVideo.isVertical ? 'max-w-[400px] aspect-[9/16]' : 'max-w-5xl aspect-video'}`}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={selectedVideo.embedUrl}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                className="w-full h-full"
                title={selectedVideo.title}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
