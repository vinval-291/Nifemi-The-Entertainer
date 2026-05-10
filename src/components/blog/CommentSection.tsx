import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, Trash2, User } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { commentService } from '../../services/commentService';
import { Comment } from '../../constants/blog';
import { auth } from '../../lib/firebase';
import { isUserAdmin } from '../../constants/admin';

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      const data = await commentService.getCommentsForPost(postId);
      setComments(data);
      setLoading(false);
    };

    fetchComments();
    
    // Subscribe to auth state changes for admin privileges
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdmin(isUserAdmin(user?.email));
    });

    return () => unsubscribe();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !content.trim()) return;

    setSubmitting(true);
    try {
      await commentService.addComment(postId, authorName, content);
      setAuthorName('');
      setContent('');
      // Refresh comments
      const updatedComments = await commentService.getCommentsForPost(postId);
      setComments(updatedComments);
    } catch (error) {
      alert('Failed to post comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!window.confirm('Delete this comment?')) return;
    try {
      await commentService.deleteComment(commentId);
      setComments(prev => prev.filter(c => c.id !== commentId));
    } catch (error) {
      alert('Failed to delete comment.');
    }
  };

  return (
    <div className="mt-24 pt-12 border-t border-brand-sand">
      <div className="flex items-center justify-between mb-12">
        <h3 className="text-2xl font-display font-black uppercase tracking-tight flex items-center gap-3">
          <MessageSquare size={24} className="text-brand-brown" />
          Discussions <span className="text-brand-brown/40">({comments.length})</span>
        </h3>
      </div>

      {/* Comment Form */}
      <div className="bg-brand-beige border border-brand-sand rounded-3xl p-8 mb-16">
        <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-brown/60 mb-6">Join the conversation</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[8px] font-black uppercase tracking-widest text-gray-400 ml-1">Your Name</label>
              <input 
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-white border border-brand-sand rounded-xl px-4 py-3 text-xs outline-none focus:border-brand-brown transition-colors"
                maxLength={50}
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[8px] font-black uppercase tracking-widest text-gray-400 ml-1">Comment</label>
            <textarea 
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What are your thoughts?"
              rows={4}
              className="w-full bg-white border border-brand-sand rounded-2xl px-4 py-3 text-xs outline-none focus:border-brand-brown transition-colors resize-none"
              maxLength={1000}
            />
          </div>
          <div className="flex justify-end">
            <button 
              type="submit" 
              disabled={submitting}
              className="btn-primary flex items-center gap-2"
            >
              <Send size={14} />
              {submitting ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-pulse inline-block bg-brand-sand/20 px-6 py-2 rounded-full text-brand-brown text-[10px] font-black uppercase tracking-widest">
              Loading comments...
            </div>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-brand-sand rounded-3xl">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">No comments yet. Be the first to speak!</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {comments.map((comment) => (
              <motion.div 
                key={comment.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex gap-4 group"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-sand/30 flex items-center justify-center text-brand-brown">
                  <User size={18} />
                </div>
                <div className="flex-grow bg-white border border-brand-sand p-6 rounded-3xl group-hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-brand-brown">{comment.authorName}</h5>
                    <div className="flex items-center gap-4">
                      <span className="text-[8px] font-bold text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                      {isAdmin && (
                        <button 
                          onClick={() => handleDelete(comment.id)}
                          className="text-red-400 hover:text-red-600 transition-colors"
                          title="Delete Comment"
                        >
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{comment.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
