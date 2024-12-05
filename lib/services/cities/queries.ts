import { db } from "@/lib/firebase";
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc,
  query,
  where,
  onSnapshot
} from "firebase/firestore";
import type { City } from "@/lib/types/city";
import { COLLECTION_NAME } from "./constants";

export async function getAllCities() {
  try {
    const citiesRef = collection(db, COLLECTION_NAME);
    const snapshot = await getDocs(citiesRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data() as City
    }));
  } catch (error) {
    console.error("Error getting cities:", error);
    throw error;
  }
}

export async function getCityById(id: string) {
  try {
    const cityRef = doc(db, COLLECTION_NAME, id);
    const cityDoc = await getDoc(cityRef);
    
    if (!cityDoc.exists()) {
      throw new Error("City not found");
    }
    
    return {
      id: cityDoc.id,
      data: cityDoc.data() as City
    };
  } catch (error) {
    console.error("Error getting city:", error);
    throw error;
  }
}

export function subscribeToCities(callback: (cities: Array<{id: string; data: City}>) => void) {
  const citiesRef = collection(db, COLLECTION_NAME);
  return onSnapshot(citiesRef, (snapshot) => {
    const cities = snapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data() as City
    }));
    callback(cities);
  });
}