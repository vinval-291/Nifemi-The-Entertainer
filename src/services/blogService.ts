import { 
  collection, 
  getDocs, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  serverTimestamp,
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { BlogPost, BLOG_POSTS } from '../constants/blog';

// Enum for operations as per Firebase instructions
enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const COLLECTION_NAME = 'blogPosts';

export const blogService = {
  async getAllPosts(): Promise<BlogPost[]> {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const dbPosts = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id as any,
          ...data,
          status: data.status || 'published', // Fallback for old docs
          createdAt: data.createdAt?.toDate?.() || data.createdAt,
          updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
        } as unknown as BlogPost;
      });

      // Combine with static posts, ensuring no duplicates by slug
      const allPosts = [...dbPosts];
      BLOG_POSTS.forEach(staticPost => {
        if (!allPosts.some(p => p.slug === staticPost.slug)) {
          allPosts.push(staticPost);
        }
      });

      return allPosts;
    } catch (error) {
      console.warn('Firestore failed, falling back to static posts:', error);
      return BLOG_POSTS;
    }
  },

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      // First check static posts
      const staticPost = BLOG_POSTS.find(p => p.slug === slug);
      if (staticPost) return staticPost;

      // Then check DB
      const q = query(collection(db, COLLECTION_NAME));
      const snapshot = await getDocs(q);
      const dbDoc = snapshot.docs.find(d => d.data().slug === slug);
      
      if (!dbDoc) return null;
      
      const data = dbDoc.data();
      return {
        id: dbDoc.id as any,
        ...data,
        status: data.status || 'published', // Fallback
      } as unknown as BlogPost;
    } catch (error) {
      const staticPost = BLOG_POSTS.find(p => p.slug === slug);
      return staticPost || null;
    }
  },

  async createPost(post: Omit<BlogPost, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...post,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, COLLECTION_NAME);
      return '';
    }
  },

  async updatePost(id: string, post: Partial<BlogPost>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        ...post,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${COLLECTION_NAME}/${id}`);
    }
  },

  async deletePost(id: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${COLLECTION_NAME}/${id}`);
    }
  }
};
