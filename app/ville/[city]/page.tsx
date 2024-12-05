import { getCityById } from "@/lib/services/cities";
import { getAllLocksmiths } from "@/lib/services/locksmiths";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowRightIcon } from "@/components/icons";
import { notFound } from "next/navigation";
import { getAllCities } from "@/lib/services/cities";
import { LocksmithLink } from "./LocksmithLink";

export async function generateStaticParams() {
  // Récupère toutes les villes depuis Firestore
  const cities = await getAllCities();
  return cities.map((city) => ({
    city: city.id, // Utilise l'ID unique de la ville comme paramètre
  }));
}

export const revalidate = 60; // ISR : Revalider toutes les 60 secondes

export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
  const city = await getCityById(params.city);
  if (!city) {
    return {
      title: "Ville non trouvée",
    };
  }
  return {
    title: `Serruriers à ${city.data.name}`,
    description: city.data.introduction || `Découvrez les meilleurs serruriers disponibles à ${city.data.name}.`,
  };
}

export default async function CityPage({ params }: { params: { city: string } }) {
  // Récupérer les données de la ville
  const city = await getCityById(params.city);
  if (!city) {
    notFound(); // Retourne une page 404 si la ville n'existe pas
  }

  // Récupérer les serruriers associés à la ville
  const allLocksmiths = await getAllLocksmiths();
  const locksmiths = allLocksmiths.filter((locksmith) =>
    locksmith.cities.includes(params.city)
  );

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-b from-background to-accent">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            Serruriers à {city.data.name}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            {city.data.introduction}
          </p>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8">
            <Input
              type="text"
              placeholder="Type de service..."
              className="pl-10 h-12"
            />
            <Input
              type="text"
              placeholder="Quartier"
              className="h-12 sm:max-w-[200px]"
              defaultValue={city.data.name}
            />
            <Button size="lg" className="h-12">
              Rechercher
              <ArrowRightIcon />
            </Button>
          </div>
        </div>
      </section>

      {/* Locksmiths Section */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Serruriers disponibles à {city.data.name}
          </h2>

          {locksmiths.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">
                Désolé, nous n'avons aucun serrurier dans ces environs.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {locksmiths.map((locksmith) => (
                <Card key={locksmith.id} className="overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold">{locksmith.name}</h3>
                    <div className="mt-6 flex items-center justify-between">
                      <LocksmithLink 
                        href={`/serrurier/${locksmith.id}`}
                        cityId={params.city}
                      >
                        <Button>
                          Voir le profil
                          <ArrowRightIcon />
                        </Button>
                      </LocksmithLink>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 px-4 bg-accent/50">
        <div className="max-w-4xl mx-auto prose prose-neutral dark:prose-invert">
          <div dangerouslySetInnerHTML={{ __html: city.data.mainContent }} />

          <h3 className="text-2xl font-semibold mb-4">Zones d'intervention</h3>
          <div className="flex flex-wrap gap-2 mb-8">
            {city.data.linkedCities.map((linkedCityId) => (
              <Link
                key={linkedCityId}
                href={`/ville/${linkedCityId}`}
                className="inline-flex items-center px-3 py-1 rounded-full bg-accent hover:bg-accent/80 transition-colors"
              >
                {linkedCityId}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

