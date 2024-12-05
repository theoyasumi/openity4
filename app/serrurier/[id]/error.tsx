"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Serrurier non trouvé</h1>
        <p className="text-muted-foreground mb-8">
          Ce profil n'est pas disponible.
        </p>
        <Link href="/">
          <Button>Retour à l'accueil</Button>
        </Link>
      </div>
    </div>
  );
}