import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { getFirebaseAuth } from './config';
import { SSOProvider } from '@/lib/types';

const createProvider = (providerName: string) => {
  switch (providerName.toLowerCase()) {
    case 'google':
      const googleProvider = new GoogleAuthProvider();
      googleProvider.addScope('email');
      googleProvider.addScope('profile');
      return googleProvider;

    case 'facebook':
      const facebookProvider = new FacebookAuthProvider();
      facebookProvider.addScope('email');
      return facebookProvider;

    case 'apple':
      const appleProvider = new OAuthProvider('apple.com');
      appleProvider.addScope('email');
      appleProvider.addScope('name');
      return appleProvider;

    default:
      throw new Error(`auth.firebase.unsupportedProvider: ${providerName}`);
  }
};

export const signInWithProvider = async (
  providerName: string,
): Promise<SSOProvider> => {
  try {
    const auth = await getFirebaseAuth();
    const provider = createProvider(providerName);

    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();

    return {
      provider: providerName as 'google' | 'facebook' | 'apple',
      idToken,
      user: result.user,
    };
  } catch (error: any) {
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('auth.firebase.signInCancelled');
    } else if (error.code === 'auth/popup-blocked') {
      throw new Error('auth.firebase.popupBlocked');
    } else if (error.code === 'auth/unauthorized-domain') {
      throw new Error('auth.firebase.unauthorizedDomain');
    }

    throw new Error(`auth.firebase.signInFailed ${providerName}`);
  }
};

export const signOut = async (): Promise<void> => {
  const auth = await getFirebaseAuth();
  await firebaseSignOut(auth);
};
