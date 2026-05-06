import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { PROJECTS } from '../constants/projects';
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = PROJECTS.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="pt-32 pb-24 text-center">
        <h1 className="text-4xl font-black uppercase mb-8">Project Not Found</h1>
        <Link to="/portfolio" className="btn-primary">Back to Portfolio</Link>
      </div>
    );
  }

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

        {project.results && (
          <section className="mb-32">
             <h2 className="text-4xl font-black uppercase mb-12">Key <span className="text-brand-brown">Impacts.</span></h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {project.results.map((result, i) => (
                  <div key={i} className="p-8 bg-brand-beige rounded-2xl border border-brand-sand">
                     <span className="text-4xl font-serif italic text-brand-brown mb-4 block">0{i + 1}</span>
                     <p className="text-lg font-light leading-relaxed text-gray-700">{result}</p>
                  </div>
                ))}
             </div>
          </section>
        )}

        {project.gallery && project.gallery.length > 0 && (
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
    </motion.div>
  );
}
