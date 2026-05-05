import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { initializeFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove, serverTimestamp, collection, addDoc, deleteDoc, onSnapshot, getDocs, query, where, orderBy, limit, increment, getDocFromServer } from "firebase/firestore";

// Import the Firebase configuration
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase
console.log("Initializing Firebase with Project ID:", firebaseConfig.projectId);
console.log("Auth Domain:", firebaseConfig.authDomain);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const settings = {
  experimentalForceLongPolling: true,
};

const firestore = initializeFirestore(app, settings, firebaseConfig.firestoreDatabaseId);

/**
 * Optional initialization test. Call this from a component or useEffect to verify connectivity.
 */
export async function verifyFirestoreConnection() {
  if (typeof window === 'undefined') return;
  try {
    const testDoc = doc(firestore, 'test', 'connection');
    await getDocFromServer(testDoc);
    console.log("Firestore connection verified successfully.");
    return true;
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    if (msg.includes('offline') || msg.includes('Could not reach')) {
      console.warn("Firestore appears to be offline or unreachable:", msg);
    }
    return false;
  }
}

const googleProvider = new GoogleAuthProvider();

export { 
  auth, googleProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged,
  firestore, doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove, serverTimestamp,
  collection, addDoc, deleteDoc, onSnapshot, getDocs, query, where, orderBy, limit, increment
};

export const OperationType = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  LIST: 'list',
  GET: 'get',
  WRITE: 'write',
};

export function handleFirestoreError(error, operationType, path) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  
  // Ignore "Disconnecting idle stream" errors as they are normal SDK behavior
  if (errorMessage.includes('Disconnecting idle stream') || errorMessage.includes('Timed out waiting for new targets')) {
    console.warn('Firestore Idle Stream: ', errorMessage);
    return;
  }

  const errInfo = {
    error: errorMessage,
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
