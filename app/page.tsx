"use client";
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
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface City {
  name: string;
  image: string;
  count: string;
  available: boolean;
}

const mainCities = [
  {
    name: "Bordeaux",
    image: "https://images.pexels.com/photos/1059078/pexels-photo-1059078.jpeg",
    count: "80+ serruriers",
    available: true
  },
  {
    name: "Paris",
    image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    count: "Bientôt disponible",
    available: false
  },
  {
    name: "Marseille",
    image: "https://images.pexels.com/photos/27587788/pexels-photo-27587788/free-photo-of-mer-paysage-france-monument.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    count: "Bientôt disponible",
    available: false
  },
  {
    name: "Toulouse",
    image: "https://i0.wp.com/www.visiterama.com/wp-content/uploads/2020/03/Toulouse_vue_aerienneweb.jpg?fit=1099%2C733&ssl=1",
    count: "Bientôt disponible",
    available: false
  },
  {
    name: "Lyon",
    image: "https://res.cloudinary.com/civocracy/image/upload/communities/cover/xzj2fdrvwygnvi85pgoe",
    count: "Bientôt disponible",
    available: false
  },
  {
    name: "Lille",
    image: "https://www.carrere-promotion.com/sites/default/files/styles/custom_680x384_/public/2021-11/Lille_vue_gd_place.jpg?itok=5r5pvSIa",
    count: "Bientôt disponible",
    available: false
  }
];

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

export default function Home() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/cities')
      .then(response => response.json())
      .then(data => {
        console.log('Données reçues:', data);
        setCities(data);
      })
      .catch(error => console.error('Erreur:', error))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredCities = cities
    .filter((city) => 
      city.name.toLowerCase().includes(value.toLowerCase()) && 
      value.length >= 2
    );
  console.log('Recherche:', value, 'Résultats:', filteredCities);

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-b from-background to-accent">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            Trouvez un serrurier près de chez vous
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Des professionnels de confiance disponibles 24h/24 et 7j/7
          </p>
          
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8">
            <div className="relative flex-1">
              <Popover 
                open={value.length >= 2 && open} 
                onOpenChange={(isOpen) => {
                  if (value.length >= 2) {
                    setOpen(isOpen);
                  }
                }}
              >
                <PopoverTrigger asChild>
                  <div className="relative w-full">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Entrez votre ville ou commune..."
                      className="pl-10 h-12 w-full"
                      value={value}
                      onChange={(e) => {
                        setValue(e.target.value);
                        setOpen(e.target.value.length >= 2);
                      }}
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent 
                  className="p-0 w-full" 
                  align="start"
                  onOpenAutoFocus={(e) => e.preventDefault()}
                >
                  <Command 
                    shouldFilter={false}
                    className="border-none"
                  >
                    {isLoading ? (
                      <CommandEmpty>Chargement des villes...</CommandEmpty>
                    ) : filteredCities.length === 0 ? (
                      <CommandEmpty>Aucune ville trouvée</CommandEmpty>
                    ) : (
                      <CommandGroup>
                        {filteredCities.map((city) => (
                          <CommandItem
                            key={city.name}
                            onSelect={() => {
                              setValue(city.name);
                              document.querySelector('input')?.focus();
                              router.push(`/ville/${city.name.toLowerCase()}`);
                            }}
                            className="cursor-pointer"
                          >
                            {city.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    )}
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <Button size="lg" className="h-12" onClick={() => {
              if (value && cities.some(city => city.name.toLowerCase() === value.toLowerCase())) {
                router.push(`/ville/${value.toLowerCase()}`);
              }
            }}>
              Rechercher
              <ArrowRightIcon />
            </Button>
          </div>
        </div>
      </section>

            {/* Cities Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nos principales villes
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {mainCities.map((city) => (
              city.available ? (
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
              ) : (
                <div key={city.name} className="group">
                  <Card className="overflow-hidden">
                    <div className="relative h-48">
                      <img
                        src={city.image}
                        alt={city.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="text-center text-white">
                          <h3 className="text-2xl font-bold mb-2">{city.name}</h3>
                          <p className="text-sm">{city.count}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )
            ))}
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