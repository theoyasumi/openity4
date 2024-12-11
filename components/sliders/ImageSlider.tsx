"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageSliderProps {
  images: Array<{
    url: string;
    alt: string;
  }>;
}

export function ImageSlider({ images }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images.length) {
    return (
      <div className="w-full h-[500px] bg-accent/10 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <ImageIcon className="h-12 w-12 mx-auto mb-4" />
          <p>Aucune image disponible</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] bg-background overflow-hidden group rounded-lg">
      {/* Main Image */}
      <div className="absolute inset-0">
        <img
          src={images[currentIndex].url}
          alt={images[currentIndex].alt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="secondary"
          size="icon"
          className="h-10 w-10 rounded-full bg-white/90 hover:bg-white"
          onClick={goToPrevious}
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="h-10 w-10 rounded-full bg-white/90 hover:bg-white"
          onClick={goToNext}
        >
          <ChevronRightIcon className="h-6 w-6" />
        </Button>
      </div>

      {/* Image Counter */}
      <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Thumbnail Navigation */}
      <div className="absolute bottom-4 left-4 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              currentIndex === index
                ? "bg-white w-4"
                : "bg-white/50 hover:bg-white/80"
            )}
          >
            <span className="sr-only">Image {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}