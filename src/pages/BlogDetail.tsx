import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Calendar, Share2, ArrowUpRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { blogService } from '../services/blogService';
import { BlogPost } from '../constants/blog';

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [morePosts, setMorePosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      try {
        const data = await blogService.getPostBySlug(slug);
        if (data) {
          setPost(data);
          const allPosts = await blogService.getAllPosts();
          setMorePosts(allPosts.filter(p => p.slug !== slug).slice(0, 2));
        } else {
          navigate('/blog');
        }
      } catch (error) {
        console.error('Failed to fetch post:', error);
        navigate('/blog');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
    window.scrollTo(0, 0);
  }, [slug, navigate]);

  if (loading) return (
    <div className="pt-32 pb-24 text-center">
      <p>Loading story...</p>
    </div>
  );

  if (!post) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24"
    >
      <div className="section-container">
        {/* Back Button */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-black mb-12 hover:text-brand-brown transition-colors group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Journal
        </Link>

        {/* Header */}
        <header className="max-w-4xl mb-16">
          <div className="flex flex-wrap items-center gap-6 mb-8">
            <span className="px-4 py-1.5 bg-brand-beige text-brand-brown text-[10px] font-black uppercase tracking-widest rounded-full">
              {post.category}
            </span>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-400">
              <Calendar size={12} />
              {post.date}
            </div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-400">
              <Clock size={12} />
              {post.readTime} read
            </div>
          </div>
          <h1 className="text-4xl md:text-7xl font-black uppercase leading-[0.9] mb-10">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 border-t border-brand-sand pt-8">
            <div className="w-10 h-10 rounded-full bg-brand-sand overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop" 
                    alt={post.author} 
                    className="w-full h-full object-cover"
                />
            </div>
            <div>
                <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">Written By</span>
                <span className="text-sm font-black uppercase">{post.author}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="aspect-[21/9] rounded-3xl overflow-hidden mb-20 shadow-2xl bg-brand-sand">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Share Sidebar */}
          <aside className="lg:col-span-1 sticky top-32 hidden lg:flex flex-col gap-6">
            <span className="text-[8px] uppercase tracking-[0.3em] font-black text-gray-400 [writing-mode:vertical-lr] rotate-180 mb-4">Share Story</span>
            <button className="w-10 h-10 rounded-full border border-brand-sand flex items-center justify-center hover:bg-black hover:text-white transition-all">
                <Share2 size={16} />
            </button>
          </aside>

          {/* Article Text */}
          <div className="lg:col-span-8 lg:col-start-3">
            <div 
              className="prose prose-lg md:prose-xl max-w-none 
              prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight
              prose-p:text-gray-600 prose-p:leading-relaxed prose-p:font-light
              prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:border-b prose-h2:pb-4 prose-h2:border-brand-sand
              prose-strong:text-black prose-strong:font-bold
              "
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Tag/Category footer */}
            <div className="mt-20 pt-10 border-t border-brand-sand flex flex-wrap gap-4">
               <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mr-2">Filed Under:</span>
               <span className="text-xs font-black uppercase hover:text-brand-brown cursor-pointer transition-colors">#{post.category}</span>
               <span className="text-xs font-black uppercase hover:text-brand-brown cursor-pointer transition-colors">#Culture</span>
               <span className="text-xs font-black uppercase hover:text-brand-brown cursor-pointer transition-colors">#Storytelling</span>
            </div>
          </div>
        </div>

        {/* Next Posts */}
        {morePosts.length > 0 && (
          <section className="mt-32 pt-20 border-t border-brand-sand">
             <div className="flex justify-between items-end mb-16">
                <h2 className="text-4xl font-black uppercase">More <br /><span className="text-brand-brown italic font-serif">Stories.</span></h2>
                <Link to="/blog" className="btn-outline text-xs">View Journal</Link>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {morePosts.map((otherPost) => (
                  <Link key={otherPost.id} to={`/blog/${otherPost.slug}`} className="group block">
                    <div className="aspect-video rounded-2xl overflow-hidden mb-6 bg-brand-sand">
                      <img src={otherPost.image} alt={otherPost.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-3 block">{otherPost.category}</span>
                    <h3 className="text-2xl font-black uppercase leading-tight group-hover:text-brand-brown transition-colors">
                      {otherPost.title}
                    </h3>
                    <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                      Read Story <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
                    </div>
                  </Link>
                ))}
             </div>
          </section>
        )}
      </div>
    </motion.div>
  );
}
