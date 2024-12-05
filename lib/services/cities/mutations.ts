import { db } from "@/lib/firebase";
import { 
  doc, 
  getDoc,
  setDoc, 
  updateDoc, 
  deleteDoc
} from "firebase/firestore";
import type { City } from "@/lib/types/city";
import { COLLECTION_NAME } from "./constants";
import { generateSlug } from "./utils";

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
      },
      nearbyAreas: cityData.nearbyAreas || []
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