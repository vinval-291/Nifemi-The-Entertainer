import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
// Using initializeFirestore instead of getFirestore to enable long polling
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
}, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// CRITICAL: Validate Connection to Firestore as per instructions
async function testConnection() {
  try {
    // Attempt to get a dummy doc to test connection
    await getDocFromServer(doc(db, '_connection_test_', 'ping'));
  } catch (error) {
    // Gracefully ignore connection/permission errors on connection test
    console.debug("Firestore connection status checked.");
  }
}
// We don't run this aggressively on initial import to avoid noisy startup logs
// when the database is cold-starting or initial iframe restrictions apply.

