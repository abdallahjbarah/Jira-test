import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

let firebaseConfig: any = null;
let app: any = null;
let auth: any = null;

export const getFirebaseConfig = async () => {
  if (firebaseConfig) return firebaseConfig;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/firebase/config`
    );
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    firebaseConfig = await response.json();
    return firebaseConfig;
  } catch (error) {
    throw error;
  }
};

export const initializeFirebase = async () => {
  if (app) return { app, auth };

  try {
    const config = await getFirebaseConfig();

    if (!getApps().length) {
      app = initializeApp(config);
    } else {
      app = getApps()[0];
    }

    auth = getAuth(app);
    return { app, auth };
  } catch (error) {
    throw error;
  }
};

export const getFirebaseAuth = async () => {
  if (!auth) {
    await initializeFirebase();
  }
  return auth;
};
