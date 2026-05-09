import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  where,
  serverTimestamp,
  Timestamp,
  limit
} from 'firebase/firestore';
import { db } from '../lib/firebase';

const COLLECTION_NAME = 'analytics';

export interface AnalyticsEvent {
  id?: string;
  type: 'page_view' | 'session_start';
  path: string;
  timestamp: any;
  visitorId: string;
  userAgent: string;
  platform: string;
}

// Simple visitor ID persistent in session storage
const getVisitorId = () => {
  let id = localStorage.getItem('visitor_id');
  if (!id) {
    id = 'v_' + Math.random().toString(36).substring(2, 11);
    localStorage.setItem('visitor_id', id);
  }
  return id;
};

export const analyticsService = {
  trackPageView: async (path: string) => {
    try {
      // Don't track admin pages or specific dev paths if needed
      if (path.startsWith('/admin') || path.startsWith('/login')) return;

      await addDoc(collection(db, COLLECTION_NAME), {
        type: 'page_view',
        path,
        timestamp: serverTimestamp(),
        visitorId: getVisitorId(),
        userAgent: navigator.userAgent,
        platform: navigator.platform,
      });
    } catch (error) {
      console.warn('Analytics tracking failed', error);
    }
  },

  getTotalVisitorsCount: async () => {
    try {
      const q = query(collection(db, COLLECTION_NAME));
      const snapshot = await getDocs(q);
      const visitorIds = new Set(snapshot.docs.map(doc => doc.data().visitorId));
      return visitorIds.size;
    } catch (error) {
      console.error('Failed to fetch total visitors', error);
      return 0;
    }
  },

  getRecentStats: async (days: number = 7) => {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      
      const q = query(
        collection(db, COLLECTION_NAME),
        where('timestamp', '>=', Timestamp.fromDate(startDate)),
        orderBy('timestamp', 'desc')
      );
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as AnalyticsEvent[];
    } catch (error) {
      console.error('Failed to fetch analytics', error);
      return [];
    }
  }
};
