"use client";

import Link from "next/link";
import { type MenuCity } from "@/lib/types/navigation";

interface CitiesMegaMenuProps {
  cities: MenuCity[];
}

export function CitiesMegaMenu({ cities }: CitiesMegaMenuProps) {
  return (
    <div className="w-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {cities.map((city) => (
            <Link
              key={city.id}
              href={`/ville/${city.id}`}
              className="group relative overflow-hidden rounded-lg aspect-video"
            >
              <img
                src={city.imageUrl}
                alt={city.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">
                  {city.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}