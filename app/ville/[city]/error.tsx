"use client";

import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/icons";
import Link from "next/link";

export default function Error() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Ville non trouvée</h1>
        <p className="text-muted-foreground mb-8">
          Cette ville n'est pas encore disponible dans notre réseau.
        </p>
        <Link href="/">
          <Button>
            Retour à l'accueil
            <ArrowRightIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
}