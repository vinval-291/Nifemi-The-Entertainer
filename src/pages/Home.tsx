import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { ArrowUpRight, TrendingUp, Sparkles, Camera, BookOpen } from 'lucide-react';
import { PROJECTS } from '../constants/projects';
import { BLOG_POSTS } from '../constants/blog';
import { IMAGES } from './Gallery';

const PageTransition = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export default function Home() {
  const [diaryImages, setDiaryImages] = useState<string[]>([]);

  useEffect(() => {
    const photoPageImages = IMAGES.map(img => img.src);
    const projectImages: string[] = [];
    
    PROJECTS.forEach(p => {
      const pImages: string[] = [];
      if (p.image) pImages.push(p.image);
      if (p.gallery) pImages.push(...p.gallery);
      if (p.carousels) {
        p.carousels.forEach(c => {
          if (c.images) pImages.push(...c.images);
        });
      }
      
      const uniquePImages = pImages.filter(src => src && !photoPageImages.includes(src));
      if (uniquePImages.length > 0) {
        projectImages.push(...uniquePImages);
      }
    });

    const shuffleArray = (arr: string[]) => {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    };

    const shuffledPhotos = shuffleArray(photoPageImages);
    const shuffledProjects = shuffleArray(projectImages);
    const selected: string[] = [];
    
    if (shuffledPhotos.length > 0) {
      selected.push(...shuffledPhotos.slice(0, 2));
    }
    if (shuffledProjects.length > 0) {
      selected.push(...shuffledProjects.slice(0, 2));
    }

    const remaining = 4 - selected.length;
    if (remaining > 0) {
      const pool = shuffleArray(Array.from(new Set([...photoPageImages, ...projectImages])));
      const unused = pool.filter(src => !selected.includes(src));
      selected.push(...unused.slice(0, remaining));
    }

    setDiaryImages(shuffleArray(selected).slice(0, 4));
  }, []);

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.postimg.cc/XJPN5Zyc/nte.jpg" 
            alt="NTE Hero" 
            className="w-full h-full object-cover brightness-[70%]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-brand-white" />
        </div>
        
        <div className="section-container relative z-10 w-full mt-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-4xl lg:max-w-5xl"
          >
            <span className="text-white text-xs uppercase tracking-[0.4em] font-bold mb-6 block">PR Manager | Creative Director</span>
            <h1 className="text-white text-3xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.05] font-black uppercase mb-8">
              <span className="block whitespace-nowrap">
                <span className="text-brand-brown">Building</span> Brands
              </span>
              <span className="block text-transparent [-webkit-text-stroke:1px_white] whitespace-nowrap">
                Shaping <span className="text-brand-brown [-webkit-text-stroke:0px]">Culture.</span>
              </span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl font-light max-w-lg mb-10 leading-relaxed">
              I Help Brands Grow Visibility, Build Influence, and Connect with the Right Audience through Strategic PR, 
              Creative Direction, and Result-Driven Digital Marketing.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/portfolio" className="btn-primary backdrop-blur-sm bg-white text-brand-brown border-none px-12 hover:bg-brand-beige transition-colors">View Portfolio</Link>
              <Link to="/contact" className="btn-outline text-brand-brown border-brand-brown hover:bg-brand-brown hover:text-white px-12 transition-all">Work With Me</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <section className="bg-black py-6 overflow-hidden">
        <div className="flex gap-20 whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-white font-display text-lg uppercase tracking-widest font-black opacity-40">
               * PROBINA NIGERIA LIMITED * BLINGS and SWISH * SHINE BRITE ENTERTAINMENT * FLUX LOGISTIX * FLUX ENERGY * CITY 105.1 FM * SANTUARY OF LIFE MINISTRIES * SL SOUNDS * COLLEGE OF HEALTH SCIENCE AND TECHNOLOGY *
            </span>
          ))}
        </div>
      </section>

      {/* Intro Section */}
      <section className="section-container grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-4xl md:text-6xl font-black uppercase leading-tight mb-10">
            I DON'T JUST TELL STORIES. <br />
            <span className="text-brand-brown italic font-serif lowercase">I define moments.</span>
          </h2>
          <div className="space-y-6 text-gray-600 text-base md:text-lg leading-relaxed">
            <p>
              NTE is the creative expression of my journey as a storyteller. I bridge the gap between corporate excellence and culture-forward aesthetics.
            </p>
            <p>
              With over 7 years of expertise in the entertainment and lifestyle sector, I craft narratives that resonate with Gen-Z and Millennials while maintaining the prestige required for high-end brands.
            </p>
          </div>
          <Link to="/about" className="mt-12 btn-outline w-fit">My Full Story</Link>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative aspect-[3/4] bg-brand-sand rounded-2xl overflow-hidden group"
        >
           <img 
            src="https://i.postimg.cc/VkjGftqw/DSC03528.jpg" 
            alt="NTE Profile" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </section>

      {/* Portfolio Preview */}
      <section className="bg-brand-beige py-24">
        <div className="section-container">
          <div className="flex justify-between items-end mb-12 md:mb-16 gap-4">
            <div className="text-left">
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-brand-brown font-bold mb-2 md:mb-4 block">Archive 01</span>
              <h2 className="text-2xl sm:text-4xl md:text-7xl font-black uppercase leading-tight md:leading-none">Recent <br className="hidden md:block" /><span className="text-brand-brown italic font-serif">Impact.</span></h2>
            </div>
            <Link to="/portfolio" className="btn-outline group text-[10px] md:text-sm whitespace-nowrap px-4 py-2 md:px-8 md:py-4 shrink-0 transition-all">
              Explore All <ArrowUpRight className="group-hover:rotate-45 transition-transform" size={14} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {PROJECTS.slice(0, 3).map((project) => (
              <div key={project.id}>
                <ProjectCard 
                  image={project.image}
                  title={project.title}
                  category={project.category}
                  slug={project.slug}
                  imagePosition={project.imagePosition}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Excerpt */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1">
             <h2 className="text-4xl font-black uppercase mb-6">Expertise <br />Tailored for <span className="text-brand-brown">You.</span></h2>
             <p className="text-gray-500 mb-10 leading-relaxed">
               I offer a curated suite of services designed to take brands from "seen" to "essential."
             </p>
             <Link to="/services" className="text-sm font-bold uppercase tracking-widest border-b border-black pb-2 hover:text-brand-brown hover:border-brand-brown transition-all">
               View My Framework
             </Link>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
             <SmallServiceCard icon={<TrendingUp size={24}/>} title="PR Strategy" desc="Reputation management and media narrative construction." />
             <SmallServiceCard icon={<Sparkles size={24}/>} title="Creative Direction" desc="Visual storytelling and campaign aesthetic curation." />
             <SmallServiceCard icon={<Camera size={24}/>} title="Media Production" desc="High-end content creation from concept to delivery." />
             <SmallServiceCard icon={<BookOpen size={24}/>} title="Brand Consulting" desc="Strategic workshops and market positioning." />
          </div>
        </div>
      </section>

      {/* Gallery Taster */}
      <section className="py-24 bg-[#8B5E3C] text-white overflow-hidden">
        <div className="section-container">
          <div className="text-center mb-20">
             <h2 className="text-5xl md:text-7xl font-black uppercase mb-6">Visual <span className="text-transparent [-webkit-text-stroke:1px_white]">Diary.</span></h2>
             <p className="text-gray-400 max-w-lg mx-auto">A glimpse into the aesthetic world I live in. Behind-the-scenes, travel, and inspiration.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {diaryImages.map((src, index) => (
               <div key={index} className="aspect-square overflow-hidden rounded-xl grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer">
                  <img 
                    src={src} 
                    alt="Gallery item"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
               </div>
             ))}
          </div>
          <div className="mt-16 text-center">
             <Link to="/gallery" className="btn-outline border-white text-white hover:bg-white hover:text-black mx-auto">See Full Gallery</Link>
          </div>
        </div>
      </section>

      {/* Blog/Insights Sneak Peek */}
      <section className="section-container">
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase">Creative <span className="text-brand-brown">Insights.</span></h2>
          <span className="text-xs uppercase tracking-widest font-bold hidden md:block">Latest from my journal</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {BLOG_POSTS.slice(0, 3).map(post => (
            <div key={post.id}>
              <BlogCard 
                date={post.date}
                title={post.title}
                categories={post.categories}
                slug={post.slug}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-[60px] bg-brand-beige">
        <div className="section-container text-center">
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
           >
             <h2 className="text-4xl md:text-8xl font-black uppercase mb-10 leading-none">
                Let's make <br />
                <span className="text-brand-brown">History.</span>
             </h2>
             <p className="text-lg md:text-xl text-gray-500 mb-12 max-w-2xl mx-auto">
               I am currently taking on new projects for Q3 & Q4 of 2024. Reach out today to secure your spot.
             </p>
             <Link to="/contact" className="btn-primary px-16 py-6 text-sm">Start Your Inquiry</Link>
           </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}

function ProjectCard({ image, title, category, slug, imagePosition }: { image: string, title: string, category: string, slug: string, imagePosition?: string }) {
  return (
    <Link to={`/portfolio/${slug}`} className="group block">
      <div className="aspect-video overflow-hidden rounded-2xl mb-6 shadow-xl bg-brand-sand">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ objectPosition: imagePosition || 'center' }}
          referrerPolicy="no-referrer"
        />
      </div>
      <div>
        <span className="text-[10px] uppercase tracking-widest text-brand-brown font-black mb-2 block">{category}</span>
        <h3 className="text-xl md:text-2xl font-display font-black uppercase tracking-tight group-hover:text-brand-brown transition-colors">{title}</h3>
      </div>
    </Link>
  );
}

function SmallServiceCard({ icon, title, desc }: { icon: ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 border border-brand-sand rounded-2xl hover:border-black transition-all group">
       <div className="text-brand-brown mb-6 group-hover:scale-110 transition-transform origin-left">{icon}</div>
       <h4 className="text-lg font-black uppercase mb-2">{title}</h4>
       <p className="text-sm text-gray-500 leading-relaxed font-light">{desc}</p>
    </div>
  );
}

function BlogCard({ date, title, categories, slug }: { date: string, title: string, categories: string[], slug: string }) {
  return (
    <Link to={`/blog/${slug}`} className="group block border-b border-brand-sand pb-10">
       <div className="flex justify-between items-center mb-6">
          <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">{date}</span>
          <div className="flex flex-wrap gap-1 justify-end">
            {categories.map((cat, idx) => (
              <span key={idx} className="px-3 py-1 bg-brand-beige text-[9px] font-black uppercase tracking-widest text-brand-brown rounded-full whitespace-nowrap">
                {cat}
              </span>
            ))}
          </div>
       </div>
       <h3 className="text-2xl font-display font-black uppercase leading-tight group-hover:text-brand-brown transition-colors">
         {title}
       </h3>
       <div className="mt-8 flex items-center gap-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
          <span className="text-[10px] uppercase tracking-widest font-bold">Read Article</span>
          <ArrowUpRight size={14} />
       </div>
    </Link>
  );
}

