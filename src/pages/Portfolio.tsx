import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../constants/projects';

const CATEGORIES = ['All', 'PR Campaigns', 'Events', 'Branding', 'Media'];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <div className="pt-32 pb-24">
      <div className="section-container">
        <header className="mb-20 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-black uppercase mb-8">The <span className="text-brand-brown italic font-serif lowercase">Archive.</span></h1>
          <p className="text-lg md:text-2xl font-light text-gray-500 leading-relaxed mb-12">
            A selection of my work across PR, media production, and digital strategy. I partner with brands to craft narratives that aren't just heard, but felt. From plumbing giants to local podcasts, the goal remains the same: <span className="text-black font-medium">Impact.</span>
          </p>
          <div className="flex flex-wrap gap-4">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-xs uppercase tracking-widest transition-all ${
                  activeCategory === cat ? 'bg-black text-white' : 'bg-brand-sand text-black hover:bg-brand-brown hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative"
              >
                <Link to={`/portfolio/${project.slug}`} className="block">
                  <div className="aspect-[16/10] overflow-hidden rounded-3xl mb-6 bg-brand-sand shadow-lg">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-brand-brown font-bold flex items-center gap-2 mb-2">
                        <span className="w-1.5 h-1.5 bg-brand-brown rounded-full" />
                        {project.category}
                      </span>
                      <h3 className="text-3xl font-display font-black uppercase mb-2 group-hover:text-brand-brown transition-colors">{project.title}</h3>
                      <p className="text-gray-500 font-light max-w-sm">{project.desc}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
