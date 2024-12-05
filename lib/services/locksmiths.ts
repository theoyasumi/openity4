import { db } from "@/lib/firebase";
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  Timestamp,
  addDoc
} from "firebase/firestore";
import type { Locksmith } from "@/lib/types/locksmith";

const COLLECTION_NAME = "locksmiths";

export async function getAllLocksmiths() {
  try {
    const locksmithsRef = collection(db, COLLECTION_NAME);
    const snapshot = await getDocs(locksmithsRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Locksmith[];
  } catch (error) {
    console.error("Error getting locksmiths:", error);
    throw error;
  }
}

export async function getLocksmithById(id: string) {
  try {
    const locksmithRef = doc(db, COLLECTION_NAME, id);
    const locksmithDoc = await getDoc(locksmithRef);
    
    if (!locksmithDoc.exists()) {
      throw new Error("Locksmith not found");
    }
    
    return {
      id: locksmithDoc.id,
      ...locksmithDoc.data()
    } as Locksmith;
  } catch (error) {
    console.error("Error getting locksmith:", error);
    throw error;
  }
}

export async function getLocksmithByUserId(userId: string) {
  try {
    const locksmithsRef = collection(db, COLLECTION_NAME);
    const q = query(locksmithsRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      return null;
    }
    
    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data()
    } as Locksmith;
  } catch (error) {
    console.error("Error getting locksmith by userId:", error);
    throw error;
  }
}

export async function createLocksmith(data: Omit<Locksmith, 'id'>) {
  try {
    // Check if a locksmith already exists with this userId
    if (data.userId) {
      const existingLocksmith = await getLocksmithByUserId(data.userId);
      if (existingLocksmith) {
        throw new Error("Un serrurier existe déjà pour cet utilisateur");
      }
    }

    const locksmithsRef = collection(db, COLLECTION_NAME);
    const docRef = await addDoc(locksmithsRef, {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    
    return {
      id: docRef.id,
      ...data
    } as Locksmith;
  } catch (error) {
    console.error("Error creating locksmith:", error);
    throw error;
  }
}

export async function updateLocksmith(id: string, data: Partial<Locksmith>) {
  try {
    // If userId is being updated, check for existing locksmith
    if (data.userId) {
      const existingLocksmith = await getLocksmithByUserId(data.userId);
      if (existingLocksmith && existingLocksmith.id !== id) {
        throw new Error("Un serrurier existe déjà pour cet utilisateur");
      }
    }

    const locksmithRef = doc(db, COLLECTION_NAME, id);
    const updateData = {
      ...data,
      updatedAt: Timestamp.now(),
    };
    
    await updateDoc(locksmithRef, updateData);
    
    return {
      id,
      ...data
    } as Locksmith;
  } catch (error) {
    console.error("Error updating locksmith:", error);
    throw error;
  }
}

export async function deleteLocksmith(id: string) {
  try {
    const locksmithRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(locksmithRef);
    return id;
  } catch (error) {
    console.error("Error deleting locksmith:", error);
    throw error;
  }
}

export function subscribeToLocksmiths(callback: (locksmiths: Locksmith[]) => void) {
  const locksmithsRef = collection(db, COLLECTION_NAME);
  return onSnapshot(locksmithsRef, (snapshot) => {
    const locksmiths = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Locksmith[];
    callback(locksmiths);
  });
}