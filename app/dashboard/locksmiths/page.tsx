"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { PlusIcon } from "@/components/icons";
import { LocksmithsTable } from "./components/LocksmithsTable";
import { LocksmithForm } from "./components/LocksmithForm";
import { subscribeToLocksmiths, createLocksmith, updateLocksmith, deleteLocksmith } from "@/lib/services/locksmiths";
import type { LocksmithFormData } from "@/lib/validations/locksmith";
import type { Locksmith } from "@/lib/types/locksmith";

export default function LocksmithsManagementPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedLocksmithId, setSelectedLocksmithId] = useState<string | null>(null);
  const [locksmiths, setLocksmiths] = useState<Locksmith[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToLocksmiths((locksmithsData) => {
      setLocksmiths(locksmithsData);
    });

    return () => unsubscribe();
  }, []);

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setSelectedLocksmithId(null);
    }
  };

  const handleCreate = async (data: LocksmithFormData) => {
    setIsSubmitting(true);
    try {
      await createLocksmith(data);
      toast({
        title: "Succès",
        description: "La fiche serrurier a été créée avec succès.",
      });
      handleDialogChange(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la création de la fiche.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async (data: LocksmithFormData) => {
    if (!selectedLocksmithId) return;
    setIsSubmitting(true);
    try {
      await updateLocksmith(selectedLocksmithId, data);
      toast({
        title: "Succès",
        description: "La fiche serrurier a été mise à jour avec succès.",
      });
      handleDialogChange(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la mise à jour de la fiche.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteLocksmith(id);
      toast({
        title: "Succès",
        description: "La fiche serrurier a été supprimée avec succès.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression de la fiche.",
      });
    }
  };

  const openEditDialog = (id: string) => {
    setSelectedLocksmithId(id);
    setIsDialogOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Gestion des serruriers</h1>
        <Button onClick={() => handleDialogChange(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Ajouter un serrurier
        </Button>
      </div>

      <LocksmithsTable
        data={locksmiths}
        onEdit={openEditDialog}
        onDelete={handleDelete}
      />

      <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedLocksmithId ? "Modifier la fiche serrurier" : "Ajouter un serrurier"}
            </DialogTitle>
          </DialogHeader>
          <LocksmithForm
            initialData={selectedLocksmithId ? locksmiths.find(l => l.id === selectedLocksmithId) : undefined}
            onSubmit={selectedLocksmithId ? handleEdit : handleCreate}
            onCancel={() => handleDialogChange(false)}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}