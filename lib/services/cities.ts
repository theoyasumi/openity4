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
  onSnapshot
} from "firebase/firestore";
import type { City } from "@/lib/types/city";

const COLLECTION_NAME = "cities";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

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

export async function createCity(cityData: City) {
  try {
    const slug = generateSlug(cityData.name);
    const cityRef = doc(db, COLLECTION_NAME, slug);
    
    const existingCity = await getDoc(cityRef);
    if (existingCity.exists()) {
      throw new Error("Une ville avec ce nom existe déjà");
    }
    
    const cityWithDefaults: City = {
      ...cityData,
      content: {
        services: cityData.content?.services || [],
        prices: cityData.content?.prices || [],
        testimonial: cityData.content?.testimonial || { text: "", author: "" }
      }
    };
    
    await setDoc(cityRef, cityWithDefaults);
    return {
      id: slug,
      data: cityWithDefaults
    };
  } catch (error) {
    console.error("Error creating city:", error);
    throw error;
  }
}

export async function updateCity(id: string, cityData: Partial<City>) {
  try {
    if (cityData.name) {
      const newSlug = generateSlug(cityData.name);
      if (newSlug !== id) {
        const newCityRef = doc(db, COLLECTION_NAME, newSlug);
        const oldCityRef = doc(db, COLLECTION_NAME, id);
        
        const oldCityDoc = await getDoc(oldCityRef);
        if (!oldCityDoc.exists()) {
          throw new Error("City not found");
        }
        
        const updatedData = { ...oldCityDoc.data(), ...cityData };
        await setDoc(newCityRef, updatedData);
        await deleteDoc(oldCityRef);
        
        return {
          id: newSlug,
          data: updatedData as City
        };
      }
    }
    
    const cityRef = doc(db, COLLECTION_NAME, id);
    const cityDoc = await getDoc(cityRef);
    
    if (!cityDoc.exists()) {
      throw new Error("City not found");
    }
    
    const updatedData = { ...cityDoc.data(), ...cityData };
    await updateDoc(cityRef, updatedData);
    
    return {
      id,
      data: updatedData as City
    };
  } catch (error) {
    console.error("Error updating city:", error);
    throw error;
  }
}

export async function deleteCity(id: string) {
  try {
    const cityRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(cityRef);
    return id;
  } catch (error) {
    console.error("Error deleting city:", error);
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