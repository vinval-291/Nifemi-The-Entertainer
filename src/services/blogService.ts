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

const DELETED_POSTS_KEY = 'deleted_blog_posts';

function getDeletedPostIds(): string[] {
  try {
    return JSON.parse(localStorage.getItem(DELETED_POSTS_KEY) || '[]');
  } catch {
    return [];
  }
}

function addDeletedPostId(id: string | number) {
  try {
    const ids = getDeletedPostIds();
    const strId = String(id);
    if (!ids.includes(strId)) {
      ids.push(strId);
      localStorage.setItem(DELETED_POSTS_KEY, JSON.stringify(ids));
    }
  } catch (error) {
    console.error('Failed to save deleted post ID to localStorage', error);
  }
}

export const blogService = {
  async getAllPosts(): Promise<BlogPost[]> {
    const deletedIds = getDeletedPostIds();
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const dbPosts = snapshot.docs
        .map(doc => {
          const data = doc.data();
          const categories = data.categories || (data.category ? [data.category] : []);
          const { category, ...rest } = data;
          return {
            id: doc.id as any,
            ...rest,
            categories,
            status: data.status || 'published', // Fallback for old docs
            createdAt: data.createdAt?.toDate?.() || data.createdAt,
            updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
          } as unknown as BlogPost;
        })
        .filter(post => !deletedIds.includes(String(post.id)));

      // Combine with static posts, ensuring no duplicates by slug and omitting deleted ones
      const allPosts = [...dbPosts];
      BLOG_POSTS.forEach(staticPost => {
        const isDeleted = deletedIds.includes(String(staticPost.id));
        if (!isDeleted && !allPosts.some(p => p.slug === staticPost.slug)) {
          allPosts.push(staticPost);
        }
      });

      return allPosts;
    } catch (error) {
      console.warn('Firestore failed, falling back to static posts:', error);
      return BLOG_POSTS.filter(post => !deletedIds.includes(String(post.id)));
    }
  },

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const deletedIds = getDeletedPostIds();
    try {
      // First check static posts
      const staticPost = BLOG_POSTS.find(p => p.slug === slug);
      if (staticPost) {
        if (deletedIds.includes(String(staticPost.id))) return null;
        return staticPost;
      }

      // Then check DB
      const q = query(collection(db, COLLECTION_NAME));
      const snapshot = await getDocs(q);
      const dbDoc = snapshot.docs.find(d => d.data().slug === slug && !deletedIds.includes(String(d.id)));
      
      if (!dbDoc) return null;
      
      const data = dbDoc.data();
      const categories = data.categories || (data.category ? [data.category] : []);
      const { category, ...rest } = data;
      return {
        id: dbDoc.id as any,
        ...rest,
        categories,
        status: data.status || 'published', // Fallback
      } as unknown as BlogPost;
    } catch (error) {
      const staticPost = BLOG_POSTS.find(p => p.slug === slug);
      if (staticPost && !deletedIds.includes(String(staticPost.id))) return staticPost;
      return null;
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

  async deletePost(id: string | number): Promise<void> {
    addDeletedPostId(id);
    const isStatic = !isNaN(Number(id));
    if (!isStatic) {
      try {
        const docRef = doc(db, COLLECTION_NAME, String(id));
        await deleteDoc(docRef);
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `${COLLECTION_NAME}/${id}`);
      }
    }
  }
};
