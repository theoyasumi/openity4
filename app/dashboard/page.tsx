"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { 
  CampaignIcon, 
  PriceTagIcon, 
  HelpCircleIcon, 
  MapPinIcon, 
  KeyIcon,
  FileTextIcon 
} from "@/components/icons";

interface NavigationGroup {
  title: string;
  items: {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
  }[];
}

export default function DashboardPage() {
  const { user } = useAuth();

  const getNavigationGroups = (): NavigationGroup[] => {
    let groups: NavigationGroup[] = [];

    if (user?.role === "serrurier") {
      groups.push({
        title: "Mon Espace Serrurier",
        items: [
          {
            name: "Ma fiche serrurier",
            href: "/dashboard/my-profile",
            icon: FileTextIcon,
            description: "Gérez votre profil professionnel et vos informations de contact"
          }
        ]
      });
    }

    if (user?.role === "admin") {
      groups.push({
        title: "Administration",
        items: [
          {
            name: "Gestion des villes",
            href: "/dashboard/cities",
            icon: MapPinIcon,
            description: "Gérez les villes couvertes par notre réseau de serruriers"
          },
          {
            name: "Gestion des serruriers",
            href: "/dashboard/locksmiths",
            icon: KeyIcon,
            description: "Administrez les fiches des serruriers partenaires"
          }
        ]
      });
    }

    groups.push(
      {
        title: "Publicité et Marketing",
        items: [
          {
            name: "Campagne Publicitaire",
            href: "/dashboard/campaign",
            icon: CampaignIcon,
            description: "Gérez vos campagnes publicitaires et suivez leurs performances en temps réel"
          },
          {
            name: "Tarifs",
            href: "/dashboard/pricing",
            icon: PriceTagIcon,
            description: "Consultez nos différentes offres et forfaits publicitaires"
          }
        ]
      },
      {
        title: "Aide et Support",
        items: [
          {
            name: "Comment ça marche ?",
            href: "/dashboard/help",
            icon: HelpCircleIcon,
            description: "Guides et tutoriels pour tirer le meilleur parti de nos services"
          }
        ]
      }
    );

    return groups;
  };

  const navigationGroups = getNavigationGroups();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="text-muted-foreground mt-2">
          Bienvenue {user?.email} ! Gérez votre activité depuis votre espace personnel.
        </p>
      </div>

      <div className="space-y-10">
        {navigationGroups.map((group, index) => (
          <div key={index}>
            <h2 className="text-xl font-semibold mb-4">{group.title}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href}>
                    <Card className="p-6 hover:bg-accent/50 transition-colors cursor-pointer h-full">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}