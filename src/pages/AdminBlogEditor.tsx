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
    categories: ['Insight'],
    title: '',
    image: '',
    excerpt: '',
    content: '',
    readTime: '5 min',
    author: 'Nifemi The Entertainer',
    status: 'published'
  });

  const [newCategory, setNewCategory] = useState('');

  const addCategory = () => {
    if (newCategory.trim() && !formData.categories.includes(newCategory.trim())) {
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, newCategory.trim()]
      }));
      setNewCategory('');
    }
  };

  const removeCategory = (catToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c !== catToRemove)
    }));
  };

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
          const post = allPosts.find(p => String((p as any).id) === id);
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

  const handleStatusToggle = (status: 'published' | 'draft') => {
    setFormData(prev => ({ ...prev, status }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.categories.length === 0) {
      alert('Please add at least one category.');
      return;
    }
    setSaving(true);
    try {
      if (isEditing && id) {
        await blogService.updatePost(id, formData);
      } else {
        await blogService.createPost(formData);
      }
      navigate('/blog');
    } catch (error: any) {
      console.error('Error saving post:', error);
      let errorMessage = 'Failed to save post.';
      try {
        const firestoreError = JSON.parse(error.message);
        errorMessage += ` ${firestoreError.error}`;
      } catch {
        errorMessage += ` ${error.message || 'Unknown error'}`;
      }
      alert(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    
    // Check if it's a static post (numeric IDs in our setup are static)
    const isStatic = !isNaN(Number(id));
    if (isStatic) {
      alert("This is a hardcoded post and cannot be deleted from the database.");
      return;
    }

    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    setSaving(true);
    try {
      await blogService.deletePost(id);
      navigate('/blog');
    } catch (error: any) {
      console.error('Error deleting post:', error);
      let errorMessage = 'Failed to delete post.';
      try {
        const firestoreError = JSON.parse(error.message);
        errorMessage += ` ${firestoreError.error}`;
      } catch {
        errorMessage += ` ${error.message || 'Unknown error'}`;
      }
      alert(errorMessage);
    } finally {
      setSaving(false);
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
            <div className="flex items-center gap-4">
              <div className="flex bg-brand-beige p-1 rounded-full border border-brand-sand">
                <button
                  type="button"
                  onClick={() => handleStatusToggle('published')}
                  className={`px-4 py-1.5 text-[8px] font-black uppercase tracking-widest rounded-full transition-all ${
                    formData.status === 'published' 
                      ? 'bg-brand-brown text-white shadow-md' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  Published
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusToggle('draft')}
                  className={`px-4 py-1.5 text-[8px] font-black uppercase tracking-widest rounded-full transition-all ${
                    formData.status === 'draft' 
                      ? 'bg-gray-400 text-white shadow-md' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  Draft
                </button>
              </div>
            </div>
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
              <div className="space-y-4 md:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Categories</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.categories.map((cat, idx) => (
                    <span key={idx} className="flex items-center gap-2 px-3 py-1 bg-brand-sand text-[8px] font-black uppercase tracking-[0.2em] text-brand-brown rounded-full">
                      {cat}
                      <button type="button" onClick={() => removeCategory(cat)} className="hover:text-red-500">×</button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input 
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCategory())}
                    placeholder="Add category (e.g. Media)"
                    className="flex-grow bg-brand-beige border border-brand-sand rounded-xl px-4 py-2 outline-none focus:border-black transition-colors text-xs font-bold uppercase"
                  />
                  <button 
                    type="button" 
                    onClick={addCategory}
                    className="px-4 py-2 bg-brand-sand text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-brand-brown hover:text-white transition-all"
                  >
                    Add
                  </button>
                </div>
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

            <div className="flex justify-between items-center pt-8">
              <div>
                {isEditing && (
                  <button 
                    type="button"
                    onClick={() => {
                      console.log('Delete button clicked for ID:', id);
                      handleDelete();
                    }}
                    disabled={saving}
                    className="px-6 py-4 text-red-500 text-[10px] font-black uppercase tracking-widest border border-red-200 rounded-full hover:bg-red-50 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    <Trash2 size={14} />
                    Delete Post
                  </button>
                )}
              </div>
              <div className="flex gap-4">
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
