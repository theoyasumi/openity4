import { getLocksmithById, getAllLocksmiths } from "@/lib/services/locksmiths";
import { getCityById } from "@/lib/services/cities";
import { notFound } from "next/navigation";
import ClientLocksmithDetails from "@/components/ClientLocksmithDetails";
import { Metadata } from "next";

export async function generateStaticParams() {
  // Utilise la fonction existante pour récupérer tous les serruriers
  const locksmiths = await getAllLocksmiths();
  return locksmiths.map((locksmith) => ({
    id: locksmith.id,
  }));
}

export const revalidate = 60; // ISR : Revalider toutes les 60 secondes

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const locksmith = await getLocksmithById(params.id);
  if (!locksmith) {
    return {
      title: "Serrurier non trouvé",
    };
  }
  return {
    title: `Serrurier ${locksmith.name} - ${locksmith.cities.join(", ")}`,
    description: locksmith.description || "Description non disponible",
  };
}

export default async function LocksmithProfilePage({ params }: { params: { id: string } }) {
  // Récupère les données du serrurier à partir de Firestore
  const locksmith = await getLocksmithById(params.id);
  if (!locksmith) {
    notFound();
  }

  // Récupère les données des villes associées
  const cities = await Promise.all(
    locksmith.cities.map(async (cityId: string) => {
      const cityData = await getCityById(cityId);
      return cityData.data;
    })
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{locksmith.name}</h1>
      <p className="text-muted-foreground mb-4">
        Expert serrurier dans {cities.length} {cities.length > 1 ? "villes" : "ville"}.
      </p>

      {/* Zones d'intervention avec gestion des préférences utilisateur */}
      <ClientLocksmithDetails locksmith={locksmith} cities={cities} />

      {/* Informations supplémentaires */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Contact</h2>
        <p>
          <span className="font-medium">Téléphone :</span>{" "}
          <a href={`tel:${locksmith.phone}`} className="text-primary hover:underline">
            {locksmith.phone}
          </a>
        </p>
        <p>
          <span className="font-medium">Email :</span>{" "}
          <a href={`mailto:${locksmith.email}`} className="text-primary hover:underline">
            {locksmith.email}
          </a>
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Services proposés</h2>
        <ul className="list-disc list-inside">
          {locksmith.services.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">À propos</h2>
        <p>{locksmith.description}</p>
      </div>
    </div>
  );
}
