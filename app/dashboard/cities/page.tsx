"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { PlusIcon } from "@/components/icons";
import { CitiesTable } from "./components/CitiesTable";
import { CityForm } from "./components/CityForm";
import { subscribeToCities, createCity, updateCity, deleteCity } from "@/lib/services/cities";
import type { CityFormData } from "@/lib/validations/city";

export default function CitiesManagementPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [cities, setCities] = useState<Array<{ id: string; data: any }>>([]);

  useEffect(() => {
    const unsubscribe = subscribeToCities((citiesData) => {
      setCities(citiesData);
    });

    return () => unsubscribe();
  }, []);

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setSelectedCityId(null);
    }
  };

  const handleCreate = async (data: CityFormData) => {
    setIsSubmitting(true);
    try {
      await createCity(data);
      toast({
        title: "Succès",
        description: "La ville a été créée avec succès.",
      });
      handleDialogChange(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la création de la ville.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async (data: CityFormData) => {
    if (!selectedCityId) return;
    setIsSubmitting(true);
    try {
      const result = await updateCity(selectedCityId, data);
      toast({
        title: "Succès",
        description: "La ville a été mise à jour avec succès.",
      });
      handleDialogChange(false);
      if (result.id !== selectedCityId) {
        router.push(`/ville/${result.id}`);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la mise à jour de la ville.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCity(id);
      toast({
        title: "Succès",
        description: "La ville a été supprimée avec succès.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression de la ville.",
      });
    }
  };

  const openEditDialog = (id: string) => {
    setSelectedCityId(id);
    setIsDialogOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Gestion des villes</h1>
        <Button onClick={() => handleDialogChange(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Ajouter une ville
        </Button>
      </div>

      <CitiesTable
        data={cities}
        onEdit={openEditDialog}
        onDelete={handleDelete}
      />

      <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedCityId ? "Modifier la ville" : "Ajouter une ville"}
            </DialogTitle>
          </DialogHeader>
          <CityForm
            initialData={selectedCityId ? cities.find(city => city.id === selectedCityId)?.data : undefined}
            onSubmit={selectedCityId ? handleEdit : handleCreate}
            onCancel={() => handleDialogChange(false)}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}