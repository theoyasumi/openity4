import { getLocksmithById } from "@/lib/services/locksmiths";
import { getCityById } from "@/lib/services/cities";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ImageSlider } from "@/components/sliders/ImageSlider";

import { 
  PhoneIcon, 
  MapPinIcon, 
  ClockIcon, 
  StarIcon, 
  CheckCircleIcon,
  ShieldCheckIcon,
  ThumbsUpIcon,
  MessageSquareIcon
} from "lucide-react";

export default async function LocksmithProfilePage({ 
  params,
  searchParams 
}: { 
  params: { id: string };
  searchParams: { from?: string }
}) {
  const locksmith = await getLocksmithById(params.id);
  if (!locksmith) {
    notFound();
  }

  // Get city data
  const cities = await Promise.all(
    locksmith.cities.map(async (cityId: string) => {
      const cityData = await getCityById(cityId);
      return cityData.data;
    })
  );

  // Example images - in production these would come from your database
  const images = [
    {
      url: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=2000",
      alt: "Atelier de serrurerie professionnel"
    },
    {
      url: "https://images.unsplash.com/photo-1584184924103-e310d9dc82fc?q=80&w=2000",
      alt: "Installation de serrure"
    },
    {
      url: "https://images.unsplash.com/photo-1578167635648-df79e1565908?q=80&w=2000",
      alt: "Équipement professionnel"
    }
  ];

  const reviews = [
    {
      id: 1,
      author: "Marie D.",
      rating: 5,
      date: "Il y a 2 semaines",
      content: "Intervention rapide et professionnelle. Le serrurier est arrivé en moins de 20 minutes pour une ouverture de porte. Travail soigné et prix raisonnable.",
      city: "Paris 15ème"
    },
    {
      id: 2,
      author: "Thomas L.",
      rating: 5,
      date: "Il y a 1 mois",
      content: "Excellent service ! J'ai fait appel à ce serrurier pour l'installation d'une serrure haute sécurité. Il m'a très bien conseillé et le travail est impeccable.",
      city: "Paris 12ème"
    },
    {
      id: 3,
      author: "Sophie M.",
      rating: 4,
      date: "Il y a 2 mois",
      content: "Très bon professionnel, disponible et efficace. Je recommande pour tout type d'intervention en serrurerie.",
      city: "Paris 8ème"
    }
  ];

  const stats = [
    { label: "Interventions", value: "2,500+" },
    { label: "Années d'expérience", value: "15+" },
    { label: "Avis clients", value: "4.8/5" },
    { label: "Délai moyen", value: "25 min" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Quick Actions Bar */}
      <div className="sticky top-0 z-50 bg-background border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold">{locksmith.name}</h1>
              <Badge variant="secondary" className="font-medium">
                Pro certifié
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <Button size="sm" variant="outline">
                <MessageSquareIcon className="h-4 w-4 mr-2" />
                Contacter
              </Button>
              <Button size="sm">
                <PhoneIcon className="h-4 w-4 mr-2" />
                {locksmith.phone}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-7 xl:col-span-8">
            {/* About Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">À propos</h2>
              <div className="prose prose-neutral dark:prose-invert">
                {locksmith.description}
              </div>
            </section>

            {/* Services Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Services</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {locksmith.services.map((service) => (
                  <Card key={service} className="p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircleIcon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{service}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Reviews Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Avis clients</h2>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <Card key={review.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{review.author}</span>
                          <span className="text-sm text-muted-foreground">
                            {review.city}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <StarIcon
                              key={i}
                              className="h-4 w-4 text-yellow-400 fill-current"
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {review.date}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{review.content}</p>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Slider and Info */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6 mt-8 lg:mt-0">
            {/* Image Slider */}
            <div className="sticky top-24">
              <ImageSlider images={images} />

              {/* Stats Card */}
              <Card className="p-6 mt-6">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Working Hours */}
              <Card className="p-6 mt-6">
                <h3 className="text-lg font-semibold mb-4">Horaires</h3>
                {locksmith.workingHours.is24h ? (
                  <div className="flex items-center gap-2 text-primary">
                    <ClockIcon className="h-5 w-5" />
                    <span className="font-medium">Disponible 24h/24 et 7j/7</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {Object.entries(locksmith.workingHours.schedule || {}).map(([day, hours]) => (
                      <div key={day} className="flex justify-between text-sm">
                        <span className="capitalize">{day}</span>
                        <span className="font-medium">{hours}</span>
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              {/* Contact Card */}
              <Card className="p-6 mt-6 bg-primary/5 border-primary/10">
                <h3 className="text-lg font-semibold mb-4">Contact direct</h3>
                <div className="space-y-4">
                  <Button className="w-full gap-2">
                    <PhoneIcon className="h-4 w-4" />
                    {locksmith.phone}
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageSquareIcon className="h-4 w-4 mr-2" />
                    Envoyer un message
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}