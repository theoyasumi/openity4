"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { type Locksmith } from "@/lib/types/locksmith";
import { type City } from "@/lib/types/city";

export default function ClientLocksmithDetails({
  locksmith,
  cities,
}: {
  locksmith: Locksmith;
  cities: City[];
}) {
  const [referringCity, setReferringCity] = useState<string | null>(null);

  useEffect(() => {
    // Récupérer la ville de référence dans localStorage
    const storedCity = localStorage.getItem("referringCity");
    if (storedCity) {
      setReferringCity(storedCity);
      localStorage.removeItem("referringCity"); // On nettoie après récupération
    } else if (cities.length > 0) {
      // Si aucune ville n'est enregistrée, prendre la première ville par défaut
      setReferringCity(cities[0].name.toLowerCase());
    }
  }, [cities]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Zones d'intervention</h2>
      <div className="flex flex-wrap gap-2">
        {cities.map((city) => (
          <Link
            key={city.name}
            href={`/ville/${city.name.toLowerCase()}`}
            className="inline-flex items-center px-3 py-1 rounded-full bg-accent hover:bg-accent/80 transition-colors"
            onClick={() => localStorage.setItem("referringCity", city.name.toLowerCase())}
          >
            {city.name}
          </Link>
        ))}
      </div>

      {referringCity && (
        <div className="mt-4">
          <p className="text-muted-foreground">
            Ville sélectionnée : <span className="font-bold">{referringCity}</span>
          </p>
        </div>
      )}
    </div>
  );
}
