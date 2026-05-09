import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  deleteDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Comment } from '../constants/blog';

const COLLECTION_NAME = 'comments';

export const commentService = {
  getCommentsForPost: async (postId: string) => {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('postId', '==', postId),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
      })) as Comment[];
    } catch (error) {
      console.error('Failed to fetch comments', error);
      return [];
    }
  },

  addComment: async (postId: string, authorName: string, content: string) => {
    try {
      const newComment = {
        postId,
        authorName,
        content,
        createdAt: serverTimestamp(),
      };
      const docRef = await addDoc(collection(db, COLLECTION_NAME), newComment);
      return {
        id: docRef.id,
        ...newComment,
        createdAt: new Date(), // Local fallback for immediate UI update
      };
    } catch (error) {
      console.error('Failed to add comment', error);
      throw error;
    }
  },

  deleteComment: async (commentId: string) => {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, commentId));
    } catch (error) {
      console.error('Failed to delete comment', error);
      throw error;
    }
  }
};
