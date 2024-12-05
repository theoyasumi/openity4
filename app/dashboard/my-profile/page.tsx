"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import LocksmithForm from "@/components/locksmiths/LocksmithForm";
import { getLocksmithByUserId, createLocksmith, updateLocksmith } from "@/lib/services/locksmiths";
import type { Locksmith } from "@/lib/types/locksmith";
import type { LocksmithFormData } from "@/lib/validations/locksmith";
import { LoaderIcon } from "@/components/icons";

export default function MyLocksmithProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [locksmith, setLocksmith] = useState<Locksmith | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchLocksmith = async () => {
      if (!user?.uid) return;
      
      try {
        const data = await getLocksmithByUserId(user.uid);
        setLocksmith(data);
      } catch (error) {
        console.error("Error fetching locksmith:", error);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger votre fiche serrurier.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchLocksmith();
    }
  }, [user, toast]);

  const handleSubmit = async (data: LocksmithFormData) => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      // Ensure userId is set to the current user's ID
      data.userId = user.uid;
      
      if (locksmith) {
        // Update existing profile
        await updateLocksmith(locksmith.id!, data);
        toast({
          title: "Succès",
          description: "Votre fiche a été mise à jour avec succès.",
        });
      } else {
        // Create new profile
        await createLocksmith(data);
        toast({
          title: "Succès",
          description: "Votre fiche a été créée avec succès.",
        });
      }
      
      // Refresh the page to show updated data
      router.refresh();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de l'enregistrement.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">
          <LoaderIcon className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Chargement de votre fiche...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">
          {locksmith ? "Modifier ma fiche serrurier" : "Créer ma fiche serrurier"}
        </h1>
        
        <LocksmithForm
          initialData={locksmith || undefined}
          onSubmit={handleSubmit}
          onCancel={() => router.push("/dashboard")}
          isSubmitting={isSubmitting}
        />
      </Card>
    </div>
  );
}