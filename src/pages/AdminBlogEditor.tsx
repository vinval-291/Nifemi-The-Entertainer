import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Save, Trash2, Globe, Eye } from 'lucide-react';
import { blogService } from '../services/blogService';
import { BlogPost } from '../constants/blog';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { isUserAdmin } from '../constants/admin';

export default function AdminBlogEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState<Omit<BlogPost, 'id'>>({
    slug: '',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase().replace(',', ' /'),
    category: 'Insight',
    title: '',
    image: '',
    excerpt: '',
    content: '',
    readTime: '5 min',
    author: 'Nifemi Ajisefinni'
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!isUserAdmin(user?.email)) {
        navigate('/blog');
      } else {
        setIsAdmin(true);
      }
    });

    if (isEditing && id) {
      const fetchPost = async () => {
        try {
          const allPosts = await blogService.getAllPosts();
          const post = allPosts.find(p => (p as any).id === id);
          if (post) {
            const { id: _, ...rest } = post as any;
            setFormData(rest);
          } else {
            navigate('/blog');
          }
        } catch (error) {
          console.error('Error fetching post for edit:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    }

    return () => unsubscribe();
  }, [id, isEditing, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
        ...prev, 
        [name]: value,
        // Auto-generate slug from title if not manually edited
        slug: name === 'title' && !isEditing ? value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : prev.slug
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEditing && id) {
        await blogService.updatePost(id, formData);
      } else {
        await blogService.createPost(formData);
      }
      navigate('/blog');
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Failed to save post. Check console for details.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id || !window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await blogService.deletePost(id);
      navigate('/blog');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (!isAdmin || loading) {
    return (
      <div className="pt-32 pb-24 text-center">
        <p>{loading ? 'Loading editor...' : 'Checking permissions...'}</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-brand-beige min-h-screen">
      <div className="section-container max-w-4xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-black mb-12 hover:text-brand-brown transition-colors">
          <ArrowLeft size={14} /> Back to Journal
        </Link>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12 border-b border-brand-sand bg-brand-white flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-display font-black uppercase">
                {isEditing ? 'Edit Entry' : 'New Entry'}
              </h1>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-2">{formData.slug || 'slug-will-appear-here'}</p>
            </div>
            {isEditing && (
              <button 
                onClick={handleDelete}
                className="p-3 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                title="Delete Post"
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Title</label>
                <input 
                  required
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-brand-beige border border-brand-sand rounded-xl px-4 py-3 outline-none focus:border-black transition-colors font-display text-lg uppercase"
                  placeholder="The impact of..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Slug</label>
                <input 
                  required
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full bg-brand-beige border border-brand-sand rounded-xl px-4 py-3 outline-none focus:border-black transition-colors font-mono text-sm"
                  placeholder="post-slug-here"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Category</label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-brand-beige border border-brand-sand rounded-xl px-4 py-3 outline-none focus:border-black transition-colors text-xs font-bold uppercase"
                >
                  <option value="Insight">Insight</option>
                  <option value="Strategy">Strategy</option>
                  <option value="Design">Design</option>
                  <option value="Media">Media</option>
                  <option value="Campaign">Campaign</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Date Display</label>
                <input 
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-brand-beige border border-brand-sand rounded-xl px-4 py-3 outline-none focus:border-black transition-colors text-xs font-bold uppercase"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Read Time</label>
                <input 
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleChange}
                  className="w-full bg-brand-beige border border-brand-sand rounded-xl px-4 py-3 outline-none focus:border-black transition-colors text-xs font-bold uppercase"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Featured Image URL</label>
              <input 
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full bg-brand-beige border border-brand-sand rounded-xl px-4 py-3 outline-none focus:border-black transition-colors text-sm"
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Excerpt</label>
              <textarea 
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                className="w-full bg-brand-beige border border-brand-sand rounded-xl px-4 py-3 outline-none focus:border-black transition-colors text-sm min-h-[100px] resize-none"
                placeholder="Brief summary of the post..."
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Content (HTML)</label>
                <span className="text-[8px] text-gray-400 font-bold uppercase">Basic HTML Supported</span>
              </div>
              <textarea 
                required
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="w-full bg-brand-beige border border-brand-sand rounded-xl px-4 py-3 outline-none focus:border-black transition-colors text-sm min-h-[400px] font-mono leading-relaxed"
                placeholder="<p>Write your story here...</p>"
              />
            </div>

            <div className="flex justify-end gap-4 pt-8">
              <Link 
                to="/blog" 
                className="px-8 py-4 text-[10px] font-black uppercase tracking-widest border border-brand-sand rounded-full hover:bg-brand-sand transition-colors"
              >
                Cancel
              </Link>
              <button 
                type="submit"
                disabled={saving}
                className="px-10 py-4 bg-brand-brown text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-black transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {saving ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save size={14} />
                    {isEditing ? 'Update Post' : 'Publish Post'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
