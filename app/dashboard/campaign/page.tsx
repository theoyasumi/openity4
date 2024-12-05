"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "@/components/icons";

export default function CampaignPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Campagnes Publicitaires</h1>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Nouvelle Campagne
        </Button>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Campagne Été 2024</h3>
              <p className="text-sm text-muted-foreground">
                Statut: En cours
              </p>
            </div>
            <Button variant="outline">Gérer</Button>
          </div>
          <div className="grid gap-4">
            <div className="flex items-center justify-between text-sm">
              <span>Budget dépensé</span>
              <span className="font-medium">2,450 €</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Impressions</span>
              <span className="font-medium">45,678</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Clics</span>
              <span className="font-medium">1,234</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Campagne Printemps 2024</h3>
              <p className="text-sm text-muted-foreground">
                Statut: Planifiée
              </p>
            </div>
            <Button variant="outline">Gérer</Button>
          </div>
          <div className="grid gap-4">
            <div className="flex items-center justify-between text-sm">
              <span>Budget prévu</span>
              <span className="font-medium">5,000 €</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Date de début</span>
              <span className="font-medium">01/03/2024</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Date de fin</span>
              <span className="font-medium">31/05/2024</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}