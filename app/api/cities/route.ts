import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import type { City } from '@/lib/types/city';

export async function GET() {
  try {
    const citiesRef = collection(db, 'cities');
    const snapshot = await getDocs(citiesRef);
    
    const cities = snapshot.docs.map(doc => ({
      name: doc.data().name,
      image: doc.data().imageUrl,
      count: doc.data().count
    }));

    return NextResponse.json(cities);
  } catch (error) {
    console.error('Erreur lors de la récupération des villes:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
} 