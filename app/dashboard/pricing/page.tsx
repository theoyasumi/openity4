"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function CheckIcon({ className = "h-6 w-6" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function PricingPage() {
  const plans = [
    {
      name: "Gratuit",
      price: "0",
      description: "Parfait pour démarrer et être visible dans l'annuaire",
      features: [
        "Fiche entreprise de base",
        "Affichage dans l'annuaire",
        "Informations de contact",
        "Horaires d'ouverture",
      ],
      current: true,
    },
    {
      name: "Essentiel",
      price: "29",
      description: "Idéal pour augmenter votre visibilité et gérer votre réputation",
      features: [
        "Tout du pack Gratuit",
        "Badge 'Recommandé'",
        "Gestion des avis clients",
        "Affichage prioritaire",
        "Support prioritaire",
      ],
      popular: true,
    },
    {
      name: "Premium",
      price: "59",
      description: "Pour les professionnels qui veulent maximiser leur présence",
      features: [
        "Tout du pack Essentiel",
        "Widget carte Google",
        "Jusqu'à 10 localisations",
        "Visibilité prioritaire maximale",
        "Lien vers votre site web",
        "Support dédié",
      ],
    },
  ];

  return (
    <div className="py-8 max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Choisissez votre formule</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Des solutions adaptées à vos besoins. Changez de formule à tout moment.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative p-8 ${
              plan.popular
                ? "ring-2 ring-primary"
                : ""
            }`}
          >
            {plan.popular && (
              <Badge
                className="absolute top-0 right-0 transform translate-x-2 -translate-y-2"
                variant="default"
              >
                Le plus populaire
              </Badge>
            )}

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">{plan.price}€</span>
                {plan.price !== "0" && (
                  <span className="text-muted-foreground">/mois</span>
                )}
              </div>
              <p className="text-muted-foreground text-sm">
                {plan.description}
              </p>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-primary shrink-0 mr-2" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              className="w-full"
              variant={plan.current ? "outline" : plan.popular ? "default" : "secondary"}
              disabled={plan.current}
            >
              {plan.current ? "Formule actuelle" : "Choisir cette formule"}
            </Button>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground">
          Besoin d'une solution personnalisée ? {" "}
          <Button variant="link" className="p-0">
            Contactez-nous
          </Button>
        </p>
      </div>
    </div>
  );
}