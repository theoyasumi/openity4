import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchIcon, ArrowRightIcon } from "@/components/icons";

const features = [
  {
    title: "Intervention rapide",
    description: "Nos serruriers interviennent en urgence 24h/24 et 7j/7",
  },
  {
    title: "Professionnels certifiés",
    description: "Tous nos artisans sont qualifiés et expérimentés",
  },
  {
    title: "Tarifs transparents",
    description: "Prix fixes et devis gratuits sans engagement",
  }
];

const cities = [
  {
    name: "Paris",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop",
    count: "250+ serruriers"
  },
  {
    name: "Lyon",
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?q=80&w=2069&auto=format&fit=crop",
    count: "120+ serruriers"
  },
  {
    name: "Bordeaux",
    image: "https://images.unsplash.com/photo-1589028699382-19d2669ddced?q=80&w=2070&auto=format&fit=crop",
    count: "80+ serruriers"
  }
];

const specialties = [
  { value: "urgence", label: "Urgence 24/7" },
  { value: "ouverture", label: "Ouverture de porte" },
  { value: "blindage", label: "Blindage et sécurisation" },
  { value: "serrure", label: "Installation de serrure" },
  { value: "coffre", label: "Ouverture de coffre-fort" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-b from-background to-accent">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            Trouvez un serrurier près de chez vous
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Des professionnels qualifiés disponibles 24h/24 et 7j/7
          </p>
          
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input 
                type="text" 
                placeholder="Entrez votre ville..." 
                className="pl-10 h-12"
              />
            </div>
            <Select>
              <SelectTrigger className="h-12 sm:w-[200px]">
                <SelectValue placeholder="Spécialité" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty.value} value={specialty.value}>
                    {specialty.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button size="lg" className="h-12">
              Rechercher
              <ArrowRightIcon />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Pourquoi choisir nos serruriers ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="py-16 px-4 bg-accent/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nos principales villes
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {cities.map((city) => (
              <Link 
                key={city.name} 
                href={`/ville/${city.name.toLowerCase()}`}
                className="group"
              >
                <Card className="overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={city.image}
                      alt={city.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="text-center text-white">
                        <h3 className="text-2xl font-bold mb-2">{city.name}</h3>
                        <p className="text-sm">{city.count}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Vous êtes serrurier ?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Rejoignez notre réseau de professionnels et développez votre activité
          </p>
          <Link href="/signup">
            <Button size="lg">
              Inscrivez-vous gratuitement
              <ArrowRightIcon />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}