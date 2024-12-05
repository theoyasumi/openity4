"use client";

import { useState, useEffect } from 'react';
import { 
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { User, AuthState, FirestoreUser } from '@/lib/types/auth';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        try {
          // Get additional user data from Firestore
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data() as FirestoreUser;
            setAuthState({
              user: {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL,
                role: userData.role,
              },
              loading: false,
              error: null,
            });
          } else {
            // If user document doesn't exist yet, create it
            const newUserData: FirestoreUser = {
              email: firebaseUser.email || '',
              role: 'serrurier',
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            
            await setDoc(userDocRef, newUserData);
            
            setAuthState({
              user: {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL,
                role: newUserData.role,
              },
              loading: false,
              error: null,
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setAuthState({
            user: null,
            loading: false,
            error: 'Failed to fetch user data',
          });
        }
      } else {
        setAuthState({
          user: null,
          loading: false,
          error: null,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: 'Failed to sign in',
      }));
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;

      // Create user document in Firestore
      const userData: FirestoreUser = {
        email: email,
        role: 'serrurier',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await setDoc(doc(db, 'users', user.uid), userData);
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: 'Failed to create account',
      }));
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setAuthState({
        user: null,
        loading: false,
        error: null,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: 'Failed to sign out',
      }));
      throw error;
    }
  };

  return {
    user: authState.user,
    loading: authState.loading,
    error: authState.error,
    signIn,
    signUp,
    signOut,
  };
}