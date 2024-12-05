"use client";

import { useState } from "react";
import { XIcon } from "@/components/icons";

export function PromoBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-red-400 text-primary-foreground">
      <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-center flex-1">
            Un compte <b>Essentiel</b> offert à nos 100 premiers inscrits pendant 1 an 🎉🎁
          </p>
          <button
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0 ml-4 p-1 rounded-full hover:bg-primary-foreground/10 transition-colors"
            aria-label="Fermer"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}