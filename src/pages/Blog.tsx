import { motion } from 'motion/react';
import { ArrowUpRight, Search } from 'lucide-react';
import { useState } from 'react';

import { BLOG_POSTS } from '../constants/blog';
import { Link } from 'react-router-dom';

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = BLOG_POSTS.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-32 pb-24">
      <div className="section-container">
        <header className="mb-20 text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black uppercase mb-6">The <span className="text-brand-brown">Journal.</span></h1>
          <p className="text-lg md:text-xl text-gray-500 font-light mb-10">
            Casual thoughts on PR, creative direction, and the intersection of culture and commerce.
          </p>
          <div className="relative max-w-md mx-auto">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
             <input 
               type="text" 
               placeholder="Search insights..."
               className="w-full bg-brand-beige border border-brand-sand rounded-full py-4 pl-12 pr-6 outline-none focus:border-black transition-colors"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredPosts.map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group flex flex-col h-full"
            >
              <Link to={`/blog/${post.slug}`} className="block">
                <div className="aspect-[16/10] overflow-hidden rounded-2xl mb-8 bg-brand-sand shadow-lg">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </Link>
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-bold text-brand-brown tracking-widest uppercase">{post.date}</span>
                <span className="px-3 py-1 bg-brand-sand text-[8px] font-black uppercase tracking-[0.2em] text-brand-brown rounded-full">
                  {post.category}
                </span>
              </div>
              <Link to={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-display font-black uppercase leading-tight mb-4 group-hover:text-brand-brown transition-colors">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-500 mb-8 font-light leading-relaxed flex-grow">
                {post.excerpt}
              </p>
              <div className="flex justify-between items-end pt-6 border-t border-brand-sand mt-auto">
                <Link to={`/blog/${post.slug}`} className="flex items-center gap-2 group-hover:text-brand-brown transition-colors">
                  <span className="text-[10px] uppercase tracking-widest font-black">Read More</span>
                  <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
                </Link>
                <span className="text-[10px] text-gray-300 uppercase tracking-widest font-bold">Est. {post.readTime} read</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
