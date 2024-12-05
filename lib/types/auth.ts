export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role?: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface FirestoreUser {
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  displayName?: string;
  photoURL?: string;
  phone?: string;
  company?: string;
}