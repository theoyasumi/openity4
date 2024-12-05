"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ResizableEditor } from "@/components/editor/ResizableEditor";
import { locksmithSchema, type LocksmithFormData } from "@/lib/validations/locksmith";
import { type Locksmith } from "@/lib/types/locksmith";
import { getAllCities } from "@/lib/services/cities";

type DaysOfWeek = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

type ScheduleKey = `workingHours.schedule.${DaysOfWeek}`;

const daysOfWeek: DaysOfWeek[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

const services = [
  { value: "ouverture", label: "Ouverture de porte" },
  { value: "installation", label: "Installation de serrure" },
  { value: "remplacement", label: "Remplacement de serrure" },
  { value: "blindage", label: "Blindage de porte" },
  { value: "coffre", label: "Ouverture de coffre-fort" },
  { value: "securite", label: "Sécurisation" },
  { value: "depannage", label: "Dépannage d'urgence" },
];

interface LocksmithFormProps {
  initialData?: Locksmith;
  onSubmit: (data: LocksmithFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function LocksmithForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}: LocksmithFormProps) {
  const [cities, setCities] = useState<Array<{ value: string; label: string }>>([]);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LocksmithFormData>({
    resolver: zodResolver(locksmithSchema),
    defaultValues: initialData || {
      userId: "",
      name: "",
      email: "",
      phone: "",
      description: "",
      cities: [],
      services: [],
      workingHours: {
        is24h: false,
        schedule: {
          monday: "9h-18h",
          tuesday: "9h-18h",
          wednesday: "9h-18h",
          thursday: "9h-18h",
          friday: "9h-18h",
          saturday: "9h-12h",
          sunday: "Fermé",
        },
      },
    },
  });

  const is24h = watch("workingHours.is24h");

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const citiesData = await getAllCities();
        setCities(
          citiesData.map((city) => ({
            value: city.id,
            label: city.data.name,
          }))
        );
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto"
    >
      {/* Association avec utilisateur */}
      <div className="p-4 border rounded-lg bg-muted/50">
        <h3 className="font-medium mb-2">Association avec un utilisateur</h3>
        <div>
          <Label htmlFor="userId">ID Utilisateur Firebase</Label>
          <Input
            id="userId"
            {...register("userId")}
            className="mt-1 font-mono"
            placeholder="Exemple: 5XrZ9P8mKlN7vQ2w"
          />
          {errors.userId && (
            <p className="text-sm text-destructive mt-1">{errors.userId.message}</p>
          )}
        </div>
      </div>

      {/* Informations générales */}
      <div className="space-y-4">
        <h3 className="font-medium">Informations générales</h3>
        <div>
          <Label htmlFor="name">Nom</Label>
          <Input id="name" {...register("name")} className="mt-1" />
          {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} className="mt-1" />
          {errors.email && (
            <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="phone">Téléphone</Label>
          <Input id="phone" {...register("phone")} className="mt-1" />
          {errors.phone && (
            <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <Label>Description</Label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <ResizableEditor value={field.value} onChange={field.onChange} />
            )}
          />
          {errors.description && (
            <p className="text-sm text-destructive mt-1">{errors.description.message}</p>
          )}
        </div>
      </div>

      {/* Zones et Services */}
      <div className="space-y-4">
        <h3 className="font-medium">Zones et services</h3>
        <div>
          <Label>Villes</Label>
          <Controller
            name="cities"
            control={control}
            render={({ field }) => (
              <Select
                isMulti
                options={cities}
                value={cities.filter((option) => field.value.includes(option.value))}
                onChange={(newValue) => field.onChange(newValue.map((v) => v.value))}
                className="mt-1"
              />
            )}
          />
          {errors.cities && <p className="text-sm text-destructive mt-1">{errors.cities.message}</p>}
        </div>
        <div>
          <Label>Services</Label>
          <Controller
            name="services"
            control={control}
            render={({ field }) => (
              <Select
                isMulti
                options={services}
                value={services.filter((option) => field.value.includes(option.value))}
                onChange={(newValue) => field.onChange(newValue.map((v) => v.value))}
                className="mt-1"
              />
            )}
          />
          {errors.services && (
            <p className="text-sm text-destructive mt-1">{errors.services.message}</p>
          )}
        </div>
      </div>

      {/* Horaires */}
      <div className="space-y-4">
        <h3 className="font-medium">Horaires</h3>
        <div>
          <Controller
            name="workingHours.is24h"
            control={control}
            render={({ field }) => (
              <Switch id="is24h" checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </div>
        {!is24h && (
          <div className="mt-4 space-y-2">
            {daysOfWeek.map((day) => (
              <div key={day}>
                <Label htmlFor={day} className="capitalize">
                  {day}
                </Label>
                <Input id={day} {...register(`workingHours.schedule.${day}` as ScheduleKey)} className="mt-1" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </div>
    </form>
  );
}
